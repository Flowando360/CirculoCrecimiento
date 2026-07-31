# Propuesta de costo base del sistema — Espiral Evolutiva 360° + Nexa

**Para:** reunión de alianza del jueves 6 de agosto de 2026 (Diana, Vanessa, Claudia).
**Qué es esto:** la tarea que Diana se llevó de la reunión del 30 de julio — *"proponer el costo del sistema sin ninguna arandela"* — el punto de partida para negociar splits, no un precio final. Está lleno de supuestos marcados explícitamente para que los ajustes con cifras reales tuyas antes de llevarlo a la mesa.
**Qué NO incluye a propósito:** consultoría, capacitación, acompañamiento de Talento Humano, ni comisión comercial — eso es lo que cada socia cobra aparte por su cuenta, encima de esto (ver sección 6).

---

## 1. Punto de partida: lo que ya está escrito

El Modelo de Negocio ya fijó dos anclas:
- **"Precio base de inicio: 1 SMMLV"** para la membresía.
- Segmento objetivo: **empresas de 10 a 150 personas.**
- Dos fuentes de ingreso separadas: **valor de implementación** (pago único) + **membresía recurrente mensual** (según usuarios activos).

**SMMLV 2026 (Decretos 1469 y 1470 de dic. 2025):** $1.750.905 (+ auxilio de transporte $249.095 = $2.000.000 total, pero para esta propuesta se usa el salario base, $1.750.905, como es la convención del documento).

---

## 2. Costos de la plataforma técnica (cifras oficiales, no estimaciones de mercado)

Hoy usas los planes **gratis** de Vercel y Supabase, así que no ves ninguno de estos cobros todavía. Esto es lo que pagarías el día que el uso real supere esos límites gratis — tarifas tomadas directamente de las páginas oficiales de precios de cada proveedor (ver Fuentes al final), no estimaciones de mercado como en la versión anterior de este borrador.

**TRM de referencia:** ~$3.150 COP/USD (31 de julio de 2026 — el peso se apreció fuerte esta semana; la TRM se mueve, así que trata estas cifras en COP como aproximadas y las de USD como las firmes).

| Rubro | Plan gratis (lo que usas hoy) | Plan pago real | Costo mensual (USD) | Costo mensual (COP, TRM ~3.150) |
|---|---|---|---|---|
| **Vercel** (hosting, funciones) | Hobby — gratis, pero **no permite uso comercial** según los términos de Vercel | Pro: US$20/mes por asiento, incluye 1 TB de transferencia, 10M de "edge requests" y **US$20 de crédito de uso mensual** que absorbe excedentes | US$20/mes (1 asiento) + cómputo activo si lo excede | ~$63.000/mes |
| **Supabase** (base de datos, auth, storage) | Free — el proyecto se **pausa tras 1 semana de inactividad**, no apto para producción | Pro: US$25/mes base, incluye 8 GB de base de datos, 100 GB de almacenamiento, 250 GB de egress, 100.000 usuarios activos al mes, y **US$10/mes de crédito de cómputo** (cubre una instancia Micro) | US$25/mes base (probablemente sin excedentes al tamaño actual) | ~$78.750/mes |
| **Anthropic** (asistente de IA de Nexa) | No hay plan "gratis" — es pago por uso desde el primer token (puede haber créditos promocionales de arranque) | Claude Haiku 4.5: US$1 / US$5 por millón de tokens (entrada/salida) — el modelo recomendado por costo para un asistente de RRHH. Claude Sonnet 5: US$3 / US$15 por millón (promoción US$2/US$10 hasta el 31 de agosto de 2026) — más capaz, más caro | US$5–20/mes por cliente activo con Haiku (uso moderado); más con Sonnet | ~$15.750–$63.000/mes por cliente |
| **Total infraestructura base (Vercel + Supabase, compartida entre todos los clientes)** | — | — | **US$45/mes** (1 asiento Vercel + Supabase Pro, sin excedentes) | **~$141.750/mes** |

**Lectura clave:** el piso real de infraestructura para tener el sistema en producción (sin importar cuántos clientes tengas todavía) es de solo **~US$45/mes (~$142.000 COP)**, más el costo variable del asistente de IA por cliente activo (unos pocos dólares al mes con Haiku 4.5). Esto es *mucho* más bajo que las estimaciones de mercado de la versión anterior de este borrador.

