import { TemporalKind } from "../../lib/declarations/types/utils";
export class TemporalValueCodec {
  public static parse(kind: TemporalKind, value: string): Date | null {
    if (!value) return null;

    switch (kind) {
      case "date":
        return new Date(`${value}T00:00`);
      case "datetime-local":
        return new Date(value);
      case "time":
        return new Date(`1970-01-01T${value}:00`);
      case "month":
        return new Date(`${value}-01T00:00`);
      case "week":
        return new Date(`${value.slice(0, 4)}-01-01T00:00`); // learning anchor
    }
  }

  public static format(kind: TemporalKind, d: Date): string {
    const pad2 = (n: number) => String(n).padStart(2, "0");

    const y = d.getFullYear();
    const m = pad2(d.getMonth() + 1);
    const day = pad2(d.getDate());
    const hh = pad2(d.getHours());
    const mm = pad2(d.getMinutes());

    switch (kind) {
      case "date":
        return `${y}-${m}-${day}`;
      case "datetime-local":
        return `${y}-${m}-${day}T${hh}:${mm}`;
      case "time":
        return `${hh}:${mm}`;
      case "month":
        return `${y}-${m}`;
      case "week":
        return `${y}-W01`;
    }
  }
}
