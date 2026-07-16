import { createClient } from '@/lib/supabase/server';
import { SemaforoBadge } from '@/components/circulo-crecimiento/semaforo-badge';
import { notFound } from 'next/navigation';

export default async function CicloDetallePage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: ciclo } = await supabase
    .from('ciclos_evaluacion')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!ciclo) notFound();

  const { data: evaluaciones } = await supabase
    .from('evaluaciones')
    .select(
      `id, porcentaje_avance, publicado,
       colaborador:colaborador_evaluado_id(id, nombre_completo, cargo:cargos(nombre)),
       resultado:resultados_evaluacion(indice_hacer, indice_deber, semaforo_hacer, semaforo_deber)`
    )
    .eq('ciclo_id', params.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">{ciclo.nombre}</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Ponderación vigente: Líder {ciclo.peso_lider_con_equipo * 100}% / Pares{' '}
          {ciclo.peso_pares_con_equipo * 100}% / Colaboradores a cargo{' '}
          {ciclo.peso_colaboradores_con_equipo * 100}% (cargos con equipo)
        </p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-marmol-200 text-left text-xs uppercase tracking-wide text-marmol-400">
              <th className="px-4 py-3 font-medium">Colaborador</th>
              <th className="px-4 py-3 font-medium">Cargo</th>
              <th className="px-4 py-3 font-medium">Avance</th>
              <th className="px-4 py-3 font-medium">Hacer</th>
              <th className="px-4 py-3 font-medium">Deber</th>
            </tr>
          </thead>
          <tbody>
            {(evaluaciones ?? []).map((e: any) => (
              <tr key={e.id} className="border-b border-marmol-100 last:border-0 hover:bg-marmol-50">
                <td className="px-4 py-3 font-medium text-marmol-900">{e.colaborador?.nombre_completo}</td>
                <td className="px-4 py-3 text-marmol-600">{e.colaborador?.cargo?.nombre}</td>
                <td className="px-4 py-3">
                  <div className="w-28 h-1.5 rounded-full bg-marmol-100 overflow-hidden">
                    <div
                      className="h-full bg-flow-500"
                      style={{ width: `${e.porcentaje_avance ?? 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-marmol-400">{e.porcentaje_avance ?? 0}%</span>
                </td>
                <td className="px-4 py-3">
                  <SemaforoBadge nivel={e.resultado?.[0]?.semaforo_hacer} />
                </td>
                <td className="px-4 py-3">
                  <SemaforoBadge nivel={e.resultado?.[0]?.semaforo_deber} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
