import type { JSX } from "react";
import type { GuidanceProps } from "../../../lib/declarations/interfaces/components";
import { useEffect, useRef } from "react";

export default function Guidance({
  style = {},
  svgStyle = {},
  className = "",
  svgClassName = "",
  extra = {},
  callback = () => {},
  callbackArgs = [],
}: GuidanceProps): JSX.Element {
  const r = useRef<HTMLButtonElement | null>(null),
    baseStyle = {
      display: "flex",
      placeItems: "center",
      placeContent: "center",
    };
  useEffect(() => {
    if (!r.current || !extra) return;
    for (const [k, v] of Object.entries(extra)) {
      const descriptor =
        Object.getOwnPropertyDescriptor(Element.prototype, k) ||
        Object.getOwnPropertyDescriptor(r.current, k);
      if (descriptor && descriptor.writable !== false) {
        if (k in r.current) (r.current as any)[k] = v;
        else r.current.setAttribute(k, v);
      }
    }
  }, [r.current]);
  return (
    <button
      ref={r}
      style={
        style
          ? {
              ...style,
              ...baseStyle,
            }
          : baseStyle
      }
      type="button"
      className={`icon-guidance${className ? ` ${className}` : ""}`}
      onClick={() => {
        console.log("calling the callback... " + callback.name, callbackArgs);
        callback(...callbackArgs);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`bi bi-journal-bookmark${
          svgClassName ? ` ${svgClassName}` : ""
        }`}
        viewBox="0 0 16 16"
        style={svgStyle ? svgStyle : {}}
      >
        <path
          fillRule="evenodd"
          d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8"
        />
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
      </svg>
    </button>
  );
}
