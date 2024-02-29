from http.client import responses
import statistics
from telnetlib import STATUS
from urllib import response
from django.forms import ValidationError
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from .models import (Apropiacion, Articulos, AvanceProyecto, Capitulos,
                     CategoriaMinciencias, Coinvestigador, Consultoria,
                     Contenido, Contrato, CuartilEsperado, EntidadPostulo,
                     EntregableAdministrativo, EstadoProducto, EstadoProyecto,
                     Estudiantes, Eventos, Financiacion, Grupoinvestigacion,
                     GrupoInvestigacionPro, Imagen, Industrial, Investigador,
                     Libros, Licencia, LineaInvestigacion, ListaProducto,
                     Maestria, ModalidadProyecto, Origen, Posgrado,
                     PregFinalizadoyCurso, Pregrado, Producto, Proyecto,
                     Reconocimientos, RolProducto, Software, Transacciones,
                     Ubicacion, UbicacionProyecto, UnidadAcademica)
from .serializer import (apropiacionSerializer, articulosSerializer,
                         avanceProyectoSerializer, capitulosSerializer,
                         categoriaMincienciasSerializer,
                         coinvestigadorSerializer, consultoriaSerializer,
                         contenidoSerializer, contratoSerializer,
                         cuartilEsperadoSerializer, entidadPostuloSerializer,
                         entregableAdministrativoSerializer,
                         estadoProductoSerializer, estadoProyectoSerializer,
                         estudiantesSerializer, eventosSerializer,
                         financiacionSerializer,
                         grupoInvestigacionCoSerializer,
                         grupoinvestigacionSerializer, imagenSerializer,
                         industrialSerializer, investigadorSerializer,
                         librosSerializer, licenciaSerializer,
                         lineaInvestigacionSerializer, listaProductoSerializer,
                         maestriaSerializer, modalidadProyectoSerializer,
                         origenSerializer, posgradoSerializer,
                         pregFinalizadoyCursoSerializer, pregradoSerializer,
                         productoSerializer, proyectoSerializer,
                         reconocimientosSerializer, rolProductoSerializer,
                         softwareSerializer, transaccionesSerializer,
                         ubicacionProyectoSerializer, ubicacionSerializer,
                         unidadAcademicaSerializer)

#------------------------ investigador ------------------------

class investigadorList(generics.ListCreateAPIView):
    queryset = Investigador.objects.all()
    serializer_class = investigadorSerializer
    
class imagenList(generics.ListCreateAPIView):
    queryset = Imagen.objects.all()
    serializer_class = imagenSerializer

class grupoInvestigacionList(generics.ListCreateAPIView):
    queryset = Grupoinvestigacion.objects.all()
    serializer_class = grupoinvestigacionSerializer

class posgradoList(generics.ListCreateAPIView):
    queryset = Posgrado.objects.all()
    serializer_class = posgradoSerializer

class pregradoList(generics.ListCreateAPIView):
    queryset = Pregrado.objects.all()
    serializer_class = pregradoSerializer

class ubicacionList(generics.ListCreateAPIView):
    queryset = Ubicacion.objects.all()
    serializer_class = ubicacionSerializer

class investigadorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investigador.objects.all()
    serializer_class = investigadorSerializer

class imagenRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Imagen.objects.all()
    serializer_class = imagenSerializer

class grupoInvestigacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Grupoinvestigacion.objects.all()
    serializer_class = grupoinvestigacionSerializer

class posgradoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posgrado.objects.all()
    serializer_class = posgradoSerializer

class pregradoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pregrado.objects.all()
    serializer_class = pregradoSerializer

class ubicacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ubicacion.objects.all()
    serializer_class = ubicacionSerializer


#---------------------------- PRODUCTOS ----------------------------

class eventosList(generics.ListCreateAPIView):
    queryset = Eventos.objects.all()
    serializer_class = eventosSerializer

class articulosList(generics.ListCreateAPIView):
    queryset = Articulos.objects.all()
    serializer_class = articulosSerializer

