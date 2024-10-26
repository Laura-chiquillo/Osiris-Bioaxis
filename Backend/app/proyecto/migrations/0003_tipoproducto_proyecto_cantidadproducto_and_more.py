# Generated by Django 5.0.1 on 2024-10-23 19:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto', '0002_alter_producto_listaproducto'),
    ]

    operations = [
        migrations.CreateModel(
            name='TipoProducto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'proyecto_TipoProducto',
            },
        ),
        migrations.AddField(
            model_name='proyecto',
            name='cantidadProducto',
            field=models.CharField(blank=True, max_length=1500, null=True),
        ),
        migrations.AlterField(
            model_name='producto',
            name='listaProducto',
            field=models.ForeignKey(default=10, on_delete=django.db.models.deletion.CASCADE, to='proyecto.listaproducto'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='proyecto',
            name='tipoProducto',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto.tipoproducto'),
        ),
    ]