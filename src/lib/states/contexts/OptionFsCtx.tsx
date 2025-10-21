import { createContext } from "react";
import { IOptionCtx } from "../../declarations/interfaces/contexts";
const OptionFsCtx = createContext<IOptionCtx>({
  selected: "stl",
  setSelected: () => {},
});
export default OptionFsCtx;
