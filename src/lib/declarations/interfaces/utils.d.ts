import { Age, BodyFat, BodyMuscleTypes } from "../types/anatomy";
import { Gender } from "../types/helpers";
import { Hair, Head, Skin, BodyModifications } from "./anatomy";
import {
  ProgressCounter,
  StateWithCharacter,
  TemporalKind,
  UploadStatus,
} from "../types/utils";
export interface Character {
  gender: Gender;
  height: BodyHeight;
  weight: BodyFat;
  age: Age;
  muscle: BodyMuscleTypes;
  hair: Hair;
  head: Head;
  skin?: Skin;
  bodyModifications?: BodyModifications;
}
export interface Environment {
  type: "indoor" | "outdoor";
  lighting: "bright" | "dim" | "dark";
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
}
export interface LangDict {
  [key: string]: string;
}
export interface OptDict {
  friendlyName: string;
  src: string;
}
export interface EnableableTip {
  enabled?: boolean;
  tipLocalKeys?: Record<string, string>;
  tipSessionKeys?: Record<string, string>;
}
/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface DropPayload extends Readonly<{}> {
  files: readonly File[];
  text: string | null;
  types: readonly string[];
}
export interface UploadTask extends Readonly<{}> {
  id: string;
  file: File;
  endpoint: string;
  status: UploadStatus;
  progress: ProgressCounter;
  error?: string | Error;
}
export interface FileConstraints extends Readonly<{}> {
  allowedTypes: readonly string[];
  maxSizeBytes: number;
  sanitizeName: boolean;
}
export interface CameraCapturateState extends Readonly<{}> {
  file: File | null;
  previewUrl: string | null;
}
export interface ProgressUploadUpdate extends Readonly<{}> {
  type: "progress";
  id: string;
  progress: ProgressCounter;
  ev: ProgressEvent<XMLHttpRequestEventTarget>;
}
export interface SuccessUploadUpdate extends Readonly<{}> {
  type: "success";
  id: string;
  status: number;
  responseText: string;
}
export interface ErrorUploadUpdate extends Readonly<{}> {
  type: "error";
  id: string;
  status?: number;
  message?: string;
}
export interface CanceledUploadUpdate extends Readonly<{}> {
  type: "canceled";
  id: string;
  message?: string;
}
export interface TemporalCandidate extends Readonly<{}> {
  raw: string;
  kind: TemporalKind;
  normalized: string;
}
export interface TemporalAnnotation extends Readonly<{}> {
  raw: string;
  year?: number;
  day?: number;
  month?: number;
  weekdayIndex?: number;
  hour?: number;
  minute?: number;
  second?: number;
  isLeap?: boolean;
  isBusinessDay?: boolean;
  isBusinessHour?: boolean;
}
/* eslint-enable @typescript-eslint/no-empty-object-type */
export interface Builder<T> {
  patch(p: Partial<T>): this;
  build(): T;
}
export interface DateMapper {
  getLastDay(d: Date): Date;
  getFirstDay(d: Date): Date;
  getLimitDays(d: Date): { first: Date; last: Date };
  getDaysLeft(a: Date, b: Date): number;
  getBusinessDaysLeft(a: Date, b: Date): number;
  isBusinessDay(d: Date): boolean;
  getMonthByNumber(d: Date): number;
  setAsMonthInput(stamp: string): string | null;
  getWeekdayByDate(d: Date): number;
  getISOWeekday(d: Date): number;
  getISOWeekYear(d: Date): number;
  getISOWeekNumber(d: Date): number;
  getISOWeeksForYear(year: number): number;
  getWeekByNumber(d: Date): number;
  setAsWeekInput(stamp: string): string | null;
  #daysInMonth(year: number, month: number): number;
  #toMidnight(d: Date): Date;
}
/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface TemporalConstraintSnapshot extends Readonly<{}> {
  min?: string;
  max?: string;
  businessDaysOnly?: boolean;
  businessHourStart?: number;
  businessHourEnd?: number;
}
export interface ValidationConfig extends Readonly<{}> {
  byKind: Readonly<Record<TemporalKind, TemporalConstraintSnapshot>>;
}
export interface ValidationIssue extends Readonly<{}> {
  raw: string;
  normalized: string;
  kind: TemporalKind;
  reason: string;
  severity: "log" | "info" | "warn" | "error";
}
export interface WorkerInConfigure extends Readonly<{}> {
  type: "configure";
  config: ValidationConfig;
}
export interface WorkerInChunk extends Readonly<{}> {
  type: "chunk";
  streamId: string;
  bytes: ArrayBuffer;
}
export interface WorkerInEnd extends Readonly<{}> {
  type: "end";
  streamId: string;
}
export interface WorkerOut extends Readonly<{}> {
  type: "issues";
  streamId: string;
  issues?: readonly ValidationIssue[];
  message?: string;
}
export interface QuizBlank extends Readonly<{}> {
  id: string;
  options: readonly string[];
  correct: string;
}
export interface QuizLine extends Readonly<{}> {
  ln: number;
  parts: readonly (string | { blankId: string })[];
}
export interface QuizSpec extends Readonly<{}> {
  title: string;
  description: string;
  blanks: readonly QuizBlank[];
  lines: readonly QuizLine[];
}
/* eslint-enable @typescript-eslint/no-empty-object-type */
export interface AnatomyValidator {
  is(obj: unknown): boolean;
  ensure<T extends StateWithCharacter>(state: T, path: string[]): Draft<T>;
}
