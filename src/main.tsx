import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { formsStore } from "./redux/mainStore/index.ts";
const root = document.getElementById("root");
root
  ? createRoot(root).render(
      <Provider store={formsStore}>
        <App />
      </Provider>
    )
  : createRoot(document.body).render("<div>Could not load the app</div>");
