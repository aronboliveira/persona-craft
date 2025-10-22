import { useContext } from "react";
import { IMainFormCtx } from "../../declarations/interfaces/contexts";
import { AvailableLang } from "../../declarations/types/utils";
import MainFormCtx from "../../states/contexts/MainFormCtx";
import { DEFAULTS } from "../../states/default";
import { FormsAppDispatch, FormState } from "../../declarations/types/redux";
import { useDispatch } from "react-redux";
import { ValidateLang } from "../../utils/validations";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export function useFormCtxStore(): {
  dispatch: ThunkDispatch<FormState, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
  lang: AvailableLang;
  ctx: IMainFormCtx | null;
} {
  let lang: AvailableLang = DEFAULTS.lang;
  const ctx = useContext<IMainFormCtx>(MainFormCtx),
    dispatch = useDispatch<FormsAppDispatch>();
  if (ctx && ValidateLang(ctx.lang)) lang = ctx.lang;
  return { dispatch, lang, ctx };
}
