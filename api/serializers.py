from rest_framework import serializers
from habittracker.models import Habit, Record


class RecordSerializer(serializers.ModelSerializer):
    habit = serializers.PrimaryKeyRelatedField(read_only=True)
    target_status = serializers.SerializerMethodField('get_target_status')

    def get_target_status(self, record):
        habit_target = record.habit.target
        return record.quantity >= habit_target

    class Meta:
        model = Record
        fields = ('id', 'date', 'quantity', 'habit', 'target_status')


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
