import { Gender, ImageStyle } from "../declarations/types/helpers";
import { AvailableLang } from "../declarations/types/utils";

export function ValidateLang(l: string): l is AvailableLang {
  return ["en", "pt", "es", "fr", "zh"].includes(l);
}
export function ValidateImgStyle(v: string): v is ImageStyle {
  return (
    [
      "anime",
      "photorealistic",
      // "sketch",
      "cartoon",
      "pixel",
      "semi-realistic",
    ] as ImageStyle[]
  ).includes(v as any);
}
export function ValidateGender(v: string): v is Gender {
  return (["female", "male", "nonBinary"] as Gender[]).includes(v as any);
}
