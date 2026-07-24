import type { ModuloAyuda } from '@/types/ayuda';

export const moduloAdministracion: ModuloAyuda = {
  slug: 'administracion',
  titulo: 'Administración',
  descripcion: 'Configuración de la empresa: cargos, organigrama, identidad, usuarios y ponderaciones. Acceso exclusivo de admin_th.',
  paginas: [
    {
      slug: 'cargos',
      ruta: '/administracion/cargos',
      titulo: 'Cargos y perfiles',
      resumen:
        'Plantilla estándar de la dimensión Saber por cargo: formación, habilidades funcionales y técnicas, destrezas y experiencia mínima.',
      camposYBotones: [
        { nombre: 'Importar desde Excel', explicacion: 'Sube el archivo con el formato FORSST-61 del perfil de cargo; el sistema previsualiza los datos leídos (con advertencias si algo no se pudo interpretar) antes de guardarlos.' },
        { nombre: 'Nombre del cargo', explicacion: 'Clic para ver el detalle completo del perfil.' },
      ],
      proceso: [
        'Abre "Importar desde Excel" y sube el archivo del cargo (mismo formato que la plantilla FORSST-61).',
        'Revisa la vista previa: cuenta de campos leídos y advertencias si algo quedó vacío o no se reconoció.',
        'Confirma para guardar — si el cargo ya existe (por nombre), se actualiza; si no, se crea uno nuevo.',
      ],
      notas: ['Al importar, los campos no definidos en el Excel no se sobrescriben (se conserva lo que ya había).'],
    },
    {
      slug: 'detalle-cargo',
      ruta: '/administracion/cargos/*',
      titulo: 'Detalle de un cargo',
      resumen: 'Vista del perfil completo del cargo importado: formación, habilidades, funciones principales, decisiones que toma, factores de riesgo, exámenes médicos requeridos, EPP, y el plan de inducción específico del cargo.',
      camposYBotones: [
        { nombre: 'Plan de inducción específico', explicacion: 'Editable por admin_th. Se genera automáticamente a partir del perfil del cargo (funciones, riesgos, EPP, exámenes de ingreso, formación mínima); puedes agregar o quitar puntos.' },
      ],
      notas: ['Cada sección solo aparece si tiene datos cargados — no se muestran secciones vacías.'],
    },
    {
      slug: 'organigrama-editar',
      ruta: '/administracion/organigrama',
      titulo: 'Editar organigrama',
      resumen: 'Define el líder directo de cada persona — la única fuente de verdad de la que se deduce automáticamente quiénes son pares y quiénes son colaboradores a cargo.',
      camposYBotones: [{ nombre: 'Selector de líder directo', explicacion: 'Por cada colaborador, elige quién es su líder (o "Sin líder" si es nivel 1).' }],
      notas: ['Cambiar el líder aquí afecta de inmediato la arquitectura de acompañantes del próximo ciclo.'],
    },
    {
      slug: 'identidad-organizacional',
      ruta: '/administracion/identidad',
      titulo: 'Identidad Organizacional',
      resumen: 'Propósito superior, declaración de creencias, visión, principios y valores de la empresa — visibles para todos y usados como referencia en Encuentros de Crecimiento y en el feed de Nexa.',
      camposYBotones: [
        { nombre: 'Propósito Superior / Declaración de creencias / Visión', explicacion: 'Textos libres, se guardan con el botón "Guardar".' },
        { nombre: 'Principios y Valores', explicacion: 'Listas editables por separado, se agregan/eliminan elemento por elemento.' },
      ],
      notas: [
        'Todo lo que guardes aquí se usa automáticamente en varios lugares: el Asistente IA de Nexa lo usa como contexto para responder alineado con la empresa, aparece como tarjeta en el dashboard de Inicio, se referencia en los informes PDI y 360°, y genera los puntos comunes del Plan de inducción.',
      ],
    },
    {
      slug: 'guias-colaboradores',
      ruta: '/administracion/guias-colaboradores',
      titulo: 'Guías de colaboradores',
      resumen: 'Carga el PDF de la Guía del Flow (diseñada por FlowAndo) de cada persona, para que quede disponible en su ficha y en Mi Perfil.',
      camposYBotones: [
        { nombre: 'Formulario de subida', explicacion: 'Elige el colaborador y el archivo PDF.' },
        { nombre: 'Guías ya cargadas', explicacion: 'Lista con fecha de carga y link "Ver PDF" (temporal, el archivo está protegido).' },
      ],
    },
    {
      slug: 'usuarios-roles',
      ruta: '/administracion/usuarios',
      titulo: 'Usuarios y roles',
      resumen: 'Crea cuentas de acceso para los colaboradores y administra sus roles.',
      camposYBotones: [
        { nombre: 'Nuevo usuario', explicacion: 'Elige un colaborador sin cuenta todavía, su correo, rol (admin_th/líder/colaborador/gerencia) y una contraseña temporal.' },
        { nombre: 'Tabla de usuarios', explicacion: 'Nombre, correo, rol y si la cuenta está activa.' },
      ],
      notas: [
        'Roles y su alcance: admin_th ve y edita todo; líder ve su equipo y su propia información; colaborador se ve solo a sí mismo; gerencia ve reportes agregados.',
      ],
    },
    {
      slug: 'configuracion',
      ruta: '/administracion/configuracion',
      titulo: 'Configuración',
      resumen: 'Datos legales de la empresa (para el certificado laboral) y los pesos de ponderación entre las distintas fuentes de valoración (líder, pares, colaboradores a cargo).',
      camposYBotones: [
        { nombre: 'Datos de la empresa', explicacion: 'NIT, dirección, teléfono, ciudad, y nombre/cargo de quien firma el certificado laboral. Se usan cada vez que se genera un certificado desde la ficha de un colaborador.' },
        { nombre: 'Porcentajes por fuente', explicacion: 'Deben sumar 100% en cada grupo (con equipo / sin equipo).' },
      ],
      notas: [
        'Los porcentajes de ponderación solo se pueden editar mientras el ciclo está en estado "planeado" — una vez abierto un ciclo, sus pesos ya no se pueden cambiar, para no afectar Encuentros de Crecimiento en curso. Los datos de la empresa, en cambio, se pueden editar en cualquier momento.',
      ],
    },
  ],
};
