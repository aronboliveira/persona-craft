import { gds, styleSets } from "../../data/opts";
import { Character } from "../interfaces/utils";
import { QuestionId } from "./helpers";

export type BasicMetricVariation = "low" | "medium" | "high";
export type AveragedMetricVariation =
  | "very-low"
  | Exclude<BasicMetricVariation, "medium">
  | "average"
  | "very-high";
export type BasicLengthVariation = "short" | "average" | "long";
export type BasicHeightVariation = "short" | "average" | "tall";
export type BasicSizeVariation =
  | "very-small"
  | "small"
  | "average"
  | "large"
  | "very-large";
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
export type DeepOptional<T> = T extends (...args: any[]) => infer R
  ? (...args: Parameters<T>) => DeepOptional<R>
  : T extends object
  ? { [K in keyof T]?: DeepOptional<T[K]> }
  : T;
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T | undefined;
export type StateWithCharacter = { character: Character };
export type FriendlyNamed = {
  friendlyName: string;
  src: string;
};
export type UnboxArray<T> = T extends readonly (infer U)[] ? U : T;
