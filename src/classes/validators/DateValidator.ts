import {
  TemporalConstraintSnapshot,
  ValidationIssue,
} from "../../lib/declarations/interfaces/utils";
import { TemporalKind } from "../../lib/declarations/types/utils";
import { TemporalValueCodec } from "../codecs/TemporalValueCodec";

export class DateValidator {
  static DAY_IN_MILISEC = 24 * 60 * 60 * 1000;
  public static RX = Object.freeze({
    "datetime-local": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    time: /^\d{2}:\d{2}$/,
    week: /^\d{4}-W\d{2}$/,
    month: /^\d{4}-\d{2}$/,
  } as const) satisfies Record<TemporalKind, RegExp>;
  public static toDate(kind: TemporalKind, v: string): Date {
    if (kind === "time") return new Date(`1970-01-01T${v}:00`);
    if (kind === "month") return new Date(`${v}-01T00:00`);
    if (kind === "week") return new Date(`${v.slice(0, 4)}-01-01T00:00`);
    if (kind === "date") return new Date(`${v}T00:00`);
    return new Date(v);
  }
  public static isTemporalKind(kind: string): kind is TemporalKind {
    return (
      kind === "datetime-local" ||
      kind === "date" ||
      kind === "time" ||
      kind === "week" ||
      kind === "month"
    );
  }
  public static classifyTemporal(
    raw: string
  ): { kind: TemporalKind; normalized: string } | null {
    for (const k of Object.keys(DateValidator.RX))
      if (DateValidator.RX[k as TemporalKind].test(raw))
        return { kind: k as TemporalKind, normalized: raw };
    return null;
  }
  public static validateTemporal(
    raw: string,
    kind: TemporalKind,
    normalized: string,
    c: TemporalConstraintSnapshot
  ): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    if (c.min && normalized < c.min)
      issues.push(
        DateValidator.#issue(
          raw,
          kind,
          normalized,
          `Below min (${c.min})`,
          "error"
        )
      );
    if (c.max && normalized > c.max)
      issues.push(
        DateValidator.#issue(
          raw,
          kind,
          normalized,
          `Above max (${c.max})`,
          "error"
        )
      );

    const d = DateValidator.toDate(kind, normalized);
    if (Number.isNaN(d.getTime()))
      return [
        ...issues,
        DateValidator.#issue(
          raw,
          kind,
          normalized,
          "Invalid Date parsing",
          "error"
        ),
      ];

    if (c.businessDaysOnly) {
      const wd = d.getDay();
      if (!(wd >= 1 && wd <= 5))
        issues.push(
          DateValidator.#issue(
            raw,
            kind,
            normalized,
            "Not a business day (Mon–Fri)",
            "warn"
          )
        );
    }

    if (kind === "datetime-local" || kind === "time") {
      const hr = d.getHours();
      const start = c.businessHourStart ?? 0;
      const end = c.businessHourEnd ?? 24;
      if (!(hr >= start && hr < end))
        issues.push(
          DateValidator.#issue(
            raw,
            kind,
            normalized,
            `Outside business hours (${start}–${end})`,
            "warn"
          )
        );
    }

    return issues;
  }
  public static clampValue(
    kind: TemporalKind,
    value: string,
    c: TemporalConstraintSnapshot
  ): string {
    if (!value) return value;
    let out = value;
    const d = TemporalValueCodec.parse(kind, value);
    if (!d) return value;
    out = TemporalValueCodec.format(kind, d);
    const isComparable = (a: string, b: string) => a.length === b.length;
    if (c.min && isComparable(out, c.min) && out < c.min) out = c.min;
    if (c.max && isComparable(out, c.max) && out > c.max) out = c.max;
    return out;
  }
  public static isLeapYear(year: number): boolean {
    if (!Number.isFinite(year)) return false;
    const y = Math.trunc(year);
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }
  static #issue(
    raw: string,
    kind: TemporalKind,
    normalized: string,
    reason: string,
    severity: "info" | "warn" | "error"
  ): Readonly<ValidationIssue> {
    return Object.freeze({ raw, kind, normalized, reason, severity });
  }
}
