import { NEl, NNd } from "../declarations/types/foundations";
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
  return (["female", "masculine", "nonBinary"] as Gender[]).includes(v as any); // * align with Gender type ("masculine" instead of the never-used "male")
}

export const isElement = (nd: NNd): nd is Element => nd?.nodeType === 1;

export function hasOrInsideClass(el: NNd, cls: string): NEl {
  if (!isElement(el)) return null;
  if (el instanceof Element) {
    if (el.classList.contains(cls)) return el;
    if (el.closest(`.${cls}`)) return el.closest(`.${cls}`);
  }
  return null;
}
