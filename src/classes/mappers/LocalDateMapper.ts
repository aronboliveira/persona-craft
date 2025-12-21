import { DateMapper } from "../../lib/declarations/interfaces/utils";
import { DateValidator } from "../validators/DateValidator";

export class LocalDateMapper implements DateMapper {
  getLastDay(d: Date): Date {
    const y = d.getFullYear();
    const m = d.getMonth();
    const last = this.#daysInMonth(y, m);
    return new Date(y, m, last);
  }

  getFirstDay(d: Date): Date {
    const y = d.getFullYear();
    const m = d.getMonth();
    return new Date(y, m, 1);
  }

  getLimitDays(d: Date): { first: Date; last: Date } {
    return { first: this.getFirstDay(d), last: this.getLastDay(d) };
  }

  getDaysLeft(a: Date, b: Date): number {
    const A = this.#toMidnight(a);
    const B = this.#toMidnight(b);
    const diff = Math.floor(
      (B.getTime() - A.getTime()) / DateValidator.DAY_IN_MILISEC
    );
    return diff > 0 ? diff : 0;
  }

  getBusinessDaysLeft(a: Date, b: Date): number {
    const total = this.getDaysLeft(a, b);
    if (total === 0) return 0;
    const cursor = this.#toMidnight(a);
    let count = 0;
    for (let i = 0; i < total; i++) {
      cursor.setDate(cursor.getDate() + 1);
      if (this.isBusinessDay(cursor)) count++;
    }
    return count;
  }

  getWeekdayByDate(d: Date): number {
    return d.getDay();
  }

  isBusinessDay(d: Date): boolean {
    const wd = this.getWeekdayByDate(d);
    return wd >= 1 && wd <= 5;
  }

  getMonthByNumber(d: Date): number {
    const dayOfYear = this.#getDayOfYear(d);
    const year = d.getFullYear();
    const max = DateValidator.isLeapYear(year) ? 366 : 365;
    let day = this.#clampInt(dayOfYear, 1, max);
    for (let m = 0; m < 12; m++) {
      const dim = this.#daysInMonth(year, m);
      if (day <= dim) return m + 1;
      day -= dim;
    }
    return 12;
  }

  setAsMonthInput(stamp: string): string | null {
    const parsed = DateValidator.classifyTemporal(stamp);
    if (!parsed) return null;
    if (parsed.kind !== "date" && parsed.kind !== "datetime-local") return null;
    const d = DateValidator.toDate(parsed.kind, parsed.normalized);
    if (Number.isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    return `${y}-${this.#pad2(m)}`;
  }

  getISOWeekday(d: Date): number {
    const day = d.getDay();
    return day === 0 ? 7 : day;
  }

  getISOWeekYear(date: Date): number {
    const d = this.#toMidnight(date);
    const isoWeekday = this.getISOWeekday(d);
    const d4 = this.#toThursday(d, isoWeekday);
    return d4.getFullYear();
  }

  getISOWeekNumber(date: Date): number {
    const d = this.#toMidnight(date);
    const isoWeekday = this.getISOWeekday(d);
    const d4 = this.#toThursday(d, isoWeekday);
    const yearStart = new Date(d4.getFullYear(), 0, 1);
    const diffDays = Math.floor(
      (d4.getTime() - yearStart.getTime()) / DateValidator.DAY_IN_MILISEC
    );
    return Math.floor(diffDays / 7) + 1;
  }

  getISOWeeksForYear(year: number): number {
    const jan1 = new Date(year, 0, 1);
    const wd = this.getISOWeekday(jan1);
    if (wd === 4) return 53;
    if (wd === 3 && DateValidator.isLeapYear(year)) return 53;
    return 52;
  }

  getWeekByNumber(d: Date): number {
    const dayOfYear = this.#getDayOfYear(d);
    const year = d.getFullYear();
    const max = DateValidator.isLeapYear(year) ? 366 : 365;
    const day = this.#clampInt(dayOfYear, 1, max);
    const dt = new Date(year, 0, day);
    return this.getISOWeekNumber(dt);
  }

  setAsWeekInput(stamp: string): string | null {
    const parsed = DateValidator.classifyTemporal(stamp);
    if (!parsed) return null;
    if (parsed.kind !== "date" && parsed.kind !== "datetime-local") return null;
    const d = DateValidator.toDate(parsed.kind, parsed.normalized);
    if (Number.isNaN(d.getTime())) return null;
    const year = this.getISOWeekYear(d);
    const week = this.getISOWeekNumber(d);
    return `${year}-W${this.#pad2(week)}`;
  }

  static setAsMonthInput(value: string): string | null {
    const d = new Date(value);
    if (!Number.isFinite(d.getTime())) return null;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }

  getWeeksInMonth(year: number, month: number, startOfWeek: number): number {
    return Math.ceil(
      (this.firstWeekdayOfMonth(year, month, startOfWeek) +
        this.#daysInMonth(year, month)) /
        7
    );
  }

  firstWeekdayOfMonth(
    year: number,
    month: number,
    startOfWeek: number
  ): number {
    return (new Date(year, month, 1).getDay() - startOfWeek + 7) % 7;
  }

  #daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  #toMidnight(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /** Move to the ISO week reference, which is Thursday */
  #toThursday(d: Date, wd: number): Date {
    return new Date(d.setDate(d.getDate() + (4 - wd)));
  }

  #getDayOfYear(d: Date): number {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime();
    return Math.floor(diff / DateValidator.DAY_IN_MILISEC);
  }

  #pad2(n: number): string {
    return String(n).padStart(2, "0");
  }

  #clampInt(n: unknown, min: number, max: number): number {
    const x = typeof n === "number" ? n : Number(n);
    if (!Number.isFinite(x)) throw new TypeError("Expected a finite number");
    const i = Number.isInteger(x) ? x : Math.round(x);
    if (i < min) return min;
    if (i > max) return max;
    return i;
  }
}
