from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from prompt_creator_app_main_backend.apps import PromptCreatorAppMainBackendConfig
from prompt_creator_app_main_backend.views import hello_filename, project_filename

app_urls = f'{PromptCreatorAppMainBackendConfig.name}.urls'

print(app_urls)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(app_urls)),
    path('', RedirectView.as_view(url=f'{hello_filename}/')),
    path('project/', RedirectView.as_view(url=f'{project_filename}/'))
]
