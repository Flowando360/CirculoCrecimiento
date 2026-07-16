import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { Target } from 'lucide-react';
import { formatearFecha, cn } from '@/lib/utils';

const ORIGEN_COLOR: Record<string, string> = {
  hacer: 'bg-hacer/10 text-hacer',
  deber: 'bg-deber/10 text-deber',
  saber: 'bg-saber/10 text-saber',
  ser: 'bg-ser/10 text-ser',
  mixto: 'bg-marmol-200 text-marmol-600',
};

const ESTADO_COLOR: Record<string, string> = {
  pendiente: 'bg-marmol-100 text-marmol-600',
  en_curso: 'bg-flow-50 text-flow-700',
  cumplido: 'bg-green-100 text-alto',
  vencido: 'bg-red-100 text-bajo',
};

export default async function PdiPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();

  let query = supabase
    .from('planes_desarrollo')
    .select('id, brecha_detectada, accion, origen, estado, fecha_compromiso, colaborador:colaborador_id(nombre_completo)')
    .order('fecha_compromiso', { ascending: true });

  if (perfil.rol === 'colaborador' && perfil.colaborador_id) {
    query = query.eq('colaborador_id', perfil.colaborador_id);
  }

  const { data: planes } = await query;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">
          {perfil.rol === 'colaborador' ? 'Mi Plan de Desarrollo' : 'Planes de Desarrollo Individual'}
        </h1>
        <p className="text-sm text-marmol-500 mt-1">
          El entregable central de la evaluación: distingue si la brecha es de actitud, de
          formación o de alineación de talento.
        </p>
      </div>

      {!planes || planes.length === 0 ? (
        <EmptyState
          icon={Target}
          titulo="Sin planes de desarrollo registrados"
          descripcion="Se generan de forma asistida al cerrar cada ciclo de evaluación, cruzando brechas de Hacer/Deber con Saber y Ser."
        />
      ) : (
        <div className="space-y-3">
          {planes.map((p: any) => (
            <div key={p.id} className="card p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-marmol-900">{p.accion}</p>
                <p className="text-xs text-marmol-500 mt-0.5">
                  {p.colaborador?.nombre_completo} · Brecha: {p.brecha_detectada}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn('text-xs rounded-full px-2 py-0.5 font-medium capitalize', ORIGEN_COLOR[p.origen])}>
                  {p.origen}
                </span>
                <span className={cn('text-xs rounded-full px-2 py-0.5 font-medium capitalize', ESTADO_COLOR[p.estado])}>
                  {p.estado.replace(/_/g, ' ')}
                </span>
                {p.fecha_compromiso && (
                  <span className="text-xs text-marmol-400 w-24 text-right">
                    {formatearFecha(p.fecha_compromiso)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
