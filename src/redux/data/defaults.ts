import {
  Forehead,
  Eye,
  Hair,
  Eyebrow,
  EyeBall,
  Iris,
  Pupil,
  EyeShape,
} from "../../lib/declarations/interfaces/anatomy";
import { EyebrowSlitNumber } from "../../lib/declarations/types/anatomy";
import { DeepPartial } from "../../lib/declarations/types/utils";
export const VALID_SLIT_NUMBERS: Readonly<EyebrowSlitNumber[]> = Object.freeze([
  "one",
  "two",
  "three",
]);
export const defaultForehead: Readonly<Forehead> = Object.freeze({
  hairline: {
    height: "average",
    recidingLevel: "straight",
    shape: "rounded",
  } as Forehead["hairline"],
  height: "average" as Forehead["height"],
});
export const defaultBrow: Readonly<Eyebrow> = Object.freeze({
  arch: {
    angle: "obtuse",
    distance: "even",
    height: "average",
  } as Eyebrow["arch"],
  density: "light",
  growth: {
    pattern: "even",
    direction: "radial",
  } as Eyebrow["growth"],
  height: "median",
  length: "average",
  texture: "straight",
  thickness: "fine",
  unibrow: "absent",
  trimming: "natural",
  slit: {
    number: "none",
    angle: "none",
  } as Eyebrow["slit"],
  symmetric: true,
});
export const defaultEyeBall: Readonly<EyeBall> = Object.freeze({
  size: "average",
  iris: {
    color: "hazel",
    size: "average",
    symmetric: true,
  } as Iris,
  pupil: {
    size: "average",
    pattern: "round",
    symmetric: true,
  } as Pupil,
});
export const defaultEye: Readonly<DeepPartial<Eye>> = Object.freeze({
  // todo remove deeppartial later
  ball: defaultEyeBall as EyeBall,
  shape: {
    fissure: "wide",
    tilt: "neutral-turned",
    depth: "neutral-set",
    spacing: "average-distanced",
    epicanthicFold: "none",
    epicanthicFoldVariation: "none",
    lid: {
      creaseNumber: "doublelid",
      creaseHeight: "medium",
      symmetric: true,
    },
    symmetric: true,
    hood: "partially-hooded",
  } as EyeShape,
  brow: defaultBrow as Eyebrow,
});
export const defaultHair: Readonly<Hair> = Object.freeze({
  texture: "straight",
  length: "medium",
  tidiness: "done",
  bang: {
    density: "wispy",
    length: "lash-length",
    shape: "curtain",
  } as Hair["bang"],
});
