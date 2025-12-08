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
} from "../types/anatomy";
import { Side } from "../types/helpers";
import { DeepPartial, FriendlyNamed } from "../types/utils";
export interface HairLengthOption {
  key: HairLength;
  friendlyName: string;
  src: string;
}
export interface HairBangShapeOption {
  key: HairBangShape;
  friendlyName: string;
  src: string;
}
export interface HairTidinessOption {
  key: HairTidiness;
  friendlyName: string;
  src: string;
}
export interface HairBangLengthOption {
  key: HairBangLength;
  friendlyName: string;
  src: string;
}
export interface HairBangOption {
  key: HairBangDensity;
  friendlyName: string;
  src: string;
}
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
  symmetric?: boolean;
}
export interface EyebrowArch {
  angle: EyebrowArchAngle;
  distance: EyebrowArchDistance;
  height: EyebrowArchHeight;
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
  eye: DeepPartial<Eye>; //todo remove partial later
  // ... include mouth
}
export interface ForeheadHairlineHeightOption {
  key: ForeheadHairlineHeight;
  friendlyName: string;
  src: string;
}
export interface ForeheadHairlineRecidingOption extends FriendlyNamed {
  key: RecidingLevel;
}
export interface ForeheadHairlineShapeOption extends FriendlyNamed {
  key: ForeheadHairlineShape;
}
export interface ForeheadHeightOption extends FriendlyNamed {
  key: ForeheadHeight;
}
export interface EyebrowDensityOption extends FriendlyNamed {
  key: EyebrowDensity;
}
export interface EyebrowDensityOption extends FriendlyNamed {
  key: EyebrowDensity;
}
export interface EyebrowGrowthPatternOption extends FriendlyNamed {
  key: EyebrowGrowthPattern;
}
export interface EyebrowGrowthDirectionOption extends FriendlyNamed {
  key: EyebrowGrowthDirection;
}
export interface EyebrowArchAngleOption extends FriendlyNamed {
  key: EyebrowArchAngle;
}
export interface EyebrowArchDistanceOption extends FriendlyNamed {
  key: EyebrowArchDistance;
}
export interface EyebrowArchHeightOption extends FriendlyNamed {
  key: EyebrowArchHeight;
}
