from rest_framework import serializers

from .models import (Apropiacion, Articulos, AvanceProyecto, Capitulos,
                     CategoriaMinciencias, Consultoria, Contenido, Contrato,
                     CuartilEsperado, EntidadPostulo, EntregableAdministrativo,
                     EstadoProducto, EstadoProyecto, Estudiantes, Eventos,
                     Financiacion, Grupoinvestigacion, GrupoInvestigacionPro,
                     Industrial, Investigador, Libros, Licencia,
                     LineaInvestigacion, ListaProducto, Maestria,
                     ModalidadProyecto, Origen, Posgrado, PregFinalizadoyCurso,
                     Pregrado, Producto, Proyecto, Reconocimientos,
                     RolProducto, Software, Transacciones, Ubicacion,
                     UbicacionProyecto, UnidadAcademica)

#------------------------ investigador ------------------------

class investigadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investigador
        fields = '__all__'

class ubicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = '__all__'

class grupoinvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupoinvestigacion
        fields = '__all__'

class pregradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregrado
        fields = '__all__'

class posgradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posgrado
        fields = '__all__'

#------------------------ PRODUCTOS ------------------------
class eventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = '__all__'

class articulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulos
        fields = '__all__'

class capitulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capitulos
        fields = '__all__'

class librosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libros
        fields = '__all__'

class softwareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Software
        fields = '__all__'

class industrialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Industrial
        fields = '__all__'

class reconocimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reconocimientos
        fields = '__all__'

class licenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licencia
        fields = '__all__'

class apropiacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apropiacion
        fields = '__all__'

class contratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = '__all__'

class consultoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultoria
        fields = '__all__'

class contenidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contenido
        fields = '__all__'

class pregFinalizadoyCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PregFinalizadoyCurso
        fields = '__all__'

class maestriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maestria
        fields = '__all__'

class listaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListaProducto
        fields = '__all__'

class rolProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolProducto
        fields = '__all__'

class cuartilEsperadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuartilEsperado
        fields = '__all__'

class categoriaMincienciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaMinciencias
        fields = '__all__'

class estudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = '__all__'

class estadoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoProducto
        fields = '__all__'

class productoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

#------------------------ PROYECTOS ------------------------

class unidadAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadAcademica
        fields = '__all__'

class entidadPostuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntidadPostulo
        fields = '__all__'

class financiacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financiacion
        fields = '__all__'

class grupoInvestigacionCoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoInvestigacionPro
        fields = '__all__'

class transaccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacciones
        fields = '__all__'

class origenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Origen
        fields = '__all__'

class ubicacionProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UbicacionProyecto
        fields = '__all__'

class estadoProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoProyecto
        fields = '__all__'

class modalidadProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModalidadProyecto
        fields = '__all__'

class avanceProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvanceProyecto
        fields = '__all__'

class lineaInvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineaInvestigacion
        fields = '__all__'

class entregableAdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntregableAdministrativo
        fields = '__all__'

class proyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'


















