import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { Award } from 'lucide-react';
import { formatearFecha } from '@/lib/utils';

export default async function NexaReconocimientosPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();
  const { data: reconocimientos } = await supabase
    .from('nexa_reconocimientos')
    .select('id, puntos, motivo, otorgado_en, colaborador:colaborador_id(nombre_completo), insignia:insignia_id(nombre, icono)')
    .order('otorgado_en', { ascending: false })
    .limit(50);

  // Ranking simple: suma de puntos por colaborador
  const ranking = new Map<string, { nombre: string; puntos: number }>();
  (reconocimientos ?? []).forEach((r: any) => {
    const nombre = r.colaborador?.nombre_completo ?? 'Desconocido';
    const actual = ranking.get(nombre) ?? { nombre, puntos: 0 };
    actual.puntos += r.puntos ?? 0;
    ranking.set(nombre, actual);
  });
  const rankingOrdenado = [...ranking.values()].sort((a, b) => b.puntos - a.puntos).slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Reconocimientos</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Refuerza los resultados destacados del Círculo de Crecimiento con puntos, insignias y
          visibilidad social.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-display font-semibold text-marmol-900 mb-3">Ranking de puntos</h2>
          {rankingOrdenado.length === 0 ? (
            <p className="text-sm text-marmol-400">Sin reconocimientos otorgados aún.</p>
          ) : (
            <ol className="space-y-2">
              {rankingOrdenado.map((r, i) => (
                <li key={r.nombre} className="flex items-center justify-between text-sm">
                  <span className="text-marmol-700">
                    <span className="text-marmol-400 mr-2">{i + 1}.</span>
                    {r.nombre}
                  </span>
                  <span className="font-medium text-flow-600">{r.puntos} pts</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="card p-5">
          <h2 className="font-display font-semibold text-marmol-900 mb-3">Últimos reconocimientos</h2>
          {!reconocimientos || reconocimientos.length === 0 ? (
            <EmptyState icon={Award} titulo="Sin actividad reciente" />
          ) : (
            <ul className="space-y-2">
              {reconocimientos.slice(0, 8).map((r: any) => (
                <li key={r.id} className="text-sm border-b border-marmol-100 pb-2 last:border-0">
                  <p className="text-marmol-800">
                    <span className="font-medium">{r.colaborador?.nombre_completo}</span> — {r.motivo}
                  </p>
                  <p className="text-xs text-marmol-400">{formatearFecha(r.otorgado_en)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
