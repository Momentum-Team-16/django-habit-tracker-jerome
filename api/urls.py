from django.urls import path, include
from . import views

urlpatterns = [
    path('habits/', views.HabitListAPIView.as_view(), name='Habit-List'),
    path('habits/<int:pk>/', views.HabitDetailAPIView.as_view(), name='Habit-Detail'),
    path('api-auth/', include('rest_framework.urls')),
]
