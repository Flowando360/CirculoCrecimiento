'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CrearCuentaSchema = z.object({
  nombreCompleto: z.string().trim().min(1, 'El nombre es requerido'),
  email: z.string().trim().email('Correo inválido'),
  rol: z.enum(['admin_th', 'lider', 'colaborador', 'gerencia']),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  colaboradorId: z.string().uuid().optional(),
});

/**
 * Crea una cuenta real (admin_th únicamente): usuario de Supabase Auth con
 * contraseña temporal asignada por admin_th (sin depender de correo de
 * invitación, que hoy no está configurado) + su fila en perfiles_usuario +,
 * si se vincula a un colaborador existente, colaboradores.usuario_id.
 */
export async function crearCuentaUsuario(input: z.infer<typeof CrearCuentaSchema>) {
  const perfil = await getPerfilActual();
  if (!perfil || perfil.rol !== 'admin_th') return { ok: false as const, error: 'No autorizado' };

  const parsed = CrearCuentaSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };
  }

  const admin = createAdminClient();

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: parsed.data.email,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: { nombre_completo: parsed.data.nombreCompleto },
  });

  if (authError || !authData.user) {
    return { ok: false as const, error: authError?.message ?? 'No se pudo crear la cuenta' };
  }

  const { error: perfilError } = await admin.from('perfiles_usuario').insert({
    id: authData.user.id,
    empresa_id: perfil.empresa_id,
    rol: parsed.data.rol,
    nombre_completo: parsed.data.nombreCompleto,
    email: parsed.data.email,
  });

  if (perfilError) {
    // No dejar una cuenta de Auth huérfana sin su perfil.
    await admin.auth.admin.deleteUser(authData.user.id);
    return { ok: false as const, error: perfilError.message };
  }

  if (parsed.data.colaboradorId) {
    const { error: colabError } = await admin
      .from('colaboradores')
      .update({ usuario_id: authData.user.id })
      .eq('id', parsed.data.colaboradorId)
      .eq('empresa_id', perfil.empresa_id);

    if (colabError) {
      return {
        ok: false as const,
        error: `La cuenta se creó, pero no se pudo vincular al colaborador: ${colabError.message}`,
      };
    }
  }

  revalidatePath('/administracion/usuarios');
  return { ok: true as const };
}
