from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    issue = models.TextField()
    insurance = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100)
    password = models.CharField(max_length=128)  # Adjusted length for hashed password

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if it's a new instance
            self.password = make_password(self.password)  # Hash the password before saving
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    specialty = models.CharField(max_length=100)
    yearsExperience = models.IntegerField()
    availability = models.CharField(max_length=100)
    password = models.CharField(max_length=128)  # Adjusted length for hashed password
    photo = models.ImageField(upload_to='doctor_photos/', null=True, blank=True)
    rating = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if it's a new instance
            self.password = make_password(self.password)  # Hash the password before saving
        super(Doctor, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField() 

    def __str__(self):
        return f"{self.user} - {self.doctor} on {self.date} at {self.time}"
