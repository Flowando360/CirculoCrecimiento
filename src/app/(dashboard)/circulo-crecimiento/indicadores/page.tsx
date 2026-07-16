import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/ui/stat-card';
import { IndicadoresEquipoChart } from '@/components/circulo-crecimiento/indicadores-equipo-chart';
import { TrendingUp, Users, ShieldAlert, GraduationCap } from 'lucide-react';

export default async function IndicadoresPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();

  const [{ data: empresa }, { data: equipos }] = await Promise.all([
    supabase.from('v_indicadores_empresa').select('*').eq('empresa_id', perfil.empresa_id).maybeSingle(),
    supabase.from('v_indicadores_equipo').select('*').eq('empresa_id', perfil.empresa_id),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Indicadores</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Alineación talento-rol, brechas de formación, cumplimiento y coherencia cultural — por
          organización y por equipo.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Índice de Hacer" value={empresa?.promedio_hacer_empresa ?? '—'} icon={TrendingUp} tono="flow" />
        <StatCard label="Índice de Deber" value={empresa?.promedio_deber_empresa ?? '—'} icon={TrendingUp} tono="flow" />
        <StatCard
          label="Cumplimiento Saber"
          value={empresa?.promedio_saber_empresa ? `${empresa.promedio_saber_empresa}%` : '—'}
          icon={GraduationCap}
        />
        <StatCard
          label="Alineación talento-rol"
          value={empresa?.pct_alineacion_talento_rol ? `${empresa.pct_alineacion_talento_rol}%` : '—'}
          icon={Users}
        />
      </div>

      <StatCard
        label="Alertas críticas abiertas"
        value={empresa?.alertas_criticas ?? 0}
        icon={ShieldAlert}
        tono={((empresa?.alertas_criticas as number) ?? 0) > 0 ? 'bajo' : 'alto'}
      />

      <div className="card p-5">
        <h2 className="font-display font-semibold text-marmol-900 mb-4">
          Mapa de equipos: Hacer vs. Deber promedio
        </h2>
        <IndicadoresEquipoChart
          datos={(equipos ?? []).map((e: any) => ({
            equipo: e.lider_nombre,
            hacer: e.promedio_hacer ?? 0,
            deber: e.promedio_deber ?? 0,
            saber: e.promedio_saber ?? 0,
          }))}
        />
      </div>
    </div>
  );
}
