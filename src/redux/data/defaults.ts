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
  Mouth,
  Lips,
  LipTubercule,
  Head,
  UpperLip,
  CupidBow,
  LowerLip,
  MouthCommissure,
  MouthDimple,
} from "../../lib/declarations/interfaces/anatomy";
import { Character } from "../../lib/declarations/interfaces/utils";
import { EyebrowSlitNumber } from "../../lib/declarations/types/anatomy";
import ObjectHelper from "../../lib/utils/ObjectHelper";
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
export const defaultBrow: Readonly<Eyebrow> = ObjectHelper.deepFreeze({
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
export const defaultEyeBall: Readonly<EyeBall> = ObjectHelper.deepFreeze({
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
export const defaultEyeShape: Readonly<EyeShape> = Object.freeze({
  fissure: "wide",
  tilt: "neutral-turned",
  depth: "neutral-set",
  spacing: "average-distanced",
  lid: defaultEyeLid as EyeLid,
  hood: "partially-hooded",
  symmetric: true,
}) satisfies EyeShape;
export const defaultEye: Readonly<Eye> = Object.freeze({
  ball: defaultEyeBall as EyeBall,
  shape: defaultEyeShape as EyeShape,
  bag: defaultEyeBag as EyeBag,
  brow: defaultBrow as Eyebrow,
}) satisfies Eye;
export const defaultHairBang: Readonly<HairBang> = Object.freeze({
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
export const defaultLipTubercule: Readonly<LipTubercule> = Object.freeze({
  prominence: "mild",
  shape: "rounded",
}) satisfies LipTubercule;
export const defaultLipCupidBow: Readonly<CupidBow> = Object.freeze({
  width: "average",
  height: "average",
}) satisfies CupidBow;
export const defaultUpperLip: Readonly<UpperLip> = Object.freeze({
  volume: "average",
  tubercule: defaultLipTubercule as LipTubercule,
  cupidBow: defaultLipCupidBow as CupidBow,
}) satisfies UpperLip;
export const defaultLowerLip: Readonly<LowerLip> = Object.freeze({
  volume: "average",
  shape: "flat-abroad",
}) satisfies LowerLip;
export const defaultMouthCommissure = Object.freeze({
  angle: "neutral",
  shape: "average",
}) satisfies MouthCommissure;
export const defaultMouthDimple = Object.freeze({
  size: "small",
  shape: "oval",
}) satisfies MouthDimple;
export const defaultLips: Readonly<Lips> = Object.freeze({
  upper: defaultUpperLip as UpperLip,
  lower: defaultLowerLip as LowerLip,
  vermillion: "blurred",
}) satisfies Lips;
export const defaultMouth: Readonly<Mouth> = Object.freeze({
  lips: defaultLips as Lips,
  commissure: defaultMouthCommissure as MouthCommissure,
  dimple: defaultMouthDimple as MouthDimple,
}) satisfies Mouth;
export const defaultHead: Readonly<Head> = Object.freeze({
  forehead: defaultForehead as Forehead,
  eye: defaultEye as Eye,
  mouth: defaultMouth as Mouth,
}) satisfies Head;
export const defaultCharacter: Readonly<Character> = Object.freeze({
  gender: "female",
  height: "average",
  weight: "thin",
  age: "adult",
  muscle: "average",
  hair: defaultHair as Hair,
  head: defaultHead as Head,
}) satisfies Character;
