-- ============================================================================
-- demo_datos_ficticios.sql
-- Datos de demostración (10 personas ficticias) para navegar y probar el
-- flujo completo del aplicativo en PRODUCCIÓN, sin mezclarse con los 26
-- colaboradores reales de Mármoles y Servicios.
--
-- NO es una migración: no se ejecuta automáticamente con `supabase db
-- reset` ni `db push` (que solo corren lo que hay en supabase/migrations/).
-- Se corre manualmente, una sola vez, desde el SQL Editor de Supabase.
--
-- Identificación (para poder encontrar y borrar esto más adelante):
--   1. Correo:  demo.nombre.apellido@ejemplo.com
--   2. Cargo / área: sufijo "(Demo)" — separado de las áreas reales para
--      no alterar los promedios del Informe de brechas por área.
--   3. IDs: prefijo hexadecimal "d" en vez de los prefijos reales
--      (20000000- cargos, 30000000- colaboradores) — ej. d0000000-…
--
-- Aviso: aunque están separados por cargo/área, SÍ cuentan en los
-- totales agregados de toda la empresa (Inicio, v_indicadores_empresa),
-- porque son colaboradores 'activo' de verdad — por eso es importante
-- borrarlos cuando ya no se necesiten (script de limpieza al final).
-- ============================================================================

-- ── 1. Cargos ficticios (5) ─────────────────────────────────────────────────
insert into cargos (id, empresa_id, nombre, proceso_area, tiene_personal_a_cargo, formacion_nivel, experiencia_minima_meses) values
('d0000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','Líder Comercial (Demo)','Comercial (Demo)', true, 'universitario', 36),
('d0000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','Líder de Producción (Demo)','Producción (Demo)', true, 'tecnologo', 30),
('d0000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','Analista Comercial (Demo)','Comercial (Demo)', false, 'tecnico', 12),
('d0000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','Auxiliar de Producción (Demo)','Producción (Demo)', false, 'bachillerato', 6),
('d0000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000001','Asistente de Talento Humano (Demo)','Talento Humano (Demo)', false, 'tecnico', 12);

-- Exámenes médicos y EPP exigidos por los cargos demo, para poder probar
-- también esa sección del Informe de cumplimiento SST (hoy ningún cargo,
-- ni real ni demo, tenía esto cargado).
insert into cargo_examenes_medicos (cargo_id, momento, nombre_examen, orden) values
('d0000000-0000-0000-0000-000000000002','ingreso','Audiometría',1),
('d0000000-0000-0000-0000-000000000002','periodico','Optometría',2),
('d0000000-0000-0000-0000-000000000004','ingreso','Examen osteomuscular',1);

insert into cargo_epp (cargo_id, item, orden) values
('d0000000-0000-0000-0000-000000000002','Casco de seguridad',1),
('d0000000-0000-0000-0000-000000000002','Guantes de carnaza',2),
('d0000000-0000-0000-0000-000000000004','Botas de seguridad',1);

-- ── 2. Colaboradores ficticios (10) ─────────────────────────────────────────
-- 2 líderes (reportan a la Gerencia General real, Luz Adriana Rozo) + 8
-- personas repartidas en sus dos equipos.
insert into colaboradores (id, empresa_id, cargo_id, nombre_completo, email, fecha_ingreso, estado, lider_id) values
('d1000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000001','Mónica Andrea Torres Gil','demo.monica.torres@ejemplo.com','2021-03-01','activo','30000000-0000-0000-0000-000000000001'),
('d1000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000002','Andrés Felipe Salazar Ruiz','demo.andres.salazar@ejemplo.com','2020-07-15','activo','30000000-0000-0000-0000-000000000001'),
('d1000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000003','Valentina Ospina Marín','demo.valentina.ospina@ejemplo.com','2023-02-01','activo','d1000000-0000-0000-0000-000000000001'),
('d1000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000003','Camilo Buitrago Peña','demo.camilo.buitrago@ejemplo.com','2024-01-15','activo','d1000000-0000-0000-0000-000000000001'),
('d1000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000003','Sara Londoño Vélez','demo.sara.londono@ejemplo.com','2021-09-01','activo','d1000000-0000-0000-0000-000000000001'),
('d1000000-0000-0000-0000-000000000006','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000005','Natalia Vélez Correa','demo.natalia.velez@ejemplo.com','2022-05-01','activo','d1000000-0000-0000-0000-000000000001'),
('d1000000-0000-0000-0000-000000000007','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000004','Julián Restrepo Cano','demo.julian.restrepo@ejemplo.com','2020-05-01','activo','d1000000-0000-0000-0000-000000000002'),
('d1000000-0000-0000-0000-000000000008','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000004','Paola Cardona Duque','demo.paola.cardona@ejemplo.com','2022-11-01','activo','d1000000-0000-0000-0000-000000000002'),
('d1000000-0000-0000-0000-000000000009','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000004','Esteban Muñoz Zapata','demo.esteban.munoz@ejemplo.com','2019-02-01','activo','d1000000-0000-0000-0000-000000000002'),
('d1000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-000000000001','d0000000-0000-0000-0000-000000000004','Diego Henao Ríos','demo.diego.henao@ejemplo.com','2021-01-10','activo','d1000000-0000-0000-0000-000000000002');

