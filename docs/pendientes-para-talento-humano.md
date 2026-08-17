# Pendientes para hablar con Talento Humano (Alexandra Rozo) — Mármoles y Servicios

**Proyecto:** CirculoCrecimiento
**Última actualización:** 2026-08-17
**Origen:** limpieza del organigrama y perfiles de cargo (27 jul), más lo que salió al cargar los 2 documentos más recientes (`PERFIL DE CARGO ASESORA COMERCIAL OBRAS Y SERV CLIENTE.xlsx` y `Plantilla_Carga_Empleados_MarmolesyServicios (2).xlsx`, 17 ago).

Este documento junta todo lo que quedó pendiente por falta de información — no son errores del sistema, son datos que solo Talento Humano tiene.

---

## 1. Persona en la plantilla que no está en el sistema

**Gladis Elena Gil Uribe** aparece en la hoja "Formación y certificaciones" de la plantilla de empleados con 5 estudios/cursos (técnico en contaduría, diplomado en normatividad laboral, técnico en sistemas, técnico en secretariado, bachiller comercial — todos por CESDE/CENSA), pero **no aparece en la hoja "Datos del empleado"** ni existe hoy en el sistema (ni el nombre ni ninguna cédula de las 36 personas coincide con ella).

No se cargó su formación por no tener con quién asociarla. *(Diana ya está averiguando quién es — puede que sea una ex-empleada, o que falte agregarla como colaboradora nueva.)*

## 2. Perfiles de cargo todavía sin la parte de Seguridad y Salud en el Trabajo

Estos cargos ya tienen cargado lo básico (objetivo, formación requerida, habilidades), pero les falta todo lo operativo/SST: funciones principales, factores de riesgo, exámenes médicos ocupacionales y elementos de protección personal. Se necesita el archivo `PERFIL DE CARGO...xlsx` (formato FORSST 61) de cada uno para completarlos, igual que se hizo hoy con Asesor Comercial:

| Cargo | Quién lo ocupa hoy |
|---|---|
| Asesora de Obras y Servicio al Cliente | Luz Ennith Álvarez Cardona |
| Coordinadora Comercial | Tatiana Marcela Serna Pérez |
| Coordinador Logístico e Inventarios | Jhon Fredy Rendón Rodas |
| Coordinadora de Producción | Diana Patricia Zapata Zapata |
| Staff Comercial | Laura Sánchez Carmona |
| Gerente General | Luz Adriana Rozo Álvarez *(este ya tiene los factores de riesgo cargados, falta el resto)* |
| Operario de Producción (cargo genérico) | Brayner Josevergara Pérez, Carlos Andrés Martínez Baldovino, Derwis José González Ocando, Jahn Carlos Flores Toro, Juan Pablo Osorio Preciado, Roberto Arturo Gaviria Díaz *(6 personas)* |
| Operario de Máquina Cortadora y Otros Oficios de Producción | Jacob Méndez Melendre, José Armando Ketterer Yonusg, Óscar Andrés Martínez Baldovino *(3 personas)* |
| Operario Integral de Logística y Producción | Leonel Uribe Correa |
| Operario de Producción y Mantenimiento | Julio Mauricio Cardoso Acevedo *(este está completamente vacío, ni siquiera tiene habilidades cargadas)* |

**Confirmado con Diana (17 ago):** "Asesora de Obras y Servicio al Cliente" es un cargo real y distinto de "Asesor Comercial" (lo ocupa Luz Ennith como líder de área) — no se debe fusionar con el perfil genérico de Asesor Comercial, necesita su propio documento.

## 3. Cargos con nombre duplicado o inconsistente (limpieza de catálogo)

El catálogo de cargos tiene varias parejas que parecen ser el mismo puesto escrito dos veces (una versión con el nombre bien formateado y sin nadie asignado, y otra en MAYÚSCULAS con la persona real asignada — probablemente se crearon automáticamente durante alguna carga masiva cuando el nombre escrito no coincidía exactamente con el ya existente). Antes de limpiarlos hay que confirmar con Alexandra cuál es el nombre correcto de cada uno y fusionarlos:

