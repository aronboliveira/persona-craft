import {
  TemporalAnnotation,
  TemporalCandidate,
} from "../../lib/declarations/interfaces/utils";

export class TemporalAnnotator {
  describe(candidate: TemporalCandidate): TemporalAnnotation {
    const d = this.#toDate(candidate);

    const year = d.getFullYear();
    const weekdayIndex = d.getDay();
    const hour = d.getHours();
    const minute = d.getMinutes();

    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const isBusinessDay = weekdayIndex >= 1 && weekdayIndex <= 5;
    const isBusinessHour = hour >= 9 && hour < 18;

    return Object.freeze({
      raw: candidate.raw,
      year,
      weekdayIndex,
      hour,
      minute,
      isLeap,
      isBusinessDay,
      isBusinessHour,
    });
  }

  #toDate(c: TemporalCandidate): Date {
    if (c.kind === "time") return new Date(`1970-01-01T${c.normalized}:00`);
    if (c.kind === "month") return new Date(`${c.normalized}-01T00:00`);
    if (c.kind === "week") {
      const y = Number(c.normalized.slice(0, 4));
      return new Date(`${y}-01-01T00:00`);
    }
    return new Date(c.kind === "date" ? `${c.normalized}T00:00` : c.normalized);
  }
}
