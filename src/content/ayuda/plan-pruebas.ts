import type { SeccionPlanPruebas } from '@/types/ayuda';

export const planPruebas: SeccionPlanPruebas[] = [
  {
    modulo: 'Acceso y permisos',
    escenarios: [
      {
        titulo: 'Inicio de sesión y cierre de sesión',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Entra a la URL del aplicativo sin haber iniciado sesión.', resultadoEsperado: 'Redirige a la pantalla de login.' },
          { paso: 'Ingresa correo y contraseña correctos.', resultadoEsperado: 'Entra a Inicio, con el menú lateral acorde a tu rol.' },
          { paso: 'Presiona el botón de cerrar sesión (ícono de salida, arriba a la derecha).', resultadoEsperado: 'Vuelve a la pantalla de login.' },
        ],
      },
      {
        titulo: 'El menú y las pantallas respetan el rol',
        rolNecesario: 'Un colaborador y, por separado, un líder',
        pasos: [
          { paso: 'Inicia sesión como colaborador y revisa el menú lateral.', resultadoEsperado: 'No aparecen las secciones de Administración ni "Ciclos de Crecimiento".' },
          { paso: 'Intenta entrar directamente a una URL de administración (ej. /administracion/usuarios) escribiéndola en el navegador.', resultadoEsperado: 'Redirige a Inicio, no muestra la pantalla.' },
          { paso: 'Inicia sesión como líder y entra a Colaboradores.', resultadoEsperado: 'Solo ve a las personas que le reportan directamente, no a toda la empresa.' },
        ],
      },
    ],
  },
  {
    modulo: 'Círculo de Crecimiento — ciclo completo de Encuentros de Crecimiento',
    escenarios: [
      {
        titulo: 'Abrir un ciclo y generar Encuentros de Crecimiento',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a Ciclos de Crecimiento → "Abrir nuevo ciclo".', resultadoEsperado: 'Formulario pide nombre y fechas.' },
          { paso: 'Completa y guarda.', resultadoEsperado: 'El nuevo ciclo aparece en la lista, en estado "Planeado" o "Abierto".' },
          { paso: 'Entra al detalle del ciclo y usa el panel de generación de Encuentros de Crecimiento para un líder con equipo.', resultadoEsperado: 'Se crean las tareas de autoevaluación, líder, pares y colaboradores a cargo para ese equipo.' },
        ],
      },
      {
        titulo: 'Responder un Encuentro de Crecimiento (Hacer/Deber)',
        rolNecesario: 'Cualquier rol con una tarea de valoración asignada',
        pasos: [
          { paso: 'Entra al Encuentro de Crecimiento pendiente (desde el detalle del ciclo o la notificación).', resultadoEsperado: 'Aparece la lista de ítems del bloque Hacer y Deber.' },
          { paso: 'Valora un ítem y escribe una observación.', resultadoEsperado: 'Se guarda de inmediato, sin botón de "enviar todo".' },
          { paso: 'Vuelve al detalle del ciclo.', resultadoEsperado: 'El % de avance de ese Encuentro de Crecimiento aumentó.' },
        ],
      },
      {
        titulo: 'Brief y Acuerdo de crecimiento',
        rolNecesario: 'Líder directo y admin_th',
        pasos: [
          { paso: 'Desde el detalle del ciclo, entra al Brief de un colaborador de tu equipo.', resultadoEsperado: 'Muestra el resultado de Hacer/Deber y un formulario editable.' },
          { paso: 'Completa y guarda el Brief.', resultadoEsperado: 'Queda guardado; el colaborador en crecimiento NO puede verlo.' },
          { paso: 'Entra al Acuerdo de crecimiento de la misma persona, completa los compromisos y firma.', resultadoEsperado: 'La casilla de firma queda marcada con la fecha.' },
          { paso: 'Inicia sesión como ese colaborador y firma su parte del acuerdo.', resultadoEsperado: 'Ambas firmas quedan registradas.' },
        ],
      },
    ],
  },
  {
    modulo: 'Círculo de Crecimiento — ficha del colaborador',
    escenarios: [
      {
        titulo: 'Verificación de Saber',
        rolNecesario: 'admin_th o líder directo',
        pasos: [
          { paso: 'Entra a la ficha de un colaborador → Verificación de Saber.', resultadoEsperado: 'Ve los 4 bloques (formación, habilidades, certificaciones, experiencia) con lo que exige el cargo.' },
          { paso: 'Marca un ítem como "Cumple".', resultadoEsperado: 'Se guarda y el % de cumplimiento de la ficha se actualiza.' },
        ],
      },
      {
        titulo: 'Guía del Flow',
        rolNecesario: 'admin_th para crear/valorar; colaborador para comentar',
        pasos: [
          { paso: 'Como admin_th, crea una nueva aplicación de Guía del Flow para una persona sin registro previo.', resultadoEsperado: 'Aparecen los 4 bloques de aspectos, vacíos.' },
          { paso: 'Sube el PDF de la guía y valora un aspecto (1-5).', resultadoEsperado: 'El PDF queda accesible con un link temporal; el puntaje se guarda.' },
          { paso: 'Inicia sesión como esa persona y escribe un comentario en un aspecto.', resultadoEsperado: 'El comentario se guarda asociado a ese aspecto.' },
        ],
      },
      {
        titulo: 'Historial y entrevista de salida',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra al historial de un colaborador y registra un movimiento (ej. cambio de cargo).', resultadoEsperado: 'Aparece en la línea de tiempo con fecha y descripción.' },
          { paso: 'Diligencia la entrevista de salida.', resultadoEsperado: 'Se guarda; solo admin_th puede verla (ni el líder ni el colaborador).' },
        ],
      },
    ],
  },
  {
    modulo: 'Círculo de Crecimiento — Inducción y Documentos',
    escenarios: [
      {
        titulo: 'Plan de inducción al registrar un ingreso',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Registra el ingreso (o cambio de cargo) de un colaborador con un cargo que ya tiene perfil cargado.', resultadoEsperado: 'Se genera automáticamente el checklist de inducción: puntos comunes + puntos específicos del cargo.' },
          { paso: 'Entra a la ficha de esa persona → Inducción.', resultadoEsperado: 'Ve la lista completa con la barra de avance en 0%.' },
        ],
      },
      {
        titulo: 'Marcar un punto de inducción como cumplido',
        rolNecesario: 'Líder directo o admin_th',
        pasos: [
          { paso: 'Marca un punto del checklist de inducción de un colaborador de su equipo.', resultadoEsperado: 'Queda marcado con quién lo marcó y la fecha; la barra de avance sube.' },
          { paso: 'Inicia sesión como un líder que NO es el directo de esa persona e intenta lo mismo.', resultadoEsperado: 'No puede ver ni marcar el checklist de esa persona.' },
        ],
      },
      {
        titulo: 'Cargar hoja de vida y contrato, y generar el certificado laboral',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a la ficha de un colaborador → Documentos y sube el archivo de la hoja de vida.', resultadoEsperado: 'Queda disponible para descargar; se puede reemplazar por otro archivo después.' },
          { paso: 'Guarda el contrato (archivo) junto con el salario de la persona.', resultadoEsperado: 'Queda guardado; se puede editar después sin perder el histórico de otros documentos.' },
          { paso: 'Genera el certificado laboral sin marcar "Incluir el salario".', resultadoEsperado: 'Descarga un PDF con el logo de la empresa, cargo y fecha de ingreso, sin el dato de salario.' },
          { paso: 'Genera el certificado laboral marcando "Incluir el salario".', resultadoEsperado: 'El PDF trae el salario tal como quedó registrado en el contrato.' },
          { paso: 'Inicia sesión como el líder directo de esa persona y entra a su ficha.', resultadoEsperado: 'No aparece la sección de Documentos (solo admin_th y la propia persona la ven).' },
        ],
      },
      {
        titulo: 'Editar los datos de la empresa y confirmarlos en un certificado nuevo',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a Administración → Configuración → "Datos de la empresa" y cambia, por ejemplo, el nombre de quien firma.', resultadoEsperado: 'Guarda correctamente.' },
          { paso: 'Genera un certificado laboral nuevo de cualquier colaborador.', resultadoEsperado: 'El PDF ya muestra el nuevo dato guardado.' },
        ],
      },
    ],
  },
  {
    modulo: 'Nexa — Feed corporativo',
    escenarios: [
      {
        titulo: 'Publicar con cada tipo de adjunto',
        rolNecesario: 'admin_th o líder',
        pasos: [
          { paso: 'Publica un comunicado sin adjunto.', resultadoEsperado: 'Aparece en el feed solo con texto.' },
          { paso: 'Publica uno con un documento adjunto (PDF o imagen).', resultadoEsperado: 'Aparece como tarjeta con nombre, tamaño y botón de descarga funcional.' },
          { paso: 'Publica uno con un link externo y usa "Vista previa".', resultadoEsperado: 'Trae título/imagen/descripción del sitio (si el sitio los tiene) antes de publicar.' },
          { paso: 'Publica uno con un video o imagen destacada.', resultadoEsperado: 'Se reproduce/visualiza directo en el feed, sin necesitar descarga.' },
          { paso: 'Como admin_th, marca una publicación como "Fijar arriba del feed".', resultadoEsperado: 'Queda siempre primera en la lista.' },
        ],
      },
      {
        titulo: 'Reaccionar a una publicación',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Presiona "Me gusta" en una publicación del feed.', resultadoEsperado: 'Sube el contador y el botón queda marcado como activo.' },
          { paso: 'Vuelve a presionarlo.', resultadoEsperado: 'Se quita la reacción y baja el contador.' },
        ],
      },
    ],
  },
  {
    modulo: 'Nexa — Formación, reconocimientos, simulacros y directorio',
    escenarios: [
      {
        titulo: 'Crear y asignar un curso',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Crea un curso nuevo con categoría, duración y puntos.', resultadoEsperado: 'Aparece en el catálogo.' },
          { paso: 'Asígnalo a un cargo completo.', resultadoEsperado: 'Queda vinculado a ese cargo con su nivel de riesgo.' },
          { paso: 'Asígnalo directamente a una persona.', resultadoEsperado: 'Aparece en "Mi formación" de esa persona.' },
        ],
      },
      {
        titulo: 'Marcar avance de un curso',
        rolNecesario: 'Colaborador',
        pasos: [
          { paso: 'Entra a Formación y SST y ajusta el control de avance de un curso asignado.', resultadoEsperado: 'Guarda el % y el estado pasa a "en curso".' },
          { paso: 'Presiona "Marcar como completado".', resultadoEsperado: 'Queda en 100% y estado "completado"; ya no se puede seguir editando.' },
        ],
      },
      {
        titulo: 'Otorgar un reconocimiento',
        rolNecesario: 'admin_th o líder',
        pasos: [
          { paso: 'Otorga un reconocimiento con puntos y motivo a una persona.', resultadoEsperado: 'Aparece en el muro de reconocimientos y sube en el ranking de puntos.' },
        ],
      },
      {
        titulo: 'Registrar un simulacro',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Crea un nuevo simulacro con fecha y participantes esperados.', resultadoEsperado: 'Aparece en el listado.' },
          { paso: 'Entra al detalle y marca asistencia + valoración de una persona.', resultadoEsperado: 'Queda guardado por fila.' },
        ],
      },
      {
        titulo: 'Administrar el directorio de aliados',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Agrega un aliado (ARL, asesor SST, etc.) con contacto.', resultadoEsperado: 'Aparece en la tabla, visible para toda la empresa.' },
          { paso: 'Elimínalo.', resultadoEsperado: 'Pide confirmación y luego desaparece de la lista.' },
        ],
      },
      {
        titulo: 'Mi cuaderno personal',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Entra a Nexa → Mi cuaderno y crea una nota.', resultadoEsperado: 'Queda guardada y visible en la lista.' },
          { paso: 'Edítala y luego elimínala.', resultadoEsperado: 'Los cambios y la eliminación se reflejan de inmediato.' },
          { paso: 'Inicia sesión como admin_th y busca alguna forma de ver las notas de otra persona.', resultadoEsperado: 'No existe ninguna pantalla que las muestre — son estrictamente privadas.' },
        ],
      },
    ],
  },
  {
    modulo: 'Alertas',
    escenarios: [
      {
        titulo: 'Resolver o descartar una alerta',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a Alertas y marca una como resuelta.', resultadoEsperado: 'Cambia a "Marcada como resuelta" y sale de la lista de pendientes.' },
          { paso: 'Descarta otra alerta.', resultadoEsperado: 'Cambia a "Descartada" y sale de la lista de pendientes.' },
        ],
      },
      {
        titulo: 'Un colaborador solo ve sus propias alertas',
        rolNecesario: 'Colaborador',
        pasos: [{ paso: 'Entra a Alertas.', resultadoEsperado: 'Solo aparecen alertas de esa persona, no de toda la empresa.' }],
      },
    ],
  },
  {
    modulo: 'Informes',
    escenarios: [
      {
        titulo: 'Exportar cada informe',
        rolNecesario: 'admin_th, líder o gerencia según el informe',
        pasos: [
          { paso: 'Entra a cada uno de los 4 informes exportables (360°, PDI, SST, Brechas).', resultadoEsperado: 'Cada uno carga con datos reales, sin errores.' },
          { paso: 'Presiona "Exportar PDF" en cada uno.', resultadoEsperado: 'Descarga un PDF legible con la información correspondiente.' },
          { paso: 'Presiona "Exportar Excel" en cada uno.', resultadoEsperado: 'Descarga un archivo .xlsx con la misma información en formato tabla.' },
        ],
      },
      {
        titulo: 'Los 4 informes nuevos cargan y respetan el alcance por rol',
        rolNecesario: 'admin_th, líder o gerencia según el informe',
        pasos: [
          { paso: 'Entra a Informes → Formación con cualquier rol.', resultadoEsperado: 'Carga sin error, con el estado de cursos según el alcance de ese rol (equipo o toda la empresa).' },
          { paso: 'Entra a Informes → Cultura y Engagement como admin_th, líder y gerencia.', resultadoEsperado: 'Los tres roles pueden verlo, con datos consistentes.' },
          { paso: 'Entra a Informes → Consolidado Gerencial como líder (no admin_th ni gerencia).', resultadoEsperado: 'No tiene acceso — es exclusivo de admin_th y gerencia.' },
          { paso: 'Entra a Informes → Histórico Comparativo.', resultadoEsperado: 'Muestra la comparación entre el ciclo actual y el anterior, igual que el widget de Inicio.' },
        ],
      },
    ],
  },
  {
    modulo: 'Administración',
    escenarios: [
      {
        titulo: 'Crear un usuario',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a Usuarios y roles → "Nuevo usuario".', resultadoEsperado: 'Pide colaborador sin cuenta, correo, rol y contraseña temporal.' },
          { paso: 'Completa y guarda.', resultadoEsperado: 'Aparece en la tabla de usuarios; esa persona ya puede iniciar sesión con la contraseña temporal.' },
        ],
      },
      {
        titulo: 'Importar el perfil de un cargo desde Excel',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a Cargos y perfiles → "Importar desde Excel" y sube un archivo con el formato correcto.', resultadoEsperado: 'Muestra una vista previa con conteos y advertencias (si algo no se pudo leer).' },
          { paso: 'Confirma la importación.', resultadoEsperado: 'El cargo queda creado o actualizado, visible en el detalle del cargo.' },
        ],
      },
      {
        titulo: 'Editar el organigrama',
        rolNecesario: 'admin_th',
        pasos: [{ paso: 'Cambia el líder directo de una persona.', resultadoEsperado: 'Se refleja de inmediato en Colaboradores → Organigrama y en quién acompaña a quién.' }],
      },
      {
        titulo: 'Editar la identidad organizacional',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Edita el propósito superior y guarda.', resultadoEsperado: 'Se guarda y es visible para todos los roles.' },
          { paso: 'Agrega un valor a la lista.', resultadoEsperado: 'Aparece en la lista de valores.' },
        ],
      },
      {
        titulo: 'Editar ponderaciones antes de abrir un ciclo',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Con un ciclo en estado "planeado", entra a Configuración y cambia los pesos.', resultadoEsperado: 'Guarda correctamente si los porcentajes suman 100% en cada grupo.' },
          { paso: 'Abre ese ciclo y vuelve a Configuración.', resultadoEsperado: 'Ya no aparece ese ciclo como editable (mensaje de "no hay ningún ciclo planeado" si era el único).' },
        ],
      },
    ],
  },
  {
    modulo: 'Comunicación — Mensajes y Notificaciones',
    escenarios: [
      {
        titulo: 'Enviar y leer un mensaje directo',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Entra a Mensajes → "Nuevo mensaje" y elige a cualquier persona de la empresa (no necesariamente de tu equipo).', resultadoEsperado: 'Se abre el hilo de conversación.' },
          { paso: 'Escribe y envía un mensaje.', resultadoEsperado: 'Aparece en el hilo; en el otro usuario sube el contador de mensajes sin leer en el encabezado.' },
          { paso: 'Inicia sesión como el destinatario y abre esa conversación.', resultadoEsperado: 'El mensaje queda marcado como leído automáticamente y el contador baja.' },
        ],
      },
      {
        titulo: 'Notificaciones y marcado de leídas',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Genera una alerta próxima a vencer para una persona (o espera a que el proceso automático la cree).', resultadoEsperado: 'Aparece una notificación nueva para esa persona, con el contador en el ícono de sobre del encabezado.' },
          { paso: 'Entra a Notificaciones y marca una como leída.', resultadoEsperado: 'Baja el contador; esa notificación ya no cuenta como pendiente.' },
          { paso: 'Presiona "Marcar todas como leídas".', resultadoEsperado: 'El contador queda en cero.' },
        ],
      },
    ],
  },
  {
    modulo: 'Centro de Ayuda',
    escenarios: [
      {
        titulo: 'Ayuda contextual y búsqueda',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Desde cualquier pantalla, presiona el ícono "?" del encabezado.', resultadoEsperado: 'Abre un panel con la ayuda de la pantalla en la que estás.' },
          { paso: 'Desde el Centro de Ayuda, busca un término (ej. "brief").', resultadoEsperado: 'Muestra resultados relevantes de manual, FAQ y glosario.' },
          { paso: 'Entra al Glosario y busca un término.', resultadoEsperado: 'Filtra la lista en tiempo real.' },
        ],
      },
    ],
  },
];
