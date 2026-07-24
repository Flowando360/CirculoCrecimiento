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

/**
 * Igual que arriba pero para adjuntos del feed corporativo (bucket privado
 * "feed-adjuntos"): documentos, video o imagen destacada de un comunicado.
 */
export async function obtenerUrlFirmadaFeedAdjunto(path: string | null): Promise<string | null> {
  if (!path) return null;

  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('feed-adjuntos')
    .createSignedUrl(path, UNA_HORA_EN_SEGUNDOS);

  if (error || !data) return null;
  return data.signedUrl;
}

/**
 * Igual que arriba pero para documentos del colaborador (bucket privado
 * "documentos-colaborador"): hoja de vida y contrato. La ruta de cada
 * archivo trae el tipo ("hoja-vida" o "contrato") como tercer segmento, así
 * que Storage aplica una regla de lectura más estricta para el contrato
 * (excluye al líder, por el salario).
 */
export async function obtenerUrlFirmadaDocumentoColaborador(path: string | null): Promise<string | null> {
  if (!path) return null;

  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('documentos-colaborador')
    .createSignedUrl(path, UNA_HORA_EN_SEGUNDOS);

  if (error || !data) return null;
  return data.signedUrl;
}
