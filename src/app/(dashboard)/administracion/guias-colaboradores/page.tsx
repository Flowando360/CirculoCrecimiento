import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { FormularioSubirGuia } from '@/components/circulo-crecimiento/formulario-subir-guia';
import { formatearFecha } from '@/lib/utils';
import { FileText } from 'lucide-react';

export default async function GuiasColaboradoresPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();

  const [{ data: colaboradores }, { data: guias }] = await Promise.all([
    supabase
      .from('colaboradores')
      .select('id, nombre_completo')
      .eq('empresa_id', perfil.empresa_id)
      .eq('estado', 'activo')
      .order('nombre_completo'),
    supabase
      .from('guia_del_flow')
      .select('id, documento_pdf_url, fecha_aplicacion, colaborador:colaborador_id(nombre_completo)')
      .order('fecha_aplicacion', { ascending: false }),
  ]);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Guías de colaboradores</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Sube el PDF de la Guía del Flow de cada persona (diseñada por FlowAndo) para que quede
          disponible en su ficha y en Mi Perfil.
        </p>
      </div>

      <FormularioSubirGuia colaboradores={(colaboradores ?? []) as any} />

      <div className="card p-5">
        <h3 className="font-display font-semibold text-marmol-900 mb-3 flex items-center gap-1.5">
          <FileText size={16} /> Guías ya cargadas
        </h3>
        {!guias || guias.length === 0 ? (
          <p className="text-sm text-marmol-400">Sin guías cargadas todavía.</p>
        ) : (
          <ul className="space-y-2">
            {guias.map((g: any) => (
              <li key={g.id} className="flex items-center justify-between border-b border-marmol-100 pb-2 last:border-0">
                <div>
                  <p className="text-sm font-medium text-marmol-800">{g.colaborador?.nombre_completo}</p>
                  <p className="text-xs text-marmol-400">Cargada el {formatearFecha(g.fecha_aplicacion)}</p>
                </div>
                {g.documento_pdf_url && (
                  <a href={g.documento_pdf_url} target="_blank" rel="noreferrer" className="text-xs text-flow-600 hover:underline">
                    Ver PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
