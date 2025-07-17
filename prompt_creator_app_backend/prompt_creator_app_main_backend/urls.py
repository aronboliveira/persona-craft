from django.urls import path
from .views import (hello_view, hello_filename, project_view, project_filename, 
                    chat_api, start_chainlit, stop_chainlit, view_chainlit)

urlpatterns = [
  path(f'{hello_filename}/', hello_view, name=hello_filename),
  path(f'__{project_filename}/', project_view, name=project_filename),
  path('api/chat/', chat_api, name='chat_api'),
  path('start-chainlit/', start_chainlit, name='start_chainlit'),
  path('stop-chainlit/', stop_chainlit, name='stop_chainlit'),
  path('view-chainlit/', view_chainlit, name='view_chainlit'),
]