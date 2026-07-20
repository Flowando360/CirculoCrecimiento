'use client';

import { useState, useTransition } from 'react';
import { subirGuiaDelFlow } from '@/app/(dashboard)/administracion/guias-colaboradores/actions';
import { Upload } from 'lucide-react';

interface Colaborador {
  id: string;
  nombre_completo: string;
}

export function FormularioSubirGuia({ colaboradores }: { colaboradores: Colaborador[] }) {
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    setMensaje(null);
    startTransition(async () => {
      const res = await subirGuiaDelFlow(formData);
      setMensaje(res.ok ? 'Guía subida y asociada correctamente.' : `Error: ${res.error}`);
    });
  }

  return (
    <form action={onSubmit} className="card p-5 space-y-4">
      <h3 className="font-display font-semibold text-marmol-900">Subir Guía del Flow (PDF)</h3>

      <div>
        <label className="block text-sm font-medium text-marmol-700 mb-1">Colaborador</label>
        <select name="colaboradorId" required className="w-full rounded-lg border border-marmol-200 px-3 py-2 text-sm">
          <option value="">Selecciona…</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre_completo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-marmol-700 mb-1">
          Origen del Flow (fecha de nacimiento, como aparece en la portada)
        </label>
        <input type="date" name="origenFlow" className="w-full rounded-lg border border-marmol-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-marmol-700 mb-1">Archivo PDF</label>
        <input type="file" name="archivo" accept="application/pdf" required className="w-full text-sm" />
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="inline-flex items-center gap-1.5 rounded-lg bg-flow-500 hover:bg-flow-600 text-white text-sm font-medium px-4 py-2 transition disabled:opacity-50"
      >
        <Upload size={14} /> {cargando ? 'Subiendo…' : 'Subir y asociar'}
      </button>

      {mensaje && <p className="text-xs text-marmol-600">{mensaje}</p>}
    </form>
  );
}
