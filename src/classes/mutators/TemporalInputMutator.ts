import { TemporalKind } from "../../lib/declarations/types/utils";
import { TemporalConstraintSnapshot } from "../../lib/declarations/interfaces/utils";
import { TemporalValueCodec } from "../codecs/TemporalValueCodec";
import { DateValidator } from "../validators/DateValidator";

export class TemporalInputMutator {
  public static setClamped(
    input: HTMLInputElement,
    kind: TemporalKind,
    value: string,
    c: TemporalConstraintSnapshot
  ): void {
    const clamped = DateValidator.clampValue(kind, value, c);
    input.value = clamped;
  }

  public static addMinutes(
    input: HTMLInputElement,
    minutes: number,
    c: TemporalConstraintSnapshot
  ): void {
    const kind = input.type as TemporalKind; // you control allowed types
    const d = TemporalValueCodec.parse(kind, input.value);
    if (!d) return;

    d.setMinutes(d.getMinutes() + minutes);
    const next = TemporalValueCodec.format(kind, d);
    this.setClamped(input, kind, next, c);
  }

  public static addDays(
    input: HTMLInputElement,
    days: number,
    c: TemporalConstraintSnapshot
  ): void {
    const kind = input.type as TemporalKind;
    const d = TemporalValueCodec.parse(kind, input.value);
    if (!d) return;

    d.setDate(d.getDate() + days);
    const next = TemporalValueCodec.format(kind, d);
    this.setClamped(input, kind, next, c);
  }
}
