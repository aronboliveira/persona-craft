import { useEffect } from "react";

export interface ExternalResource {
  type: "link" | "script";
  /** For <link> tags. */
  href?: string;
  /** For <script> tags. */
  src?: string;
  /** Rel attribute for <link>.  Defaults to `"stylesheet"`. */
  rel?: string;
  /** Script async flag. */
  async?: boolean;
}

/**
 * Adds external CSS/JS to `<head>` on mount and removes them on unmount.
 *
 * @example
 * useExternalResources([
 *   { type: 'link', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
 *   { type: 'script', src: 'https://cdn.tailwindcss.com' }
 * ]);
 */
export function useExternalResources(resources: ExternalResource[]): void {
  useEffect(() => {
    const injected: HTMLElement[] = resources.map(res => {
      const el =
        res.type === "link"
          ? (document.createElement("link") as HTMLLinkElement)
          : (document.createElement("script") as HTMLScriptElement);

      if (res.type === "link") {
        (el as HTMLLinkElement).rel = res.rel ?? "stylesheet";
        (el as HTMLLinkElement).href = res.href ?? "";
      } else {
        (el as HTMLScriptElement).src = res.src ?? "";
        (el as HTMLScriptElement).async = res.async ?? false;
      }

      document.head.appendChild(el);
      return el;
    });
    return () => {
      Array.from(injected)
        .filter(
          ss =>
            ss.getAttribute("data-vite-dev-id") &&
            ss.getAttribute("data-vite-dev-id") &&
            !/\.module\.s?css/g.test(ss.getAttribute("data-vite-dev-id") ?? "")
        )
        .forEach(node => node.parentElement?.removeChild(node));
    };
  }, [resources]);
}
