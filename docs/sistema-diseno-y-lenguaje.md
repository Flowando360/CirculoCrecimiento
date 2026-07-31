# Sistema de lenguaje y diseño visual — Círculo de Crecimiento

**Proyecto:** CirculoCrecimiento
**Fecha:** 2026-07-20
**Estado:** Definido, para implementar ahora
**Alcance:** Cambios de texto visible al usuario (copy/UI) y de paleta visual. NO implica cambios en nombres de tablas, columnas, rutas de API ni lógica de cálculo.

---

## 1. Glosario de lenguaje

Objetivo: que la plataforma se sienta como un proceso de acompañamiento y desarrollo, no como una evaluación de desempeño en el sentido tradicional/punitivo.

| Término actual | Término nuevo | Notas de uso |
|---|---|---|
| Evaluación | Encuentro de Crecimiento | Aplica al proceso/instancia (ej. "tu Encuentro de Crecimiento de este semestre") |
| Evaluaciones | Encuentros de Crecimiento | Plural |
| Ciclo de evaluación | Ciclo de Crecimiento | El período semestral en que se dan Hacer y Deber |
| Evaluador / Evaluadora | Acompañante | Quien califica/da retroalimentación a otra persona |
| Evaluadores | Acompañantes | Plural |
| Evaluado / Evaluada | Colaborador en crecimiento | La persona sobre la que se genera el Encuentro de Crecimiento. Cuando el contexto ya es claro (ej. "tu perfil"), puede simplificarse a solo "colaborador" |
| Calificar | Valorar | Verbo de la acción de puntuar en Hacer/Deber |
| Calificación / Calificaciones | Valoración / Valoraciones | Sustantivo |
| Colaborador a cargo | Colaborador a cargo (se mantiene el nombre) | Solo se ajusta su definición: es "uno de los tipos de Acompañante", no "uno de los tipos de evaluador" |

### Guía de aplicación (importante para Claude Code)

- Este es un cambio de **lenguaje visible al usuario** (textos de interfaz, etiquetas de botones, nombres de pantallas, correos, notificaciones, PDFs generados como el Informe 360° y el PDI). **No** se debe renombrar tablas, columnas, funciones, rutas de API ni variables internas del código — esto para evitar romper la lógica existente y reducir el riesgo del cambio.
- No es un simple "buscar y reemplazar" literal: hay que revisar el contexto de cada frase para que quede natural en español (ej. "evaluadores asignados" → "acompañantes asignados", pero una frase como "el sistema evalúa automáticamente los resultados" probablemente deba reescribirse distinto, ya que ahí "evalúa" se refiere al cálculo, no al rol de la persona).
- Antes de aplicar los cambios, Claude Code debe hacer un inventario de todos los archivos/textos que usan estos términos, para no dejar unas pantallas con el lenguaje nuevo y otras con el viejo.

---

## 2. Paleta de colores y sistema visual

Inspirada en las tres marcas del ecosistema: el azul marino de Mármoles & Servicios, el morado/violeta de Flowando, y el degradado morado-a-menta de la imagen "Flujo".

Dirección elegida: **balance entre morado y azul marino, con degradado menta como acento**, siguiendo el espíritu del "Flujo".

| Uso | Color | Valor aproximado (HEX) | Nota |
|---|---|---|---|
| Color primario | Morado violeta (Flowando) | `#7C3AED` | Botones principales, enlaces, elementos activos |
| Color secundario | Azul marino profundo (Mármoles) | `#1B2A5B` | Textos importantes, encabezados, fondo de barra de navegación |
| Color de acento | Verde menta (degradado "Flujo") | `#5EEAD4` | Detalles, íconos de éxito/logro, insignias, elementos de gamificación |
| Degradado destacado | Morado → Menta | `linear-gradient(90deg, #7C3AED, #5EEAD4)` | Para elementos hero, barras de progreso, tarjetas de logros/reconocimientos — evocando la forma de onda de "Flujo" |
| Fondo general | Blanco o gris muy claro | `#FFFFFF` / `#F8F9FC` | Mantener legibilidad, el color no debe sentirse recargado |
| Texto principal | Azul marino oscuro (no negro puro) | `#1B2A5B` o `#111827` | Más cálido que un negro puro |

**Nota sobre precisión de color:** los valores HEX de arriba son una aproximación visual a partir de las imágenes de los logos. Si se quiere exactitud total (por ejemplo, para cumplir un manual de marca), lo ideal es tomar el color exacto con una herramienta de selección de color (color picker) directamente sobre los archivos de logo, y ajustar estos valores antes de aplicarlos.

### Dónde debe notarse el cambio

- Botones y elementos interactivos → color primario (morado)
- Barra de navegación / encabezados → azul marino
- Insignias, logros, barras de progreso, tarjetas de reconocimiento → degradado morado-menta
- El feed y las tarjetas de comunicados pueden usar toques de menta como acento para que no se sienta "todo morado"
- Mantener fondo mayormente blanco/gris claro para que la plataforma no se sienta recargada — el color debe usarse con propósito (jerarquía, estados, logros), no en todas partes

---

## 3. Nota general

Ambos cambios (lenguaje y color) se pueden implementar ahora, pero se recomienda hacerlo en dos entregas separadas y revisables (primero lenguaje, luego color, o viceversa), para poder probar cada uno en local antes de desplegar, sin mezclar dos cambios grandes en un solo commit.