class capitulosList(generics.ListCreateAPIView):
    queryset = Capitulos.objects.all()
    serializer_class = capitulosSerializer

class librosList(generics.ListCreateAPIView):
    queryset = Libros.objects.all()
    serializer_class = librosSerializer

class softwareList(generics.ListCreateAPIView):
    queryset = Software.objects.all()
    serializer_class = softwareSerializer

class industrialList(generics.ListCreateAPIView):
    queryset = Industrial.objects.all()
    serializer_class = industrialSerializer

class reconocimientosList(generics.ListCreateAPIView):
    queryset = Reconocimientos.objects.all()
    serializer_class = reconocimientosSerializer

class licenciaList(generics.ListCreateAPIView):
    queryset = Licencia.objects.all()
    serializer_class = licenciaSerializer

class apropiacionList(generics.ListCreateAPIView):
    queryset = Apropiacion.objects.all()
    serializer_class = apropiacionSerializer

class contratoList(generics.ListCreateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = contratoSerializer

class consultoriaList(generics.ListCreateAPIView):
    queryset = Consultoria.objects.all()
    serializer_class = consultoriaSerializer

class contenidoList(generics.ListCreateAPIView):
    queryset = Contenido.objects.all()
    serializer_class = contenidoSerializer

class pregFinalizadoyCursoList(generics.ListCreateAPIView):
    queryset = PregFinalizadoyCurso.objects.all()
    serializer_class = pregFinalizadoyCursoSerializer

class maeestriaList(generics.ListCreateAPIView):
    queryset = Maestria.objects.all()
    serializer_class = maestriaSerializer

class listaProductoList(generics.ListCreateAPIView):
    queryset = ListaProducto.objects.all()
    serializer_class = listaProductoSerializer

class rolProductoList(generics.ListCreateAPIView):
    queryset = RolProducto.objects.all()
    serializer_class = rolProductoSerializer

class cuartilEsperadoList(generics.ListCreateAPIView):
    queryset = CuartilEsperado.objects.all()
    serializer_class = cuartilEsperadoSerializer

class categoriaMincienciasList(generics.ListCreateAPIView):
    queryset = CategoriaMinciencias.objects.all()
    serializer_class = categoriaMincienciasSerializer

class estudiantesList(generics.ListCreateAPIView):
    queryset = Estudiantes.objects.all()
    serializer_class = estudiantesSerializer

class estadoProductoList(generics.ListCreateAPIView):
    queryset = EstadoProducto.objects.all()
    serializer_class = estadoProductoSerializer

class productoList(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = productoSerializer

class eventoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Eventos.objects.all()
    serializer_class = eventosSerializer

class articuloRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articulos.objects.all()
    serializer_class = articulosSerializer

class capituloRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Capitulos.objects.all()
    serializer_class = capitulosSerializer

class libroRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Libros.objects.all()
    serializer_class = librosSerializer

class softwareRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Software.objects.all()
    serializer_class = softwareSerializer

class industrialRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Industrial.objects.all()
    serializer_class = industrialSerializer

class reconocimientoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reconocimientos.objects.all()
    serializer_class = reconocimientosSerializer

class licenciaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Licencia.objects.all()
    serializer_class = licenciaSerializer

class apropiacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Apropiacion.objects.all()
    serializer_class = apropiacionSerializer

class contratoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contrato.objects.all()
    serializer_class = contratoSerializer

class consultoriaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Consultoria.objects.all()
    serializer_class = consultoriaSerializer

class contenidoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contenido.objects.all()
    serializer_class = contenidoSerializer

class pregFinalizadoyCursoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = PregFinalizadoyCurso.objects.all()
    serializer_class = pregFinalizadoyCursoSerializer

class maeestriaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Maestria.objects.all()
    serializer_class = maestriaSerializer

class listaProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListaProducto.objects.all()
    serializer_class = listaProductoSerializer

class rolProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = RolProducto.objects.all()
    serializer_class = rolProductoSerializer

class cuartilEsperadoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CuartilEsperado.objects.all()
    serializer_class = cuartilEsperadoSerializer

class categoriaMincienciasRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoriaMinciencias.objects.all()
    serializer_class = categoriaMincienciasSerializer

class estudiantesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estudiantes.objects.all()
    serializer_class = estudiantesSerializer

class estadoProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = EstadoProducto.objects.all()
    serializer_class = estadoProductoSerializer

class productoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = productoSerializer

#---------------------------- PROYECTOS ----------------------------

class unidadAcademicaList(generics.ListCreateAPIView):
    queryset = UnidadAcademica.objects.all()
    serializer_class = unidadAcademicaSerializer

class coinvestigadorList(generics.ListCreateAPIView):
    queryset = Coinvestigador.objects.all()
    serializer_class = coinvestigadorSerializer

class entidadPostuloList(generics.ListCreateAPIView):
    queryset = EntidadPostulo.objects.all()
    serializer_class = entidadPostuloSerializer

class financiacionList(generics.ListCreateAPIView):
    queryset = Financiacion.objects.all()
    serializer_class = financiacionSerializer

class grupoInvestigacionCoList(generics.ListCreateAPIView):
    queryset = GrupoInvestigacionPro.objects.all()
    serializer_class = grupoInvestigacionCoSerializer

class transaccionesList(generics.ListCreateAPIView):
    queryset = Transacciones.objects.all()
    serializer_class = transaccionesSerializer

class origenList(generics.ListCreateAPIView):
    queryset = Origen.objects.all()
    serializer_class = origenSerializer

class ubicacionProyectoList(generics.ListCreateAPIView):
    queryset = UbicacionProyecto.objects.all()
    serializer_class = ubicacionProyectoSerializer

class estadoProyectoList(generics.ListCreateAPIView):
    queryset = EstadoProyecto.objects.all()
    serializer_class = estadoProyectoSerializer

class modalidadProyectoList(generics.ListCreateAPIView):
    queryset = ModalidadProyecto.objects.all()
    serializer_class = modalidadProyectoSerializer

class avanceProyectoList(generics.ListCreateAPIView):
    queryset = AvanceProyecto.objects.all()
    serializer_class = avanceProyectoSerializer

class lineaInvestigacionList(generics.ListCreateAPIView):
    queryset = LineaInvestigacion.objects.all()
    serializer_class = lineaInvestigacionSerializer

class entregableAdministrativoList(generics.ListCreateAPIView):
    queryset = EntregableAdministrativo.objects.all()
    serializer_class = entregableAdministrativoSerializer

class proyectoList(generics.ListCreateAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = proyectoSerializer

class unidadAcademicaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UnidadAcademica.objects.all()
    serializer_class = unidadAcademicaSerializer

class entidadPostuloRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = EntidadPostulo.objects.all()
    serializer_class = entidadPostuloSerializer

class financiacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Financiacion.objects.all()
    serializer_class = financiacionSerializer

class grupoInvestigacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = GrupoInvestigacionPro.objects.all()
    serializer_class = grupoInvestigacionCoSerializer

class transaccionesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transacciones.objects.all()
    serializer_class = transaccionesSerializer

class origenRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Origen.objects.all()
    serializer_class = origenSerializer

class ubicacionProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UbicacionProyecto.objects.all()
    serializer_class = ubicacionProyectoSerializer

class estadoProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = EstadoProyecto.objects.all()
    serializer_class = estadoProyectoSerializer

class modalidadProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModalidadProyecto.objects.all()
    serializer_class = modalidadProyectoSerializer

class avanceProyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = AvanceProyecto.objects.all()
    serializer_class = avanceProyectoSerializer

class lineaInvestigacionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = LineaInvestigacion.objects.all()
    serializer_class = lineaInvestigacionSerializer

class entregableAdministrativoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = EntregableAdministrativo.objects.all()
    serializer_class = entregableAdministrativoSerializer

class coinvestigadorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Coinvestigador.objects.all()
    serializer_class = coinvestigadorSerializer

class proyectoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = proyectoSerializer
