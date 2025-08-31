import type { JSX } from "react";
import { useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import Navbar from "../components/navs/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import { useExternalResources } from "../lib/hooks/useExternalResources"; // adjust path if different
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import HomeManifest from "../components/providers/HomeManifest";

export default function Home(): JSX.Element {
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
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <Navbar />
      <div>
        <a href="#" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Persona Craft</h1>
      <h2>
        <em>Let&#39;s start creating your character here!</em>
      </h2>
      <HomeManifest />
    </ErrorBoundary>
  );
}
