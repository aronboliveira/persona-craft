import { StoreFormStrategyOrder } from "../../../redux/mainStore";
import { NHtEl } from "../types/foundations";
import { ILayoutCtx } from "./contexts";
import { EnableableTip } from "./utils";

export interface LayoutCtxHookReturn {
  layoutCtx: ILayoutCtx | null;
  formRef: RefObject<HTMLFieldSetElement | HTMLFormElement | null>;
}

export interface UseOptImgListenersProps extends EnableableTip {
  classNames?: string[];
  attrMap?: Record<string, string> | Map<string, string>;
  scope?: Document | NHtEl;
  globalNumbersAlso?: boolean;
}

export interface UseOptGridProps {
  selectedFormRef: RefObject<HTMLFieldSetElement | HTMLFormElement | null>;
  order: StoreFormStrategyOrder;
  setColumns?: (...args: any[]) => void;
  columnArgs?: any[];
  setRows?: (...args: any[]) => void;
  rowArgs?: any[];
}
