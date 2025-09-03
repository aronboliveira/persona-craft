import type { NRDispatch } from "../types/foundations";

export interface IHomeManifestCtx {
  isManifestOpen: boolean;
  setManifestOpen: NRDispatch<boolean>;
}

export interface IMainFormCtx {
  lang: string;
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
