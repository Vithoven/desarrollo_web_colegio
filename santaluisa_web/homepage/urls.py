from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('crear_usuario/', views.crear_usuario, name='crear_usuario'),
    path('recuperar/', views.recuperar, name='recuperar'),
    path('admin/', views.admin, name='admin'),
]