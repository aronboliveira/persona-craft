import type { JSX } from "react";
import Navbar from "../components/navs/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import HomeManifest from "../components/providers/HomeManifest";

export default function Home(): JSX.Element {
  useOpacityTransition();
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <div>
        <a href="#" target="_blank" rel="noreferrer">
          <img
            width={100}
            height={150}
            src="/logo.png"
            className="logo"
            alt="React logo"
            style={{ width: "100px", height: "100px" }}
          />
        </a>
      </div>
      <h1>Persona Craft</h1>
      <Navbar />
      <HomeManifest />
    </ErrorBoundary>
  );
}
