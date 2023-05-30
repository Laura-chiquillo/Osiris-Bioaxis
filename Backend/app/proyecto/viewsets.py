from rest_framework import generics

from .models import (grupoinvestigacion, investigador, posgrado, pregrado,
                     ubicacion)
from .serializer import (grupoinvestigacionSerializer, investigadorSerializer,
                         posgradoSerializer, pregradoSerializer,
                         ubicacionSerializer)

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
