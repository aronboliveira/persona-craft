import {
  BodyFat,
  BodyHeight,
  BodyMuscleTypes,
  CupidBowHeight,
  CupidBowWidth,
  EyeBagColor,
  EyeBagCountor,
  EyeBallSize,
  EyebrowArchAngle,
  EyebrowArchDistance,
  EyebrowArchHeight,
  EyebrowDensity,
  EyebrowGrowthDirection,
  EyebrowGrowthPattern,
  EyebrowHairLength,
  EyebrowHeight,
  EyebrowSlitAngle,
  EyebrowSlitNumber,
  EyebrowTexture,
  EyebrowThickness,
  EyebrowTrimming,
  EyeColor,
  EyeDepth,
  EyeEpicanthicFoldClass,
  EyeEpicanthicFoldExtension,
  EyeFissure,
  EyeHood,
  EyeLashesCurl,
  EyeLashesDensity,
  EyeLashesLength,
  EyelidCreaseHeight,
  EyeLidCreaseNumber,
  EyeSpacing,
  EyeTilt,
  ForeheadHairlineHeight,
  ForeheadHairlineShape,
  ForeheadHeight,
  HairBangDensity,
  HairBangLength,
  HairBangShape,
  HairLength,
  HairTexture,
  HairTidiness,
  IrisSize,
  LipTuberculeProminence,
  LipTuberculeShape,
  PupilPattern,
  PupilSize,
  RecidingLevel,
  Unibrow,
  UpperLipThickness,
} from "../declarations/types/anatomy";
import {
  Gender,
  GenderAbbr,
  ImageFormat,
  // ImageStyle,
  QuestionId,
  StyleSets,
} from "../declarations/types/helpers";
import { OptsMap } from "../declarations/types/utils";

