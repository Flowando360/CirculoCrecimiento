import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Colombia: formatea fechas en formato largo local, ej. "16 de julio de 2026" */
export function formatearFecha(fecha: string | Date): string {
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

export function diasHasta(fecha: string | Date): number {
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatearTamanoArchivo(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** El apodo/diminutivo que la persona eligió, o si no fijó ninguno, su primer nombre. */
export function nombreParaSaludo(nombreCompleto: string, nombrePreferido?: string | null): string {
  return nombrePreferido?.trim() || nombreCompleto.trim().split(' ')[0] || nombreCompleto;
}

const CARACTERES_PASSWORD = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';

/** Contraseña temporal legible (sin caracteres ambiguos como 0/O o 1/l/I). */
export function generarPassword(): string {
  let resultado = '';
  for (let i = 0; i < 10; i++) {
    resultado += CARACTERES_PASSWORD[Math.floor(Math.random() * CARACTERES_PASSWORD.length)];
  }
  return resultado;
}

export const etiquetaRol: Record<string, string> = {
  admin_th: 'Talento Humano',
  lider: 'Líder',
  colaborador: 'Colaborador',
  gerencia: 'Gerencia',
  auditor_externo: 'Auditor externo',
};

export const etiquetaSemaforo: Record<string, string> = {
  alto: 'Alto',
  medio: 'Medio',
  bajo: 'Bajo',
};
