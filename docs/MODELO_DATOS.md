# Modelo de datos — diccionario

Esquema completo en `supabase/migrations/`. Este documento se quedó
desactualizado (describía solo hasta 0007) mientras el esquema real siguió
creciendo hasta 0024 — se pone al día aquí. Resumen por dominio:

## 0001 — Núcleo organizacional
| Tabla | Qué guarda |
|---|---|
| `empresas` | Empresas cliente de FlowAndo (multi-tenant). Mármoles y Servicios = piloto. |
| `perfiles_usuario` | Rol de cada usuario autenticado (`admin_th`, `lider`, `colaborador`, `gerencia`). |
| `cargos` | Plantilla de perfil de cargo — la base de la dimensión Saber. |
| `cargo_habilidades` | Habilidades funcionales/técnicas por cargo, con nivel esperado. |
| `colaboradores` | La ficha 360° central. `lider_id` es la fuente de verdad del organigrama. |
| `hoja_vida_formacion` | Formación, certificaciones (con vencimiento → dispara alertas), experiencia. |
| `historial_movimientos` | Línea de tiempo: ingreso, promociones, cambios, salida. |
| `entrevistas_salida` | Offboarding: motivo, categoría, comentarios. |

## 0002 — Círculo de Crecimiento (Ser·Saber·Hacer·Deber)
| Tabla | Qué guarda |
|---|---|
| `competencias` | Las 9 competencias (5 Hacer + 4 Deber), con peso relativo. |
| `escala_niveles` | Los 5 niveles (Crítico…Referente). |
| `competencia_criterios` | El criterio textual de cada nivel, por competencia. |
| `ciclos_evaluacion` | Ciclo semestral, con los pesos de ponderación vigentes. |
| `evaluaciones` | Una instancia "colaborador X evaluado en ciclo Y". |
| `evaluacion_tareas` | Quién debe evaluar a quién (generado desde el organigrama). |
| `respuestas_evaluacion` | Cada calificación puntual (dispara el recálculo). |
| `resultados_evaluacion` | Cache de Índice de Hacer/Deber, semáforo y brechas. |
| `guia_del_flow` | Dimensión Ser: perfil narrativo, nunca numérico. |
| `verificaciones_saber` | Checklist de cumplimiento del perfil de cargo, por bloque. |
| `planes_desarrollo` | El PDI — entregable central. |
| `briefs_retroalimentacion` | Documento de preparación para el líder. |
| `acuerdos_crecimiento` | Compromisos firmados al cierre del ciclo. |

## 0003 — Alertas (transversal)
| Tabla | Qué guarda |
|---|---|
| `alertas` | Contrato, SST, formación, ciclo, cultura (cumpleaños/aniversario). |
| `notificaciones` | Registro de envíos (email/WhatsApp/in-app). |

## 0004 — Nexa
| Tabla | Qué guarda |
|---|---|
| `nexa_feed_publicaciones` / `nexa_feed_reacciones` | Feed corporativo tipo red social. |
| `nexa_cursos` | Catálogo de formación gamificada. |
| `nexa_rutas_por_cargo` | Qué curso corresponde a qué cargo (diferenciado por riesgo). |
| `nexa_rutas_formacion` | Instancia asignada a una persona; trazada a la alerta que la disparó. |
| `nexa_simulacros` / `nexa_simulacro_participantes` | Dinámicas en vivo. |
| `nexa_insignias` / `nexa_reconocimientos` | Gamificación y reconocimiento social. |
| `nexa_asistente_conversaciones` | Historial del asistente IA. |
| `nexa_directorio_aliados` | ARL, asesores SST, proveedores de formación. |

## 0005 — Vistas de indicadores
| Vista | Para qué sirve |
|---|---|
| `v_organigrama_evaluadores` | El organigrama traducido a matriz de evaluadores (líder/par/colab. a cargo/autoeval). |
| `v_saber_cumplimiento` | % de cumplimiento del perfil de cargo por persona. |
| `v_alineacion_talento_rol` | Indicador Ser-Hacer: ¿la persona está en un rol alineado con su talento? |
| `v_indicadores_equipo` | Mapa de equipo agregado por líder directo. |
| `v_indicadores_empresa` | Reporte gerencial consolidado. |
| `v_alertas_proximas` | Alertas dentro de su ventana de anticipación. |

## 0006 — Triggers de cálculo en tiempo real
Funciones `fn_recalcular_resultados_evaluacion`,
`fn_trigger_respuesta_evaluacion`, `fn_generar_alerta_vencimiento_formacion`,
`fn_generar_alertas_ingreso_colaborador`. Ver `docs/ARQUITECTURA.md`.

## 0007 — Row Level Security
Políticas por tabla, resumidas en `docs/ROLES_PERMISOS.md`.

