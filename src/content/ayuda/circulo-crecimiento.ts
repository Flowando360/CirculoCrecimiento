import type { ModuloAyuda } from '@/types/ayuda';

export const moduloCirculoCrecimiento: ModuloAyuda = {
  slug: 'circulo-crecimiento',
  titulo: 'Círculo de Crecimiento 360°',
  descripcion:
    'El corazón del sistema: evaluación de las cuatro dimensiones (Ser, Saber, Hacer, Deber), ciclos, fichas de colaboradores y planes de desarrollo.',
  paginas: [
    {
      slug: 'colaboradores',
      ruta: '/circulo-crecimiento/colaboradores',
      titulo: 'Colaboradores',
      resumen:
        'Listado de personas de la empresa. Un líder ve solo su equipo (por eso el título cambia a "Mi equipo"); admin_th y gerencia ven a todos.',
      camposYBotones: [
        { nombre: 'Fila de la tabla', explicacion: 'Foto, nombre, cargo, área, estado y fecha de ingreso. Clic en una fila abre la ficha 360° de esa persona.' },
        { nombre: 'Nuevo colaborador', explicacion: 'Solo admin_th. Lleva a Administración → Usuarios para crear cuenta y ficha.' },
      ],
    },
    {
      slug: 'ficha-colaborador',
      ruta: '/circulo-crecimiento/colaboradores/*',
      titulo: 'Ficha del colaborador',
      resumen:
        'La vista 360° de una persona: sus cuatro dimensiones de un vistazo (Ser, Saber, Hacer, Deber), su perfil de cargo, su hoja de vida y su Plan de Desarrollo.',
      camposYBotones: [
        { nombre: 'Tarjeta SER', explicacion: 'Indica si la Guía del Flow está completa. Lleva a la pantalla de Guía del Flow.' },
        { nombre: 'Tarjeta SABER', explicacion: '% de cumplimiento del perfil de cargo (formación, habilidades, certificaciones, experiencia). Lleva a Verificación de Saber.' },
        { nombre: 'Tarjetas HACER / DEBER', explicacion: 'Último índice calculado y su semáforo (Alto/Medio/Bajo), según la evaluación más reciente.' },
        { nombre: 'Perfil de cargo', explicacion: 'Objetivo del cargo y si tiene personal a cargo (definido en Administración → Cargos).' },
        { nombre: 'Hoja de vida y certificaciones', explicacion: 'Formación, cursos y certificaciones cargadas, con fecha de vencimiento si aplica.' },
        { nombre: 'Plan de Desarrollo Individual', explicacion: 'Las acciones de desarrollo activas de la persona, con su origen (Hacer/Deber/Saber/Ser) y estado.' },
        { nombre: 'Ver historial y línea de tiempo', explicacion: 'Solo visible para admin_th y el líder directo. Lleva a movimientos de cargo y, si aplica, entrevista de salida.' },
      ],
      notas: [
        'Quién puede ver esta ficha: admin_th y gerencia (todas), líder (su equipo directo y él mismo), colaborador (solo la propia).',
      ],
    },
    {
      slug: 'verificacion-saber',
      ruta: '/circulo-crecimiento/colaboradores/*/saber',
      titulo: 'Verificación de Saber',
      resumen:
        'Compara lo que exige el cargo (formación, habilidades, certificaciones, experiencia) contra lo que realmente tiene la persona, bloque por bloque.',
      camposYBotones: [
        { nombre: 'Recuadro "Exige el cargo"', explicacion: 'Lo que quedó definido en el perfil del cargo (Administración → Cargos), como referencia para verificar.' },
        { nombre: 'Checklist por bloque', explicacion: 'Formación académica, habilidades funcionales/técnicas, certificaciones y experiencia. Cada ítem se marca como Cumple, Parcial o No cumple.' },
      ],
      notas: [
        'Puede editar: admin_th y el líder directo de la persona. El propio colaborador y gerencia solo consultan.',
      ],
    },
    {
      slug: 'hoja-vida',
      ruta: '/circulo-crecimiento/colaboradores/*/hoja-vida',
      titulo: 'Hoja de vida y certificaciones',
      resumen: 'Registro de la formación, cursos y certificaciones de una persona, con fecha de vencimiento cuando aplica.',
      camposYBotones: [
        { nombre: 'Agregar registro', explicacion: 'Título, tipo (formación/curso/certificación), fechas y vencimiento si corresponde.' },
      ],
      notas: ['Solo Talento Humano (admin_th) puede cargar o editar estos registros; los demás roles solo consultan.'],
    },
    {
      slug: 'guia-del-flow',
      ruta: '/circulo-crecimiento/colaboradores/*/guia-flow',
      titulo: 'Guía del Flow (dimensión Ser)',
      resumen:
        'El instrumento de autoconocimiento: talentos naturales, propósito y los aspectos de Ser organizados en 4 bloques (Esencia/Sello, Emociones, Pertenencia y Compromiso, Desafíos), con el PDF original diseñado por FlowAndo.',
      camposYBotones: [
        { nombre: 'Crear / Nueva aplicación', explicacion: 'Solo admin_th. Abre un nuevo registro de Guía del Flow para la persona.' },
        { nombre: 'Subir PDF', explicacion: 'Solo admin_th. Carga el documento diseñado por FlowAndo (queda en un bucket privado, se ve con un link temporal).' },
        { nombre: 'Puntaje por aspecto (1-5)', explicacion: 'Solo admin_th califica cada aspecto dentro de su bloque.' },
        { nombre: 'Comentario por aspecto y comentario general', explicacion: 'El propio colaborador puede escribir su reflexión sobre cada aspecto y un comentario general.' },
      ],
      notas: ['Quién ve esta pantalla: admin_th, el líder directo, y el propio colaborador.'],
    },
    {
      slug: 'historial',
      ruta: '/circulo-crecimiento/colaboradores/*/historial',
      titulo: 'Historial y línea de tiempo',
      resumen: 'Movimientos de cargo (ascensos, traslados, cambios de área) y, para Talento Humano, la entrevista de salida si la persona se retira.',
      camposYBotones: [
        { nombre: 'Línea de tiempo', explicacion: 'Cada movimiento con tipo, fecha, cargo anterior y nuevo, y descripción.' },
        { nombre: 'Entrevista de salida', explicacion: 'Solo visible y editable por admin_th. Se diligencia cuando la persona sale de la empresa.' },
      ],
      notas: [
        'Acceso exclusivo: admin_th (toda la empresa) y el líder directo (su equipo, sin ver la entrevista de salida). Gerencia y el propio colaborador no tienen acceso a esta pantalla.',
      ],
    },
    {
      slug: 'ciclos',
      ruta: '/circulo-crecimiento/ciclos',
      titulo: 'Ciclos de evaluación',
      resumen:
        'Hacer y Deber se evalúan por ciclos (normalmente semestrales); Ser y Saber se verifican de forma continua, sin ciclo.',
      camposYBotones: [
        { nombre: 'Abrir nuevo ciclo', explicacion: 'Solo admin_th. Crea un ciclo con nombre, fechas de apertura/cierre y las ponderaciones vigentes (definidas en Administración → Configuración).' },
        { nombre: 'Tarjeta de ciclo', explicacion: 'Nombre, estado (Planeado/Abierto/En consolidación/Publicado/Cerrado) y rango de fechas. Clic para entrar al detalle.' },
      ],
    },
    {
      slug: 'detalle-ciclo',
      ruta: '/circulo-crecimiento/ciclos/*',
      titulo: 'Detalle de un ciclo',
      resumen:
        'Muestra las ponderaciones vigentes del ciclo y el avance de cada persona evaluada, con acceso directo a su Brief y su Acuerdo de crecimiento.',
      camposYBotones: [
        { nombre: 'Panel de generación de evaluaciones', explicacion: 'Solo admin_th. Genera las tareas de evaluación (autoevaluación, líder, pares, colaboradores a cargo) para todo el equipo de un líder o para personas específicas.' },
        { nombre: 'Tabla de evaluaciones', explicacion: 'Por persona: % de avance, resultado de Hacer y Deber con semáforo, y enlaces a Brief y Acuerdo (admin_th y líder).' },
      ],
      proceso: [
        'admin_th crea el ciclo desde "Abrir nuevo ciclo".',
        'admin_th usa el panel de generación de evaluaciones para crear las tareas de cada evaluador.',
        'Cada evaluador (autoevaluación, líder, pares, colaboradores a cargo) completa su evaluación en la pantalla "Evaluar".',
        'El líder prepara el Brief antes de la retroalimentación.',
        'En la sesión de retroalimentación, se registran los compromisos en el Acuerdo de crecimiento y ambas partes firman.',
      ],
    },
    {
      slug: 'evaluar',
      ruta: '/circulo-crecimiento/evaluar/*',
      titulo: 'Evaluar (Hacer / Deber)',
      resumen:
        'El formulario donde cada evaluador (autoevaluación, líder, par, o colaborador a cargo) califica los comportamientos observables de la persona evaluada durante el período.',
      camposYBotones: [
        { nombre: 'Ítems por bloque (Hacer/Deber)', explicacion: 'Cada ítem tiene una nota y, opcionalmente, una observación en texto libre.' },
        { nombre: 'Guardado automático', explicacion: 'Cada respuesta se guarda al instante y recalcula el resultado — no hace falta un botón de "enviar todo" al final.' },
      ],
      notas: ['Si la evaluación no tiene ítems generados, pide a Talento Humano que la regenere desde el detalle del ciclo.'],
    },
    {
      slug: 'brief',
      ruta: '/circulo-crecimiento/evaluaciones/*/brief',
      titulo: 'Brief de retroalimentación',
      resumen: 'Material de preparación del líder antes de la sesión de retroalimentación con su colaborador. Es privado: solo lo ve quien lo escribe y Talento Humano.',
      camposYBotones: [
        { nombre: 'Talento central', explicacion: 'Lo más fuerte de la persona, para abrir la conversación desde ahí.' },
        { nombre: 'Resumen de Hacer / Resumen de Deber', explicacion: 'Los puntos más relevantes de cada resultado.' },
        { nombre: 'Sugerencias de enfoque', explicacion: 'Cómo abordar la conversación y qué priorizar.' },
      ],
      notas: ['El brief es manual — no se autogenera; lo redacta el líder o admin_th antes de la reunión.'],
    },
    {
      slug: 'acuerdo-crecimiento',
      ruta: '/circulo-crecimiento/evaluaciones/*/acuerdo',
      titulo: 'Acuerdo de crecimiento',
      resumen: 'Los compromisos que quedan de la sesión de retroalimentación, tanto de la persona como de la empresa, con su firma.',
      camposYBotones: [
        { nombre: 'Compromisos del colaborador / de la empresa', explicacion: 'Editables por admin_th y el líder directo.' },
        { nombre: 'Firma', explicacion: 'Cada parte (colaborador y líder) firma con una casilla + fecha — no es una firma dibujada.' },
      ],
    },
    {
      slug: 'organigrama-consulta',
      ruta: '/circulo-crecimiento/organigrama',
      titulo: 'Organigrama',
      resumen: 'Vista jerárquica de la empresa, en árbol. Explica la regla automática de quién evalúa a quién.',
      notas: [
        'Regla de evaluadores: el líder es quien está justo arriba en el organigrama; los pares comparten el mismo líder; los colaboradores a cargo son quienes reportan directamente a la persona evaluada.',
      ],
    },
    {
      slug: 'indicadores',
      ruta: '/circulo-crecimiento/indicadores',
      titulo: 'Indicadores',
      resumen: 'Panorama de la empresa: índices de Hacer y Deber, cumplimiento de Saber, alineación talento-rol, y un mapa comparativo por equipo.',
      camposYBotones: [
        { nombre: 'Mapa de equipos', explicacion: 'Gráfico que compara Hacer, Deber y Saber promedio de cada equipo (agrupado por líder).' },
      ],
    },
    {
      slug: 'pdi',
      ruta: '/circulo-crecimiento/pdi',
      titulo: 'Planes de Desarrollo Individual (PDI)',
      resumen:
        'El entregable central de la evaluación: cada acción de desarrollo indica si la brecha viene de Hacer, Deber, Saber, Ser, o es mixta.',
      camposYBotones: [
        { nombre: 'Origen', explicacion: 'De qué dimensión viene la brecha detectada (Hacer/Deber/Saber/Ser/Mixto).' },
        { nombre: 'Estado', explicacion: 'Pendiente, en curso, cumplido o vencido, con su fecha de compromiso.' },
      ],
      notas: ['Un colaborador solo ve su propio PDI; admin_th, líder y gerencia ven el de su alcance correspondiente.'],
    },
  ],
};
