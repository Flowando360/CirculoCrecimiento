import Link from 'next/link';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { formatearFecha } from '@/lib/utils';
import { CalendarClock, Plus } from 'lucide-react';

const ETIQUETA_ESTADO: Record<string, string> = {
  planeado: 'Planeado',
  abierto: 'Abierto',
  en_consolidacion: 'En consolidación',
  publicado: 'Publicado',
  cerrado: 'Cerrado',
};

export default async function CiclosPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();
  const { data: ciclos } = await supabase
    .from('ciclos_evaluacion')
    .select('id, nombre, fecha_apertura, fecha_cierre_respuestas, estado')
    .eq('empresa_id', perfil.empresa_id)
    .order('fecha_apertura', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-marmol-900">Ciclos de evaluación</h1>
          <p className="text-sm text-marmol-500 mt-1">
            Hacer + Deber, semestral. Ser y Saber se verifican de forma continua.
          </p>
        </div>
        {perfil.rol === 'admin_th' && (
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-flow-500 hover:bg-flow-600 text-white text-sm font-medium px-3.5 py-2 transition">
            <Plus size={16} /> Abrir nuevo ciclo
          </button>
        )}
      </div>

      {!ciclos || ciclos.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          titulo="Aún no se ha abierto ningún ciclo"
          descripcion="El primer ciclo (2026 - Semestre 1) se crea desde el seed inicial en estado 'planeado'."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {ciclos.map((c) => (
            <Link
              key={c.id}
              href={`/circulo-crecimiento/ciclos/${c.id}`}
              className="card p-5 hover:border-flow-300 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-semibold text-marmol-900">{c.nombre}</h3>
                <span className="text-xs rounded-full bg-flow-50 text-flow-700 px-2.5 py-0.5 font-medium">
                  {ETIQUETA_ESTADO[c.estado] ?? c.estado}
                </span>
              </div>
              <p className="text-xs text-marmol-500">
                {formatearFecha(c.fecha_apertura)} → {formatearFecha(c.fecha_cierre_respuestas)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
