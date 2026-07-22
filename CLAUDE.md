\# CirculoCrecimiento



\## Qué es

Sistema de gestión de Talento Humano para empresas. Cubre:

\- Evaluación de Desempeño

\- Planes de Desarrollo y Formación

\- Seguimiento de fechas importantes de contratos y SG-SST



Usado por RRHH y también por líderes/jefes de área.



\## Tecnologías

\- Frontend: Next.js 14 + TypeScript + Tailwind CSS

\- Base de datos: SQL, manejada en Supabase

\- Hosting/despliegue: Vercel



\## Cuentas de este proyecto

\- Carpeta local: `C:\\Mis\_Apps\\CirculoCrecimiento`

\- GitHub: usar la cuenta \*\*innovacion@flowando.com\*\* (ya configurada como `git config user.email` en esta carpeta — si Claude ve otra cuenta activa debe avisar antes de hacer push)

\- Supabase: proyecto ya vinculado con `supabase link`, Reference ID \*\*zmpggzrmsuudxyjtobzy\*\*

\- Vercel: pendiente de configurar (instalar CLI y hacer `vercel link`) — este es el único de los 4 proyectos que sí se despliega en Vercel, así que es el primero que conviene configurar



\## Rutina de trabajo esperada

1\. El usuario abre PowerShell y se mueve a esta carpeta.

2\. Si la tarea toca la base de datos, el usuario activa el token de Supabase de este proyecto en la sesión (`$env:SUPABASE\_ACCESS\_TOKEN`) antes de abrir Claude Code.

3\. Antes de programar cualquier cambio, mostrar primero un plan simple de qué se va a hacer y esperar aprobación.

4\. Después de hacer el cambio, indicar cómo probarlo antes de seguir.

5\. Antes de `git commit` / `git push`, mostrar un resumen de qué archivos cambiaron y por qué.

6\. Si el cambio toca la base de datos en Supabase, avisar explícitamente y explicar si se debe correr `supabase db push` u otro comando, sin ejecutarlo por cuenta propia sin confirmación.

7\. Si el cambio requiere un nuevo despliegue en Vercel, mencionarlo claramente y explicar el paso a seguir (una vez esté configurado el CLI).

8\. El usuario es nueva usando terminal y Claude Code: explicar cada paso y cada comando en español simple, sin dar por hecho que conoce la terminal.



\## Reglas para trabajar en este proyecto

\- Explicar siempre los cambios en español, en lenguaje simple y sin tecnicismos innecesarios

\- No borrar ni modificar código sin explicar primero qué se va a cambiar y por qué

\- Antes de hacer commit/push, mostrar un resumen de qué archivos cambiaron

\- Cuidado especial con fechas de contratos y SG-SST: son datos sensibles, no modificar su lógica sin confirmar conmigo primero

\- Tener en cuenta que hay distintos niveles de acceso (RRHH vs. líderes de área) — no romper esos permisos al hacer cambios

\- Si algo toca la base de datos en Supabase, avisar explícitamente antes de ejecutar

\- Si un cambio requiere un nuevo despliegue en Vercel, mencionarlo claramente

\- Si un cambio rompe algo, revertir con git y avisar al usuario — no intentar arreglarlo sobre la marcha sin decirle primero



\## Estructura del proyecto

\- \[Pendiente: pídele a Claude Code que lo complete leyendo el proyecto — ver instrucciones abajo]



\## Entorno de pruebas vs. producción

\- \[Pendiente: indicar si existe un proyecto de Supabase de pruebas separado, o si todo se trabaja directo sobre el real]



\## Roles de usuario

\- \[Pendiente: pídele a Claude Code que liste los roles que encuentre en el código (RRHH vs. líderes de área)]

