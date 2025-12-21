import { TemporalCandidate } from "../../lib/declarations/interfaces/utils";
import { TemporalKind } from "../../lib/declarations/types/utils";

export class TemporalCandidateBuilder {
  #raw = "";
  #kind: TemporalKind = "date";
  #normalized = "";

  raw(v: string) {
    this.#raw = v;
    return this;
  }
  kind(v: TemporalKind) {
    this.#kind = v;
    return this;
  }
  normalized(v: string) {
    this.#normalized = v;
    return this;
  }

  build(): TemporalCandidate {
    return Object.freeze({
      raw: this.#raw,
      kind: this.#kind,
      normalized: this.#normalized,
    });
  }
}
