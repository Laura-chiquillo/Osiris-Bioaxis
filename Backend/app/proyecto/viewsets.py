from rest_framework import generics

from .models import (apropiacion, articulos, avanceProyecto, capitulos,
                     categoriaMinciencias, consultoria, contenido, contrato,
                     cuartilEsperado, entidadPostulo, entregableAdministrativo,
                     estadoProducto, estadoProyecto, estudiantes, eventos,
                     financiacion, grupoinvestigacion, grupoInvestigacionPro,
                     industrial, investigador, libros, licencia,
                     lineaInvestigacion, listaProducto, maestria,
                     modalidadProyecto, origen, posgrado, pregFinalizadoyCurso,
                     pregrado, producto, proyecto, reconocimientos,
                     rolProducto, software, transacciones, ubicacion,
                     ubicacionProyecto, unidadAcademica)
from .serializer import (apropiacionSerializer, articulosSerializer,
                         avanceProyectoSerializer, capitulosSerializer,
                         categoriaMincienciasSerializer, consultoriaSerializer,
                         contenidoSerializer, contratoSerializer,
                         cuartilEsperadoSerializer, entidadPostuloSerializer,
                         entregableAdministrativoSerializer,
                         estadoProductoSerializer, estadoProyectoSerializer,
                         estudiantesSerializer, eventosSerializer,
                         financiacionSerializer,
                         grupoInvestigacionCoSerializer,
                         grupoinvestigacionSerializer, industrialSerializer,
                         investigadorSerializer, librosSerializer,
                         licenciaSerializer, lineaInvestigacionSerializer,
                         listaProductoSerializer, maestriaSerializer,
                         modalidadProyectoSerializer, origenSerializer,
                         posgradoSerializer, pregFinalizadoyCursoSerializer,
                         pregradoSerializer, productoSerializer,
                         proyectoSerializer, reconocimientosSerializer,
                         rolProductoSerializer, softwareSerializer,
                         transaccionesSerializer, ubicacionProyectoSerializer,
                         ubicacionSerializer, unidadAcademicaSerializer)

#------------------------ investigador ------------------------

class investigadorList(generics.ListCreateAPIView):
    queryset = investigador.objects.all()
    serializer_class = investigadorSerializer

class grupoInvestigacionList(generics.ListCreateAPIView):
    queryset = grupoinvestigacion.objects.all()
    serializer_class = grupoinvestigacionSerializer

class posgradoList(generics.ListCreateAPIView):
    queryset = posgrado.objects.all()
    serializer_class = posgradoSerializer

class pregradoList(generics.ListCreateAPIView):
    queryset = pregrado.objects.all()
    serializer_class = pregradoSerializer

class ubicacionList(generics.ListCreateAPIView):
    queryset = ubicacion.objects.all()
    serializer_class = ubicacionSerializer

class investigadorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = investigador.objects.all()
    serializer_class = investigadorSerializer

class grupoInvestigacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = grupoinvestigacion.objects.all()
    serializer_class = grupoinvestigacionSerializer

class posgradoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = posgrado.objects.all()
    serializer_class = posgradoSerializer

class pregradoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = pregrado.objects.all()
    serializer_class = pregradoSerializer

class ubicacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ubicacion.objects.all()
    serializer_class = ubicacionSerializer

#---------------------------- PRODUCTOS ----------------------------

class eventosList(generics.ListCreateAPIView):
    queryset = eventos.objects.all()
    serializer_class = eventosSerializer

class articulosList(generics.ListCreateAPIView):
    queryset = articulos.objects.all()
    serializer_class = articulosSerializer

class capitulosList(generics.ListCreateAPIView):
    queryset = capitulos.objects.all()
    serializer_class = capitulosSerializer

class librosList(generics.ListCreateAPIView):
    queryset = libros.objects.all()
    serializer_class = librosSerializer

class softwareList(generics.ListCreateAPIView):
    queryset = software.objects.all()
    serializer_class = softwareSerializer

class industrialList(generics.ListCreateAPIView):
    queryset = industrial.objects.all()
    serializer_class = industrialSerializer

class reconocimientosList(generics.ListCreateAPIView):
    queryset = reconocimientos.objects.all()
    serializer_class = reconocimientosSerializer

class licenciaList(generics.ListCreateAPIView):
    queryset = licencia.objects.all()
    serializer_class = licenciaSerializer

class apropiacionList(generics.ListCreateAPIView):
    queryset = apropiacion.objects.all()
    serializer_class = apropiacionSerializer

class contratoList(generics.ListCreateAPIView):
    queryset = contrato.objects.all()
    serializer_class = contratoSerializer

class consultoriaList(generics.ListCreateAPIView):
    queryset = consultoria.objects.all()
    serializer_class = consultoriaSerializer

class contenidoList(generics.ListCreateAPIView):
    queryset = contenido.objects.all()
    serializer_class = contenidoSerializer

class pregFinalizadoyCursoList(generics.ListCreateAPIView):
    queryset = pregFinalizadoyCurso.objects.all()
    serializer_class = pregFinalizadoyCursoSerializer

class maeestriaList(generics.ListCreateAPIView):
    queryset = maestria.objects.all()
    serializer_class = maestriaSerializer

class listaProductoList(generics.ListCreateAPIView):
    queryset = listaProducto.objects.all()
    serializer_class = listaProductoSerializer

class rolProductoList(generics.ListCreateAPIView):
    queryset = rolProducto.objects.all()
    serializer_class = rolProductoSerializer

class cuartilEsperadoList(generics.ListCreateAPIView):
    queryset = cuartilEsperado.objects.all()
    serializer_class = cuartilEsperadoSerializer

class categoriaMincienciasList(generics.ListCreateAPIView):
    queryset = categoriaMinciencias.objects.all()
    serializer_class = categoriaMincienciasSerializer