## 0008 — Perfil de cargo completo + bloques de evaluación + identidad
| Tabla | Qué guarda |
|---|---|
| `cargo_funciones_principales` | Funciones del cargo (proceso, PHVA, periodicidad, herramientas) — bloque 4 de evaluación. |
| `cargo_decisiones` | Decisiones que puede tomar el cargo. |
| `cargo_factores_riesgo` | Riesgos SST del cargo (químico, mecánico, ergonómico...). |
| `cargo_examenes_medicos` | Exámenes de ingreso/periódico/retiro requeridos. |
| `cargo_epp` | Elementos de protección personal requeridos. |
| `empresa_identidad` | Propósito superior, visión, declaración de creencias — editable en Administración. |
| `empresa_identidad_elementos` | Principios y valores (uno por fila), tipo `principio`/`valor`. |
| `evaluacion_items` | Ítems editables por evaluación (agregar/quitar sin tocar el catálogo general). |
También agrega ~20 columnas a `cargos` (NIT-like: código/versión de documento, tipo de área, responsabilidades, SG-SST, etc.) — ver la migración directamente para el detalle campo por campo.

## 0009 — RLS del perfil completo y bloques
Políticas para las tablas de 0008.

## 0010–0012 — Ajustes de cálculo e informes
Recalculo por ítems editados, briefs de retroalimentación editables, vista
`v_360_detalle_evaluador` para el detalle del informe 360°.

## 0014 — Ser numérico
| Tabla / Vista | Qué guarda |
|---|---|
| `ser_aspectos` | Catálogo de ~30 aspectos evaluables de la Guía del Flow. |
| `ser_puntajes` | Puntaje 1-5 por aspecto y colaborador. |
| `ser_comentarios_colaborador` | Reflexión del propio colaborador sobre un aspecto (o el conjunto). |
| `v_ser_promedio` | Promedio de Ser por colaborador (última aplicación). |

## 0015–0018 — Correcciones y adjuntos
Fix de un bug en el trigger de alertas de vencimiento de formación; bucket
`guias-flow`; adjuntos del feed (documento/link/video-imagen) en
`nexa_feed_publicaciones`; RLS de participantes de simulacro.

## 0019 — Plan de inducción
| Tabla | Qué guarda |
|---|---|
| `induccion_items` | Plantilla de puntos de inducción — comunes (`cargo_id` null, desde Identidad Organizacional) o específicos por cargo (generados del perfil de cargo). |
| `colaborador_induccion_items` | Checklist real por colaborador: completado, quién y cuándo. |

## 0020 — Documentos del colaborador
Agrega a `empresas`: `nit`, `direccion`, `telefono`, `ciudad`,
`firmante_nombre`, `firmante_cargo` (datos del certificado laboral). Agrega
a `colaboradores`: `hoja_vida_url`, `contrato_url`, `salario`. Bucket privado
`documentos-colaborador` (hoja de vida visible a líder; contrato con salario
restringido a admin_th + el propio colaborador).

## 0021–0022 — Endurecimiento de RLS
Elimina una policy de `colaboradores` que dejaba a un líder actualizar
cualquier columna de su equipo (sin uso real en código); agrega la policy
que faltaba para que cada quien marque sus propias `notificaciones` como
leídas.

## 0023 — Mensajería directa
| Tabla | Qué guarda |
|---|---|
| `mensajes_directos` | Chat 1:1 entre cualquier par de usuarios de la misma empresa (distinto del feed broadcast). |

## 0024 — Notebook personal
| Tabla | Qué guarda |
|---|---|
| `notebook_notas` | Apuntes personales del colaborador en Nexa/Formación — estrictamente privados, ni admin_th los lee. |

## 0025 — Motor automático brecha → PDI → formación
| Tabla | Qué guarda |
|---|---|
| `dimension_cursos_recomendados` | Configuración (admin_th): qué curso de Nexa refuerza una brecha de Hacer o de Deber, por empresa. |
Agrega `planes_desarrollo.generado_automaticamente` y `nexa_rutas_formacion.pdi_origen_id`. Ver `docs/ARQUITECTURA.md`.

## 0026 — Procesos y sistemas de gestión (aporte V&E)
| Tabla | Qué guarda |
|---|---|
| `procesos_gestion` | Catálogo de procesos/flujogramas documentados por área. |
| `matriz_riesgos_controles` | Riesgos y controles por marco normativo (ISO 9001 / SARLAFT-SAGRILAFT / PTEE / interno). |
| `checklist_cumplimiento` | Checklist de verificación por marco normativo, con evidencia — insumo del paquete de evidencia de auditoría. |
Bucket privado `evidencia-procesos`.

## 0027–0028 — Rol auditor_externo
Nuevo valor del enum `rol_usuario`. Solo lectura: colaboradores (nombres/cargos), certificaciones SST, y las tablas de 0026 (que ya eran de lectura abierta a toda la empresa). Sin acceso a ningún otro módulo.

## 0029 — Panel meta-admin de cuentas y membresías
Agrega `perfiles_usuario.es_superadmin` y a `empresas`: `plan_membresia`, `precio_membresia_mensual`, `estado_facturacion`, `fecha_proximo_pago`. Ver `/meta-admin`.
