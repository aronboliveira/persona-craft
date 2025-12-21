import { TemporalKind } from "../../lib/declarations/types/utils";
import { TemporalConstraintSnapshot } from "../../lib/declarations/interfaces/utils";

export class InputConstrainer {
  public setFileAccept(input: HTMLInputElement, accept: string): void {
    input.setAttribute("accept", accept);
  }

  public setTemporalConstraints(
    input: HTMLInputElement,
    kind: TemporalKind,
    c: TemporalConstraintSnapshot
  ): void {
    input.type = kind;
    if (c.min) input.min = c.min;
    if (c.max) input.max = c.max;
  }

  public setMinDateToTodayUTC(input: HTMLInputElement): void {
    const d = new Date();
    const iso = new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
    )
      .toISOString()
      .slice(0, 10);
    input.min = iso;
  }

  public setMinDateToTodayLocal(input: HTMLInputElement): void {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    input.min = `${y}-${m}-${day}`;
  }
}
