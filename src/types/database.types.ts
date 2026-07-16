/**
 * Este archivo se GENERA automáticamente desde el esquema real de Supabase:
 *
 *   npm run db:types
 *
 * (requiere SUPABASE_PROJECT_ID en el entorno; ver package.json → db:types)
 *
 * Se deja aquí un placeholder mínimo para que el proyecto compile antes de
 * conectar el proyecto real de Supabase. Reemplázalo apenas corras las
 * migraciones de /supabase/migrations en tu proyecto.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: Record<string, { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }>;
    Views: Record<string, { Row: Record<string, unknown> }>;
    Functions: Record<string, unknown>;
    Enums: Record<string, string>;
  };
}
