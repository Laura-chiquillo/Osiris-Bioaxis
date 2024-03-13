# Generated by Django 5.0 on 2024-03-13 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='categoriaMinciencias',
        ),
        migrations.RemoveField(
            model_name='producto',
            name='cuartilEsperado',
        ),
        migrations.AlterField(
            model_name='producto',
            name='estadoProducto',
            field=models.CharField(choices=[('resaccion', 'resaccion'), ('sometido', 'sometido'), ('publicado', 'publicado')], default='En proceso', max_length=50),
        ),
        migrations.RemoveField(
            model_name='producto',
            name='rolProducto',
        ),
        migrations.DeleteModel(
            name='CategoriaMinciencias',
        ),
        migrations.DeleteModel(
            name='CuartilEsperado',
        ),
        migrations.DeleteModel(
            name='EstadoProducto',
        ),
        migrations.DeleteModel(
            name='RolProducto',
        ),
    ]
