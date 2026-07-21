'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { publicarEnFeed } from '@/app/(dashboard)/nexa/feed/actions';
import { Plus } from 'lucide-react';

const TIPOS = [
  { valor: 'anuncio', etiqueta: 'Anuncio' },
  { valor: 'politica_sst', etiqueta: 'Política SST' },
  { valor: 'logro', etiqueta: 'Logro' },
  { valor: 'general', etiqueta: 'General' },
] as const;

export function FormularioPublicarFeed({ esAdminTh }: { esAdminTh: boolean }) {
  const router = useRouter();
  const [mostrar, setMostrar] = useState(false);
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]['valor']>('anuncio');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [fijado, setFijado] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function publicar() {
    setError(null);
    startTransition(async () => {
      const res = await publicarEnFeed({ tipo, titulo, contenido: contenido || undefined, fijado });
      if (res.ok) {
        setTitulo('');
        setContenido('');
        setFijado(false);
        setMostrar(false);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  if (!mostrar) {
    return (
      <button
        type="button"
        onClick={() => setMostrar(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-flow-500 hover:bg-flow-600 text-white text-sm font-medium px-3.5 py-2 transition"
      >
        <Plus size={16} /> Publicar
      </button>
    );
  }

  return (
    <div className="card p-4 space-y-3">
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value as typeof tipo)}
        className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
      >
        {TIPOS.map((t) => (
          <option key={t.valor} value={t.valor}>
            {t.etiqueta}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
      />
      <textarea
        placeholder="Contenido (opcional)…"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
      />
      {esAdminTh && (
        <label className="flex items-center gap-2 text-xs text-marmol-600">
          <input type="checkbox" checked={fijado} onChange={(e) => setFijado(e.target.checked)} />
          Fijar arriba del feed
        </label>
      )}
      {error && <p className="text-sm text-bajo">{error}</p>}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending || !titulo}
          onClick={publicar}
          className="rounded-lg bg-flow-500 hover:bg-flow-600 disabled:opacity-40 text-white text-sm font-medium px-4 py-2 transition"
        >
          {pending ? 'Publicando…' : 'Publicar'}
        </button>
        <button
          type="button"
          onClick={() => setMostrar(false)}
          className="rounded-lg border border-marmol-200 text-marmol-500 text-sm font-medium px-4 py-2 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
