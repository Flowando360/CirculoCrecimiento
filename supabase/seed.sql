-- ============================================================================
-- seed.sql — Datos de arranque para la empresa piloto: Mármoles y Servicios
-- Carga: empresa, escala de 5 niveles, 9 competencias con criterios,
-- cargo de referencia (Auxiliar de Inventarios) y el organigrama vigente.
-- Ejecutar con: supabase db reset  (aplica migraciones + este seed)
-- ============================================================================

-- ── Empresa piloto ──────────────────────────────────────────────────────────
insert into empresas (id, nombre, slug, color_marca, fecha_fundacion)
values ('00000000-0000-0000-0000-000000000001', 'Mármoles y Servicios', 'marmoles-servicios', '#7c3aed', '1988-01-01');

-- ── Escala de 5 niveles (idéntica al Círculo de Crecimiento original) ──────
insert into escala_niveles (empresa_id, nivel, etiqueta, descripcion_general) values
('00000000-0000-0000-0000-000000000001', 5, 'Referente', 'Supera constantemente las expectativas. Es ejemplo para otros, genera impacto positivo y contribuye activamente al crecimiento de la organización.'),
('00000000-0000-0000-0000-000000000001', 4, 'Destacado', 'Cumple de manera consistente los objetivos y comportamientos esperados. Aporta valor adicional en algunas situaciones.'),
('00000000-0000-0000-0000-000000000001', 3, 'Esperado', 'Cumple adecuadamente con las responsabilidades y comportamientos requeridos para su cargo.'),
('00000000-0000-0000-0000-000000000001', 2, 'En Desarrollo', 'Presenta oportunidades importantes de mejora. Requiere acompañamiento y seguimiento frecuente.'),
('00000000-0000-0000-0000-000000000001', 1, 'Crítico', 'No cumple con las expectativas del cargo o presenta comportamientos que afectan los resultados, el equipo o la cultura.');

-- ── Las 9 competencias (5 Hacer + 4 Deber) ─────────────────────────────────
insert into competencias (id, empresa_id, dimension, nombre, descripcion_que_evalua, solo_con_personal_a_cargo, peso_relativo, orden) values
('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','hacer','Resultados','Cumplimiento de indicadores (KPI), metas, objetivos del período y contribución al Mapa Estratégico.', false, 2.0, 1),
('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','hacer','Puntualidad','Cumplimiento oportuno de tareas, compromisos, entregables y reuniones.', false, 1.0, 2),
('10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','hacer','Estrategia','Comprensión y alineación con el direccionamiento estratégico, la cultura y los valores.', false, 1.0, 3),
('10000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','hacer','Autogestión','Organización personal, manejo del tiempo, autonomía y disciplina.', false, 1.0, 4),
('10000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000001','hacer','Liderazgo','Capacidad para orientar, desarrollar y movilizar al equipo. Solo aplica a cargos con personal a cargo.', true, 1.0, 5),
('10000000-0000-0000-0000-000000000006','00000000-0000-0000-0000-000000000001','deber','Trabajo en Equipo','Colaboración, cooperación, comunicación y construcción de relaciones positivas.', false, 1.0, 6),
('10000000-0000-0000-0000-000000000007','00000000-0000-0000-0000-000000000001','deber','Compromiso','Responsabilidad, cumplimiento de compromisos y sentido de pertenencia.', false, 1.0, 7),
('10000000-0000-0000-0000-000000000008','00000000-0000-0000-0000-000000000001','deber','Calidez Humana','Empatía, respeto, trato cordial, integridad y escucha activa.', false, 1.0, 8),
('10000000-0000-0000-0000-000000000009','00000000-0000-0000-0000-000000000001','deber','Actitud de Servicio','Disposición para ayudar, orientación al cliente y búsqueda de soluciones.', false, 1.0, 9);