-- ── 3. Ciclo de evaluación demo (separado del ciclo real "2026 - Semestre 1",
--       que sigue 'planeado' para cuando se abra de verdad) ────────────────
insert into ciclos_evaluacion (id, empresa_id, nombre, fecha_apertura, fecha_cierre_respuestas, fecha_publicacion, estado) values
('d8000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','Demo — Ciclo de prueba', '2026-05-01', '2026-05-21', '2026-05-25', 'publicado');

-- ── 4. Evaluaciones + resultados (Hacer/Deber), con niveles variados ────────
-- alto >=4.0 · medio 3.5-3.99 · bajo <3.5 (mismo umbral que ya usa el sistema)
insert into evaluaciones (id, ciclo_id, colaborador_evaluado_id, tenia_personal_a_cargo, porcentaje_avance, publicado) values
('d2000000-0000-0000-0000-000000000001','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000001', true, 100, true), -- Mónica
('d2000000-0000-0000-0000-000000000002','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000002', true, 100, true), -- Andrés
('d2000000-0000-0000-0000-000000000003','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000003', false, 100, true), -- Valentina
('d2000000-0000-0000-0000-000000000004','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000004', false, 100, true), -- Camilo
('d2000000-0000-0000-0000-000000000005','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000005', false, 100, true), -- Sara
('d2000000-0000-0000-0000-000000000006','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000006', false, 100, true), -- Natalia
('d2000000-0000-0000-0000-000000000007','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000007', false, 100, true), -- Julián
('d2000000-0000-0000-0000-000000000008','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000008', false, 100, true), -- Paola
('d2000000-0000-0000-0000-000000000009','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000009', false, 100, true), -- Esteban
('d2000000-0000-0000-0000-00000000000a','d8000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-00000000000a', false, 100, true); -- Diego

insert into resultados_evaluacion (evaluacion_id, indice_hacer, indice_deber, semaforo_hacer, semaforo_deber, brecha_hacer, brecha_deber) values
('d2000000-0000-0000-0000-000000000001', 4.30, 4.50, 'alto',  'alto',  0.20, 0.10),  -- Mónica    (alto)
('d2000000-0000-0000-0000-000000000002', 3.80, 3.60, 'medio', 'medio', -0.10, 0.05), -- Andrés    (medio-alto)
('d2000000-0000-0000-0000-000000000003', 4.50, 4.20, 'alto',  'alto',  0.30, 0.20),  -- Valentina (alto)
('d2000000-0000-0000-0000-000000000004', 3.00, 3.20, 'bajo',  'bajo',  -0.40, -0.30),-- Camilo    (bajo)
('d2000000-0000-0000-0000-000000000005', 3.70, 3.90, 'medio', 'medio', 0.10, 0.00),  -- Sara      (medio)
('d2000000-0000-0000-0000-000000000006', 4.10, 4.60, 'alto',  'alto',  0.15, 0.25),  -- Natalia   (alto)
('d2000000-0000-0000-0000-000000000007', 2.80, 3.10, 'bajo',  'bajo',  -0.50, -0.20),-- Julián    (bajo)
('d2000000-0000-0000-0000-000000000008', 3.60, 3.50, 'medio', 'medio', 0.05, -0.10), -- Paola     (medio)
('d2000000-0000-0000-0000-000000000009', 3.30, 3.40, 'bajo',  'bajo',  -0.20, -0.15),-- Esteban   (medio-bajo)
('d2000000-0000-0000-0000-00000000000a', 4.40, 4.00, 'alto',  'alto',  0.25, 0.10);  -- Diego     (alto)

