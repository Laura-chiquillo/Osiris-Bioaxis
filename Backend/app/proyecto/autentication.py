from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Investigador
from .serializer import investigadorSerializer


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

        # Generar tokens
        refresh = RefreshToken.for_user(investigador)
        access_token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'numerodocumento': investigador.numerodocumento,
            'rolinvestigador': investigador.rolinvestigador,
            'estado': investigador.estado
        }

        # Obtener y devolver datos del usuario
        user_data = {
            'nombre': investigador.nombre,
            'apellidos': investigador.apellidos,
            'correo': investigador.correo,
            'tipodocumento': investigador.tipodocumento,
            'numerodocumento': investigador.numerodocumento,
            'lineainvestigacion': investigador.lineainvestigacion,
            'escalofonodocente': investigador.escalofonodocente,
            'unidadacademica': investigador.unidadAcademica,
            'horariosformacion': investigador.horasformacion,
            'horariosestrictos': investigador.horasestricto,
            'tipPosgrado': {
                'id': investigador.tipPosgrado.id,
                'titulo': investigador.tipPosgrado.titulo,
                'fecha': investigador.tipPosgrado.fecha,
                'institucion': investigador.tipPosgrado.institucion,
                'tipo': investigador.tipPosgrado.tipo,
            },
            'tipPregrado': {
                'id': investigador.tipPregrado.id,
                'titulo': investigador.tipPregrado.titulo,
                'fecha': investigador.tipPregrado.fecha,
                'institucion': investigador.tipPregrado.institucion,
            },
        }
        return Response({'token': access_token, 'user_data': user_data}, status=status.HTTP_200_OK)

class ActualizarDatosUsuario(APIView):
    def put(self, request, *args, **kwargs):
        try:
            usuario = Investigador.objects.get(numerodocumento=request.data.get('numerodocumento'))
        except Investigador.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = investigadorSerializer(usuario, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)