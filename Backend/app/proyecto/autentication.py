from django.contrib.auth.hashers import check_password
from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (Apropiacion, Articulos, Capitulos, Consultoria, Contenido,
                     Contrato, Estudiantes, Eventos, Industrial, Investigador,
                     Libros, Licencia, ListaProducto, Maestria,
                     PregFinalizadoyCurso, Producto, Proyecto, Reconocimientos,
                     Software)
from .serializer import (apropiacionSerializer, articulosSerializer,
                         capitulosSerializer, consultoriaSerializer,
                         contenidoSerializer, contratoSerializer,
                         estudiantesSerializer, eventosSerializer,
                         industrialSerializer, investigadorSerializer,
                         librosSerializer, licenciaSerializer,
                         listaProductoSerializer, maestriaSerializer,
                         pregFinalizadoyCursoSerializer, productoSerializer,
                         proyectoSerializer, reconocimientosSerializer,
                         softwareSerializer)


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
        print("Contraseña almacenada en la base de datos:", investigador.contrasena)
        if not check_password(password, investigador.contrasena):
            print("Contraseña incorrecta")
            print("Contraseña almacenada en la base de datos:", investigador.contrasena)
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
        
class CrearProyecto(APIView):
    def post(self, request, *args, **kwargs):
        # Obtener el nombre del investigador autenticado desde los datos del usuario en la solicitud
        numId_investigador = request.data.get('numerodocumento')

        # Crear una instancia del proyecto con el nombre del investigador establecido
        proyecto_data = request.data
        proyecto_data['investigadores'] = numId_investigador

        serializer = proyectoSerializer(data=proyecto_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        proyectos = Proyecto.objects.all()
        data = [{'codigo': proyecto.codigo, 'titulo': proyecto.titulo} for proyecto in proyectos]
        return Response(data)

from rest_framework.parsers import FileUploadParser


class CrearNuevoProducto(APIView):
    parser_class = (FileUploadParser,)
    
    def post(self, request, *args, **kwargs):
        archivo = request.FILES.get('Soporte')  # Obtén el archivo enviado desde el frontend
        data = request.data.get('producto')  # Obtén los datos del producto del cuerpo de la solicitud
        print(data)
        serializer = productoSerializer(data=data)
        if serializer.is_valid():
            producto = serializer.save()

            if archivo:  # Verifica si se envió un archivo
                producto.Soporte = archivo  # Asigna el archivo al campo 'Soporte'
                producto.save()  # Guarda el producto con el archivo

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def custom_exception_handler(exc, context):
            response = exception_handler(exc, context)

            if response is not None:
                error_message = 'Error en la solicitud: {}'.format(response.data)
                response.data = {'error': error_message}

            return response

