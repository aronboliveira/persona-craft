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
      <p style={{ marginBottom: "2rem" }}>This is a test!</p>
      <h1> Where would like to start? </h1>
      <img
        loading="eager"
        decoding="async"
        alt="Loading the face of your character"
        src="/public/imgs/gender/anm/dall-e-fem-warr.png"
        width={200}
        height={200}
        style={{ borderRadius: "50%" }}
      ></img>
      <canvas>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="red"
          strokeWidth="3"
          fill="red"
        />
      </canvas>
      <Link
        to={"/main"}
        style={{
          backgroundColor: "purple",
          color: "white",
          fontWeight: "bold",
          padding: "1rem",
          verticalAlign: "center",
          margin: "0.5rem",
          borderRadius: "0.5rem",
        }}
        prefetch="viewport"
      >
        Go to Forms
      </Link>
      <div style={{ position: "absolute", top: "40vh", left: "60vw" }}>
        <Chatbot />
      </div>
    </ErrorBoundary>
  );
}
