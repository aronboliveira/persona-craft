import { useState } from "react";
import { useAppSelector } from "../../../redux/mainStore/hooks";
import { useFormCtxStore } from "./useFormCtxStore";
import { Gender } from "../../declarations/types/helpers";
import useReduxLog from "../etc/useReduxLog";

export function useLaterForm() {
  useReduxLog();
  const { lang, dispatch } = useFormCtxStore(),
    state = useAppSelector(s => s),
    [gdSelected, setGd] = useState<Gender>(state.character.gender);
  return { lang, dispatch, state, gdSelected, setGd };
}
