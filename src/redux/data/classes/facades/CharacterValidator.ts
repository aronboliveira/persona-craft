import { Draft } from "@reduxjs/toolkit";
import {
  Eye,
  EyeBall,
  Eyebrow,
  EyeShape,
  Forehead,
  Hair,
  Head,
} from "../../../../lib/declarations/interfaces/anatomy";
import {
  defaultEye,
  defaultEyeBall,
  defaultForehead,
  defaultHair,
} from "../../defaults";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
export class CharacterValidator {
  public static ensureHead<T extends StateWithCharacter>(
    state: T
  ): Draft<Head> {
    const character = state.character;
    if (!character.head)
      character.head = {
        forehead: defaultForehead as Forehead,
        eye: defaultEye as Eye,
      } satisfies Head;
    if (!character.head.forehead)
      character.head.forehead = defaultForehead as Forehead;
    if (!character.head.eye) character.head.eye = defaultEye as Eye;
    return character.head;
  }
  public static ensureHair<T extends StateWithCharacter>(
    state: T
  ): Draft<Hair> {
    if (!state.character.hair) state.character.hair = defaultHair as Hair;
    return state.character.hair;
  }
  public static ensureForehead<T extends StateWithCharacter>(
    state: T
  ): Draft<Forehead> {
    const head = this.ensureHead(state);
    if (!head.forehead) head.forehead = defaultForehead as Forehead;
    return head.forehead;
  }
  public static ensureEye<T extends StateWithCharacter>(state: T): Draft<Eye> {
    const head = this.ensureHead(state);
    if (!head.eye) head.eye = defaultEye as Eye;
    return head.eye as Draft<Eye>;
  }
  public static ensureBrow<T extends StateWithCharacter>(
    state: T
  ): Draft<Eyebrow> {
    const eye = this.ensureEye(state);
    if (!eye.brow) eye.brow = defaultEye.brow as Eyebrow;
    return eye.brow as Draft<Eyebrow>;
  }
  public static ensureEyeBall<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeBall> {
    const eye = this.ensureEye(state);
    if (!eye.ball) eye.ball = defaultEyeBall as EyeBall;
    return eye.ball as Draft<EyeBall>;
  }
  public static ensureEyeShape<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeShape> {
    const eye = this.ensureEye(state);
    if (!eye.shape) eye.shape = defaultEye.shape as EyeShape;
    return eye.shape as Draft<EyeShape>;
  }
}
