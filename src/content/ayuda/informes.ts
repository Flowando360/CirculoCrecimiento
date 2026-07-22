import type { ModuloAyuda } from '@/types/ayuda';

export const moduloInformes: ModuloAyuda = {
  slug: 'informes',
  titulo: 'Informes',
  descripcion: 'Los cuatro informes del sistema, todos exportables a PDF y Excel.',
  paginas: [
    {
      slug: 'indice',
      ruta: '/informes',
      titulo: 'Informes',
      resumen: 'Punto de entrada a los cuatro informes disponibles, filtrados según lo que tu rol puede ver.',
      camposYBotones: [
        { nombre: 'Tarjeta de informe', explicacion: 'Clic para entrar. Solo aparecen los informes que tu rol tiene permitido consultar.' },
      ],
    },
    {
      slug: 'evaluacion-360',
      ruta: '/informes/360',
      titulo: 'Encuentro de Crecimiento 360° Integrado',
      resumen: 'Resultado consolidado de Ser, Saber, Hacer y Deber de una persona, con el detalle de lo que respondió cada acompañante.',
      camposYBotones: [
        { nombre: 'Filtro por persona', explicacion: 'admin_th, líder y gerencia pueden elegir a quién consultar; un colaborador solo ve el suyo.' },
        { nombre: 'Exportar PDF / Exportar Excel', explicacion: 'Descarga el informe completo en el formato elegido.' },
      ],
    },
    {
      slug: 'pdi',
      ruta: '/informes/pdi',
      titulo: 'Informe de Plan de Desarrollo Individual',
      resumen: 'Brechas detectadas, el plan de acción definido para cada una, y su estado de cumplimiento.',
      camposYBotones: [
        { nombre: 'Filtro por persona', explicacion: 'Igual que en los demás informes: según tu rol.' },
        { nombre: 'Exportar PDF / Exportar Excel', explicacion: 'Descarga del informe.' },
      ],
    },
    {
      slug: 'sst',
      ruta: '/informes/sst',
      titulo: 'Informe de Cumplimiento SST',
      resumen: 'Certificaciones, vencimientos y alertas SST abiertas, con la evidencia documental disponible.',
      camposYBotones: [{ nombre: 'Exportar PDF / Exportar Excel', explicacion: 'Descarga del informe.' }],
      notas: ['Visible para admin_th, líder y gerencia.'],
    },
    {
      slug: 'brechas',
      ruta: '/informes/brechas',
      titulo: 'Informe de Brechas por dimensión',
      resumen: 'Comparativo de Ser, Saber, Hacer y Deber por equipo o área, para priorizar dónde intervenir con formación.',
      camposYBotones: [{ nombre: 'Exportar PDF / Exportar Excel', explicacion: 'Descarga del informe.' }],
      notas: ['Visible para admin_th, líder y gerencia.'],
    },
  ],
};
