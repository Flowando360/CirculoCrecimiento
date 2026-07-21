# Especificación — Módulo de Feed / Comunicados

**Proyecto:** CirculoCrecimiento
**Fecha:** 2026-07-20
**Estado:** Definido, pendiente de implementación
**Relacionado con:** sección 4.1 (Inicio/Feed) y sección 9 (Modelo de datos) de `docs/especificacion-funcional.md`

## 1. Objetivo

Definir cómo se publica y se muestra el contenido dentro del feed corporativo, ampliando lo descrito en la especificación funcional original, que no detallaba el formato técnico de las publicaciones.

## 2. Tipos de contenido que puede publicar un comunicado

Cada comunicado tiene siempre un **texto** (cuerpo del mensaje) y, opcionalmente, **un adjunto** de alguno de estos tres tipos (no combinables entre sí en una misma publicación, por ahora):

1. **Documento** (PDF, Word, imagen)
   - Se sube el archivo a Supabase Storage.
   - Se muestra en el feed como una tarjeta con: ícono según tipo de archivo, nombre del archivo, tamaño, y botón de descarga.

2. **Link externo**
   - El usuario pega una URL.
   - El sistema genera automáticamente una vista previa (título, imagen, descripción), leyendo los metadatos Open Graph (`og:title`, `og:image`, `og:description`) del link, similar a como lo hacen LinkedIn o WhatsApp.

3. **Video o imagen destacada**
   - Se sube el archivo multimedia.
   - Se muestra directamente reproducible/visible dentro del feed (no requiere descarga).

Si el comunicado no lleva adjunto, se publica solo con texto.

## 3. Comportamiento de la tarjeta de documento adjunto

- Se muestra como **tarjeta con vista previa + botón de descarga** (no como link simple, no como visor integrado dentro de la app).
- La tarjeta debe incluir al menos: ícono/miniatura según tipo de archivo, nombre del archivo, y botón de descarga visible.

## 4. Cambios necesarios en el modelo de datos

Ampliar la entidad `Comunicado / publicación del feed` (sección 9 de la especificación funcional) con los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `contenido_texto` | text | Cuerpo del mensaje del comunicado |
| `tipo_adjunto` | enum: `ninguno`, `documento`, `link`, `video_imagen` | Define qué tipo de adjunto tiene la publicación |
| `archivo_url` | text (nullable) | URL del archivo en Supabase Storage, si `tipo_adjunto` es `documento` o `video_imagen` |
| `link_url` | text (nullable) | URL pegada por el usuario, si `tipo_adjunto` es `link` |
| `link_preview_titulo` | text (nullable) | Título extraído del link (metadato `og:title`) |
| `link_preview_imagen` | text (nullable) | URL de imagen extraída del link (metadato `og:image`) |
| `link_preview_descripcion` | text (nullable) | Descripción extraída del link (metadato `og:description`) |

## 5. Nota técnica pendiente (no bloqueante)

Para generar la vista previa automática de links externos se necesita un servicio que lea los metadatos Open Graph del link pegado. Esto se puede resolver más adelante con una función serverless (Edge Function de Supabase o API route de Next.js) que se ejecute al pegar el link. No es necesario resolverlo ahora; puede quedar como un paso posterior dentro de esta misma funcionalidad.

## 6. Fuera de alcance por ahora

- Múltiples adjuntos en una sola publicación (se puede ampliar más adelante si se necesita).
- Visor de PDF integrado dentro de la app (se decidió usar tarjeta con descarga en su lugar).
