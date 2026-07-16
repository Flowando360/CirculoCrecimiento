import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { etiquetaRol } from '@/lib/utils';
import { UserPlus } from 'lucide-react';

export default async function AdminUsuariosPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();
  const { data: usuarios } = await supabase
    .from('perfiles_usuario')
    .select('id, nombre_completo, email, rol, activo')
    .eq('empresa_id', perfil.empresa_id)
    .order('nombre_completo');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-marmol-900">Usuarios y roles</h1>
          <p className="text-sm text-marmol-500 mt-1">
            admin_th ve y edita todo · lider ve su equipo y su propia info · colaborador se ve a sí
            mismo · gerencia ve reportes agregados.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-flow-500 hover:bg-flow-600 text-white text-sm font-medium px-3.5 py-2 transition">
          <UserPlus size={16} /> Invitar usuario
        </button>
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
