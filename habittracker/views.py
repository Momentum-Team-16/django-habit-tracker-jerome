from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import User, Habit, Record
import json


# Create your views here.
def index(request):
    user = request.user
    habits = Habit.objects.filter(owner=user)
    context = {
        'habits': habits,
    }
    return render(request, 'habittracker/index.html', context)


def habit_detail(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    records = Record.objects.filter(habit=habit)
    context = {
        'habit': habit,
        'records': records,
    }
    return render(request, 'habittracker/habit_detail.html', context)


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

        data = {
            'habit_name': habit.name,
            'habit_target': habit.target,
            'habit_unit': habit.unit_measure,
            'habit_pk': habit.pk,
        }
    else:
        data = {'created': 'nothing'}
    return JsonResponse(data)


def habit_edit(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    if request.method == "POST":
        form = HabitForm(request.POST, instance=habit)
        if form.is_valid():
            form.save()
            return redirect('habit-detail', pk=habit.pk)
    else:
        form = HabitForm(instance=habit)
    return render(request, 'habittracker/habit_edit.html', {'form': form})


def habit_delete(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    habit.delete()
    data = {
        'deleted': 'yes'
    }
    return JsonResponse(data)


def create_record(request, pk):
    if request.method == 'POST':
        data = json.loads(request.body)
        record_date = data['recordDate']
        record_quantity = data['recordQuantity']
        habit = get_object_or_404(Habit, pk=pk)

        record, created = Record.objects.get_or_create(
            date=record_date,
            quantity=record_quantity,
            habit=habit,
        )

        data = {
            'record_date': record.date,
            'record_quantity': record.quantity,
            'record_pk': record.pk,
            'habit_name': habit.name,
            'habit_target': habit.target,
            'habit_unit': habit.unit_measure,
        }
    else:
        data = {'created': 'nothing'}
    return JsonResponse(data)


def record_edit(request, pk):
    record = get_object_or_404(Habit, pk=pk)
    if request.method == "POST":
        form = RecordForm(request.POST, instance=record)
        if form.is_valid():
            form.save()
            return redirect('habit-detail', pk=habit.pk)
    else:
        form = RecordForm(instance=record)
    return render(request, 'habittracker/record_edit.html', {'form': form})


def record_delete(request, pk):
    record = get_object_or_404(Record, pk=pk)
    record.delete()
    data = {
        'deleted': 'yes'
    }
    return JsonResponse(data)


def habit_delete_detail(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    habit.delete()
    return redirect('home')