-- ── 5. Verificaciones de Saber (4 por persona, 1 por bloque) ────────────────
insert into verificaciones_saber (colaborador_id, bloque, item_evaluado, estado) values
-- Mónica (alto ~90%)
('d1000000-0000-0000-0000-000000000001','formacion_academica','Título profesional según perfil del cargo','cumple'),
('d1000000-0000-0000-0000-000000000001','habilidades_funcionales_tecnicas','Manejo de CRM comercial','cumple'),
('d1000000-0000-0000-0000-000000000001','certificaciones','Inducción SST','cumple'),
('d1000000-0000-0000-0000-000000000001','experiencia','Experiencia mínima en el cargo','cumple_parcial'),
-- Andrés (medio-alto ~75%)
('d1000000-0000-0000-0000-000000000002','formacion_academica','Título tecnólogo según perfil del cargo','cumple'),
('d1000000-0000-0000-0000-000000000002','habilidades_funcionales_tecnicas','Manejo de indicadores de producción','cumple'),
('d1000000-0000-0000-0000-000000000002','certificaciones','Inducción SST','cumple_parcial'),
('d1000000-0000-0000-0000-000000000002','experiencia','Experiencia mínima en el cargo','cumple_parcial'),
-- Valentina (alto 100%)
('d1000000-0000-0000-0000-000000000003','formacion_academica','Título técnico según perfil del cargo','cumple'),
('d1000000-0000-0000-0000-000000000003','habilidades_funcionales_tecnicas','Manejo de herramientas ofimáticas','cumple'),
('d1000000-0000-0000-0000-000000000003','certificaciones','Inducción SST','cumple'),
('d1000000-0000-0000-0000-000000000003','experiencia','Experiencia mínima en el cargo','cumple'),
-- Camilo (bajo ~12%)
('d1000000-0000-0000-0000-000000000004','formacion_academica','Título técnico según perfil del cargo','no_cumple_pendiente'),
('d1000000-0000-0000-0000-000000000004','habilidades_funcionales_tecnicas','Manejo de herramientas ofimáticas','no_cumple_pendiente'),
('d1000000-0000-0000-0000-000000000004','certificaciones','Inducción SST','cumple_parcial'),
('d1000000-0000-0000-0000-000000000004','experiencia','Experiencia mínima en el cargo','no_cumple_pendiente'),
-- Sara (medio ~50%)
('d1000000-0000-0000-0000-000000000005','formacion_academica','Título técnico según perfil del cargo','cumple'),
('d1000000-0000-0000-0000-000000000005','habilidades_funcionales_tecnicas','Manejo de herramientas ofimáticas','cumple_parcial'),
('d1000000-0000-0000-0000-000000000005','certificaciones','Inducción SST','cumple_parcial'),
('d1000000-0000-0000-0000-000000000005','experiencia','Experiencia mínima en el cargo','no_cumple_pendiente'),
-- Natalia (alto ~87%)
('d1000000-0000-0000-0000-000000000006','formacion_academica','Título técnico según perfil del cargo','cumple'),
('d1000000-0000-0000-0000-000000000006','habilidades_funcionales_tecnicas','Manejo de procesos de bienestar laboral','cumple'),
('d1000000-0000-0000-0000-000000000006','certificaciones','Inducción SST','cumple'),
('d1000000-0000-0000-0000-000000000006','experiencia','Experiencia mínima en el cargo','cumple_parcial'),
-- Julián (bajo ~12%)
('d1000000-0000-0000-0000-000000000007','formacion_academica','Bachillerato completo','no_cumple_pendiente'),
('d1000000-0000-0000-0000-000000000007','habilidades_funcionales_tecnicas','Manejo de montacargas','no_cumple_pendiente'),
('d1000000-0000-0000-0000-000000000007','certificaciones','Trabajo en alturas','no_cumple_pendiente'),
('d1000000-0000-0000-0000-000000000007','experiencia','Experiencia mínima en el cargo','cumple_parcial'),
-- Paola (medio ~62%)
('d1000000-0000-0000-0000-000000000008','formacion_academica','Bachillerato completo','cumple_parcial'),
('d1000000-0000-0000-0000-000000000008','habilidades_funcionales_tecnicas','Manejo de herramientas de producción','cumple'),
('d1000000-0000-0000-0000-000000000008','certificaciones','Inducción SST','cumple_parcial'),
('d1000000-0000-0000-0000-000000000008','experiencia','Experiencia mínima en el cargo','cumple_parcial'),
-- Esteban (medio-bajo ~37%)
('d1000000-0000-0000-0000-000000000009','formacion_academica','Bachillerato completo','cumple_parcial'),
('d1000000-0000-0000-0000-000000000009','habilidades_funcionales_tecnicas','Manejo de herramientas de producción','no_cumple_pendiente'),
('d1000000-0000-0000-0000-000000000009','certificaciones','Inducción SST','cumple_parcial'),
('d1000000-0000-0000-0000-000000000009','experiencia','Experiencia mínima en el cargo','no_cumple_pendiente'),
-- Diego (alto ~87%)
('d1000000-0000-0000-0000-00000000000a','formacion_academica','Bachillerato completo','cumple'),
('d1000000-0000-0000-0000-00000000000a','habilidades_funcionales_tecnicas','Manejo de herramientas de producción','cumple'),
('d1000000-0000-0000-0000-00000000000a','certificaciones','Inducción SST','cumple_parcial'),
('d1000000-0000-0000-0000-00000000000a','experiencia','Experiencia mínima en el cargo','cumple');

