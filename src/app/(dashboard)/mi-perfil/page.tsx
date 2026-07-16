import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { SemaforoBadge } from '@/components/circulo-crecimiento/semaforo-badge';
import { formatearFecha } from '@/lib/utils';
import { EmptyState } from '@/components/ui/empty-state';
import { User } from 'lucide-react';

export default async function MiPerfilPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  if (!perfil.colaborador_id) {
    return (
      <EmptyState
        icon={User}
        titulo="Tu usuario aún no está vinculado a una ficha de colaborador"
        descripcion="Pide a Talento Humano que asocie tu cuenta a tu ficha en Administración → Usuarios."
      />
    );
  }

  const supabase = createClient();

  const [{ data: colaborador }, { data: resultado }, { data: ser }, { data: saber }] = await Promise.all([
    supabase
      .from('colaboradores')
      .select('nombre_completo, fecha_ingreso, cargo:cargos(nombre, proceso_area, objetivo_cargo), lider:lider_id(nombre_completo)')
      .eq('id', perfil.colaborador_id)
      .maybeSingle(),
    supabase
      .from('resultados_evaluacion')
      .select('indice_hacer, indice_deber, semaforo_hacer, semaforo_deber, evaluacion:evaluaciones!inner(colaborador_evaluado_id)')
      .eq('evaluacion.colaborador_evaluado_id', perfil.colaborador_id)
      .order('actualizado_en', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('guia_del_flow')
      .select('*')
      .eq('colaborador_id', perfil.colaborador_id)
      .order('fecha_aplicacion', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from('v_saber_cumplimiento').select('*').eq('colaborador_id', perfil.colaborador_id).maybeSingle(),
  ]);

  const cargo = colaborador?.cargo as any;
  const lider = colaborador?.lider as any;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Mi Perfil</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Tu ficha 360°: quién eres para la organización, tus resultados y tu formación.
        </p>
      </div>

      <div className="card p-6">
        <h2 className="font-display font-semibold text-marmol-900">{colaborador?.nombre_completo}</h2>
        <p className="text-sm text-marmol-500">
          {cargo?.nombre} · {cargo?.proceso_area}
        </p>
        <p className="text-xs text-marmol-400 mt-1">
          Ingreso: {colaborador ? formatearFecha(colaborador.fecha_ingreso) : '—'} · Líder:{' '}
          {lider?.nombre_completo ?? '—'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-xs text-marmol-500 mb-1">SER</p>
          <p className="text-sm text-marmol-700">{ser ? 'Completada' : 'Pendiente'}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-marmol-500 mb-1">SABER</p>
          <p className="text-lg font-display font-semibold">
            {saber?.porcentaje_cumplimiento ? `${saber.porcentaje_cumplimiento}%` : '—'}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-marmol-500 mb-1">HACER</p>
          <SemaforoBadge nivel={resultado?.semaforo_hacer as any} />
        </div>
        <div className="card p-4">
          <p className="text-xs text-marmol-500 mb-1">DEBER</p>
          <SemaforoBadge nivel={resultado?.semaforo_deber as any} />
        </div>
      </div>

      {ser && (
        <div className="card p-5">
          <h3 className="font-display font-semibold text-marmol-900 mb-2">Mi Guía del Flow</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-marmol-700">
            {ser.talentos_naturales && (
              <div>
                <p className="text-xs text-marmol-400 mb-0.5">Talentos naturales</p>
                <p>{ser.talentos_naturales}</p>
              </div>
            )}
            {ser.proposito && (
              <div>
                <p className="text-xs text-marmol-400 mb-0.5">Propósito</p>
                <p>{ser.proposito}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
