import { LangDict } from "../../declarations/interfaces/utils";
import { AvailableLang } from "../../declarations/types/utils";

export const GENERIC_DICT: Readonly<{ [K in AvailableLang]: LangDict }> =
  Object.freeze({
    en: {
      img: "Image",
      reset: "Reset",
      next: "Next",
      return: "Return",
    },
    pt: {
      img: "Imagem",
      reset: "Resetar",
      next: "Próximo",
      return: "Retornar",
    },
    es: {
      img: "Imagen",
      reset: "Restablecer",
      next: "Siguiente",
      return: "Regresar",
    },
    fr: {
      img: "Image",
      reset: "Réinitialiser",
      next: "Suivant",
      return: "Retourner",
    },
    zh: {
      img: "图像",
      reset: "重置",
      next: "下一步",
      return: "返回",
    },
  } as const);
