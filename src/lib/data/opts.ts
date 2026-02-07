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
  LipsVermillion,
  LipTuberculeProminence,
  LipTuberculeShape,
  LowerLipShape,
  LowerLipThickness,
  MouthCommissureAngle,
  MouthCommissureShape,
  MouthDimpleShape,
  MouthDimpleSize,
  PupilPattern,
  PupilSize,
  RecidingLevel,
  Unibrow,
  UpperLipThickness,
  NoseShape,
  NoseBridgeWidth,
  NoseBridgeHeight,
  NoseNostrilSize,
  NoseNostrilFlare,
  NoseLength,
  NoseTipAngle,
  EarSize,
  EarShape,
  EarLobe,
  EarAngle,
  EarWidth,
  ChinProjection,
  ChinPrognathism,
  ChinWidth,
  ChinHeight,
  ChinCleft,
  Ethnicity,
  SkinTone,
  SkinUndertone,
  TattooStyle,
  TattooPlacement,
  TattooCoverage,
  PiercingType,
  ScarType,
  ScarPlacement,
  ScarProminence,
} from "../declarations/types/anatomy";
import {
  Gender,
  GenderAbbr,
  ImageFormat,
  // ImageStyle,
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
export enum StyleSetAbbr {
  "anime" = "anm",
  "cartoon" = "crt",
  "photorealistic" = "ptr",
  "pixel" = "px",
  "semi-realistic" = "skt",
}
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
export const isValidStyleAbbr = (abbr: string): abbr is StyleSets => {
  return styleSets.includes(abbr as StyleSets);
};
export const isValidGender = (abbr: string): abbr is GenderAbbr => {
  return gdAbbrs.includes(abbr as GenderAbbr);
};
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
  "square",
  "triangular",
  "bitemporal",
  "diffuse",
  "complete",
] as const satisfies RecidingLevel[];
export const frHdLnShp = [
  "rounded",
  "cowlick",
  "m-shaped",
  "u-shaped",
  "asymmetrical",
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
export const mtLwLpVlm = [...mtUpLpVlm] as const satisfies LowerLipThickness[];
export const mtLwLpShp = [
  "centralized",
  "flat-abroad",
  "lateralized",
  "rounded-pillow",
  "pronounced",
  "pouty-everted",
] as const satisfies LowerLipShape[];
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
export const mtLpVrm = [
  "blurred",
  "noticeable",
  "marked",
] as const satisfies LipsVermillion[];
export const mthCmmAng = [
  "downturned",
  "neutral",
  "upturned",
] as const satisfies MouthCommissureAngle[];
export const mthCmmShp = [
  "thin",
  "average",
  "large",
] as const satisfies MouthCommissureShape[];
export const mthDmpSz = [
  "null",
  "small",
  "average",
  "large",
] as const satisfies MouthDimpleSize[];
export const mthDmpShp = [
  "none",
  "round",
  "oval",
  "elongated",
] as const satisfies MouthDimpleShape[];
export const bdHgt = [
  "dwarfic",
  "short",
  "average",
  "tall",
  "colossal",
] as const satisfies BodyHeight[];
// ─── Nose options ───────────────────────────────────────
export const nsShp = [
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
] as const satisfies NoseShape[];
export const nsBrW = [
  "narrow",
  "average",
  "wide",
] as const satisfies NoseBridgeWidth[];
export const nsBrH = [
  "short",
  "average",
  "tall",
] as const satisfies NoseBridgeHeight[];
export const nsNtSz = [
  "small",
  "average",
  "large",
] as const satisfies NoseNostrilSize[];
export const nsNtFl = [
  "minimal",
  "moderate",
  "wide",
] as const satisfies NoseNostrilFlare[];
export const nsLng = [
  "short",
  "average",
  "long",
] as const satisfies NoseLength[];
export const nsTpAng = [
  "upturned",
  "neutral",
  "downturned",
] as const satisfies NoseTipAngle[];
// ─── Ear options ────────────────────────────────────────
export const erSz = ["small", "average", "large"] as const satisfies EarSize[];
export const erShp = [
  "round",
  "pointed",
  "square",
  "oval",
  "triangular",
] as const satisfies EarShape[];
export const erLb = [
  "attached",
  "partially-attached",
  "free",
] as const satisfies EarLobe[];
export const erAng = [
  "flat",
  "slightly-protruding",
  "protruding",
] as const satisfies EarAngle[];
export const erWd = ["narrow", "average", "wide"] as const satisfies EarWidth[];
// ─── Chin options ───────────────────────────────────────
export const cnPrj = [
  "very-retrusive",
  "retrusive",
  "slightly-retrusive",
  "normal",
  "slightly-prominent",
  "prominent",
  "very-prominent",
] as const satisfies ChinProjection[];
export const cnPrg = [
  "absent",
  "maxillary",
  "mandibular",
] as const satisfies ChinPrognathism[];
export const cnWd = [
  "triangular",
  "extremely-narrow",
  "narrow",
  "medium",
  "wide",
  "very-wide",
] as const satisfies ChinWidth[];
export const cnHgt = [
  "very-short",
  "short",
  "average",
  "long",
  "very-long",
] as const satisfies ChinHeight[];
export const cnClf = [
  "absent",
  "shallow",
  "deep",
] as const satisfies ChinCleft[];
// ─── Ethnicity & Skin options ──────────────────────────
export const ethnicities = [
  "east-asian",
  "south-asian",
  "southeast-asian",
  "west-african",
  "east-african",
  "north-african",
  "european",
  "middle-eastern",
  "latin-american",
  "indigenous-american",
  "pacific-islander",
  "mixed",
] as const satisfies Ethnicity[];
export const skinTones = [
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
] as const satisfies SkinTone[];
export const skinUndertones = [
  "warm",
  "neutral",
  "cool",
] as const satisfies SkinUndertone[];
// ─── Body modification options ─────────────────────────
export const ttStls = [
  "none",
  "traditional",
  "neo-traditional",
  "tribal",
  "japanese",
  "blackwork",
  "dotwork",
  "watercolor",
  "geometric",
  "realism",
  "minimalist",
  "lettering",
] as const satisfies TattooStyle[];
export const ttPlcs = [
  "none",
  "face",
  "neck",
  "chest",
  "back",
  "upper-arm",
  "forearm",
  "hand",
  "thigh",
  "calf",
  "ankle",
  "full-sleeve",
  "half-sleeve",
] as const satisfies TattooPlacement[];
export const ttCovs = [
  "none",
  "minimal",
  "moderate",
  "heavy",
  "full-body",
] as const satisfies TattooCoverage[];
export const prcTps = [
  "none",
  "ear-lobe",
  "ear-helix",
  "ear-tragus",
  "ear-industrial",
  "nostril",
  "septum",
  "lip",
  "labret",
  "eyebrow",
  "tongue",
  "navel",
  "bridge",
] as const satisfies PiercingType[];
export const scrTps = [
  "none",
  "linear",
  "burn",
  "keloid",
  "pitted",
  "surgical",
] as const satisfies ScarType[];
export const scrPlcs = [
  "none",
  "face",
  "neck",
  "chest",
  "back",
  "arms",
  "legs",
  "hands",
] as const satisfies ScarPlacement[];
export const scrPrms = [
  "none",
  "faded",
  "visible",
  "prominent",
] as const satisfies ScarProminence[];
export const DEFAULT_OPTS: OptsMap<"stl" | "gd" | "msc" | "hgt"> =
  Object.freeze(
    (() => {
      return {
        stl: styleSets.includes("anm") ? "anm" : styleSets[0],
        gd: gds.includes("female") ? "female" : gds[0],
        msc: mscLvls.includes("average") ? "average" : mscLvls[0],
        hgt: bdHgt.includes("average") ? "average" : bdHgt[0],
      };
    })(),
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
export const imgBasePath = "/imgs";
export const FORMS_OPTS = {
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
          ]),
        ))(st),
    ]),
  ),
  msc: (
    gnd: GenderAbbr | Gender = "fm",
    stl: StyleSets = "anm",
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
          src: `${imgBasePath}/muscle/${stl}/${
            Object.values(GdAbbr).includes(gnd as GdAbbr)
              ? gnd
              : gnd in GdAbbr
                ? GdAbbr[gnd as keyof typeof GdAbbr]
                : "fm"
          }/${mscLvl}.png` as any,
        };
        return acc;
      },
      {} as {
        [K in BodyMuscleTypes]: {
          friendlyName: string;
          src: `${typeof imgBasePath}/muscle/${string}.${ImageFormat}`;
        };
      },
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
