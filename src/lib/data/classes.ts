import { ClsKeys } from "../declarations/types/utils";

export const CLASSES: Record<ClsKeys, string> = {
  IMG_RD_LB: "form-label image-radio-option",
  IMG_RD_INP: "form-check-input sr-only",
  BTN_WARN: "btn btn-warning",
  BTN_INFO: "btn btn-info",
  BTN_PRIM: "btn btn-primary",
  OPT_FIMG: "option-figure-img",
  STL_OPT: "stl-option",
} as const;
