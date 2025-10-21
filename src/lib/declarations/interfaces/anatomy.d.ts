import {
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
} from "../types/anatomy";
import { Side } from "../types/helpers";
export interface EyebrowSlit {
  number: EyebrowSlitNumber;
  angle: EyebrowSlitAngle;
  side: Side;
}
export interface EyebrowGrowth {
  pattern: EyebrowGrowthPattern;
  direction: EyebrowGrowthDirection;
  symmetric?: boolean;
}
export interface EyebrowArch {
  angle: EyebrowArchAngle;
  height: EyebrowArchHeight;
  distance: EyebrowArchDistance;
}
export interface Eyebrow {
  density: EyebrowDensity;
  thickness: EyebrowThickness;
  texture: EyebrowTexture;
  unibrow: Unibrow;
  length: EyebrowHairLength;
  height: EyebrowHeight;
  growth: EyebrowGrowth;
  arch: EyebrowArch;
  symmetric?: boolean;
  slit?: EyebrowSlit;
}
export interface EyeLid {
  creaseNumber: EyeLidCreaseNumber;
  creaseHeight: EyelidCreaseHeight;
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
  epicanthicFold: EyeEpicanthicFoldExtension;
  epicanthicFoldVariation?: EyeEpicanthicFoldClass;
  lid: EyeLid;
  symmetric?: boolean;
  hood?: EyeHood;
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
  iris: Iris;
  pupil: Pupil;
}
export interface Eye {
  bag: EyeBag;
  shape: EyeShape;
  ball: EyeBall;
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
