import { Draft } from "@reduxjs/toolkit";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
import { AnatomyValidator } from "../../../../lib/declarations/interfaces/utils";
import ObjectHelper from "../../../../lib/utils/ObjectHelper";
import { CharacterValidator } from "../facades/CharacterValidator";

export class ValidatorFactory {
  public static createValidator<T>(
    requiredFields: {
      [K in keyof T]: object extends Pick<T, K> ? never : K;
    }[keyof T][],
    defaultValue: T,
  ): AnatomyValidator {
    return {
      is(obj: unknown): obj is T {
        return (
          typeof obj === "object" &&
          obj !== null &&
          requiredFields.every(field => field in obj)
        );
      },
      ensure<S extends StateWithCharacter>(s: S, path: string[]): Draft<T> {
        let current = s.character as unknown as Record<string, unknown>;
        for (let i = 0; i < path.length - 1; i++) {
          const segment = path[i];
          const ensureMethod = `ensure${segment
            .charAt(0)
            .toUpperCase()}${segment.slice(1)}`;
          const validator = CharacterValidator as unknown as Record<
            string,
            unknown
          >;
          if (typeof validator[ensureMethod] === "function")
            (validator[ensureMethod] as (s: S) => void)(s);
          else if (!current?.[segment]) current[segment] = {};
          current = current[segment] as Record<string, unknown>;
        }
        const lastKey = path[path.length - 1];
        if (!this.is(current?.[lastKey]))
          current[lastKey] = ObjectHelper.deepCopyObj(defaultValue as Draft<T>);
        return current[lastKey] as Draft<T>;
      },
    };
  }
}