**Lo que esta tabla NO incluye** (y es lo que de verdad vale la plataforma): tu tiempo de desarrollo, mantenimiento y soporte técnico continuo. Ese tiempo es justo lo que se acordó que debes valorar tú misma en la reunión (sección 4.3 del documento de insights) — este borrador no te lo resuelve, es una decisión tuya.

---

## 3. Otros rubros del negocio — más allá de la plataforma técnica

La sección 2 solo cubre la nube (servidores, base de datos, IA). Un producto que se vende de verdad a clientes reales carga costos adicionales que no son "plataforma" pero sí son reales. Esto es lo que identifico, agrupado por si es un costo nuevo en efectivo o algo que ya está resuelto de otra forma:

| Rubro | Tipo de costo | Estimado | Nota |
|---|---|---|---|
| **Implementación por cliente nuevo** (cargue de organigrama/cargos/colaboradores, configuración, pruebas, capacitación inicial) | Tiempo, no gasto en efectivo | Horas × tu tarifa (por definir — sección 4.3 del documento de insights) | Ya se cobra al cliente como pago único (sección 5). Este rubro es el costo interno de prestarlo, no un gasto nuevo aparte. |
| **Monitoreo de errores en producción** (ej. Sentry o similar) | Fijo mensual, opcional | US$0 hoy (no contratado); plan gratis de estas herramientas suele alcanzar para 1–2 clientes, luego ~US$26/mes | No está en uso todavía. Vale la pena considerarlo antes de tener varios clientes reales en producción a la vez — hoy, si algo falla, te enteras por el cliente, no por una alerta. |
| **Backups de la base de datos** | Incluido en Supabase Pro | US$0 adicional | Supabase Pro ya incluye backups diarios automáticos con 7 días de retención. Recuperación punto-a-punto más fina (PITR) es un addon opcional de US$100/mes — normalmente innecesario a este tamaño. |
| **Dominio propio y SSL** | Fijo anual / incluido | ~US$12–40/año si falta comprar alguno (~$38.000–126.000 COP); SSL es gratis vía Vercel | Si el sitio comercial ya está publicado con dominio propio, este costo ya está cubierto y no es nuevo. |
| **Facturación electrónica** (obligatoria ante la DIAN para vender formalmente) | Fijo mensual o gratis, según volumen | US$0 con el portal gratuito de la DIAN (hasta ~50 facturas/mes); $30.000–$200.000 COP/mes con un proveedor (Alegra, Siigo, etc.) si el volumen crece | Cada socia factura desde su propia empresa (así lo acordaron en la alianza), así que probablemente cada una ya tiene esto resuelto — solo aplica como gasto *nuevo* si alguna necesita subir de plan por volumen de clientes de este producto en particular. |
| **Pasarela de pagos** (si el cliente paga en línea con tarjeta o PSE) | Variable, % por transacción | ~2,65%–3,5% + IVA por tarjeta (Wompi, PayU, ePayco); PSE más barato, ~1,3%–2% | Se descuenta directo de cada cobro — no es una factura mensual fija, sale del ingreso. Si el cobro es por transferencia manual (como probablemente hoy con Mármoles y Servicios), este costo simplemente no aplica. |
| **Política de tratamiento de datos / habeas data** (Ley 1581 de 2012) | Una vez, revisión legal | No investigado — depende de si cada empresa ya tiene una política vigente | Relevante porque el sistema maneja datos sensibles de RRHH (salud, contratos, resultados de desempeño). Si ninguna de las tres ya lo tiene resuelto para este producto específico, es un gasto legal a prever antes de escalar a más clientes — no urgente con un solo cliente piloto. |
| **Comisión comercial por venta** | % del ingreso | Ya contemplado, no se suma aparte | Sale del 90% que se reparte según el criterio de la sección 7 — no es un rubro nuevo, es cómo se distribuye lo que ya se cobra. |
| **Herramientas comerciales** (CRM sencillo para prospectos, firma electrónica de contratos, algo de presupuesto de marketing/pauta) | Opcional, aún sin contratar | US$0 hoy | Ninguna es indispensable con el volumen actual de un cliente piloto. Vale la pena tenerlas en el radar si la alianza empieza a cerrar varios clientes en paralelo y el seguimiento manual (WhatsApp/Excel) deja de alcanzar. |

**En resumen:** lo único que hoy representa un gasto *nuevo* en efectivo, mes a mes, más allá de la infraestructura de la sección 2, es el monitoreo de errores (si lo activan) y, eventualmente, subir de plan de facturación electrónica si el volumen crece. El resto — dominio, SSL, backups, facturación básica, pasarela de pagos, comisión comercial — o ya está resuelto por otra vía, o sale como porcentaje de lo que ya se cobra, no como una factura aparte.

