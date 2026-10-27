-- ============================================================================
-- 0074_respuestas_unique_completo_para_upsert.sql
-- Corrige el upsert de respuestas de evaluación (guardarRespuesta en
-- src/app/(dashboard)/circulo-crecimiento/evaluar/actions.ts).
--
-- 0008 creó el índice único uq_respuesta_tarea_item como ÍNDICE PARCIAL
-- ("where evaluacion_item_id is not null"). Pero la app hace:
--   upsert(..., { onConflict: 'evaluacion_tarea_id,evaluacion_item_id' })
-- y PostgreSQL sólo infiere un índice parcial si el ON CONFLICT repite
-- también el predicado; sin él, el upsert falla con
-- "there is no unique or exclusion constraint matching the ON CONFLICT
-- specification". Resultado: guardar una calificación podía fallar.
--
-- Solución: restricción única COMPLETA sobre el mismo par de columnas.
-- evaluacion_item_id siempre viene informado en la app, y en Postgres los
-- NULL no se consideran iguales en un unique, así que no cambia nada para
-- filas legacy con evaluacion_item_id nulo.
--
-- Idempotente: si la restricción ya existe, no hace nada.
-- ============================================================================

drop index if exists uq_respuesta_tarea_item;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'uq_respuesta_tarea_item'
      and conrelid = 'respuestas_evaluacion'::regclass
  ) then
    alter table respuestas_evaluacion
      add constraint uq_respuesta_tarea_item unique (evaluacion_tarea_id, evaluacion_item_id);
  end if;
end $$;
