import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * Job programado (Vercel Cron o llamado manualmente) que:
 *  1. Marca como "vencida" cualquier alerta cuya fecha_objetivo ya pasó y
 *     sigue en estado pendiente/notificada sin resolver.
 *  2. Encola notificaciones (email) para las alertas dentro de su ventana
 *     de dias_anticipacion que aún no se han notificado.
 *
 * Configurar en vercel.json:
 *   { "crons": [{ "path": "/api/alertas/check", "schedule": "0 8 * * *" }] }
 *
 * Protegido con CRON_SECRET para que no cualquiera pueda invocarlo.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const hoy = new Date().toISOString().slice(0, 10);

  // 1. Vencer alertas pasadas
  const { data: vencidas } = await supabase
    .from('alertas')
    .update({ estado: 'vencida' })
    .lt('fecha_objetivo', hoy)
    .in('estado', ['pendiente', 'notificada'])
    .select('id');

  // 2. Detectar alertas dentro de su ventana de anticipación, aún no notificadas
  const { data: proximas } = await supabase
    .from('v_alertas_proximas')
    .select('id, colaborador_id, titulo, tipo, fecha_objetivo')
    .eq('estado', 'pendiente');

  let notificacionesCreadas = 0;
  for (const alerta of proximas ?? []) {
    const { data: colaborador } = await supabase
      .from('colaboradores')
      .select('usuario_id')
      .eq('id', alerta.colaborador_id)
      .maybeSingle();

    if (colaborador?.usuario_id) {
      await supabase.from('notificaciones').insert({
        destinatario_usuario_id: colaborador.usuario_id,
        alerta_id: alerta.id,
        canal: 'email',
        asunto: `Recordatorio: ${alerta.titulo}`,
        cuerpo: `Tienes una fecha próxima (${alerta.fecha_objetivo}): ${alerta.titulo}.`,
      });
      notificacionesCreadas++;
    }

    await supabase.from('alertas').update({ estado: 'notificada' }).eq('id', alerta.id);
  }

  return NextResponse.json({
    ok: true,
    alertas_vencidas: vencidas?.length ?? 0,
    notificaciones_creadas: notificacionesCreadas,
  });
}
