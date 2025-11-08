import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./slices/promptSlice";
import { MainStoreState } from "../../lib/declarations/interfaces/redux";
export const STG_KEY = "promptCreatorPromptState";
export const formsStore = configureStore<MainStoreState>({
  reducer: formsReducer,
  devTools: import.meta.env.DEV,
  preloadedState: ((): MainStoreState | undefined => {
    try {
      const raw = localStorage.getItem(STG_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw) as MainStoreState;
      return parsed;
    } catch (error) {
      console.error("Failed to parse forms state from localStorage:", error);
      return undefined;
    }
  })(),
  middleware: getDefaultMiddleware => {
    console.log("MIDDLEWARE");
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  enhancers: (getDefaultEnhancers: any): any => {
    console.log("ENHANCERS");
    console.log();
    return [...getDefaultEnhancers()];
  },
});
let timer: number | undefined;
formsStore.subscribe(() => {
  const state = formsStore.getState();
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    try {
      localStorage.setItem(STG_KEY, JSON.stringify(state));
    } catch {
      // fail silently
    }
  }, 300);
});
