from django.contrib.auth.hashers import check_password, make_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Investigador


class CustomAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('correo')
        password = request.data.get('contrasena')

        print(f"Correo recibido: {email}")
        print(f"Contraseña recibida: {password}")

        try:
            investigador = Investigador.objects.get(correo=email)
        except Investigador.DoesNotExist:
            print("Investigador no encontrado")
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificar la contraseña
        if not check_password(password, investigador.contrasena):
            print("Contraseña incorrecta")
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificar si el investigador está activo
        if not investigador.estado:
            print("El investigador no está activo")
            return Response({'error': 'El investigador no está activo'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificar el rol del investigador
        if investigador.rolinvestigador != "Administrador" and investigador.rolinvestigador != "Investigador":
            print("Rol inválido")
            return Response({'error': 'Rol inválido'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generar un token personalizado para el investigador
        token = self.generate_token(investigador)
        return Response({'token': token}, status=status.HTTP_200_OK)

    def generate_token(self, investigador):
        return investigador.numerodocumento  # Ejemplo: retornar el número de documento
