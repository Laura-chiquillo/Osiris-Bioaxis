# Generated by Django 5.0 on 2024-05-02 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto', '0007_remove_investigador_tipposgrado_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='investigador',
            name='horasestricto',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='investigador',
            name='horasformacion',
            field=models.IntegerField(default=0),
        ),
    ]
