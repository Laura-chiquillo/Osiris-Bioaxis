from rest_framework import serializers

from .models import (grupoinvestigacion, investigador, posgrado, pregrado,
                     ubicacion)

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

