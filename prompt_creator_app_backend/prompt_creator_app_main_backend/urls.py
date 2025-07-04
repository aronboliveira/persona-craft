from django.urls import path
from .views import hello_view, hello_filename, project_view, project_filename

urlpatterns = [
  path(f'{hello_filename}/', hello_view, name=hello_filename),
  path(f'{project_filename}/', project_view, name=project_filename),
]