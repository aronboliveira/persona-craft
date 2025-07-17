from django.http import JsonResponse, HttpResponseRedirect
from django.utils import timezone
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods
from .apps import PromptCreatorAppMainBackendConfig
from ctransformers import AutoModelForCausalLM
import os
import subprocess
import time
import socket
import logging
from django.shortcuts import render
from django.apps import apps
import json

hello_filename = 'hello'
project_filename = 'project'
logger = logging.getLogger(__name__)
CHAINLIT_HOST = "127.0.0.1"
CHAINLIT_PORT = 8002
chainlit_process = None
llm = None

async def allow_iframe(request, call_next):
    response = await call_next(request)
    response.headers.pop("x-frame-options", None)
    response.headers.pop("X-Frame-Options", None)
    response.headers["Content-Security-Policy"] = (
        "frame-ancestors 'self' http://127.0.0.1:* http://localhost:* http://127.0.0.1:5174 http://localhost:5174; "
        "style-src 'self' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net/npm/bootstrap@5.3.7"
        "font-src 'self' https://cdnjs.cloudflare.com; "
        "img-src 'self' https://upload.wikimedia.org data:; "
        "script-src 'self' https://cdn.jsdelivr.net/npm/bootstrap@5.3.7; "
        "default-src 'self'; "
        "connect-src 'self'; "
        "object-src 'none'; "
        "base-uri 'self'; "
        "form-action 'self'; "
        "frame-src 'self' http://127.0.0.1:* http://localhost:*;"
    )

    return response

@require_GET
def hello_view(request):
    hello_path = f'{PromptCreatorAppMainBackendConfig.name}/{hello_filename}.html'
    print(hello_path)
    return render(request, hello_path, {
        'now': timezone.now(),
        'friendly_name': PromptCreatorAppMainBackendConfig.verbose_name
    })

@require_GET
def project_view(request):
    project_path = f'{PromptCreatorAppMainBackendConfig.name}/{project_filename}.html'
    print(project_path)
    return render(request, project_path, {})

def is_port_in_use(port):
    """Check if a port is currently in use."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('127.0.0.1', port))
            return False
        except OSError:
            return True

def find_available_port(start_port=8002, max_attempts=10):
    """Find an available port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        if not is_port_in_use(port):
            return port
    return None

def get_prompt(user_message, history):
    """Helper function to format the prompt - implement as needed"""
    return f"User: {user_message}\nAssistant:"

@require_GET
def stop_chainlit(request):
    """Stop the Chainlit process."""
    global chainlit_process
    if chainlit_process:
        try:
            chainlit_process.terminate()
            chainlit_process.wait(timeout=5)  # Wait up to 5 seconds for graceful shutdown
        except subprocess.TimeoutExpired:
            chainlit_process.kill()  # Force kill if it doesn't terminate gracefully
        except Exception as e:
            logger.error(f"Error stopping Chainlit: {e}")
        finally:
            chainlit_process = None
        return JsonResponse({'status': 'stopped'})
    return JsonResponse({'status': 'Not running'})

@require_GET
def init_chainlit(request):
    """Initialize Chainlit process."""
    global chainlit_process, CHAINLIT_PORT
    
    # Check if process is already running and healthy
    if chainlit_process and chainlit_process.poll() is None:
        return JsonResponse({'status': 'already_running', 'port': CHAINLIT_PORT})
    
    # Find an available port
    available_port = find_available_port(CHAINLIT_PORT)
    if not available_port:
        return JsonResponse({
            'error': 'No available ports found',
            'status': 'error',
        }, status=500)
    
    # Update the port if different
    if available_port != CHAINLIT_PORT:
        CHAINLIT_PORT = available_port
        logger.info(f"Using port {CHAINLIT_PORT} instead of 8002")
    
    try:
        # Get the path to the llm.py file
        llm_path = os.path.join(
            os.path.normpath(os.path.dirname(os.path.abspath(__file__))), 
            'llms', 
            'llm.py'
        )
        
        # Start the Chainlit process
        chainlit_process = subprocess.Popen([
            'chainlit', 'run', llm_path,
            '--port', str(CHAINLIT_PORT),
            '--headless'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Wait a moment for the process to start
        time.sleep(2)
        
        # Check if the process started successfully
        if chainlit_process.poll() is not None:
            stdout, stderr = chainlit_process.communicate()
            return JsonResponse({
                'error': f'Chainlit failed to start: {stderr.decode()}',
                'status': 'error',
            }, status=500)
        
        return JsonResponse({
            'status': 'initialized', 
            'port': CHAINLIT_PORT,
            'url': f'http://127.0.0.1:{CHAINLIT_PORT}'
        })
        
    except Exception as e:
        logger.error(f"Error initializing Chainlit: {e}")
        return JsonResponse({
            'error': str(e),
            'status': 'error',
        }, status=500)


logger = logging.getLogger(__name__)

@require_GET
@xframe_options_exempt      # drops Django’s X-Frame-Options for this view
def view_chainlit(request):
    global chainlit_process, CHAINLIT_PORT

    try:
        stop_chainlit(request)
        init_resp = init_chainlit(request)
        if init_resp.status_code != 200:
            return init_resp

        app_config    = apps.get_app_config('prompt_creator_app_main_backend')
        template_name = f'{app_config.name}/chainlit_embed.html'
        context       = {'chainlit_port': CHAINLIT_PORT}

        # render the iframe wrapper
        return render(request, template_name, context)

    except Exception as e:
        logger.error(f"view_chainlit error: {e}")
        return JsonResponse({'error': str(e), 'status': 'error'}, status=500)


@require_GET
def start_chainlit(request):
    """Start Chainlit and redirect to it."""
    global chainlit_process
    try:
        init_response = init_chainlit(request)
        if init_response.status_code != 200:
            return init_response
        
        # Redirect to the actual port being used
        return HttpResponseRedirect(f'http://http://127.0.0.1:{CHAINLIT_PORT}')
        
    except Exception as e:
        logger.error(f"Error in start_chainlit: {e}")
        return JsonResponse({
            'error': str(e),
            'status': 'error',
        }, status=500)

@csrf_exempt
@require_http_methods(['POST'])
def chat_api(request):
    def initialize_llm():
        global llm
        if llm is None:
            llm = AutoModelForCausalLM.from_pretrained(
                'zoltanctoth/orca_mini_3B-GGUF',
                model_file='orca-mini-3b.q4_0.gguf'
            )
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '')
        history = data.get('history', [])
        model = initialize_llm()
        prompt = get_prompt(user_message, history)
        response = ''
        for token in model(prompt, stream=True):
            response += token
        return JsonResponse({
            'response': response.strip(),
            'status': 'success',
        })
    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'status': 'error',
        }, status=500)