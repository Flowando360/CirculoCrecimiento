import type { PreguntaFrecuente } from '@/types/ayuda';

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    pregunta: '¿Qué significan Ser, Saber, Hacer y Deber?',
    respuesta:
      'Son las cuatro dimensiones que valora el Círculo de Crecimiento. Ser: quién es la persona (talentos, propósito), se explora con la Guía del Flow. Saber: si cumple lo que exige su cargo (formación, habilidades, certificaciones, experiencia). Hacer: su desempeño en comportamientos observables, valorado por ciclo. Deber: su comportamiento cultural/actitudinal, valorado también por ciclo.',
  },
  {
    pregunta: '¿Con qué frecuencia se valoran Hacer y Deber?',
    respuesta: 'Por ciclos, normalmente semestrales, definidos por Talento Humano en Ciclos de Crecimiento. Ser y Saber, en cambio, se verifican de forma continua, sin depender de un ciclo.',
  },
  {
    pregunta: '¿Quién acompaña a quién?',
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
    respuesta: 'Es el material de preparación que el líder escribe antes de la reunión de retroalimentación con su colaborador. Es privado: solo lo ve quien lo escribió y Talento Humano — ni siquiera el colaborador en crecimiento lo ve.',
  },
  {
    pregunta: '¿Cómo firmo el Acuerdo de crecimiento?',
    respuesta: 'La firma es una casilla de verificación más la fecha (no una firma dibujada). Cada parte —colaborador y líder— firma la suya desde la pantalla del Acuerdo de ese Encuentro de Crecimiento.',
  },
  {
    pregunta: '¿Por qué no puedo abrir un nuevo Ciclo de Crecimiento?',
    respuesta: 'Solo Talento Humano (admin_th) puede crear ciclos, desde Círculo de Crecimiento → Ciclos de Crecimiento → "Abrir nuevo ciclo".',
  },
  {
    pregunta: '¿Puedo cambiar las ponderaciones de un ciclo que ya está abierto?',
    respuesta: 'No. Las ponderaciones solo se pueden editar mientras el ciclo está en estado "planeado", antes de abrirlo — así se evita afectar Encuentros de Crecimiento que ya están en curso.',
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
  {
    pregunta: '¿Cómo funciona el Plan de inducción de un cargo?',
    respuesta:
      'Se genera automáticamente: la parte común (propósito, visión, principios, valores) viene de Identidad Organizacional, y la parte específica del cargo viene de su perfil (funciones, riesgos SST, EPP, exámenes de ingreso, formación mínima). admin_th puede editar los puntos de un cargo desde Administración → Cargos. Cuando se registra el ingreso o el cambio de cargo de alguien en su Historial, el checklist se le asigna solo.',
  },
  {
    pregunta: '¿Quién puede marcar un punto de inducción como cumplido?',
    respuesta: 'El líder directo de la persona o admin_th. Queda registrado quién lo marcó y cuándo.',
  },
  {
    pregunta: '¿Qué diferencia hay entre "Hoja de vida y certificaciones" y "Documentos"?',
    respuesta:
      '"Hoja de vida y certificaciones" es el registro de formación, cursos y certificaciones de la persona (con fecha de vencimiento si aplica). "Documentos" es otra pantalla distinta, donde se sube el archivo real de la hoja de vida (el CV), el contrato, y desde donde se genera el certificado laboral.',
  },
  {
    pregunta: '¿Cómo genero el certificado laboral de alguien?',
    respuesta:
      'Entra a la ficha de la persona → Documentos y certificado laboral. Marca o no la casilla "Incluir el salario" y presiona "Descargar PDF". El salario que trae el certificado es el que quede registrado en el contrato de esa persona.',
  },
  {
    pregunta: '¿Por qué no veo la sección de Documentos en la ficha de alguien de mi equipo?',
    respuesta: 'Esa sección es de manejo exclusivo de Talento Humano y del propio colaborador — ni siquiera el líder directo tiene acceso, porque el contrato trae el salario de la persona.',
  },
  {
    pregunta: '¿Cómo edito los datos que salen en el certificado laboral (NIT, dirección, quién firma)?',
    respuesta: 'En Administración → Configuración, sección "Datos de la empresa".',
  },
  {
    pregunta: '¿Cómo envío un mensaje directo a alguien?',
    respuesta: 'Entra a Mensajes (ícono en el encabezado o el menú lateral) → "Nuevo mensaje", elige a la persona y escribe. Puedes escribirle a cualquiera de tu empresa, no solo a tu equipo.',
  },
  {
    pregunta: '¿Qué diferencia hay entre el Feed corporativo y Mensajes?',
    respuesta: 'El Feed es de difusión general — lo publica admin_th o un líder y lo ve toda la empresa. Mensajes es privado, 1 a 1, entre dos personas específicas.',
  },
  {
    pregunta: '¿Dónde veo mis notificaciones?',
    respuesta: 'En el ícono de sobre del encabezado, o entrando a Notificaciones. Ahí aparecen recordatorios como fechas próximas de tus alertas.',
  },
  {
    pregunta: '¿Qué es "Mi cuaderno" en Nexa?',
    respuesta: 'Un espacio de apuntes personales sobre tu propio aprendizaje, dentro de Nexa → Formación. Es privado: ni Talento Humano puede verlo.',
  },
  {
    pregunta: '¿Cómo reacciono a una publicación del feed corporativo?',
    respuesta: 'Con el botón "Me gusta" que aparece abajo de cada publicación. Vuelve a hacer clic para quitar tu reacción.',
  },
];
