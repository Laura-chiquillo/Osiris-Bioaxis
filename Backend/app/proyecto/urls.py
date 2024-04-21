from django.urls import path

from .autentication import (ActualizarDatosUsuario, CrearNuevoProducto,
                            CrearProyecto, CustomAuthToken,
                            MostrarInvestigadores, MostrarProductos)
from .viewsets import (apropiacionList, apropiacionRetrieveUpdateDestroy,
                       articuloRetrieveUpdateDestroy, articulosList,
                       avanceProyectoList, avanceProyectoRetrieveUpdateDestroy,
                       capituloRetrieveUpdateDestroy, capitulosList,
                       categoriaMincienciasList, consultoriaList,
                       consultoriaRetrieveUpdateDestroy, contenidoList,
                       contenidoRetrieveUpdateDestroy, contratoList,
                       contratoRetrieveUpdateDestroy, cuartilEsperadoList,
                       entidadPostuloList, entidadPostuloRetrieveUpdateDestroy,
                       avanceEntregableProductoList, 
                       avanceEntregableProductoRetrieveUpdateDestroy,
                       avanceEntregableProyectoList, 
                       avanceEntregableProyectoRetrieveUpdateDestroy,
                       entregableAdministrativoProyectoList,
                       entregableAdministrativoProyectoRetrieveUpdateDestroy,
                       entregableAdministrativoProductoList,
                       entregableAdministrativoProductoRetrieveUpdateDestroy,
                       configuracionEntregableProductoList,
                       configuracionEntregableProductoRetrieveUpdateDestroy,
                       configuracionEntregableProyectoList,
                       configuracionEntregableProyectoRetrieveUpdateDestroy,
                       estadoProductoList, estadoProyectoList, estudiantesList,
                       estudiantesRetrieveUpdateDestroy,
                       eventoRetrieveUpdateDestroy, eventosList,
                       financiacionList, financiacionRetrieveUpdateDestroy,
                       grupoInvestigacionList,
                       grupoInvestigacionRetrieveUpdateDestroy, imagenList,
                       imagenRetrieveUpdateDestroy, industrialList,
                       industrialRetrieveUpdateDestroy, investigadorList,
                       investigadorRetrieveUpdateDestroy,
                       libroRetrieveUpdateDestroy, librosList, licenciaList,
                       licenciaRetrieveUpdateDestroy, listaProductoList,
                       listaProductoRetrieveUpdateDestroy, maeestriaList,
                       maeestriaRetrieveUpdateDestroy,
                       participantesExternosList, posgradoList,
                       posgradoRetrieveUpdateDestroy, pregFinalizadoyCursoList,
                       pregFinalizadoyCursoRetrieveUpdateDestroy, pregradoList,
                       pregradoRetrieveUpdateDestroy, productoList,
                       productoRetrieveUpdateDestroy, proyectoList,
                       proyectoRetrieveUpdateDestroy,
                       reconocimientoRetrieveUpdateDestroy,
                       reconocimientosList, softwareList,
                       softwareRetrieveUpdateDestroy, tipoEventoList,
                       transaccionesList, transaccionesRetrieveUpdateDestroy,
                       ubicacionList, ubicacionProyectoList,
                       ubicacionProyectoRetrieveUpdateDestroy,
                       ubicacionRetrieveUpdateDestroy)

