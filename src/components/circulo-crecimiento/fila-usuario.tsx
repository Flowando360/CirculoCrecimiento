'use client';

import { useState, useTransition } from 'react';
import {
  actualizarUsuario,
  cambiarEstadoUsuario,
} from '@/app/(dashboard)/administracion/usuarios/actions';
import { etiquetaRol } from '@/lib/utils';
import { Pencil, Check, X } from 'lucide-react';
import type { RolUsuario } from '@/types/colaborador';

const ROLES: RolUsuario[] = ['admin_th', 'lider', 'colaborador', 'gerencia', 'auditor_externo'];

export interface UsuarioFila {
  id: string;
  nombre_completo: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
}

export function FilaUsuario({ usuario, esUsuarioActual }: { usuario: UsuarioFila; esUsuarioActual: boolean }) {
  const [editando, setEditando] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState(usuario.nombre_completo);
  const [email, setEmail] = useState(usuario.email);
  const [rol, setRol] = useState<RolUsuario>(usuario.rol);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function guardar() {
    setError(null);
    startTransition(async () => {
      const res = await actualizarUsuario({ usuarioId: usuario.id, nombreCompleto, email, rol });
      if (res.ok) {
        setEditando(false);
      } else {
        setError(res.error);
      }
    });
  }

  function cancelar() {
    setNombreCompleto(usuario.nombre_completo);
    setEmail(usuario.email);
    setRol(usuario.rol);
    setError(null);
    setEditando(false);
  }

  function retirarOReactivar() {
    const mensaje = usuario.activo
      ? `¿Retirar a ${usuario.nombre_completo}? No podrá iniciar sesión hasta que se reactive.`
      : `¿Reactivar a ${usuario.nombre_completo}?`;
    if (!confirm(mensaje)) return;
    setError(null);
    startTransition(async () => {
      const res = await cambiarEstadoUsuario(usuario.id, !usuario.activo);
      if (!res.ok) setError(res.error);
    });
  }

  if (editando) {
    return (
      <tr className="border-b border-marmol-100 last:border-0 bg-flow-50/40">
        <td className="px-4 py-2.5">
          <input
            type="text"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            className="w-full rounded-lg border border-marmol-200 px-2 py-1 text-sm"
          />
        </td>
        <td className="px-4 py-2.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-marmol-200 px-2 py-1 text-sm"
          />
        </td>
        <td className="px-4 py-2.5">
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value as RolUsuario)}
            className="rounded-lg border border-marmol-200 px-2 py-1 text-xs"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {etiquetaRol[r]}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-2.5 text-marmol-500">{usuario.activo ? 'Activo' : 'Inactivo'}</td>
        <td className="px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={guardar}
              disabled={pending || !nombreCompleto || !email}
              className="inline-flex items-center gap-1 rounded-lg bg-flow-500 hover:bg-flow-600 disabled:opacity-40 text-white text-xs font-medium px-2.5 py-1.5"
            >
              <Check size={12} /> {pending ? 'Guardando…' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={cancelar}
              disabled={pending}
              className="inline-flex items-center gap-1 rounded-lg border border-marmol-200 text-marmol-600 hover:bg-marmol-100 text-xs font-medium px-2.5 py-1.5"
            >
              <X size={12} /> Cancelar
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs text-bajo">{error}</p>}
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-marmol-100 last:border-0">
      <td className="px-4 py-3 font-medium text-marmol-900">{usuario.nombre_completo}</td>
      <td className="px-4 py-3 text-marmol-600">{usuario.email}</td>
      <td className="px-4 py-3">
        <span className="text-xs rounded-full bg-flow-50 text-flow-700 px-2 py-0.5 font-medium">
          {etiquetaRol[usuario.rol] ?? usuario.rol}
        </span>
      </td>
      <td className="px-4 py-3 text-marmol-500">{usuario.activo ? 'Activo' : 'Inactivo'}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setEditando(true)}
            className="inline-flex items-center gap-1 text-xs text-marmol-500 hover:text-flow-600"
          >
            <Pencil size={12} /> Editar
          </button>
          {!esUsuarioActual && (
            <button
              type="button"
              onClick={retirarOReactivar}
              disabled={pending}
              className={
                usuario.activo
                  ? 'text-xs text-marmol-500 hover:text-bajo disabled:opacity-40'
                  : 'text-xs text-marmol-500 hover:text-alto disabled:opacity-40'
              }
            >
              {pending ? '…' : usuario.activo ? 'Retirar' : 'Reactivar'}
            </button>
          )}
        </div>
        {error && !editando && <p className="mt-1 text-xs text-bajo">{error}</p>}
      </td>
    </tr>
  );
}
