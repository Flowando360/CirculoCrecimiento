import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Círculo de Crecimiento 360° | Mármoles y Servicios',
  description:
    'Plataforma de Encuentros de Crecimiento 360° Ser · Saber · Hacer · Deber y gestión de talento humano, por FlowAndo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
