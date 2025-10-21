import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFields } from "../../lib/declarations/types/redux";
import { FormsState } from "../../lib/declarations/interfaces/redux";
const initialState: FormsState = {
  style: "anime",
  character: {
    gender: "female",
    height: "average",
    weight: "medium",
    age: "adult",
    muscle: "average",
  },
  environment: {
    type: "indoor",
    lighting: "bright",
    timeOfDay: "morning",
  },
  updatedAt: Date.now(),
};
const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    update: (s: any, a: PayloadAction<UpdateFields>): void => {
      Object.assign(s, a.payload);
      s.updatedAt = Date.now();
    },
    reset: (): FormsState => ({ ...initialState, updatedAt: Date.now() }),
  },
});
export const { update, reset } = formsSlice.actions;
export default formsSlice.reducer;
