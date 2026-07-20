import Link from 'next/link';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { Target } from 'lucide-react';
import type { RolUsuario } from '@/types/colaborador';

interface InformeDisponible {
  href: string;
  titulo: string;
  descripcion: string;
  icon: React.ElementType;
  roles: RolUsuario[];
}

// Se va completando a medida que se construye cada informe de la Fase 2.
const INFORMES: InformeDisponible[] = [
  {
    href: '/informes/pdi',
    titulo: 'Plan de Desarrollo Individual (PDI)',
    descripcion: 'Brechas detectadas, plan de acción y seguimiento a su cumplimiento.',
    icon: Target,
    roles: ['admin_th', 'lider', 'colaborador'],
  },
];

export default async function InformesPage() {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const disponibles = INFORMES.filter((i) => i.roles.includes(perfil.rol));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-marmol-900">Informes</h1>
        <p className="text-sm text-marmol-500 mt-1">
          Todos los informes se pueden filtrar por persona o equipo, y exportar en PDF o Excel.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {disponibles.map((informe) => (
          <Link key={informe.href} href={informe.href} className="card p-5 hover:border-flow-300 transition">
            <informe.icon size={20} className="text-flow-600 mb-2" />
            <h2 className="font-display font-semibold text-marmol-900">{informe.titulo}</h2>
            <p className="text-sm text-marmol-500 mt-1">{informe.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
