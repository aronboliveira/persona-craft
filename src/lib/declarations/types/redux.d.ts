import { formsStore } from "../../../redux/mainStore";
import { FormsState } from "../interfaces/redux";

export type UpdateFields = Partial<Omit<FormsState, "updatedAt">>;
export type FormsAppDispatch = typeof formsStore.dispatch;
export type FormRootState = ReturnType<typeof formsStore.getState>;
