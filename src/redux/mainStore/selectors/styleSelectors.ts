import { createSelector } from "@reduxjs/toolkit";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { ImageStyle } from "../../../lib/declarations/types/helpers";
import { DEFAULT_OPTS } from "../../../lib/data/opts";

export const styleSelector = createSelector(
  [(s: PromptState) => s.style],
  (style: ImageStyle) => style
);
export const styleAbbrSelector = createSelector(
  [(s: PromptState) => s.style],
  (style: ImageStyle): string => {
    switch (style) {
      case "anime":
        return "anm";
      case "cartoon":
        return "crt";
      case "photorealistic":
        return "ptr";
      case "pixel":
        return "px";
      case "semi-realistic":
        return "skt";
      default:
        return DEFAULT_OPTS.stl;
    }
  }
);
