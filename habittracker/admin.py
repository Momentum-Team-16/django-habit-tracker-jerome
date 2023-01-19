from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Habit, Record

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Habit)
admin.site.register(Record)
