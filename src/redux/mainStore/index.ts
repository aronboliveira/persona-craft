import { combineReducers, configureStore } from "@reduxjs/toolkit";
import promptReducer from "./slices/promptSlice";
import formStrategyReducer from "./slices/formStrategySlice";
import tipsReducer from "./slices/tipsSlice";
export const STG_KEY = "promptCreatorPromptState";
export const formsStore = configureStore({
  reducer: combineReducers({
    prompt: promptReducer,
    formStrategy: formStrategyReducer,
    tips: tipsReducer,
  }) as any,
  devTools: import.meta.env.DEV,
  preloadedState: ((): any => {
    try {
      const raw = localStorage.getItem(STG_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw) as any;
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
export type RootState = ReturnType<typeof formsStore.getState>;
export type AppDispatch = typeof formsStore.dispatch;
export type StoreFormStrategyOrder = ReturnType<
  typeof formStrategyReducer
>["order"];
