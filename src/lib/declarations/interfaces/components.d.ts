import type React from "react";

export interface GuidanceProps {
  style?: React.CSSProperties;
  className?: string;
  extra?: Record<string, string>;
  svgStyle?: React.CSSProperties;
  svgClassName?: string;
  callback?: (...args: any[]) => any;
  callbackArgs?: any[];
}
