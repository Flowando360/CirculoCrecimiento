import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';

/**
 * Asistente de IA de Nexa: responde dudas normativas y de procedimiento
 * (SST, políticas internas) entrenado con el contexto de la empresa.
 *
 * Requiere ANTHROPIC_API_KEY configurada. Si no está presente, responde con
 * un mensaje de configuración pendiente en lugar de fallar silenciosamente.
 */
export async function POST(req: NextRequest) {
  const perfil = await getPerfilActual();
  if (!perfil) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const { pregunta } = await req.json();
  if (!pregunta || typeof pregunta !== 'string') {
    return NextResponse.json({ error: 'Pregunta inválida' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  let respuesta: string;

  if (!apiKey) {
    respuesta =
      'El asistente de IA aún no está configurado. Pide a Talento Humano que agregue ANTHROPIC_API_KEY en las variables de entorno del proyecto.';
  } else {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          system:
            'Eres el asistente interno de Nexa para Mármoles y Servicios. Respondes dudas sobre SST, políticas internas y procedimientos de forma breve, clara y práctica. Si no tienes información específica de la empresa, dilo y sugiere contactar a Talento Humano o al líder SST.',
          messages: [{ role: 'user', content: pregunta }],
        }),
      });
      const data = await r.json();
      respuesta = data?.content?.[0]?.text ?? 'No obtuve una respuesta, intenta de nuevo.';
    } catch {
      respuesta = 'Hubo un error al consultar el asistente. Intenta de nuevo en un momento.';
    }
  }

  // Registrar la conversación para trazabilidad (secc. Tecnología del documento)
  const supabase = createClient();
  await supabase.from('nexa_asistente_conversaciones').insert({
    usuario_id: perfil.usuario_id,
    pregunta,
    respuesta,
  });

  return NextResponse.json({ respuesta });
}
