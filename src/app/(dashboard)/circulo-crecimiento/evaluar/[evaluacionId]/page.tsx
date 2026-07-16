import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { FormularioEvaluacion } from '@/components/circulo-crecimiento/formulario-evaluacion';
import { notFound } from 'next/navigation';

export default async function EvaluarPage({ params }: { params: { evaluacionId: string } }) {
  const perfil = await getPerfilActual();
  if (!perfil?.colaborador_id) return null;

  const supabase = createClient();

  const { data: evaluacion } = await supabase
    .from('evaluaciones')
    .select('id, tenia_personal_a_cargo, colaborador:colaborador_evaluado_id(nombre_completo)')
    .eq('id', params.evaluacionId)
    .maybeSingle();

  if (!evaluacion) notFound();

  const { data: tarea } = await supabase
    .from('evaluacion_tareas')
    .select('id, tipo_evaluador')
    .eq('evaluacion_id', params.evaluacionId)
    .eq('evaluador_colaborador_id', perfil.colaborador_id)
    .maybeSingle();

  if (!tarea) notFound();

  const { data: competencias } = await supabase
    .from('competencias')
    .select('id, nombre, descripcion_que_evalua, dimension, solo_con_personal_a_cargo, criterios:competencia_criterios(nivel, criterio)')
    .eq('empresa_id', perfil.empresa_id)
    .eq('activo', true)
    .order('orden');

  const { data: respuestasExistentes } = await supabase
    .from('respuestas_evaluacion')
    .select('competencia_id, nota')
    .eq('evaluacion_tarea_id', tarea.id);

  const respuestasIniciales = Object.fromEntries(
    (respuestasExistentes ?? []).map((r) => [r.competencia_id, r.nota])
  );

  const competenciasAplicables = (competencias ?? []).filter(
    (c) => !c.solo_con_personal_a_cargo || evaluacion.tenia_personal_a_cargo
  );

  const etiquetaTipo: Record<string, string> = {
    autoevaluacion: 'Autoevaluación',
    lider: 'Evaluación de líder',
    par: 'Evaluación de par',
    colaborador_a_cargo: 'Evaluación de colaborador a cargo',
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="text-xs font-medium text-flow-600 mb-1">
          {etiquetaTipo[tarea.tipo_evaluador] ?? tarea.tipo_evaluador}
        </p>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">
          Evaluando a {(evaluacion.colaborador as any)?.nombre_completo}
        </h1>
        <p className="text-sm text-marmol-500 mt-1">
          Evalúa comportamientos observables del período completo. Cada respuesta se guarda y
          recalcula el resultado de inmediato.
        </p>
      </div>

      <FormularioEvaluacion
        evaluacionTareaId={tarea.id}
        competencias={(competenciasAplicables as any) ?? []}
        respuestasIniciales={respuestasIniciales}
      />
    </div>
  );
}
