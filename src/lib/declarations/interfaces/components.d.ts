import type React from "react";
import { CarouselComponents } from "../types/helpers";
import { TipsState } from "./redux";
import { EnableableTip } from "./utils";

export interface Parent {
  children?: React.ReactNode;
}

export interface GuidanceProps {
  style?: React.CSSProperties;
  className?: string;
  extra?: Record<string, string>;
  svgStyle?: React.CSSProperties;
  svgClassName?: string;
  callback?: (...args: any[]) => any;
  callbackArgs?: any[];
}

export interface StartFormTipProps {
  state: TipsState;
  dispatch: (...args: any[]) => any;
}

export interface SideSwipeProps extends EnableableTip {
  onNext?: (...args: any[]) => any;
  onPrev?: (...args: any[]) => any;
}

export interface CarouselProps extends Parent {
  id: string;
  ariaLabel?: string;
  ride?: "carousel" | "true" | "false" | "";
  styles?: Record<CarouselComponents, React.CSSProperties>;
  classNames?: Record<CarouselComponents, string>;
  callback?: (...args: any[]) => any;
  callbackArgs?: any[];
  extra?: Record<string, string>;
}

export interface CarouselChildStandardProps extends Parent {
  style?: React.CSSProperties;
  className?: string;
}

export interface CarouselSlideProps extends Parent {
  index?: number;
  style?: React.CSSProperties;
  className?: string;
  extra?: Record<string, string>;
}

export interface CarouselIndicatorProps {
  i?: number;
  isActive?: boolean;
  onClick?: () => void;
  parentId: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  className?: string;
}

export interface CarouselImgProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  i?: string;
  extra?: Record<string, string>;
}

export interface OptionFigureProps {
  prefix: string;
  suffix: string;
  name: string;
  src: string;
  handleChange: (...params: any[]) => void;
  value?: string;
  checked?: boolean;
  inpAddProps?: Omit<
    typeof React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  >;
  caption?: string;
  imgAddProps?: Omit<typeof React.ImgHTMLAttributes<HTMLImageElement>, "src">;
  imgStyle?: React.CSSProperties;
  figureAddClasses?: string[];
  imgAddClasses?: string[];
}
