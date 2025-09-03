import { LangDict } from "../../declarations/interfaces/utils";
import { AvailableLangs } from "../../declarations/types/utils";

export const GENERIC_DICT: Readonly<{ [K in AvailableLangs]: LangDict }> =
  Object.freeze({
    en: {
      img: "Image",
    },
    pt: {
      img: "Imagem",
    },
    es: {
      img: "Imagen",
    },
    fr: {
      img: "Image",
    },
    zh: {
      img: "图像",
    },
  } as const);
