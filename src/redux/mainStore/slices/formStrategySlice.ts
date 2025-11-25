import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "../../../lib/declarations/types/redux";
const initialState: FormState = { order: 0 },
  formStrategySlice = createSlice({
    name: "formStrategy",
    initialState,
    reducers: {
      nextForm: (state: FormState): void => {
        console.log("next form...");
        state.order += 1;
      },
      previousForm: (state: FormState): void => {
        state.order =
          (state?.order || 0) - 1 >= 0 ? (state?.order || 0) - 1 : 0;
      },
      resetForm: (state: FormState): void => {
        state.order = 0;
      },
      setOrder: (state: FormState, action: PayloadAction<number>): void => {
        state.order = action?.payload || 0;
      },
    },
  });
export const { nextForm, previousForm, resetForm, setOrder } =
  formStrategySlice.actions;
export default formStrategySlice.reducer;
