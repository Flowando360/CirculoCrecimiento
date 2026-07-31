# Insights de la reunión de alianza — 30 de julio de 2026

**Participantes:** Diana Maria Said Cadavid (Flowando), Vanessa (Nexus Soluciones Empresariales), Claudia Córdoba (Visión y Enfoque).
**Fuente:** `docs/Conversación Ecositema Empresarial.vtt` (transcripción de la reunión).
**Nota:** este documento extrae solo lo accionable para el aplicativo, lo comercial y la alianza. Se dejó fuera deliberadamente la conversación personal/familiar de la reunión (no aporta a ninguno de esos tres frentes).

---

## 1. Ideas para el aplicativo

### 1.1 Generador de documentos de proceso asistido por IA (idea de Vanessa)
> "Yo me sueño como que, por ejemplo, documentar procesos... hay veces es muy tedioso para las empresas, como que hay una herramienta donde metan las ideas principales y pum, le genera el documento."

Hoy, en Procesos y Sistemas de Gestión, un proceso documentado se carga a mano (nombre, descripción, versión). Lo que Vanessa describe es un asistente que tome ideas sueltas/notas de la persona y genere el borrador del documento de proceso — un caso de uso natural para el mismo asistente de IA que ya existe (base documental con RAG), aplicado en la dirección contraria: no solo *responder* con las políticas ya cargadas, sino *ayudar a redactarlas* a partir de una conversación o de puntos sueltos. Vale la pena evaluarlo como una funcionalidad futura de Procesos y Sistemas de Gestión.

### 1.2 Perfiles de cargo sin plan de comunicación no sirven (insight de Diana, de otro proyecto de consultoría)
> "Ese es el problema, que los perfiles de cargo y manuales de funciones no sirven porque no tienen un plan de comunicaciones... nuestro aplicativo quedaría también aquí, y es una necesidad marcada en muchas empresas. Pero el día a día, lo urgente no deja tiempo para lo importante."

Diana lo dijo pensando en otro cliente (Launtate), pero aplica directo al aplicativo: cargar el perfil de cargo no es suficiente si nadie se entera de que existe o de qué dice. Hoy el perfil de cargo alimenta la Inducción y la Verificación de Saber automáticamente, lo cual ya es un principio de "plan de comunicación" — vale la pena usar esto como argumento comercial explícito ("no solo documentamos el perfil, lo ponemos a trabajar en la inducción y en el desarrollo de la persona, no se queda engavetado") en vez de dejarlo implícito.

### 1.3 Validación de mercado ya obtenida (encuesta del evento "Clavo", mencionada por Vanessa)
Vanessa lanzó una encuesta de validación de idea en un evento antes de esta reunión. Los dos dolores que más resaltaron los encuestados:
- **"La capacitación aburrida"** — ya atendido por Nexa (gamificación, puntos, quizzes de verificación agregados recientemente).
- **"La operatividad de los sistemas de gestión"** — ya atendido por el módulo de Procesos y Sistemas de Gestión con tableros kanban.

Esto es una validación externa real (no solo intuición del equipo) de que las dos apuestas más recientes del aplicativo (quizzes y tableros kanban) están exactamente donde el mercado dice que le duele. Vale la pena pedirle a Vanessa el archivo completo de esa encuesta (ella ofreció pasarlo: *"apenas tenga el archivo, te lo paso Diana"*) para citarlo con números reales en el documento comercial.

---

## 2. Hallazgo competitivo importante: por qué "Vivo" no ha vendido bien

Claudia lleva revendiendo una plataforma competidora ("Vivo", tipo Trello/gestión documental) desde antes de la pandemia. En 6 años, solo 3 clientes reales (uno de ellos ya se fue). Su diagnóstico, de primera mano:

> "No pienso que no es ni por la plataforma ni por el precio... las empresas hoy dicen: esto muy chévere, pero es que hoy lo tengo aquí. El control documental, buenísimo, pero para que me saque un consecutivo automático, yo no voy a pagar eso. Para que me monte un flujo de trabajo, hoy monto un List, hoy monto un Planner."

**La lección:** las empresas ya tienen tableros kanban gratis dentro de su suscripción de Microsoft 365 (Planner, Lists, Teams). Un tablero genérico, por bueno que sea, no es motivo suficiente para pagar algo aparte. Lo que sí justifica el pago es que el tablero venga **amarrado a un dominio específico que Planner no resuelve** — gestión de talento humano 360°, cumplimiento normativo con evidencia de auditoría, alertas de vencimiento SST, perfiles de cargo.

