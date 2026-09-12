'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';

/**
 * Elimina definitivamente la ficha de un colaborador (admin_th únicamente).
 * A diferencia de registrar una "Salida" en su Historial (que solo la deja
 * inactiva), esto borra la fila por completo — pensado para corregir errores
 * de captura (ficha duplicada, persona equivocada), no para el retiro normal
 * de alguien que deja la empresa.
 *
 * La mayoría de tablas relacionadas (evaluaciones, SER, hoja de vida,
 * inducción, alertas, dotación, incapacidades, fechas especiales, Guía del
 * Flow...) tienen "on delete cascade" contra colaboradores — es decir, borrar
 * la ficha borra también todo ese historial sin avisar aparte, por eso el
 * mensaje de confirmación en pantalla lo explicita. Solo se bloquea (con
 * error de Postgres) si esta persona sigue siendo el líder de alguien más
 * en `colaboradores.lider_id` — ahí se sugiere "Salida" en su lugar.
 */
export async function eliminarColaborador(colaboradorId: string) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false as const, error: 'No autorizado' };

  const supabase = createClient();

  const { data: colaborador } = await supabase
    .from('colaboradores')
    .select('id, empresa_id')
    .eq('id', colaboradorId)
    .maybeSingle();

  if (!colaborador || colaborador.empresa_id !== perfil.empresa_id) {
    return { ok: false as const, error: 'Colaborador no encontrado' };
  }

  const { error } = await supabase.from('colaboradores').delete().eq('id', colaboradorId);

  if (error) {
    const esConflictoDeReferencias = /foreign key|constraint|violates/i.test(error.message);
    return {
      ok: false as const,
      error: esConflictoDeReferencias
        ? 'No se pudo eliminar: esta persona sigue registrada como líder de alguien más. Reasigna primero ese equipo a otro líder, o usa "Salida" desde su Historial para dejarla inactiva en su lugar.'
        : error.message,
    };
  }

  revalidatePath('/circulo-crecimiento/colaboradores');
  return { ok: true as const };
}
