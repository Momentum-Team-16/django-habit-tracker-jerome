from django import forms
from .models import Habit, Record, User
from django.contrib.auth.forms import UserCreationForm, ValidationError
from django.contrib.auth import get_user_model


class HabitForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ('name', 'target', 'unit_measure')


class RecordForm(forms.ModelForm):
    class Meta:
        model = Record
        fields = ('date', 'quantity')


# https://code.djangoproject.com/ticket/19353
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model()

    def clean_username(self):
        """Reject usernames that differ only in case."""
        username = self.cleaned_data.get("username")
        UserModel = get_user_model()
        if username and UserModel.objects.filter(username__iexact=username).exists():
            raise ValidationError(self.error_messages["unique"], code="unique")
        else:
            return username