-- Criterios por nivel para cada competencia (guía de valoración completa)
insert into competencia_criterios (competencia_id, nivel, criterio) values
-- Resultados
('10000000-0000-0000-0000-000000000001',5,'Supera las metas establecidas, genera mejoras adicionales y aporta significativamente al logro estratégico del proceso.'),
('10000000-0000-0000-0000-000000000001',4,'Cumple la mayoría de metas e indicadores establecidos.'),
('10000000-0000-0000-0000-000000000001',3,'Cumple los objetivos esperados para el período.'),
('10000000-0000-0000-0000-000000000001',2,'Cumple parcialmente las metas o presenta desviaciones frecuentes.'),
('10000000-0000-0000-0000-000000000001',1,'No cumple los objetivos ni los compromisos establecidos.'),
-- Puntualidad
('10000000-0000-0000-0000-000000000002',5,'Entrega siempre antes o dentro del plazo acordado.'),
('10000000-0000-0000-0000-000000000002',4,'Presenta retrasos ocasionales sin afectar el resultado.'),
('10000000-0000-0000-0000-000000000002',3,'Cumple normalmente los tiempos establecidos.'),
('10000000-0000-0000-0000-000000000002',2,'Requiere recordatorios o seguimiento frecuente.'),
('10000000-0000-0000-0000-000000000002',1,'Incumple reiteradamente los plazos acordados.'),
-- Estrategia
('10000000-0000-0000-0000-000000000003',5,'Actúa como promotor de la estrategia y la cultura organizacional.'),
('10000000-0000-0000-0000-000000000003',4,'Comprende y aplica adecuadamente la estrategia en su trabajo.'),
('10000000-0000-0000-0000-000000000003',3,'Conoce los objetivos y los incorpora parcialmente en sus actividades.'),
('10000000-0000-0000-0000-000000000003',2,'Presenta dificultades para alinearse a las prioridades organizacionales.'),
('10000000-0000-0000-0000-000000000003',1,'Desconoce o actúa en contravía de la estrategia y la cultura.'),
-- Autogestión
('10000000-0000-0000-0000-000000000004',5,'Trabaja con alta autonomía y excelente organización.'),
('10000000-0000-0000-0000-000000000004',4,'Requiere poca supervisión para cumplir.'),
('10000000-0000-0000-0000-000000000004',3,'Cumple adecuadamente con seguimiento ocasional.'),
('10000000-0000-0000-0000-000000000004',2,'Necesita supervisión frecuente.'),
('10000000-0000-0000-0000-000000000004',1,'Presenta dificultades constantes para organizar y ejecutar su trabajo.'),
-- Liderazgo
('10000000-0000-0000-0000-000000000005',5,'Desarrolla personas, logra resultados sobresalientes, fortalece la cultura y es referente para otros líderes.'),
('10000000-0000-0000-0000-000000000005',4,'Gestiona adecuadamente al equipo, realiza seguimiento y promueve el desarrollo de las personas.'),
('10000000-0000-0000-0000-000000000005',3,'Cumple con las responsabilidades básicas de liderazgo.'),
('10000000-0000-0000-0000-000000000005',2,'Presenta debilidades en la gestión del equipo o el desarrollo de personas.'),
('10000000-0000-0000-0000-000000000005',1,'No logra orientar, desarrollar o movilizar efectivamente a su equipo.'),
-- Trabajo en Equipo
('10000000-0000-0000-0000-000000000006',5,'Promueve activamente el trabajo colaborativo y fortalece al equipo.'),
('10000000-0000-0000-0000-000000000006',4,'Colabora frecuentemente y mantiene relaciones positivas.'),
('10000000-0000-0000-0000-000000000006',3,'Trabaja adecuadamente con los demás.'),
('10000000-0000-0000-0000-000000000006',2,'Presenta dificultades ocasionales para colaborar.'),
('10000000-0000-0000-0000-000000000006',1,'Genera conflictos o afecta negativamente el trabajo conjunto.'),
-- Compromiso
('10000000-0000-0000-0000-000000000007',5,'Actúa como dueño de los procesos y busca constantemente mejorar.'),
('10000000-0000-0000-0000-000000000007',4,'Asume responsabilidades y cumple sus compromisos.'),
('10000000-0000-0000-0000-000000000007',3,'Cumple adecuadamente con lo asignado.'),
('10000000-0000-0000-0000-000000000007',2,'Requiere seguimiento frecuente para cumplir.'),
('10000000-0000-0000-0000-000000000007',1,'Presenta incumplimientos reiterados o falta de interés.'),
-- Calidez Humana
('10000000-0000-0000-0000-000000000008',5,'Genera confianza, respeto y bienestar en quienes lo rodean.'),
('10000000-0000-0000-0000-000000000008',4,'Mantiene relaciones positivas y respetuosas.'),
('10000000-0000-0000-0000-000000000008',3,'Tiene un trato adecuado y cordial.'),
('10000000-0000-0000-0000-000000000008',2,'Presenta dificultades ocasionales en las relaciones interpersonales.'),
('10000000-0000-0000-0000-000000000008',1,'Presenta comportamientos irrespetuosos o inadecuados.'),
-- Actitud de Servicio
('10000000-0000-0000-0000-000000000009',5,'Anticipa necesidades y supera expectativas.'),
('10000000-0000-0000-0000-000000000009',4,'Atiende oportunamente y con buena disposición.'),
('10000000-0000-0000-0000-000000000009',3,'Cumple adecuadamente los requerimientos del servicio.'),
('10000000-0000-0000-0000-000000000009',2,'Presenta dificultades ocasionales en la atención o respuesta.'),
('10000000-0000-0000-0000-000000000009',1,'Recibe quejas recurrentes o muestra actitud negativa.');

