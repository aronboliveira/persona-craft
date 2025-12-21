import { TemporalCandidate } from "../../lib/declarations/interfaces/utils";
import { TemporalCandidateBuilder } from "../builders/TemporalCandidateBuilder";

export class TemporalParser {
  *parse(text: string): Generator<TemporalCandidate, void, void> {
    for (const token of this.#tokens(text)) {
      const c = this.#asCandidate(token);
      if (c) yield c;
    }
  }

  *#tokens(text: string): Generator<string, void, void> {
    const rough = text
      .split(/[\s,;(){}[\]"']+/g)
      .map(s => s.trim())
      .filter(Boolean);
    for (const t of rough) yield t;
  }

  #asCandidate(raw: string): TemporalCandidate | null {
    const b = new TemporalCandidateBuilder().raw(raw);
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(raw))
      return b.kind("datetime-local").normalized(raw).build();
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw))
      return b.kind("date").normalized(raw).build();
    if (/^\d{2}:\d{2}$/.test(raw))
      return b.kind("time").normalized(raw).build();
    if (/^\d{4}-W\d{2}$/.test(raw))
      return b.kind("week").normalized(raw).build();
    if (/^\d{4}-\d{2}$/.test(raw))
      return b.kind("month").normalized(raw).build();
    return null;
  }
}
