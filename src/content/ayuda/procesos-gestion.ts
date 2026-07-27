import type { ModuloAyuda } from '@/types/ayuda';

export const moduloProcesosGestion: ModuloAyuda = {
  slug: 'procesos-gestion',
  titulo: 'Procesos y Sistemas de Gestión',
  descripcion:
    'Procesos documentados, matriz de riesgos y checklist de cumplimiento normativo (ISO 9001, SARLAFT/SAGRILAFT, PTEE) — la base del paquete de Evidencia de auditoría.',
  paginas: [
    {
      slug: 'indice',
      ruta: '/procesos-gestion',
      titulo: 'Procesos y Sistemas de Gestión',
      resumen:
        'Tres bloques en una sola pantalla: procesos documentados, matriz de riesgos y controles, y checklist de cumplimiento por marco normativo.',
      camposYBotones: [
        {
          nombre: 'Procesos documentados',
          explicacion: 'Área/proceso, nombre, descripción y versión. Registra qué procesos de la empresa ya están documentados y cuándo se actualizaron por última vez.',
        },
        {
          nombre: 'Matriz de riesgos y controles',
          explicacion: 'Cada riesgo con su marco normativo (ISO 9001, SARLAFT/SAGRILAFT, PTEE o interno), probabilidad, impacto y el control asociado para mitigarlo.',
        },
        {
          nombre: 'Checklist de cumplimiento',
          explicacion: 'Ítems por marco normativo (ISO 9001, SARLAFT/SAGRILAFT, PTEE) con estado (Cumple / Cumple parcial / No cumple / No aplica) y un archivo de evidencia adjunto opcional.',
        },
        {
          nombre: 'Adjuntar evidencia (clip)',
          explicacion: 'Al crear un ítem de checklist, se puede subir un archivo que respalda el cumplimiento — queda guardado en un bucket privado y se incluye en el paquete de Evidencia de auditoría.',
        },
      ],
      notas: [
        'Pueden ver esta pantalla: admin_th, líder y gerencia. Editar (agregar/eliminar procesos, riesgos e ítems, cambiar el estado del checklist) es exclusivo de admin_th.',
        'Todo lo que se registra aquí alimenta directamente el informe Evidencia de auditoría (Informes → Evidencia de auditoría), sin necesidad de volver a cargarlo.',
      ],
    },
  ],
};
