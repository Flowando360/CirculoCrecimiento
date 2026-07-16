'use client';

import { useState, useTransition } from 'react';
import { guardarRespuesta } from '@/app/(dashboard)/circulo-crecimiento/evaluar/actions';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Criterio {
  nivel: number;
  criterio: string;
}

interface Competencia {
  id: string;
  nombre: string;
  descripcion_que_evalua: string | null;
  dimension: 'hacer' | 'deber';
  criterios: Criterio[];
}

export function FormularioEvaluacion({
  evaluacionTareaId,
  competencias,
  respuestasIniciales,
}: {
  evaluacionTareaId: string;
  competencias: Competencia[];
  respuestasIniciales: Record<string, number>;
}) {
  const [notas, setNotas] = useState<Record<string, number>>(respuestasIniciales);
  const [comentarios, setComentarios] = useState<Record<string, string>>({});
  const [guardando, startTransition] = useTransition();
  const [guardadas, setGuardadas] = useState<Record<string, boolean>>({});

  function calificar(competenciaId: string, nota: number) {
    setNotas((prev) => ({ ...prev, [competenciaId]: nota }));
    startTransition(async () => {
      const res = await guardarRespuesta({
        evaluacionTareaId,
        competenciaId,
        nota,
        comentario: comentarios[competenciaId],
      });
      if (res.ok) {
        setGuardadas((prev) => ({ ...prev, [competenciaId]: true }));
      }
    });
  }

  return (
    <div className="space-y-6">
      {competencias.map((comp) => (
        <div key={comp.id} className="card p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold text-marmol-900">{comp.nombre}</h3>
            <span
              className={cn(
                'text-xs rounded-full px-2 py-0.5 font-medium',
                comp.dimension === 'hacer' ? 'bg-hacer/10 text-hacer' : 'bg-deber/10 text-deber'
              )}
            >
              {comp.dimension === 'hacer' ? 'Hacer' : 'Deber'}
            </span>
          </div>
          {comp.descripcion_que_evalua && (
            <p className="text-sm text-marmol-500 mb-4">{comp.descripcion_que_evalua}</p>
          )}

          <div className="space-y-2">
            {comp.criterios
              .sort((a, b) => b.nivel - a.nivel)
              .map((c) => (
                <label
                  key={c.nivel}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3 text-sm cursor-pointer transition',
                    notas[comp.id] === c.nivel
                      ? 'border-flow-400 bg-flow-50'
                      : 'border-marmol-200 hover:border-marmol-300'
                  )}
                >
                  <input
                    type="radio"
                    name={`competencia-${comp.id}`}
                    className="mt-1"
                    checked={notas[comp.id] === c.nivel}
                    onChange={() => calificar(comp.id, c.nivel)}
                  />
                  <div>
                    <span className="font-medium text-marmol-800">Nivel {c.nivel}</span>
                    <p className="text-marmol-600">{c.criterio}</p>
                  </div>
                </label>
              ))}
          </div>

          <textarea
            placeholder="Comentario opcional…"
            className="mt-3 w-full rounded-lg border border-marmol-200 p-2.5 text-sm"
            rows={2}
            onChange={(e) => setComentarios((prev) => ({ ...prev, [comp.id]: e.target.value }))}
          />

          {guardadas[comp.id] && (
            <p className="mt-2 text-xs text-alto flex items-center gap-1">
              <Check size={12} /> Guardado — el resultado se recalculó en tiempo real
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
