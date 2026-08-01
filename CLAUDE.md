\# CirculoCrecimiento



\## Qué es

Sistema de gestión de Talento Humano para empresas. Cubre:

\- Evaluación de Desempeño

\- Planes de Desarrollo y Formación

\- Seguimiento de fechas importantes de contratos y SG-SST



Usado por RRHH y también por líderes/jefes de área.



\## Qué NO es (alcance explícitamente fuera)

Esto es un sistema de gestión de Talento Humano (evaluar, desarrollar, formar, cuidar cumplimiento SST/documental) — \*\*no\*\* un sistema de nómina ni un motor de cálculos legales/financieros. Es una frontera decidida a propósito, no un hueco por descuido:

\- No calcula nómina, prestaciones sociales ni liquidación final.

\- No maneja topes legales (salario mínimo, auxilio de transporte, UVT) ni su actualización automática.

\- No controla jornada laboral, horas extra ni turnos.

\- No gestiona embargos judiciales ni libranzas.

\- No genera desprendibles de pago.

\- No se integra con PILA, DIAN ni el sistema de seguridad social real.

Datos como salario, EPS/ARL/AFP/caja de compensación o incapacidades sí se \*\*registran\*\* en el sistema (para el certificado laboral, referencia y trazabilidad), pero son datos de referencia — el sistema nunca calcula nada a partir de ellos ni los valida contra una entidad externa. Si una conversación futura pide construir algo de la lista de arriba, confirmar primero con el usuario que de verdad quiere cruzar esa frontera — no asumirlo.



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

6\. Si el cambio toca la base de datos en Supabase, Claude puede ejecutar lo necesario (incluyendo `supabase db push`) directamente. Después de hacerlo, avisar explícitamente qué se ejecutó y qué efecto tuvo. \*\*Inmediatamente después de cada `supabase db push`, correr también `npm run db:types`\*\* (regenera `src/types/database.types.ts`) y comitear ese archivo junto con la migración — si no, el archivo de tipos queda desactualizado y rompe el chequeo de tipos (`npm run typecheck`) del resto del código sin que se note, porque el build de Vercel ignora errores de tipos (`ignoreBuildErrors: true` en `next.config`).

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

