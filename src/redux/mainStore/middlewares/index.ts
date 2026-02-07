import { Middleware, UnknownAction } from "@reduxjs/toolkit";
import {
  EyebrowSlitAngle,
  EyebrowSlitNumber,
} from "../../../lib/declarations/types/anatomy";
import { VALID_SLIT_NUMBERS } from "../../data/defaults";
import { updateBrow } from "../slices/promptSlice";
import { RootState } from "../index";
import { Eyebrow } from "../../../lib/declarations/interfaces/anatomy";
import { DeepPartial } from "../../../lib/declarations/types/utils";

type SlitPayload = DeepPartial<Eyebrow>;

export const slitConsistencyMiddleware: Middleware =
  store => next => action => {
    const result = next(action);
    const typedAction = action as UnknownAction;
    if (
      typedAction.type === "prompt/updatePrompt" ||
      typedAction.type === "prompt/updateEye" ||
      typedAction.type === "prompt/updateBrow"
    ) {
      const state = store.getState() as RootState;
      const brow = state?.prompt?.character?.head?.eye?.brow;
      const slit = brow?.slit as
        | { number?: EyebrowSlitNumber; angle?: EyebrowSlitAngle }
        | undefined;

      if (
        slit &&
        slit.number &&
        !VALID_SLIT_NUMBERS.includes(slit.number) &&
        slit.angle !== "none"
      ) {
        const payload: SlitPayload = {
          slit: {
            ...slit,
            angle: "none",
          },
        };
        store.dispatch(updateBrow(payload));
      }
    }

    return result;
  };
