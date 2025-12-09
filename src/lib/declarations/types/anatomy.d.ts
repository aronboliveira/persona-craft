import {
  AveragedMetricVariation,
  BasicHeightVariation,
  BasicLengthVariation,
  BasicMetricVariation,
  BasicSizeVariation,
} from "./utils";

export type BodyMuscleTypes =
  | "frail"
  | "weak"
  | "average"
  | "athletic"
  | "herculean";
export type BodyFat = "scrawny" | "skinny" | "thin" | "thick" | "obese";
export type BodyHeight = "dwarfic" | BasicHeightVariation | "colossal";
export type EyebrowHairLength =
  | "minimal"
  | BasicLengthVariation
  | "extremely-long";
export type EyebrowHeight =
  | "very-close"
  | "close"
  | "median"
  | "distant"
  | "very-distant";
export type EyebrowDensity =
  | "absent"
  | "bare"
  | "sparse"
  | "light"
  | "medium"
  | "dense"
  | "bushy";
export type EyebrowThickness = "vellus" | "fine" | "medium" | "coarse";
export type EyebrowTexture = "straight" | "wavy" | "curly";
export type EyebrowArchAngle =
  | "radial"
  | "obtuse"
  | "acute"
  | "very-acute"
  | "extremely-acute"
  | "s-shaped";
export type EyebrowArchHeight = AveragedMetricVariation;
export type EyebrowArchDistance =
  | "even"
  | "almost-even"
  | "uneven"
  | "extremely-uneven";
export type EyebrowGrowthPattern =
  | "even"
  | "front-heavy"
  | "tail-heavy"
  | "center-heavy";
export type EyebrowGrowthDirection =
  | "upward"
  | "upward-lateral"
  | "lateral"
  | "downward"
  | "downward-lateral"
  | "radial";
export type EyebrowSlitAngle = "none" | "diagonal" | "vertical";
export type EyebrowSlitNumber = "none" | "one" | "two" | "three";
export type EyebrowTrimming =
  | "clean"
  | "fine"
  | "feathered"
  | "heavy"
  | "laminated"
  | "natural"
  | "tapered";
export type Unibrow = "absent" | "faint" | "partial" | "bushy" | "full";
export type EyeFissure = "round" | "almond" | "wide" | "narrow";
export type EyeTilt = "upturned" | "downturned" | "neutral-turned";
export type EyeDepth = "deep-set" | "neutral-set" | "protruding";
export type EyeSpacing = "close-set" | "average-distanced" | "wide-set";
export type EyeEpicanthicFoldExtension = "none" | "partial" | "full";
export type EyeEpicanthicFoldClass = "tarsal" | "palpebral" | "inverted";
export type EyeLidCreaseNumber =
  | "monolid"
  | "doublelid"
  | "triplelid"
  | "quadruplelid";
export type EyelidCreaseHeight = BasicMetricVariation;
export type EyeHood = "hooded" | "partially-hooded" | "unhooded";
export type EyeBagCountor =
  | "flat"
  | "low-budge"
  | "average-budge"
  | "high-budge";
export type EyeBagColor =
  | "dark"
  | "reddish"
  | "blue-violet"
  | "purple-maroon"
  | "yellow-brown"
  | "skin-tone";
export type EyeLashesDensity = "sparse" | "average" | "dense" | "voluminous";
export type EyeLashesLength =
  | "absent"
  | "very-short"
  | BasicLengthVariation
  | "extra-long";
export type EyeLashesCurl =
  | "straight"
  | "slightly-downward-curled"
  | "downward-curled"
  | "slightly-upward-curled"
  | "upward-curled";
export type EyeBallSize =
  | "extremely-small"
  | BasicSizeVariation
  | "extremely-large"
  | "absurdly-large";
export type PupilSize = BasicSizeVariation;
export type PupilPattern =
  | "round"
  | "vertical-slit"
  | "horizontal-slit"
  | "heart"
  | "square"
  | "diamond"
  | "star"
  | "cross";
export type IrisSize = "small" | "average" | "large";
export type EyeColor =
  | "hazel"
  | "black"
  | "blue"
  | "green"
  | "fire"
  | "light"
  | "demon"
  | "feline"
  | "blind"
  | "scar";
export type EyeShape =
  | "almond"
  | "closeSet"
  | "downTurned"
  | "hooded"
  | "monolid"
  | "protrunding"
  | "round"
  | "upTurned"
  | "wideSet";
export type ChinProjection =
  | "very-retrusive"
  | "retrusive"
  | "slightly-retrusive"
  | "normal"
  | "slightly-prominent"
  | "prominent"
  | "very-prominent";
export type ChinPrognathism = "absent" | "maxillary" | "mandibular";
export type ChinWidth =
  | "triangular"
  | "extremely-narrow"
  | "narrow"
  | "medium"
  | "wide"
  | "very-wide";
export type ChinHeight = "very-short" | BasicLengthVariation | "very-long";
export type ChinCleft = "absent" | "shallow" | "deep";
export type LipTuberculeProminence = "absent" | "traced" | "mild" | "prominent";
export type LipTuberculeShape = "rounded" | "flat-top" | "peaked" | "angular";
export type HairTexture =
  | "straight"
  | "straight-wavy"
  | "body-wavy"
  | "wavy"
  | "deep-wavy"
  | "deep-curly"
  | "kinky-curly"
  | "afro"
  | "kinky-straight";
export type HairTidiness = "done" | "tousled" | "frizzy" | "disheveled";
export type HairBangDensity = "full" | "fringe" | "piecey" | "wispy" | "absent";
export type HairBangLength =
  | "micro"
  | "short"
  | "eyebrow-skimming"
  | "blunt-cut"
  | "blunt-across"
  | "lash-length"
  | "cheekbone-length"
  | "lip-length";
export type HairBangShape =
  | "blunt"
  | "arched"
  | "feathered"
  | "curtain"
  | "side-swept"
  | "asymmetrical";
export type HairLength =
  | "bald"
  | "very-short"
  | "short"
  | "medium"
  | "long"
  | "very-long"
  | "extremely-long";
export type Age = "child" | "teen" | "adult" | "senior";
export type ForeheadHairlineHeight =
  | Exclude<BasicMetricVariation, "medium">
  | "average";
export type RecidingLevel =
  | "straight"
  | "triangular"
  | "square"
  | "bitemporal"
  | "diffuse"
  | "complete";
export type ForeheadHairlineShape =
  | "rounded"
  | "m-shaped"
  | "widow-s-peak"
  | "zigzag"
  | "cowlick"
  | "u-shaped"
  | "asymmetrical";
export type ForeheadHeight = BasicHeightVariation | "very-tall";
