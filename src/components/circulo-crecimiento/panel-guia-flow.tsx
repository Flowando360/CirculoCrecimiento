'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  crearGuiaDelFlow,
  subirPdfGuiaDelFlow,
  guardarComentarioColaborador,
} from '@/app/(dashboard)/circulo-crecimiento/colaboradores/[id]/guia-flow/actions';
import { Upload, Plus, Check } from 'lucide-react';

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

export function SubirPdfGuiaFlow({ colaboradorId, guiaDelFlowId, urlActual }: { colaboradorId: string; guiaDelFlowId: string; urlActual: string | null }) {
  const [pending, startTransition] = useTransition();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const router = useRouter();

  function onSubmit(formData: FormData) {
    formData.set('colaboradorId', colaboradorId);
    formData.set('guiaDelFlowId', guiaDelFlowId);
    setMensaje(null);
    startTransition(async () => {
      const res = await subirPdfGuiaDelFlow(formData);
      if (res.ok) {
        setMensaje('PDF subido correctamente.');
        router.refresh();
      } else {
        setMensaje(`Error: ${res.error}`);
      }
    });
  }

  return (
    <form action={onSubmit} className="flex items-center gap-2 flex-wrap">
      {urlActual && (
        <a href={urlActual} target="_blank" rel="noreferrer" className="text-xs text-flow-600 hover:underline">
          Ver PDF actual
        </a>
      )}
      <input type="file" name="archivo" accept="application/pdf" required className="text-xs" />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-marmol-200 hover:border-flow-300 disabled:opacity-50 text-marmol-600 text-xs font-medium px-2.5 py-1.5 transition"
      >
        <Upload size={12} /> {pending ? 'Subiendo…' : urlActual ? 'Reemplazar' : 'Subir PDF'}
      </button>
      {mensaje && <span className="text-xs text-marmol-500">{mensaje}</span>}
    </form>
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
            placeholder="Tu reflexión sobre el conjunto de tu Guía del Flow (opcional)…"
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
