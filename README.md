# Círculo de Crecimiento 360° + Nexa
### Mármoles y Servicios (empresa piloto) · desarrollado por FlowAndo

Plataforma de gestión de talento humano que cubre el ciclo de vida completo del
colaborador — desde el ingreso hasta la salida — sobre el modelo
**Ser · Saber · Hacer · Deber**, integrada con **Nexa** (formación gamificada,
comunicación corporativa, reconocimiento y asistente IA).

Este repositorio es el punto de partida técnico construido a partir de:
- `Círculo de Crecimiento 360° — Propuesta integral` (Flowando → Mármoles y Servicios)
- `Propuesta de Alianza Flowando × Nexus` (integración con Nexa)

---

## Stack

| Capa | Herramienta |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind |
| Backend / lógica | Server Actions + Route Handlers de Next.js, funciones y triggers en Postgres |
| Base de datos | Supabase Postgres (con Row Level Security) |
| Auth | Supabase Auth |
| Storage | Supabase Storage (hojas de vida, certificados, evidencias) |
| Notificaciones | Email (Resend) en fase 1; WhatsApp empresarial en fase 2 |
| Despliegue | Vercel (plan Hobby) |
| Gráficos | Recharts |

Todo el stack corre en capas gratuitas para el piloto (ver `docs/ARQUITECTURA.md`
para límites a vigilar).

---

## Estructura del proyecto

```
marmoles-talento-360/
├── docs/                          ← documentación de arquitectura y decisiones
├── supabase/
│   ├── migrations/                ← el esquema completo, en 7 migraciones ordenadas
│   └── seed.sql                   ← datos reales de Mármoles y Servicios (organigrama, cargos, competencias)
├── src/
│   ├── app/
│   │   ├── (auth)/login/          ← login
│   │   ├── (dashboard)/           ← todo lo autenticado, con sidebar + header
│   │   │   ├── inicio/            ← resumen personalizado por rol
│   │   │   ├── mi-perfil/         ← autoservicio para cualquier colaborador
│   │   │   ├── circulo-crecimiento/
│   │   │   │   ├── colaboradores/ ← lista + ficha 360° individual
│   │   │   │   ├── ciclos/        ← apertura y seguimiento de ciclos Hacer+Deber
│   │   │   │   ├── evaluar/       ← formulario de evaluación (autoeval/líder/par/colab.)
│   │   │   │   ├── pdi/           ← Planes de Desarrollo Individual
│   │   │   │   ├── organigrama/   ← visualización jerárquica
│   │   │   │   └── indicadores/   ← dashboards de equipo y empresa
│   │   │   ├── nexa/              ← feed, formación/SST, reconocimientos, asistente IA
│   │   │   ├── alertas/           ← calendario vivo transversal
│   │   │   └── administracion/    ← solo admin_th: cargos, organigrama, usuarios, config
│   │   └── api/                   ← route handlers (abrir ciclo, cron de alertas, disparador Nexa, asistente IA)
│   ├── components/
│   │   ├── ui/                    ← primitivos compartidos (StatCard, EmptyState)
│   │   ├── layout/                ← Sidebar, Header
│   │   ├── circulo-crecimiento/   ← SemaforoBadge, formulario de evaluación, organigrama, charts
│   │   ├── nexa/
│   │   └── alertas/
│   ├── lib/
│   │   ├── supabase/              ← clientes (browser/server/admin) + resolución de perfil
│   │   ├── calculos/              ← semáforo y ponderación (espejo TS de la lógica SQL)
│   │   ├── organigrama/           ← resolución de evaluadores (espejo TS de la vista SQL)
│   │   └── utils.ts
│   ├── types/                     ← tipos de dominio + tipos generados de Supabase
│   └── middleware.ts              ← sesión + protección de rutas
└── vercel.json                    ← cron diario de alertas
```

**Por qué esta separación:** el Círculo de Crecimiento y Nexa son dos módulos
de navegación distintos, pero viven en **una sola app y una sola base de
datos** — así una alerta de SST vencida (Círculo de Crecimiento) puede
disparar automáticamente un curso (Nexa) sin sincronizar dos sistemas. Ver
`docs/ARQUITECTURA.md` para el razonamiento completo.

---

## Arranque rápido

### 1. Crear el proyecto en Supabase
1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. En el SQL Editor, corre en orden los archivos de `supabase/migrations/`
   (0001 → 0007) y luego `supabase/seed.sql`.
   - O, si usas la CLI de Supabase: `supabase db push` desde este repo.
3. Copia `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y
   `SUPABASE_SERVICE_ROLE_KEY` desde Project Settings → API.

### 2. Variables de entorno
```bash
cp .env.example .env.local
# completa las claves de Supabase (y opcionalmente Resend/Anthropic)
```

### 3. Instalar y correr
```bash
npm install
npm run dev
```

### 4. Crear el primer usuario (Talento Humano)
Como `enable_signup = false` (a propósito: el acceso es por invitación), crea
el primer usuario admin_th manualmente:
1. Supabase Dashboard → Authentication → Add user (con su correo).
2. En SQL Editor:
   ```sql
   insert into perfiles_usuario (id, empresa_id, rol, nombre_completo, email)
   values ('<uuid-del-usuario-creado>', '00000000-0000-0000-0000-000000000001', 'admin_th', 'Tu nombre', 'tu@correo.com');
   ```
3. Inicia sesión en `/login`.

### 5. Desplegar a Vercel
```bash
git push origin main
# conecta el repo en vercel.com (plan Hobby) e importa las mismas env vars
```

---

## Alcance de esta primera entrega

Esta es la **arquitectura completa y funcional del MVP+**: esquema de base de
datos exhaustivo (todo lo descrito en ambos documentos de FlowAndo), RLS por
rol, cálculo en tiempo real de índices, generación automática de evaluadores
desde el organigrama, alertas con disparo hacia Nexa, y las pantallas núcleo
de cada módulo ya conectadas a datos reales.

Quedan marcados como siguiente iteración (ver comentarios `TODO` en el código):
- Edición completa desde la UI de organigrama y pesos de ponderación (los
  formularios existen; falta conectar la Server Action de guardado).
- Flujo de invitación de usuarios vía Supabase Auth Admin API.
- Generación asistida de PDI (regla automática que cruza Hacer/Deber/Saber/Ser).
- Envío real de notificaciones por WhatsApp (fase 2, requiere API paga de Meta).

## Documentación relacionada
- `docs/ARQUITECTURA.md` — decisiones técnicas y límites del plan gratuito.
- `docs/MODELO_DATOS.md` — diccionario de tablas y vistas.
- `docs/ROLES_PERMISOS.md` — detalle de qué ve y edita cada rol.
