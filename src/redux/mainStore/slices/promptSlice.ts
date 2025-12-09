import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFields } from "../../../lib/declarations/types/redux";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import {
  Eye,
  Eyebrow,
  Forehead,
  Hair,
} from "../../../lib/declarations/interfaces/anatomy";
import {
  defaultBrow,
  defaultEye,
  defaultForehead,
  defaultHair,
  VALID_SLIT_NUMBERS,
} from "../../data/defaults";
import { DeepPartial } from "../../../lib/declarations/types/utils";
import { CharacterBuilder } from "../../data/classes/facades/CharacterBuilder";
import { CharacterValidator } from "../../data/classes/facades/CharacterValidator";
const initialState: PromptState = {
  style: "anime",
  character: {
    gender: "female",
    height: "average",
    weight: "thin",
    age: "adult",
    muscle: "average",
    hair: defaultHair as Hair,
    head: {
      forehead: defaultForehead as Forehead,
      eye: defaultEye as Eye,
    },
  },
  environment: {
    type: "indoor",
    lighting: "bright",
    timeOfDay: "morning",
  },
  updatedAt: Date.now(),
};
const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    updatePrompt: (s: any, a: PayloadAction<UpdateFields>): void => {
      Object.assign(s, a.payload);
      s.updatedAt = Date.now();
    },
    resetPrompt: (): PromptState => ({
      ...initialState,
      updatedAt: Date.now(),
    }),
    updateEye(s: PromptState, a: PayloadAction<DeepPartial<Eye>>): void {
      CharacterBuilder.mergeEye(
        CharacterValidator.ensureEye(s) as Eye,
        a.payload
      );
      s.updatedAt = Date.now();
    },
    updateBrow(s: PromptState, a: PayloadAction<DeepPartial<Eyebrow>>): void {
      const brow =
        CharacterBuilder.mergeBrow(
          CharacterValidator.ensureBrow(s),
          a.payload
        ) || defaultBrow;
      if (
        brow.slit &&
        brow.slit.number &&
        !VALID_SLIT_NUMBERS.includes(brow.slit.number)
      )
        brow.slit.angle = "none";
      s.updatedAt = Date.now();
    },
  },
});
export const { updatePrompt, resetPrompt, updateEye, updateBrow } =
  promptSlice.actions;
export default promptSlice.reducer;
