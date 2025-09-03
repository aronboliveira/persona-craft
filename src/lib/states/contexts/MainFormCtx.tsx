import { createContext } from "react";
import { IMainFormCtx } from "../../declarations/interfaces/contexts";
import { DEFAULTS } from "../default";
const MainFormCtx = createContext<IMainFormCtx>({ lang: DEFAULTS.lang });
export default MainFormCtx;
