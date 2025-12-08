import { combineReducers, configureStore } from "@reduxjs/toolkit";
import promptReducer from "./slices/promptSlice";
import formStrategyReducer from "./slices/formStrategySlice";
import tipsReducer from "./slices/tipsSlice";
export const STG_KEY = "promptCreatorPromptState";
export const formsStore = configureStore({
  devTools: import.meta.env.DEV,
  preloadedState: ((): any => {
    try {
      const raw = sessionStorage.getItem(STG_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw) as any;
      return parsed;
    } catch (error) {
      console.error("Failed to parse forms state from sessionStorage:", error);
      return undefined;
    }
  })(),
  reducer: combineReducers({
    prompt: promptReducer, // ? promptSlice.reducer
    formStrategy: formStrategyReducer,
    tips: tipsReducer,
  }) as any,
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
      sessionStorage.setItem(STG_KEY, JSON.stringify(state));
    } catch {
      // fail silently
    }
  }, 300);
});
export type RootState = ReturnType<typeof formsStore.getState>;
export type AppDispatch = typeof formsStore.dispatch; // ? from spread of reducers / slice actions
export type StoreFormStrategyOrder = ReturnType<
  typeof formStrategyReducer
>["order"];
