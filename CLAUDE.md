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



\## Modo de trabajo: autónomo (sin pausas de aprobación)

El usuario prefiere que Claude trabaje de forma autónoma en este proyecto: \*\*no pedir aprobación antes\*\* de programar, hacer `git commit`, hacer `git push`, o tocar la base de datos en Supabase (incluyendo `supabase db push` u otros comandos). Se debe avisar \*\*después\*\* de hecho, explicando qué se hizo y por qué, no antes de hacerlo.

Esto reemplaza los pasos de aprobación previa que tenía este proyecto anteriormente.



\## Rutina de trabajo esperada

1\. El usuario abre PowerShell y se mueve a esta carpeta.

2\. Si la tarea toca la base de datos, el usuario activa el token de Supabase de este proyecto en la sesión (`$env:SUPABASE\_ACCESS\_TOKEN`) antes de abrir Claude Code.

3\. Claude programa el cambio directamente, sin esperar aprobación previa de un plan.

4\. Después de hacer el cambio, indicar cómo probarlo.

5\. Claude puede hacer `git commit` / `git push` directamente. Después de hacerlo, mostrar un resumen de qué archivos cambiaron y por qué.

6\. Si el cambio toca la base de datos en Supabase, Claude puede ejecutar lo necesario (incluyendo `supabase db push`) directamente. Después de hacerlo, avisar explícitamente qué se ejecutó y qué efecto tuvo.

7\. Si el cambio requiere un nuevo despliegue en Vercel, mencionarlo claramente y explicar el paso a seguir (una vez esté configurado el CLI).

8\. El usuario es nueva usando terminal y Claude Code: explicar cada paso y cada comando en español simple, sin dar por hecho que conoce la terminal.



\## Reglas para trabajar en este proyecto

\- Explicar siempre los cambios en español, en lenguaje simple y sin tecnicismos innecesarios

\- Se puede programar, commitear, hacer push y tocar la base de datos sin pedir aprobación previa — avisar siempre después de hecho, con un resumen claro de qué se cambió y por qué

\- Cuidado especial con fechas de contratos y SG-SST: son datos sensibles; se puede modificar su lógica sin pedir aprobación previa, pero avisar explícitamente después explicando el cambio con detalle

\- Tener en cuenta que hay distintos niveles de acceso (RRHH vs. líderes de área) — no romper esos permisos al hacer cambios

\- Si un cambio requiere un nuevo despliegue en Vercel, mencionarlo claramente

\- Si un cambio rompe algo, revertir con git y avisar al usuario — no intentar arreglarlo sobre la marcha sin decirle primero



\## Estructura del proyecto

\- \[Pendiente: pídele a Claude Code que lo complete leyendo el proyecto — ver instrucciones abajo]



\## Entorno de pruebas vs. producción

\- \[Pendiente: indicar si existe un proyecto de Supabase de pruebas separado, o si todo se trabaja directo sobre el real]



\## Roles de usuario

\- \[Pendiente: pídele a Claude Code que liste los roles que encuentre en el código (RRHH vs. líderes de área)]