**Cómo aplica al aplicativo:** confirma que la estrategia ya seguida (tableros kanban como una pieza *dentro* de un sistema especializado de talento humano y cumplimiento, no como el producto en sí) es la correcta. En el discurso comercial, nunca vender "tenemos tableros arrastrables" como diferenciador solo — el diferenciador es lo que el tablero ya trae resuelto (checklist ISO 9001 con evidencia, PDI conectado al motor de brechas, etc.) que un Planner en blanco no tiene.

---

## 3. Estrategia comercial y de lanzamiento acordada

### 3.1 Lanzamiento modular, no todo de una vez
Argumento fuerte de Claudia: sostener post-venta de una funcionalidad es más fácil que sostener veinte en paralelo desde el día uno, y hacerlo todo junto encarece el desarrollo sin que haya ingresos entrando todavía.

**Orden de salida acordado:**
1. **Primero:** el motor de talento humano/desempeño (Espiral Evolutiva 360°) + capacitación (Nexa) — "el que tú tienes" ya es funcional.
2. **Después:** el módulo de Visión y Enfoque (procesos, riesgos, cumplimiento normativo) se suma como fase 2, cuando el primero ya esté generando ingresos.

*(Nota: esto es una decisión de secuencia de **salida al mercado / venta**, no de desarrollo — el módulo de Procesos y Sistemas de Gestión ya está construido en el aplicativo. Es una señal de que la alianza querría poder vender/activar el módulo de V&E como un segundo paquete separado, no necesariamente todo incluido desde el arranque. Vale la pena confirmar con Diana si esto debe reflejarse como una diferenciación real de planes/membresías dentro de la app.)*

### 3.2 Gancho de cierre de año (campaña estacional concreta)
Propuesta de Claudia, con precedente real en cómo ha vendido servicios de capacitación antes:
> "Los primeros tres meses valen tanto, pero te descontamos un mes. Probala, haz tu [ciclo de desarrollo] ahí, haz tus capacitaciones del último trimestre... el año no se acaba sin que las empresas tengan esto al día."

Idea concreta: campaña de **septiembre a diciembre**, con un descuento (ejemplo dado: de $1.000 a $850) para "cerrar el año con esto al día", con renovación natural para el año siguiente. Encaja con el ritmo real de las empresas: cierre de año es cuando SST, capacitación y evaluaciones de desempeño normalmente se ponen al día de todos modos.

### 3.3 Descuento parcial, NO prueba 100% gratis
Lección de la experiencia con Vivo:
> "Yo le puedo contar cuántos usuarios de prueba de Vivo hemos puesto. Y uno los llama, ¿sí lo probó? No... tiene que ser algo que la gente diga, tengo que usarla. Entonces pago un pedacito. Le pagó un 80% y usted paga un 20%, porque si se lo doy gratis no va."

Una cuenta de prueba completamente gratis se ignora. Mejor un descuento fuerte (ej. paga 20%, no 100%) que un "gratis" total — así hay algo en juego y de verdad la usan.

### 3.4 La urgencia real vende, no la persuasión
Ejemplo de la propia Diana con otro cliente (Comfarma, 20 horas para cumplir un plazo en agosto): *"si tienen esa presión, ellos hacen las cosas, pero si no la tienen, se toman el tiempo... no podemos entrar a vender algo sin presión, no podemos ponerle la soga al cuello."*

Esto refuerza que el discurso comercial más efectivo no es "esto es lo mejor del mercado", sino atarlo a fechas y obligaciones reales que la empresa ya tiene (vencimiento de certificaciones SST, cierre de ciclo de evaluación de fin de año, auditoría de ISO 9001 programada) — la misma lógica ya usada dentro del aplicativo con las Alertas.

---

## 4. Condiciones y estructura de la alianza (lo que quedó acordado)

### 4.1 Alianza, no sociedad
Decisión explícita de Diana, aceptada por las otras dos: **no** crear una sociedad/empresa nueva conjunta. Cada quien mantiene su propia empresa (Flowando, Nexus, Visión y Enfoque) y vende la plataforma como parte de su propio portafolio, desde su propio nicho:
- **Diana/Flowando** → desde talento humano.
- **Claudia/Visión y Enfoque** → desde procesos, SST y cumplimiento (además, es quien tiene más fuerza comercial de las tres).
- **Vanessa/Nexus** → desde capacitación (ella misma reconoce que ventas es su debilidad).

Nota operativa: ni Vanessa (persona natural, sin empresa constituida) ni Flowando (Diana no ha constituido la empresa todavía) están formalmente constituidas hoy — solo Visión y Enfoque lo está. Relevante para cómo se van a poder facturar los primeros contratos.

