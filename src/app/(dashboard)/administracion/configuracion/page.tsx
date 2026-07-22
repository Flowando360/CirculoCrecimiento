import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { EmptyState } from '@/components/ui/empty-state';
import { FormularioPonderaciones } from '@/components/administracion/formulario-ponderaciones';
import { SlidersHorizontal } from 'lucide-react';

export default async function AdminConfiguracionPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();
  // Solo se puede editar el ciclo que TODAVÍA no se ha abierto: una vez
  // 'abierto', el trigger de recálculo lee estos pesos en vivo desde
  // ciclos_evaluacion, así que cambiarlos ahí afectaría evaluaciones en curso.
  const { data: ciclo } = await supabase
    .from('ciclos_evaluacion')
    .select('*')
    .eq('empresa_id', perfil.empresa_id)
    .eq('estado', 'planeado')
    .order('fecha_apertura', { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-secundario">Configuración</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Pesos de ponderación entre fuentes de valoración. Editable sin tocar fórmulas — se aplica
          al próximo ciclo que se abra.
        </p>
      </div>

      {ciclo ? (
        <FormularioPonderaciones
          cicloId={ciclo.id}
          pesosIniciales={{
            liderConEquipo: Math.round((ciclo.peso_lider_con_equipo ?? 0.4) * 100),
            paresConEquipo: Math.round((ciclo.peso_pares_con_equipo ?? 0.3) * 100),
            colaboradoresConEquipo: Math.round((ciclo.peso_colaboradores_con_equipo ?? 0.3) * 100),
            liderSinEquipo: Math.round((ciclo.peso_lider_sin_equipo ?? 0.6) * 100),
            paresSinEquipo: Math.round((ciclo.peso_pares_sin_equipo ?? 0.4) * 100),
          }}
        />
      ) : (
        <EmptyState
          icon={SlidersHorizontal}
          titulo="No hay ningún ciclo planeado"
          descripcion="Los pesos de ponderación solo se pueden editar antes de abrir un ciclo, para no afectar Encuentros de Crecimiento ya en curso. Actualmente no hay ninguno en estado 'planeado'."
        />
      )}
    </div>
  );
}
