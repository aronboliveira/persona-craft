import { ICarouselCtx } from "../../declarations/interfaces/contexts";
import { createContext } from "react";
export const CarouselCtx = createContext<ICarouselCtx>({
  id: crypto.randomUUID(),
  activeIndex: 0,
  setActiveIndex: null,
  slideCount: 0,
});
