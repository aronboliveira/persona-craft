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
}
