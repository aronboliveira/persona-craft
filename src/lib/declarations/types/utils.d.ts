import { gds, styleSets } from "../../data/opts";
import { Character } from "../interfaces/utils";
import { QuestionId } from "./helpers";

export type BasicMetricVariation = "low" | "medium" | "high";
export type AveragedMetricVariation =
  | "very-low"
  | Exclude<BasicMetricVariation, "medium">
  | "average"
  | "very-high";
export type BasicLengthVariation = "short" | "average" | "long";
export type BasicHeightVariation = "short" | "average" | "tall";
export type BasicWidthVariation = "narrow" | "average" | "wide";
export type BasicVolumeVariation = "flat" | "average" | "full";
export type NarrowedSizeVariation = "small" | "average" | "large";
export type BasicSizeVariation =
  | "very-small"
  | NarrowedSizeVariation
  | "very-large";
export type AvailableLang = "en" | "pt" | "es" | "fr" | "zh";
export type IdKeys = "FORM_ID" | "GENDER_FORM_ID";
export type ClsKeys =
  | "IMG_RD_LB"
  | "IMG_RD_INP"
  | "BTN_WARN"
  | "BTN_INFO"
  | "BTN_PRIM"
  | "OPT_FIMG"
  | "STL_OPT";
export type OptValue<K extends QuestionId> = K extends "stl"
  ? StyleSets
  : K extends "gd"
  ? Gender
  : string;
export type OptsMap<K extends QuestionId> = {
  [P in K]: OptValue<P>;
};
export type ArrayElement<T extends readonly any[]> = T[number];
export type UnboxArray<T> = T extends readonly (infer U)[] ? U : T;
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;
export type Builtin =
  | Primitive
  | ((...args: any[]) => any)
  | Date
  | RegExp
  | Error;
export type DeepWritable<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepWritable<K>, DeepWritable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? Map<DeepWritable<K>, DeepWritable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepWritable<K>, DeepWritable<V>>
  : T extends Set<infer U>
  ? Set<DeepWritable<U>>
  : T extends ReadonlySet<infer U>
  ? Set<DeepWritable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepWritable<U>>
  : T extends Promise<infer U>
  ? Promise<DeepWritable<U>>
  : T extends Array<infer U>
  ? Array<DeepWritable<U>>
  : T extends ReadonlyArray<infer U>
  ? Array<DeepWritable<U>>
  : T extends object
  ? { -readonly [P in keyof T]: DeepWritable<T[P]> }
  : T;
export type ValidateOptsAgainstArrays<T> = {
  [K in keyof T]: K extends "stl"
    ? T[K] extends ArrayElement<typeof styleSets>
      ? T[K]
      : never
    : K extends "gd"
    ? T[K] extends ArrayElement<typeof gds>
      ? T[K]
      : never
    : T[K];
};
export type DeepOptional<T> = T extends (...args: any[]) => infer R
  ? (...args: Parameters<T>) => DeepOptional<R>
  : T extends object
  ? { [K in keyof T]?: DeepOptional<T[K]> }
  : T;
export type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T | undefined;
export type DeepAnatomicKey<T, O = Character> = UnboxArray<T> extends infer U
  ? U extends object
    ? U extends O
      ? never
      : {
          [K in keyof U]: U[K] extends object ? DeepAnatomicKey<U[K], O> : U[K];
        }[keyof U]
    : U
  : never;
export type StateWithCharacter = { character: Character };
export type FriendlyNamed = {
  friendlyName: string;
  src: string;
};
export type TemporalKind =
  | "date"
  | "datetime-local"
  | "time"
  | "week"
  | "month";
export type UploadStatus =
  | "queued"
  | "uploading"
  | "success"
  | "error"
  | "canceled";
export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;
export type FrozenStringRecord = DeepReadonly<Record<string, string>>;
export type FrozenFlagRecord = DeepReadonly<Record<string, true>>;
export type FrozenStringList = DeepReadonly<readonly string[]>;
export type CoreLists =
  | Map
  | Set
  | Array
  | Uint16Array
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
export type NonIterableArrayLike =
  | DOMStringList
  | DOMStringMap
  | TouchList
  | WeakMap
  | WeakSet;
export type HtmlCollectionLike =
  | HTMLCollection
  | HTMLAllCollection
  | HTMLFormControlsCollection
  | HTMLOptionsCollection;
export type HtmlContentList =
  | NodeList
  | NamedNodeMap
  | DOMTokenList
  | Headers
  | URLSearchParams
  | RTCStatsReport;
export type StyleContentList =
  | StyleSheetList
  | Highlight
  | HighlightRegistry
  | CSSUnparsedValue
  | CSSTransformValue
  | CustomStateSet
  | FontFaceSet
  | MediaKeyStatusMap
  | StylePropertyMapReadOnly;
export type BinaryLikeItemsList = FileList | DataTransferItemList;
export type ArrayLike =
  | NonIterableArrayLike
  | HtmlCollectionLike
  | HtmlContentList
  | StyleContentList
  | BinaryLikeItemsList;
export type UploadUpdate =
  | ProgressUploadUpdate
  | SuccessUploadUpdate
  | ErrorUploadUpdate
  | CanceledUploadUpdate;
export type WorkerIn = WorkerInConfigure | WorkerInChunk | WorkerInEnd;
export type ProgressCounter =
  | `${number}`
  | `${number}${number}`
  | `${number}.${number}`
  | `${number}${number}.${number}`
  | `${number}${number}.${number}${number}`
  | "100";
