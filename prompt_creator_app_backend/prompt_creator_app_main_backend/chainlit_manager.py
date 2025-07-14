import atexit
import logging
import os
import socket
import subprocess
import threading
import time

from django.conf import settings

logger = logging.getLogger(__name__)

class ChainlitManager:
    """Thread‐safe singleton to start/stop Chainlit and check status."""
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        # Only run initialization once
        if not hasattr(self, "_initialized"):
            self._initialized = True
            self._lock = threading.Lock()
            atexit.register(self._cleanup)

    def _cleanup(self):
        """Ensure we kill the process on interpreter shutdown."""
        self.stop()

    def _write_pid(self, pid: int):
        with open(settings.CHAINLIT_PID_FILE, "w") as f:
            f.write(str(pid))

    def _read_pid(self) -> int | None:
        try:
            with open(settings.CHAINLIT_PID_FILE) as f:
                return int(f.read().strip())
        except Exception:
            return None

    def _remove_pidfile(self):
        try:
            os.remove(settings.CHAINLIT_PID_FILE)
        except OSError:
            pass

    def _wait_for_port(self, timeout: float) -> bool:
        """Non-blocking check that port is accepting connections."""
        deadline = time.time() + timeout
        while time.time() < deadline:
            try:
                with socket.create_connection(
                    (settings.CHAINLIT_HOST, settings.CHAINLIT_PORT), timeout=0.2
                ):
                    return True
            except OSError:
                time.sleep(0.1)
        return False

    def start(self) -> bool:
        """Start Chainlit if not running. Return True if started now."""
        with self._lock:
            pid = self._read_pid()
            # If a pidfile exists and process is alive, do nothing
            if pid and self._is_running(pid):
                logger.debug("Chainlit already running (PID=%d)", pid)
                return False

            # Remove stale pidfile
            self._remove_pidfile()

            # Build and launch subprocess
            cmd = [
                settings.CHAINLIT_CMD,
                "run",
                str(settings.CHAINLIT_SCRIPT_PATH),
                "--port", str(settings.CHAINLIT_PORT),
                "--headless"
            ]
            proc = subprocess.Popen(cmd, cwd=settings.BASE_DIR)
            self._write_pid(proc.pid)
            logger.info("Launched Chainlit (PID=%d)", proc.pid)

            # Wait for port
            if not self._wait_for_port(settings.CHAINLIT_STARTUP_TIMEOUT):
                proc.terminate()
                logger.error("Chainlit failed to bind port within timeout")
                raise RuntimeError("Chainlit did not start in time")
            return True

    def stop(self) -> bool:
        """Terminate Chainlit if running. Return True if it was running."""
        with self._lock:
            pid = self._read_pid()
            if not pid or not self._is_running(pid):
                logger.debug("No Chainlit process to stop")
                self._remove_pidfile()
                return False

            try:
                os.kill(pid, subprocess.signal.SIGTERM)
                logger.info("Sent SIGTERM to Chainlit (PID=%d)", pid)
            except OSError as e:
                logger.error("Error stopping Chainlit PID %d: %s", pid, e)
                raise

            self._remove_pidfile()
            return True

    def _is_running(self, pid: int) -> bool:
        """Check for a live process with given PID."""
        try:
            os.kill(pid, 0)
        except OSError:
            return False
        return True

    def status(self) -> str:
        pid = self._read_pid()
        return "running" if pid and self._is_running(pid) else "stopped"
