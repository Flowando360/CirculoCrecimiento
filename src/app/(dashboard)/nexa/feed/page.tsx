import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { formatearFecha } from '@/lib/utils';
import { Rss, Pin } from 'lucide-react';

const ETIQUETA_TIPO: Record<string, string> = {
  anuncio: 'Anuncio',
  politica_sst: 'Política SST',
  reconocimiento: 'Reconocimiento',
  logro: 'Logro',
  general: 'General',
};

export default async function NexaFeedPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();
  const { data: publicaciones } = await supabase
    .from('nexa_feed_publicaciones')
    .select('id, tipo, titulo, contenido, fijado, created_at, autor:autor_id(nombre_completo)')
    .eq('empresa_id', perfil.empresa_id)
    .order('fijado', { ascending: false })
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Feed corporativo</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Difusión de políticas de seguridad, alertas de riesgo, protocolos y comunicados —
          sostiene la cultura entre ciclos de evaluación.
        </p>
      </div>

      {!publicaciones || publicaciones.length === 0 ? (
        <EmptyState
          icon={Rss}
          titulo="Aún no hay publicaciones"
          descripcion="Talento Humano y los líderes pueden publicar anuncios, políticas de SST y reconocimientos aquí."
        />
      ) : (
        <div className="space-y-3">
          {publicaciones.map((p: any) => (
            <div key={p.id} className="card p-4">
              <div className="flex items-center gap-2 mb-1.5">
                {p.fijado && <Pin size={12} className="text-flow-500" />}
                <span className="text-xs rounded-full bg-flow-50 text-flow-700 px-2 py-0.5 font-medium">
                  {ETIQUETA_TIPO[p.tipo] ?? p.tipo}
                </span>
                <span className="text-xs text-marmol-400">{formatearFecha(p.created_at)}</span>
              </div>
              <h3 className="font-display font-semibold text-marmol-900">{p.titulo}</h3>
              {p.contenido && <p className="text-sm text-marmol-600 mt-1">{p.contenido}</p>}
              <p className="text-xs text-marmol-400 mt-2">Publicado por {p.autor?.nombre_completo ?? 'Nexa'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
