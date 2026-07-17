'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';

/**
 * Sube el PDF de la Guía del Flow (ya diseñada por FlowAndo) a Supabase
 * Storage y la asocia al colaborador. Requiere que exista el bucket
 * "guias-flow" en Storage (crear una vez desde el panel de Supabase,
 * como privado, y agregar policy de lectura para admin_th/lider/propio colaborador).
 */
export async function subirGuiaDelFlow(formData: FormData) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false, error: 'No autorizado' };

  const colaboradorId = formData.get('colaboradorId') as string;
  const origenFlow = formData.get('origenFlow') as string;
  const file = formData.get('archivo') as File;

  if (!colaboradorId || !file || file.size === 0) {
    return { ok: false, error: 'Selecciona un colaborador y un archivo PDF' };
  }

  const supabase = createClient();

  const path = `${perfil.empresa_id}/${colaboradorId}/guia-del-flow-${Date.now()}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from('guias-flow')
    .upload(path, file, { contentType: 'application/pdf', upsert: true });

  if (uploadError) {
    return { ok: false, error: `Error subiendo el archivo: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage.from('guias-flow').getPublicUrl(path);

  const { error: dbError } = await supabase.from('guia_del_flow').insert({
    colaborador_id: colaboradorId,
    documento_pdf_url: urlData.publicUrl,
    origen_flow: origenFlow || null,
    perfil_narrativo_completo: 'Ver PDF adjunto (Guía del Flow diseñada por FlowAndo).',
  });

  if (dbError) {
    return { ok: false, error: dbError.message };
  }

  revalidatePath('/administracion/guias-colaboradores');
  return { ok: true };
}
