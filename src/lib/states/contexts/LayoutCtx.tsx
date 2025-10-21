import { createContext } from "react";
import { ILayoutCtx } from "../../declarations/interfaces/contexts";
export const LayoutCtx = createContext<ILayoutCtx | null>(null);
