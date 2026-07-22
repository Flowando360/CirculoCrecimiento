'use client';

import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

interface Mensaje {
  rol: 'usuario' | 'asistente';
  texto: string;
}

export default function AsistenteIaPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      rol: 'asistente',
      texto:
        'Hola, soy el asistente de Nexa. Puedo resolver dudas sobre protocolos de seguridad, uso de EPP, políticas internas y procedimientos de la compañía. ¿En qué te ayudo?',
    },
  ]);
  const [pregunta, setPregunta] = useState('');
  const [cargando, setCargando] = useState(false);

  async function enviar() {
    if (!pregunta.trim()) return;
    const nuevaPregunta = pregunta;
    setMensajes((prev) => [...prev, { rol: 'usuario', texto: nuevaPregunta }]);
    setPregunta('');
    setCargando(true);

    try {
      const res = await fetch('/api/nexa/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: nuevaPregunta }),
      });
      const data = await res.json();
      setMensajes((prev) => [...prev, { rol: 'asistente', texto: data.respuesta }]);
    } catch {
      setMensajes((prev) => [
        ...prev,
        { rol: 'asistente', texto: 'No pude conectarme al asistente. Intenta de nuevo en un momento.' },
      ]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="font-display text-2xl font-semibold text-secundario flex items-center gap-2">
          <Bot size={22} className="text-flow-500" /> Asistente IA
        </h1>
        <p className="text-sm text-marmol-500 mt-1">
          Entrenado con las políticas y procedimientos de Mármoles y Servicios.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto card p-4 space-y-3">
        {mensajes.map((m, i) => (
          <div key={i} className={m.rol === 'usuario' ? 'text-right' : 'text-left'}>
            <span
              className={
                m.rol === 'usuario'
                  ? 'inline-block rounded-2xl rounded-br-sm bg-flow-500 text-white px-4 py-2 text-sm max-w-[85%]'
                  : 'inline-block rounded-2xl rounded-bl-sm bg-marmol-100 text-marmol-800 px-4 py-2 text-sm max-w-[85%]'
              }
            >
              {m.texto}
            </span>
          </div>
        ))}
        {cargando && <p className="text-xs text-marmol-400">Escribiendo…</p>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          enviar();
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Escribe tu pregunta…"
          className="flex-1 rounded-lg border border-marmol-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-flow-400"
        />
        <button
          type="submit"
          disabled={cargando}
          className="rounded-lg bg-flow-500 hover:bg-flow-600 text-white px-3.5 py-2 transition disabled:opacity-60"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