### 4.2 Modelo de facturación (precedente ya probado con "Vivo")
Quien cierra al cliente factura el paquete completo (plataforma + su servicio asociado) desde su propia empresa, para no confundir al cliente con varias facturas de distintas razones sociales ("para no enredar la pita"). Luego, internamente:
- Se separa una porción para "la plataforma" (propuesta de Diana: **10% intocable para la plataforma, 90% para cubrir gastos y comisión** — a propósito baja, para que en las primeras ventas SÍ quede margen para quien vendió y prestó el servicio, y no se ahogue la operación).
- Se paga el servicio prestado (ej. la capacitación de Vanessa, la consultoría de Claudia) a quien lo prestó.
- Se paga una comisión comercial a quien cerró la venta, aunque no haya prestado el servicio.
- El resto se divide entre las tres, dejando siempre **una reserva para reinversión** (futuros desarrollos, campañas).

### 4.3 Valoración del trabajo ya invertido por Diana
Se acordó explícitamente que a Diana se le debe reconocer/valorar el trabajo ya invertido en construir la plataforma hasta ahora, antes de definir splits futuros — y que sea ELLA quien defina esa valoración, con la confianza de las otras dos de que será justa (palabras de Claudia: *"a mí lo que Diana me diga, eso es"*). Esto todavía no tiene un número — quedó como tarea pendiente (ver sección 5).

### 4.4 Escenarios de reparto — falta un "simulador"
Idea de Claudia, sin resolver todavía: un simulador donde, dado quién vendió y quién prestó el servicio, se calcule automáticamente cómo se reparte cada venta (ej. "si lo vende Nexus... si lo vende Flowando... metamos ahí los 100 pesos y que eso calcule 30/40/70"). Podría terminar siendo una herramienta interna simple (hoja de cálculo o una pantalla dentro del propio aplicativo, en Meta-Admin) una vez estén definidos los porcentajes.

### 4.5 Precio del sistema — todavía no existe
Reconocido abiertamente: *"hoy ni siquiera hemos hecho un presupuesto."* Se acordó modelo de referencia: **arrendamiento/membresía por número de usuarios**, con paquetes tipo "plus/free" — sin inventar un modelo nuevo, calcado de lo que el mercado ya entiende (mismo criterio que compitieron mirando "de tanto a tanto usuarios, tanto", con paquetes de horas de soporte incluidas).

---

## 5. Tareas que quedaron explícitamente acordadas

| Quién | Tarea |
|---|---|
| **Diana** | Proponer el costo base del sistema "sin ninguna arandela" (punto de partida para la negociación de splits). |
| **Diana** | Revisar y aceptar/ajustar el Modelo de Negocio (documento ya compartido) junto con Claudia y Vanessa. |
| **Claudia** | Revisar el Modelo de Negocio y traer ideas de comercialización. Estructurar el "modelo de costos comercial" (splits, escenarios). Buscar un bosquejo antiguo (2015) de acuerdo de aliados que tiene guardado, como punto de partida. |
| **Claudia** | Armar un bosquejo de plan de trabajo compartido (sugirió un Planner) para poder ir revisando avances entre las tres. |
| **Vanessa** | Revisar el Modelo de Negocio. Pasar el archivo de la encuesta de validación del evento "Clavo" (mencionado, no confirmado si ya se envió). |
| **Todas** | Próxima reunión: jueves 6 de agosto, 5:00–6:00 p.m., enfocada en cerrar el modelo comercial y financiero. |

---

## 6. Nota sobre el nombre del producto

En esta misma llamada (antes de escribir el Modelo de Negocio formal), Diana describió la idea de palabra como *"un espiral de crecimiento"* — el mismo término que usó contigo en esta sesión. Claudia, más adelante en la llamada, abrió el documento ya escrito y leyó en voz alta el nombre tal como quedó formalizado: **"Modelo de negocio unificado, Espiral Evolutiva 360° + Nexa."** Es decir: el nombre coloquial que se usó primero en conversación ("espiral de crecimiento") es el origen de la idea, pero el nombre que la alianza ya adoptó por escrito y que las tres reconocen como el oficial es **Espiral Evolutiva 360°**. Esto confirma que la decisión que ya tomamos (usar "Espiral Evolutiva 360°" en los documentos comerciales) es consistente con lo que la alianza completa — no solo Diana — ya está usando.

---

## Cómo se guardó este documento

Igual que los documentos comerciales: **este archivo quedó solo en tu carpeta local, sin comitear ni subir a GitHub.** Contiene porcentajes de reparto y detalles de la negociación interna entre los tres socios, así que preferí no tocar git hasta que me confirmes que quieres guardarlo con protección de historial (commit local) o subirlo.
