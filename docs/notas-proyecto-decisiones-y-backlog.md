# Notas de proyecto — Decisiones y backlog futuro

**Proyecto:** CirculoCrecimiento
**Fecha:** 2026-07-20
**Propósito:** Documento consolidado para Claude Code. Contiene una decisión ya tomada (para ejecutar ahora) y varios ítems de backlog (para tener en cuenta en la planificación, **sin implementar todavía** salvo que se indique explícitamente).

---

## 0. PENDIENTE OPERATIVO — Poner el repositorio de GitHub en privado

**Fecha:** 2026-07-27

El repositorio `Flowando360/CirculoCrecimiento` es **público** en GitHub. Desde el 2026-07-27 tiene subidos `docs/DatosEmpleadosM&S.xlsx` y los 19 `docs/PERFIL...xlsx`, con datos personales reales de los 35 colaboradores (documentos de identidad, correos, teléfonos, salarios de referencia por cargo).

Diana (la usuaria) decidió explícitamente dejarlo en público por ahora, mientras dura la fase de pruebas, y revisarlo cuando terminen. **Recordatorio:** antes de dar por cerrado el proyecto o de compartir el repo con alguien externo, poner el repositorio en privado (GitHub → Settings → Danger Zone → Change visibility) y evaluar si conviene además reescribir el historial de git para quitar esos archivos de commits viejos.

---

## 1. DECISIÓN TOMADA — Ejecutar ahora

### 1.1 Arreglar el selector de "líder directo" en el organigrama

Al documentar el Centro de Ayuda se detectó que el selector de "líder directo" en `administracion/organigrama/page.tsx` no está conectado a ninguna acción — el menú se ve, pero cambiarlo no guarda nada. El propio código lo señala como pendiente de conectar a una Server Action de actualización.

Esto es importante porque el líder directo es la fuente de la que se calcula automáticamente quién evalúa a quién (o, en el nuevo lenguaje del producto, quién acompaña el crecimiento de quién — ver punto 4). Se debe poder reorganizar el organigrama desde la interfaz, sin depender de SQL manual.

**Antes de programar**, Claude Code debe aclarar: si alguien cambia de líder a mitad de un ciclo de evaluación/crecimiento ya abierto, ¿el cambio debe recalcular automáticamente quién acompaña a esa persona, o solo aplica desde el siguiente ciclo?

---

## 2. BACKLOG FUTURO — No implementar todavía

### 2.1 Gestión documental del colaborador

- **Carga de contratos**: subir el contrato laboral de cada colaborador (PDF), asociado a su perfil.
- **Hojas de vida**: subir y almacenar la hoja de vida (CV) de cada colaborador.
- **Generación de certificados laborales**: generar automáticamente un certificado laboral (PDF) con los datos del colaborador (cargo, fecha de ingreso, etc.), descargable desde su perfil o bajo solicitud.

**Consideraciones a resolver cuando se planifique esta fase:**
- Estos documentos son sensibles (a diferencia de los del feed, que son de difusión general): deben ir en un espacio de Storage con permisos restrictivos, visible solo para admin_th y el propio colaborador.
- El certificado laboral requiere una plantilla y un motor de generación de PDF con los datos ya existentes en el modelo de `Persona/Usuario`.

### 2.2 Fechas importantes y momentos personales del colaborador

Registrar y dar seguimiento a fechas y eventos personales relevantes para la cultura organizacional:

- Cumpleaños del colaborador
- Aniversario de bodas
- Aniversario de ingreso a la empresa (antigüedad)
- Estado de embarazo (dato sensible, requiere manejo confidencial)
- Baby showers u otros eventos de vida personal relevantes

**Consideraciones a resolver cuando se planifique esta fase:**
- **Privacidad**: información como embarazo es un dato sensible; definir quién puede verla (probablemente solo admin_th y el propio colaborador) y cómo se usa de forma respetuosa.
- **Modelo de datos**: probablemente una tabla `fechas_importantes` o `eventos_personales` por colaborador, con tipo de evento, fecha y nivel de visibilidad/confidencialidad.
- **Relación con el feed**: definir si estos eventos generan publicaciones automáticas (ej. "Hoy es el cumpleaños de X") y si el colaborador puede decidir si quiere que se publique o no.

