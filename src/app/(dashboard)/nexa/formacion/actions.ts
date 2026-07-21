'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CATEGORIAS = [
  'induccion_sst',
  'alturas',
  'manejo_cargas',
  'epp',
  'protocolos_emergencia',
  'cultura',
  'tecnico',
  'otro',
] as const;

const CursoSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es requerido'),
  descripcion: z.string().trim().optional(),
  categoria: z.enum(CATEGORIAS),
  duracionMinutos: z.number().int().positive().optional(),
  puntosOtorgados: z.number().int().min(0),
});

/** Crea un curso en el catálogo de Nexa (admin_th, misma regla que RLS). */
export async function crearCurso(input: z.infer<typeof CursoSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false as const, error: 'No autorizado' };

  const parsed = CursoSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

  const supabase = createClient();
  const { error } = await supabase.from('nexa_cursos').insert({
    empresa_id: perfil.empresa_id,
    titulo: parsed.data.titulo,
    descripcion: parsed.data.descripcion || null,
    categoria: parsed.data.categoria,
    duracion_minutos: parsed.data.duracionMinutos ?? null,
    puntos_otorgados: parsed.data.puntosOtorgados,
  });

  if (error) return { ok: false as const, error: error.message };
  revalidatePath('/nexa/formacion');
  return { ok: true as const };
}

const AsignarCargoSchema = z.object({
  cursoId: z.string().uuid(),
  cargoId: z.string().uuid(),
  nivelRiesgo: z.enum(['alto', 'medio', 'bajo']),
  obligatorio: z.boolean(),
});

/** Vincula un curso al perfil de un cargo (ruta de aprendizaje por cargo). */
export async function asignarCursoACargo(input: z.infer<typeof AsignarCargoSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false as const, error: 'No autorizado' };

  const parsed = AsignarCargoSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: 'Datos inválidos' };

  const supabase = createClient();
  const { error } = await supabase.from('nexa_rutas_por_cargo').upsert(
    {
      cargo_id: parsed.data.cargoId,
      curso_id: parsed.data.cursoId,
      nivel_riesgo: parsed.data.nivelRiesgo,
      obligatorio: parsed.data.obligatorio,
    },
    { onConflict: 'cargo_id,curso_id' }
  );

  if (error) return { ok: false as const, error: error.message };
  revalidatePath('/nexa/formacion');
  return { ok: true as const };
}

const ProgresoSchema = z.object({
  rutaId: z.string().uuid(),
  progresoPct: z.number().min(0).max(100),
});

/** El colaborador actualiza su propio avance (o lo marca completado con 100). */
export async function actualizarProgresoCurso(input: z.infer<typeof ProgresoSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'colaborador' || !perfil.colaborador_id) {
    return { ok: false as const, error: 'No autorizado' };
  }

  const parsed = ProgresoSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: 'Datos inválidos' };

  const completado = parsed.data.progresoPct >= 100;
  const supabase = createClient();
  const { error } = await supabase
    .from('nexa_rutas_formacion')
    .update({
      progreso_pct: parsed.data.progresoPct,
      estado: completado ? 'completado' : parsed.data.progresoPct > 0 ? 'en_curso' : 'asignado',
      completado_en: completado ? new Date().toISOString() : null,
    })
    .eq('id', parsed.data.rutaId)
    .eq('colaborador_id', perfil.colaborador_id);

  if (error) return { ok: false as const, error: error.message };
  revalidatePath('/nexa/formacion');
  return { ok: true as const };
}

const AsignarColaboradorSchema = z.object({
  cursoId: z.string().uuid(),
  colaboradorId: z.string().uuid(),
  fechaLimite: z.string().optional(),
});

/** Asigna un curso directamente a una persona (admin_th, misma regla que RLS). */
export async function asignarCursoAColaborador(input: z.infer<typeof AsignarColaboradorSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false as const, error: 'No autorizado' };

  const parsed = AsignarColaboradorSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: 'Datos inválidos' };

  const supabase = createClient();
  const { error } = await supabase.from('nexa_rutas_formacion').insert({
    colaborador_id: parsed.data.colaboradorId,
    curso_id: parsed.data.cursoId,
    fecha_limite: parsed.data.fechaLimite || null,
  });

  if (error) return { ok: false as const, error: error.message };
  revalidatePath('/nexa/formacion');
  return { ok: true as const };
}
