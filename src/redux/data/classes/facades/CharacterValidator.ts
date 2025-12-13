import { Draft } from "@reduxjs/toolkit";
import {
  Eye,
  EyeBag,
  EyeBall,
  Eyebrow,
  EyeLash,
  EyeLid,
  EyeShape,
  Forehead,
  Hair,
  Head,
} from "../../../../lib/declarations/interfaces/anatomy";
import {
  defaultEye,
  defaultEyeBag,
  defaultEyeBall,
  defaultEyeLash,
  defaultEyeLid,
  defaultForehead,
  defaultHair,
} from "../../defaults";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
export class CharacterValidator {
  public static isHead(obj: any): obj is Head {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "forehead" in obj &&
      "eye" in obj
    );
  }
  public static ensureHead<T extends StateWithCharacter>(
    state: T
  ): Draft<Head> {
    const character = state.character;
    if (!CharacterValidator.isHead(character.head))
      character.head = {
        forehead: defaultForehead as Forehead,
        eye: defaultEye as Eye,
      } satisfies Head;
    if (!character.head.forehead)
      character.head.forehead = defaultForehead as Forehead;
    if (!character.head.eye) character.head.eye = defaultEye as Eye;
    return character.head;
  }
  public static isHair(obj: any): obj is Hair {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "texture" in obj &&
      "length" in obj &&
      "tidiness" in obj &&
      "bang" in obj
    );
  }
  public static ensureHair<T extends StateWithCharacter>(
    state: T
  ): Draft<Hair> {
    if (!CharacterValidator.isHair(state.character.hair))
      state.character.hair = defaultHair as Hair;
    return state.character.hair;
  }
  public static isForeahead(obj: any): obj is Forehead {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "hairline" in obj &&
      "height" in obj
    );
  }
  public static ensureForehead<T extends StateWithCharacter>(
    state: T
  ): Draft<Forehead> {
    const head = this.ensureHead(state);
    if (!CharacterValidator.isForeahead(head.forehead))
      head.forehead = defaultForehead as Forehead;
    return head.forehead;
  }
  public static isEye(obj: any): obj is Eye {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "ball" in obj &&
      "shape" in obj &&
      "bag" in obj
    );
  }
  public static ensureEye<T extends StateWithCharacter>(state: T): Draft<Eye> {
    const head = this.ensureHead(state);
    if (!CharacterValidator.isEye(head.eye)) head.eye = defaultEye as Eye;
    return head.eye as Draft<Eye>;
  }
  public static isBrow(obj: any): obj is Eyebrow {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "arch" in obj &&
      "density" in obj &&
      "growthDirection" in obj
    );
  }
  public static ensureBrow<T extends StateWithCharacter>(
    state: T
  ): Draft<Eyebrow> {
    const eye = this.ensureEye(state);
    if (!CharacterValidator.isBrow(eye.brow))
      eye.brow = defaultEye.brow as Eyebrow;
    return eye.brow as Draft<Eyebrow>;
  }
  public static isEyeBall(obj: any): obj is EyeBall {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "size" in obj &&
      "iris" in obj &&
      "pupil" in obj
    );
  }
  public static ensureEyeBall<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeBall> {
    const eye = this.ensureEye(state);
    if (!CharacterValidator.isEyeBall(eye.ball))
      eye.ball = defaultEyeBall as EyeBall;
    return eye.ball as Draft<EyeBall>;
  }
  public static isEyeShape(obj: any): obj is EyeShape {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "fissure" in obj &&
      "tilt" in obj &&
      "depth" in obj &&
      "spacing" in obj &&
      "lid" in obj
    );
  }
  public static ensureEyeShape<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeShape> {
    const eye = this.ensureEye(state);
    if (!CharacterValidator.isEyeShape(eye.shape))
      eye.shape = defaultEye.shape as EyeShape;
    return eye.shape as Draft<EyeShape>;
  }
  public static isEyeLid(obj: any): obj is EyeLid {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "creaseNumber" in obj &&
      "creaseHeight" in obj
    );
  }
  public static ensureEyeLid<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeLid> {
    const shape = this.ensureEyeShape(state);
    if (!CharacterValidator.isEyeLid(shape.lid))
      shape.lid = (defaultEye.shape?.lid ?? defaultEyeLid) as EyeLid;
    return shape.lid as Draft<EyeLid>;
  }
  public static isEyeBag(obj: any): obj is EyeBag {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "countor" in obj &&
      "color" in obj
    );
  }
  public static ensureEyeBag<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeBag> {
    const eye = this.ensureEye(state);
    if (!CharacterValidator.isEyeBag(eye.bag))
      eye.bag = (defaultEye.bag ?? defaultEyeBag) as EyeBag;
    return eye.bag as Draft<EyeBag>;
  }
  public static isEyeLash(obj: any): obj is EyeLash {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "density" in obj &&
      "length" in obj &&
      "curl" in obj
    );
  }
  public static ensureEyeLash<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeLash> {
    const eye = this.ensureEye(state);
    if (!CharacterValidator.isEyeLash(eye.lashes))
      eye.lashes = defaultEyeLash as EyeLash;
    return eye.lashes as Draft<EyeLash>;
  }
}
