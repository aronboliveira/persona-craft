import type { JSX } from "react";
import reactLogo from "@/assets/react.svg";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";

export default function Home(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <div>
        <a href="#" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Persona Craft</h1>
      <h2>
        <em>Let's start creating your character here!</em>
      </h2>
    </ErrorBoundary>
  );
}
