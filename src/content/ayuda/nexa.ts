import type { ModuloAyuda } from '@/types/ayuda';

export const moduloNexa: ModuloAyuda = {
  slug: 'nexa',
  titulo: 'Nexa · Cultura y Formación',
  descripcion:
    'Comunicación corporativa, formación gamificada, reconocimientos, simulacros de seguridad, directorio de aliados y el asistente de IA.',
  paginas: [
    {
      slug: 'feed',
      ruta: '/nexa/feed',
      titulo: 'Feed corporativo',
      resumen:
        'Comunicados, políticas de SST, logros y anuncios, visibles para toda la empresa, con adjuntos opcionales.',
      camposYBotones: [
        { nombre: 'Publicar', explicacion: 'Solo admin_th y líder. Tipo (anuncio/política SST/logro/general), título y contenido.' },
        { nombre: 'Fijar arriba del feed', explicacion: 'Solo admin_th. Mantiene la publicación siempre visible primero.' },
        { nombre: 'Adjunto: Documento', explicacion: 'Sube un PDF, Word o imagen; se muestra como tarjeta con nombre, tamaño y botón de descarga.' },
        { nombre: 'Adjunto: Link externo', explicacion: 'Pega una URL y el botón "Vista previa" trae automáticamente título, imagen y descripción del sitio (si los tiene).' },
        { nombre: 'Adjunto: Video o imagen', explicacion: 'Se sube y se muestra directamente dentro de la publicación, sin necesidad de descargar.' },
      ],
      proceso: [
        'Elige el tipo de publicación y escribe el título (el contenido es opcional).',
        'Si quieres adjuntar algo, elige Documento, Link o Video/imagen y complétalo.',
        'Publica — aparece de inmediato para toda la empresa.',
      ],
      notas: ['Solo una publicación puede combinarse con un solo tipo de adjunto a la vez (no varios adjuntos juntos).'],
    },
    {
      slug: 'formacion',
      ruta: '/nexa/formacion',
      titulo: 'Formación y SST',
      resumen:
        'Para un colaborador: sus cursos asignados con barra de progreso. Para admin_th: el catálogo completo de cursos gamificados, con creación y asignación.',
      camposYBotones: [
        { nombre: 'Nuevo curso (admin_th)', explicacion: 'Título, descripción, categoría (inducción SST, alturas, manejo de cargas, EPP, protocolos de emergencia, cultura, técnico, otro), duración y puntos que otorga.' },
        { nombre: 'Asignar (admin_th)', explicacion: 'Por cada curso: asignarlo a todo un cargo (con nivel de riesgo y si es obligatorio) o directamente a una persona (con fecha límite).' },
        { nombre: 'Control deslizante de avance (colaborador)', explicacion: 'Ajusta tu % de avance en un curso asignado y presiona "Guardar avance".' },
        { nombre: 'Marcar como completado (colaborador)', explicacion: 'Pone el curso en 100% y lo cierra como completado de una vez.' },
      ],
      notas: [
        'El estado del curso (asignado/en curso/completado) se calcula solo, según el % de avance — no hay que cambiarlo a mano.',
      ],
    },
    {
      slug: 'reconocimientos',
      ruta: '/nexa/reconocimientos',
      titulo: 'Reconocimientos',
      resumen: 'Ranking de puntos y muro de los últimos reconocimientos otorgados en la empresa.',
      camposYBotones: [
        { nombre: 'Otorgar reconocimiento', explicacion: 'admin_th y líder. Elige a la persona (el líder solo ve su propio equipo), escribe el motivo y los puntos.' },
        { nombre: 'Ranking de puntos', explicacion: 'Suma de puntos por persona, de mayor a menor.' },
      ],
    },
    {
      slug: 'simulacros',
      ruta: '/nexa/simulacros',
      titulo: 'Simulacros y dinámicas en vivo',
      resumen: 'Programación de simulacros de seguridad y dinámicas de cultura.',
      camposYBotones: [
        { nombre: 'Nuevo simulacro (admin_th)', explicacion: 'Título, descripción, fecha y número de participantes esperados.' },
        { nombre: 'Tarjeta de simulacro', explicacion: 'Clic para entrar al detalle y registrar asistencia/valoración.' },
      ],
    },
    {
      slug: 'detalle-simulacro',
      ruta: '/nexa/simulacros/*',
      titulo: 'Detalle de un simulacro',
      resumen: 'Registro de quién asistió y su valoración de desempeño (1-5).',
      camposYBotones: [
        { nombre: 'Asistió (admin_th)', explicacion: 'Casilla por persona.' },
        { nombre: 'Valoración (admin_th)', explicacion: 'De 1 a 5, opcional.' },
        { nombre: 'Guardar', explicacion: 'Guarda esa fila individualmente.' },
      ],
      notas: ['Líder y colaborador ven de solo lectura los participantes que la empresa permite ver (su equipo o ellos mismos).'],
    },
    {
      slug: 'directorio-aliados',
      ruta: '/nexa/directorio',
      titulo: 'Directorio de aliados',
      resumen: 'Libreta de contactos de ARL, asesores SST y proveedores de formación certificada, para toda la empresa.',
      camposYBotones: [
        { nombre: 'Nuevo aliado (admin_th)', explicacion: 'Nombre, tipo (ARL/asesor SST/proveedor de formación/otro), contacto y notas.' },
        { nombre: 'Ícono de basura (admin_th)', explicacion: 'Elimina el aliado del directorio, con confirmación.' },
      ],
    },
    {
      slug: 'asistente-ia',
      ruta: '/nexa/asistente',
      titulo: 'Asistente IA',
      resumen: 'Chat entrenado con las políticas y procedimientos internos de la empresa, para resolver dudas normativas y de procedimiento.',
      camposYBotones: [{ nombre: 'Campo de pregunta', explicacion: 'Escribe tu duda y presiona enviar; la respuesta aparece en el chat.' }],
    },
  ],
};
