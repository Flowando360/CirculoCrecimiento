import type { PreguntaFrecuente } from '@/types/ayuda';

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    pregunta: '¿Qué significan Ser, Saber, Hacer y Deber?',
    respuesta:
      'Son las cuatro dimensiones que evalúa el Círculo de Crecimiento. Ser: quién es la persona (talentos, propósito), se explora con la Guía del Flow. Saber: si cumple lo que exige su cargo (formación, habilidades, certificaciones, experiencia). Hacer: su desempeño en comportamientos observables, evaluado por ciclo. Deber: su comportamiento cultural/actitudinal, evaluado también por ciclo.',
  },
  {
    pregunta: '¿Con qué frecuencia se evalúan Hacer y Deber?',
    respuesta: 'Por ciclos, normalmente semestrales, definidos por Talento Humano en Ciclos de evaluación. Ser y Saber, en cambio, se verifican de forma continua, sin depender de un ciclo.',
  },
  {
    pregunta: '¿Quién evalúa a quién?',
    respuesta:
      'Se calcula automáticamente a partir del organigrama: tu líder es quien está justo arriba de ti; tus pares son quienes comparten tu mismo líder; tus colaboradores a cargo son quienes te reportan directamente a ti. Además, cada persona se autoevalúa.',
  },
  {
    pregunta: 'No veo a algunos colaboradores en mi lista de "Mi equipo". ¿Por qué?',
    respuesta:
      'Como líder, solo ves a las personas que te reportan directamente (según el organigrama) y a ti mismo. Si falta alguien, probablemente su líder directo no está bien configurado — pide a Talento Humano que lo revise en Administración → Editar organigrama.',
  },
  {
    pregunta: 'No puedo editar un campo que debería poder editar.',
    respuesta:
      'Los permisos dependen de tu rol y, en varias pantallas, de si eres el líder directo de esa persona (no cualquier líder). Si algo se ve solo de lectura y crees que no debería ser así, confírmalo con Talento Humano.',
  },
  {
    pregunta: '¿Cómo se calcula el semáforo (Alto/Medio/Bajo)?',
    respuesta: 'Se calcula automáticamente a partir del índice numérico de Hacer o Deber de la persona, según los rangos definidos por el sistema — no se asigna a mano.',
  },
  {
    pregunta: '¿Cómo exporto un informe?',
    respuesta: 'Entra a Informes, elige el informe que necesitas, y usa los botones "Exportar PDF" o "Exportar Excel" en la parte superior.',
  },
  {
    pregunta: '¿Qué es el Brief de retroalimentación y quién lo ve?',
    respuesta: 'Es el material de preparación que el líder escribe antes de la reunión de retroalimentación con su colaborador. Es privado: solo lo ve quien lo escribió y Talento Humano — ni siquiera la persona evaluada lo ve.',
  },
  {
    pregunta: '¿Cómo firmo el Acuerdo de crecimiento?',
    respuesta: 'La firma es una casilla de verificación más la fecha (no una firma dibujada). Cada parte —colaborador y líder— firma la suya desde la pantalla del Acuerdo de esa evaluación.',
  },
  {
    pregunta: '¿Por qué no puedo abrir un nuevo ciclo de evaluación?',
    respuesta: 'Solo Talento Humano (admin_th) puede crear ciclos, desde Círculo de Crecimiento → Ciclos de evaluación → "Abrir nuevo ciclo".',
  },
  {
    pregunta: '¿Puedo cambiar las ponderaciones de un ciclo que ya está abierto?',
    respuesta: 'No. Las ponderaciones solo se pueden editar mientras el ciclo está en estado "planeado", antes de abrirlo — así se evita afectar evaluaciones que ya están en curso.',
  },
  {
    pregunta: '¿Cómo marco mi avance en un curso de Formación?',
    respuesta: 'En Nexa → Formación y SST, cada curso asignado tiene un control deslizante de avance y un botón "Marcar como completado". Guarda tu avance con el botón correspondiente.',
  },
  {
    pregunta: '¿Qué le pasa a una alerta cuando la marco como resuelta o la descarto?',
    respuesta: 'Ambas acciones (solo disponibles para admin_th) la sacan de la lista de alertas pendientes. "Resuelta" indica que ya se atendió (ej. se renovó un examen); "Descartar" indica que no aplicaba o fue un error.',
  },
  {
    pregunta: 'Olvidé mi contraseña, ¿qué hago?',
    respuesta: 'Pide a Talento Humano que te asigne una nueva contraseña temporal desde Administración → Usuarios y roles.',
  },
  {
    pregunta: '¿Por qué mi usuario nuevo no aparece con el rol que Talento Humano configuró?',
    respuesta: 'El rol que ves reflejado es el que quedó guardado al crear la cuenta en Administración → Usuarios. Si no coincide, pide a Talento Humano que lo revise y corrija ahí — no se edita desde ningún otro lugar.',
  },
  {
    pregunta: '¿Qué diferencia hay entre "Descartar" un aliado del directorio y no hacer nada?',
    respuesta: 'Eliminar un aliado del Directorio de aliados lo borra permanentemente de la lista — pide confirmación antes de hacerlo.',
  },
];
