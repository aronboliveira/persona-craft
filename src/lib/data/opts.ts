import { OptDict } from "../declarations/interfaces/utils";
import { BodyFat } from "../declarations/types/anatomy";
import {
  Gender,
  ImageStyle,
  QuestionId,
  StyleSets,
} from "../declarations/types/helpers";
export const styleSets = [
  "anm",
  "crt",
  "ptr",
  "px",
  "skt",
  "sr",
] as StyleSets[];
export const gds = ["female", "male", "nonBinary"] as Gender[];
export const bdTps = ["scrawny", "thin", "fair", "thick", "fat"] as BodyFat[];
export const FORMS_OPTS: Record<
  QuestionId,
  {
    [K in ImageStyle &
      Record<Partial<StyleSets>, Gender> &
      Record<BodyFat, any>]: OptDict;
  }
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
          Object.entries({
            female: { friendlyName: "Feminine" },
            male: { friendlyName: "Masculine" },
            nonBinary: { friendlyName: "Non-binary" },
          }).map(([key, value]) => [
            key,
            {
              ...value,
              src: `/imgs/gender/${styleCode}/dall-e-${
                key === "female"
                  ? "fem-warr"
                  : key === "male"
                  ? "male-knight"
                  : "nb-priest"
              }.${styleCode === "sr" ? "jpeg" : "png"}`,
            },
          ])
        ))(st),
    ])
  ),
  bft: (() => {
    const combos = [];
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
                  "Fair";
              }
            })(),
          });
    return combos;
  })(),
};
