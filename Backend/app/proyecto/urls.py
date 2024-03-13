from django.urls import path

from .autentication import (ActualizarDatosUsuario, CrearNuevoProducto,
                            CrearProyecto, CustomAuthToken)
from .viewsets import (apropiacionList, apropiacionRetrieveUpdateDestroy,
                       articuloRetrieveUpdateDestroy, articulosList,
                       avanceProyectoList, avanceProyectoRetrieveUpdateDestroy,
                       capituloRetrieveUpdateDestroy, capitulosList,
                       coinvestigadorList, coinvestigadorRetrieveUpdateDestroy,
                       consultoriaList, consultoriaRetrieveUpdateDestroy,
                       contenidoList, contenidoRetrieveUpdateDestroy,
                       contratoList, contratoRetrieveUpdateDestroy,
                       entidadPostuloList, entidadPostuloRetrieveUpdateDestroy,
                       entregableAdministrativoList,
                       entregableAdministrativoRetrieveUpdateDestroy,
                       estadoProyectoList, estadoProyectoRetrieveUpdateDestroy,
                       estudiantesList, estudiantesRetrieveUpdateDestroy,
                       eventoRetrieveUpdateDestroy, eventosList,
                       financiacionList, financiacionRetrieveUpdateDestroy,
                       grupoInvestigacionCoList, grupoInvestigacionList,
                       grupoInvestigacionRetrieveUpdateDestroy, imagenList,
                       imagenRetrieveUpdateDestroy, industrialList,
                       industrialRetrieveUpdateDestroy, investigadorList,
                       investigadorRetrieveUpdateDestroy,
                       libroRetrieveUpdateDestroy, librosList, licenciaList,
                       licenciaRetrieveUpdateDestroy, lineaInvestigacionList,
                       lineaInvestigacionRetrieveUpdateDestroy,
                       listaProductoList, listaProductoRetrieveUpdateDestroy,
                       maeestriaList, maeestriaRetrieveUpdateDestroy,
                       modalidadProyectoList,
                       modalidadProyectoRetrieveUpdateDestroy, origenList,
                       origenRetrieveUpdateDestroy, posgradoList,
                       posgradoRetrieveUpdateDestroy, pregFinalizadoyCursoList,
                       pregFinalizadoyCursoRetrieveUpdateDestroy, pregradoList,
                       pregradoRetrieveUpdateDestroy, productoList,
                       productoRetrieveUpdateDestroy, proyectoList,
                       proyectoRetrieveUpdateDestroy,
                       reconocimientoRetrieveUpdateDestroy,
                       reconocimientosList, softwareList,
                       softwareRetrieveUpdateDestroy, transaccionesList,
                       transaccionesRetrieveUpdateDestroy, ubicacionList,
                       ubicacionProyectoList,
                       ubicacionProyectoRetrieveUpdateDestroy,
                       ubicacionRetrieveUpdateDestroy, unidadAcademicaList,
                       unidadAcademicaRetrieveUpdateDestroy)

