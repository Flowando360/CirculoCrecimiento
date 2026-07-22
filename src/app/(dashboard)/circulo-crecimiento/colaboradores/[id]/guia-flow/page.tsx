import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getPerfilActual } from '@/lib/supabase/get-perfil-actual';
import { obtenerUrlFirmadaGuiaFlow } from '@/lib/supabase/storage';
import { ListaAspectosSer, type AspectoConDatos } from '@/components/circulo-crecimiento/lista-aspectos-ser';
import { BotonCrearGuiaFlow, SubirPdfGuiaFlow, ComentarioGeneralSer } from '@/components/circulo-crecimiento/panel-guia-flow';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { BloqueSer } from '@/types/colaborador';

const BLOQUES: { valor: BloqueSer; titulo: string }[] = [
  { valor: 'esencia', titulo: 'Esencia / Sello' },
  { valor: 'emociones', titulo: 'Emociones' },
  { valor: 'pertenencia_compromiso', titulo: 'Pertenencia y Compromiso' },
  { valor: 'desafios', titulo: 'Desafíos' },
];

export default async function GuiaDelFlowPage({ params }: { params: { id: string } }) {
  const perfil = await getPerfilActual();
  if (!perfil) return null;

  const supabase = createClient();

  const { data: colaborador } = await supabase
    .from('colaboradores')
    .select('id, nombre_completo, lider_id, empresa_id')
    .eq('id', params.id)
    .maybeSingle();

  if (!colaborador || colaborador.empresa_id !== perfil.empresa_id) notFound();

  const esAdminTh = perfil.rol === 'admin_th';
  const puedeVer =
    esAdminTh ||
    (perfil.rol === 'lider' && colaborador.lider_id === perfil.colaborador_id) ||
    (perfil.rol === 'colaborador' && perfil.colaborador_id === colaborador.id);
  if (!puedeVer) notFound();

  const puedeComentar = perfil.rol === 'colaborador' && perfil.colaborador_id === colaborador.id;

  const { data: guia } = await supabase
    .from('guia_del_flow')
    .select('id, fecha_aplicacion, documento_pdf_url')
    .eq('colaborador_id', params.id)
    .order('fecha_aplicacion', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const urlFirmada = await obtenerUrlFirmadaGuiaFlow(guia?.documento_pdf_url ?? null);

  let bloques: { titulo: string; aspectos: AspectoConDatos[] }[] = [];
  let comentarioGeneral: string | null = null;

  if (guia) {
    const [{ data: aspectosRaw }, { data: puntajesRaw }, { data: comentariosRaw }] = await Promise.all([
      supabase.from('ser_aspectos').select('id, bloque, nombre, orden').eq('empresa_id', perfil.empresa_id).order('orden'),
      supabase.from('ser_puntajes').select('aspecto_id, puntaje').eq('guia_del_flow_id', guia.id),
      supabase.from('ser_comentarios_colaborador').select('aspecto_id, comentario').eq('guia_del_flow_id', guia.id),
    ]);

    const puntajePorAspecto = new Map(((puntajesRaw ?? []) as any[]).map((p) => [p.aspecto_id, p.puntaje as number]));
    const comentarioPorAspecto = new Map(((comentariosRaw ?? []) as any[]).map((c) => [c.aspecto_id, c.comentario as string]));
    comentarioGeneral = comentarioPorAspecto.get(null) ?? null;

    bloques = BLOQUES.map(({ valor, titulo }) => ({
      titulo,
      aspectos: ((aspectosRaw ?? []) as any[])
        .filter((a) => a.bloque === valor)
        .map((a) => ({
          id: a.id,
          nombre: a.nombre,
          puntaje: puntajePorAspecto.get(a.id) ?? null,
          comentario: comentarioPorAspecto.get(a.id) ?? null,
        })),
    }));
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href={`/circulo-crecimiento/colaboradores/${params.id}`}
          className="inline-flex items-center gap-1 text-xs text-marmol-400 hover:text-marmol-600 mb-2"
        >
          <ArrowLeft size={12} /> Volver a la ficha
        </Link>
        <h1 className="font-display text-2xl font-semibold text-secundario flex items-center gap-2">
          <Sparkles size={22} className="text-ser" /> Guía del Flow
        </h1>
        <p className="text-sm text-marmol-500 mt-1">{colaborador.nombre_completo}</p>
      </div>

      {!guia ? (
        <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center">
          <Sparkles size={28} className="text-marmol-300" />
          <p className="text-sm font-medium text-marmol-700">Sin Guía del Flow registrada todavía</p>
          {esAdminTh && (
            <>
              <p className="text-xs text-marmol-400 max-w-sm">
                Crea la primera aplicación para empezar a cargar el PDF y los puntajes.
              </p>
              <BotonCrearGuiaFlow colaboradorId={params.id} />
            </>
          )}
        </div>
      ) : (
        <>
          <div className="card p-4 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-marmol-500">Aplicación del {guia.fecha_aplicacion}</p>
              {esAdminTh && <BotonCrearGuiaFlow colaboradorId={params.id} />}
            </div>
            {esAdminTh ? (
              <SubirPdfGuiaFlow colaboradorId={params.id} guiaDelFlowId={guia.id} urlActual={urlFirmada} />
            ) : urlFirmada ? (
              <a href={urlFirmada} target="_blank" rel="noreferrer" className="text-sm text-flow-600 hover:underline">
                Ver PDF de mi Guía del Flow
              </a>
            ) : (
              <p className="text-sm text-marmol-400">Aún no se ha cargado el PDF.</p>
            )}
          </div>

          <ComentarioGeneralSer
            colaboradorId={params.id}
            guiaDelFlowId={guia.id}
            comentarioInicial={comentarioGeneral}
            puedeComentar={puedeComentar}
          />

          {bloques.map(({ titulo, aspectos }) => (
            <div key={titulo} className="card p-5">
              <h2 className="font-display font-semibold text-secundario mb-3">{titulo}</h2>
              <ListaAspectosSer
                colaboradorId={params.id}
                guiaDelFlowId={guia.id}
                aspectos={aspectos}
                puedeEditarPuntaje={esAdminTh}
                puedeComentar={puedeComentar}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
