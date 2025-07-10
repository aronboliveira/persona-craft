import type { JSX } from "react";
import { useEffect } from "react";
export default function Test(): JSX.Element {
  useEffect(() => {
    document.body.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 2000);
    return () => {
      for (const e of document.getElementsByClassName("page-unique"))
        e.remove();
    };
  }, []);
  return (
    <div dangerouslySetInnerHTML={{ __html: "<p>This is a test!</p>" }}></div>
  );
}