-- ── 6. Guía del Flow (Ser) — 1 aplicación por persona + 12 de los 30
--       aspectos (3 por bloque), con puntajes que reflejan su nivel.
--       Queda parcial a propósito para mantener el script manejable; se
--       puede completar el resto de aspectos después desde la pantalla.
insert into guia_del_flow (id, colaborador_id, fecha_aplicacion) values
('d5000000-0000-0000-0000-000000000001','d1000000-0000-0000-0000-000000000001','2026-05-10'),
('d5000000-0000-0000-0000-000000000002','d1000000-0000-0000-0000-000000000002','2026-05-10'),
('d5000000-0000-0000-0000-000000000003','d1000000-0000-0000-0000-000000000003','2026-05-10'),
('d5000000-0000-0000-0000-000000000004','d1000000-0000-0000-0000-000000000004','2026-05-10'),
('d5000000-0000-0000-0000-000000000005','d1000000-0000-0000-0000-000000000005','2026-05-10'),
('d5000000-0000-0000-0000-000000000006','d1000000-0000-0000-0000-000000000006','2026-05-10'),
('d5000000-0000-0000-0000-000000000007','d1000000-0000-0000-0000-000000000007','2026-05-10'),
('d5000000-0000-0000-0000-000000000008','d1000000-0000-0000-0000-000000000008','2026-05-10'),
('d5000000-0000-0000-0000-000000000009','d1000000-0000-0000-0000-000000000009','2026-05-10'),
('d5000000-0000-0000-0000-00000000000a','d1000000-0000-0000-0000-00000000000a','2026-05-10');

