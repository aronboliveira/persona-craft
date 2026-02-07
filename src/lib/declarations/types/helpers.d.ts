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
export type Gender = "female" | "masculine" | "nonBinary";
export type GenderAbbr = "fm" | "m" | "nb";
export type QuestionId =
  | "stl"
  | "gd"
  | "msc"
  | "bft"
  | "hgt"
  | "eth"
  | "skt"
  | "sku"
  | "nsShp"
  | "nsBrW"
  | "nsBrH"
  | "nsNtSz"
  | "nsNtFl"
  | "nsLng"
  | "nsTpAng"
  | "erSz"
  | "erShp"
  | "erLb"
  | "erAng"
  | "erWd"
  | "cnPrj"
  | "cnPrg"
  | "cnWd"
  | "cnHgt"
  | "cnClf"
  | "ttStl"
  | "ttPlc"
  | "ttCov"
  | "prcTp"
  | "scrTp"
  | "scrPlc"
  | "scrPrm";
export type Symmetry = "asymmetrical" | "symmetrical";
export type Side = "left" | "right" | "both";
export type StringStyleKeys = {
  [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string
    ? K
    : never;
}[keyof CSSStyleDeclaration];
export type RTouchEvent<T> = TouchEvent<T> | React.TouchEvent<T>;
export type ValidateGdAbbrKeys = {
  [K in Gender]: K extends keyof typeof GdAbbr ? true : never;
};
export type ImageFormat = "png" | "jpg" | "jpeg" | "webp" | "gif";
