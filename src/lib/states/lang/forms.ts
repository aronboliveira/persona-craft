import { LangDict } from "../../declarations/interfaces/utils";
import { AvailableLang } from "../../declarations/types/utils";

export const FORM_DICT: Readonly<{ [K in AvailableLang]: LangDict }> =
  Object.freeze({
    en: {
      str: "Let's start!",
      stl: "What is the style of your creation?",
      null: "Oops! 🐛 Seems like something has gone wrong!",
    },
    pt: {
      str: "Vamos começar!",
      stl: "Qual é o estilo da sua criação?",
      null: "Ops! 🐛 Parece que algo deu errado!",
    },
    es: {
      str: "¡Empecemos!",
      stl: "¿Cuál es el estilo de tu creación?",
      null: "¡Vaya! 🐛 Parece que algo salió mal.",
    },
    fr: {
      str: "Commençons!",
      stl: "Quel est le style de votre création?",
      null: "Désolé! 🐛 Il semble qu'il y ait un problème.",
    },
    zh: {
      str: "让我们开始吧！",
      stl: "您创作的风格是什么？",
      null: "抱歉！🐛 似乎出了点问题。",
    },
  } as const);
