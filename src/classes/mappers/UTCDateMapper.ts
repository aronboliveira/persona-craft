import { DateMapper } from "../../lib/declarations/interfaces/utils";
import { DateValidator } from "../validators/DateValidator";

export class UTCDateMapper implements DateMapper {
  getLastDay(d: Date): Date {
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const last = this.#daysInMonth(y, m);
    return new Date(Date.UTC(y, m, last));
  }

  getFirstDay(d: Date): Date {
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    return new Date(Date.UTC(y, m, 1));
  }

  getLimitDays(d: Date): { first: Date; last: Date } {
    return { first: this.getFirstDay(d), last: this.getLastDay(d) };
  }

  getDaysLeft(a: Date, b: Date): number {
    const A = this.#toMidnight(a);
    const B = this.#toMidnight(b);
    const diff = Math.floor((B.getTime() - A.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  }

  getBusinessDaysLeft(a: Date, b: Date): number {
    const total = this.getDaysLeft(a, b);
    if (total === 0) return 0;
    const cursor = this.#toMidnight(a);
    let count = 0;
    for (let i = 0; i < total; i++) {
      cursor.setUTCDate(cursor.getUTCDate() + 1);
      if (this.isBusinessDay(cursor)) count++;
    }
    return count;
  }

  isBusinessDay(d: Date): boolean {
    const wd = this.getWeekdayByDate(d);
    return wd >= 1 && wd <= 5;
  }

  getMonthByNumber(d: Date): number {
    const dayOfYear = this.#getDayOfYear(d);
    const year = d.getUTCFullYear();
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
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    return `${y}-${this.#pad2(m)}`;
  }

  getWeekdayByDate(d: Date): number {
    return d.getUTCDay();
  }

  getISOWeekday(d: Date): number {
    const day = d.getUTCDay();
    return day === 0 ? 7 : day;
  }

  getISOWeekYear(date: Date): number {
    const d = this.#toMidnight(date);
    const isoWeekday = this.getISOWeekday(d);
    d.setUTCDate(d.getUTCDate() + (4 - isoWeekday));
    return d.getUTCFullYear();
  }

  getISOWeekNumber(date: Date): number {
    const d = this.#toMidnight(date);
    const isoWeekday = this.getISOWeekday(d);
    d.setUTCDate(d.getUTCDate() + (4 - isoWeekday));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const diffDays = Math.floor((d.getTime() - yearStart.getTime()) / 86400000);
    return Math.floor(diffDays / 7) + 1;
  }

  getISOWeeksForYear(year: number): number {
    const jan1 = new Date(Date.UTC(year, 0, 1));
    const wd = this.getISOWeekday(jan1);
    if (wd === 4) return 53;
    if (wd === 3 && DateValidator.isLeapYear(year)) return 53;
    return 52;
  }

  getWeekByNumber(d: Date): number {
    const dayOfYear = this.#getDayOfYear(d);
    const year = d.getUTCFullYear();
    const max = DateValidator.isLeapYear(year) ? 366 : 365;
    const day = this.#clampInt(dayOfYear, 1, max);
    const dt = new Date(Date.UTC(year, 0, day));
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
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }

  #daysInMonth(year: number, month: number): number {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  #toMidnight(d: Date): Date {
    return new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
    );
  }

  #getDayOfYear(d: Date): number {
    const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 0));
    const diff = d.getTime() - start.getTime();
    return Math.floor(diff / 86400000);
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
