import { createClient } from '@/lib/supabase/server';

const UNA_HORA_EN_SEGUNDOS = 60 * 60;

/**
 * Genera un link temporal (1 hora) para ver un PDF de la Guía del Flow.
 * El bucket "guias-flow" es privado — documento_pdf_url guarda la RUTA del
 * archivo, no una URL directa, así que hay que firmarla en cada render.
 * Devuelve null si la ruta no existe o si quien pide el link no tiene
 * permiso (Storage aplica su propia policy de lectura).
 */
export async function obtenerUrlFirmadaGuiaFlow(path: string | null): Promise<string | null> {
  if (!path) return null;

  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('guias-flow')
    .createSignedUrl(path, UNA_HORA_EN_SEGUNDOS);

  if (error || !data) return null;
  return data.signedUrl;
}
