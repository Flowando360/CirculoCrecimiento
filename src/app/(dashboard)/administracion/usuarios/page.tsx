import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { etiquetaRol } from '@/lib/utils';
import { FormularioCrearUsuario } from '@/components/circulo-crecimiento/formulario-crear-usuario';

export default async function AdminUsuariosPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();

  const [{ data: usuarios }, { data: sinCuentaRaw }] = await Promise.all([
    supabase
      .from('perfiles_usuario')
      .select('id, nombre_completo, email, rol, activo')
      .eq('empresa_id', perfil.empresa_id)
      .order('nombre_completo'),
    supabase
      .from('colaboradores')
      .select('id, nombre_completo, email')
      .eq('empresa_id', perfil.empresa_id)
      .eq('estado', 'activo')
      .is('usuario_id', null)
      .order('nombre_completo'),
  ]);

  // Los 10 colaboradores de demostración (correo demo.*@ejemplo.com) no
  // necesitan cuenta real — se excluyen de la lista para invitar.
  const colaboradoresSinCuenta = (sinCuentaRaw ?? [])
    .filter((c) => !c.email?.startsWith('demo.'))
    .map((c) => ({ id: c.id, nombre_completo: c.nombre_completo }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-marmol-900">Usuarios y roles</h1>
          <p className="text-sm text-marmol-500 mt-1">
            admin_th ve y edita todo · lider ve su equipo y su propia info · colaborador se ve a sí
            mismo · gerencia ve reportes agregados.
          </p>
        </div>
        <FormularioCrearUsuario colaboradoresSinCuenta={colaboradoresSinCuenta} />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-marmol-200 text-left text-xs uppercase tracking-wide text-marmol-400">
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Correo</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {(usuarios ?? []).map((u) => (
              <tr key={u.id} className="border-b border-marmol-100 last:border-0">
                <td className="px-4 py-3 font-medium text-marmol-900">{u.nombre_completo}</td>
                <td className="px-4 py-3 text-marmol-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="text-xs rounded-full bg-flow-50 text-flow-700 px-2 py-0.5 font-medium">
                    {etiquetaRol[u.rol as string] ?? u.rol}
                  </span>
                </td>
                <td className="px-4 py-3 text-marmol-500">{u.activo ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
