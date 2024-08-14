# Generated by Django 5.0.1 on 2024-08-09 03:16

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Articulos',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fuente', models.CharField(choices=[('Electronico', 'Electronico'), ('Impreso', 'Impreso')], default='Electronico', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Articulos',
            },
        ),
        migrations.CreateModel(
            name='AvanceProyecto',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('reporte', models.CharField(max_length=50)),
                ('entregablesComprometidos', models.CharField(max_length=50)),
                ('entregablesReal', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Avanceproyecto',
            },
        ),
        migrations.CreateModel(
            name='Capitulos',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombrepublicacion', models.CharField(default='NA', max_length=50)),
                ('isbn', models.CharField(default='NA', max_length=50)),
                ('fecha', models.DateTimeField(default=datetime.datetime.now)),
                ('editorial', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Capitulos',
            },
        ),
        migrations.CreateModel(
            name='CategoriaMinciencias',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('categoria', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_CategoriaMinciencias',
            },
        ),
        migrations.CreateModel(
            name='ConfiguracionEntregableProducto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=150)),
                ('fecha', models.DateField()),
                ('estado', models.BooleanField(default=True)),
                ('observacion', models.CharField(default='', max_length=5000)),
                ('estadoProceso', models.CharField(choices=[('Aprobado', 'Aprobado'), ('Rechazado', 'Rechazado'), ('Corregir', 'Corregir'), ('Espera', 'Espera')], default='Espera', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'db_table': 'proyecto_ConfiguracionEntregableProducto',
            },
        ),
        migrations.CreateModel(
            name='ConfiguracionEntregableProyecto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=150)),
                ('fecha', models.DateField()),
                ('estado', models.BooleanField(default=False)),
                ('observacion', models.CharField(default='', max_length=5000)),
                ('estadoProceso', models.CharField(choices=[('Aprobado', 'Aprobado'), ('Rechazado', 'Rechazado'), ('Corregir', 'Corregir'), ('Espera', 'Espera')], default='Espera', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'db_table': 'proyecto_ConfiguracionEntregableProyecto',
            },
        ),
        migrations.CreateModel(
            name='Contenido',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombreEntidad', models.CharField(default='NA', max_length=50)),
                ('paginaWeb', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Contenido',
            },
        ),
        migrations.CreateModel(
            name='Contrato',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombre', models.CharField(default='NA', max_length=50)),
                ('numero', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Contrato',
            },
        ),
        migrations.CreateModel(
            name='CuartilEsperado',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cuartil', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_CuartilEsperado',
            },
        ),
        migrations.CreateModel(
            name='EntidadPostulo',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombreInstitucion', models.CharField(max_length=50)),
                ('nombreGrupo', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Entidadpostulo',
            },
        ),
        migrations.CreateModel(
            name='EstadoProducto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_EstadoProducto',
            },
        ),
        migrations.CreateModel(
            name='EstadoProyecto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_EstadoProyecto',
            },
        ),
        migrations.CreateModel(
            name='Estudiantes',
            fields=[
                ('nombres', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=50)),
                ('semestre', models.IntegerField()),
                ('fechaGrado', models.DateTimeField(default=datetime.datetime.now)),
                ('codigoGrupo', models.CharField(max_length=50)),
                ('tipoDocumento', models.CharField(choices=[('CC', 'Cédula de ciudadanía'), ('TI', 'Tarjeta de identidad'), ('CE', 'Cédula de extranjería'), ('RC', 'Registro civil'), ('PA', 'Pasaporte')], default='CC', max_length=50)),
                ('numeroDocumento', models.CharField(max_length=50, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'proyecto_Estudiantes',
            },
        ),
        migrations.CreateModel(
            name='Eventos',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fechainicio', models.DateTimeField(default=datetime.datetime.now)),
                ('fechafin', models.DateTimeField(default=datetime.datetime.now)),
                ('numparticinerno', models.IntegerField(default=0)),
                ('numparticexterno', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'proyecto_Eventos',
            },
        ),
        migrations.CreateModel(
            name='Financiacion',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('valorPropuestoFin', models.CharField(max_length=50)),
                ('valorEjecutadoFin', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Financiacion',
            },
        ),
        migrations.CreateModel(
            name='Grupoinvestigacion',
            fields=[
                ('codigo', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Grupoinvestigacion',
            },
        ),
        migrations.CreateModel(
            name='Imagen',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('imagen', models.ImageField(blank=True, upload_to='uploads/')),
            ],
            options={
                'db_table': 'proyecto_Imagen',
            },
        ),
        migrations.CreateModel(
            name='Industrial',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(default=datetime.datetime.now)),
                ('pais', models.CharField(default='NA', max_length=50)),
                ('insitutofinanciador', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Industrial',
            },
        ),
        migrations.CreateModel(
            name='Libros',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('isbn', models.CharField(default='NA', max_length=50)),
                ('fecha', models.DateTimeField(default=datetime.datetime.now)),
                ('editorial', models.CharField(default='NA', max_length=50)),
                ('luegarpublicacion', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Libros',
            },
        ),
        migrations.CreateModel(
            name='Licencia',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombre', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Licencia',
            },
        ),
        migrations.CreateModel(
            name='Maestria',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fechaInicio', models.DateTimeField(default=datetime.datetime.now)),
                ('institucion', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Maestria',
            },
        ),
        migrations.CreateModel(
            name='Notificaciones',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('asunto', models.CharField(max_length=150)),
                ('remitente', models.CharField(max_length=150)),
                ('destinatario', models.CharField(max_length=150)),
                ('mensaje', models.CharField(max_length=500)),
                ('estado', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'db_table': 'proyecto_Notificaciones',
            },
        ),
        migrations.CreateModel(
            name='ParticipantesExternos',
            fields=[
                ('numerodocumento', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('apellidos', models.CharField(max_length=50)),
                ('institucion', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_ParticipantesExternos',
            },
        ),
        migrations.CreateModel(
            name='PregFinalizadoyCurso',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fechaInicio', models.DateTimeField(default=datetime.datetime.now)),
                ('reconocimientos', models.CharField(blank=True, default='NA', max_length=50)),
                ('numeroPaginas', models.IntegerField(blank=True, default='NA')),
            ],
            options={
                'db_table': 'proyecto_Pregfinalizadoycurso',
            },
        ),
        migrations.CreateModel(
            name='Reconocimientos',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(default=datetime.datetime.now)),
                ('nombentidadotorgada', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Reconocimientos',
            },
        ),
        migrations.CreateModel(
            name='Software',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('tiporegistro', models.CharField(default='NA', max_length=50)),
                ('numero', models.CharField(default='NA', max_length=50)),
                ('fecha', models.DateTimeField(default=datetime.datetime.now)),
                ('pais', models.CharField(default='NA', max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Software',
            },
        ),
        migrations.CreateModel(
            name='TipoEventos',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_TipoEventos',
            },
        ),
        migrations.CreateModel(
            name='Transacciones',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(blank=True, null=True)),
                ('acta', models.FileField(blank=True, max_length=1000, upload_to='uploadsProducto/')),
                ('descripcion', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Transacciones',
            },
        ),
        migrations.CreateModel(
            name='Ubicacion',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('ciudad', models.CharField(max_length=50)),
                ('pais', models.CharField(max_length=50)),
                ('departamento', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Ubicacion',
            },
        ),
        migrations.CreateModel(
            name='UbicacionProyecto',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('instalacion', models.CharField(max_length=50)),
                ('municipio', models.CharField(max_length=50)),
                ('pais', models.CharField(max_length=50)),
                ('departamento', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'proyecto_Ubicacionproyecto',
            },
        ),
        migrations.CreateModel(
            name='AvanceEntregableProducto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(blank=True, max_length=250)),
                ('soporte', models.FileField(blank=True, max_length=1000, upload_to='uploadsAvancesProducto/')),
                ('fecha', models.DateField()),
                ('estado', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('configuracionEntregableProducto_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.configuracionentregableproducto')),
            ],
            options={
                'db_table': 'proyecto_AvanceEntregableProducto',
            },
        ),
        migrations.CreateModel(
            name='AvanceEntregableProyecto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(blank=True, max_length=250)),
                ('soporte', models.FileField(blank=True, max_length=1000, upload_to='uploadsAvanceProyecto/')),
                ('fecha', models.DateField()),
                ('estado', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('configuracionEntregableProyecto_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.configuracionentregableproyecto')),
            ],
            options={
                'db_table': 'proyecto_AvanceEntregableProyecto',
            },
        ),
        migrations.CreateModel(
            name='Consultoria',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('año', models.CharField(default='NA', max_length=50)),
                ('nombreEntidad', models.CharField(default='NA', max_length=50)),
                ('contrato', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.contrato')),
            ],
            options={
                'db_table': 'proyecto_Consultoria',
            },
        ),
        migrations.CreateModel(
            name='Investigador',
            fields=[
                ('numerodocumento', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('contrasena', models.CharField(max_length=128)),
                ('correo', models.CharField(max_length=150)),
                ('nombre', models.CharField(max_length=50)),
                ('estado', models.BooleanField(default=False)),
                ('apellidos', models.CharField(max_length=50)),
                ('tipodocumento', models.CharField(choices=[('CC', 'Cédula de ciudadanía'), ('TI', 'Tarjeta de identidad'), ('CE', 'Cédula de extranjería'), ('RC', 'Registro civil'), ('PA', 'Pasaporte')], default='CC', max_length=2)),
                ('horasestricto', models.IntegerField(default=0)),
                ('horasformacion', models.IntegerField(default=0)),
                ('unidadAcademica', models.CharField(choices=[('Facultad de Ingeniería', 'Facultad de Ingeniería'), ('Facultad de Ciencias', 'Facultad de Ciencias'), ('Facultad de Educación', 'Facultad de Educación')], default='Facultad de Ingeniería', max_length=180)),
                ('categoriaminciencias', models.CharField(choices=[('Emérito', 'Eméritos'), ('Asociado', 'Asociados'), ('Senior', 'Senior'), ('Junior', 'Junior')], default='Junior', max_length=10)),
                ('escalofonodocente', models.CharField(max_length=50)),
                ('rolinvestigador', models.CharField(choices=[('Investigador', 'Investigador'), ('Administrador', 'Administrador'), ('Estudiante', 'Estudiante')], default='Investigador', max_length=50)),
                ('lineainvestigacion', models.CharField(choices=[('Ingeniería de software y sociedad', 'Ingeniería de software y sociedad'), ('Ingeniería para la salud y el desarrollo biológico', 'Ingeniería para la salud y el desarrollo biológico'), ('Ingeniería y educación', 'Ingeniería y educación'), ('Ingeniería para la sostenibilidad de sistemas naturales', 'Ingeniería para la sostenibilidad de sistemas naturales')], default='Ingeniería de software y sociedad', max_length=180)),
                ('ies', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('grupoinvestigacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.grupoinvestigacion')),
                ('imagen', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.imagen')),
                ('ubicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.ubicacion')),
            ],
            options={
                'db_table': 'proyecto_Investigador',
            },
        ),
        migrations.CreateModel(
            name='Apropiacion',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fechainicio', models.DateTimeField(default=datetime.datetime.now)),
                ('fechaFin', models.DateTimeField(default=datetime.datetime.now)),
                ('formato', models.CharField(default='NA', max_length=50)),
                ('medio', models.CharField(default='NA', max_length=50)),
                ('nombreEntidad', models.CharField(default='NA', max_length=50)),
                ('licencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.licencia')),
            ],
            options={
                'db_table': 'proyecto_Apropiacion',
            },
        ),
        
        
        migrations.CreateModel(
            name='Posgrado',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=50)),
                ('fecha', models.DateField(max_length=50)),
                ('institucion', models.CharField(max_length=50)),
                ('tipo', models.CharField(choices=[('Especialización', 'Especialización'), ('Maestría', 'Maestría'), ('Doctorado', 'Doctorado'), ('NA', 'No aplica')], default='NA', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('Investigador_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.investigador')),
            ],
            options={
                'db_table': 'proyecto_Posgrado',
            },
        ),
        migrations.CreateModel(
            name='ListaProducto',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('proyectoCursoProducto', models.CharField(blank=True, max_length=50, null=True)),
                ('proyectoFormuladoProducto', models.CharField(blank=True, max_length=50, null=True)),
                ('proyectoRSUProducto', models.CharField(blank=True, max_length=50, null=True)),
                ('apropiacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.apropiacion')),
                ('articulo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.articulos')),
                ('capitulo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.capitulos')),
                ('consultoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.consultoria')),
                ('contenido', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.contenido')),
                ('evento', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.eventos')),
                ('libro', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.libros')),
                ('prototipoIndustrial', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.industrial')),
                ('maestria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.maestria')),
                ('pregFinalizadoyCurso', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.pregfinalizadoycurso')),
                ('reconocimiento', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.reconocimientos')),
                ('software', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.software')),
            ],
            options={
                'db_table': 'proyecto_Listaproducto',
            },
        ),
        migrations.CreateModel(
            name='Pregrado',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=50)),
                ('fecha', models.DateField(max_length=50)),
                ('institucion', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('Investigador_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.investigador')),
            ],
            options={
                'db_table': 'proyecto_Pregrado',
            },
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('tituloProducto', models.CharField(max_length=50)),
                ('investigador', models.CharField(max_length=50)),
                ('publicacion', models.CharField(max_length=50)),
                ('porcentanjeAvanFinSemestre', models.IntegerField()),
                ('observaciones', models.CharField(max_length=1500)),
                ('porcentajeComSemestral', models.IntegerField()),
                ('porcentajeRealMensual', models.IntegerField()),
                ('origen', models.CharField(max_length=5000)),
                ('observacion', models.CharField(default='', max_length=5000)),
                ('Soporte', models.FileField(blank=True, max_length=1000, upload_to='uploadsProducto/')),
                ('estadoProceso', models.CharField(choices=[('Aprobado', 'Aprobado'), ('Rechazado', 'Rechazado'), ('Corregir', 'Corregir'), ('Espera', 'Espera')], default='Espera', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('categoriaMinciencias', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.categoriaminciencias')),
                ('coinvestigador', models.ManyToManyField(to='proyecto.investigador')),
                ('cuartilEsperado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.cuartilesperado')),
                ('estadoProducto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.estadoproducto')),
                ('estudiantes', models.ManyToManyField(to='proyecto.estudiantes')),
                ('listaProducto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.listaproducto')),
                ('participantesExternos', models.ManyToManyField(to='proyecto.participantesexternos')),
            ],
            options={
                'db_table': 'proyecto_Producto',
            },
        ),
        
        migrations.AddField(
            model_name='configuracionentregableproducto',
            name='producto_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.producto'),
        ),
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('codigo', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=500)),
                ('investigador', models.CharField(max_length=50)),
                ('unidadAcademica', models.CharField(choices=[('Facultad de Ingeniería', 'Facultad de Ingeniería'), ('Facultad de Ciencias', 'Facultad de Ciencias'), ('Facultad de Educación', 'Facultad de Educación')], default='Facultad de Ingeniería', max_length=180)),
                ('area', models.CharField(max_length=50)),
                ('porcentajeEjecucionCorte', models.IntegerField()),
                ('grupoInvestigacionPro', models.CharField(max_length=50)),
                ('porcentajeEjecucionFinCorte', models.IntegerField()),
                ('porcentajeAvance', models.IntegerField()),
                ('observacion', models.CharField(default='', max_length=5000)),
                ('Soporte', models.FileField(blank=True, max_length=1000, upload_to='uploadsProducto/')),
                ('origen', models.CharField(choices=[('nacional', 'nacional'), ('internacional', 'internacional')], default='nacional', max_length=50)),
                ('convocatoria', models.CharField(max_length=50)),
                ('modalidad', models.CharField(choices=[('general', 'general'), ('clinical', 'clinical'), ('creación', 'creación')], default='general', max_length=50)),
                ('nivelRiesgoEtico', models.CharField(choices=[('Alto', 'Alto'), ('Medio', 'Medio'), ('Bajo', 'Bajo'), ('Sin riesgo', 'Sin riesgo')], default='Sin riesgo', max_length=50)),
                ('lineaInvestigacion', models.CharField(choices=[('Ingeniería de software y sociedad', 'Ingeniería de software y sociedad'), ('Ingeniería para la salud y el desarrollo biológico', 'Ingeniería para la salud y el desarrollo biológico'), ('Ingeniería y educación', 'Ingeniería y educación'), ('Ingeniería para la sostenibilidad de sistemas naturales', 'Ingeniería para la sostenibilidad de sistemas naturales')], default='Ingeniería de software y sociedad', max_length=180)),
                ('estadoProceso', models.CharField(choices=[('Aprobado', 'Aprobado'), ('Rechazado', 'Rechazado'), ('Corregir', 'Corregir'), ('Espera', 'Espera')], default='Espera', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('coinvestigador', models.ManyToManyField(to='proyecto.investigador')),
                ('entidadPostulo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.entidadpostulo')),
                ('estado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.estadoproyecto')),
                ('estudiantes', models.ManyToManyField(to='proyecto.estudiantes')),
                ('financiacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.financiacion')),
                ('participantesExternos', models.ManyToManyField(to='proyecto.participantesexternos')),
                ('producto', models.ManyToManyField(to='proyecto.producto')),
                ('transacciones', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.transacciones')),
                ('ubicacionProyecto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.ubicacionproyecto')),
            ],
            options={
                'db_table': 'proyecto_Proyecto',
            },
        ),
        
        migrations.AddField(
            model_name='configuracionentregableproyecto',
            name='proyecto_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyecto.proyecto'),
        ),
        migrations.AddField(
            model_name='eventos',
            name='tipoevento',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.tipoeventos'),
        ),
    ]
