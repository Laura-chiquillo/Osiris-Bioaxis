# Generated by Django 4.2.1 on 2023-06-15 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto', '0004_alter_listaproducto_proyectocursoproducto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='investigador',
            name='contrasena',
            field=models.CharField(max_length=128),
        ),
    ]
