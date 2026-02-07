import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ImageStyle, StyleSets } from "../../../lib/declarations/types/helpers";
import { DEFAULT_OPTS } from "../../../lib/data/opts";

export const styleSelector = createSelector(
  [(s: RootState) => s.prompt.style],
  (style: ImageStyle) => style,
);
export const styleAbbrSelector = createSelector(
  [(s: RootState) => s.prompt.style],
  (style: ImageStyle): StyleSets => {
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
        return DEFAULT_OPTS.stl as StyleSets;
    }
  },
);
