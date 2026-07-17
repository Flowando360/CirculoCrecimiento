'use client';

import { useState, useTransition } from 'react';
import { guardarRespuesta } from '@/app/(dashboard)/circulo-crecimiento/evaluar/actions';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Criterio {
  nivel: number;
  criterio: string;
}

export interface ItemEvaluacion {
  id: string; // evaluacion_item id
  bloque:
    | 'competencias_organizacionales'
    | 'competencias_funcionales'
    | 'competencias_liderazgo'
    | 'roles_y_funciones'
    | 'cultura';
  titulo: string;
  descripcion: string | null;
  criterios?: Criterio[]; // solo si el ítem viene de una competencia con guía de valoración
}

const ETIQUETA_BLOQUE: Record<string, { titulo: string; color: string }> = {
  competencias_organizacionales: { titulo: '1. Competencias Organizacionales', color: 'text-flow-600' },
  competencias_funcionales: { titulo: '2. Competencias Funcionales del Cargo', color: 'text-hacer' },
  competencias_liderazgo: { titulo: '3. Competencias de Liderazgo', color: 'text-deber' },
  roles_y_funciones: { titulo: '4. Roles y Funciones', color: 'text-saber' },
  cultura: { titulo: '5. Cultura', color: 'text-ser' },
};

const ORDEN_BLOQUES = [
  'competencias_organizacionales',
  'competencias_funcionales',
  'competencias_liderazgo',
  'roles_y_funciones',
  'cultura',
] as const;

export function FormularioEvaluacion({
  evaluacionTareaId,
  items,
  respuestasIniciales,
}: {
  evaluacionTareaId: string;
  items: ItemEvaluacion[];
  respuestasIniciales: Record<string, { nota: number; observacion?: string; resultadoReal?: string }>;
}) {
  const [notas, setNotas] = useState<Record<string, number>>(
    Object.fromEntries(Object.entries(respuestasIniciales).map(([k, v]) => [k, v.nota]))
  );
  const [observaciones, setObservaciones] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(respuestasIniciales).map(([k, v]) => [k, v.observacion ?? '']))
  );
  const [resultadosReales, setResultadosReales] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(respuestasIniciales).map(([k, v]) => [k, v.resultadoReal ?? '']))
  );
  const [, startTransition] = useTransition();
  const [guardados, setGuardados] = useState<Record<string, boolean>>({});

  function guardar(itemId: string, nota: number) {
    setNotas((prev) => ({ ...prev, [itemId]: nota }));
    startTransition(async () => {
      const res = await guardarRespuesta({
        evaluacionTareaId,
        evaluacionItemId: itemId,
        nota,
        observacion: observaciones[itemId],
        resultadoReal: resultadosReales[itemId],
      });
      if (res.ok) setGuardados((prev) => ({ ...prev, [itemId]: true }));
    });
  }

  const itemsPorBloque = ORDEN_BLOQUES.map((bloque) => ({
    bloque,
    items: items.filter((i) => i.bloque === bloque),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-8">
      {itemsPorBloque.map(({ bloque, items: itemsBloque }) => (
        <div key={bloque}>
          <h2 className={cn('font-display text-sm font-bold uppercase tracking-wide mb-3', ETIQUETA_BLOQUE[bloque].color)}>
            {ETIQUETA_BLOQUE[bloque].titulo}
          </h2>

          <div className="space-y-4">
            {itemsBloque.map((item) => (
              <div key={item.id} className="card p-5">
                <h3 className="font-medium text-marmol-900">{item.titulo}</h3>
                {item.descripcion && (
                  <p className="text-sm text-marmol-500 mt-1">
                    {bloque === 'roles_y_funciones' ? `Resultado esperado: ${item.descripcion}` : item.descripcion}
                  </p>
                )}

                {bloque === 'roles_y_funciones' && (
                  <input
                    type="text"
                    placeholder="Resultado real observado…"
                    defaultValue={resultadosReales[item.id] ?? ''}
                    onChange={(e) => setResultadosReales((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    className="mt-2 w-full rounded-lg border border-marmol-200 px-3 py-2 text-sm"
                  />
                )}

                {item.criterios && item.criterios.length > 0 ? (
                  <div className="space-y-2 mt-3">
                    {item.criterios
                      .sort((a, b) => b.nivel - a.nivel)
                      .map((c) => (
                        <label
                          key={c.nivel}
                          className={cn(
                            'flex items-start gap-3 rounded-lg border p-3 text-sm cursor-pointer transition',
                            notas[item.id] === c.nivel ? 'border-flow-400 bg-flow-50' : 'border-marmol-200 hover:border-marmol-300'
                          )}
                        >
                          <input
                            type="radio"
                            name={`item-${item.id}`}
                            className="mt-1"
                            checked={notas[item.id] === c.nivel}
                            onChange={() => guardar(item.id, c.nivel)}
                          />
                          <div>
                            <span className="font-medium text-marmol-800">Nivel {c.nivel}</span>
                            <p className="text-marmol-600">{c.criterio}</p>
                          </div>
                        </label>
                      ))}
                  </div>
                ) : (
                  <div className="flex gap-2 mt-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => guardar(item.id, n)}
                        className={cn(
                          'h-9 w-9 rounded-lg border text-sm font-medium transition',
                          notas[item.id] === n
                            ? 'border-flow-500 bg-flow-500 text-white'
                            : 'border-marmol-200 text-marmol-600 hover:border-flow-300'
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}

                {/* Observación: disponible en TODOS los ítems de TODOS los bloques */}
                <textarea
                  placeholder="Observación (opcional)…"
                  defaultValue={observaciones[item.id] ?? ''}
                  onChange={(e) => setObservaciones((prev) => ({ ...prev, [item.id]: e.target.value }))}
                  onBlur={() => {
                    if (notas[item.id]) guardar(item.id, notas[item.id]);
                  }}
                  className="mt-3 w-full rounded-lg border border-marmol-200 p-2.5 text-sm"
                  rows={2}
                />

                {guardados[item.id] && (
                  <p className="mt-2 text-xs text-alto flex items-center gap-1">
                    <Check size={12} /> Guardado — el resultado se recalculó en tiempo real
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
