import { formsStore } from "../../../redux/mainStore";
import { PromptState } from "../interfaces/redux";

export type FormState = { order: number };
export type FormTypeAction =
  | "NEXT_FORM"
  | "RESET_FORM"
  | "PREVIOUS_FORM"
  | "SET_ORDER";
export type FormReducerAction = { type: FormTypeAction; payload?: number };
export type TipsActionType =
  | "OPEN_START_TIP"
  | "CLOSE_START_TIP"
  | "OPEN_ALL"
  | "CLOSE_ALL";
export type UpdateFields = Partial<Omit<PromptState, "updatedAt">>;
export type FormsAppDispatch = typeof formsStore.dispatch;
export type FormRootState = ReturnType<typeof formsStore.getState>;
