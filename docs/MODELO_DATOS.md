# Modelo de datos — diccionario

Esquema completo en `supabase/migrations/`, en 7 archivos ordenados. Resumen
por dominio:

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
