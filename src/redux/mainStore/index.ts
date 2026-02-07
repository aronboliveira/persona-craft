import { combineReducers, configureStore } from "@reduxjs/toolkit";
import promptReducer from "./slices/promptSlice";
import formStrategyReducer from "./slices/formStrategySlice";
import tipsReducer from "./slices/tipsSlice";
import { slitConsistencyMiddleware } from "./middlewares";

export const STG_KEY = "promptCreatorPromptState";

const rootReducer = combineReducers({
  prompt: promptReducer,
  formStrategy: formStrategyReducer,
  tips: tipsReducer,
});

const loadPreloadedState = ():
  | Partial<ReturnType<typeof rootReducer>>
  | undefined => {
  try {
    const raw = sessionStorage.getItem(STG_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as Partial<ReturnType<typeof rootReducer>>;
  } catch (error) {
    console.error("Failed to parse forms state from sessionStorage:", error);
    return undefined;
  }
};

export const formsStore = configureStore({
  devTools: import.meta.env.DEV,
  preloadedState: loadPreloadedState(),
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(slitConsistencyMiddleware);
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
