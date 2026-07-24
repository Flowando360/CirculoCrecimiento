import { redirect } from 'next/navigation';
import { EmptyState } from '@/components/ui/empty-state';
import { Heart } from 'lucide-react';
import { obtenerInformeCultura } from './data';

export default async function InformeCulturaPage() {
  const { perfil, filas } = await obtenerInformeCultura();
  if (!perfil) redirect('/inicio');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-secundario">Cultura y Engagement</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Reconocimientos recibidos, participación en el feed y formación de cultura completada — las señales
          reales de participación que registra Nexa.
        </p>
      </div>

      {filas.length === 0 ? (
        <EmptyState icon={Heart} titulo="Sin datos todavía" descripcion="Aún no hay reconocimientos, reacciones o formación de cultura registrados." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-marmol-200 text-left text-xs uppercase tracking-wide text-marmol-400">
                <th className="px-4 py-3 font-medium">Colaborador</th>
                <th className="px-4 py-3 font-medium">Reconocimientos</th>
                <th className="px-4 py-3 font-medium">Puntos</th>
                <th className="px-4 py-3 font-medium">Reacciones dadas</th>
                <th className="px-4 py-3 font-medium">Formación de cultura</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.colaborador_id} className="border-b border-marmol-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-marmol-900">{f.colaborador_nombre}</td>
                  <td className="px-4 py-3 text-marmol-600">{f.reconocimientos_recibidos}</td>
                  <td className="px-4 py-3 text-marmol-600">{f.puntos_totales}</td>
                  <td className="px-4 py-3 text-marmol-600">{f.reacciones_dadas}</td>
                  <td className="px-4 py-3 text-marmol-600">{f.cursos_cultura_completados}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
