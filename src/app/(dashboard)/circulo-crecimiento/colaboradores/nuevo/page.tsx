import Link from 'next/link';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { FormularioNuevoColaborador } from '@/components/circulo-crecimiento/formulario-nuevo-colaborador';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default async function NuevoColaboradorPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;
  if (perfil.rol !== 'admin_th') redirect('/inicio');

  const supabase = createClient();

  const [{ data: cargos }, { data: colaboradores }] = await Promise.all([
    supabase
      .from('cargos')
      .select('id, nombre, proceso_area')
      .eq('empresa_id', perfil.empresa_id)
      .order('proceso_area'),
    supabase
      .from('colaboradores')
      .select('id, nombre_completo')
      .eq('empresa_id', perfil.empresa_id)
      .eq('estado', 'activo')
      .order('nombre_completo'),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/circulo-crecimiento/colaboradores"
          className="inline-flex items-center gap-1 text-xs text-marmol-400 hover:text-marmol-600 mb-2"
        >
          <ArrowLeft size={12} /> Volver a Colaboradores
        </Link>
        <h1 className="font-display text-2xl font-semibold text-secundario flex items-center gap-2">
          <UserPlus size={22} className="text-flow-600" /> Nuevo colaborador
        </h1>
        <p className="text-sm text-marmol-500 mt-1">
          Crea la ficha con sus datos personales, cargo y contrato. Una vez creada, desde su ficha
          podrás cargar también hoja de vida y certificaciones, inducción, documentos, incapacidades y
          fechas especiales — y si necesita acceso a la app, crear su cuenta desde Usuarios y roles.
        </p>
      </div>

      {!cargos || cargos.length === 0 ? (
        <div className="card p-5 text-sm text-marmol-500">
          Todavía no hay ningún cargo creado en Administración → Cargos. Crea al menos un cargo antes
          de registrar colaboradores, para poder asociarle su perfil.
        </div>
      ) : (
        <FormularioNuevoColaborador cargos={cargos} posiblesLideres={colaboradores ?? []} />
      )}
    </div>
  );
}
