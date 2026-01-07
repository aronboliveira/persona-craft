import { CSSProperties } from "react";
import { LoadingSpinnerProps } from "../../../lib/declarations/interfaces/components";

export default function LoadingSpinner({
  message = "Loading options...",
  size = 60,
}: LoadingSpinnerProps) {
  const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(51, 51, 51, 0.9)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 1000,
    gap: "1rem",
  };

  const spinnerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    border: `4px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `4px solid #3b82f6`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const textStyle: CSSProperties = {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#f3f0f0",
    textAlign: "center",
  };

  return (
    <div style={overlayStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
      {message && <div style={textStyle}>{message}</div>}
    </div>
  );
}
