// useScopedStyle.ts
import { useEffect } from "react";

/**
 * Injects a <style> tag containing the supplied CSS text while the component
 * is mounted and removes it automatically on unmount.
 *
 * @param css  Raw CSS rules to scope to the current page / component.
 *
 * @example
 * useScopedStyle(`
 *   .demo {
 *     background: tomato;
 *     color: white;
 *   }
 * `);
 */
export function useScopedStyle(css: string): void {
  useEffect(() => {
    const el = document.createElement("style");
    el.type = "text/css";
    el.textContent = css;
    document.head.appendChild(el);
    return () => {
      el.parentElement?.removeChild(el);
    };
  }, [css]);
}