-- ── Cargos (según el organigrama vigente de M&S) ───────────────────────────
insert into cargos (id, empresa_id, nombre, proceso_area, tiene_personal_a_cargo, formacion_nivel) values
('20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','Gerencia General','Gerencia', true, 'universitario'),
('20000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','Directora de Desarrollo Organizacional y Talento Humano','Talento Humano', true, 'universitario'),
('20000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','Coordinadora Administrativa','Administrativa', true, 'tecnologo'),
('20000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','Coordinadora de Producción','Producción', true, 'tecnologo'),
('20000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000001','Coordinador Logístico e Inventarios','Logística e Inventarios', true, 'tecnologo'),
('20000000-0000-0000-0000-000000000006','00000000-0000-0000-0000-000000000001','Líder de Operaciones Internacionales','Operaciones Internacionales', false, 'universitario'),
('20000000-0000-0000-0000-000000000007','00000000-0000-0000-0000-000000000001','Coordinadora Comercial','Comercial', true, 'tecnologo'),
('20000000-0000-0000-0000-000000000008','00000000-0000-0000-0000-000000000001','Auxiliar de Talento Humano y SST','Talento Humano', false, 'tecnico'),
('20000000-0000-0000-0000-000000000009','00000000-0000-0000-0000-000000000001','Auxiliar de Servicios Generales','Administrativa', false, 'bachillerato'),
('20000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-000000000001','Asistente de Producción y Gestión de Contratistas','Producción', false, 'tecnico'),
('20000000-0000-0000-0000-00000000000b','00000000-0000-0000-0000-000000000001','Auxiliar de Inventarios','Logística e Inventarios', false, 'tecnico'),
('20000000-0000-0000-0000-00000000000c','00000000-0000-0000-0000-000000000001','Auxiliar Logístico e Inventarios','Logística e Inventarios', false, 'tecnico'),
('20000000-0000-0000-0000-00000000000d','00000000-0000-0000-0000-000000000001','Operario Integral de Logística e Inventarios','Logística e Inventarios', false, 'bachillerato'),
('20000000-0000-0000-0000-00000000000e','00000000-0000-0000-0000-000000000001','Operario de Montacargas y Otros Oficios de Producción','Producción', false, 'bachillerato'),
('20000000-0000-0000-0000-00000000000f','00000000-0000-0000-0000-000000000001','Auxiliar Contable','Comercial', false, 'tecnico'),
('20000000-0000-0000-0000-000000000010','00000000-0000-0000-0000-000000000001','Asesora de Obras y Servicio al Cliente','Comercial', false, 'tecnologo'),
('20000000-0000-0000-0000-000000000011','00000000-0000-0000-0000-000000000001','Asistente Comercial','Comercial', false, 'tecnico'),
('20000000-0000-0000-0000-000000000012','00000000-0000-0000-0000-000000000001','Staff Comercial','Comercial', false, 'bachillerato'),
('20000000-0000-0000-0000-000000000013','00000000-0000-0000-0000-000000000001','Asesor Comercial','Comercial', false, 'tecnico'),
('20000000-0000-0000-0000-000000000014','00000000-0000-0000-0000-000000000001','Cortador / Oficios de Producción','Producción', false, 'bachillerato'),
('20000000-0000-0000-0000-000000000015','00000000-0000-0000-0000-000000000001','Operario de Producción','Producción', false, 'bachillerato'),
('20000000-0000-0000-0000-000000000016','00000000-0000-0000-0000-000000000001','Transportador','Producción', false, 'bachillerato'),
('20000000-0000-0000-0000-000000000017','00000000-0000-0000-0000-000000000001','Contratista Instalador','Producción', false, 'empirico');