insert into ser_puntajes (guia_del_flow_id, aspecto_id, puntaje)
select g.id, a.id, v.puntaje
from (values
  -- Mónica (guía 1) — alto, promedio ~4.3
  ('d5000000-0000-0000-0000-000000000001','Carácter',5),('d5000000-0000-0000-0000-000000000001','Comunicación',5),('d5000000-0000-0000-0000-000000000001','Liderazgo – Inspirar',5),
  ('d5000000-0000-0000-0000-000000000001','Estabilidad emocional',4),('d5000000-0000-0000-0000-000000000001','Felicidad',4),('d5000000-0000-0000-0000-000000000001','Tolerancia a la frustración',4),
  ('d5000000-0000-0000-0000-000000000001','Trabajo en equipo',4),('d5000000-0000-0000-0000-000000000001','Responsabilidad',5),('d5000000-0000-0000-0000-000000000001','Pertenencia',4),
  ('d5000000-0000-0000-0000-000000000001','Adaptación al cambio',4),('d5000000-0000-0000-0000-000000000001','Compromiso',4),('d5000000-0000-0000-0000-000000000001','Recursividad',4),
  -- Andrés (guía 2) — medio-alto, promedio ~3.8
  ('d5000000-0000-0000-0000-000000000002','Carácter',4),('d5000000-0000-0000-0000-000000000002','Comunicación',4),('d5000000-0000-0000-0000-000000000002','Liderazgo – Inspirar',4),
  ('d5000000-0000-0000-0000-000000000002','Estabilidad emocional',4),('d5000000-0000-0000-0000-000000000002','Felicidad',3),('d5000000-0000-0000-0000-000000000002','Tolerancia a la frustración',3),
  ('d5000000-0000-0000-0000-000000000002','Trabajo en equipo',4),('d5000000-0000-0000-0000-000000000002','Responsabilidad',4),('d5000000-0000-0000-0000-000000000002','Pertenencia',4),
  ('d5000000-0000-0000-0000-000000000002','Adaptación al cambio',3),('d5000000-0000-0000-0000-000000000002','Compromiso',4),('d5000000-0000-0000-0000-000000000002','Recursividad',4),
  -- Valentina (guía 3) — alto, promedio ~4.5
  ('d5000000-0000-0000-0000-000000000003','Carácter',5),('d5000000-0000-0000-0000-000000000003','Comunicación',5),('d5000000-0000-0000-0000-000000000003','Liderazgo – Inspirar',4),
  ('d5000000-0000-0000-0000-000000000003','Estabilidad emocional',4),('d5000000-0000-0000-0000-000000000003','Felicidad',5),('d5000000-0000-0000-0000-000000000003','Tolerancia a la frustración',4),
  ('d5000000-0000-0000-0000-000000000003','Trabajo en equipo',5),('d5000000-0000-0000-0000-000000000003','Responsabilidad',5),('d5000000-0000-0000-0000-000000000003','Pertenencia',4),
  ('d5000000-0000-0000-0000-000000000003','Adaptación al cambio',4),('d5000000-0000-0000-0000-000000000003','Compromiso',5),('d5000000-0000-0000-0000-000000000003','Recursividad',4),
  -- Camilo (guía 4) — bajo, promedio ~2.8
  ('d5000000-0000-0000-0000-000000000004','Carácter',3),('d5000000-0000-0000-0000-000000000004','Comunicación',2),('d5000000-0000-0000-0000-000000000004','Liderazgo – Inspirar',2),
  ('d5000000-0000-0000-0000-000000000004','Estabilidad emocional',3),('d5000000-0000-0000-0000-000000000004','Felicidad',3),('d5000000-0000-0000-0000-000000000004','Tolerancia a la frustración',2),
  ('d5000000-0000-0000-0000-000000000004','Trabajo en equipo',3),('d5000000-0000-0000-0000-000000000004','Responsabilidad',2),('d5000000-0000-0000-0000-000000000004','Pertenencia',3),
  ('d5000000-0000-0000-0000-000000000004','Adaptación al cambio',3),('d5000000-0000-0000-0000-000000000004','Compromiso',3),('d5000000-0000-0000-0000-000000000004','Recursividad',3),
  -- Sara (guía 5) — medio, promedio ~3.5
  ('d5000000-0000-0000-0000-000000000005','Carácter',4),('d5000000-0000-0000-0000-000000000005','Comunicación',3),('d5000000-0000-0000-0000-000000000005','Liderazgo – Inspirar',3),
  ('d5000000-0000-0000-0000-000000000005','Estabilidad emocional',3),('d5000000-0000-0000-0000-000000000005','Felicidad',4),('d5000000-0000-0000-0000-000000000005','Tolerancia a la frustración',3),
  ('d5000000-0000-0000-0000-000000000005','Trabajo en equipo',4),('d5000000-0000-0000-0000-000000000005','Responsabilidad',3),('d5000000-0000-0000-0000-000000000005','Pertenencia',4),
  ('d5000000-0000-0000-0000-000000000005','Adaptación al cambio',3),('d5000000-0000-0000-0000-000000000005','Compromiso',4),('d5000000-0000-0000-0000-000000000005','Recursividad',3),
  -- Natalia (guía 6) — alto, promedio ~4.0
  ('d5000000-0000-0000-0000-000000000006','Carácter',4),('d5000000-0000-0000-0000-000000000006','Comunicación',4),('d5000000-0000-0000-0000-000000000006','Liderazgo – Inspirar',4),
  ('d5000000-0000-0000-0000-000000000006','Estabilidad emocional',4),('d5000000-0000-0000-0000-000000000006','Felicidad',4),('d5000000-0000-0000-0000-000000000006','Tolerancia a la frustración',4),
  ('d5000000-0000-0000-0000-000000000006','Trabajo en equipo',4),('d5000000-0000-0000-0000-000000000006','Responsabilidad',5),('d5000000-0000-0000-0000-000000000006','Pertenencia',4),
  ('d5000000-0000-0000-0000-000000000006','Adaptación al cambio',4),('d5000000-0000-0000-0000-000000000006','Compromiso',4),('d5000000-0000-0000-0000-000000000006','Recursividad',3),
  -- Julián (guía 7) — bajo, promedio ~2.5
  ('d5000000-0000-0000-0000-000000000007','Carácter',3),('d5000000-0000-0000-0000-000000000007','Comunicación',2),('d5000000-0000-0000-0000-000000000007','Liderazgo – Inspirar',2),
  ('d5000000-0000-0000-0000-000000000007','Estabilidad emocional',2),('d5000000-0000-0000-0000-000000000007','Felicidad',3),('d5000000-0000-0000-0000-000000000007','Tolerancia a la frustración',2),
  ('d5000000-0000-0000-0000-000000000007','Trabajo en equipo',3),('d5000000-0000-0000-0000-000000000007','Responsabilidad',2),('d5000000-0000-0000-0000-000000000007','Pertenencia',2),
  ('d5000000-0000-0000-0000-000000000007','Adaptación al cambio',3),('d5000000-0000-0000-0000-000000000007','Compromiso',2),('d5000000-0000-0000-0000-000000000007','Recursividad',3),
  -- Paola (guía 8) — medio, promedio ~3.6
  ('d5000000-0000-0000-0000-000000000008','Carácter',4),('d5000000-0000-0000-0000-000000000008','Comunicación',3),('d5000000-0000-0000-0000-000000000008','Liderazgo – Inspirar',3),
  ('d5000000-0000-0000-0000-000000000008','Estabilidad emocional',4),('d5000000-0000-0000-0000-000000000008','Felicidad',4),('d5000000-0000-0000-0000-000000000008','Tolerancia a la frustración',3),
  ('d5000000-0000-0000-0000-000000000008','Trabajo en equipo',4),('d5000000-0000-0000-0000-000000000008','Responsabilidad',4),('d5000000-0000-0000-0000-000000000008','Pertenencia',3),
  ('d5000000-0000-0000-0000-000000000008','Adaptación al cambio',3),('d5000000-0000-0000-0000-000000000008','Compromiso',4),('d5000000-0000-0000-0000-000000000008','Recursividad',3),
  -- Esteban (guía 9) — medio-bajo, promedio ~3.2
  ('d5000000-0000-0000-0000-000000000009','Carácter',3),('d5000000-0000-0000-0000-000000000009','Comunicación',3),('d5000000-0000-0000-0000-000000000009','Liderazgo – Inspirar',2),
  ('d5000000-0000-0000-0000-000000000009','Estabilidad emocional',3),('d5000000-0000-0000-0000-000000000009','Felicidad',3),('d5000000-0000-0000-0000-000000000009','Tolerancia a la frustración',3),
  ('d5000000-0000-0000-0000-000000000009','Trabajo en equipo',4),('d5000000-0000-0000-0000-000000000009','Responsabilidad',3),('d5000000-0000-0000-0000-000000000009','Pertenencia',3),
  ('d5000000-0000-0000-0000-000000000009','Adaptación al cambio',3),('d5000000-0000-0000-0000-000000000009','Compromiso',4),('d5000000-0000-0000-0000-000000000009','Recursividad',3),
  -- Diego (guía 10) — alto, promedio ~4.3
  ('d5000000-0000-0000-0000-00000000000a','Carácter',4),('d5000000-0000-0000-0000-00000000000a','Comunicación',4),('d5000000-0000-0000-0000-00000000000a','Liderazgo – Inspirar',4),
  ('d5000000-0000-0000-0000-00000000000a','Estabilidad emocional',5),('d5000000-0000-0000-0000-00000000000a','Felicidad',5),('d5000000-0000-0000-0000-00000000000a','Tolerancia a la frustración',4),
  ('d5000000-0000-0000-0000-00000000000a','Trabajo en equipo',4),('d5000000-0000-0000-0000-00000000000a','Responsabilidad',4),('d5000000-0000-0000-0000-00000000000a','Pertenencia',4),
  ('d5000000-0000-0000-0000-00000000000a','Adaptación al cambio',5),('d5000000-0000-0000-0000-00000000000a','Compromiso',4),('d5000000-0000-0000-0000-00000000000a','Recursividad',4)
) as v(guia_del_flow_id, aspecto_nombre, puntaje)
join guia_del_flow g on g.id = v.guia_del_flow_id::uuid
join ser_aspectos a on a.nombre = v.aspecto_nombre and a.empresa_id = '00000000-0000-0000-0000-000000000001';

