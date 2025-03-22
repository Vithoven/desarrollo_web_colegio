from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def crear_usuario(request):
    return render(request, 'crear_usuario.html')

def recuperar(request):
    return render(request, 'recuperar.html')

def administrador(request):
    return render(request, 'administrador.html')
