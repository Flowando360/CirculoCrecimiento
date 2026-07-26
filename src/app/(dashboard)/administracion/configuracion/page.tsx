import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { EmptyState } from '@/components/ui/empty-state';
import { FormularioPonderaciones } from '@/components/administracion/formulario-ponderaciones';
import { FormularioDatosEmpresa } from '@/components/administracion/formulario-datos-empresa';
import { ListaCursosRecomendados } from '@/components/administracion/lista-cursos-recomendados';
import { SlidersHorizontal } from 'lucide-react';

export default async function AdminConfiguracionPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();

  const { data: empresa } = await supabase
    .from('empresas')
    .select('nit, direccion, telefono, ciudad, firmante_nombre, firmante_cargo')
    .eq('id', perfil.empresa_id)
    .maybeSingle();

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

  const [{ data: cursos }, { data: recomendados }] = await Promise.all([
    supabase.from('nexa_cursos').select('id, titulo').eq('empresa_id', perfil.empresa_id).eq('activo', true).order('titulo'),
    supabase
      .from('dimension_cursos_recomendados')
      .select('id, dimension, curso_id, curso:curso_id(titulo)')
      .eq('empresa_id', perfil.empresa_id),
  ]);

  const cursosDisponibles = (cursos ?? []).map((c) => ({ id: c.id as string, titulo: c.titulo as string }));
  const mapearAsignaciones = (dim: 'hacer' | 'deber') =>
    (recomendados ?? [])
      .filter((r: any) => r.dimension === dim)
      .map((r: any) => ({ id: r.id as string, curso_id: r.curso_id as string, curso_titulo: r.curso?.titulo ?? '—' }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-secundario">Configuración</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Pesos de ponderación entre fuentes de valoración. Editable sin tocar fórmulas — se aplica
          al próximo ciclo que se abra.
        </p>
      </div>

      <FormularioDatosEmpresa
        inicial={{
          nit: empresa?.nit ?? '',
          direccion: empresa?.direccion ?? '',
          telefono: empresa?.telefono ?? '',
          ciudad: empresa?.ciudad ?? '',
          firmanteNombre: empresa?.firmante_nombre ?? '',
          firmanteCargo: empresa?.firmante_cargo ?? '',
        }}
      />

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

      <div>
        <h2 className="font-display text-lg font-semibold text-secundario mb-1">
          Motor automático de brechas → formación
        </h2>
        <p className="text-sm text-marmol-500 mb-3">
          Al cerrarse un Encuentro de Crecimiento con el semáforo de Hacer o Deber en bajo, se genera un
          Plan de Desarrollo automático y se asignan estos cursos, sin intervención manual.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <ListaCursosRecomendados
            dimension="hacer"
            titulo="Cursos para brecha de Hacer"
            asignacionesIniciales={mapearAsignaciones('hacer')}
            cursosDisponibles={cursosDisponibles}
          />
          <ListaCursosRecomendados
            dimension="deber"
            titulo="Cursos para brecha de Deber"
            asignacionesIniciales={mapearAsignaciones('deber')}
            cursosDisponibles={cursosDisponibles}
          />
        </div>
      </div>
    </div>
  );
}
