'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

async function esAdminThDeEsteColaborador(colaboradorId: string) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return null;

  const supabase = createClient();
  const { data: colaborador } = await supabase
    .from('colaboradores')
    .select('id, empresa_id')
    .eq('id', colaboradorId)
    .maybeSingle();

  if (!colaborador || colaborador.empresa_id !== perfil.empresa_id) return null;
  return perfil;
}

function revalidar(colaboradorId: string) {
  revalidatePath(`/circulo-crecimiento/colaboradores/${colaboradorId}/guia-flow`);
  revalidatePath(`/circulo-crecimiento/colaboradores/${colaboradorId}`);
  revalidatePath('/informes/brechas');
}

const CrearGuiaSchema = z.object({ colaboradorId: z.string().uuid() });

/** Inicia una nueva aplicación de la Guía del Flow (admin_th). */
export async function crearGuiaDelFlow(input: z.infer<typeof CrearGuiaSchema>) {
  const parsed = CrearGuiaSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: 'Datos inválidos' };

  const perfil = await esAdminThDeEsteColaborador(parsed.data.colaboradorId);
  if (!perfil) return { ok: false as const, error: 'No autorizado' };

  const supabase = createClient();
  const { data, error } = await supabase
    .from('guia_del_flow')
    .insert({ colaborador_id: parsed.data.colaboradorId })
    .select('id')
    .single();

  if (error) return { ok: false as const, error: error.message };

  revalidar(parsed.data.colaboradorId);
  return { ok: true as const, guiaDelFlowId: data.id as string };
}

const SubirPdfSchema = z.object({
  colaboradorId: z.string().uuid(),
  guiaDelFlowId: z.string().uuid(),
});

/** Sube (o reemplaza) el PDF de una aplicación existente (admin_th). */
export async function subirPdfGuiaDelFlow(formData: FormData) {
  const parsed = SubirPdfSchema.safeParse({
    colaboradorId: formData.get('colaboradorId'),
    guiaDelFlowId: formData.get('guiaDelFlowId'),
  });
  if (!parsed.success) return { ok: false as const, error: 'Datos inválidos' };

  const perfil = await esAdminThDeEsteColaborador(parsed.data.colaboradorId);
  if (!perfil) return { ok: false as const, error: 'No autorizado' };

  const file = formData.get('archivo') as File;
  if (!file || file.size === 0) return { ok: false as const, error: 'Selecciona un archivo PDF' };

  const supabase = createClient();
  const path = `${perfil.empresa_id}/${parsed.data.colaboradorId}/guia-del-flow-${Date.now()}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('guias-flow')
    .upload(path, file, { contentType: 'application/pdf', upsert: true });

  if (uploadError) return { ok: false as const, error: `Error subiendo el archivo: ${uploadError.message}` };

  // El bucket es privado: se guarda la ruta, no una URL pública. Quien la
  // muestre debe generar un signed URL en el momento (ver lib/supabase/storage.ts).
  const { error: dbError } = await supabase
    .from('guia_del_flow')
    .update({ documento_pdf_url: path })
    .eq('id', parsed.data.guiaDelFlowId);

  if (dbError) return { ok: false as const, error: dbError.message };

  revalidar(parsed.data.colaboradorId);
  return { ok: true as const };
}

const PuntajeSchema = z.object({
  colaboradorId: z.string().uuid(),
  guiaDelFlowId: z.string().uuid(),
  aspectoId: z.string().uuid(),
  puntaje: z.number().int().min(1).max(5),
});

/** Carga el puntaje oficial de un aspecto (admin_th únicamente). */
export async function guardarPuntajeSer(input: z.infer<typeof PuntajeSchema>) {
  const parsed = PuntajeSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: 'Datos inválidos' };

  const perfil = await esAdminThDeEsteColaborador(parsed.data.colaboradorId);
  if (!perfil) return { ok: false as const, error: 'No autorizado' };

  const supabase = createClient();
  const { error } = await supabase.from('ser_puntajes').upsert(
    {
      guia_del_flow_id: parsed.data.guiaDelFlowId,
      aspecto_id: parsed.data.aspectoId,
      puntaje: parsed.data.puntaje,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'guia_del_flow_id,aspecto_id' }
  );

  if (error) return { ok: false as const, error: error.message };

  revalidar(parsed.data.colaboradorId);
  return { ok: true as const };
}

const ComentarioSchema = z.object({
  colaboradorId: z.string().uuid(),
  guiaDelFlowId: z.string().uuid(),
  aspectoId: z.string().uuid().nullable(),
  comentario: z.string().trim().min(1, 'Escribe algo antes de guardar'),
});

/**
 * Guarda la reflexión del propio colaborador sobre un aspecto puntual
 * (aspectoId) o sobre el conjunto (aspectoId null). Nunca toca ser_puntajes.
 */
export async function guardarComentarioColaborador(input: z.infer<typeof ComentarioSchema>) {
  const parsed = ComentarioSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'colaborador' || perfil.colaborador_id !== parsed.data.colaboradorId) {
    return { ok: false as const, error: 'No autorizado' };
  }

  const supabase = createClient();
  let buscar = supabase
    .from('ser_comentarios_colaborador')
    .select('id')
    .eq('guia_del_flow_id', parsed.data.guiaDelFlowId);
  buscar = parsed.data.aspectoId ? buscar.eq('aspecto_id', parsed.data.aspectoId) : buscar.is('aspecto_id', null);
  const { data: existente } = await buscar.maybeSingle();

  const supabaseWrite = createClient();
  const { error } = existente
    ? await supabaseWrite
        .from('ser_comentarios_colaborador')
        .update({ comentario: parsed.data.comentario, updated_at: new Date().toISOString() })
        .eq('id', existente.id)
    : await supabaseWrite.from('ser_comentarios_colaborador').insert({
        guia_del_flow_id: parsed.data.guiaDelFlowId,
        aspecto_id: parsed.data.aspectoId,
        colaborador_id: parsed.data.colaboradorId,
        comentario: parsed.data.comentario,
      });

  if (error) return { ok: false as const, error: error.message };

  revalidar(parsed.data.colaboradorId);
  return { ok: true as const };
}