-- ── 7. Hoja de vida / certificaciones — vigentes, por vencer y vencidas ─────
insert into hoja_vida_formacion (colaborador_id, tipo, titulo, institucion, fecha_vencimiento, verificado) values
('d1000000-0000-0000-0000-000000000001','academica','Tecnólogo en Gestión Comercial','SENA', null, true),
('d1000000-0000-0000-0000-000000000001','certificacion','Diplomado en Liderazgo Comercial','Universidad EAFIT','2027-06-01', true),   -- vigente
('d1000000-0000-0000-0000-000000000002','certificacion','Certificación en Manejo de Montacargas','SENA','2026-03-01', true),        -- vencida
('d1000000-0000-0000-0000-000000000003','curso','Excel Avanzado','Cámara de Comercio', null, true),
('d1000000-0000-0000-0000-000000000004','certificacion','Inducción SST','ARL Sura','2026-04-15', false),                            -- vencida
('d1000000-0000-0000-0000-000000000005','certificacion','Servicio al Cliente','Comfama','2026-08-05', true),                        -- por vencer (≤30 días de hoy 2026-07-20)
('d1000000-0000-0000-0000-000000000007','certificacion','Trabajo en Alturas','SENA','2026-02-01', false),                           -- vencida
('d1000000-0000-0000-0000-00000000000a','certificacion','Manejo Defensivo','ARL Sura','2027-12-01', true);                          -- vigente

