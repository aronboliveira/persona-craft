import { ActionDispatch } from "react";
import type { NHtEl, NRDispatch } from "../types/foundations";
import { FormReducerAction, FormState, TipsAction } from "../types/redux";
import { PromptState, TipsState } from "./redux";

export interface IHomeManifestCtx {
  isManifestOpen: boolean;
  setManifestOpen: NRDispatch<boolean>;
}

export interface IMainFormCtx {
  lang: string;
  tipsState: TipsState;
  dispatchTips: ActionDispatch<[a: TipsAction]>;
  formState: FormState;
  formDispatch: ActionDispatch<[a: FormReducerAction]>;
  handleNext: (...args: any[]) => void;
  handlePrevious: (...args: any[]) => void;
  handleReset: (...args: any[]) => void;
}

export interface ILayoutCtx {
  style: Partial<CSSStyleDeclaration>;
  classNameMap: Record<string, string>;
  setPortalChildren?: NRDispatch<React.ReactNode>;
  selectedFormRef?: React.RefObject<
    NHtEl | HTMLFieldSetElement | HTMLFormElement
  >;
  formState: FormState;
}

export interface IChatbotCtx {
  isChatbotOpen: boolean;
  setChatbotOpen: NRDispatch<boolean>;
}

export interface ICarouselCtx {
  id: string;
  activeIndex: number;
  setActiveIndex: NRDispatch<number>;
  slideCount: number;
}

export interface IOptionCtx {
  selected: string;
  setSelected: NRDispatch<keyof PromptState>;
}
