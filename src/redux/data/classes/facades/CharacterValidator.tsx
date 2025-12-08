import { Draft } from "@reduxjs/toolkit";
import {
  Eye,
  Eyebrow,
  Forehead,
  Head,
} from "../../../../lib/declarations/interfaces/anatomy";
import { defaultEye, defaultForehead } from "../../defaults";
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
}
