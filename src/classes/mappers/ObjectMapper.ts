import { DeepReadonly } from "../../lib/declarations/types/utils";
export class ObjectMapper {
  public static deepFreeze<T>(obj: T): DeepReadonly<T> {
    const seen = new WeakSet<object>(),
      freezeRec = (o: any): any => {
        if (!o || typeof o !== "object") return o;
        if (seen.has(o)) return o;
        seen.add(o);
        if (Array.isArray(o)) {
          for (const i of o) freezeRec(i);
          return Object.freeze(o);
        }
        if (o instanceof Map) {
          for (const [k, v] of o.entries()) {
            freezeRec(k);
            freezeRec(v);
          }
          return Object.freeze(o);
        }
        if (o instanceof Set) {
          for (const v of o.values()) freezeRec(v);
          return Object.freeze(o);
        }
        for (const k of Object.getOwnPropertyNames(o)) freezeRec(o[k]);
        return Object.freeze(o);
      };
    return freezeRec(obj);
  }
}
