# Generated by Django 3.2.25 on 2024-10-16 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='', max_length=8, unique=True)),
                ('password', models.CharField(max_length=16)),
                ('created_at2', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RenameField(
            model_name='room',
            old_name='created_at',
            new_name='created_at1',
        ),
    ]
