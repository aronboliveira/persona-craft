import { useCallback, useEffect, useMemo, useRef } from "react";
import { UseOptImgListenersProps } from "../../declarations/interfaces/hooks";
import { NEl, NInput } from "../../declarations/types/foundations";
import { DOMHelper } from "../../utils/DOMHelper";
import { hasOrInsideClass } from "../../utils/validations";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/mainStore";

export default function useOptImgsListeners({
  classNames = ["option-figure-img"],
  attrMap = { "data-keyboard_toggle": "1" },
  enabled = true,
  scope = typeof window?.document !== "undefined" ? window.document : null,
  globalNumbersAlso = false,
}: // tipStorageKey = "__kb_tip_blocked",
// tipSessionKey = "__kb_tip_shown",
UseOptImgListenersProps) {
  const lastBoundCount = useRef<number>(0),
    order = useSelector((s: RootState) => s.formStrategy.order),
    observerRef = useRef<MutationObserver | null>(null),
    rebindQueueRef = useRef<boolean>(false),
    // disposedRef = useRef<boolean>(false),
    // toastRootRef = useRef<NHtEl>(null),
    // toastReactRootRef = useRef<ReturnType<typeof createPortal> | null>(null),
    wasBoundOnce = useRef<boolean>(false),
    queryChain = useMemo(
      (): string =>
        classNames.map(cn => typeof cn === "string" && cn).join(" ") || "",
      [classNames]
    ),
    querySnapshot = (): NEl[] | [] =>
      DOMHelper.queryClassSnap(scope, queryChain),
    /* eslint-disable */
    selectRadio = (n: number): NEl => {
      try {
        n = Math.round(n);
        const nodes = querySnapshot().filter(Boolean) as Element[];
        if (!nodes?.length) return null;
        const el = nodes[n - 1];
        if (!el) return null;
        const container =
          (el.closest("label") as HTMLElement | null) ||
          (el.parentElement as HTMLElement | null) ||
          el;
        const radio: NInput = DOMHelper.queryRadio(container, el);
        if (!radio) return null;
        radio.click();
        radio.focus({ preventScroll: true });
        const scrollTarg = container ?? radio;
        scrollTarg.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        return radio ? el : null;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    /* eslint-enable */
    onKeyDown = useMemo((): EventListener => {
      return (evt: Event) => {
        if (!("key" in evt) || !/^[1-9]$/.test((evt as KeyboardEvent).key))
          return;
        (evt as KeyboardEvent).preventDefault();
        selectRadio(Number((evt as KeyboardEvent).key));
      };
      // eslint-disable-next-line
    }, [queryChain, selectRadio]),
    onGlobalKeyDown = useMemo((): EventListener => {
      return (evt: Event) => {
        if (
          !("key" in evt) ||
          !/^[1-9]$/.test((evt as KeyboardEvent).key) ||
          !lastBoundCount.current
        )
          return;
        evt.preventDefault();
        selectRadio(Number((evt as KeyboardEvent).key));
      };
    }, [selectRadio]),
    domListeners = useMemo((): Map<string, EventListener> => {
      return new Map<string, EventListener>(
        ["keydown"].map(ev => [ev, onKeyDown])
      );
    }, [onKeyDown]),
    installOn = (el: NEl): void => {
      DOMHelper.injectAttrs(attrMap, el);
      el instanceof HTMLElement && DOMHelper.injectListeners(domListeners, el);
    },
    uninstallOn = (el: NEl): void => {
      DOMHelper.clearAttrs(attrMap, el);
      el instanceof HTMLElement && DOMHelper.clearListeners(domListeners, el);
    },
    /* eslint-disable */
    installAll = (): void => {
      const nds = querySnapshot();
      nds.forEach(installOn);
      lastBoundCount.current = nds.length;
      nds.length
        ? (wasBoundOnce.current = true)
        : (wasBoundOnce.current = false);
    },
    uninstallAll = (): void => {
      const nds = querySnapshot();
      nds.forEach(uninstallOn);
      lastBoundCount.current = nds.length;
    },
    /* eslint-enable */
    scheduleRebind = useCallback((): void => {
      if (rebindQueueRef.current) return;
      rebindQueueRef.current = true;
      const run = () => {
        uninstallAll();
        installAll();
        rebindQueueRef.current = false;
      };
      typeof requestAnimationFrame === "function"
        ? requestAnimationFrame(run)
        : setTimeout(run, 0);
    }, [installAll, uninstallAll, rebindQueueRef]);
  useEffect(() => {
    try {
      if (!enabled || !scope) return;
      installAll();
      const obs = new MutationObserver(mutations => {
        try {
          let relevant = false;
          for (const m of mutations) {
            if (
              m.type === "attributes" &&
              m.attributeName === "src" &&
              queryChain
            ) {
              if (hasOrInsideClass(m.target, queryChain)) {
                relevant = true;
                break;
              }
            } else if (
              m.type === "childList" &&
              (m.addedNodes.length || m.removedNodes.length)
            ) {
              const set = [...m.addedNodes, ...m.removedNodes];
              for (const n of set)
                if (hasOrInsideClass(n, queryChain)) {
                  relevant = true;
                  break;
                }
              if (relevant) break;
            } else if (m.type === "characterData") {
              if (hasOrInsideClass(m.target.parentNode, queryChain)) {
                relevant = true;
                break;
              }
            }
            if (relevant) scheduleRebind();
          }
        } catch (err) {
          console.warn(err);
        }
      });
      obs.observe(scope instanceof Document ? scope.documentElement : scope, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
        attributeFilter: ["src"],
      });
      observerRef.current = obs;
      globalNumbersAlso &&
        typeof window?.document !== "undefined" &&
        window.document.addEventListener("keydown", onGlobalKeyDown);
    } catch (err) {
      console.error(err);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      globalNumbersAlso &&
        typeof window?.document !== "undefined" &&
        window.document.removeEventListener("keydown", onGlobalKeyDown);
      uninstallAll();
    };
  }, [
    enabled,
    classNames,
    queryChain,
    scope,
    globalNumbersAlso,
    domListeners,
    onGlobalKeyDown,
    installAll,
    uninstallAll,
    scheduleRebind,
    order,
  ]);
  // useEffect(() => {
  //   if (!enabled || typeof window === "undefined") return;
  //   if (
  //     ["1", "checked", "on"].includes(
  //       localStorage.getItem(tipStorageKey) || ""
  //     )
  //   )
  //     return;
  //   if (
  //     ["1", "checked", "on"].includes(
  //       sessionStorage.getItem(tipSessionKey) || ""
  //     )
  //   )
  //     return;
  //   if (!wasBoundOnce.current) return;
  //   disposedRef.current = false;
  //   (async () => {
  //     try {
  //     } catch (err) {
  //       //
  //     }
  //   })();
  //   return () => {
  //     disposedRef.current = true;
  //     if (toastReactRootRef.current) {
  //       toastReactRootRef.current.unmount();
  //     }
  //   };
  // }, [enabled, tipSessionKey, tipStorageKey, wasBoundOnce]);
}
