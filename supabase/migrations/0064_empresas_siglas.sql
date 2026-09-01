-- ============================================================================
-- 0064_empresas_siglas.sql
--
-- Siglas cortas de la empresa (ej. "MyS" para Mármoles y Servicios) --
-- las pide Guía del Flow (proyecto hermano, mismo Supabase) para nombrar los
-- PDF de la descarga masiva desde su /panel: "GF_nombre_SiglasEmpresa.pdf".
-- Editable desde Administración > Configuración igual que nit/dirección/etc.
-- ============================================================================

alter table empresas add column if not exists siglas text;

comment on column empresas.siglas is 'Siglas cortas de la empresa (ej. "MyS"). Se usan en Guía del Flow para nombrar los PDF de la descarga masiva -- si está vacío, esa pantalla usa "PS".';

update empresas set siglas = 'MyS' where nombre = 'Mármoles y Servicios' and siglas is null;
