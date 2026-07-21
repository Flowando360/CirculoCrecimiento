import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/empty-state';
import { FormularioPublicarFeed } from '@/components/circulo-crecimiento/formulario-publicar-feed';
import { TarjetaAdjuntoFeed } from '@/components/circulo-crecimiento/tarjeta-adjunto-feed';
import { obtenerUrlFirmadaFeedAdjunto } from '@/lib/supabase/storage';
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
    .select(
      'id, tipo, titulo, contenido, fijado, created_at, autor:autor_id(nombre_completo), tipo_adjunto, archivo_url, archivo_nombre, archivo_tamano_bytes, link_url, link_preview_titulo, link_preview_imagen, link_preview_descripcion'
    )
    .eq('empresa_id', perfil.empresa_id)
    .order('fijado', { ascending: false })
    .order('created_at', { ascending: false });

  const publicacionesConAdjunto = await Promise.all(
    (publicaciones ?? []).map(async (p: any) => ({
      ...p,
      archivoUrlFirmada:
        p.tipo_adjunto !== 'ninguno' && p.tipo_adjunto !== 'link' ? await obtenerUrlFirmadaFeedAdjunto(p.archivo_url) : null,
    }))
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-marmol-900">Feed corporativo</h1>
          <p className="text-sm text-marmol-500 mt-1">
            Difusión de políticas de seguridad, alertas de riesgo, protocolos y comunicados —
            sostiene la cultura entre ciclos de evaluación.
          </p>
        </div>
        {(perfil.rol === 'admin_th' || perfil.rol === 'lider') && (
          <FormularioPublicarFeed esAdminTh={perfil.rol === 'admin_th'} empresaId={perfil.empresa_id} />
        )}
      </div>

      {publicacionesConAdjunto.length === 0 ? (
        <EmptyState
          icon={Rss}
          titulo="Aún no hay publicaciones"
          descripcion="Talento Humano y los líderes pueden publicar anuncios, políticas de SST y reconocimientos aquí."
        />
      ) : (
        <div className="space-y-3">
          {publicacionesConAdjunto.map((p: any) => (
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
              <TarjetaAdjuntoFeed
                tipoAdjunto={p.tipo_adjunto}
                archivoUrlFirmada={p.archivoUrlFirmada}
                archivoNombre={p.archivo_nombre}
                archivoTamanoBytes={p.archivo_tamano_bytes}
                linkUrl={p.link_url}
                linkPreviewTitulo={p.link_preview_titulo}
                linkPreviewImagen={p.link_preview_imagen}
                linkPreviewDescripcion={p.link_preview_descripcion}
              />
              <p className="text-xs text-marmol-400 mt-2">Publicado por {p.autor?.nombre_completo ?? 'Nexa'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
