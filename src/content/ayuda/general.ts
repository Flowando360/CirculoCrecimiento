import type { ModuloAyuda } from '@/types/ayuda';

export const moduloGeneral: ModuloAyuda = {
  slug: 'general',
  titulo: 'Inicio y Mi Perfil',
  descripcion: 'La pantalla de bienvenida y tu propia ficha personal.',
  paginas: [
    {
      slug: 'inicio',
      ruta: '/inicio',
      titulo: 'Inicio',
      resumen:
        'La primera pantalla al entrar. Se adapta según tu rol: Talento Humano y Gerencia ven el panorama completo de la empresa; un líder ve el resumen de su equipo; un colaborador ve accesos directos a su propio espacio.',
      camposYBotones: [
        { nombre: 'Tarjetas de indicadores', explicacion: 'Colaboradores activos, promedio de Hacer y Deber, alertas críticas abiertas, cumplimiento de Saber, alineación talento-rol (visible para admin_th y gerencia).' },
        { nombre: 'Próximas alertas', explicacion: 'Las alertas de vencimiento más urgentes de toda la empresa, con enlace a "Ver todas".' },
        { nombre: 'Tarjetas de acceso rápido', explicacion: 'Para líder y colaborador: atajos a Mi equipo, Planes de Desarrollo, Mi Perfil y Formación.' },
      ],
      notas: [
        'Lo que ves aquí depende 100% de tu rol — no es una pantalla que se configure, se arma sola con datos reales.',
      ],
    },
    {
      slug: 'mi-perfil',
      ruta: '/mi-perfil',
      titulo: 'Mi Perfil',
      resumen:
        'Tu propia ficha 360°: quién eres para la organización, tu cargo, tu líder, y el estado de tus cuatro dimensiones (Ser, Saber, Hacer, Deber).',
      camposYBotones: [
        { nombre: 'Encabezado', explicacion: 'Nombre, cargo, área, fecha de ingreso y líder directo.' },
        { nombre: 'Tarjetas SER / SABER / HACER / DEBER', explicacion: 'Estado de cada dimensión: si tu Guía del Flow está completa, tu % de cumplimiento de Saber, y el semáforo (Alto/Medio/Bajo) de Hacer y Deber según tu última evaluación.' },
        { nombre: 'Mi Guía del Flow', explicacion: 'Si ya se cargó tu Guía del Flow, aquí ves tus talentos naturales y tu propósito, tal como quedaron documentados.' },
      ],
      notas: [
        'Si ves el mensaje de que tu usuario no está vinculado a una ficha, pide a Talento Humano que te asocie desde Administración → Usuarios.',
      ],
    },
  ],
};
