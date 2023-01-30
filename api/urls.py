from django.urls import path, include
from . import views

urlpatterns = [
    path('habits/', views.HabitListAPIView.as_view(), name='Habit-List'),
    path('habits/<int:pk>/', views.HabitDetailAPIView.as_view(), name='Habit-Detail'),
    path('habits/<int:habit_pk>/<int:pk>', views.RecordAPIView.as_view(), name='Record'),
    path('habits/<int:habit_pk>/new_record', views.RecordCreateAPIView.as_view(), name='New-Record'),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
