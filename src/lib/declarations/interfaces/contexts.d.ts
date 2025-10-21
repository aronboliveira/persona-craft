import type { NRDispatch } from "../types/foundations";
import { FormState } from "../types/redux";
import { FormsState } from "./redux";

export interface IHomeManifestCtx {
  isManifestOpen: boolean;
  setManifestOpen: NRDispatch<boolean>;
}

export interface IMainFormCtx {
  lang: string;
}

export interface ILayoutCtx {
  style: Partial<CSSStyleDeclaration>;
  classNameMap: Record<string, string>;
  setPortalChildren?: NRDispatch<React.ReactNode>;
  selectedFormRef?: React.RefObject<
    HTMLElement | HTMLFieldSetElement | HTMLFormElement | null
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
  setSelected: NRDispatch<keyof FormsState>;
}
