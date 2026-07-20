'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const PonderacionesSchema = z
  .object({
    cicloId: z.string().uuid(),
    liderConEquipo: z.number().int().min(0).max(100),
    paresConEquipo: z.number().int().min(0).max(100),
    colaboradoresConEquipo: z.number().int().min(0).max(100),
    liderSinEquipo: z.number().int().min(0).max(100),
    paresSinEquipo: z.number().int().min(0).max(100),
  })
  .refine((v) => v.liderConEquipo + v.paresConEquipo + v.colaboradoresConEquipo === 100, {
    message: 'Los pesos de "con personal a cargo" deben sumar 100%',
  })
  .refine((v) => v.liderSinEquipo + v.paresSinEquipo === 100, {
    message: 'Los pesos de "sin personal a cargo" deben sumar 100%',
  });

/**
 * Guarda los pesos de ponderación de un ciclo. Solo se permite mientras el
 * ciclo sigue en estado 'planeado': una vez 'abierto', el trigger de
 * recálculo (fn_recalcular_resultados_evaluacion) lee estos pesos en vivo
 * desde ciclos_evaluacion, así que cambiarlos ahí afectaría evaluaciones ya
 * en curso — por eso el aviso "se aplica al próximo ciclo que se abra".
 */
export async function guardarPonderaciones(input: z.infer<typeof PonderacionesSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false, error: 'No autorizado' };

  const parsed = PonderacionesSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };
  }

  const supabase = createClient();

  const { data: ciclo } = await supabase
    .from('ciclos_evaluacion')
    .select('id, estado, empresa_id')
    .eq('id', parsed.data.cicloId)
    .maybeSingle();

  if (!ciclo || ciclo.empresa_id !== perfil.empresa_id) {
    return { ok: false, error: 'Ciclo no encontrado' };
  }
  if (ciclo.estado !== 'planeado') {
    return { ok: false, error: 'Este ciclo ya está abierto; los pesos solo se pueden editar antes de abrirlo' };
  }

  const { error } = await supabase
    .from('ciclos_evaluacion')
    .update({
      peso_lider_con_equipo: parsed.data.liderConEquipo / 100,
      peso_pares_con_equipo: parsed.data.paresConEquipo / 100,
      peso_colaboradores_con_equipo: parsed.data.colaboradoresConEquipo / 100,
      peso_lider_sin_equipo: parsed.data.liderSinEquipo / 100,
      peso_pares_sin_equipo: parsed.data.paresSinEquipo / 100,
    })
    .eq('id', parsed.data.cicloId);

  if (error) return { ok: false, error: error.message };

  revalidatePath('/administracion/configuracion');
  return { ok: true };
}
