from rest_framework import serializers
from habittracker.models import Habit, Record


class RecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Record
        fields = ('id', 'date', 'quantity', 'habit')


class HabitSerializer(serializers.ModelSerializer):
    records = RecordSerializer(many=True)
    owner = serializers.SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        model = Habit
        fields = ('id', 'name', 'target', 'unit_measure', 'owner', 'records')


class HabitListSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(slug_field='username', read_only=True)

    class Meta:
        model = Habit
        fields = ('id', 'name', 'target', 'unit_measure', 'owner')
