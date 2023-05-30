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
    contrasena = models.CharField(max_length=50)
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
    articulos = models.ForeignKey(articulos,null=False,blank=False,on_delete=models.CASCADE)
    capitulos = models.ForeignKey(capitulos,null=False,blank=False,on_delete=models.CASCADE)
    software = models.ForeignKey(software,null=False,blank=False,on_delete=models.CASCADE)
    libros = models.ForeignKey(libros,null=False,blank=False,on_delete=models.CASCADE)
    prototipoIndustrial = models.ForeignKey(industrial,null=False,blank=False,on_delete=models.CASCADE)
    eventos = models.ForeignKey(eventos,null=False,blank=False,on_delete=models.CASCADE)
    reconocimientos = models.ForeignKey(reconocimientos,null=False,blank=False,on_delete=models.CASCADE)
    consultoria = models.ForeignKey(consultoria,null=False,blank=False,on_delete=models.CASCADE)
    contenido = models.ForeignKey(contenido,null=False,blank=False,on_delete=models.CASCADE)
    pregFinalizadoyCurso = models.ForeignKey(pregFinalizadoyCurso,null=False,blank=False,on_delete=models.CASCADE)
    apropiacion = models.ForeignKey(apropiacion,null=False,blank=False,on_delete=models.CASCADE)
    maestria = models.ForeignKey(maestria,null=False,blank=False,on_delete=models.CASCADE)
    proyectoCursoProducto = models.CharField(max_length=50)
    proyectoFormuladoProducto = models.CharField(max_length=50)
    proyectoRSUProducto = models.CharField(max_length=50)




# ----------------------- Proyecto -----------------------









