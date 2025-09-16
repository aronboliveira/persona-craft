import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./formsSlice";
import { FormsState } from "../../lib/declarations/interfaces/redux";
export const STG_KEY = "promptCreatorFormsState";
export const formsStore = configureStore<FormsState>({
  reducer: formsReducer,
  preloadedState: ((): FormsState | undefined => {
    try {
      const raw = localStorage.getItem(STG_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw) as FormsState;
      return parsed;
    } catch (error) {
      console.error("Failed to parse forms state from localStorage:", error);
      return undefined;
    }
  })(),
  middleware: (gdm: (...params: any[]) => any) =>
    gdm({ serializableCheck: false }),
  // enhancers: (defaultEnhancers: any): any => [defaultEnhancers],
  devTools: import.meta.env.DEV,
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
