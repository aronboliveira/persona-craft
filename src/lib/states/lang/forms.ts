import { LangDict } from "../../declarations/interfaces/utils";
import { AvailableLang } from "../../declarations/types/utils";

export const FORM_DICT: Readonly<{ [K in AvailableLang]: LangDict }> =
  Object.freeze({
    en: {
      str: "Let's start!",
      stl: "What is the style of your creation?",
    },
    pt: {
      str: "Vamos começar!",
      stl: "Qual é o estilo da sua criação?",
    },
    es: {
      str: "¡Empecemos!",
      stl: "¿Cuál es el estilo de tu creación?",
    },
    fr: {
      str: "Commençons!",
      stl: "Quel est le style de votre création?",
    },
    zh: {
      str: "让我们开始吧！",
      stl: "您创作的风格是什么？",
    },
  } as const);