-- ── Perfil completo de Auxiliar de Inventarios (usado como cargo de referencia) ──
update cargos set
  objetivo_cargo = 'Garantizar el control, registro y disponibilidad exacta del inventario de mármoles, insumos y materiales, apoyando la operación logística de la compañía.',
  experiencia_minima_meses = 12,
  formacion_minima_induccion = 'Inducción general M&S + inducción SST + manejo de sistema de inventarios',
  destreza_fisica = true, destreza_visual = true, destreza_manual = true, destreza_coordinacion_motora = true
where id = '20000000-0000-0000-0000-00000000000b';

insert into cargo_habilidades (cargo_id, tipo, nombre, nivel_esperado, orden) values
('20000000-0000-0000-0000-00000000000b','funcional','Negociación','medio',1),
('20000000-0000-0000-0000-00000000000b','funcional','Supervisión','bajo',2),
('20000000-0000-0000-0000-00000000000b','funcional','Autonomía','alto',3),
('20000000-0000-0000-0000-00000000000b','funcional','Proactividad','alto',4),
('20000000-0000-0000-0000-00000000000b','funcional','Liderazgo','bajo',5),
('20000000-0000-0000-0000-00000000000b','funcional','Organización','alto',6),
('20000000-0000-0000-0000-00000000000b','funcional','Solución de problemas','alto',7),
('20000000-0000-0000-0000-00000000000b','funcional','Tolerancia a la presión','medio',8),
('20000000-0000-0000-0000-00000000000b','funcional','Trabajo en equipo','alto',9),
('20000000-0000-0000-0000-00000000000b','tecnica','Interpretación de datos de proceso','alto',1),
('20000000-0000-0000-0000-00000000000b','tecnica','Transmisión de conocimiento','medio',2),
('20000000-0000-0000-0000-00000000000b','tecnica','Manejo de herramientas ofimáticas','medio',3),
('20000000-0000-0000-0000-00000000000b','tecnica','Planificación y análisis de rendimiento','medio',4);

-- ── Organigrama vigente: colaboradores con lider_id (según Organigrama_MS.jpeg) ──
-- Nivel 0: Gerencia General
insert into colaboradores (id, empresa_id, cargo_id, nombre_completo, fecha_ingreso, estado, lider_id) values
('30000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','Luz Adriana Rozo','2015-01-01','activo', null);

-- Nivel 1: seis líneas que reportan a Gerencia General
insert into colaboradores (id, empresa_id, cargo_id, nombre_completo, fecha_ingreso, estado, lider_id) values
('30000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000002','Alexandra Rozo','2018-01-01','activo','30000000-0000-0000-0000-000000000001'),
('30000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000003','Zoraida Valencia','2016-01-01','activo','30000000-0000-0000-0000-000000000001'),
('30000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000004','Diana Zapata','2017-01-01','activo','30000000-0000-0000-0000-000000000001'),
('30000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000005','Fredy Rendón','2019-01-01','activo','30000000-0000-0000-0000-000000000001'),
('30000000-0000-0000-0000-000000000006','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000006','Luz Mery Arroyave','2019-06-01','activo','30000000-0000-0000-0000-000000000001'),
('30000000-0000-0000-0000-000000000007','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000007','Tatiana Serna','2026-01-01','activo','30000000-0000-0000-0000-000000000001');