export const styleSets = Object.seal([
  "anm",
  "crt",
  "ptr",
  "px",
  "skt",
  "sr",
]) as StyleSets[];
export const gds = [
  "female",
  "masculine",
  "nonBinary",
] as const satisfies Gender[];
export const gdAbbrs = ["fm", "m", "nb"] as const satisfies GenderAbbr[];
export enum GdAbbr {
  female = "fm",
  masculine = "m",
  nonBinary = "nb",
}
export const mscLvls = [
  "average",
  "frail",
  "weak",
  "athletic",
  "herculean",
] as const satisfies BodyMuscleTypes[];
export const bdTps = [
  "thin",
  "scrawny",
  "thick",
  "obese",
] as const satisfies BodyFat[];
export const hrTxt = [
  "straight",
  "straight-wavy",
  "body-wavy",
  "wavy",
  "deep-wavy",
  "deep-curly",
  "kinky-curly",
  "afro",
  "kinky-straight",
] as const satisfies HairTexture[];
export const hrLng = [
  "bald",
  "very-short",
  "short",
  "medium",
  "long",
  "very-long",
  "extremely-long",
] as const satisfies HairLength[];
export const hrTd = [
  "done",
  "tousled",
  "frizzy",
  "disheveled",
] as const satisfies HairTidiness[];
export const hrBgLg = [
  "micro",
  "short",
  "blunt-across",
  "blunt-cut",
  "cheekbone-length",
  "eyebrow-skimming",
  "lash-length",
  "lip-length",
] as const satisfies HairBangLength[];
export const hrBgDs = [
  "full",
  "fringe",
  "piecey",
  "wispy",
  "absent",
] as const satisfies HairBangDensity[];
export const hrBgSp = [
  "blunt",
  "arched",
  "feathered",
  "curtain",
  "side-swept",
  "asymmetrical",
] as const satisfies HairBangShape[];
export const frHdLnHg = [
  "low",
  "average",
  "high",
] as const satisfies ForeheadHairlineHeight[];
export const frHdLnRcvLv = [
  "straight",
  "bitemporal",
  "complete",
  "diffuse",
  "square",
  "square",
  "triangular",
] as const satisfies RecidingLevel[];
export const frHdLnShp = [
  "rounded",
  "asymmetrical",
  "cowlick",
  "cowlick",
  "m-shaped",
  "u-shaped",
  "widow-s-peak",
  "zigzag",
] as const satisfies ForeheadHairlineShape[];
export const frHdHgt = [
  "short",
  "average",
  "tall",
  "very-tall",
] as const satisfies ForeheadHeight[];
export const eyeBrwDst = [
  "absent",
  "bare",
  "light",
  "medium",
  "dense",
  "bushy",
] as const satisfies EyebrowDensity[];
export const eyeBrwGrwtPtn = [
  "even",
  "center-heavy",
  "front-heavy",
  "tail-heavy",
] as const satisfies EyebrowGrowthPattern[];
export const eyeBrwGrwtDir = [
  "upward",
  "upward-lateral",
  "lateral",
  "downward",
  "downward-lateral",
  "radial",
] as const satisfies EyebrowGrowthDirection[];
export const eyeBrwGrwArcAng = [
  "radial",
  "obtuse",
  "acute",
  "very-acute",
  "extremely-acute",
  "s-shaped",
] as const satisfies EyebrowArchAngle[];
export const eyeBrwTipsDst = [
  "almost-even",
  "even",
  "uneven",
  "extremely-uneven",
] as const satisfies EyebrowArchDistance[];
export const eyeBrwArchHgt = [
  "very-low",
  "low",
  "average",
  "high",
  "very-high",
] as const satisfies EyebrowArchHeight[];
export const eyeBrwHght = [
  "very-close",
  "close",
  "median",
  "distant",
  "very-distant",
] as const satisfies EyebrowHeight[];
export const eyeBrwLng = [
  "minimal",
  "short",
  "average",
  "long",
  "extremely-long",
] as const satisfies EyebrowHairLength[];
export const eyeBrwTxt = [
  "straight",
  "wavy",
  "curly",
] as const satisfies EyebrowTexture[];
export const eyeBrwThk = [
  "vellus",
  "fine",
  "medium",
  "coarse",
] as const satisfies EyebrowThickness[];
export const eyeBrwUnb = [
  "absent",
  "faint",
  "partial",
  "full",
  "bushy",
] as const satisfies Unibrow[];
export const eyeBrwTrm = [
  "clean",
  "fine",
  "feathered",
  "heavy",
  "laminated",
  "natural",
  "tapered",
] as const satisfies EyebrowTrimming[];
export const eyeBrwSltAng = [
  "none",
  "diagonal",
  "vertical",
] as const satisfies EyebrowSlitAngle[];
export const eyeBrwSltNum = [
  "none",
  "one",
  "two",
  "three",
] as const satisfies EyebrowSlitNumber[];
export const eyeBlSz = [
  "extremely-small",
  "very-small",
  "small",
  "average",
  "large",
  "very-large",
  "extremely-large",
  "absurdly-large",
] as const satisfies EyeBallSize[];
export const eyeClr = [
  "hazel",
  "black",
  "blue",
  "green",
  "blind",
  "scar",
  "fire",
  "light",
  "demon",
] as const satisfies EyeColor[];
export const eyeIrisSz = [
  "small",
  "average",
  "large",
] as const satisfies IrisSize[];
export const eyePplSz = [
  "very-small",
  "small",
  "average",
  "large",
  "very-large",
] as const satisfies PupilSize[];
export const eyePplPtn = [
  "round",
  "vertical-slit",
  "heart",
  "star",
  "cross",
  "diamond",
  "horizontal-slit",
  "square",
] as const satisfies PupilPattern[];
export const eyeFs = [
  "narrow",
  "wide",
  "almond",
  "round",
] as const satisfies EyeFissure[];
export const eyeTlt = [
  "downturned",
  "neutral-turned",
  "upturned",
] as const satisfies EyeTilt[];
export const eyeDpt = [
  "deep-set",
  "neutral-set",
  "protruding",
] as const satisfies EyeDepth[];
export const eyeSpc = [
  "close-set",
  "average-distanced",
  "wide-set",
] as const satisfies EyeSpacing[];
export const eyeLidCrsN = [
  "monolid",
  "doublelid",
  "triplelid",
  "quadruplelid",
] as const satisfies EyeLidCreaseNumber[];
export const eyeLidCrsH = [
  "low",
  "medium",
  "high",
] as const satisfies EyelidCreaseHeight[];
export const eyeLidEpcExt = [
  "none",
  "partial",
  "full",
] as const satisfies EyeEpicanthicFoldExtension[];
export const eyeLidEpcCls = [
  "none",
  "tarsal",
  "palpebral",
  "inverted",
] as const satisfies EyeEpicanthicFoldClass[];
export const eyeHd = [
  "hooded",
  "partially-hooded",
  "unhooded",
] as const satisfies EyeHood[];
export const eyeBagCnt = [
  "flat",
  "low-budge",
  "average-budge",
  "high-budge",
] as const satisfies EyeBagCountor[];
export const eyeBagClr = [
  "skin-tone",
  "dark",
  "blue-violet",
  "purple-maroon",
  "reddish",
  "yellow-brown",
] as const satisfies EyeBagColor[];
export const eyeLshDst = [
  "sparse",
  "average",
  "dense",
  "voluminous",
] as const satisfies EyeLashesDensity[];
export const eyeLshLgt = [
  "absent",
  "very-short",
  "short",
  "average",
  "long",
  "extra-long",
] as const satisfies EyeLashesLength[];
export const eyeLshCrl = [
  "upward-curled",
  "slightly-upward-curled",
  "straight",
  "slightly-downward-curled",
  "downward-curled",
] as const satisfies EyeLashesCurl[];
export const mtUpLpVlm = [
  "very-flat",
  "flat",
  "average",
  "full",
  "very-full",
  "extremely-full",
] as const satisfies UpperLipThickness[];
export const mtCpBwWd = [
  "narrow",
  "average",
  "wide",
] as const satisfies CupidBowWidth[];
export const mtCpBwHgt = [
  "short",
  "average",
  "tall",
] as const satisfies CupidBowHeight[];
export const mtLpTrbPrm = [
  "absent",
  "traced",
  "mild",
  "prominent",
] as const satisfies LipTuberculeProminence[];
export const mtLpTrbShp = [
  "rounded",
  "peaked",
  "angular",
  "flat-top",
] as const satisfies LipTuberculeShape[];
export const bdHgt = [
  "dwarfic",
  "short",
  "average",
  "tall",
  "colossal",
] as const satisfies BodyHeight[];
export const DEFAULT_OPTS: OptsMap<Exclude<QuestionId, "bft">> = Object.freeze(
  (() => {
    return {
      stl: styleSets.includes("anm") ? "anm" : styleSets[0],
      gd: gds.includes("female") ? "female" : gds[0],
      msc: mscLvls.includes("average") ? "average" : mscLvls[0],
      hgt: bdHgt.includes("average") ? "average" : bdHgt[0], // * default height
    };
  })()
);
export const genderDetails = {
  female: { friendlyName: "Feminine" },
  masculine: { friendlyName: "Masculine" },
  nonBinary: { friendlyName: "Non-binary" },
} as const satisfies Record<Gender, { friendlyName: string }>;
export const muscleDetails = {
  average: { friendlyName: "Average" },
  frail: { friendlyName: "Frail" },
  weak: { friendlyName: "Weak" },
  athletic: { friendlyName: "Athletic" },
  herculean: { friendlyName: "Herculean" },
} as const satisfies Record<BodyMuscleTypes, { friendlyName: string }>;
const imgBasePath = "/imgs";
export const FORMS_OPTS: Record<
  QuestionId,
  object | ((...args: any[]) => object)