-- ── 8. Planes de Desarrollo Individual — en distintos estados ───────────────
insert into planes_desarrollo (colaborador_id, origen, brecha_detectada, accion, responsable_id, fecha_compromiso, estado, fecha_cumplimiento, notas) values
('d1000000-0000-0000-0000-000000000001','ser','Delegación insuficiente en tareas operativas','Curso corto de delegación efectiva','d1000000-0000-0000-0000-000000000001','2026-04-01','cumplido','2026-04-20','Completado a tiempo.'),
('d1000000-0000-0000-0000-000000000002','deber','Seguimiento irregular a compromisos del equipo','Implementar reunión semanal de seguimiento','d1000000-0000-0000-0000-000000000002','2026-03-15','cumplido','2026-04-01', null),
('d1000000-0000-0000-0000-000000000004','hacer','Bajo cumplimiento de metas comerciales','Acompañamiento semanal con el líder + plan de metas escalonadas','d1000000-0000-0000-0000-000000000004','2026-08-15','en_curso', null, 'Primera revisión programada.'),
('d1000000-0000-0000-0000-000000000004','saber','Formación técnica incompleta para el cargo','Inscripción a curso técnico comercial','d1000000-0000-0000-0000-000000000004','2026-06-01','pendiente', null, null),
('d1000000-0000-0000-0000-000000000005','hacer','Cumplimiento irregular de indicadores','Plan de seguimiento quincenal','d1000000-0000-0000-0000-000000000005','2026-05-01','cumplido','2026-05-28', null),
('d1000000-0000-0000-0000-000000000006','mixto','Alineación entre talento y rol','Explorar ruta de crecimiento interno en Talento Humano','d1000000-0000-0000-0000-000000000006','2026-09-01','en_curso', null, null),
('d1000000-0000-0000-0000-000000000007','deber','Bajo compromiso con horarios y entregas','Plan de mejora con seguimiento directo del líder','d1000000-0000-0000-0000-000000000007','2026-06-01','vencido', null, 'No se completó en la fecha comprometida — requiere escalar.'),
('d1000000-0000-0000-0000-000000000007','ser','Dificultad de adaptación al equipo','Sesiones de acompañamiento individual','d1000000-0000-0000-0000-000000000007','2026-08-01','en_curso', null, null),
('d1000000-0000-0000-0000-000000000008','saber','Certificación técnica pendiente','Inscripción a curso de manejo de herramientas','d1000000-0000-0000-0000-000000000008','2026-07-30','en_curso', null, null),
('d1000000-0000-0000-0000-000000000009','mixto','Brecha combinada de Hacer y Saber','Plan integral con el líder de producción','d1000000-0000-0000-0000-000000000009','2026-09-15','pendiente', null, null);

