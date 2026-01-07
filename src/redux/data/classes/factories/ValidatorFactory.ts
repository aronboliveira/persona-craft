import { Draft } from "@reduxjs/toolkit";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
import { AnatomyValidator } from "../../../../lib/declarations/interfaces/utils";
import ObjectHelper from "../../../../lib/utils/ObjectHelper";
import { CharacterValidator } from "../facades/CharacterValidator";

export class ValidatorFactory {
  public static createValidator<T>(
    requiredFields: {
      [K in keyof T]: {} extends Pick<T, K> ? never : K;
    }[keyof T][],
    defaultValue: T
  ): AnatomyValidator {
    return {
      is(obj: any): obj is T {
        return (
          typeof obj === "object" &&
          obj !== null &&
          requiredFields.every(field => field in obj)
        );
      },
      ensure<S extends StateWithCharacter>(s: S, path: string[]): Draft<T> {
        let current: any = s.character;
        for (let i = 0; i < path.length - 1; i++) {
          const segment = path[i];
          const ensureMethod = `ensure${segment
            .charAt(0)
            .toUpperCase()}${segment.slice(1)}`;
          if (typeof (CharacterValidator as any)[ensureMethod] === "function")
            (CharacterValidator as any)[ensureMethod](s);
          else if (!current?.[segment]) current[segment] = {};
          current = current[segment];
        }
        const lastKey = path[path.length - 1];
        if (!this.is(current?.[lastKey]))
          current[lastKey] = ObjectHelper.deepCopyObj(defaultValue as Draft<T>);
        return current[lastKey] as Draft<T>;
      },
    };
  }
}
