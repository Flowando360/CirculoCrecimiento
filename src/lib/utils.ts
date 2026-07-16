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

export const etiquetaRol: Record<string, string> = {
  admin_th: 'Talento Humano',
  lider: 'Líder',
  colaborador: 'Colaborador',
  gerencia: 'Gerencia',
};

export const etiquetaSemaforo: Record<string, string> = {
  alto: 'Alto',
  medio: 'Medio',
  bajo: 'Bajo',
};