---

## 4. Propuesta de membresía mensual, por tamaño de empresa

Escalonada según el tamaño real del segmento objetivo (10–150 personas), con el SMMLV como unidad de referencia — igual que ya lo define el Modelo de Negocio:

| Tramo | N.º de usuarios | Membresía mensual (SMMLV) | Membresía mensual (COP) |
|---|---|---|---|
| **Arranque** | 10–30 | 1,0 SMMLV | $1.750.905 |
| **Crecimiento** | 31–60 | 1,5 SMMLV | $2.626.358 |
| **Consolidado** | 61–100 | 2,0 SMMLV | $3.501.810 |
| **Empresarial** | 101–150 | 2,75 SMMLV | $4.814.989 |

**Por qué no es lineal (no es "tanto por usuario × usuarios"):** el costo de infraestructura no crece 1:1 con el número de usuarios — una empresa de 100 personas no cuesta 10 veces más de operar que una de 10. Escalar más lento que el número de usuarios dentro de cada tramo hace la oferta más competitiva contra Crehana/Buk conforme la empresa crece (que sí cotizan alto para empresa mediana), sin regalar margen en el tramo pequeño.

**Qué incluye la membresía** (todo lo que ya está construido): Espiral Evolutiva 360° completo (Ser·Saber·Hacer·Deber, motor automático de desarrollo, tableros kanban de PDI), Nexa completo (feed, formación con quizzes, reconocimientos, asistente de IA), Procesos y Sistemas de Gestión (tableros, checklist normativo, evidencia de auditoría), alertas, los 8 informes exportables, PWA. **No** incluye soporte de horas de consultoría/capacitación (sección 6).

**Margen frente al costo real (secciones 2 y 3):** con el piso real de infraestructura de ~US$45/mes (~$142.000 COP) compartido entre *todos* los clientes, más unos pocos dólares por cliente en el asistente de IA, y con la mayoría de los rubros de la sección 3 ya resueltos o cobrados aparte, el tramo más barato de esta tabla (Arranque, $1.750.905/mes) ya cubre varias veces ese costo incluso con un solo cliente activo. Esto es una noticia buena, no un problema a corregir: significa que los tramos actuales, basados en el SMMLV como ancla del Modelo de Negocio, **no necesitan subir** para ser rentables — el margen ya es sano y hay espacio de sobra para absorber soporte, mantenimiento, monitoreo y el tiempo de Diana sin tocar el precio al cliente. Si en la reunión del 6 de agosto se prioriza sonar más "accesible" frente a competidores, hay margen real para bajar el tramo Arranque sin poner en riesgo la operación — pero es una decisión comercial de la alianza, no algo que este costeo obligue.

---

## 5. Valor de implementación (pago único, por cliente nuevo)

Cubre: cargue de la información base (organigrama, cargos, colaboradores), instalación/configuración personalizada, pruebas, y capacitación inicial de uso — lo que ya hiciste manualmente con Mármoles y Servicios (ver el costo interno de esto en la sección 3).

| Tramo | Implementación (pago único, SMMLV) | Implementación (COP) |
|---|---|---|
| Arranque (10–30) | 0,75 SMMLV | $1.313.179 |
| Crecimiento (31–60) | 1,25 SMMLV | $2.188.631 |
| Consolidado (61–100) | 1,75 SMMLV | $3.064.084 |
| Empresarial (101–150) | 2,25 SMMLV | $3.939.536 |

**Supuesto a validar:** esto asume que la carga de datos de una empresa grande toma proporcionalmente más tiempo que una pequeña — cierto en general, pero si tienes una plantilla de carga masiva ya lista (como la que usaste con Mármoles), el tiempo real de implementación baja mucho independientemente del tamaño, y esta columna podría achatarse.

---

## 6. Rubros adicionales — se cobran aparte, cada socia lo suyo

Esto es exactamente lo que cada una de las tres ya sabe cotizar (Claudia lo dijo en la reunión: *"si necesitaba 20 horas de visión y enfoque... yo te sé decir cuánto vale eso"*) — este documento no debe fijarlo, solo dejar el espacio:

