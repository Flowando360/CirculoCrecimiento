import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * Punto de integración funcional Círculo de Crecimiento → Nexa
 * (Propuesta de Alianza Flowando × Nexus, sección 8, Tabla 4).
 *
 * Se invoca (desde un trigger de base de datos vía pg_net, o desde un cron)
 * cuando una alerta de tipo sst_* o formacion_vencimiento pasa a estado
 * "notificada": asigna automáticamente la ruta de formación correspondiente
 * al cargo de la persona y deja el registro trazado en nexa_rutas_formacion.
 */
export async function POST(req: NextRequest) {
  const { alertaId } = await req.json();
  if (!alertaId) {
    return NextResponse.json({ error: 'alertaId requerido' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: alerta } = await supabase
    .from('alertas')
    .select('id, colaborador_id, tipo, titulo')
    .eq('id', alertaId)
    .maybeSingle();

  if (!alerta) {
    return NextResponse.json({ error: 'Alerta no encontrada' }, { status: 404 });
  }

  const tiposFormacion = ['sst_certificacion', 'sst_examen_medico', 'sst_induccion', 'sst_epp', 'formacion_vencimiento'];
  if (!tiposFormacion.includes(alerta.tipo)) {
    return NextResponse.json({ ok: true, accion: 'ninguna', motivo: 'tipo de alerta no dispara formación' });
  }

  const { data: colaborador } = await supabase
    .from('colaboradores')
    .select('id, cargo_id')
    .eq('id', alerta.colaborador_id)
    .maybeSingle();

  if (!colaborador) {
    return NextResponse.json({ ok: false, error: 'colaborador no encontrado' }, { status: 404 });
  }

  // Busca la ruta de formación asociada al cargo para la categoría relevante
  const categoria = alerta.tipo === 'sst_certificacion' ? 'alturas' : 'induccion_sst';
  const { data: rutaCargo } = await supabase
    .from('nexa_rutas_por_cargo')
    .select('curso_id')
    .eq('cargo_id', colaborador.cargo_id)
    .limit(1)
    .maybeSingle();

  if (!rutaCargo) {
    return NextResponse.json({ ok: true, accion: 'ninguna', motivo: 'sin ruta de curso configurada para este cargo' });
  }

  const { data: nuevaRuta, error } = await supabase
    .from('nexa_rutas_formacion')
    .insert({
      colaborador_id: colaborador.id,
      curso_id: rutaCargo.curso_id,
      alerta_origen_id: alerta.id,
      estado: 'asignado',
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  await supabase
    .from('alertas')
    .update({ nexa_ruta_formacion_disparada_id: nuevaRuta.id, estado: 'notificada' })
    .eq('id', alerta.id);

  return NextResponse.json({ ok: true, accion: 'curso_asignado', rutaFormacionId: nuevaRuta.id });
}
