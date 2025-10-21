import { JSX } from "react";
import { ICarouselCtx } from "../../lib/declarations/interfaces/contexts";
import { CarouselCtx } from "../../lib/states/contexts/CarouselCtx";
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