class estudiantesList(generics.ListCreateAPIView):
    queryset = estudiantes.objects.all()
    serializer_class = estudiantesSerializer

class estadoProductoList(generics.ListCreateAPIView):
    queryset = estadoProducto.objects.all()
    serializer_class = estadoProductoSerializer

class productoList(generics.ListCreateAPIView):
    queryset = producto.objects.all()
    serializer_class = productoSerializer

class eventoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = eventos.objects.all()
    serializer_class = eventosSerializer

class articuloRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = articulos.objects.all()
    serializer_class = articulosSerializer

class capituloRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = capitulos.objects.all()
    serializer_class = capitulosSerializer

class libroRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = libros.objects.all()
    serializer_class = librosSerializer

class softwareRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = software.objects.all()
    serializer_class = softwareSerializer

class industrialRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = industrial.objects.all()
    serializer_class = industrialSerializer

class reconocimientoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = reconocimientos.objects.all()
    serializer_class = reconocimientosSerializer

class licenciaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = licencia.objects.all()
    serializer_class = licenciaSerializer

class apropiacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = apropiacion.objects.all()
    serializer_class = apropiacionSerializer

class contratoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = contrato.objects.all()
    serializer_class = contratoSerializer

class consultoriaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = consultoria.objects.all()
    serializer_class = consultoriaSerializer

class contenidoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = contenido.objects.all()
    serializer_class = contenidoSerializer

class pregFinalizadoyCursoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = pregFinalizadoyCurso.objects.all()
    serializer_class = pregFinalizadoyCursoSerializer

class maeestriaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = maestria.objects.all()
    serializer_class = maestriaSerializer

class listaProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = listaProducto.objects.all()
    serializer_class = listaProductoSerializer

class rolProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = rolProducto.objects.all()
    serializer_class = rolProductoSerializer

class cuartilEsperadoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = cuartilEsperado.objects.all()
    serializer_class = cuartilEsperadoSerializer

class categoriaMincienciasRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = categoriaMinciencias.objects.all()
    serializer_class = categoriaMincienciasSerializer

class estudiantesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = estudiantes.objects.all()
    serializer_class = estudiantesSerializer

class estadoProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = estadoProducto.objects.all()
    serializer_class = estadoProductoSerializer

class productoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = producto.objects.all()
    serializer_class = productoSerializer

#---------------------------- PROYECTOS ----------------------------

class unidadAcademicaList(generics.ListCreateAPIView):
    queryset = unidadAcademica.objects.all()
    serializer_class = unidadAcademicaSerializer

class entidadPostuloList(generics.ListCreateAPIView):
    queryset = entidadPostulo.objects.all()
    serializer_class = entidadPostuloSerializer

class financiacionList(generics.ListCreateAPIView):
    queryset = financiacion.objects.all()
    serializer_class = financiacionSerializer

class grupoInvestigacionCoList(generics.ListCreateAPIView):
    queryset = grupoInvestigacionPro.objects.all()
    serializer_class = grupoInvestigacionCoSerializer

class transaccionesList(generics.ListCreateAPIView):
    queryset = transacciones.objects.all()
    serializer_class = transaccionesSerializer

class origenList(generics.ListCreateAPIView):
    queryset = origen.objects.all()
    serializer_class = origenSerializer

class ubicacionProyectoList(generics.ListCreateAPIView):
    queryset = ubicacionProyecto.objects.all()
    serializer_class = ubicacionProyectoSerializer

class estadoProyectoList(generics.ListCreateAPIView):
    queryset = estadoProyecto.objects.all()
    serializer_class = estadoProyectoSerializer

class modalidadProyectoList(generics.ListCreateAPIView):
    queryset = modalidadProyecto.objects.all()
    serializer_class = modalidadProyectoSerializer

class avanceProyectoList(generics.ListCreateAPIView):
    queryset = avanceProyecto.objects.all()
    serializer_class = avanceProyectoSerializer

class lineaInvestigacionList(generics.ListCreateAPIView):
    queryset = lineaInvestigacion.objects.all()
    serializer_class = lineaInvestigacionSerializer

class entregableAdministrativoList(generics.ListCreateAPIView):
    queryset = entregableAdministrativo.objects.all()
    serializer_class = entregableAdministrativoSerializer

class proyectoList(generics.ListCreateAPIView):
    queryset = proyecto.objects.all()
    serializer_class = proyectoSerializer

class unidadAcademicaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = unidadAcademica.objects.all()
    serializer_class = unidadAcademicaSerializer

class entidadPostuloRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = entidadPostulo.objects.all()
    serializer_class = entidadPostuloSerializer

class financiacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = financiacion.objects.all()
    serializer_class = financiacionSerializer

class grupoInvestigacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = grupoInvestigacionPro.objects.all()
    serializer_class = grupoInvestigacionCoSerializer

class transaccionesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = transacciones.objects.all()
    serializer_class = transaccionesSerializer

class origenRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = origen.objects.all()
    serializer_class = origenSerializer

class ubicacionProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ubicacionProyecto.objects.all()
    serializer_class = ubicacionProyectoSerializer

class estadoProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = estadoProyecto.objects.all()
    serializer_class = estadoProyectoSerializer

class modalidadProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = modalidadProyecto.objects.all()
    serializer_class = modalidadProyectoSerializer

class avanceProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = avanceProyecto.objects.all()
    serializer_class = avanceProyectoSerializer

class lineaInvestigacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = lineaInvestigacion.objects.all()
    serializer_class = lineaInvestigacionSerializer

class entregableAdministrativoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = entregableAdministrativo.objects.all()
    serializer_class = entregableAdministrativoSerializer

class proyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = proyecto.objects.all()
    serializer_class = proyectoSerializer
