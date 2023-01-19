from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import User, Habit, Record
import json


# Create your views here.
def index(request):
    habits = Habit.objects.all()
    context = {
        'habits': habits,
    }
    return render(request, 'habittracker/index.html', context)


def habit_detail(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    return render(request, 'habittracker/habit_detail.html', {'habit': habit})


def create_habit(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        habit_name = data['habitName']
        habit_target = data['habitTarget']
        habit_unit = data['habitUnit']
        habit_user = request.user

        habit, created = Habit.objects.get_or_create(
            name=habit_name,
            target=habit_target,
            unit_measure=habit_unit,
            owner=habit_user,
        )

        habit.save()
        data = {
            'habit_name': habit.name,
            'habit_target': habit.target,
            'habit_unit': habit.unit_measure,
            'habit_pk': habit.pk,
        }
    else:
        data = {'created': 'nothing'}
    return JsonResponse(data)
