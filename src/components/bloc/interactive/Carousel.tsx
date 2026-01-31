import {
  Children,
  cloneElement,
  ComponentProps,
  isValidElement,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  ReactElement,
} from "react";
import {
  CarouselChildStandardProps,
  CarouselImgProps,
  CarouselIndicatorProps,
  CarouselProps,
  CarouselSlideProps,
} from "../../../lib/declarations/interfaces/components";
import { CarouselCtx } from "../../../lib/states/contexts/CarouselCtx";
import CarouselCtxWrapper from "../../providers/CarouselCtxWrapper";
import { ICarouselCtx } from "../../../lib/declarations/interfaces/contexts";
import { NRDispatch } from "../../../lib/declarations/types/foundations";
export default function Carousel({
  styles,
  classNames,
  callback,
  extra,
  callbackArgs = [],
  id = crypto.randomUUID(),
  children = <></>,
  ride = "false",
}: CarouselProps): JSX.Element {
  const isSlidesElement = (
    child: React.ReactNode,
  ): child is ReactElement<
    ComponentProps<typeof Carousel.Slides>,
    typeof Carousel.Slides
  > => isValidElement(child) && child.type === Carousel.Slides;
  const mainRef = useRef<HTMLDivElement>(null),
    slides = useMemo(
      () => Children.toArray(children).find(isSlidesElement),
      [children],
    ),
    slideCount = useMemo(
      () => (slides ? Children.count(slides.props.children) : 0),
      [slides],
    ),
    [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    /* eslint-disable */
    callback && callback(...callbackArgs);
    /* eslint-enable */
  }, [callback, callbackArgs]);
  useEffect(() => {
    if (
      mainRef.current instanceof HTMLElement &&
      typeof extra === "object" &&
      extra !== null &&
      Object.keys(extra).length > 0
    ) {
      Object.entries(extra).forEach(
        ([key, value]) =>
          mainRef.current &&
          mainRef.current.hasAttribute(key) &&
          mainRef.current.setAttribute(key, value),
      );
    }
  }, [extra, mainRef]);
  return (
    <div
      ref={mainRef}
      id={id}
      className={`carousel slide ${
        classNames?.["main"] ? ` ${classNames["main"]}` : {}
      }`}
      style={styles?.main ? styles.main : {}}
      role="region"
      aria-roledescription="carousel"
      data-bs-ride={["carousel", "true", "false"].includes(ride) ? ride : ""}
    >
      <CarouselCtxWrapper
        value={{ id, activeIndex, setActiveIndex, slideCount }}
      >
        {children}
      </CarouselCtxWrapper>
    </div>
  );
}

Carousel.Slides = function Slides({
  children = <></>,
  style,
  className,
}: CarouselChildStandardProps): JSX.Element {
  return (
    <div
      className={`carousel-inner${className ? ` ${className}` : ""}`}
      style={style ? style : {}}
    >
      {children}
    </div>
  );
};

