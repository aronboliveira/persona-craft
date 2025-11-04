import { formsStore } from "../../../redux/mainStore";
import { FormsState } from "../interfaces/redux";

export type FormState = { order: number };
export type FormAction =
  | { type: "NEXT_FORM" }
  | { type: "RESET_FORM" }
  | { type: "SET_ORDER"; payload: number };
export type TipsActionType =
  | "OPEN_START_TIP"
  | "CLOSE_START_TIP"
  | "OPEN_ALL"
  | "CLOSE_ALL";
export type UpdateFields = Partial<Omit<FormsState, "updatedAt">>;
export type FormsAppDispatch = typeof formsStore.dispatch;
export type FormRootState = ReturnType<typeof formsStore.getState>;
