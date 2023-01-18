from django.http import JsonResponse
from django.shortcuts import render
from .models import User, Habit, Record


# Create your views here.
def index(request):
    habits = Habit.objects.all()
    context = {
        'habits': habits,
    }
    return render(request, 'habittracker/index.html', context)
