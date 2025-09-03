import { ImageStyle } from "../declarations/types/helpers";
import { AvailableLang } from "../declarations/types/utils";

export function ValidateLang(l: string): l is AvailableLang {
  return ["en", "pt", "es", "fr", "zh"].includes(l);
}
export function ValidateImgStyle(v: string): v is ImageStyle {
  return [
    "anime",
    "photorealistic",
    "sketch",
    "cartoon",
    "pixel",
    "semi-realistic",
  ].includes(v);
}
