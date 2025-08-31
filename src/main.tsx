import { createRoot } from "react-dom/client";
import App from "./App.tsx";
const root = document.getElementById("root");
/* eslint-disable */
root
  ? createRoot(root).render(<App />)
  : createRoot(document.body).render("<div>Could not load the app</div>");
/* eslint-enable */
