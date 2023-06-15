from django.contrib.auth.hashers import make_password
from django.db import models

# Se crean las clases para los modelos 
# colocamos los atributos de la clase
# ----------------------- INVESTIGADOR -----------------------

class posgrado(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class pregrado(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class grupoinvestigacion(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class ubicacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    ciudad = models.CharField(max_length=50)
    pais = models.CharField(max_length=50)
    departamento = models.CharField(max_length=50)

class investigador(models.Model):
    numerodocumento = models.CharField(max_length=50, primary_key=True)
    contrasena = models.CharField(max_length=128)  # se aumenta la longitud para almacenar la contraseña encriptada
    correo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    tipodpcumento = [
        ('CC', 'Cédula de ciudadanía'),
        ('TI', 'Tarjeta de identidad'),
        ('CE', 'Cédula de extranjería'),
        ('RC', 'Registro civil'),
        ('PA', 'Pasaporte'),
    ]
    tipodocumento = models.CharField(max_length=2, choices=tipodpcumento, default='CC')
    tipPosgrado = models.ForeignKey(posgrado,null=False,blank=False,on_delete=models.CASCADE)
    tituloposgrado = models.CharField(max_length=50)
    tipPregrado = models.ForeignKey(pregrado,null=False,blank=False,on_delete=models.CASCADE)
    titulopregrado = models.CharField(max_length=50)
    horasestricto = models.IntegerField()
    horasformacion = models.IntegerField()
    unidadAcademica = models.CharField(max_length=50)
    grupoinvestigacion = models.ForeignKey(grupoinvestigacion,null=False,blank=False,on_delete=models.CASCADE)
    categoriaminciencias = [
        ("Emérito", "Eméritos"),
        ("Asociado", "Asociados"),
        ("Senior", "Senior"),
        ("Junior", "Junior"),
    ]
    categoriaminciencias = models.CharField(max_length=10, choices=categoriaminciencias, default='Junior')
    escalofonodocente = models.CharField(max_length=50)
    rolinvestigador = models.CharField(max_length=50)
    lineainvestigacion = models.CharField(max_length=50)
    ies = models.CharField(max_length=50)
    ubicacion = models.ForeignKey(ubicacion,null=False,blank=False,on_delete=models.CASCADE)
    def save(self, *args, **kwargs):
        # Encriptar la contraseña antes de guardar el objeto Investigador
        self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)

# ----------------------- Producto -----------------------
class eventos(models.Model):
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

class articulos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fuente = [
       ("Electronico", "Electronico"),
        ("Impreso", "Impreso"), 
    ]
    fuente = models.CharField(max_length=50, choices=fuente, default='Electronico')
   
class capitulos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombrepublicacion = models.CharField(max_length=50)
    isbn = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    editorial = models.CharField(max_length=50)

class libros(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    isbn = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    editorial = models.CharField(max_length=50)
    luegarpublicacion = models.CharField(max_length=50)

class software(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    tiporegistro = models.CharField(max_length=50)
    numero = models.CharField(max_length=50)
    fecha = models.DateField(max_length=50)
    pais = models.CharField(max_length=50)

class industrial(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField(max_length=50)
    pais = models.CharField(max_length=50)
    insitutofinanciador = models.CharField(max_length=50)

class reconocimientos(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField(max_length=50)
    nombentidadotorgada = models.CharField(max_length=50)

class licencia(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class apropiacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechainicio = models.DateField()
    fechaFin = models.DateField()
    licencia = models.ForeignKey(licencia,null=False,blank=False,on_delete=models.CASCADE)
    formato = models.CharField(max_length=50)
    medio = models.CharField(max_length=50)
    nombreEntidad = models.CharField(max_length=50)

class contrato(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    numero = models.CharField(max_length=50)

class consultoria(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    año = models.DateField()
    contrato = models.ForeignKey(contrato,null=False,blank=False,on_delete=models.CASCADE)
    nombreEntidad = models.CharField(max_length=50)

class contenido(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombreEntidad = models.CharField(max_length=50)
    paginaWeb = models.CharField(max_length=50)

class pregFinalizadoyCurso(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechaInicio = models.DateField()
    reconocimientos = models.CharField(max_length=50)
    numeroPaginas = models.IntegerField()

class maestria(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fechaInicio = models.DateField()
    institucion = models.CharField(max_length=50)

class listaProducto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    articulo = models.ForeignKey(articulos, null=True, blank=True, on_delete=models.CASCADE)
    capitulo = models.ForeignKey(capitulos, null=True, blank=True, on_delete=models.CASCADE)
    software = models.ForeignKey(software, null=True, blank=True, on_delete=models.CASCADE)
    libro = models.ForeignKey(libros, null=True, blank=True, on_delete=models.CASCADE)
    prototipoIndustrial = models.ForeignKey(industrial, null=True, blank=True, on_delete=models.CASCADE)
    evento = models.ForeignKey(eventos, null=True, blank=True, on_delete=models.CASCADE)
    reconocimiento = models.ForeignKey(reconocimientos, null=True, blank=True, on_delete=models.CASCADE)
    consultoria = models.ForeignKey(consultoria, null=True, blank=True, on_delete=models.CASCADE)
    contenido = models.ForeignKey(contenido, null=True, blank=True, on_delete=models.CASCADE)
    pregFinalizadoyCurso = models.ForeignKey(pregFinalizadoyCurso, null=True, blank=True, on_delete=models.CASCADE)
    apropiacion = models.ForeignKey(apropiacion, null=True, blank=True, on_delete=models.CASCADE)
    maestria = models.ForeignKey(maestria, null=True, blank=True, on_delete=models.CASCADE)
    proyectoCursoProducto = models.CharField(max_length=50, blank=True, null=True)
    proyectoFormuladoProducto = models.CharField(max_length=50, blank=True, null=True)
    proyectoRSUProducto = models.CharField(max_length=50, blank=True, null=True)



class rolProducto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    rol = models.CharField(max_length=50)

class cuartilEsperado(models.Model):
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

class categoriaMinciencias(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    categoria = [
        ("A1", "A1"),
        ("A2", "A2"),
        ("B", "B"),
        ("C", "C"),
    ]
    categoria = models.CharField(max_length=50, choices=categoria, default='Junior')

class estudiantes(models.Model):
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

class estadoProducto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    estado = [
        ("resaccion", "resaccion"),
        ("sometido", "sometido"),
        ("publicado", "publicado"),
    ]
    estado = models.CharField(max_length=50, choices=estado, default='En proceso')

class producto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    tituloProducto = models.CharField(max_length=50)
    rolProducto = models.ForeignKey(rolProducto,null=False,blank=False,on_delete=models.CASCADE)
    investigador = models.ForeignKey(investigador,null=False,blank=False,on_delete=models.CASCADE)
    listaProducto = models.ForeignKey(listaProducto,null=False,blank=False,on_delete=models.CASCADE)
    cuartilEsperado = models.ForeignKey(cuartilEsperado,null=False,blank=False,on_delete=models.CASCADE)
    categoriaMinciencias = models.ForeignKey(categoriaMinciencias,null=False,blank=False,on_delete=models.CASCADE)
    tipologiaProducto = models.CharField(max_length=50)
    publicacion = models.CharField(max_length=50)
    estudiantes = models.ForeignKey(estudiantes,null=False,blank=False,on_delete=models.CASCADE)
    estadoProdIniSemestre = models.CharField(max_length=50)
    porcentanjeAvanFinSemestre= models.IntegerField()
    observaciones = models.CharField(max_length=50)
    estadoProducto = models.ForeignKey(estadoProducto,null=False,blank=False,on_delete=models.CASCADE)
    porcentajeComSemestral = models.IntegerField()
    porcentajeRealMensual = models.IntegerField()
    fecha = models.DateField()
    origen = models.CharField(max_length=50)
    Soporte = models.CharField(max_length=50)

# ----------------------- Proyecto -----------------------

class unidadAcademica(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class entidadPostulo(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombreInstitucion = models.CharField(max_length=50)
    nombreGrupo = models.CharField(max_length=50)

class financiacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    valorPropuestoFin = models.CharField(max_length=50)
    valorEjecutadoFin = models.CharField(max_length=50)

class grupoInvestigacionPro(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class transacciones(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField()
    acta = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)

class origen(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    origen = [
        ("nacional", "nacional"),
        ("internacional", "internacional"),
    ]
    origen = models.CharField(max_length=50, choices=origen, default='nacional')

class ubicacionProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    instalacion = models.CharField(max_length=50)
    municipio = models.CharField(max_length=50)
    pais = models.CharField(max_length=50)
    departamento = models.CharField(max_length=50)

class estadoProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    estado = [
        ("Propuesta", "Propuesta"),
        ("Iniciado", "Iniciado"),
        ("Ejecucion", "Ejecucion"),
        ("Finalizado", "Finalizado"),
        ("Detenido", "Detenido"),
    ]
    estado = models.CharField(max_length=50, choices=estado, default='En proceso')

class modalidadProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    modalidad = [
        ("general", "general"),
        ("clinical", "clinical"),
        ("creación", "creación"),
    ]
    modalidad = models.CharField(max_length=50, choices=modalidad, default='Convocatoria')

class avanceProyecto(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    reporte = models.CharField(max_length=50)
    entregablesComprometidos = models.CharField(max_length=50)
    entregablesReal = models.CharField(max_length=50)

class lineaInvestigacion(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)

class entregableAdministrativo(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    nombre = models.CharField(max_length=50)
    titulo = models.CharField(max_length=50)
    calidad = models.CharField(max_length=50)
    entregable = models.CharField(max_length=50)
    pendiente = models.CharField(max_length=50)
    clasificacion = models.CharField(max_length=50)

class proyecto(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)
    fecha = models.DateField()
    titulo = models.CharField(max_length=50)
    investigador = models.ForeignKey(investigador,null=False,blank=False,on_delete=models.CASCADE)
    unidadAcademica = models.ForeignKey(unidadAcademica,null=False,blank=False,on_delete=models.CASCADE)
    producto = models.ForeignKey(producto,null=False,blank=False,on_delete=models.CASCADE)
    coinvestigador = models.CharField(max_length=50)
    programaCoinvestigador = models.CharField(max_length=50)
    entidadInstitucion = models.CharField(max_length=50)
    areaDisciplinares = models.CharField(max_length=50)
    area = models.CharField(max_length=50)
    porcentajeEjecucionCorte = models.IntegerField()
    entidadPostulo = models.ForeignKey(entidadPostulo,null=False,blank=False,on_delete=models.CASCADE)
    financiacion = models.ForeignKey(financiacion,null=False,blank=False,on_delete=models.CASCADE)
    grupoInvestigacionPro = models.ForeignKey(grupoInvestigacionPro,null=False,blank=False,on_delete=models.CASCADE)
    porcentajeEjecucionFinCorte = models.IntegerField()
    porcentajeAvance = models.IntegerField()
    soporte = models.CharField(max_length=50)
    transacciones = models.ForeignKey(transacciones,null=False,blank=False,on_delete=models.CASCADE)
    origen = models.ForeignKey(origen,null=False,blank=False,on_delete=models.CASCADE)
    convocatoria = models.CharField(max_length=50)
    ubicacionProyecto = models.ForeignKey(ubicacionProyecto,null=False,blank=False,on_delete=models.CASCADE)
    estadoProyecto = models.ForeignKey(estadoProyecto,null=False,blank=False,on_delete=models.CASCADE)
    modalidadProyecto = models.ForeignKey(modalidadProyecto,null=False,blank=False,on_delete=models.CASCADE)
    nivelRiesgoEtico = models.CharField(max_length=50)
    lineaInvestigacion = models.ForeignKey(lineaInvestigacion,null=False,blank=False,on_delete=models.CASCADE)
    entregableAdministrativo = models.ForeignKey(entregableAdministrativo,null=False,blank=False,on_delete=models.CASCADE)



















