import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { formsStore } from "./redux/mainStore/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/appTheme.tsx";
const root = document.getElementById("root");
root
  ? createRoot(root).render(
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Provider store={formsStore}>
          <App />
        </Provider>
      </ThemeProvider>
    )
  : createRoot(document.body).render("<div>Could not load the app</div>");
