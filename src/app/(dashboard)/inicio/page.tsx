import Link from 'next/link';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';
import { AlertaSeveridadDot, AlertaTipoBadge } from '@/components/alertas/alerta-badge';
import { formatearFecha } from '@/lib/utils';
import { Users, Target, ShieldAlert, TrendingUp, Bell } from 'lucide-react';

export default async function InicioPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();

  // ── Vista para Talento Humano y Gerencia: panorama completo de la empresa ──
  if (perfil.rol === 'admin_th' || perfil.rol === 'gerencia') {
    const { data: indicadores } = await supabase
      .from('v_indicadores_empresa')
      .select('*')
      .eq('empresa_id', perfil.empresa_id)
      .maybeSingle();

    const { data: alertasCriticas } = await supabase
      .from('v_alertas_proximas')
      .select('*')
      .eq('colaborador_empresa_id', perfil.empresa_id)
      .order('fecha_objetivo', { ascending: true })
      .limit(6);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-marmol-900">
            Hola, {perfil.nombre_completo.split(' ')[0]}
          </h1>
          <p className="text-sm text-marmol-500 mt-1">
            Panorama general de Mármoles y Servicios — Círculo de Crecimiento 360°
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Colaboradores activos"
            value={indicadores?.total_activos ?? '—'}
            icon={Users}
          />
          <StatCard
            label="Índice de Hacer (promedio)"
            value={indicadores?.promedio_hacer_empresa ?? '—'}
            icon={TrendingUp}
            tono="flow"
          />
          <StatCard
            label="Índice de Deber (promedio)"
            value={indicadores?.promedio_deber_empresa ?? '—'}
            icon={TrendingUp}
            tono="flow"
          />
          <StatCard
            label="Alertas críticas abiertas"
            value={indicadores?.alertas_criticas ?? 0}
            icon={ShieldAlert}
            tono={((indicadores?.alertas_criticas as number) ?? 0) > 0 ? 'bajo' : 'alto'}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <StatCard
            label="Cumplimiento Saber (promedio)"
            value={indicadores?.promedio_saber_empresa ? `${indicadores.promedio_saber_empresa}%` : '—'}
          />
          <StatCard
            label="Alineación talento-rol"
            value={indicadores?.pct_alineacion_talento_rol ? `${indicadores.pct_alineacion_talento_rol}%` : '—'}
            hint="% de personas en un rol alineado con su Ser"
          />
          <StatCard
            label="En proceso de salida"
            value={indicadores?.en_proceso_salida ?? 0}
          />
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-semibold text-marmol-900 flex items-center gap-2">
              <Bell size={16} /> Próximas alertas
            </h2>
            <Link href="/alertas" className="text-xs text-flow-600 hover:underline">
              Ver todas
            </Link>
          </div>
          {!alertasCriticas || alertasCriticas.length === 0 ? (
            <p className="text-sm text-marmol-400">No hay alertas próximas por ahora.</p>
          ) : (
            <div className="space-y-2">
              {alertasCriticas.map((a) => (
                <div key={a.id as string} className="flex items-center gap-3 py-2 border-b border-marmol-100 last:border-0">
                  <AlertaSeveridadDot severidad={a.severidad as 'info' | 'atencion' | 'critica'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-marmol-800 truncate">{a.titulo as string}</p>
                    <p className="text-xs text-marmol-400">{a.colaborador_nombre as string}</p>
                  </div>
                  <AlertaTipoBadge tipo={a.tipo as string} />
                  <span className="text-xs text-marmol-400 w-24 text-right">
                    {formatearFecha(a.fecha_objetivo as string)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Vista para Líder: su equipo ─────────────────────────────────────────
  if (perfil.rol === 'lider') {
    const { data: equipo } = await supabase
      .from('v_indicadores_equipo')
      .select('*')
      .eq('lider_id', perfil.colaborador_id ?? '')
      .maybeSingle();

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-marmol-900">
            Hola, {perfil.nombre_completo.split(' ')[0]}
          </h1>
          <p className="text-sm text-marmol-500 mt-1">Resumen de tu equipo</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Tamaño del equipo" value={equipo?.tamano_equipo ?? 0} icon={Users} />
          <StatCard label="Hacer (promedio equipo)" value={equipo?.promedio_hacer ?? '—'} tono="flow" />
          <StatCard label="Deber (promedio equipo)" value={equipo?.promedio_deber ?? '—'} tono="flow" />
          <StatCard
            label="PDI pendientes"
            value={equipo?.pdi_pendientes ?? 0}
            icon={Target}
            tono={((equipo?.pdi_pendientes as number) ?? 0) > 0 ? 'medio' : 'alto'}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/circulo-crecimiento/colaboradores" className="card p-5 hover:border-flow-300 transition">
            <h3 className="font-display font-semibold text-marmol-900 mb-1">Mi equipo</h3>
            <p className="text-sm text-marmol-500">Ver fichas, evaluaciones y Guía del Flow de cada persona.</p>
          </Link>
          <Link href="/circulo-crecimiento/pdi" className="card p-5 hover:border-flow-300 transition">
            <h3 className="font-display font-semibold text-marmol-900 mb-1">Planes de Desarrollo</h3>
            <p className="text-sm text-marmol-500">Seguimiento a los compromisos de cada colaborador.</p>
          </Link>
        </div>
      </div>
    );
  }

  // ── Vista para Colaborador: su propio resumen ───────────────────────────
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">
          Hola, {perfil.nombre_completo.split(' ')[0]}
        </h1>
        <p className="text-sm text-marmol-500 mt-1">Este es tu espacio de crecimiento</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/mi-perfil" className="card p-5 hover:border-flow-300 transition">
          <h3 className="font-display font-semibold text-marmol-900 mb-1">Mi Perfil</h3>
          <p className="text-sm text-marmol-500">Tu ficha, resultados y Guía del Flow.</p>
        </Link>
        <Link href="/circulo-crecimiento/pdi" className="card p-5 hover:border-flow-300 transition">
          <h3 className="font-display font-semibold text-marmol-900 mb-1">Mi Plan de Desarrollo</h3>
          <p className="text-sm text-marmol-500">Tus compromisos y su avance.</p>
        </Link>
        <Link href="/nexa/formacion" className="card p-5 hover:border-flow-300 transition">
          <h3 className="font-display font-semibold text-marmol-900 mb-1">Formación</h3>
          <p className="text-sm text-marmol-500">Tus cursos asignados y de SST.</p>
        </Link>
      </div>

      <EmptyState
        icon={Bell}
        titulo="Sin evaluaciones pendientes por ahora"
        descripcion="Cuando se abra un nuevo ciclo o tengas una autoevaluación pendiente, aparecerá aquí."
      />
    </div>
  );
}
