import { BodyFat, BodyMuscleTypes } from "../types/anatomy";
import { Gender } from "../types/helpers";
import { Hair } from "./anatomy";
export interface Character {
  gender: Gender;
  height: BodyHeight;
  weight: BodyFat;
  age: "child" | "teen" | "adult" | "senior";
  muscle: BodyMuscleTypes;
  hair: Hair;
}
export interface Environment {
  type: "indoor" | "outdoor";
  lighting: "bright" | "dim" | "dark";
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
}
export interface LangDict {
  [key: string]: string;
}
export interface OptDict {
  friendlyName: string;
  src: string;
}
export interface EnableableTip {
  enabled?: boolean;
  tipLocalKeys?: Record<string, string>;
  tipSessionKeys?: Record<string, string>;
}
