import { NEl, NHtEl, NInput } from "../declarations/types/foundations";

export class DOMHelper {
  static queryClassSnap(
    scope: Document | NHtEl,
    className: string
  ): NEl[] | [] {
    if (!scope) return [];
    return Array.from(scope.getElementsByClassName(className));
  }
  static queryRadio(container: NEl, el: NEl): NInput {
    if (!container) return null;
    let radio =
      (container.querySelector<HTMLInputElement>(
        'input[type="radio"]'
      ) as NInput) ||
      (el?.querySelector<HTMLInputElement>('input[type="radio"]') as NInput);
    if (!radio && container.parentElement)
      radio = container.parentElement.querySelector<HTMLInputElement>(
        'input[type="radio"]'
      ) as NInput;
    return radio;
  }
  static injectAttrs(
    attrMap: Record<string, string> | Map<string, string>,
    el: NEl
  ): void {
    if (!el) return;
    for (const [attr, value] of Object.entries(attrMap))
      !el.getAttribute(attr) !== value && el.setAttribute(attr, value);
  }
  static clearAttrs(...params: Parameters<typeof this.injectAttrs>): void {
    const [attrMap, el] = params;
    if (!el) return;
    for (const [attr, v] of Object.entries(attrMap))
      el.getAttribute(attr) === v && el.removeAttribute(attr);
  }
  static injectListeners(
    listeners: Record<string, EventListener> | Map<string, EventListener>,
    el: NHtEl,
    passive: boolean = false
  ): void {
    if (!el?.isConnected) return;
    for (const [ev, listener] of Object.entries(listeners)) {
      if (
        !el ||
        ["on", "1", "true"].includes(
          el.getAttribute(`data-${ev}-listening-bound`) || ""
        )
      )
        continue;
      el.addEventListener(ev, listener, { passive });
    }
  }
  static clearListeners(
    ...params: Parameters<typeof this.injectListeners>
  ): void {
    const [listeners, el] = params;
    if (!el) return;
    for (const [ev, listener] of Object.entries(listeners))
      el.removeEventListener(ev, listener);
  }
  static setupGlobalErrorHandlers(): () => void {
    let errorShown = false;
    const showErrorUI = (error?: Error | string) => {
        if (errorShown) return;
        errorShown = true;
        const errorMessage =
          error instanceof Error
            ? error.message
            : String(error || "Unknown error");
        const root = document.getElementById("root"),
          target = root || document.body;
        if (target) {
          target.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #0a0a0a;
          color: #ffffff;
        ">
          <div style="
            max-width: 600px;
            padding: 30px;
            background-color: #1a1a1a;
            border-radius: 8px;
            border: 1px solid #333;
          ">
            <h1 style="margin-top: 0; color: #ff6b6b;">⚠️ Application Error</h1>
            <p style="margin-bottom: 20px;">Something went wrong and the application failed to load.</p>
            <details style="margin-bottom: 20px;">
              <summary style="cursor: pointer; margin-bottom: 10px;">Error Details</summary>
              <pre style="
                background-color: #0a0a0a;
                padding: 15px;
                border-radius: 4px;
                overflow-x: auto;
                font-size: 12px;
                color: #ff6b6b;
              ">${errorMessage}</pre>
            </details>
            <div style="display: flex; gap: 10px;">
              <button onclick="window.location.reload()" style="
                padding: 10px 20px;
                background-color: #4a9eff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
              ">Reload Page</button>
              <button onclick="window.location.href='/'" style="
                padding: 10px 20px;
                background-color: #666;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
              ">Go Home</button>
            </div>
          </div>
        </div>
      `;

          // Make body visible
          document.body.style.opacity = "1";
        }
      },
      dataHandlingGlobalErrors = "data-handling_global_errors";
    if (
      (document.body || document.documentElement).getAttribute(
        dataHandlingGlobalErrors
      ) === "true"
    )
      return () => {};
    window.addEventListener("unhandledrejection", event => {
      console.error("Unhandled promise rejection:", event.reason);
      showErrorUI(event.reason);
      event.preventDefault();
    });
    window.addEventListener("error", event => {
      console.error("Global error:", event.error || event.message);
      showErrorUI(event.error || event.message);
      event.preventDefault();
    });
    let renderCheckTimeout: number;
    const checkRenderSuccess = () => {
      renderCheckTimeout = window.setTimeout(() => {
        const root = document.getElementById("root");
        const body = document.body;
        const hasContent =
          root &&
          (root.children.length > 0 ||
            root.textContent?.trim().length ||
            0 > 0);
        if (body.style.opacity === "0" || !hasContent)
          showErrorUI("Application failed to render");
      }, 2000);
    };
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", checkRenderSuccess)
      : checkRenderSuccess();
    (document.body || document.documentElement).setAttribute(
      dataHandlingGlobalErrors,
      "true"
    );
    return (): void => clearTimeout(renderCheckTimeout);
  }
}
