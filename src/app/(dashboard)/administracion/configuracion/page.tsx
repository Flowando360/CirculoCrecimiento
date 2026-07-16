import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminConfiguracionPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();
  const { data: ciclo } = await supabase
    .from('ciclos_evaluacion')
    .select('*')
    .eq('empresa_id', perfil.empresa_id)
    .order('fecha_apertura', { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Configuración</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Pesos de ponderación entre fuentes de evaluación. Editable sin tocar fórmulas — se aplica
          al próximo ciclo que se abra.
        </p>
      </div>

      <div className="card p-5 space-y-4">
        <h2 className="font-display font-semibold text-marmol-900">Cargos con personal a cargo</h2>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <label className="block text-xs text-marmol-500 mb-1">Líder</label>
            <input
              type="number"
              defaultValue={(ciclo?.peso_lider_con_equipo ?? 0.4) * 100}
              className="w-full rounded-lg border border-marmol-200 px-2 py-1.5"
            />
          </div>
          <div>
            <label className="block text-xs text-marmol-500 mb-1">Pares</label>
            <input
              type="number"
              defaultValue={(ciclo?.peso_pares_con_equipo ?? 0.3) * 100}
              className="w-full rounded-lg border border-marmol-200 px-2 py-1.5"
            />
          </div>
          <div>
            <label className="block text-xs text-marmol-500 mb-1">Colaboradores a cargo</label>
            <input
              type="number"
              defaultValue={(ciclo?.peso_colaboradores_con_equipo ?? 0.3) * 100}
              className="w-full rounded-lg border border-marmol-200 px-2 py-1.5"
            />
          </div>
        </div>

        <h2 className="font-display font-semibold text-marmol-900 pt-2">Cargos sin personal a cargo</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="block text-xs text-marmol-500 mb-1">Líder</label>
            <input
              type="number"
              defaultValue={(ciclo?.peso_lider_sin_equipo ?? 0.6) * 100}
              className="w-full rounded-lg border border-marmol-200 px-2 py-1.5"
            />
          </div>
          <div>
            <label className="block text-xs text-marmol-500 mb-1">Pares</label>
            <input
              type="number"
              defaultValue={(ciclo?.peso_pares_sin_equipo ?? 0.4) * 100}
              className="w-full rounded-lg border border-marmol-200 px-2 py-1.5"
            />
          </div>
        </div>

        <button className="rounded-lg bg-flow-500 hover:bg-flow-600 text-white text-sm font-medium px-4 py-2 transition">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
