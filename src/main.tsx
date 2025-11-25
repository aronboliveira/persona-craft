import { DOMHelper } from "./lib/utils/DOMHelper.ts";
DOMHelper.setupGlobalErrorHandlers();
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { formsStore } from "./redux/mainStore/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/appTheme.tsx";
import LayoutWatcher from "./components/hidden/LayoutWatcher.tsx";
import { ErrorBoundary } from "react-error-boundary";
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
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error("Error caught by boundary:", error);
        console.error("Component stack:", errorInfo.componentStack);
        alert(`An error occurred: ${error.message}`);
      }}
    >
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Provider store={formsStore}>
          <App />
        </Provider>
      </ThemeProvider>
      <LayoutWatcher />
    </ErrorBoundary>
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
