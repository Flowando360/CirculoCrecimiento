'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const MENSAJE_ERROR = 'Correo o contraseña incorrectos. Verifica con Talento Humano si no tienes acceso.';

const LoginSchema = z.object({
  identificador: z.string().trim().min(1, MENSAJE_ERROR),
  password: z.string().min(1, MENSAJE_ERROR),
});

/**
 * Si escriben el correo completo, se usa tal cual. Si escriben solo el
 * usuario (ej. "juan.perez", sin "@"), se busca a qué correo corresponde
 * — necesita el cliente admin porque esto pasa ANTES de autenticar, sin
 * sesión con la que RLS pueda filtrar. Si el usuario no existe o coincide
 * con más de una cuenta (choque entre empresas distintas, hoy no pasa
 * porque solo hay una empresa activa), no se resuelve — nunca se revela
 * cuál fue el motivo exacto, para no delatar qué cuentas existen.
 */
async function resolverCorreo(identificador: string): Promise<string | null> {
  if (identificador.includes('@')) return identificador;

  const admin = createAdminClient();
  const { data } = await admin.from('perfiles_usuario').select('email');
  if (!data) return null;

  const coincidencias = data.filter((p) => p.email?.split('@')[0]?.toLowerCase() === identificador.toLowerCase());
  return coincidencias.length === 1 ? coincidencias[0]!.email : null;
}

export async function iniciarSesion(input: { identificador: string; password: string }) {
  const parsed = LoginSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: MENSAJE_ERROR };

  const email = await resolverCorreo(parsed.data.identificador);
  if (!email) return { ok: false as const, error: MENSAJE_ERROR };

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: parsed.data.password });
  if (error) return { ok: false as const, error: MENSAJE_ERROR };

  redirect('/inicio');
}