### 2.3 Propósito superior de la organización (misión, visión, valores, principios)

Poder registrar, por empresa cliente, su **propósito superior, principios, valores y visión organizacional**, de forma que esta información sea:

- **Transversal**: visible y de referencia en todos los módulos relevantes de la plataforma (no aislada en una sola pantalla).
- **Consultable en los análisis**: que el Asistente de IA y los informes puedan referenciarla — por ejemplo, al generar un PDI o un informe de brechas, poder conectar la brecha detectada con el principio o valor organizacional al que se relaciona, o que el asistente de IA responda dudas alineado con esos principios.

**Consideraciones a resolver cuando se planifique esta fase:**
- Modelo de datos: probablemente una tabla `propósito_organizacional` (o ampliar la entidad `Empresa`) con campos para propósito, misión, visión, valores y principios.
- Definir en qué pantallas se muestra (ej. dashboard, PDI, informes) y cómo se conecta con el Asistente de IA para que use este contexto al responder.
- Definir quién puede editarlo (probablemente solo admin_th o Gerencia).

### 2.4 Cambio de lenguaje: de "evaluación" a "Círculo de Crecimiento y desarrollo personal"

Ajustar el lenguaje de toda la plataforma para que **no se sienta en términos de evaluación**, sino de **crecimiento y desarrollo personal**, en línea con el propósito de fondo del producto.

Esto implica revisar textos, etiquetas, nombres de módulos y comunicaciones dentro de la app (ej. dashboards, notificaciones, informes, correos) para reemplazar un lenguaje evaluativo/punitivo por uno de acompañamiento y desarrollo. Por ejemplo, en vez de hablar de "ser evaluado" o "resultados de la evaluación", usar un lenguaje orientado a "tu proceso de crecimiento" o "tu Círculo de Crecimiento".

**Consideraciones a resolver cuando se planifique esta fase:**
- Es un cambio principalmente de **copy/textos de interfaz**, no necesariamente de estructura de datos ni de lógica (los cálculos, roles y flujo de información se mantienen igual).
- Conviene hacer un inventario de todos los textos actuales que usan lenguaje evaluativo antes de reescribirlos, para no dejar inconsistencias (unas pantallas con el lenguaje nuevo y otras con el viejo).
- Definir si el cambio de lenguaje aplica también a nombres técnicos internos (tablas, variables) o solo a lo que ve el usuario final — probablemente conviene dejar los nombres técnicos como están y cambiar solo lo visible, para no generar riesgo innecesario en el código.

### 2.5 Planes de inducción por cargo

Poder crear y asignar **planes de inducción diferenciados por cargo**, compuestos de dos partes:

- **Parte común (igual para todos los cargos)**: conocimiento de la empresa — su propósito, principios, valores y cultura (ver punto 2.3, con el que este ítem debe conectarse directamente, ya que reutiliza la misma información registrada ahí).
- **Parte específica por cargo**: contenido propio de inducción según el cargo, área o rol de la persona (funciones, procesos, herramientas, riesgos asociados, etc.).

**Consideraciones a resolver cuando se planifique esta fase:**
- Este ítem se apoya en dos piezas que ya son backlog: el propósito organizacional (2.3) para la parte común, y el módulo de Rutas de aprendizaje de Nexa (ya construido) para la parte específica por cargo — probablemente un plan de inducción termine siendo una "ruta de aprendizaje" especial marcada como inducción, más que un módulo aparte desde cero.
- Definir si el plan de inducción se asigna automáticamente al crear un nuevo colaborador (según su cargo), o si alguien debe asignarlo manualmente.
- Definir si se debe hacer seguimiento del avance de inducción de forma separada al resto de formación (ej. un indicador de "inducción completada" visible para admin_th), dado que es un proceso que ocurre una sola vez por persona, a diferencia de la formación continua.
- Definir si el plan de inducción varía también según si la persona es nueva en la empresa o cambia de cargo internamente (¿aplica la inducción completa de nuevo, o solo la parte específica del nuevo cargo?).

---

## 3. Nota general

Los ítems de la sección 2 son backlog: sirven para que quede registrado el alcance conversado y no se pierda de vista al planificar próximas fases. No se debe implementar nada de la sección 2 hasta que se indique explícitamente. El único ítem a ejecutar ahora es el de la sección 1.
