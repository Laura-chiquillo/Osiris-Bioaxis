from rest_framework import serializers

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

#------------------------ investigador ------------------------

class investigadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = investigador
        fields = '__all__'

class ubicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ubicacion
        fields = '__all__'

class grupoinvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = grupoinvestigacion
        fields = '__all__'

class pregradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = pregrado
        fields = '__all__'

class posgradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = posgrado
        fields = '__all__'

#------------------------ PRODUCTOS ------------------------
class eventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = eventos
        fields = '__all__'

class articulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = articulos
        fields = '__all__'

class capitulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = capitulos
        fields = '__all__'

class librosSerializer(serializers.ModelSerializer):
    class Meta:
        model = libros
        fields = '__all__'

class softwareSerializer(serializers.ModelSerializer):
    class Meta:
        model = software
        fields = '__all__'

class industrialSerializer(serializers.ModelSerializer):
    class Meta:
        model = industrial
        fields = '__all__'

class reconocimientosSerializer(serializers.ModelSerializer):
    class Meta:
        model = reconocimientos
        fields = '__all__'

class licenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = licencia
        fields = '__all__'

class apropiacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = apropiacion
        fields = '__all__'

class contratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = contrato
        fields = '__all__'

class consultoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = consultoria
        fields = '__all__'

class contenidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = contenido
        fields = '__all__'

class pregFinalizadoyCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = pregFinalizadoyCurso
        fields = '__all__'

class maestriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = maestria
        fields = '__all__'

class listaProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = listaProducto
        fields = '__all__'

class rolProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = rolProducto
        fields = '__all__'

class cuartilEsperadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = cuartilEsperado
        fields = '__all__'

class categoriaMincienciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = categoriaMinciencias
        fields = '__all__'

class estudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = estudiantes
        fields = '__all__'

class estadoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = estadoProducto
        fields = '__all__'

class productoSerializer(serializers.ModelSerializer):
    class Meta:
        model = producto
        fields = '__all__'

#------------------------ PROYECTOS ------------------------

class unidadAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = unidadAcademica
        fields = '__all__'

class entidadPostuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = entidadPostulo
        fields = '__all__'

class financiacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = financiacion
        fields = '__all__'

class grupoInvestigacionCoSerializer(serializers.ModelSerializer):
    class Meta:
        model = grupoInvestigacionPro
        fields = '__all__'

class transaccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = transacciones
        fields = '__all__'

class origenSerializer(serializers.ModelSerializer):
    class Meta:
        model = origen
        fields = '__all__'

class ubicacionProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ubicacionProyecto
        fields = '__all__'

class estadoProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = estadoProyecto
        fields = '__all__'

class modalidadProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = modalidadProyecto
        fields = '__all__'

class avanceProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = avanceProyecto
        fields = '__all__'

class lineaInvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = lineaInvestigacion
        fields = '__all__'

class entregableAdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = entregableAdministrativo
        fields = '__all__'

class proyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = proyecto
        fields = '__all__'


















