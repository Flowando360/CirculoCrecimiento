import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminOrganigramaPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();
  const { data: colaboradores } = await supabase
    .from('colaboradores')
    .select('id, nombre_completo, lider_id, cargo:cargos(nombre)')
    .eq('empresa_id', perfil.empresa_id)
    .eq('estado', 'activo')
    .order('nombre_completo');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-secundario">Editar organigrama</h1>
        <p className="text-sm text-marmol-500 mt-1">
          El líder de cada persona es la única fuente de verdad: pares y colaboradores a cargo se
          deducen automáticamente. Cambiar el líder aquí actualiza al instante la arquitectura de
          acompañantes del próximo ciclo.
        </p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-marmol-200 text-left text-xs uppercase tracking-wide text-marmol-400">
              <th className="px-4 py-3 font-medium">Colaborador</th>
              <th className="px-4 py-3 font-medium">Cargo</th>
              <th className="px-4 py-3 font-medium">Líder directo</th>
            </tr>
          </thead>
          <tbody>
            {(colaboradores ?? []).map((c: any) => (
              <tr key={c.id} className="border-b border-marmol-100 last:border-0">
                <td className="px-4 py-3 font-medium text-marmol-900">{c.nombre_completo}</td>
                <td className="px-4 py-3 text-marmol-600">{c.cargo?.nombre}</td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={c.lider_id ?? ''}
                    className="rounded-lg border border-marmol-200 px-2 py-1 text-sm bg-white"
                  >
                    <option value="">— Sin líder (nivel 1) —</option>
                    {(colaboradores ?? [])
                      .filter((l: any) => l.id !== c.id)
                      .map((l: any) => (
                        <option key={l.id} value={l.id}>
                          {l.nombre_completo}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-marmol-400">
        Nota: este selector queda listo para conectarse a una Server Action de actualización
        (`UPDATE colaboradores SET lider_id = ...`); se deja como siguiente paso de implementación.
      </p>
    </div>
  );
}
