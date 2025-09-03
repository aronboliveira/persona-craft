import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FormRootState,
  FormsAppDispatch,
} from "../../lib/declarations/types/redux";

export const useAppDispatch: () => FormsAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<FormRootState> = useSelector;
