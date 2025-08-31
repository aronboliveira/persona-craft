import { JSX, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";

export default function Forms(): JSX.Element {
  useOpacityTransition();
  useEffect(() => {}, []);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <form>
        <p>Primeira pergunta</p>
        <button>Enviar</button>
      </form>
    </ErrorBoundary>
  );
}
