# Arquitectura

## Decisión: un solo repo, un solo backend, dos módulos de navegación

Círculo de Crecimiento 360° y Nexa **no son dos aplicaciones separadas**.
Comparten:
- La misma tabla `colaboradores` (la ficha 360° es una sola).
- El mismo sistema de roles y RLS.
- El mismo esquema de alertas, que es el **puente funcional** entre ambos
  módulos (una alerta de Saber/SST vencida dispara una ruta de formación en
  Nexa — ver `src/app/api/nexa/disparadores/route.ts`).

Separarlos en dos apps habría obligado a sincronizar la ficha del colaborador
entre dos bases de datos — exactamente el problema de "archivos paralelos"
que el documento original identifica y busca eliminar.

## Cálculo en tiempo real

El documento original insiste en que el resultado de una persona se
recalcula "al guardar cada respuesta, sin correr un archivo". Esto se
implementa con:
1. Un trigger de Postgres (`trg_respuesta_evaluacion`) sobre
   `respuestas_evaluacion`.
2. Una función (`fn_recalcular_resultados_evaluacion`) que reconstruye el
   Índice de Hacer/Deber, el semáforo y la brecha, y los guarda en
   `resultados_evaluacion` (una tabla-cache, no una vista, para que las
   lecturas del dashboard sean instantáneas).

La misma lógica de ponderación existe en TypeScript
(`src/lib/calculos/ponderacion.ts`) **solo para previsualización en el
cliente** (por ejemplo, al simular un cambio de pesos en Configuración);
el cálculo autoritativo siempre vive en la base de datos.

## El organigrama como motor de evaluadores

La sección 9 del documento pide que el organigrama **decida
automáticamente** quién es líder, quién es par y quién es colaborador a
cargo. Esto se implementa en dos capas:
- **SQL** (`v_organigrama_evaluadores`, en `0005_vistas_indicadores.sql`):
  la fuente de verdad, usada por la API al abrir un ciclo.
- **TypeScript** (`src/lib/organigrama/resolver-evaluadores.ts`): un espejo
  de la misma lógica para previsualizar en el cliente sin golpear la base de
  datos en cada interacción del árbol del organigrama.

Los casos especiales de la sección 9.3 (Gerencia General sin líder interno,
Operaciones Internacionales sin equipo propio, cargos externos excluidos)
están resueltos en ambas capas.

## Seguridad y confidencialidad (sección 13.7)

- Row Level Security en **todas** las tablas sensibles.
- Un colaborador o líder nunca puede leer `respuestas_evaluacion` de
  terceros directamente — solo el agregado en `resultados_evaluacion`. Esto
  protege el anonimato de la calificación de pares por diseño de base de
  datos, no por convención de la UI.
- `admin_th` es el único rol con acceso irrestricto dentro de su empresa.
- El esquema es multi-tenant desde el día 1 (`empresa_id` en cada tabla),
  porque la Propuesta de Alianza contempla vender esto a más clientes
  después del piloto.

## Límites del plan gratuito a vigilar

| Servicio | Límite relevante | Mitigación |
|---|---|---|
| Supabase Free | Proyecto se pausa tras ~1 semana sin actividad | El cron diario de `/api/alertas/check` mantiene el proyecto activo como efecto secundario |
| Supabase Free | 500 MB de base de datos | Sin riesgo a la escala de 37–100 personas |
| Vercel Hobby | Crons limitados a 1 vez/día | El cron de alertas está configurado a diario (`0 8 * * *`), suficiente para el caso de uso |
| WhatsApp Business API | Sin tier gratuito real para envío proactivo | Notificaciones fase 1 van por email (Resend, 3000/mes gratis); WhatsApp queda para fase 2 |

## Integración con Nexa: por eventos, no por datos compartidos

`src/app/api/nexa/disparadores/route.ts` es el punto de integración
funcional descrito en la Tabla 4 de la Propuesta de Alianza. Se diseñó como
un endpoint idempotente que:
1. Recibe el id de una alerta.
2. Si es de tipo SST/Saber, busca la ruta de curso configurada para el
   cargo de esa persona.
3. Crea el registro en `nexa_rutas_formacion`, trazado hacia la alerta que
   lo originó (`alerta_origen_id`).

Este patrón (evento → acción) es el que permite that Flowando y Nexus
mantengan sus datos "propios" (metodología de un lado, plataforma SaaS del
otro) sin necesitar una sincronización de esquemas entre dos productos de
dos empresas distintas — coherente con el modelo de alianza comercial
descrito en la sección 12 del documento de alianza.
