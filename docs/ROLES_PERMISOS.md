# Roles y permisos

| | `admin_th` (Talento Humano) | `lider` | `colaborador` | `gerencia` |
|---|---|---|---|---|
| Ver todos los colaboradores de la empresa | ✅ | Solo su equipo + sí mismo | Solo sí mismo | ✅ (sin detalle de calificaciones individuales) |
| Editar cargos y perfiles | ✅ | ❌ | ❌ | ❌ |
| Editar organigrama (líder de cada persona) | ✅ | ❌ | ❌ | ❌ |
| Abrir/cerrar ciclos de evaluación | ✅ | ❌ | ❌ | ❌ |
| Evaluar (autoeval / par / colaborador a cargo) | Como cualquier evaluador asignado | Como cualquier evaluador asignado + a su equipo | Autoevaluación + pares si le corresponde | No participa como evaluador por defecto |
| Ver resultados (Hacer/Deber) | Todos | Los de su equipo | Los propios | Agregados por equipo/empresa |
| Ver calificación individual dada por un par | ❌ (nadie la ve, ni admin_th por UI estándar — solo agregada) | ❌ | ❌ | ❌ |
| Gestionar Saber (checklist) | ✅ | ✅ de su equipo | Solo lectura de lo propio | ❌ |
| Ver/editar Guía del Flow (Ser) | ✅ | Lectura de su equipo | Lectura y edición de la propia | ❌ |
| Gestionar PDI | ✅ | ✅ de su equipo | Lectura + marcar avance propio | ❌ |
| Ver/gestionar alertas | ✅ todas | Las de su equipo | Las propias | ❌ (se resume en indicadores) |
| Publicar en el feed de Nexa | ✅ | ✅ | ❌ (solo reacciona) | Lectura |
| Otorgar reconocimientos | ✅ | ✅ | ❌ | Lectura |
| Invitar usuarios / asignar roles | ✅ | ❌ | ❌ | ❌ |

## Cómo se aplica técnicamente

Todo lo anterior está implementado como **Row Level Security en Postgres**
(`supabase/migrations/0007_rls_policies.sql`), no como lógica de UI. Esto
significa que aunque alguien manipule las peticiones desde el navegador, la
base de datos rechaza cualquier lectura o escritura que no cumpla la regla.

Funciones auxiliares reutilizadas en cada policy:
- `fn_mi_empresa_id()` — la empresa del usuario autenticado.
- `fn_mi_rol()` — su rol.
- `fn_mi_colaborador_id()` — su ficha de colaborador vinculada (si existe).
- `fn_es_mi_equipo(colaborador_id)` — ¿esa persona reporta directamente a mí?

## Rol `auditor_externo` (auditor/aliado externo invitado)

Rol de **solo lectura**, pensado para un auditor de ISO 9001, SARLAFT/SAGRILAFT
o SST invitado puntualmente (Portafolio Nexus: línea de Auditoría). No ve
ningún módulo de talento humano (evaluaciones, PDI, feed, mensajes, salarios):
solo tiene acceso a nombres/cargos de colaboradores, certificaciones SST, y
al módulo de Procesos y Sistemas de Gestión (`procesos_gestion`,
`matriz_riesgos_controles`, `checklist_cumplimiento`), incluyendo el paquete
de evidencia de auditoría exportable en `/informes/evidencia-auditoria`.
Se crea igual que cualquier otro usuario, desde Administración → Usuarios y
roles.

## Panel meta-admin (`es_superadmin`)

No es un rol de `rol_usuario` sino un campo aparte (`perfiles_usuario.es_superadmin`),
porque quien lo tiene no pertenece a una sola empresa: es el equipo interno
de la alianza (Flowando/Nexus/V&E) que administra cuentas y membresías de
**todas** las empresas cliente desde `/meta-admin`. Se activa manualmente en
la base de datos (no hay UI de autoservicio para otorgarlo, por seguridad).

## Nota sobre "gerencia" vs "admin_th"

El documento original menciona a Gerencia como consumidora de "reportes
gerenciales agregados por área y dimensión" sin acceso a calificaciones
individuales fuera de su línea directa (sección 13.3). Por eso `gerencia` es
un rol propio, distinto de `admin_th`: puede leer `colaboradores` y las
vistas de indicadores, pero las policies de `respuestas_evaluacion`,
`hoja_vida_formacion` y `entrevistas_salida` no lo incluyen.
