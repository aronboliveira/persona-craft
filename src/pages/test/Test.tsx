import type { JSX } from "react";
import useOpacityTransition from "../../lib/hooks/styles/useOpacityTransition";
import Chatbot from "../../components/providers/Chatbot";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../components/errors/GenericErrorComponent";
export default function Test(): JSX.Element {
  useOpacityTransition();
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <GenericErrorComponent message="Oops! Seems like something went wrong." />
      )}
    >
      <p>This is a test!</p>
      <Link to={"/main"} prefetch="viewport">
        Go to Forms
      </Link>
      <div style={{ position: "absolute", top: "40vh", left: "60vw" }}>
        <Chatbot />
      </div>
    </ErrorBoundary>
  );
}
