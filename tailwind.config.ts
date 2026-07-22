import type { Config } from 'tailwindcss';

// Sistema de diseño Mármoles & Servicios × FlowAndo
// Base: piedra/mármol (neutros cálidos) + acento violeta FlowAndo (Ser/Saber/Hacer/Deber)
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        marmol: {
          50: '#faf9f7',
          100: '#f2f0ec',
          200: '#e4e0d8',
          300: '#cfc8ba',
          400: '#aca194',
          500: '#8a7f70',
          600: '#6b6153',
          700: '#524a40',
          800: '#3a352e',
          900: '#25211c',
        },
        flow: {
          50: '#f5f2ff',
          100: '#ebe4ff',
          200: '#d5c7ff',
          300: '#b399ff',
          400: '#9166ff',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b1876',
        },
        ser: '#7c3aed',
        saber: '#0ea5a4',
        hacer: '#d97706',
        deber: '#2563eb',
        alto: '#15803d',
        medio: '#b45309',
        bajo: '#b91c1c',
        // Paleta de marca (docs/sistema-diseno-y-lenguaje.md, sección 2)
        // primario = flow-500, ya definido arriba. No cambiar estos HEX sin
        // actualizar antes ese documento — es la fuente de verdad aprobada.
        secundario: '#1B2A5B', // azul marino — encabezados, textos importantes, nav
        acento: '#5EEAD4', // menta — logros, insignias, gamificación
      },
      backgroundImage: {
        // Degradado morado → menta: hero, barras de progreso, tarjetas de logro
        crecimiento: 'linear-gradient(90deg, #7C3AED, #5EEAD4)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
      },
    },
  },
  plugins: [],
};

export default config;
