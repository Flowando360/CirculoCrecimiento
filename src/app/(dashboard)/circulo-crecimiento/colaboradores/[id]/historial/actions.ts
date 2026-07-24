'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { asignarItemsInduccion } from '@/lib/induccion/asignar';

const TIPOS = [
  'ingreso',
  'promocion',
  'cambio_area',
  'cambio_lider',
  'aumento_salarial',
  'sancion',
  'reconocimiento',
  'salida',
] as const;

async function esAdminThDeEsteColaborador(colaboradorId: string) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return null;

  const supabase = createClient();
  const { data: colaborador } = await supabase
    .from('colaboradores')
    .select('id, empresa_id')
    .eq('id', colaboradorId)
    .maybeSingle();

  if (!colaborador || colaborador.empresa_id !== perfil.empresa_id) return null;
  return perfil;
}

function revalidar(colaboradorId: string) {
  revalidatePath(`/circulo-crecimiento/colaboradores/${colaboradorId}/historial`);
  revalidatePath(`/circulo-crecimiento/colaboradores/${colaboradorId}`);
  revalidatePath(`/circulo-crecimiento/colaboradores/${colaboradorId}/induccion`);
}

const MovimientoSchema = z.object({
  colaboradorId: z.string().uuid(),
  tipo: z.enum(TIPOS),
  fecha: z.string().min(1, 'La fecha es requerida'),
  descripcion: z.string().trim().optional(),
  cargoNuevoId: z.string().uuid().optional(),
});

/** Registra un movimiento en la línea de tiempo del colaborador (admin_th). */
export async function agregarMovimiento(input: z.infer<typeof MovimientoSchema>) {
  const parsed = MovimientoSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

  const perfil = await esAdminThDeEsteColaborador(parsed.data.colaboradorId);
  if (!perfil) return { ok: false as const, error: 'No autorizado' };

  const supabase = createClient();

  // Si hay cargo nuevo, el "cargo anterior" queda registrado como el actual del colaborador.
  let cargoAnteriorId: string | null = null;
  if (parsed.data.cargoNuevoId) {
    const { data: colaborador } = await supabase
      .from('colaboradores')
      .select('cargo_id')
      .eq('id', parsed.data.colaboradorId)
      .maybeSingle();
    cargoAnteriorId = colaborador?.cargo_id ?? null;
  }

  const { data, error } = await supabase
    .from('historial_movimientos')
    .insert({
      colaborador_id: parsed.data.colaboradorId,
      tipo: parsed.data.tipo,
      fecha: parsed.data.fecha,
      descripcion: parsed.data.descripcion || null,
      cargo_anterior_id: cargoAnteriorId,
      cargo_nuevo_id: parsed.data.cargoNuevoId || null,
      registrado_por: perfil.usuario_id,
    })
    .select('*, cargo_anterior:cargo_anterior_id(nombre), cargo_nuevo:cargo_nuevo_id(nombre)')
    .single();

  if (error) return { ok: false as const, error: error.message };

  // Si el movimiento implica un cargo nuevo, se actualiza también la ficha
  // y se le asigna el plan de inducción correspondiente: si es un ingreso,
  // la parte común (Identidad Organizacional) + la específica del cargo; si
  // es un cambio de cargo interno, solo la específica del cargo nuevo (ya
  // pasó por la parte común la primera vez). No duplica puntos ya asignados.
  if (parsed.data.cargoNuevoId) {
    await supabase
      .from('colaboradores')
      .update({ cargo_id: parsed.data.cargoNuevoId })
      .eq('id', parsed.data.colaboradorId);

    await asignarItemsInduccion(
      supabase,
      parsed.data.colaboradorId,
      perfil.empresa_id,
      parsed.data.cargoNuevoId,
      parsed.data.tipo === 'ingreso'
    );
  }

  revalidar(parsed.data.colaboradorId);
  return { ok: true as const, movimiento: data };
}

const EntrevistaSchema = z.object({
  colaboradorId: z.string().uuid(),
  fecha: z.string().min(1, 'La fecha es requerida'),
  motivoCategoria: z.enum(['renuncia_voluntaria', 'despido', 'fin_contrato', 'mutuo_acuerdo', 'jubilacion', 'otro']),
  motivoDetalle: z.string().trim().optional(),
  recomendariaEmpresa: z.enum(['si', 'no', 'sin_dato']),
  comentarios: z.string().trim().optional(),
});

/** Crea o actualiza la entrevista de salida del colaborador (admin_th). */
export async function guardarEntrevistaSalida(input: z.infer<typeof EntrevistaSchema>) {
  const parsed = EntrevistaSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

  const perfil = await esAdminThDeEsteColaborador(parsed.data.colaboradorId);
  if (!perfil) return { ok: false as const, error: 'No autorizado' };

  const supabase = createClient();
  const { error } = await supabase.from('entrevistas_salida').upsert(
    {
      colaborador_id: parsed.data.colaboradorId,
      fecha: parsed.data.fecha,
      motivo_categoria: parsed.data.motivoCategoria,
      motivo_detalle: parsed.data.motivoDetalle || null,
      recomendaria_empresa: parsed.data.recomendariaEmpresa === 'sin_dato' ? null : parsed.data.recomendariaEmpresa === 'si',
      comentarios: parsed.data.comentarios || null,
      realizada_por: perfil.usuario_id,
    },
    { onConflict: 'colaborador_id' }
  );

  if (error) return { ok: false as const, error: error.message };

  revalidar(parsed.data.colaboradorId);
  return { ok: true as const };
}
