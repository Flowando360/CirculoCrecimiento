import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';

/**
 * Abre un ciclo de evaluación: para cada colaborador activo (no externo) de
 * la empresa, crea su `evaluacion` y genera las `evaluacion_tareas`
 * (autoevaluación, líder, pares, colaboradores a cargo) leyendo la vista
 * v_organigrama_evaluadores — sin que Talento Humano digite nada a mano
 * (secc. 9.2 y 13.4 paso 2 del documento).
 */
export async function POST(req: NextRequest) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') {
    return NextResponse.json({ error: 'Solo Talento Humano puede abrir un ciclo' }, { status: 403 });
  }

  const { cicloId } = await req.json();
  if (!cicloId) {
    return NextResponse.json({ error: 'cicloId requerido' }, { status: 400 });
  }

  const supabase = createClient();

  const { data: colaboradores } = await supabase
    .from('colaboradores')
    .select('id, cargo:cargos(tiene_personal_a_cargo)')
    .eq('empresa_id', perfil.empresa_id)
    .eq('estado', 'activo')
    .eq('es_externo', false);

  const { data: evaluadores } = await supabase.from('v_organigrama_evaluadores').select('*');

  let evaluacionesCreadas = 0;
  let tareasCreadas = 0;

  for (const colaborador of colaboradores ?? []) {
    const tenePersonalACargo = Boolean((colaborador.cargo as any)?.tiene_personal_a_cargo);

    const { data: evaluacion, error: errEval } = await supabase
      .from('evaluaciones')
      .upsert(
        { ciclo_id: cicloId, colaborador_evaluado_id: colaborador.id, tenia_personal_a_cargo: tenePersonalACargo },
        { onConflict: 'ciclo_id,colaborador_evaluado_id' }
      )
      .select('id')
      .single();

    if (errEval || !evaluacion) continue;
    evaluacionesCreadas++;

    const asignaciones = (evaluadores ?? []).filter((e: any) => e.colaborador_id === colaborador.id);

    for (const asignacion of asignaciones) {
      const { error: errTarea } = await supabase.from('evaluacion_tareas').upsert(
        {
          evaluacion_id: evaluacion.id,
          evaluador_colaborador_id: (asignacion as any).evaluador_id,
          tipo_evaluador: (asignacion as any).tipo_evaluador,
        },
        { onConflict: 'evaluacion_id,evaluador_colaborador_id' }
      );
      if (!errTarea) tareasCreadas++;
    }
  }

  await supabase.from('ciclos_evaluacion').update({ estado: 'abierto' }).eq('id', cicloId);

  return NextResponse.json({ ok: true, evaluacionesCreadas, tareasCreadas });
}
