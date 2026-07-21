'use client';

import { useState, useTransition } from 'react';
import { agregarMovimiento } from '@/app/(dashboard)/circulo-crecimiento/colaboradores/[id]/historial/actions';
import { cn, formatearFecha } from '@/lib/utils';
import { Plus } from 'lucide-react';

export type TipoMovimiento =
  | 'ingreso'
  | 'promocion'
  | 'cambio_area'
  | 'cambio_lider'
  | 'aumento_salarial'
  | 'sancion'
  | 'reconocimiento'
  | 'salida';

const ETIQUETA_TIPO: Record<TipoMovimiento, string> = {
  ingreso: 'Ingreso',
  promocion: 'Promoción',
  cambio_area: 'Cambio de área',
  cambio_lider: 'Cambio de líder',
  aumento_salarial: 'Aumento salarial',
  sancion: 'Sanción',
  reconocimiento: 'Reconocimiento',
  salida: 'Salida',
};

const CLASE_TIPO: Record<TipoMovimiento, string> = {
  ingreso: 'badge-alto',
  promocion: 'badge-alto',
  cambio_area: 'bg-flow-50 text-flow-700 border border-flow-200',
  cambio_lider: 'bg-flow-50 text-flow-700 border border-flow-200',
  aumento_salarial: 'badge-alto',
  sancion: 'badge-bajo',
  reconocimiento: 'badge-alto',
  salida: 'badge-bajo',
};

const TIPOS: TipoMovimiento[] = [
  'ingreso',
  'promocion',
  'cambio_area',
  'cambio_lider',
  'aumento_salarial',
  'sancion',
  'reconocimiento',
  'salida',
];

const TIPOS_CON_CARGO: TipoMovimiento[] = ['promocion', 'cambio_area'];

export interface MovimientoItem {
  id: string;
  tipo: TipoMovimiento;
  fecha: string;
  descripcion: string | null;
  cargo_anterior?: { nombre: string } | null;
  cargo_nuevo?: { nombre: string } | null;
}

export function ListaHistorialMovimientos({
  colaboradorId,
  itemsIniciales,
  puedeEditar,
  cargos,
}: {
  colaboradorId: string;
  itemsIniciales: MovimientoItem[];
  puedeEditar: boolean;
  cargos: { id: string; nombre: string }[];
}) {
  const [items, setItems] = useState(itemsIniciales);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tipo, setTipo] = useState<TipoMovimiento>('reconocimiento');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [descripcion, setDescripcion] = useState('');
  const [cargoNuevoId, setCargoNuevoId] = useState('');
  const [, startTransition] = useTransition();

  function agregar() {
    startTransition(async () => {
      const res = await agregarMovimiento({
        colaboradorId,
        tipo,
        fecha,
        descripcion: descripcion || undefined,
        cargoNuevoId: TIPOS_CON_CARGO.includes(tipo) && cargoNuevoId ? cargoNuevoId : undefined,
      });
      if (res.ok && res.movimiento) {
        setItems((prev) => [res.movimiento as MovimientoItem, ...prev]);
        setDescripcion('');
        setCargoNuevoId('');
        setMostrarForm(false);
      }
    });
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-marmol-400">Sin movimientos registrados todavía.</p>}

      <div className="space-y-3">
        {items.map((m) => (
          <div key={m.id} className="flex gap-3">
            <div className="w-24 shrink-0 text-xs text-marmol-400 pt-0.5">{formatearFecha(m.fecha)}</div>
            <div className="flex-1 border-l-2 border-marmol-100 pl-3 pb-1">
              <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', CLASE_TIPO[m.tipo])}>
                {ETIQUETA_TIPO[m.tipo]}
              </span>
              {m.cargo_anterior && m.cargo_nuevo && (
                <p className="text-xs text-marmol-500 mt-1">
                  {m.cargo_anterior.nombre} → {m.cargo_nuevo.nombre}
                </p>
              )}
              {m.descripcion && <p className="text-sm text-marmol-700 mt-1">{m.descripcion}</p>}
            </div>
          </div>
        ))}
      </div>

      {puedeEditar && (
        <div>
          {!mostrarForm ? (
            <button
              type="button"
              onClick={() => setMostrarForm(true)}
              className="inline-flex items-center gap-1.5 text-sm text-flow-600 hover:text-flow-700"
            >
              <Plus size={16} /> Agregar movimiento
            </button>
          ) : (
            <div className="rounded-lg border border-marmol-200 p-3 space-y-2">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoMovimiento)}
                className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {ETIQUETA_TIPO[t]}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
              />
              {TIPOS_CON_CARGO.includes(tipo) && (
                <select
                  value={cargoNuevoId}
                  onChange={(e) => setCargoNuevoId(e.target.value)}
                  className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
                >
                  <option value="">Cargo nuevo (opcional)…</option>
                  {cargos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              )}
              <textarea
                placeholder="Descripción (opcional)…"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-marmol-200 px-2.5 py-1.5 text-sm"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={agregar}
                  disabled={!fecha}
                  className="rounded-lg bg-flow-500 hover:bg-flow-600 disabled:opacity-40 text-white text-sm font-medium px-3.5 py-1.5 transition"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarForm(false)}
                  className="rounded-lg border border-marmol-200 text-marmol-500 text-sm font-medium px-3.5 py-1.5 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
