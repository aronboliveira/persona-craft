import {
  Forehead,
  Eye,
  Hair,
  Eyebrow,
  EyeBall,
  Iris,
  Pupil,
  EyeShape,
  EyeLid,
  EyeBag,
  EyeLash,
  HairBang,
} from "../../lib/declarations/interfaces/anatomy";
import { EyebrowSlitNumber } from "../../lib/declarations/types/anatomy";
import { DeepPartial } from "../../lib/declarations/types/utils";
export const VALID_SLIT_NUMBERS: Readonly<EyebrowSlitNumber[]> = Object.freeze([
  "one",
  "two",
  "three",
]) satisfies Readonly<EyebrowSlitNumber[]>;
export const defaultForehead: Readonly<Forehead> = Object.freeze({
  hairline: {
    height: "average",
    recidingLevel: "straight",
    shape: "rounded",
  } as Forehead["hairline"],
  height: "average" as Forehead["height"],
}) satisfies Forehead;
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
}) satisfies Eyebrow;
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
}) satisfies EyeBall;
export const defaultEyeLid: Readonly<EyeLid> = Object.freeze({
  creaseNumber: "doublelid",
  creaseHeight: "medium",
  epicanthicFold: "none",
  epicanthicFoldVariation: "none",
  symmetric: true,
}) satisfies EyeLid;
export const defaultEyeBag: Readonly<EyeBag> = Object.freeze({
  countor: "flat",
  color: "skin-tone",
  symmetric: true,
}) satisfies EyeBag;
export const defaultEyeLash: Readonly<EyeLash> = Object.freeze({
  density: "average",
  length: "average",
  curl: "slightly-upward-curled",
  symmetric: true,
}) satisfies EyeLash;
export const defaultEyeLi: Readonly<EyeLid> = Object.freeze({
  creaseNumber: "doublelid",
  creaseHeight: "medium",
  epicanthicFold: "none",
  epicanthicFoldVariation: "none",
  symmetric: true,
}) satisfies EyeLid;
export const defaultEyeShape: Readonly<EyeShape> = Object.freeze({
  fissure: "wide",
  tilt: "neutral-turned",
  depth: "neutral-set",
  spacing: "average-distanced",
  lid: defaultEyeLid as EyeLid,
  symmetric: true,
  hood: "partially-hooded",
} as EyeShape) satisfies EyeShape;
export const defaultEye: Readonly<DeepPartial<Eye>> = Object.freeze({
  // todo remove deeppartial later
  ball: defaultEyeBall as EyeBall,
  shape: defaultEyeShape as EyeShape,
  bag: defaultEyeBag as EyeBag,
  brow: defaultBrow as Eyebrow,
}) satisfies DeepPartial<Eye>;
export const defaultHairBang: Readonly<Hair["bang"]> = Object.freeze({
  density: "wispy",
  length: "lash-length",
  shape: "curtain",
}) satisfies HairBang;
export const defaultHair: Readonly<Hair> = Object.freeze({
  texture: "straight",
  length: "medium",
  tidiness: "done",
  bang: defaultHairBang,
}) satisfies Hair;
