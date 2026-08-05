'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  crearGuiaDelFlow,
  generarInformesSer,
  guardarComentarioColaborador,
} from '@/app/(dashboard)/circulo-crecimiento/colaboradores/[id]/guia-flow/actions';
import { Plus, Check, Sparkles } from 'lucide-react';

export function BotonCrearGuiaFlow({ colaboradorId }: { colaboradorId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function crear() {
    startTransition(async () => {
      const res = await crearGuiaDelFlow({ colaboradorId });
      if (res.ok) router.refresh();
    });
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={crear}
      className="inline-flex items-center gap-1.5 rounded-lg bg-flow-500 hover:bg-flow-600 disabled:opacity-50 text-white text-sm font-medium px-3.5 py-2 transition"
    >
      <Plus size={16} /> {pending ? 'Creando…' : 'Crear Guía del Flow'}
    </button>
  );
}

export function BotonGenerarInformes({ colaboradorId, guiaDelFlowId, yaTieneInforme }: { colaboradorId: string; guiaDelFlowId: string; yaTieneInforme: boolean }) {
  const [pending, startTransition] = useTransition();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const router = useRouter();

  function generar() {
    setMensaje(null);
    startTransition(async () => {
      const res = await generarInformesSer({ colaboradorId, guiaDelFlowId });
      if (res.ok) {
        router.refresh();
      } else {
        setMensaje(res.error);
      }
    });
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        disabled={pending}
        onClick={generar}
        className="inline-flex items-center gap-1.5 rounded-lg bg-flow-500 hover:bg-flow-600 disabled:opacity-50 text-white text-sm font-medium px-3.5 py-2 transition"
      >
        <Sparkles size={16} /> {pending ? 'Generando…' : yaTieneInforme ? 'Regenerar informes' : 'Generar informes con IA'}
      </button>
      {mensaje && <span className="text-xs text-marmol-500">{mensaje}</span>}
    </div>
  );
}

export function ComentarioGeneralSer({
  colaboradorId,
  guiaDelFlowId,
  comentarioInicial,
  puedeComentar,
}: {
  colaboradorId: string;
  guiaDelFlowId: string;
  comentarioInicial: string | null;
  puedeComentar: boolean;
}) {
  const [, startTransition] = useTransition();
  const [guardado, setGuardado] = useState(false);

  if (!puedeComentar && !comentarioInicial) return null;

  return (
    <div className="card p-4">
      <h3 className="text-sm font-medium text-marmol-800 mb-2">Comentario general</h3>
      {puedeComentar ? (
        <>
          <textarea
            placeholder="Tu reflexión sobre tu informe de desarrollo (opcional)…"
            defaultValue={comentarioInicial ?? ''}
            onBlur={(e) => {
              const valor = e.target.value;
              if (!valor.trim()) return;
              startTransition(async () => {
                const res = await guardarComentarioColaborador({
                  colaboradorId,
                  guiaDelFlowId,
                  aspectoId: null,
                  comentario: valor,
                });
                if (res.ok) setGuardado(true);
              });
            }}
            rows={3}
            className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
          />
          {guardado && (
            <p className="text-xs text-alto flex items-center gap-1 mt-1">
              <Check size={12} /> Guardado
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-marmol-600 italic">"{comentarioInicial}"</p>
      )}
    </div>
  );
}