urlpatterns = [
    path('custom-token-auth/', CustomAuthToken.as_view(), name='custom_token_auth'),
    path("CrearProyecto", CrearProyecto.as_view(), name="Crear-Proyecto"),
    path("CrearProducto", CrearNuevoProducto.as_view(), name="Crear-NuevoProducto"),
    path('ActualizarInvestigador',ActualizarDatosUsuario.as_view(), name='actualizar-investigador'),
    path("mostrarInvestigador", MostrarInvestigadores.as_view(), name="mostrar-NuevoinvestigadoresP"),
    path("mostrarProductos", MostrarProductos.as_view(), name="mostrar-NuevoProductos"),

    path('participantesExternos', participantesExternosList.as_view(), name='create-participantesExternos-list'),
    path('cuartilEsperado', cuartilEsperadoList.as_view(), name='create-cuartilEsperado-list'),
    path('categoriaMinciencias', categoriaMincienciasList.as_view(), name='create-CategoriaMinciencias-list'),
    path('tipoEventos', tipoEventoList.as_view(), name='create-tipoEventos-list'),
    path('estadoproducto', estadoProductoList.as_view(), name='create-estadoProducto-list'),
    path('estadoproyecto', estadoProyectoList.as_view(), name='create-estadoProyecto-list'),


    path('investigador', investigadorList.as_view(), name='create-investigador-list'),
    path('grupoinvestigacion', grupoInvestigacionList.as_view(), name='create-grupoinvestigacion-list'),
    path('posgrado', posgradoList.as_view(), name='create-posgrado-list'),
    path('pregrado', pregradoList.as_view(), name='create-pregrado-list'),
    path('ubicacion', ubicacionList.as_view(), name='create-ubicacion-list'),
    path('investigador/<int:pk>', investigadorRetrieveUpdateDestroy.as_view(), name='investigador-detail'),
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
    path('producto/<pk>', productoRetrieveUpdateDestroy.as_view(), name='producto-detail'),
    path('entidadPostulo', entidadPostuloList.as_view(), name='create-entidadPostulo-list'),
    path('avanceEntregableProducto', avanceEntregableProductoList.as_view(), name='create-avanceEntregableProducto-list'),
    path('avanceEntregableProyecto', avanceEntregableProyectoList.as_view(), name='create-avanceEntregableProyecto-list'),
    path('financiacion', financiacionList.as_view(), name='create-financiacion-list'),
    path('transacciones', transaccionesList.as_view(), name='create-transacciones-list'),
    path('ubicacionProyecto', ubicacionProyectoList.as_view(), name='create-ubicacionProyecto-list'),
    path('avanceProyecto', avanceProyectoList.as_view(), name='create-avanceProyecto-list'),
    path('entregableAdministrativoProyecto', entregableAdministrativoProyectoList.as_view(), name='create-entregableAdministrativoProyecto-list'),
    path('entregableAdministrativoProducto', entregableAdministrativoProductoList.as_view(), name='create-entregableAdministrativoProducto-list'),
    path('configuracionEntregableProducto', configuracionEntregableProductoList.as_view(), name='create-configuracionEntregableProducto-list'),
    path('configuracionEntregableProyecto', configuracionEntregableProyectoList.as_view(), name='create-configuracionEntregableProyecto-list'),
    path('proyecto', proyectoList.as_view(), name='create-proyecto-list'),
    path('entidadPostulo/<int:pk>', entidadPostuloRetrieveUpdateDestroy.as_view(), name='entidadPostulo-detail'),
    path('avanceEntregableProducto/<int:pk>', avanceEntregableProductoRetrieveUpdateDestroy.as_view(), name='avanceEntregableProducto-detail'),
    path('avanceEntregableProyecto/<int:pk>', avanceEntregableProyectoRetrieveUpdateDestroy.as_view(), name='avanceEntregableProyecto-detail'),
    path('financiacion/<int:pk>', financiacionRetrieveUpdateDestroy.as_view(), name='financiacion-detail'),
    path('grupoInvestigacionCo/<int:pk>', grupoInvestigacionRetrieveUpdateDestroy.as_view(), name='grupoInvestigacionCo-detail'),
    path('transacciones/<int:pk>', transaccionesRetrieveUpdateDestroy.as_view(), name='transacciones-detail'),
    path('ubicacionProyecto/<int:pk>', ubicacionProyectoRetrieveUpdateDestroy.as_view(), name='ubicacionProyecto-detail'),
    path('avanceProyecto/<int:pk>', avanceProyectoRetrieveUpdateDestroy.as_view(), name='avanceProyecto-detail'),
    path('entregableAdministrativoProyecto/<pk>', entregableAdministrativoProyectoRetrieveUpdateDestroy.as_view(), name='entregableAdministrativoProyecto-detail'),
    path('entregableAdministrativoProducto/<pk>', entregableAdministrativoProductoRetrieveUpdateDestroy.as_view(), name='entregableAdministrativoProducto-detail'),
    path('configuracionEntregableProducto/<pk>', configuracionEntregableProductoRetrieveUpdateDestroy.as_view(), name='configuracionEntregableProducto-detail'),
    path('configuracionEntregableProyecto/<pk>', configuracionEntregableProyectoRetrieveUpdateDestroy.as_view(), name='configuracionEntregableProyecto-detail'),
    path('proyecto/<pk>', proyectoRetrieveUpdateDestroy.as_view(), name='proyecto-detail'),
    path('imagen', imagenList.as_view(), name='create-imagen-list'),
    path('imagen/<int:pk>', imagenRetrieveUpdateDestroy.as_view(), name='imagen-detail'),
]