'use server';

import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const RUTA = '/mi-perfil';

const FechasPersonalesSchema = z.object({
  fechaMatrimonio: z.string().trim().optional(),
  fechaBabyShower: z.string().trim().optional(),
  enEmbarazo: z.boolean(),
  fechaProbableParto: z.string().trim().optional(),
});

export async function actualizarFechasPersonales(input: z.infer<typeof FechasPersonalesSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || !perfil.colaborador_id) return { ok: false as const, error: 'No autorizado' };

  const parsed = FechasPersonalesSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

  const supabase = createClient();
  const { error } = await supabase.from('fechas_personales_colaborador').upsert(
    {
      colaborador_id: perfil.colaborador_id,
      fecha_matrimonio: parsed.data.fechaMatrimonio || null,
      fecha_baby_shower: parsed.data.fechaBabyShower || null,
      en_embarazo: parsed.data.enEmbarazo,
      fecha_probable_parto: parsed.data.fechaProbableParto || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'colaborador_id' }
  );

  if (error) return { ok: false as const, error: error.message };
  revalidatePath(RUTA);
  return { ok: true as const };
}
