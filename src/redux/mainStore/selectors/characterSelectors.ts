import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  defaultCharacter,
  defaultHair,
  defaultSkin,
  defaultNose,
  defaultEar,
  defaultChin,
  defaultBodyModifications,
} from "../../data/defaults";
import { Gender } from "../../../lib/declarations/types/helpers";
import { GdAbbr } from "../../../lib/data/opts";
import {
  HairTexture,
  Ethnicity,
  SkinTone,
  NoseShape,
  EyeColor,
  BodyHeight,
  BodyMuscleTypes,
} from "../../../lib/declarations/types/anatomy";
import type { Nose, Hair } from "../../../lib/declarations/interfaces/anatomy";
import type {
  Ear,
  Chin,
  Skin,
  BodyModifications,
} from "../../../lib/declarations/interfaces/anatomy";
import type { Character } from "../../../lib/declarations/interfaces/utils";

/**
 * Helper method to safely navigate nested prompt state
 */
const getNestedValue = <T>(
  prompt: RootState["prompt"],
  path: string[],
  defaultValue: T,
): T => {
  let current: unknown = prompt;

  for (const key of path) {
    if (typeof current === "object" && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
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
      defaultCharacter.gender,
    );

    if ((["female", "male", "nonBinary"] as Gender[]).includes(gender)) {
      return gender;
    }

    return defaultCharacter.gender;
  },
);

export const genderAbbrSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): (typeof GdAbbr)[keyof typeof GdAbbr] => {
    const gender = getNestedValue(
      prompt,
      ["character", "gender"],
      defaultCharacter.gender,
    );
    if ((["female", "male", "nonBinary"] as Gender[]).includes(gender))
      return GdAbbr[gender];
    return GdAbbr[defaultCharacter.gender];
  },
);

export const hairTextureSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): HairTexture => {
    return getNestedValue(
      prompt,
      ["character", "hair", "texture"],
      defaultHair.texture,
    );
  },
);

// ─── Ethnicity & Skin selectors ─────────────────────────
export const ethnicitySelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Ethnicity =>
    getNestedValue(
      prompt,
      ["character", "skin", "ethnicity"],
      defaultSkin.ethnicity,
    ),
);

export const skinSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Skin =>
    getNestedValue(prompt, ["character", "skin"], defaultSkin as Skin),
);

export const noseSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Nose =>
    getNestedValue(prompt, ["character", "head", "nose"], defaultNose as Nose),
);

export const earSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Ear =>
    getNestedValue(prompt, ["character", "head", "ear"], defaultEar as Ear),
);

export const chinSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Chin =>
    getNestedValue(prompt, ["character", "head", "chin"], defaultChin as Chin),
);

export const bodyModificationsSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): BodyModifications =>
    getNestedValue(
      prompt,
      ["character", "bodyModifications"],
      defaultBodyModifications as BodyModifications,
    ),
);

/**
 * Ethnicity-aware skin tone filter.
 * Filters available skin tones based on selected ethnicity.
 */
export const filteredSkinTonesSelector = createSelector(
  [ethnicitySelector],
  (ethnicity: Ethnicity): readonly SkinTone[] => {
    const allTones: SkinTone[] = [
      "porcelain",
      "ivory",
      "fair",
      "light",
      "light-medium",
      "medium",
      "olive",
      "tan",
      "caramel",
      "brown",
      "dark-brown",
      "deep-brown",
      "ebony",
    ];
    switch (ethnicity) {
      case "east-asian":
      case "southeast-asian":
        return allTones.filter(t => !["ebony", "deep-brown"].includes(t));
      case "south-asian":
        return allTones.filter(t => !["porcelain", "ivory"].includes(t));
      case "west-african":
      case "east-african":
        return allTones.filter(
          t => !["porcelain", "ivory", "fair"].includes(t),
        );
      case "north-african":
      case "middle-eastern":
        return allTones.filter(
          t => !["porcelain", "ebony", "deep-brown"].includes(t),
        );
      case "european":
        return allTones.filter(t => !["ebony", "deep-brown"].includes(t));
      case "latin-american":
      case "indigenous-american":
      case "pacific-islander":
      case "mixed":
      default:
        return allTones;
    }
  },
);

/**
 * Ethnicity-aware nose shape filter.
 * Filters available nose shapes based on selected ethnicity.
 */
export const filteredNoseShapesSelector = createSelector(
  [ethnicitySelector],
  (ethnicity: Ethnicity): readonly NoseShape[] => {
    const allShapes: NoseShape[] = [
      "button",
      "celestial",
      "snub",
      "greek",
      "roman",
      "aquiline",
      "hawk",
      "nubian",
      "bulbous",
      "flat",
      "fleshy",
    ];
    switch (ethnicity) {
      case "east-asian":
      case "southeast-asian":
        return allShapes.filter(
          s => !["roman", "aquiline", "hawk", "nubian"].includes(s),
        );
      case "west-african":
      case "east-african":
        return allShapes.filter(
          s => !["greek", "roman", "aquiline", "hawk"].includes(s),
        );
      case "european":
        return allShapes.filter(s => !["nubian", "flat"].includes(s));
      case "south-asian":
        return allShapes.filter(s => !["nubian"].includes(s));
      default:
        return allShapes;
    }
  },
);

/**
 * Ethnicity-aware eye color filter.
 * Filters available eye colors based on selected ethnicity.
 */
export const filteredEyeColorsSelector = createSelector(
  [ethnicitySelector],
  (ethnicity: Ethnicity): readonly EyeColor[] => {
    const allColors: EyeColor[] = [
      "hazel",
      "black",
      "blue",
      "green",
      "fire",
      "light",
      "demon",
      "blind",
      "scar",
    ];
    // Fantasy colors always available
    const fantasyColors: EyeColor[] = [
      "fire",
      "light",
      "demon",
      "blind",
      "scar",
    ];
    switch (ethnicity) {
      case "east-asian":
      case "southeast-asian":
      case "west-african":
      case "east-african":
        return allColors.filter(c =>
          ["black", "hazel", ...fantasyColors].includes(c),
        );
      case "south-asian":
        return allColors.filter(c =>
          ["black", "hazel", "green", ...fantasyColors].includes(c),
        );
      case "european":
        return allColors; // all natural colors possible
      default:
        return allColors;
    }
  },
);

// ─── Character & body selectors ─────────────────────────
export const characterSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Character =>
    getNestedValue(prompt, ["character"], defaultCharacter as Character),
);

export const heightSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): BodyHeight =>
    getNestedValue(
      prompt,
      ["character", "height"],
      defaultCharacter.height as BodyHeight,
    ),
);

export const muscleSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): BodyMuscleTypes =>
    getNestedValue(
      prompt,
      ["character", "muscle"],
      defaultCharacter.muscle as BodyMuscleTypes,
    ),
);

export const hairSelector = createSelector(
  [(s: RootState) => s.prompt],
  (prompt: RootState["prompt"]): Hair =>
    getNestedValue(prompt, ["character", "hair"], defaultHair as Hair),
);
