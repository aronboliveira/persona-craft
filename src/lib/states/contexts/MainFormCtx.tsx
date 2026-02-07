import { createContext } from "react";
import { IMainFormCtx } from "../../declarations/interfaces/contexts";
import { DEFAULTS } from "../default";
const MainFormCtx = createContext<IMainFormCtx>({
  lang: DEFAULTS.LANG,
  tipsState: { startFormTip: true },
  handleNext: () => {},
  handlePrevious: () => {},
  handleReset: () => {},
  dispatchTips: () => {},
});
export default MainFormCtx;
