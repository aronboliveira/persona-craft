from django.apps import AppConfig
from dotenv import load_dotenv
import os

load_dotenv()

class PromptCreatorAppMainBackendConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = os.getenv('APP_NAME', 'django_app')
    verbose_name = os.getenv('APP_VERBOSE_NAME', 'Django App')