- **"Operario Integral de Logística e Inventarios"** (vacío, sin nadie) vs. **"OPERARIO INTEGRAL DE LOGÍSTICA Y PRODUCCIÓN"** (el que realmente tiene a Leonel Uribe)
- **"Asistente de Producción y Gestión de Contratistas"** (vacío, sin nadie) vs. **"AUXILIAR DE PRODUCCIÓN Y GESTIÓN DE CONTRATISTAS"** (el que realmente tiene a Eveli Córdoba) — esta pareja ya se había detectado el 27 de julio como duda sin resolver.
- **"Cortador / Oficios de Producción"** (vacío) — ¿es el mismo puesto que "Operario de Máquina Cortadora y Otros Oficios de Producción" (el que sí tiene 3 personas)?
- **"Auxiliar Logístico e Inventarios"** (vacío) vs. **"Auxiliar Lógistico"** *(nota: este último tiene un error de tipeo en el nombre — "Lógistico" en vez de "Logístico" — y es el que sí tiene perfil completo y a Ian Mateo Narváez asignado)*

## 4. Documentos en PDF pendientes de subir al sistema

La plantilla de empleados dice "Sí" en **¿Contrato firmado en PDF disponible?** y **¿Hoja de vida en PDF disponible?** para las 36 personas, pero ninguno de esos 36 archivos se ha subido todavía al sistema (el campo existe, está vacío). Cuando Alexandra tenga tiempo, se pueden ir subiendo desde la ficha de cada colaborador — no es urgente, pero conviene tenerlo en el radar porque son documentos legales de respaldo.

## 5. Perfiles de cargo sin documento fuente en absoluto (arrastrado desde el 27 de julio, sigue abierto)

Estos cargos no tienen ningún archivo `PERFIL...xlsx` en `docs/`, así que ni siquiera tienen lo básico cargado:

- Asesor Externo
- Contratista Instalador
- Revisor Fiscal
- Transportador

*(Estos 4 hoy no tienen a nadie asignado — quedan en el catálogo por si se van a usar más adelante para personal externo/contratistas. Si Talento Humano no piensa usarlos, se pueden dejar así sin problema.)*

**Pregunta para Alexandra:** ¿existen perfiles de cargo (formato FORSST 61) para los puestos de la sección 2 en algún archivo que no esté ya en `docs/`, o hay que construirlos desde cero con ella?

## 6. Inconsistencia de formato en las plantillas originales (recordatorio, sigue vigente)

En al menos 3 archivos `PERFIL...xlsx` antiguos (Coordinador de Producción, Líder de Operaciones Internacionales, Administrador/Coordinadora Administrativa) el Excel traía dos casillas de formación académica marcadas con X a la vez. Se tomó la de nivel más alto en cada caso, pero vale la pena que Talento Humano revise el formato de esa plantilla para que no se preste a confusión en perfiles futuros.

---

## Resuelto — sin acción pendiente

- ✅ **Asesor Comercial**: perfil completo (funciones, riesgos, exámenes, EPP) cargado el 17 de agosto de 2026.
- ✅ **Asistente Comercial**: perfil completo, cargado en una sesión anterior.
- ✅ **Salario individual**: las 35 personas activas ya tienen su salario cargado en el sistema (dato sensible, solo lo ve Talento Humano y la propia persona).
- ✅ **Formación y certificaciones**: 65 registros cargados el 17 de agosto para 29 colaboradores (diplomas, cursos, certificaciones de trabajo en alturas, SG-SST, etc.) — el sistema ya generó automáticamente las alertas de vencimiento correspondientes.
- ✅ **Auxiliar Contable**: no tiene a nadie asignado hoy, pero ya tiene perfil completo cargado por si se contrata a alguien.
- ✅ **Zoraida Valencia**: confirmado que ya no está en la empresa; marcada como `inactivo` (no se eliminó, para conservar su historial).
- ✅ Se depuraron 19 colaboradores que estaban en el sistema por error (contratistas, revisor fiscal, etc. de una lectura previa del organigrama que no coincidía con la lista oficial).
