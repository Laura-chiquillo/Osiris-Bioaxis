from django.contrib.auth.hashers import make_password
from django.db import models
from rest_framework.authtoken.models import Token

# Se crean las clases para los modelos
# colocamos los atributos de la clase
# ----------------------- INVESTIGADOR -----------------------

class Posgrado(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    titulo = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    institucion = models.CharField(max_length=50)
    tipo = [
        ('Especialización', 'Especialización'),
        ('Maestría', 'Maestría'),
        ('Doctorado', 'Doctorado'),
        ('NA', 'No aplica')
    ]
    tipo = models.CharField(max_length=50, choices=tipo, default='NA')
    class Meta:
        db_table = 'proyecto_Posgrado'

class Pregrado(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    titulo = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    institucion = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Pregrado'

class Grupoinvestigacion(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Grupoinvestigacion'

class Ubicacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    ciudad = models.CharField(max_length=50)
    pais = models.CharField(max_length=50)
    departamento = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Ubicacion'

class Imagen(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    imagen = models.ImageField(upload_to='uploads/', blank=True)
    class Meta:
        db_table = 'proyecto_Imagen'

class Investigador(models.Model):
    numerodocumento = models.CharField(max_length=50, primary_key=True)
    contrasena = models.CharField(max_length=128)  # se aumenta la longitud para almacenar la contraseña encriptada
    correo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    estado = models.BooleanField(default=False)
    imagen = models.ForeignKey(Imagen,null=False,blank=False,on_delete=models.CASCADE)
    apellidos = models.CharField(max_length=50)
    tipodpcumento = [
        ('CC', 'Cédula de ciudadanía'),
        ('TI', 'Tarjeta de identidad'),
        ('CE', 'Cédula de extranjería'),
        ('RC', 'Registro civil'),
        ('PA', 'Pasaporte'),
    ]
    tipodocumento = models.CharField(max_length=2, choices=tipodpcumento, default='CC')
    tipPosgrado = models.ForeignKey(Posgrado,null=False,blank=False,on_delete=models.CASCADE)
    tipPregrado = models.ForeignKey(Pregrado,null=False,blank=False,on_delete=models.CASCADE)
    horasestricto = models.IntegerField()
    horasformacion = models.IntegerField()
    unidadAcademica = models.CharField(max_length=50)
    grupoinvestigacion = models.ForeignKey(Grupoinvestigacion,null=False,blank=False,on_delete=models.CASCADE)
    categoriaminciencias = [
        ("Emérito", "Eméritos"),
        ("Asociado", "Asociados"),
        ("Senior", "Senior"),
        ("Junior", "Junior"),
    ]
    categoriaminciencias = models.CharField(max_length=10, choices=categoriaminciencias, default='Junior')
    escalofonodocente = models.CharField(max_length=50)
    rolinvestigador = [
        ("Investigador", "Investigador"),
        ("Administrador", "Administrador"),
        ("Estudiante", "Estudiante"),
    ]
    rolinvestigador = models.CharField(max_length=50, choices=rolinvestigador, default='Investigador')
    lineainvestigacion = models.CharField(max_length=50)
    ies = models.CharField(max_length=50)
    ubicacion = models.ForeignKey(Ubicacion,null=False,blank=False,on_delete=models.CASCADE)
    def save(self, *args, **kwargs):
        # Encriptar la contraseña antes de guardar el objeto Investigador
        self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)
    
    def generate_token(self):
        token, created = Token.objects.get_or_create(user=self)  # Genera o recupera el token para este investigador
        return token.key 
    class Meta:
        db_table = 'proyecto_Investigador'
# ----------------------- Producto -----------------------
class Eventos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechainicio = models.CharField(max_length=50)
    fechafin = models.CharField(max_length=50)
    numparticinerno = models.IntegerField()
    numparticexterno = models.IntegerField()
    tipoevento = [
         ("Congreso", "Congreso"),
        ("Seminario", "Seminario"),
        ("Simposio", "Simposio"),
        ("Conferencia", "Conferencia"),
        ("Encuentro academico", "Encuentro academico"),
        ("Feria", "Feria"),
    ]
    tipoevento = models.CharField(max_length=50, choices=tipoevento, default='Congreso')
    class Meta:
        db_table = 'proyecto_Eventos'

class Articulos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fuente = [
       ("Electronico", "Electronico"),
        ("Impreso", "Impreso"), 
    ]
    fuente = models.CharField(max_length=50, choices=fuente, default='Electronico')
    class Meta:
        db_table = 'proyecto_Articulos'
   
class Capitulos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombrepublicacion = models.CharField(max_length=50)
    isbn = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    editorial = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Capitulos'

class Libros(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    isbn = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    editorial = models.CharField(max_length=50)
    luegarpublicacion = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Libros'

class Software(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    tiporegistro = models.CharField(max_length=50)
    numero = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    pais = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Software'

class Industrial(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField(max_length=50)
    pais = models.CharField(max_length=50)
    insitutofinanciador = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Industrial'

class Reconocimientos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField(max_length=50)
    nombentidadotorgada = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Reconocimientos'

class Licencia(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Licencia'

class Apropiacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechainicio = models.DateField()
    fechaFin = models.DateField()
    licencia = models.ForeignKey(Licencia,null=False,blank=False,on_delete=models.CASCADE)
    formato = models.CharField(max_length=50)
    medio = models.CharField(max_length=50)
    nombreEntidad = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Apropiacion'

class Contrato(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    numero = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Contrato'

class Consultoria(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    año = models.DateField()
    contrato = models.ForeignKey(Contrato,null=False,blank=False,on_delete=models.CASCADE)
    nombreEntidad = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Consultoria'

class Contenido(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombreEntidad = models.CharField(max_length=50)
    paginaWeb = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Contenido'

class PregFinalizadoyCurso(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechaInicio = models.DateField()
    reconocimientos = models.CharField(max_length=50)
    numeroPaginas = models.IntegerField()
    class Meta:
        db_table = 'proyecto_PregFinalizadoyCurso'

class Maestria(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechaInicio = models.DateField()
    institucion = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Maestria'

class ListaProducto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    articulo = models.ForeignKey(Articulos, null=True, blank=True, on_delete=models.CASCADE)
    capitulo = models.ForeignKey(Capitulos, null=True, blank=True, on_delete=models.CASCADE)
    software = models.ForeignKey(Software, null=True, blank=True, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libros, null=True, blank=True, on_delete=models.CASCADE)
    prototipoIndustrial = models.ForeignKey(Industrial, null=True, blank=True, on_delete=models.CASCADE)
    evento = models.ForeignKey(Eventos, null=True, blank=True, on_delete=models.CASCADE)
    reconocimiento = models.ForeignKey(Reconocimientos, null=True, blank=True, on_delete=models.CASCADE)
    consultoria = models.ForeignKey(Consultoria, null=True, blank=True, on_delete=models.CASCADE)
    contenido = models.ForeignKey(Contenido, null=True, blank=True, on_delete=models.CASCADE)
    pregFinalizadoyCurso = models.ForeignKey(PregFinalizadoyCurso, null=True, blank=True, on_delete=models.CASCADE)
    apropiacion = models.ForeignKey(Apropiacion, null=True, blank=True, on_delete=models.CASCADE)
    maestria = models.ForeignKey(Maestria, null=True, blank=True, on_delete=models.CASCADE)
    proyectoCursoProducto = models.CharField(max_length=50, blank=True, null=True)
    proyectoFormuladoProducto = models.CharField(max_length=50, blank=True, null=True)
    proyectoRSUProducto = models.CharField(max_length=50, blank=True, null=True)
    class Meta:
        db_table = 'proyecto_ListaProducto'

class RolProducto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    rol = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_RolProducto'

class CuartilEsperado(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    cuartil = [
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
        ("Q", "Q"),
        ("RNT", "RNT"),
    ]
    cuartil = models.CharField(max_length=50, choices=cuartil, default='A')
    class Meta:
        db_table = 'proyecto_CuartilEsperado'

class CategoriaMinciencias(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    categoria = [
        ("A1", "A1"),
        ("A2", "A2"),
        ("B", "B"),
        ("C", "C"),
    ]
    categoria = models.CharField(max_length=50, choices=categoria, default='Junior')
    class Meta:
        db_table = 'proyecto_CategoriaMinciencias'

class Estudiantes(models.Model):
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    semestre = models.IntegerField()
    fechaGrado = models.DateField()
    codigoGrupo = models.CharField(max_length=50)
    tipoDocumento = [
        ("CC", "Cédula de ciudadanía"),
        ("TI", "Tarjeta de identidad"),
        ("CE", "Cédula de extranjería"),
        ("RC", "Registro civil"),
        ("PA", "Pasaporte"),
    ]
    tipoDocumento = models.CharField(max_length=50, choices=tipoDocumento, default='CC')
    numeroDocumento = models.CharField(max_length=50, primary_key=True)
    class Meta:
        db_table = 'proyecto_Estudiantes'

class EstadoProducto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    estado = [
        ("resaccion", "resaccion"),
        ("sometido", "sometido"),
        ("publicado", "publicado"),
    ]
    estado = models.CharField(max_length=50, choices=estado, default='En proceso')
    class Meta:
        db_table = 'proyecto_EstadoProducto'

class Producto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    tituloProducto = models.CharField(max_length=50)
    rolProducto = models.ForeignKey(RolProducto,null=False,blank=False,on_delete=models.CASCADE)
    investigador = models.ForeignKey(Investigador,null=False,blank=False,on_delete=models.CASCADE)
    listaProducto = models.ForeignKey(ListaProducto,null=False,blank=False,on_delete=models.CASCADE)
    cuartilEsperado = models.ForeignKey(CuartilEsperado,null=False,blank=False,on_delete=models.CASCADE)
    categoriaMinciencias = models.ForeignKey(CategoriaMinciencias,null=False,blank=False,on_delete=models.CASCADE)
    tipologiaProducto = models.CharField(max_length=50)
    publicacion = models.CharField(max_length=50)
    estudiantes = models.ForeignKey(Estudiantes,null=False,blank=False,on_delete=models.CASCADE)
    estadoProdIniSemestre = models.CharField(max_length=50)
    porcentanjeAvanFinSemestre= models.IntegerField()
    observaciones = models.CharField(max_length=50)
    estadoProducto = models.ForeignKey(EstadoProducto,null=False,blank=False,on_delete=models.CASCADE)
    porcentajeComSemestral = models.IntegerField()
    porcentajeRealMensual = models.IntegerField()
    fecha = models.DateField()
    origen = models.CharField(max_length=5000)
    Soporte = models.FileField(upload_to ='uploadsProducto/',max_length=1000, blank=True)
    class Meta:
        db_table = 'proyecto_Producto'

# ----------------------- Proyecto -----------------------

class UnidadAcademica(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_UnidadAcademica'

class EntidadPostulo(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombreInstitucion = models.CharField(max_length=50)
    nombreGrupo = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_EntidadPostulo'

class Financiacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    valorPropuestoFin = models.CharField(max_length=50)
    valorEjecutadoFin = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Financiacion'

class GrupoInvestigacionPro(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_GrupoInvestigacionPro'

class Transacciones(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField()
    acta = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_Transacciones'

class Origen(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    origen = [
        ("nacional", "nacional"),
        ("internacional", "internacional"),
    ]
    origen = models.CharField(max_length=50, choices=origen, default='nacional')
    class Meta:
        db_table = 'proyecto_Origen'

class UbicacionProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    instalacion = models.CharField(max_length=50)
    municipio = models.CharField(max_length=50)
    pais = models.CharField(max_length=50)
    departamento = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_UbicacionProyecto'

class EstadoProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    estado = [
        ("Propuesta", "Propuesta"),
        ("Iniciado", "Iniciado"),
        ("Ejecucion", "Ejecucion"),
        ("Finalizado", "Finalizado"),
        ("Detenido", "Detenido"),
    ]
    estado = models.CharField(max_length=50, choices=estado, default='En proceso')
    class Meta:
        db_table = 'proyecto_EstadoProyecto'

class ModalidadProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    modalidad = [
        ("general", "general"),
        ("clinical", "clinical"),
        ("creación", "creación"),
    ]
    modalidad = models.CharField(max_length=50, choices=modalidad, default='Convocatoria')
    class Meta:
        db_table = 'proyecto_ModalidadProyecto'

class AvanceProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    reporte = models.CharField(max_length=50)
    entregablesComprometidos = models.CharField(max_length=50)
    entregablesReal = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_AvanceProyecto'

class LineaInvestigacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_LineaInvestigacion'

class EntregableAdministrativo(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    titulo = models.CharField(max_length=50)
    calidad = models.CharField(max_length=50)
    entregable = models.CharField(max_length=50)
    pendiente = models.CharField(max_length=50)
    clasificacion = models.CharField(max_length=50)
    class Meta:
        db_table = 'proyecto_EntregableAdministrativo'

class Proyecto(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField()
    titulo = models.CharField(max_length=50)
    investigadores = models.ForeignKey(Investigador,null=False,blank=False,on_delete=models.CASCADE)
    unidadAcademica = models.ForeignKey(UnidadAcademica,null=False,blank=False,on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto,null=False,blank=False,on_delete=models.CASCADE)
    coinvestigadores = models.CharField(max_length=50)
    programaCoinvestigador = models.CharField(max_length=50)
    entidadInstitucion = models.CharField(max_length=50)
    areaDisciplinares = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    porcentajeEjecucionCorte = models.IntegerField()
    entidadPostulo = models.ForeignKey(EntidadPostulo,null=False,blank=False,on_delete=models.CASCADE)
    financiacion = models.ForeignKey(Financiacion,null=False,blank=False,on_delete=models.CASCADE)
    grupoInvestigacionPro = models.ForeignKey(GrupoInvestigacionPro,null=False,blank=False,on_delete=models.CASCADE)
    porcentajeEjecucionFinCorte = models.IntegerField()
    porcentajeAvance = models.IntegerField()
    Soporte = models.FileField(upload_to ='uploadsProducto/',max_length=1000, blank=True)
    transacciones = models.ForeignKey(Transacciones,null=False,blank=False,on_delete=models.CASCADE)
    origen = models.ForeignKey(Origen,null=False,blank=False,on_delete=models.CASCADE)
    convocatoria = models.CharField(max_length=50)
    ubicacionProyecto = models.ForeignKey(UbicacionProyecto,null=False,blank=False,on_delete=models.CASCADE)
    estadoProyecto = models.ForeignKey(EstadoProyecto,null=False,blank=False,on_delete=models.CASCADE)
    modalidadProyecto = models.ForeignKey(ModalidadProyecto,null=False,blank=False,on_delete=models.CASCADE)
    nivelRiesgoEtico = models.CharField(max_length=50)
    lineaInvestigacion = models.ForeignKey(LineaInvestigacion,null=False,blank=False,on_delete=models.CASCADE)
    entregableAdministrativo = models.ForeignKey(EntregableAdministrativo,null=False,blank=False,on_delete=models.CASCADE)
    class Meta:
        db_table = 'proyecto_Proyecto'
