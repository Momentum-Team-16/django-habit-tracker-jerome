"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from habittracker import views
from config import settings
from api import urls as api_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('registration.backends.simple.urls')),
    path('', views.index, name='home'),
    path('habit/<int:pk>', views.habit_detail, name='habit-detail'),
    path('habit/new', views.create_habit, name='habit-new'),
    path('__debug__/', include('debug_toolbar.urls')),
    path('habit/<int:pk>/edit', views.habit_edit, name='habit-edit'),
    path('habit/<int:pk>/delete', views.habit_delete, name='habit-delete'),
    path('habit/<int:pk>/records', views.create_record, name='record-new'),
    path('record/<int:pk>/edit', views.record_edit, name='record-edit'),
    path('record/<int:pk>/delete', views.record_delete, name='record-delete'),
    path('habit/<int:pk>/delete_detail', views.habit_delete_detail, name='habit-delete-detail'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(api_urls)),
]
