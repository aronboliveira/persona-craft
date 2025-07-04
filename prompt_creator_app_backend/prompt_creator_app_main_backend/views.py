from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.http import require_GET
from .apps import PromptCreatorAppMainBackendConfig

hello_filename = 'hello'
project_filename = 'project'

@require_GET
def hello_view(request):
    hello_path = f'{PromptCreatorAppMainBackendConfig.name}/{hello_filename}.html'
    print(hello_path)
    return render(request, hello_path, {
        'now': timezone.now(),
        'friendly_name': PromptCreatorAppMainBackendConfig.verbose_name
    })

def project_view(request):
    project_path = f'{PromptCreatorAppMainBackendConfig.name}/{project_filename}.html'
    print(project_path)
    return render(request, project_path, {})