> = {
  stl: {
    "semi-realistic": {
      friendlyName: "Semi-Realistic",
      src: "/imgs/dalle_elf_dancer.webp",
    },
    photorealistic: {
      friendlyName: "Photorealistic",
      src: "/imgs/dall-e-dancer.png",
    },
    anime: { friendlyName: "Anime", src: "/imgs/dall-e-warlock.png" },
    cartoon: {
      friendlyName: "Cartoon",
      src: "/imgs/dall-e-druid-capybara.png",
    },
    // sketch: { friendlyName: "Sketch", src: "/imgs/dall-e-warrior-sketch.png" },
    pixel: { friendlyName: "Pixel", src: "/imgs/dall-e-wizard-geomancer.png" },
  },
  gd: Object.fromEntries(
    styleSets.map(st => [
      st,
      ((styleCode: string) =>
        Object.fromEntries(
          Object.entries(genderDetails).map(([key, value]) => [
            key,
            {
              ...value,
              src: `${imgBasePath}/gender/${styleCode}/dall-e-${
                key === "female"
                  ? "fem-warr"
                  : key === "masculine"
                  ? "male-knight"
                  : "nb-priest"
              }.${styleCode === "sr" ? "jpeg" : "png"}`,
            },
          ])
        ))(st),
    ])
  ), // * "masculine" now matches the Gender union; previously "male" never matched
  msc: (
    gnd: GenderAbbr | Gender = "fm",
    stl: StyleSets = "anm"
  ): {
    [K in BodyMuscleTypes]: {
      friendlyName: string;
      src: `${typeof imgBasePath}/muscle/${string}.${ImageFormat}`;
    };
  } => {
    gnd = gdAbbrs.includes(gnd as any)
      ? gnd
      : gds.includes(gnd as any)
      ? GdAbbr[gnd as Gender]
      : "fm";

    return mscLvls.reduce(
      (acc, mscLvl) => {
        acc[mscLvl] = {
          friendlyName: muscleDetails[mscLvl].friendlyName,
          src: `${imgBasePath}/muscle/${stl}/${gnd}-${mscLvl}.png` as any,
        };
        return acc;
      },
      {} as {
        [K in BodyMuscleTypes]: {
          friendlyName: string;
          src: `${typeof imgBasePath}/muscle/${string}.${ImageFormat}`;
        };
      }
    );
  },
  bft: (() => {
    const combos: { src: string; friendlyName: string }[] = []; // * explicit element type helps with tooling and refactors
    for (const st of styleSets)
      for (const gd of gds)
        for (const bd of bdTps)
          combos.push({
            // TODO MAIS UM NÍVEL, PARA AS IMAGENS ESCOLHIDAS
            src: `/imgs/${st}/${gd}/${bd}/`,
            friendlyName: (() => {
              switch (bd) {
                case "obese":
                  return "Obese";
                case "scrawny":
                  return "Scrawny";
                case "thick":
                  return "Thick";
                case "thin":
                  return "Thin";
                default:
                  return "Fair"; // * ensure a fallback label is always returned
              }
            })(),
          });
    return combos;
  })(),
  hgt: (() => {
    const basePath = `${imgBasePath}/height`; // * base folder: /public/imgs/height
    const entries = {} as {
      [K in BodyHeight]: {
        friendlyName: string;
        src: `${typeof imgBasePath}/height/${string}.${ImageFormat}`;
      };
    }; // * strongly typed map for height options

    for (const h of bdHgt) {
      let friendlyName: string;
      switch (h) {
        case "dwarfic":
          friendlyName = "Dwarfic";
          break;
        case "short":
          friendlyName = "Short";
          break;
        case "average":
          friendlyName = "Average";
          break;
        case "tall":
          friendlyName = "Tall";
          break;
        case "colossal":
          friendlyName = "Colossal";
          break;
        default:
          friendlyName = h;
      }

      entries[h] = {
        friendlyName,
        src: `${basePath}/${h}.png` as any, // * e.g. /imgs/height/short.png
      };
    }

    return entries;
  })(),
};
