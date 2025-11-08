import { createSlice } from "@reduxjs/toolkit";
import { TipsState } from "../../../lib/declarations/interfaces/redux";

const initialState: TipsState = {
    startFormTip: true,
  },
  tipsSlice = createSlice({
    name: "tips",
    initialState,
    reducers: {
      openStartTip: (s: TipsState): void => {
        s.startFormTip = true;
      },
      closeStartTip: (s: TipsState): void => {
        s.startFormTip = false;
      },
      openAll: (s: TipsState, a: { payload: TipsState }): void => {
        if (!a?.payload || typeof a.payload !== "object") return;
        Object.entries(a.payload).forEach(([k]) => {
          (s as any)[k] = true;
        });
      },
      closeAll: (s: TipsState, a: { payload: TipsState }): void => {
        if (!a?.payload || typeof a.payload !== "object") return;
        Object.entries(a.payload).forEach(([k]) => {
          (s as any)[k] = false;
        });
      },
    },
  });
export const { openStartTip, closeStartTip, openAll, closeAll } =
  tipsSlice.actions;
export default tipsSlice.reducer;
