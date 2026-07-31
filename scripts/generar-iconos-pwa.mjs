import { Jimp, JimpMime } from 'jimp';
import { mkdir } from 'node:fs/promises';

const BLANCO = 0xffffffff;
const MORADO = 0x7c3aedff; // flow-500
const TAMANOS = [
  { nombre: 'icon-192.png', size: 192, padding: 0.82, fondo: BLANCO },
  { nombre: 'icon-512.png', size: 512, padding: 0.82, fondo: BLANCO },
  { nombre: 'icon-maskable-512.png', size: 512, padding: 0.55, fondo: MORADO }, // más margen: zona segura para íconos "maskable"
  { nombre: 'apple-touch-icon.png', size: 180, padding: 0.85, fondo: BLANCO },
];

async function generar() {
  await mkdir('public/icons', { recursive: true });
  const logoCompleto = await Jimp.read('public/marca/LogoMarmolesYServicios.jpg');
  // Solo el isotipo cuadrado a la izquierda del logo (sin el texto "MÁRMOLES
  // & SERVICIOS", que se vuelve ilegible reducido al tamaño de un ícono).
  const logo = logoCompleto.crop({ x: 0, y: 0, w: 235, h: 253 });

  for (const { nombre, size, padding, fondo } of TAMANOS) {
    const lienzo = new Jimp({ width: size, height: size, color: fondo });
    const anchoLogo = Math.round(size * padding);
    const logoRedimensionado = logo.clone().resize({ w: anchoLogo });
    const x = Math.round((size - logoRedimensionado.width) / 2);
    const y = Math.round((size - logoRedimensionado.height) / 2);
    lienzo.composite(logoRedimensionado, x, y);
    await lienzo.write(`public/icons/${nombre}`, { mime: JimpMime.png });
    console.log(`Generado public/icons/${nombre}`);
  }
}

generar().catch((e) => {
  console.error(e);
  process.exit(1);
});
