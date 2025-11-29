// import { OptDict } from "../declarations/interfaces/utils";
import {
  BodyFat,
  BodyHeight,
  BodyMuscleTypes,
  HairBangDensity,
  HairBangLength,
  HairTexture,
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
] as const satisfies BodyFat[]; // * removed duplicated "thin" previously

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

export const bdHgt = [
  "dwarfic",
  "short",
  "average",
  "tall",
  "colossal",
] as const satisfies BodyHeight[]; // * new height levels
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
