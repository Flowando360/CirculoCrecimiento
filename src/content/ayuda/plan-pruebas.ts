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
      {
        titulo: 'El rol auditor_externo solo ve lo mínimo',
        rolNecesario: 'auditor_externo',
        pasos: [
          { paso: 'Inicia sesión con una cuenta con rol auditor_externo.', resultadoEsperado: 'El menú lateral solo muestra Colaboradores (nombre/cargo) e Informes → Evidencia de auditoría.' },
          { paso: 'Intenta entrar por URL a una pantalla fuera de su alcance (ej. /administracion/usuarios o /circulo-crecimiento/ciclos).', resultadoEsperado: 'Redirige a Inicio, no muestra datos.' },
          { paso: 'Entra a Colaboradores.', resultadoEsperado: 'Ve nombre y cargo de cada persona, sin datos sensibles (sin Hacer/Deber, sin salario, sin documentos).' },
        ],
      },
      {
        titulo: 'El panel Meta-Admin es exclusivo del equipo interno',
        rolNecesario: 'admin_th (para confirmar que NO entra) y una cuenta superadmin',
        pasos: [
          { paso: 'Inicia sesión como admin_th y escribe la URL /meta-admin directamente en el navegador.', resultadoEsperado: 'Redirige a Inicio — admin_th no tiene acceso, aunque sea el rol más alto dentro de su empresa.' },
          { paso: 'Inicia sesión con una cuenta marcada como superadmin (equipo interno de la alianza) y entra a /meta-admin.', resultadoEsperado: 'Carga la tabla de "Cuentas y membresías" con todas las empresas cliente del sistema, no solo la propia.' },
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
      {
        titulo: 'Tablero kanban de Planes de Desarrollo Individual (PDI)',
        rolNecesario: 'Colaborador (arrastra lo propio) y admin_th/líder (arrastran lo de su alcance)',
        pasos: [
          { paso: 'Entra a Planes de Desarrollo Individual con un PDI existente en la columna "Pendiente".', resultadoEsperado: 'Ves 4 columnas fijas: Pendiente, En curso, Cumplido, Vencido, cada una con su contador.' },
          { paso: 'Arrastra esa tarjeta a la columna "Cumplido".', resultadoEsperado: 'La tarjeta queda en la nueva columna y se guarda la fecha de cumplimiento automáticamente (sin recargar la página).' },
          { paso: 'Arrastra una tarjeta con fecha de compromiso vencida a una columna distinta de "Cumplido".', resultadoEsperado: 'La fecha se muestra resaltada en rojo en la tarjeta.' },
          { paso: 'Inicia sesión como gerencia y entra a PDI.', resultadoEsperado: 'Ve el tablero pero no puede arrastrar tarjetas (solo lectura).' },
        ],
      },
      {
        titulo: 'Motor automático: brecha detectada genera PDI y formación solo',
        rolNecesario: 'admin_th (configurar) y los acompañantes de un Encuentro de Crecimiento (valorar)',
        pasos: [
          { paso: 'En Administración → Configuración, asigna al menos un curso a "Cursos para brecha de Hacer" (o de Deber).', resultadoEsperado: 'Queda guardado en la lista de esa dimensión.' },
          { paso: 'Completa todas las valoraciones pendientes de un Encuentro de Crecimiento (autoevaluación, líder, pares y colaboradores a cargo) hasta llegar a 100% de avance, dejando notas bajas en los ítems de Hacer o Deber.', resultadoEsperado: 'Al guardar la última respuesta, el % de avance del Encuentro de Crecimiento llega a 100%.' },
          { paso: 'Entra a Círculo de Crecimiento → Planes de Desarrollo Individual (PDI) de esa persona.', resultadoEsperado: 'Aparece un nuevo PDI con la insignia "Automático", origen Hacer o Deber (según cuál quedó en semáforo bajo).' },
          { paso: 'Entra a la formación de esa persona en Nexa.', resultadoEsperado: 'Aparece asignado el curso configurado en el paso 1, sin que nadie lo haya asignado a mano.' },
          { paso: 'Corrige una respuesta del mismo Encuentro de Crecimiento y deja que se recalcule.', resultadoEsperado: 'No se crea un segundo PDI automático duplicado para la misma persona, ciclo y dimensión.' },
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
      {
        titulo: 'Mis fechas personales (aniversario de bodas, baby shower, embarazo)',
        rolNecesario: 'Colaborador (para cargar lo propio) y líder directo (para confirmar qué ve y qué no)',
        pasos: [
          { paso: 'Entra a Mi Perfil → "Mis fechas personales" y guarda una fecha de matrimonio y una de baby shower.', resultadoEsperado: 'Se guardan; aparece confirmación de "Guardado".' },
          { paso: 'Inicia sesión como el líder directo de esa persona y entra a Alertas.', resultadoEsperado: 'Aparecen las alertas de "Aniversario de bodas" y "Baby shower" de esa persona, con su fecha.' },
          { paso: 'Vuelve a Mi Perfil como el colaborador, marca "Estoy en embarazo" y guarda una fecha probable de parto.', resultadoEsperado: 'Se guarda correctamente.' },
          { paso: 'Inicia sesión otra vez como el líder directo y revisa Alertas y la ficha de esa persona.', resultadoEsperado: 'NO aparece ninguna alerta ni dato de embarazo — ese dato es privado, solo lo ve la propia persona y admin_th.' },
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
        titulo: 'Marcar avance de un curso (sin quiz)',
        rolNecesario: 'Colaborador',
        pasos: [
          { paso: 'Entra a Formación y SST y ajusta el control de avance de un curso asignado que NO tenga quiz configurado.', resultadoEsperado: 'Guarda el % y el estado pasa a "en curso".' },
          { paso: 'Presiona "Marcar como completado".', resultadoEsperado: 'Queda en 100% y estado "completado"; ya no se puede seguir editando.' },
        ],
      },
      {
        titulo: 'Armar y tomar el quiz de un curso',
        rolNecesario: 'admin_th (arma el quiz) y colaborador (lo toma)',
        pasos: [
          { paso: 'Como admin_th, entra al catálogo de Formación y SST y presiona "Gestionar" en un curso.', resultadoEsperado: 'Abre la pantalla del quiz de ese curso, vacía si es la primera vez.' },
          { paso: 'Define el % mínimo de aprobación y agrega 2 o 3 preguntas de opción múltiple, marcando una opción correcta en cada una.', resultadoEsperado: 'Cada pregunta aparece en la lista con la opción correcta señalada con un ícono.' },
          { paso: 'Asigna ese curso a un colaborador (si no lo tenía ya) e inicia sesión como esa persona.', resultadoEsperado: 'En su tarjeta del curso aparece el botón "Tomar el quiz" en vez de la barra de avance.' },
          { paso: 'Responde el quiz dejando alguna respuesta incorrecta a propósito, por debajo del % mínimo, y envíalo.', resultadoEsperado: 'Muestra el puntaje obtenido y el mensaje de que no se alcanzó el mínimo, con opción de "Reintentar".' },
          { paso: 'Reintenta el quiz respondiendo todo correctamente.', resultadoEsperado: 'Muestra el puntaje en 100% (o por encima del mínimo) y el curso pasa a estado "completado" automáticamente.' },
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
    modulo: 'Nexa — Asistente IA y base documental',
    escenarios: [
      {
        titulo: 'Cargar un documento de política y que el asistente lo use',
        rolNecesario: 'admin_th (carga el documento) y cualquier usuario (le pregunta al asistente)',
        pasos: [
          { paso: 'Como admin_th, entra a Nexa → Asistente IA → "Base documental" y pega un texto corto de una política de ejemplo (ej. "Los EPP se entregan cada 6 meses").', resultadoEsperado: 'El documento aparece en la lista, activo, con la cantidad de caracteres cargados.' },
          { paso: 'Ve al chat del Asistente IA y pregunta algo directamente relacionado con ese texto.', resultadoEsperado: 'La respuesta incorpora la información del documento cargado (no una respuesta genérica).' },
          { paso: 'Desactiva ese documento (casilla Activo/Inactivo) y vuelve a hacer la misma pregunta.', resultadoEsperado: 'El asistente ya no usa ese documento como referencia.' },
          { paso: 'Pregunta algo normativo para lo que no hay ningún documento cargado ni activo.', resultadoEsperado: 'El asistente dice explícitamente que no tiene esa información, en vez de inventar una respuesta.' },
        ],
      },
    ],
  },
  {
    modulo: 'Progressive Web App (instalación en celular)',
    escenarios: [
      {
        titulo: 'Instalar la app desde el navegador del celular',
        rolNecesario: 'Cualquier usuario',
        pasos: [
          { paso: 'Abre la URL de la app en Chrome de un Android.', resultadoEsperado: 'El navegador ofrece la opción "Instalar app" o "Agregar a pantalla de inicio" (automática o desde el menú de tres puntos).' },
          { paso: 'Instálala y ábrela desde el ícono en la pantalla de inicio.', resultadoEsperado: 'Abre a pantalla completa, sin la barra de direcciones del navegador, con el isotipo de Mármoles y Servicios como ícono.' },
          { paso: 'Repite en un iPhone con Safari, usando el botón de compartir → "Agregar a pantalla de inicio".', resultadoEsperado: 'Mismo resultado: ícono propio, abre a pantalla completa.' },
          { paso: 'Con la app instalada, navega por un par de pantallas y luego apaga los datos/wifi del celular.', resultadoEsperado: 'La app no se queda mostrando información vieja como si fuera actual — al no haber conexión, las pantallas con datos no cargan (a propósito no se guarda información sensible en caché).' },
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
          { paso: 'Entra a cada uno de los 8 informes exportables (360°, PDI, SST, Brechas, Formación, Cultura y Engagement, Consolidado Gerencial, Histórico Comparativo).', resultadoEsperado: 'Cada uno carga con datos reales, sin errores.' },
          { paso: 'Presiona "Exportar PDF" en cada uno.', resultadoEsperado: 'Descarga un PDF legible con la información correspondiente.' },
          { paso: 'Presiona "Exportar Excel" en cada uno.', resultadoEsperado: 'Descarga un archivo .xlsx con la misma información en formato tabla.' },
        ],
      },
      {
        titulo: 'Los 4 informes nuevos respetan el alcance por rol',
        rolNecesario: 'admin_th, líder o gerencia según el informe',
        pasos: [
          { paso: 'Entra a Informes → Formación con cualquier rol.', resultadoEsperado: 'Carga sin error, con el estado de cursos según el alcance de ese rol (equipo o toda la empresa).' },
          { paso: 'Entra a Informes → Cultura y Engagement como admin_th, líder y gerencia.', resultadoEsperado: 'Los tres roles pueden verlo, con datos consistentes.' },
          { paso: 'Entra a Informes → Consolidado Gerencial como líder (no admin_th ni gerencia).', resultadoEsperado: 'No tiene acceso — es exclusivo de admin_th y gerencia.' },
          { paso: 'Entra a Informes → Histórico Comparativo.', resultadoEsperado: 'Muestra la comparación entre el ciclo actual y el anterior, igual que el widget de Inicio.' },
        ],
      },
      {
        titulo: 'Evidencia de auditoría: descarga y alcance',
        rolNecesario: 'auditor_externo y, por separado, admin_th',
        pasos: [
          { paso: 'Con datos ya cargados en Procesos y Sistemas de Gestión (al menos un proceso, un riesgo y un ítem de checklist con evidencia adjunta), inicia sesión como auditor_externo y entra a Informes → Evidencia de auditoría.', resultadoEsperado: 'Ve las 4 tarjetas de paquete (Completo, SST, ISO 9001, SARLAFT/SAGRILAFT) con los conteos reales.' },
          { paso: 'Descarga el "Paquete completo".', resultadoEsperado: 'Baja un archivo ZIP con un PDF de portada, un Excel de detalle y los archivos de evidencia adjuntos al checklist.' },
          { paso: 'Descarga el paquete "ISO 9001" únicamente.', resultadoEsperado: 'El ZIP trae solo lo correspondiente a ese marco normativo (menos contenido que el paquete completo).' },
          { paso: 'Inicia sesión como admin_th y repite la descarga.', resultadoEsperado: 'También puede acceder y descargar — no es exclusivo del auditor externo.' },
        ],
      },
    ],
  },
  {
    modulo: 'Procesos y Sistemas de Gestión',
    escenarios: [
      {
        titulo: 'Registrar un proceso documentado',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra a Procesos y Sistemas de Gestión y agrega un proceso con área, nombre, descripción y versión.', resultadoEsperado: 'Aparece en la lista de "Procesos documentados" con la fecha de actualización de hoy.' },
          { paso: 'Elimínalo.', resultadoEsperado: 'Desaparece de la lista de inmediato.' },
        ],
      },
      {
        titulo: 'Registrar un riesgo en la matriz',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Agrega un riesgo eligiendo marco normativo (ISO 9001 / SARLAFT-SAGRILAFT / PTEE / Interno), probabilidad, impacto y un control asociado.', resultadoEsperado: 'Aparece en la matriz con la etiqueta de marco normativo y el color según el impacto (verde/amarillo/rojo).' },
        ],
      },
      {
        titulo: 'Tablero de checklist de cumplimiento con evidencia adjunta',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Agrega un ítem de checklist para un marco normativo, adjuntando un archivo como evidencia.', resultadoEsperado: 'Aparece como tarjeta en la columna "No cumple" (estado inicial por defecto) con el ícono de clip indicando que tiene evidencia.' },
          { paso: 'Arrastra esa tarjeta hasta la columna "Cumple".', resultadoEsperado: 'La tarjeta queda en la nueva columna y el contador de cada columna se actualiza.' },
          { paso: 'Usa el filtro de marco normativo arriba del tablero para ver solo ISO 9001.', resultadoEsperado: 'Solo se muestran las tarjetas de ese marco normativo en las 4 columnas.' },
        ],
      },
      {
        titulo: 'Tablero kanban de un proceso',
        rolNecesario: 'admin_th',
        pasos: [
          { paso: 'Entra al tablero de un proceso que todavía no tiene etapas.', resultadoEsperado: 'Aparece el botón "Crear tablero con etapas por defecto".' },
          { paso: 'Créalo, y luego usa "Configurar etapas" para renombrar una columna y agregar una nueva con un color distinto.', resultadoEsperado: 'Los cambios se reflejan de inmediato en el tablero.' },
          { paso: 'Agrega una tarjeta con responsable, prioridad y fecha límite vencida.', resultadoEsperado: 'La tarjeta aparece en la columna elegida, con su fecha límite resaltada en rojo.' },
          { paso: 'Arrastra la tarjeta a otra columna.', resultadoEsperado: 'Cambia de columna y el contador de cada una se actualiza.' },
        ],
      },
      {
        titulo: 'Un líder consulta pero no edita',
        rolNecesario: 'Líder',
        pasos: [
          { paso: 'Inicia sesión como líder y entra a Procesos y Sistemas de Gestión.', resultadoEsperado: 'Puede ver los tres bloques (procesos, riesgos, tablero de checklist), pero no aparecen los formularios para agregar/eliminar ni puede arrastrar tarjetas — solo lectura.' },
        ],
      },
    ],
  },
  {
    modulo: 'Meta-Admin (equipo interno de la alianza)',
    escenarios: [
      {
        titulo: 'Editar el plan y la facturación de una empresa cliente',
        rolNecesario: 'Cuenta superadmin',
        pasos: [
          { paso: 'Entra a /meta-admin y localiza una empresa en la tabla.', resultadoEsperado: 'Ve usuarios activos y colaboradores activos de esa empresa (conteos de solo lectura).' },
          { paso: 'Cambia su Plan a "Premium", ajusta el precio mensual, el estado de facturación a "Pendiente" y la fecha de próximo pago, y presiona "Guardar" en esa fila.', resultadoEsperado: 'El botón muestra "Guardando…" y luego "Guardado"; al recargar la página, los valores nuevos siguen ahí.' },
          { paso: 'Repite el cambio en otra fila (otra empresa).', resultadoEsperado: 'Solo se actualiza esa empresa — las demás filas no cambian.' },
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
          { paso: 'Entra a Usuarios y roles → "Nuevo usuario".', resultadoEsperado: 'Pide colaborador sin cuenta, correo, rol y contraseña temporal. El selector de rol incluye admin_th, líder, colaborador, gerencia y auditor_externo.' },
          { paso: 'Completa y guarda, eligiendo el rol auditor_externo.', resultadoEsperado: 'Aparece en la tabla de usuarios con ese rol; esa persona ya puede iniciar sesión con la contraseña temporal y solo ve lo permitido para auditor_externo.' },
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
