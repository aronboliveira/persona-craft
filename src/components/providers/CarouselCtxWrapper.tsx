import { JSX, createContext } from "react";
import { ICarouselCtx } from "../../lib/declarations/interfaces/contexts";
export const CarouselCtx = createContext<ICarouselCtx>({
  id: crypto.randomUUID(),
  activeIndex: 0,
  setActiveIndex: null,
  slideCount: 0,
});
export default function CarouselCtxWrapper({
  children,
  value = {
    id: crypto.randomUUID(),
    activeIndex: 0,
    setActiveIndex: null,
    slideCount: 0,
  } as ICarouselCtx,
}: {
  value?: ICarouselCtx;
  children: React.ReactNode;
}): JSX.Element {
  return <CarouselCtx.Provider value={value}>{children}</CarouselCtx.Provider>;
}
