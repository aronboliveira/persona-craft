import type React from "react";
import { CarouselComponents } from "../types/helpers";

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