urlpatterns = [
    path('custom-token-auth/', CustomAuthToken.as_view(), name='custom_token_auth'),
    path("CrearProyecto", CrearProyecto.as_view(), name="Crear-Proyecto"),
    path("CrearProducto", CrearNuevoProducto.as_view(), name="Crear-Producto"),

    path('ActualizarInvestigador',ActualizarDatosUsuario.as_view(), name='actualizar-investigador'),
    path('investigador', investigadorList.as_view(), name='create-investigador-list'),
    path('grupoinvestigacion', grupoInvestigacionList.as_view(), name='create-grupoinvestigacion-list'),
    path('posgrado', posgradoList.as_view(), name='create-posgrado-list'),
    path('pregrado', pregradoList.as_view(), name='create-pregrado-list'),
    path('ubicacion', ubicacionList.as_view(), name='create-ubicacion-list'),
    path("coinvestigador", coinvestigadorList.as_view(), name="coinvestigador-list"),
    path('investigador/<int:pk>', investigadorRetrieveUpdateDestroy.as_view(), name='investigador-detail'),
    path('coinvestigador/<int:pk>', coinvestigadorRetrieveUpdateDestroy.as_view(), name='coinvestigador-detail'),
    path('grupoinvestigacion/<int:pk>', grupoInvestigacionRetrieveUpdateDestroy.as_view(), name='grupoinvestigacion-detail'),
    path('posgrado/<int:pk>', posgradoRetrieveUpdateDestroy.as_view(), name='posgrado-detail'),
    path('pregrado/<int:pk>', pregradoRetrieveUpdateDestroy.as_view(), name='pregrado-detail'),
    path('ubicacion/<int:pk>', ubicacionRetrieveUpdateDestroy.as_view(), name='ubicacion-detail'),
    path('evento', eventosList.as_view(), name='create-evento-list'),
    path('articulo', articulosList.as_view(), name='create-articulo-list'),
    path('capitulo', capitulosList.as_view(), name='create-capitulo-list'),
    path('libro', librosList.as_view(), name='create-libro-list'),
    path('software', softwareList.as_view(), name='create-software-list'),
    path('industrial', industrialList.as_view(), name='create-industrial-list'),
    path('reconocimiento', reconocimientosList.as_view(), name='create-reconocimiento-list'),
    path('licencia', licenciaList.as_view(), name='create-licencia-list'),
    path('apropiacion', apropiacionList.as_view(), name='create-apropiacion-list'),
    path('contrato', contratoList.as_view(), name='create-contrato-list'),
    path('consultoria', consultoriaList.as_view(), name='create-consultoria-list'),
    path('contenido', contenidoList.as_view(), name='create-contenido-list'),
    path('pregFinalizadoyCurso', pregFinalizadoyCursoList.as_view(), name='create-pregFinalizadoyCurso-list'),
    path('maestria', maeestriaList.as_view(), name='create-maestria-list'),
    path('listaProducto', listaProductoList.as_view(), name='create-listaProducto-list'),
    path('estudiantes', estudiantesList.as_view(), name='create-estudiantes-list'),
    path('producto', productoList.as_view(), name='create-producto-list'),
    path('evento/<int:pk>', eventoRetrieveUpdateDestroy.as_view(), name='evento-detail'),
    path('articulo/<int:pk>', articuloRetrieveUpdateDestroy.as_view(), name='articulo-detail'),
    path('capitulo/<int:pk>', capituloRetrieveUpdateDestroy.as_view(), name='capitulo-detail'),
    path('libro/<int:pk>', libroRetrieveUpdateDestroy.as_view(), name='libro-detail'),
    path('software/<int:pk>', softwareRetrieveUpdateDestroy.as_view(), name='software-detail'),
    path('industrial/<int:pk>', industrialRetrieveUpdateDestroy.as_view(), name='industrial-detail'),
    path('reconocimiento/<int:pk>', reconocimientoRetrieveUpdateDestroy.as_view(), name='reconocimiento-detail'),
    path('licencia/<int:pk>', licenciaRetrieveUpdateDestroy.as_view(), name='licencia-detail'),
    path('apropiacion/<int:pk>', apropiacionRetrieveUpdateDestroy.as_view(), name='apropiacion-detail'),
    path('contrato/<int:pk>', contratoRetrieveUpdateDestroy.as_view(), name='contrato-detail'),
    path('consultoria/<int:pk>', consultoriaRetrieveUpdateDestroy.as_view(), name='consultoria-detail'),
    path('contenido/<int:pk>', contenidoRetrieveUpdateDestroy.as_view(), name='contenido-detail'),
    path('pregFinalizadoyCurso/<int:pk>', pregFinalizadoyCursoRetrieveUpdateDestroy.as_view(), name='pregFinalizadoyCurso-detail'),
    path('maestria/<int:pk>', maeestriaRetrieveUpdateDestroy.as_view(), name='maestria-detail'),
    path('listaProducto/<int:pk>', listaProductoRetrieveUpdateDestroy.as_view(), name='listaProducto-detail'),
    path('estudiantes/<int:pk>', estudiantesRetrieveUpdateDestroy.as_view(), name='estudiantes-detail'),
    path('producto/<int:pk>', productoRetrieveUpdateDestroy.as_view(), name='producto-detail'),
    path('unidadAcademica', unidadAcademicaList.as_view(), name='create-unidadAcademica-list'),
    path('entidadPostulo', entidadPostuloList.as_view(), name='create-entidadPostulo-list'),
    path('financiacion', financiacionList.as_view(), name='create-financiacion-list'),
    path('grupoInvestigacionCo', grupoInvestigacionCoList.as_view(), name='create-grupoInvestigacionCo-list'),
    path('transacciones', transaccionesList.as_view(), name='create-transacciones-list'),
    path('origen', origenList.as_view(), name='create-origen-list'),
    path('ubicacionProyecto', ubicacionProyectoList.as_view(), name='create-ubicacionProyecto-list'),
    path('estadoProyecto', estadoProyectoList.as_view(), name='create-estadoProyecto-list'),
    path('modalidadProyecto', modalidadProyectoList.as_view(), name='create-modalidadProyecto-list'),
    path('avanceProyecto', avanceProyectoList.as_view(), name='create-avanceProyecto-list'),
    path('lineaInvestigacion', lineaInvestigacionList.as_view(), name='create-lineaInvestigacion-list'),
    path('entregableAdministrativo', entregableAdministrativoList.as_view(), name='create-entregableAdministrativo-list'),
    path('proyecto', proyectoList.as_view(), name='create-proyecto-list'),
    path('unidadAcademica/<int:pk>', unidadAcademicaRetrieveUpdateDestroy.as_view(), name='unidadAcademica-detail'),
    path('entidadPostulo/<int:pk>', entidadPostuloRetrieveUpdateDestroy.as_view(), name='entidadPostulo-detail'),
    path('financiacion/<int:pk>', financiacionRetrieveUpdateDestroy.as_view(), name='financiacion-detail'),
    path('grupoInvestigacionCo/<int:pk>', grupoInvestigacionRetrieveUpdateDestroy.as_view(), name='grupoInvestigacionCo-detail'),
    path('transacciones/<int:pk>', transaccionesRetrieveUpdateDestroy.as_view(), name='transacciones-detail'),
    path('origen/<int:pk>', origenRetrieveUpdateDestroy.as_view(), name='origen-detail'),
    path('ubicacionProyecto/<int:pk>', ubicacionProyectoRetrieveUpdateDestroy.as_view(), name='ubicacionProyecto-detail'),
    path('estadoProyecto/<int:pk>', estadoProyectoRetrieveUpdateDestroy.as_view(), name='estadoProyecto-detail'),
    path('modalidadProyecto/<int:pk>', modalidadProyectoRetrieveUpdateDestroy.as_view(), name='modalidadProyecto-detail'),
    path('avanceProyecto/<int:pk>', avanceProyectoRetrieveUpdateDestroy.as_view(), name='avanceProyecto-detail'),
    path('lineaInvestigacion/<int:pk>', lineaInvestigacionRetrieveUpdateDestroy.as_view(), name='lineaInvestigacion-detail'),
    path('entregableAdministrativo/<int:pk>', entregableAdministrativoRetrieveUpdateDestroy.as_view(), name='entregableAdministrativo-detail'),
    path('proyecto/<int:pk>', proyectoRetrieveUpdateDestroy.as_view(), name='proyecto-detail'),
    path('imagen', imagenList.as_view(), name='create-imagen-list'),
    path('imagen/<int:pk>', imagenRetrieveUpdateDestroy.as_view(), name='imagen-detail'),
]