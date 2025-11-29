import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFields } from "../../../lib/declarations/types/redux";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
const initialState: PromptState = {
  style: "anime",
  character: {
    gender: "female",
    height: "average",
    weight: "thin",
    age: "adult",
    muscle: "average",
    hair: {
      texture: "straight",
      length: "medium",
      tidiness: "done",
      bang: {
        density: "wispy",
        length: "lash-length",
        shape: "curtain",
      },
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
  },
});
export const { updatePrompt, resetPrompt } = promptSlice.actions;
export default promptSlice.reducer;
