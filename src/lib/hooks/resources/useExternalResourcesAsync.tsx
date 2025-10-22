import { useEffect, useState } from "react";

export interface ExternalResource {
  type: "script" | "link";
  src?: string;
  href?: string;
  rel?: string; // for <link>
  async?: boolean; // for <script>
}

/**
 * Injects the given resources and returns `true` once **all** have been
 * loaded (or errored).  Ideal to show a spinner while remote CSS / JS arrive.
 */
export function useExternalResourcesAsync(
  resources: ExternalResource[]
): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let done = 0;

    const handleDone = () => {
      done += 1;
      if (mounted && done === resources.length) setReady(true);
    };

    const created: HTMLElement[] = resources.map(r => {
      const el =
        r.type === "link"
          ? (document.createElement("link") as HTMLLinkElement)
          : (document.createElement("script") as HTMLScriptElement);

      if (r.type === "link") {
        (el as HTMLLinkElement).rel = r.rel ?? "stylesheet";
        (el as HTMLLinkElement).href = r.href ?? "";
      } else {
        (el as HTMLScriptElement).src = r.src ?? "";
        (el as HTMLScriptElement).async = r.async ?? false;
      }

      el.addEventListener("load", handleDone);
      el.addEventListener("error", handleDone);

      document.head.appendChild(el);
      return el;
    });

    return () => {
      mounted = false;
      Array.from(created)
        .filter(
          ss =>
            ss.getAttribute("data-vite-dev-id") &&
            ss.getAttribute("data-vite-dev-id") &&
            !/\.module\.s?css/g.test(ss.getAttribute("data-vite-dev-id") ?? "")
        )
        .forEach(n => n.parentElement?.removeChild(n));
    };
  }, [resources]);

  return ready;
}