- **Soporte tecnológico** (mesa de ayuda, mantenimiento) — Diana/Flowando.
- **Capacitación continua** (formación nueva a usuarios, actualización de contenidos más allá de la inicial) — Vanessa/Nexus.
- **Acompañamiento en Talento Humano** (lectura de resultados, retroalimentación, seguimiento de PDI con líderes) — Diana/Flowando o quien la alianza defina.
- **Consultoría de procesos y cumplimiento** (diagnóstico, documentación, SST) — Claudia/Visión y Enfoque.

---

## 7. Cómo esto conecta con el reparto que ya se acordó

Este documento fija **el precio que el cliente paga por el sistema** (secciones 4 y 5). Sobre ESE número —no sobre el total de la venta con consultoría incluida— aplica el criterio que Diana propuso en la reunión: una porción pequeña y fija (~10%, a confirmar) es intocable para sostener la plataforma, y el resto se reparte entre gastos, comisión comercial y reserva de reinversión. La consultoría/capacitación de la sección 6 se factura y reparte aparte, con su propia lógica (quien la presta se la gana, con comisión para quien vendió).

---

## 8. Lo que falta para que esto deje de ser un borrador

- [x] Confirmar el costo real de los planes pagos de Vercel + Supabase + Anthropic (sección 2) — ya no son estimados de mercado, son las tarifas oficiales publicadas por cada proveedor a 31 de julio de 2026. Falta solo: cuando actives el plan Pro de cada uno, comparar contra tu primera factura real por si el uso real difiere de lo estimado aquí.
- [x] Identificar los rubros de costo del negocio más allá de la plataforma técnica (sección 3) — implementación, mantenimiento, facturación, pagos, legal, comercial. Falta: decidir cuáles activar ya (ej. monitoreo de errores) y cuáles dejar para cuando haya más clientes.
- [ ] Diana decide cómo valorar su propio tiempo invertido hasta ahora (acordado en la reunión, sección 4.3 del documento de insights — este borrador no lo resuelve).
- [ ] Validar los tramos de usuarios (10–30/31–60/61–100/101–150) contra el tamaño real de los primeros prospectos que la alianza ya tiene identificados.
- [ ] Decidir si el % "intocable para la plataforma" es fijo (10%) o varía por tramo.
- [ ] Con el margen real ya confirmado (sección 4), decidir si los tramos se mantienen igual o se bajan por estrategia de "precio accesible" — no es obligatorio bajarlos, es una opción disponible.
- [ ] Confirmar si cada una de las tres ya tiene resueltos facturación electrónica y política de tratamiento de datos para este producto específico, o si hay que presupuestarlos (sección 3).
- [ ] Llevar esto a la reunión del 6 de agosto como punto de partida de la conversación, no como propuesta cerrada.

---

**Guardado:** este archivo, igual que los anteriores, quedó solo local — sin commit ni push. Son cifras de negociación interna entre las tres socias.

Sources:
- [Salario mínimo legal vigente para el 2026 en Colombia | Siigo](https://www.siigo.com/blog/derecho-laboral/salario-minimo-vigente/)
- [Colombia decreta aumento del salario mínimo y auxilio de transporte para 2026 | Holland & Knight](https://www.hklaw.com/en/insights/publications/2025/12/colombia-decreta-aumento-del-salario-minimo-y-auxilio-de-transporte)
- [Vercel Pricing: Hobby, Pro, and Enterprise plans](https://vercel.com/pricing)
- [Fluid compute pricing | Vercel Docs](https://vercel.com/docs/functions/usage-and-pricing)
- [Pricing & Fees | Supabase](https://supabase.com/pricing)
- [Manage Compute usage | Supabase Docs](https://supabase.com/docs/guides/platform/manage-your-usage/compute)
- Precios de la API de Anthropic (Claude Sonnet 5, Claude Haiku 4.5) — tabla de precios vigente al 31 de julio de 2026, según la documentación oficial de Anthropic.
- [Precio del dólar en Colombia hoy, 30 de julio de 2026 | Noticias Caracol](https://www.noticiascaracol.com/economia/dolar-30-de-julio-de-2026-en-colombia-hoy-asi-abrio-la-trm-este-jueves-so35) (TRM de referencia)
- [Cómo deben facturar las pymes en Colombia 2026 | Alegra](https://blog.alegra.com/colombia/como-deben-facturar-las-pymes-en-colombia/) (facturación electrónica)
- [Pasarelas de Pago Colombia 2026: Tarifas de 12 Comparadas | BTO Digital](https://btodigital.com/pasarelas-pago-colombia-comparativa-guia-negocio/) (comisiones de pago)
