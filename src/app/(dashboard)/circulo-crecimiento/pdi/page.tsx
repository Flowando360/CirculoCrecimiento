import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { Target } from 'lucide-react';
import { PdiKanban } from '@/components/circulo-crecimiento/pdi-kanban';

export default async function PdiPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();

  let query = supabase
    .from('planes_desarrollo')
    .select(
      'id, brecha_detectada, accion, origen, estado, fecha_compromiso, generado_automaticamente, colaborador:colaborador_id(nombre_completo)'
    )
    .order('fecha_compromiso', { ascending: true });

  if (perfil.rol === 'colaborador' && perfil.colaborador_id) {
    query = query.eq('colaborador_id', perfil.colaborador_id);
  }

  const { data: planes } = await query;
  const puedeArrastrar = perfil.rol !== 'gerencia';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-secundario">
          {perfil.rol === 'colaborador' ? 'Mi Plan de Desarrollo' : 'Planes de Desarrollo Individual'}
        </h1>
        <p className="text-sm text-marmol-500 mt-1">
          El entregable central del Encuentro de Crecimiento: distingue si la brecha es de actitud, de
          formación o de alineación de talento.
        </p>
      </div>

      {!planes || planes.length === 0 ? (
        <EmptyState
          icon={Target}
          titulo="Sin planes de desarrollo registrados"
          descripcion="Se generan de forma asistida al cerrar cada Ciclo de Crecimiento, cruzando brechas de Hacer/Deber con Saber y Ser."
        />
      ) : (
        <PdiKanban planesIniciales={planes as any} puedeArrastrar={puedeArrastrar} />
      )}
    </div>
  );
}
