import { DOMHelper } from "./lib/utils/DOMHelper.ts";
DOMHelper.setupGlobalErrorHandlers();
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { formsStore } from "./redux/mainStore/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/appTheme.tsx";
import LayoutWatcher from "./components/hidden/LayoutWatcher.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./lib/utils/ErrorHandler.ts";
import QueryProvider from "./components/providers/QueryProvider.tsx";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <ErrorBoundary
      fallback={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          <p>
            <strong>Error:</strong> Something went wrong! Try reloading
          </p>
          <button onClick={window.location.reload}>Reload</button>
        </div>
      }
      onError={(error, errorInfo) => {
        ErrorHandler.handleReactBoundaryError({
          error,
          info: errorInfo,
          alertType: "hot",
        });
      }}
    >
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <QueryProvider>
          <Provider store={formsStore}>
            <App />
          </Provider>
        </QueryProvider>
        {createPortal(
          <div
            style={{
              position: "fixed",
              top: "0%",
              bottom: "90%",
              left: "0%",
              zIndex: 9999,
              width: "100vw",
              height: "10%",
              backgroundColor: "white",
              color: "red",
              textAlign: "center",
              opacity: 0.8,
              verticalAlign: "middle",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "fit-content",
            }}
            onMouseEnter={e => {
              if (e.currentTarget instanceof HTMLElement)
                e.currentTarget.style.opacity = "1";
            }}
            onFocus={e => {
              if (e.currentTarget instanceof HTMLElement)
                e.currentTarget.style.opacity = "1";
            }}
            onBlur={e => {
              if (e.currentTarget instanceof HTMLElement)
                e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={e => {
              if (e.currentTarget instanceof HTMLElement)
                e.currentTarget.style.opacity = "0.8";
            }}
          >
            <div style={{ marginInline: "auto" }}>
              The development of this project has been stopped. Feel free to
              fork it on{" "}
              <a
                style={{ color: "red" }}
                href="https://github.com/aronboliveira/persona-craft/tree/main"
                target="_blank"
                rel="noopener nofollow"
              >
                Github
              </a>
              . You can find a complete version with simpler UI
              <a
                style={{ color: "red" }}
                href="https://prompt-shape-creator.netlify.app/"
              >
                {" "}
                Here
              </a>
            </div>
          </div>,
          document.body,
        )}
      </ThemeProvider>
      <LayoutWatcher />
    </ErrorBoundary>,
  );
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
} else {
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1>Critical Error</h1>
      <p>Could not find root element</p>
      <button onclick="window.location.reload()">Reload</button>
    </div>
  `;
  document.body.style.opacity = "1";
}
