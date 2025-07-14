import type { JSX } from "react";
import { useEffect } from "react";
import { useExternalResources } from "../../lib/hooks/useExternalResources";
import useOpacityTransition from "../../lib/hooks/useOpacityTransition";
import Chatbot from "../../components/providers/Chatbot";
export default function Test(): JSX.Element {
  useExternalResources([{ type: "link", href: "/styles/home.css" }]);
  useOpacityTransition();
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll("style").forEach(st => {
        if (
          !st.classList.contains("home-keep") &&
          !/\.module\.s?css/g.test(st.outerHTML)
        )
          st.innerHTML = "";
      });
    }, 500);
  }, []);
  return (
    <>
      <p>This is a test!</p>
      <div style={{ position: "absolute", top: "40vh", left: "60vw" }}>
        <Chatbot />
      </div>
    </>
  );
}
