import { createClient } from '@/lib/supabase/server';
import type { RolUsuario } from '@/types/colaborador';

export interface PerfilActual {
  usuario_id: string;
  empresa_id: string;
  rol: RolUsuario;
  nombre_completo: string;
  email: string;
  colaborador_id: string | null;
}

/**
 * Trae el perfil (rol + empresa + ficha de colaborador vinculada) del
 * usuario autenticado actual. Se usa en Server Components para decidir
 * qué mostrar en el sidebar y filtrar consultas por rol.
 */
export async function getPerfilActual(): Promise<PerfilActual | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: perfil } = await supabase
    .from('perfiles_usuario')
    .select('id, empresa_id, rol, nombre_completo, email')
    .eq('id', user.id)
    .single();

  if (!perfil) return null;

  const { data: colaborador } = await supabase
    .from('colaboradores')
    .select('id')
    .eq('usuario_id', user.id)
    .maybeSingle();

  return {
    usuario_id: perfil.id as string,
    empresa_id: perfil.empresa_id as string,
    rol: perfil.rol as RolUsuario,
    nombre_completo: perfil.nombre_completo as string,
    email: perfil.email as string,
    colaborador_id: (colaborador?.id as string) ?? null,
  };
}
