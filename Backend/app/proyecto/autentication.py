from django.contrib.auth.hashers import check_password, make_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
# Tu vista CustomAuthToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Investigador


class CustomAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('correo')
        password = request.data.get('contrasena')

        try:
            investigador = Investigador.objects.get(correo=email)
        except Investigador.DoesNotExist:
            print("Investigador no encontrado")
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificar la contraseña
        if not check_password(password, investigador.contrasena):
            print("Contraseña incorrecta")
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificar el rol del investigador
        if investigador.rolinvestigador != "Administrador" and investigador.rolinvestigador != "Investigador":
            print("Rol inválido")
            return Response({'error': 'Rol inválido'}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(investigador)
        access_token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'numerodocumento': investigador.numerodocumento,
            'rolinvestigador': investigador.rolinvestigador,
            'estado': investigador.estado
        }

        return Response({'token': access_token}, status=status.HTTP_200_OK)

    
