import React from "react";
import type { JSX, CSSProperties } from "react"; // * added CSSProperties to type inline style objects

export default function GenericErrorComponent({
  message = "Undefined error",
  lib = "bs",
}: {
  message?: string;
  lib?: "bs" | "mui";
}): JSX.Element {
  const inlineStyle: CSSProperties = {
    fontSize: "0.8rem",
    marginBlock: "1rem",
  }; // * explicitly type inlineStyle
  const muiButton: CSSProperties = {
    // * removed pseudo-selectors (&:hover, &:active, etc.) that are invalid in inline styles
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "bold",
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    minWidth: "64px",
    padding: "6px 16px",
    borderRadius: "4px",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    cursor: "pointer",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    userSelect: "none",
    verticalAlign: "middle",
    WebkitTapHighlightColor: "transparent",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#1976d2",
    color: "#fff",
  };

  const muiClasses =
      "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary",
    bsButton = "btn btn-info";

  return (
    <article
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        minWidth: "100%",
        paddingInline: "10vw",
        backgroundColor: "#afa3a396",
      }}
    >
      <h2 className="mg__2bv widHalf">
        <strong style={{ marginTop: "0.25rem" }}>
          Oops, something went wrong!&nbsp;
          <span role="img" aria-label="scared">
            😨
          </span>
        </strong>
      </h2>
      <h4 style={{ fontSize: "0.8rem", marginBlock: "1rem", color: "red" }}>
        {message}
      </h4>
      <fieldset
        id="errorBoundaryHandlingCta"
        style={{
          display: "flex",
          columnGap: "1rem",
          flexWrap: "wrap",
          border: "none",
        }}
      >
        <button
          style={{ ...inlineStyle, ...(lib === "mui" ? muiButton : {}) }}
          type="button"
          className={lib === "mui" ? muiClasses : bsButton}
          onClick={() => window.open(window.location.href, "_self")}
        >
          <span className={lib === "mui" ? "MuiButton-label" : ""}>
            Recarregar página
          </span>
          {lib === "mui" && <span className="MuiTouchRipple-root"></span>}
        </button>
        <button
          style={{ ...inlineStyle, ...(lib === "mui" ? muiButton : {}) }}
          type="button"
          className={lib === "mui" ? muiClasses : bsButton}
          onClick={() => window.open(window.location.origin, "_self")}
        >
          <span className={lib === "mui" ? "MuiButton-label" : ""}>
            Retornar para a página inicial
          </span>
          {lib === "mui" && <span className="MuiTouchRipple-root"></span>}
        </button>
      </fieldset>
    </article>
  );
}
