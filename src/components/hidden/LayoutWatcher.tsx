import { useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
export default function LayoutWatcher({
  argsToTrack = [],
  cb = () => {},
}: {
  argsToTrack?: any[];
  cb?: (...args: any[]) => any;
}) {
  const dataLayoutTracking = useRef<string>("data-layout_tracking"),
    intervRef = useRef<number | NodeJS.Timeout | null>(null);
  argsToTrack = Array.isArray(argsToTrack)
    ? argsToTrack
        .filter(Boolean)
        .map(e => !Array.isArray(e) && typeof e !== "object")
    : [];
  const checkLayout = () => {
    let ref = null;
    const _root = document.getElementById("root");
    if (!document.body) ref = document.body;
    else if (_root?.isConnected) ref = _root;
    if (!ref || ref?.hasChildNodes()) return;
    createRoot(ref).render(
      <div
        style={{
          margin: "auto auto",
          zIndex: 9999,
        }}
      >
        <strong>Something went wrong! Try reloading the page.</strong>
        <fieldset>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => (window.location.href = "/")}
          >
            Return to Home
          </button>
        </fieldset>
      </div>
    );
  };
  useLayoutEffect(() => {
    typeof cb === "function" && cb();
    if (
      document.documentElement.getAttribute(dataLayoutTracking.current) !==
      "true"
    ) {
      intervRef.current = setInterval(() => {
        if (!document.body) return;
        checkLayout();
      }, 3000);
      document.documentElement.setAttribute(dataLayoutTracking.current, "true");
    }
    return () => {
      intervRef.current && clearInterval(intervRef.current as number);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, dataLayoutTracking, ...argsToTrack]);
  return <span id="layoutWatcher" style={{ display: "none" }}></span>;
}