-- ── 9. Brief de retroalimentación (para 4 de las 10 evaluaciones) ───────────
insert into briefs_retroalimentacion (evaluacion_id, talento_central, resumen_hacer, resumen_deber, sugerencias_enfoque) values
('d2000000-0000-0000-0000-000000000001','Visión estratégica y capacidad de cierre comercial.','Índice alto y consistente en todas las fuentes.','Muy bien valorada por su equipo en trabajo colaborativo.','Reconocer el desempeño y explorar un reto de mayor alcance.'),
('d2000000-0000-0000-0000-000000000004','Buena disposición a aprender, a pesar de resultados bajos.','Resultados por debajo de lo esperado en Resultados y Puntualidad.','Cumplimiento parcial de compromisos.','Enfocar la conversación en el plan de acompañamiento ya definido, no en el número.'),
('d2000000-0000-0000-0000-000000000007','Buena actitud de servicio, dificultad de adaptación.','Bajo cumplimiento de tareas operativas.','Dificultad para integrarse al equipo.','Explorar causas de fondo antes de escalar el plan de mejora.'),
('d2000000-0000-0000-0000-000000000006','Fuerte orientación al bienestar del equipo.','Resultado alto y estable.','Excelente valoración en calidez humana.','Conversar sobre posibles rutas de crecimiento interno.');

-- ── 10. Acuerdo de crecimiento (para 4, con firmas en distinto estado) ──────
insert into acuerdos_crecimiento (evaluacion_id, compromisos_colaborador, compromisos_empresa, firmado_colaborador, firmado_lider, fecha_firma_colaborador, fecha_firma_lider) values
('d2000000-0000-0000-0000-000000000001','Mantener el ritmo de resultados y apoyar la formación de Camilo.','Evaluar una oportunidad de mayor responsabilidad en el semestre.', true, true, '2026-05-26', '2026-05-26'),
('d2000000-0000-0000-0000-000000000004','Asistir al curso técnico y aplicar el plan de metas escalonadas.','Brindar acompañamiento semanal y flexibilidad para el curso.', false, false, null, null),
('d2000000-0000-0000-0000-000000000005','Sostener el plan de seguimiento quincenal ya cumplido.','Reconocer el cumplimiento del plan anterior.', true, true, '2026-05-29', '2026-05-30'),
('d2000000-0000-0000-0000-000000000007','Participar activamente en las sesiones de acompañamiento.','Asignar un mentor dentro del equipo de producción.', true, false, '2026-06-05', null);

-- ============================================================================
-- LIMPIEZA (para más adelante — NO se ejecuta ahora, queda comentada)
-- Un solo DELETE en colaboradores hace cascada a TODO lo demás (evaluaciones,
-- resultados, verificaciones_saber, guia_del_flow + ser_puntajes/comentarios,
-- planes_desarrollo, hoja_vida_formacion + sus alertas, briefs, acuerdos)
-- porque todas esas tablas tienen "on delete cascade" hacia colaboradores.
-- ============================================================================
-- delete from colaboradores where email like 'demo.%@ejemplo.com';
-- delete from cargos where id::text like 'd0000000%';
-- delete from ciclos_evaluacion where id::text like 'd8000000%';
