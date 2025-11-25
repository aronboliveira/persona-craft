import { gds, styleSets } from "../../data/opts";
import { QuestionId } from "./helpers";

export type AvailableLang = "en" | "pt" | "es" | "fr" | "zh";
export type IdKeys = "FORM_ID" | "GENDER_FORM_ID";
export type ClsKeys =
  | "IMG_RD_LB"
  | "IMG_RD_INP"
  | "BTN_WARN"
  | "BTN_INFO"
  | "BTN_PRIM"
  | "OPT_FIMG"
  | "STL_OPT";

export type OptValue<K extends QuestionId> = K extends "stl"
  ? StyleSets
  : K extends "gd"
  ? Gender
  : string;

export type OptsMap<K extends QuestionId> = {
  [P in K]: OptValue<P>;
};

export type ArrayElement<T extends readonly any[]> = T[number];
export type ValidateOptsAgainstArrays<T> = {
  [K in keyof T]: K extends "stl"
    ? T[K] extends ArrayElement<typeof styleSets>
      ? T[K]
      : never
    : K extends "gd"
    ? T[K] extends ArrayElement<typeof gds>
      ? T[K]
      : never
    : T[K];
};
