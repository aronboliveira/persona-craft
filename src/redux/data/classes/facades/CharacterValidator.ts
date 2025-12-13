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
  Lip,
  LipTubercule,
  Mouth,
} from "../../../../lib/declarations/interfaces/anatomy";
import {
  defaultCharacter,
  defaultEye,
  defaultEyeBag,
  defaultEyeBall,
  defaultEyeLash,
  defaultEyeLid,
  defaultForehead,
  defaultHair,
  defaultHead,
  defaultMouth,
} from "../../defaults";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
import ObjectHelper from "../../../../lib/utils/ObjectHelper";
import { Character } from "../../../../lib/declarations/interfaces/utils";

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
      character.head = ObjectHelper.deepCopyObj(defaultHead) as Draft<Head>;
    if (!character.head.forehead)
      character.head.forehead = ObjectHelper.deepCopyObj(
        defaultForehead
      ) as Draft<Forehead>;
    if (!character.head.eye)
      character.head.eye = ObjectHelper.deepCopyObj(defaultEye) as Draft<Eye>;
    if (!character.head.mouth)
      character.head.mouth = ObjectHelper.deepCopyObj(
        defaultMouth
      ) as Draft<Mouth>;
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
      state.character.hair = ObjectHelper.deepCopyObj(
        defaultHair
      ) as Draft<Hair>;
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
    const head = CharacterValidator.ensureHead(state);
    if (!CharacterValidator.isForeahead(head.forehead))
      head.forehead = ObjectHelper.deepCopyObj(
        defaultForehead
      ) as Draft<Forehead>;
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
    const head = CharacterValidator.ensureHead(state);
    if (!CharacterValidator.isEye(head.eye))
      head.eye = ObjectHelper.deepCopyObj(defaultEye) as Draft<Eye>;
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
    const eye = CharacterValidator.ensureEye(state);
    if (!CharacterValidator.isBrow(eye.brow))
      eye.brow = ObjectHelper.deepCopyObj(defaultEye).brow as Draft<Eyebrow>;
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
    const eye = CharacterValidator.ensureEye(state);
    if (!CharacterValidator.isEyeBall(eye.ball))
      eye.ball = ObjectHelper.deepCopyObj(defaultEyeBall) as Draft<EyeBall>;
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
    const eye = CharacterValidator.ensureEye(state);
    if (!CharacterValidator.isEyeShape(eye.shape))
      eye.shape = ObjectHelper.deepCopyObj(defaultEye).shape as Draft<EyeShape>;
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
    const shape = CharacterValidator.ensureEyeShape(state);
    if (!CharacterValidator.isEyeLid(shape.lid))
      shape.lid = ObjectHelper.deepCopyObj(
        defaultEye.shape?.lid ?? defaultEyeLid
      ) as Draft<EyeLid>;
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
    const eye = CharacterValidator.ensureEye(state);
    if (!CharacterValidator.isEyeBag(eye.bag))
      eye.bag = ObjectHelper.deepCopyObj(
        defaultEye.bag ?? defaultEyeBag
      ) as Draft<EyeBag>;
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
    const eye = CharacterValidator.ensureEye(state);
    if (!CharacterValidator.isEyeLash(eye.lashes))
      eye.lashes = ObjectHelper.deepCopyObj(defaultEyeLash) as Draft<EyeLash>;
    return eye.lashes as Draft<EyeLash>;
  }

  public static isMouth(obj: any): obj is Mouth {
    return typeof obj === "object" && obj !== null && "lip" in obj;
  }

  public static ensureMouth<T extends StateWithCharacter>(
    state: T
  ): Draft<Mouth> {
    const head = CharacterValidator.ensureHead(state);
    if (!CharacterValidator.isMouth(head.mouth))
      head.mouth = ObjectHelper.deepCopyObj(defaultMouth) as Draft<Mouth>;
    return head.mouth;
  }

  public static isLip(obj: any): obj is Lip {
    return typeof obj === "object" && obj !== null && "tubercule" in obj;
  }

  public static ensureLip<T extends StateWithCharacter>(state: T): Draft<Lip> {
    const mouth = CharacterValidator.ensureMouth(state);
    if (!CharacterValidator.isLip(mouth.lip))
      mouth.lip = ObjectHelper.deepCopyObj(defaultMouth.lip) as Draft<Lip>;
    return mouth.lip;
  }

  public static isLipTubercule(obj: any): obj is LipTubercule {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "prominence" in obj &&
      "shape" in obj
    );
  }

  public static ensureLipTubercule<T extends StateWithCharacter>(
    state: T
  ): Draft<LipTubercule> {
    const lip = CharacterValidator.ensureLip(state);
    if (!CharacterValidator.isLipTubercule(lip.tubercule))
      lip.tubercule = ObjectHelper.deepCopyObj(
        defaultMouth.lip.tubercule
      ) as Draft<LipTubercule>;
    return lip.tubercule;
  }

  public static isCharacter(obj: any): obj is Character {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "gender" in obj &&
      "height" in obj &&
      "weight" in obj &&
      "age" in obj &&
      "muscle" in obj &&
      "hair" in obj &&
      "head" in obj
    );
  }

  public static createDefaultCharacter(): Draft<Character> {
    return ObjectHelper.deepCopyObj(defaultCharacter) as Draft<Character>;
  }

  public static ensureFullCharacter<T extends StateWithCharacter>(
    state: T
  ): Draft<Character> {
    CharacterValidator.ensureHead(state);
    CharacterValidator.ensureHair(state);
    CharacterValidator.ensureEye(state);
    CharacterValidator.ensureForehead(state);
    CharacterValidator.ensureBrow(state);
    CharacterValidator.ensureEyeBall(state);
    CharacterValidator.ensureEyeShape(state);
    CharacterValidator.ensureEyeLid(state);
    CharacterValidator.ensureEyeBag(state);
    CharacterValidator.ensureEyeLash(state);
    return state.character;
  }
}