-- Nivel 2: equipos de cada línea
insert into colaboradores (id, empresa_id, cargo_id, nombre_completo, fecha_ingreso, estado, lider_id) values
-- Talento Humano
('30000000-0000-0000-0000-000000000008','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000008','Vanessa Monsalve','2020-01-01','activo','30000000-0000-0000-0000-000000000002'),
-- Administrativa
('30000000-0000-0000-0000-000000000009','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000009','Elizabeth Osorio','2018-01-01','activo','30000000-0000-0000-0000-000000000003'),
('30000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000009','Uris Padilla','2019-01-01','activo','30000000-0000-0000-0000-000000000003'),
-- Producción
('30000000-0000-0000-0000-00000000000b','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000a','Eveli Córdoba','2018-01-01','activo','30000000-0000-0000-0000-000000000004'),
('30000000-0000-0000-0000-00000000000c','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000014','Jose Ketterer','2017-01-01','activo','30000000-0000-0000-0000-000000000004'),
('30000000-0000-0000-0000-00000000000d','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000015','Roberto Gaviria','2016-01-01','activo','30000000-0000-0000-0000-000000000004'),
('30000000-0000-0000-0000-00000000000e','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000e','Leonardo Zapata','2018-01-01','activo','30000000-0000-0000-0000-000000000004'),
('30000000-0000-0000-0000-00000000000f','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000016','Ignacio Giraldo','2017-01-01','activo','30000000-0000-0000-0000-000000000004'),
-- Logística e Inventarios (equipo de Fredy Rendón — el cargo de referencia vive aquí)
('30000000-0000-0000-0000-000000000010','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000b','Daniel Flórez','2021-03-01','activo','30000000-0000-0000-0000-000000000005'),
('30000000-0000-0000-0000-000000000011','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000b','Fray Mercado','2020-06-01','activo','30000000-0000-0000-0000-000000000005'),
('30000000-0000-0000-0000-000000000012','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000c','Ian Narváez','2021-01-01','activo','30000000-0000-0000-0000-000000000005'),
('30000000-0000-0000-0000-000000000013','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000d','Leonel Uribe','2020-01-01','activo','30000000-0000-0000-0000-000000000005'),
-- Comercial
('30000000-0000-0000-0000-000000000014','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-00000000000f','Camila Carmona','2019-01-01','activo','30000000-0000-0000-0000-000000000007'),
('30000000-0000-0000-0000-000000000015','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000010','Luz Ennith Álvarez','2018-01-01','activo','30000000-0000-0000-0000-000000000007'),
('30000000-0000-0000-0000-000000000016','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000011','Adriana Quiceno','2019-01-01','activo','30000000-0000-0000-0000-000000000007'),
('30000000-0000-0000-0000-000000000017','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000012','Laura Sánchez','2020-01-01','activo','30000000-0000-0000-0000-000000000007'),
('30000000-0000-0000-0000-000000000018','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000013','Elisa Serpa','2019-01-01','activo','30000000-0000-0000-0000-000000000007');

-- ── Cargos externos (fuera del Círculo de Crecimiento 360° interno, secc. 9.3) ──
insert into cargos (id, empresa_id, nombre, proceso_area, tiene_personal_a_cargo) values
('20000000-0000-0000-0000-000000000018','00000000-0000-0000-0000-000000000001','Revisor Fiscal','Externo', false),
('20000000-0000-0000-0000-000000000019','00000000-0000-0000-0000-000000000001','Asesor Externo','Externo', false);

insert into colaboradores (id, empresa_id, cargo_id, nombre_completo, fecha_ingreso, estado, lider_id, es_externo) values
('30000000-0000-0000-0000-000000000019','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000018','Sergio Giraldo','2015-01-01','activo', null, true),
('30000000-0000-0000-0000-00000000001a','00000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000019','Adriana Aguilar','2015-01-01','activo', null, true);

-- ── Ciclo de evaluación inicial (2026 - Semestre 1) ────────────────────────
insert into ciclos_evaluacion (id, empresa_id, nombre, fecha_apertura, fecha_cierre_respuestas, estado)
values ('40000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','2026 - Semestre 1', current_date, current_date + 21, 'planeado');

-- ── Cursos base de Nexa aplicados a SST (Tabla 3 de la propuesta de alianza) ──
insert into nexa_cursos (empresa_id, titulo, categoria, duracion_minutos, puntos_otorgados) values
('00000000-0000-0000-0000-000000000001','Inducción SST general', 'induccion_sst', 45, 50),
('00000000-0000-0000-0000-000000000001','Manejo seguro de alturas', 'alturas', 60, 80),
('00000000-0000-0000-0000-000000000001','Manejo de cargas y montacargas', 'manejo_cargas', 40, 60),
('00000000-0000-0000-0000-000000000001','Uso correcto de EPP', 'epp', 20, 30),
('00000000-0000-0000-0000-000000000001','Protocolos de emergencia y evacuación', 'protocolos_emergencia', 30, 40);

-- Nota: usuarios de auth.users y perfiles_usuario se crean vía Supabase Auth
-- (signup / invite), no por seed directo, para respetar el flujo de auth real.
