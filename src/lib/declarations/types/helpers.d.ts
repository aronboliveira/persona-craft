export type CarouselComponents =
  | "main"
  | "indicators"
  | "indicator"
  | "slides"
  | "slide"
  | "image"
  | "caption"
  | "prev"
  | "next-button";
export type ImageStyle =
  | "anime"
  | "cartoon"
  | "photorealistic"
  | "pixel"
  | "semi-realistic";
export type ImageStyleAbbr = "anm" | "crt" | "prt" | "pxl" | "smrt";
export type StyleSets = "sr" | "ptr" | "anm" | "crt" | "skt" | "px";
export type StorySettingStyle =
  | "prehistoric"
  | "ancient"
  | "medieval"
  | "renaissance"
  | "goth"
  | "lovecraftian"
  | "victorian"
  | "modern"
  | "dieselpunk"
  | "steampunk"
  | "cyberpunk"
  | "spaceOpera"
  | "spaceOdyssey";
export type StorySettingStyleAbbr =
  | "pst"
  | "act"
  | "mdv"
  | "rns"
  | "gth"
  | "lvc"
  | "vct"
  | "irl"
  | "dsp"
  | "stp"
  | "cbp"
  | "ftr"
  | "spop"
  | "spod";
export type Gender = "female" | "masculine" | "nonbinary";
export type GenderAbbr = "fm" | "m" | "nb";
export type QuestionId = "stl" | "gd" | "bft";
export type Symmetry = "asymmetrical" | "symmetrical";
export type Side = "left" | "right" | "both";
export type StringStyleKeys = {
  [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string
    ? K
    : never;
}[keyof CSSStyleDeclaration];
export type RTouchEvent<T> = TouchEvent<T> | React.TouchEvent<T>;
