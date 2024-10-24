# Generated by Django 5.1.1 on 2024-10-21 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='email',
            field=models.EmailField(default='no-email@example.com', max_length=255, unique=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$870000$Z7uGulH1yVgYFMUn0J6hcc$66GeO71qkbsDE+mhfElgaWINlFvsj0CGFYxmQHJ85uc=', max_length=100),
        ),
        migrations.AlterField(
            model_name='doctor',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='doctor_photos/'),
        ),
    ]
