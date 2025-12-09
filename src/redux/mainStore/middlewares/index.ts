import { Middleware } from "@reduxjs/toolkit";
import {
  EyebrowSlitAngle,
  EyebrowSlitNumber,
} from "../../../lib/declarations/types/anatomy";
import { VALID_SLIT_NUMBERS } from "../../data/defaults";
import { updateBrow } from "../slices/promptSlice";

export const slitConsistencyMiddleware: Middleware =
  store => next => action => {
    const result = next(action);
    if (
      // todo this will be used and typed latter
      (action as any).type === "prompt/updatePrompt" ||
      (action as any).type === "prompt/updateEye" ||
      (action as any).type === "prompt/updateBrow"
    ) {
      const state = store.getState() as any;
      const brow = state?.prompt?.character?.head?.eye?.brow;
      const slit = brow?.slit as
        | { number?: EyebrowSlitNumber; angle?: EyebrowSlitAngle }
        | undefined;

      if (
        slit &&
        slit.number &&
        !VALID_SLIT_NUMBERS.includes(slit.number) &&
        slit.angle !== "none"
      )
        store.dispatch(
          updateBrow({
            slit: {
              ...slit,
              angle: "none",
            },
          } as any)
        );
    }

    return result;
  };
