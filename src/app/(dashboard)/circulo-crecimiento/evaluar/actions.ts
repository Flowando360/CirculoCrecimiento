'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const RespuestaSchema = z.object({
  evaluacionTareaId: z.string().uuid(),
  competenciaId: z.string().uuid(),
  nota: z.number().int().min(1).max(5),
  comentario: z.string().optional(),
});

/**
 * Guarda (o actualiza) UNA calificación. El trigger de Postgres
 * (fn_trigger_respuesta_evaluacion) se encarga de recalcular los índices
 * de la persona evaluada en el mismo instante — no hay recálculo manual.
 */
export async function guardarRespuesta(input: z.infer<typeof RespuestaSchema>) {
  const parsed = RespuestaSchema.parse(input);
  const supabase = createClient();

  const { error } = await supabase.from('respuestas_evaluacion').upsert(
    {
      evaluacion_tarea_id: parsed.evaluacionTareaId,
      competencia_id: parsed.competenciaId,
      nota: parsed.nota,
      comentario: parsed.comentario ?? null,
    },
    { onConflict: 'evaluacion_tarea_id,competencia_id' }
  );

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath('/circulo-crecimiento/ciclos');
  return { ok: true };
}
