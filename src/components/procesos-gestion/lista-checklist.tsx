'use client';

import { useState, useTransition } from 'react';
import {
  crearChecklistItem,
  eliminarChecklistItem,
  actualizarEstadoChecklist,
} from '@/app/(dashboard)/procesos-gestion/actions';
import { createClient } from '@/lib/supabase/client';
import { Trash2, Plus, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

const ETIQUETA_MARCO: Record<string, string> = {
  iso_9001: 'ISO 9001',
  sarlaft_sagrilaft: 'SARLAFT/SAGRILAFT',
  ptee: 'PTEE',
};

const ETIQUETA_ESTADO: Record<string, string> = {
  cumple: 'Cumple',
  cumple_parcial: 'Cumple parcial',
  no_cumple: 'No cumple',
  no_aplica: 'No aplica',
};

const CLASE_ESTADO: Record<string, string> = {
  cumple: 'badge-alto',
  cumple_parcial: 'badge-medio',
  no_cumple: 'badge-bajo',
  no_aplica: 'bg-marmol-100 text-marmol-500 border border-marmol-200',
};

interface ChecklistItem {
  id: string;
  marco_normativo: string;
  item: string;
  descripcion: string | null;
  estado: string;
  evidencia_url: string | null;
}

export function ListaChecklist({
  itemsIniciales,
  puedeEditar,
  empresaId,
}: {
  itemsIniciales: ChecklistItem[];
  puedeEditar: boolean;
  empresaId: string;
}) {
  const [items, setItems] = useState(itemsIniciales);
  const [marcoNormativo, setMarcoNormativo] = useState<'iso_9001' | 'sarlaft_sagrilaft' | 'ptee'>('iso_9001');
  const [item, setItem] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [evidenciaUrl, setEvidenciaUrl] = useState<string | null>(null);
  const [evidenciaNombre, setEvidenciaNombre] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function subirEvidencia(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    setSubiendo(true);
    setError(null);
    const ruta = `${empresaId}/${Date.now()}-${archivo.name}`;
    const supabase = createClient();
    const { error: uploadError } = await supabase.storage.from('evidencia-procesos').upload(ruta, archivo);
    setSubiendo(false);
    if (uploadError) {
      setError(`Error subiendo evidencia: ${uploadError.message}`);
      return;
    }
    setEvidenciaUrl(ruta);
    setEvidenciaNombre(archivo.name);
  }

  function agregar() {
    setError(null);
    startTransition(async () => {
      const res = await crearChecklistItem({
        marcoNormativo,
        item,
        estado: 'no_cumple',
        evidenciaUrl: evidenciaUrl ?? undefined,
      });
      if (res.ok) {
        setItems((prev) => [
          ...prev,
          { id: res.id, marco_normativo: marcoNormativo, item, descripcion: null, estado: 'no_cumple', evidencia_url: evidenciaUrl },
        ]);
        setItem('');
        setEvidenciaUrl(null);
        setEvidenciaNombre(null);
      } else {
        setError(res.error);
      }
    });
  }

  function eliminar(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    startTransition(async () => {
      await eliminarChecklistItem(id);
    });
  }

  function cambiarEstado(id: string, estado: ChecklistItem['estado']) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, estado } : i)));
    startTransition(async () => {
      await actualizarEstadoChecklist(id, estado as any);
    });
  }

  return (
    <div className="card p-5">
      <h2 className="font-display font-semibold text-secundario mb-1">Checklist de cumplimiento</h2>
      <p className="text-xs text-marmol-400 mb-3">
        Base directa del paquete de evidencia de auditoría (ISO 9001, SARLAFT/SAGRILAFT, PTEE).
      </p>

      <div className="space-y-2 mb-4">
        {items.map((i) => (
          <div key={i.id} className="flex items-start justify-between gap-2 border-b border-marmol-100 pb-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs rounded-full bg-flow-50 text-flow-700 px-2 py-0.5 font-medium">
                  {ETIQUETA_MARCO[i.marco_normativo]}
                </span>
                {i.evidencia_url && (
                  <span className="text-xs text-marmol-400 inline-flex items-center gap-1">
                    <Paperclip size={11} /> Con evidencia
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-marmol-800 mt-1">{i.item}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {puedeEditar ? (
                <select
                  value={i.estado}
                  onChange={(e) => cambiarEstado(i.id, e.target.value as ChecklistItem['estado'])}
                  className={cn('text-xs rounded-full px-2 py-0.5 font-medium border-0', CLASE_ESTADO[i.estado])}
                >
                  {Object.entries(ETIQUETA_ESTADO).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={cn('text-xs rounded-full px-2 py-0.5 font-medium', CLASE_ESTADO[i.estado])}>
                  {ETIQUETA_ESTADO[i.estado]}
                </span>
              )}
              {puedeEditar && (
                <button onClick={() => eliminar(i.id)} className="text-marmol-300 hover:text-bajo">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-marmol-400">Sin ítems de checklist todavía.</p>}
      </div>

      {puedeEditar && (
        <div className="space-y-2 border-t border-marmol-100 pt-3">
          <div className="flex gap-2">
            <select
              value={marcoNormativo}
              onChange={(e) => setMarcoNormativo(e.target.value as typeof marcoNormativo)}
              className="rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
            >
              {Object.entries(ETIQUETA_MARCO).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Ítem del checklist"
              className="flex-1 rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
            />
          </div>
          <div>
            <input type="file" onChange={subirEvidencia} disabled={subiendo} className="text-xs text-marmol-500" />
            {subiendo && <p className="text-xs text-marmol-400 mt-1">Subiendo…</p>}
            {evidenciaNombre && <p className="text-xs text-marmol-600 mt-1">Adjunto: {evidenciaNombre}</p>}
          </div>
          <button
            onClick={agregar}
            disabled={pending || !item.trim() || subiendo}
            className="inline-flex items-center gap-1 rounded-lg bg-flow-500 hover:bg-flow-600 disabled:opacity-40 text-white text-sm font-medium px-3 py-1.5"
          >
            <Plus size={14} /> Agregar
          </button>
          {error && <p className="text-sm text-bajo">{error}</p>}
        </div>
      )}
    </div>
  );
}
