import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { defaultCharacter, defaultHair } from "../../data/defaults";
import { Gender } from "../../../lib/declarations/types/helpers";
import { GdAbbr } from "../../../lib/data/opts";
import { HairTexture } from "../../../lib/declarations/types/anatomy";

/**
 * Helper method to safely navigate nested prompt state
 */
const getNestedValue = <T>(
  prompt: RootState["prompt"],
  path: string[],
  defaultValue: T
): T => {
  let current: any = prompt;

  for (const key of path) {
    if (typeof current === "object" && current !== null && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }

  return current as T;
};

export const genderSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Gender => {
    const gender = getNestedValue(
      prompt,
      ["character", "gender"],
      defaultCharacter.gender
    );

    if ((["female", "male", "nonBinary"] as Gender[]).includes(gender)) {
      return gender;
    }

    return defaultCharacter.gender;
  }
);

export const genderAbbrSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): (typeof GdAbbr)[keyof typeof GdAbbr] => {
    const gender = getNestedValue(
      prompt,
      ["character", "gender"],
      defaultCharacter.gender
    );
    if ((["female", "male", "nonBinary"] as Gender[]).includes(gender))
      return GdAbbr[gender];
    return GdAbbr[defaultCharacter.gender];
  }
);

export const hairTextureSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): HairTexture => {
    return getNestedValue(
      prompt,
      ["character", "hair", "texture"],
      defaultHair.texture
    );
  }
);