Carousel.Slide = function Slide({
  index = 0,
  children = <></>,
  style,
  className,
}: CarouselSlideProps): JSX.Element {
  const ctx = useContext<ICarouselCtx>(CarouselCtx);
  let isActive = false;
  if (ctx) {
    index = ctx.activeIndex;
    isActive = index === ctx.activeIndex;
  }
  return (
    <figure
      className={`carousel-item${isActive ? " active" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={style ? style : {}}
    >
      {children}
    </figure>
  );
};

Carousel.Image = function Image({
  src,
  style,
  className,
  alt = "Carousel image",
  i = "#",
  extra = {},
}: CarouselImgProps): JSX.Element {
  const filteredExtra: Record<string, string> = {},
    imgAtttrs = [
      "attributionsrc",
      "crossorigin",
      "decoding",
      "elementtiming",
      "fetchpriority",
      "height",
      "ismap",
      "importance",
      "loading",
      "referrerpolicy",
      "sizes",
      "srcset",
      "width",
      "usemap",
    ];
  Object.entries(extra).forEach(([k, v]) => {
    if (imgAtttrs.includes(k)) filteredExtra[k] = v;
  });
  return (
    <img
      {...filteredExtra}
      src={src}
      alt={alt ? alt : `Carousel image${i ? ` ${i}` : ""}`}
      className={`d-block w-100${className ? ` ${className}` : ""}`}
      style={style ? style : {}}
    />
  );
};

Carousel.Indicators = function Indicators({
  children = <></>,
  className = "",
  style = {},
}: CarouselChildStandardProps & {
  children: React.ReactNode;
}): JSX.Element {
  const ctx = useContext<ICarouselCtx>(CarouselCtx);
  let id = "",
    activeIndex = 0,
    setActiveIndex: NRDispatch<number> = () => {};
  if (ctx) {
    id = ctx.id;
    activeIndex = ctx.activeIndex;
    setActiveIndex = ctx.setActiveIndex;
  }
  return (
    <fieldset
      className={`carousel-indicators${className ? ` ${className}` : ""}`}
      style={style ? style : {}}
    >
      {Children.map(children, (child, i: number) => {
        if (!isValidElement(child)) return null;
        return cloneElement(child, {
          // @ts-ignore
          i,
          isActive: i === activeIndex,
          onClick: () => setActiveIndex && setActiveIndex(i),
          parentId: id,
        });
      })}
    </fieldset>
  );
};

Carousel.Indicator = function Indicator({
  parentId,
  i = 0,
  isActive = false,
  onClick = () => {},
  ariaLabel = "",
  className = "",
  style = {},
}: CarouselIndicatorProps) {
  return (
    <button
      type="button"
      className={`carousel-indicator${isActive ? " active" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={style ? style : {}}
      data-bs-target={`#${parentId}`}
      data-bs-slide-to={i}
      aria-label={ariaLabel ? ariaLabel : `Slide ${i + 1}`}
      aria-current={isActive ? "true" : "false"}
      onClick={onClick}
    />
  );
};

Carousel.Caption = function Caption({
  children = <></>,
  style,
  className,
}: CarouselChildStandardProps): JSX.Element {
  return (
    <figcaption
      className={`carousel-caption d-none d-md-block${
        className ? ` ${className}` : ""
      }`}
      style={style ? style : {}}
    >
      {children}
    </figcaption>
  );
};

Carousel.PrevButton = function PrevButton({
  children = <></>,
  style = {},
  className = "",
}: CarouselChildStandardProps) {
  const ctx = useContext<ICarouselCtx>(CarouselCtx);
  let id = "",
    activeIndex = 0,
    setActiveIndex: NRDispatch<number> = () => {},
    slideCount = 0;
  if (ctx) {
    id = ctx.id;
    activeIndex = ctx.activeIndex;
    setActiveIndex = ctx.setActiveIndex;
    slideCount = ctx.slideCount;
  }
  const goPrev = useCallback(
    () =>
      setActiveIndex &&
      setActiveIndex((activeIndex - 1 + slideCount) % slideCount),
    [setActiveIndex, slideCount],
  );
  return (
    <button
      className={`carousel-control-prev${className ? ` ${className}` : ""}`}
      type="button"
      data-bs-target={`#${id}`}
      data-bs-slide="prev"
      aria-label="Previous slide"
      style={style ? style : {}}
      onClick={goPrev}
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
      {children}
    </button>
  );
};

Carousel.NextButton = function NextButton({
  children = <></>,
  style = {},
  className = "",
}: CarouselChildStandardProps) {
  const ctx = useContext<ICarouselCtx>(CarouselCtx);
  let id = "",
    activeIndex = 0,
    setActiveIndex: NRDispatch<number> = () => {},
    slideCount = 0;
  if (ctx) {
    id = ctx.id;
    activeIndex = ctx.activeIndex;
    setActiveIndex = ctx.setActiveIndex;
    slideCount = ctx.slideCount;
  }
  const goNext = useCallback(
    () => setActiveIndex && setActiveIndex((activeIndex + 1) % slideCount),
    [activeIndex, setActiveIndex, slideCount],
  );
  return (
    <button
      className={`carousel-control-next${className ? ` ${className}` : ""}`}
      type="button"
      data-bs-target={`#${id}`}
      data-bs-slide="next"
      aria-label="Next slide"
      style={style ? style : {}}
      onClick={goNext}
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
      {children}
    </button>
  );
};
