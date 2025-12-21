import { Draft } from "@reduxjs/toolkit";
import {
  CupidBow,
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
  UpperLip,
} from "../../../../lib/declarations/interfaces/anatomy";
import {
  defaultBrow,
  defaultCharacter,
  defaultEye,
  defaultEyeBag,
  defaultEyeBall,
  defaultEyeLash,
  defaultEyeLid,
  defaultForehead,
  defaultHair,
  defaultHead,
  defaultLip,
  defaultLipCupidBow,
  defaultLipTubercule,
  defaultMouth,
  defaultUpperLip,
} from "../../defaults";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
import ObjectHelper from "../../../../lib/utils/ObjectHelper";
import { Character } from "../../../../lib/declarations/interfaces/utils";
import { ValidatorFactory } from "../factories/ValidatorFactory";

export class CharacterValidator {
  static #headValidator = ValidatorFactory.createValidator<Head>(
    ["forehead", "eye", "mouth"],
    ObjectHelper.deepCopyObj(defaultHead)
  );

  static #hairValidator = ValidatorFactory.createValidator<Hair>(
    ["texture", "length", "tidiness", "bang"],
    ObjectHelper.deepCopyObj(defaultHair)
  );

  static #foreheadValidator = ValidatorFactory.createValidator<Forehead>(
    ["hairline", "height"],
    ObjectHelper.deepCopyObj(defaultForehead)
  );

  static #eyeValidator = ValidatorFactory.createValidator<Eye>(
    ["ball", "shape", "bag"],
    ObjectHelper.deepCopyObj(defaultEye)
  );

  static #browValidator = ValidatorFactory.createValidator<Eyebrow>(
    ["arch", "density", "growthDirection"],
    ObjectHelper.deepCopyObj(defaultBrow)
  );

  static #eyeBallValidator = ValidatorFactory.createValidator<EyeBall>(
    ["size", "iris", "pupil"],
    ObjectHelper.deepCopyObj(defaultEyeBall)
  );

  static #eyeShapeValidator = ValidatorFactory.createValidator<EyeShape>(
    ["fissure", "tilt", "depth", "spacing", "lid"],
    ObjectHelper.deepCopyObj(defaultEye.shape)
  );

  static #eyeLidValidator = ValidatorFactory.createValidator<EyeLid>(
    ["creaseNumber", "creaseHeight"],
    ObjectHelper.deepCopyObj(defaultEyeLid)
  );

  static #eyeBagValidator = ValidatorFactory.createValidator<EyeBag>(
    ["countor", "color"],
    ObjectHelper.deepCopyObj(defaultEyeBag)
  );

  static #eyeLashValidator = ValidatorFactory.createValidator<EyeLash>(
    ["density", "length", "curl"],
    ObjectHelper.deepCopyObj(defaultEyeLash)
  );

  static #mouthValidator = ValidatorFactory.createValidator<Mouth>(
    ["lip"],
    ObjectHelper.deepCopyObj(defaultMouth)
  );

  static #lipValidator = ValidatorFactory.createValidator<Lip>(
    ["upper", "lower"],
    ObjectHelper.deepCopyObj(defaultLip)
  );

  static #lipTuberculeValidator =
    ValidatorFactory.createValidator<LipTubercule>(
      ["prominence", "shape"],
      ObjectHelper.deepCopyObj(defaultLipTubercule)
    );

  static #lipCupidBowValidator = ValidatorFactory.createValidator<CupidBow>(
    ["width", "height"],
    ObjectHelper.deepCopyObj(defaultLipCupidBow)
  );

  static #characterValidator = ValidatorFactory.createValidator<Character>(
    ["gender", "height", "weight", "age", "muscle", "hair", "head"],
    ObjectHelper.deepCopyObj(defaultCharacter)
  );

  static #upperLipValidator = ValidatorFactory.createValidator<UpperLip>(
    ["tubercule", "volume", "cupidBow"],
    ObjectHelper.deepCopyObj(defaultUpperLip)
  );

  public static isHead = (obj: any): obj is Head =>
    CharacterValidator.#headValidator.is(obj);

  public static isHair = (obj: any): obj is Hair =>
    CharacterValidator.#hairValidator.is(obj);

  public static isForehead = (obj: any): obj is Forehead =>
    CharacterValidator.#foreheadValidator.is(obj);

  public static isEye = (obj: any): obj is Eye =>
    CharacterValidator.#eyeValidator.is(obj);

  public static isBrow = (obj: any): obj is Eyebrow =>
    CharacterValidator.#browValidator.is(obj);

  public static isEyeBall = (obj: any): obj is EyeBall =>
    CharacterValidator.#eyeBallValidator.is(obj);

  public static isEyeShape = (obj: any): obj is EyeShape =>
    CharacterValidator.#eyeShapeValidator.is(obj);

  public static isEyeLid = (obj: any): obj is EyeLid =>
    CharacterValidator.#eyeLidValidator.is(obj);

  public static isEyeBag = (obj: any): obj is EyeBag =>
    CharacterValidator.#eyeBagValidator.is(obj);

  public static isEyeLash = (obj: any): obj is EyeLash =>
    CharacterValidator.#eyeLashValidator.is(obj);

  public static isMouth = (obj: any): obj is Mouth =>
    CharacterValidator.#mouthValidator.is(obj);

  public static isLip = (obj: any): obj is Lip =>
    CharacterValidator.#lipValidator.is(obj);

  public static isLipTubercule = (obj: any): obj is LipTubercule =>
    CharacterValidator.#lipTuberculeValidator.is(obj);

  public static isUpperLip = (obj: any): obj is UpperLip =>
    CharacterValidator.#upperLipValidator.is(obj);

  public static isLipCupidBow = (obj: any): obj is CupidBow =>
    CharacterValidator.#lipCupidBowValidator.is(obj);

  public static isCharacter = (obj: any): obj is Character =>
    CharacterValidator.#characterValidator.is(obj);

  public static ensureHead<T extends StateWithCharacter>(
    state: T
  ): Draft<Head> {
    return CharacterValidator.#headValidator.ensure(state, ["head"]);
  }

  public static ensureHair<T extends StateWithCharacter>(
    state: T
  ): Draft<Hair> {
    return CharacterValidator.#hairValidator.ensure(state, ["hair"]);
  }

  public static ensureForehead<T extends StateWithCharacter>(
    state: T
  ): Draft<Forehead> {
    return CharacterValidator.#foreheadValidator.ensure(state, [
      "head",
      "forehead",
    ]);
  }

  public static ensureEye<T extends StateWithCharacter>(state: T): Draft<Eye> {
    return CharacterValidator.#eyeValidator.ensure(state, ["head", "eye"]);
  }

  public static ensureBrow<T extends StateWithCharacter>(
    state: T
  ): Draft<Eyebrow> {
    return CharacterValidator.#browValidator.ensure(state, [
      "head",
      "eye",
      "brow",
    ]);
  }

  public static ensureEyeBall<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeBall> {
    return CharacterValidator.#eyeBallValidator.ensure(state, [
      "head",
      "eye",
      "ball",
    ]);
  }

  public static ensureEyeShape<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeShape> {
    return CharacterValidator.#eyeShapeValidator.ensure(state, [
      "head",
      "eye",
      "shape",
    ]);
  }

  public static ensureEyeLid<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeLid> {
    return CharacterValidator.#eyeLidValidator.ensure(state, [
      "head",
      "eye",
      "shape",
      "lid",
    ]);
  }

  public static ensureEyeBag<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeBag> {
    return CharacterValidator.#eyeBagValidator.ensure(state, [
      "head",
      "eye",
      "bag",
    ]);
  }

  public static ensureEyeLash<T extends StateWithCharacter>(
    state: T
  ): Draft<EyeLash> {
    return CharacterValidator.#eyeLashValidator.ensure(state, [
      "head",
      "eye",
      "lashes",
    ]);
  }

  public static ensureMouth<T extends StateWithCharacter>(
    state: T
  ): Draft<Mouth> {
    return CharacterValidator.#mouthValidator.ensure(state, ["head", "mouth"]);
  }

  public static ensureLip<T extends StateWithCharacter>(state: T): Draft<Lip> {
    return CharacterValidator.#lipValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
    ]);
  }

  public static ensureUpperLip<T extends StateWithCharacter>(
    state: T
  ): Draft<UpperLip> {
    return CharacterValidator.#upperLipValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
      "upper",
    ]);
  }

  public static ensureLipTubercule<T extends StateWithCharacter>(
    state: T
  ): Draft<LipTubercule> {
    return CharacterValidator.#lipTuberculeValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
      "upper",
      "tubercule",
    ]);
  }

  public static ensureCupidBow<T extends StateWithCharacter>(
    state: T
  ): Draft<CupidBow> {
    return CharacterValidator.#lipCupidBowValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
      "upper",
      "cupidBow",
    ]);
  }

  public static createDefaultCharacter(): Draft<Character> {
    return ObjectHelper.deepCopyObj(defaultCharacter) as Draft<Character>;
  }

  public static ensureFullCharacter<T extends StateWithCharacter>(
    state: T
  ): Draft<Character> {
    for (const [k, v] of Object.entries(CharacterValidator))
      k.startsWith("ensure") &&
        k !== "ensureFullCharacter" &&
        typeof v === "function" &&
        v.length &&
        (CharacterValidator as any)[k](state);
    return state.character;
  }
}
