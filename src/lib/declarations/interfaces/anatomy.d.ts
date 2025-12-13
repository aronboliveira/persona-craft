import {
  BodyFat,
  EyeColor,
  EyeDepth,
  EyeEpicanthicFoldExtension,
  EyeEpicanthicFoldClass,
  EyeFissure,
  EyeHood,
  EyelidCreaseHeight,
  EyeLidCreaseNumber,
  EyeSpacing,
  EyeTilt,
  EyeBagCountor,
  EyeBagColor,
  EyeLashesDensity,
  EyeLashesLength,
  EyeLashesCurl,
  EyebrowDensity,
  EyebrowThickness,
  EyebrowTexture,
  Unibrow,
  EyebrowSlitNumber,
  EyebrowSlitAngle,
  EyebrowGrowthPattern,
  EyebrowGrowthDirection,
  PupilSize,
  PupilPattern,
  IrisSize,
  EyebrowHeight,
  EyebrowArchAngle,
  EyebrowArchHeight,
  EyebrowHairLength,
  EyebrowArchDistance,
  LipTuberculeProminence,
  LipTuberculeShape,
  HairBangDensity,
  HairTexture,
  HairBangLength,
  HairTidiness,
  HairBangShape,
  HairLength,
  ForeheadHairlineHeight,
  RecidingLevel,
  ForeheadHairlineShape,
  ForeheadHeight,
  EyebrowTrimming,
  EyeBallSize,
} from "../types/anatomy";
import { Side } from "../types/helpers";
import { DeepAnatomicKey, FriendlyNamed } from "../types/utils";
import { Character } from "./utils";
export interface HairBang {
  density: HairBangDensity;
  length: HairBangLength;
  shape: HairBangShape;
}
export interface Hair {
  texture: HairTexture;
  length: HairLength;
  tidiness: HairTidiness;
  bang: HairBang;
}
export interface BodyFatOption {
  key: BodyFat;
  friendlyName: string;
  src: string;
}
export interface EyebrowSlit {
  number: EyebrowSlitNumber;
  angle: EyebrowSlitAngle;
  side: Side;
}
export interface EyebrowGrowth {
  pattern: EyebrowGrowthPattern;
  direction: EyebrowGrowthDirection;
}
export interface EyebrowArch {
  angle: EyebrowArchAngle;
  distance: EyebrowArchDistance;
  height: EyebrowArchHeight;
}
export interface Eyebrow {
  arch: EyebrowArch;
  density: EyebrowDensity;
  growth: EyebrowGrowth;
  height: EyebrowHeight;
  length: EyebrowHairLength;
  texture: EyebrowTexture;
  thickness: EyebrowThickness;
  unibrow: Unibrow;
  trimming?: EyebrowTrimming;
  slit?: EyebrowSlit;
  symmetric?: boolean;
}
export interface EyeLid {
  creaseNumber: EyeLidCreaseNumber;
  creaseHeight: EyelidCreaseHeight;
  epicanthicFold?: EyeEpicanthicFoldExtension;
  epicanthicFoldVariation?: EyeEpicanthicFoldClass;
  symmetric?: boolean;
}
export interface EyeBag {
  countor: EyeBagCountor;
  color: EyeBagColor;
  symmetric?: boolean;
}
export interface EyeLash {
  density: EyeLashesDensity;
  length: EyeLashesLength;
  curl: EyeLashesCurl;
  symmetric?: boolean;
}
export interface EyeShape {
  fissure: EyeFissure;
  tilt: EyeTilt;
  depth: EyeDepth;
  spacing: EyeSpacing;
  lid: EyeLid;
  hood?: EyeHood;
  symmetric?: boolean;
}
export interface Pupil {
  size: PupilSize;
  pattern: PupilPattern;
  symmetric?: boolean;
}
export interface Iris {
  color: EyeColor;
  size: IrisSize;
  symmetric?: boolean;
}
export interface EyeBall {
  size: EyeBallSize;
  iris: Iris;
  pupil: Pupil;
}
export interface Eye {
  ball: EyeBall;
  shape: EyeShape;
  bag: EyeBag;
  brow?: Eyebrow;
  lashes?: EyeLash;
}
export interface LipTubercule {
  prominence: LipTuberculeProminence;
  shape: LipTuberculeShape;
}
export interface Lip {
  tubercule: LipTubercule;
}
export interface Mouth {
  lip: Lip;
}
export interface ForeheadHairline {
  height: ForeheadHairlineHeight;
  recidingLevel: RecidingLevel;
  shape: ForeheadHairlineShape;
}
export interface Forehead {
  hairline: ForeheadHairline;
  height: ForeheadHeight;
}
export interface Head {
  forehead: Forehead;
  eye: Eye;
  mouth: Mouth;
}
export interface DeepAnatomicOption<T, O = Character> extends FriendlyNamed {
  key: DeepAnatomicKey<T, O>;
}
