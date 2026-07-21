'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const TIPOS = ['anuncio', 'politica_sst', 'reconocimiento', 'logro', 'general'] as const;

const PublicacionSchema = z.object({
  tipo: z.enum(TIPOS),
  titulo: z.string().trim().min(1, 'El título es requerido'),
  contenido: z.string().trim().optional(),
  fijado: z.boolean().optional(),
});

/** Publica en el feed corporativo (admin_th o líder, misma regla que RLS). */
export async function publicarEnFeed(input: z.infer<typeof PublicacionSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || !['admin_th', 'lider'].includes(perfil.rol)) return { ok: false as const, error: 'No autorizado' };

  const parsed = PublicacionSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

  const supabase = createClient();
  const { error } = await supabase.from('nexa_feed_publicaciones').insert({
    empresa_id: perfil.empresa_id,
    autor_id: perfil.usuario_id,
    tipo: parsed.data.tipo,
    titulo: parsed.data.titulo,
    contenido: parsed.data.contenido || null,
    // Fijar publicaciones queda reservado a admin_th.
    fijado: perfil.rol === 'admin_th' ? (parsed.data.fijado ?? false) : false,
  });

  if (error) return { ok: false as const, error: error.message };
  revalidatePath('/nexa/feed');
  return { ok: true as const };
}
