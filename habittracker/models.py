from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

# Create your models here.


class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)

    def __str__(self):
        return self.username


class Habit(models.Model):
    name = models.CharField(max_length=200, unique=True)
    target = models.IntegerField(validators=[MinValueValidator(0)], blank=True, null=True)
    unit_measure = models.TextField(max_length=100, blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} {self.target} {self.unit_measure}'


class Record(models.Model):
    date = models.DateField()
    quantity = models.IntegerField(validators=[MinValueValidator(0)], blank=True, null=True)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='records')

    def __str__(self):
        return f'{self.habit} on {self.date}'
