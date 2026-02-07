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
  Lips,
  LipTubercule,
  LowerLip,
  Mouth,
  UpperLip,
  Nose,
  Ear,
  Chin,
  Skin,
  BodyModifications,
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
  defaultLips,
  defaultLipCupidBow,
  defaultLipTubercule,
  defaultMouth,
  defaultUpperLip,
  defaultLowerLip,
  defaultNose,
  defaultEar,
  defaultChin,
  defaultSkin,
  defaultBodyModifications,
} from "../../defaults";
import { StateWithCharacter } from "../../../../lib/declarations/types/utils";
import ObjectHelper from "../../../../lib/utils/ObjectHelper";
import { Character } from "../../../../lib/declarations/interfaces/utils";
import { ValidatorFactory } from "../factories/ValidatorFactory";

export class CharacterValidator {
  static #headValidator = ValidatorFactory.createValidator<Head>(
    ["forehead", "eye", "mouth"],
    ObjectHelper.deepCopyObj(defaultHead),
  );

  static #hairValidator = ValidatorFactory.createValidator<Hair>(
    ["texture", "length", "tidiness", "bang"],
    ObjectHelper.deepCopyObj(defaultHair),
  );

  static #foreheadValidator = ValidatorFactory.createValidator<Forehead>(
    ["hairline", "height"],
    ObjectHelper.deepCopyObj(defaultForehead),
  );

  static #eyeValidator = ValidatorFactory.createValidator<Eye>(
    ["ball", "shape", "bag"],
    ObjectHelper.deepCopyObj(defaultEye),
  );

  static #browValidator = ValidatorFactory.createValidator<Eyebrow>(
    [
      "arch",
      "density",
      "growth",
      "height",
      "length",
      "texture",
      "thickness",
      "unibrow",
    ],
    ObjectHelper.deepCopyObj(defaultBrow),
  );

  static #eyeBallValidator = ValidatorFactory.createValidator<EyeBall>(
    ["size", "iris", "pupil"],
    ObjectHelper.deepCopyObj(defaultEyeBall),
  );

  static #eyeShapeValidator = ValidatorFactory.createValidator<EyeShape>(
    ["fissure", "tilt", "depth", "spacing", "lid"],
    ObjectHelper.deepCopyObj(defaultEye.shape),
  );

  static #eyeLidValidator = ValidatorFactory.createValidator<EyeLid>(
    ["creaseNumber", "creaseHeight"],
    ObjectHelper.deepCopyObj(defaultEyeLid),
  );

  static #eyeBagValidator = ValidatorFactory.createValidator<EyeBag>(
    ["countor", "color"],
    ObjectHelper.deepCopyObj(defaultEyeBag),
  );

  static #eyeLashValidator = ValidatorFactory.createValidator<EyeLash>(
    ["density", "length", "curl"],
    ObjectHelper.deepCopyObj(defaultEyeLash),
  );

  static #mouthValidator = ValidatorFactory.createValidator<Mouth>(
    ["lips"],
    ObjectHelper.deepCopyObj(defaultMouth),
  );

  static #lipValidator = ValidatorFactory.createValidator<Lips>(
    ["upper", "lower", "vermillion"],
    ObjectHelper.deepCopyObj(defaultLips),
  );

  static #lipTuberculeValidator =
    ValidatorFactory.createValidator<LipTubercule>(
      ["prominence", "shape"],
      ObjectHelper.deepCopyObj(defaultLipTubercule),
    );

  static #lipCupidBowValidator = ValidatorFactory.createValidator<CupidBow>(
    ["width", "height"],
    ObjectHelper.deepCopyObj(defaultLipCupidBow),
  );

  static #characterValidator = ValidatorFactory.createValidator<Character>(
    ["gender", "height", "weight", "age", "muscle", "hair", "head"],
    ObjectHelper.deepCopyObj(defaultCharacter),
  );

  static #upperLipValidator = ValidatorFactory.createValidator<UpperLip>(
    ["tubercule", "volume"],
    ObjectHelper.deepCopyObj(defaultUpperLip),
  );

  static #lowerLipValidator = ValidatorFactory.createValidator<LowerLip>(
    ["volume", "shape"],
    ObjectHelper.deepCopyObj(defaultLowerLip),
  );

  static #noseValidator = ValidatorFactory.createValidator<Nose>(
    ["shape", "bridge", "nostril", "length", "tipAngle"],
    ObjectHelper.deepCopyObj(defaultNose),
  );

  static #earValidator = ValidatorFactory.createValidator<Ear>(
    ["size", "shape", "lobe", "angle", "width"],
    ObjectHelper.deepCopyObj(defaultEar),
  );

  static #chinValidator = ValidatorFactory.createValidator<Chin>(
    ["projection", "prognathism", "width", "height", "cleft"],
    ObjectHelper.deepCopyObj(defaultChin),
  );

  static #skinValidator = ValidatorFactory.createValidator<Skin>(
    ["ethnicity", "tone", "undertone"],
    ObjectHelper.deepCopyObj(defaultSkin),
  );

  static #bodyModificationsValidator =
    ValidatorFactory.createValidator<BodyModifications>(
      ["tattoo", "piercing", "scar"],
      ObjectHelper.deepCopyObj(defaultBodyModifications),
    );

  public static isHead = (obj: unknown): obj is Head =>
    CharacterValidator.#headValidator.is(obj);

  public static isHair = (obj: unknown): obj is Hair =>
    CharacterValidator.#hairValidator.is(obj);

  public static isForehead = (obj: unknown): obj is Forehead =>
    CharacterValidator.#foreheadValidator.is(obj);

  public static isEye = (obj: unknown): obj is Eye =>
    CharacterValidator.#eyeValidator.is(obj);

  public static isBrow = (obj: unknown): obj is Eyebrow =>
    CharacterValidator.#browValidator.is(obj);

  public static isEyeBall = (obj: unknown): obj is EyeBall =>
    CharacterValidator.#eyeBallValidator.is(obj);

  public static isEyeShape = (obj: unknown): obj is EyeShape =>
    CharacterValidator.#eyeShapeValidator.is(obj);

  public static isEyeLid = (obj: unknown): obj is EyeLid =>
    CharacterValidator.#eyeLidValidator.is(obj);

  public static isEyeBag = (obj: unknown): obj is EyeBag =>
    CharacterValidator.#eyeBagValidator.is(obj);

  public static isEyeLash = (obj: unknown): obj is EyeLash =>
    CharacterValidator.#eyeLashValidator.is(obj);

  public static isMouth = (obj: unknown): obj is Mouth =>
    CharacterValidator.#mouthValidator.is(obj);

  public static isLips = (obj: unknown): obj is Lips =>
    CharacterValidator.#lipValidator.is(obj);

  public static isLipTubercule = (obj: unknown): obj is LipTubercule =>
    CharacterValidator.#lipTuberculeValidator.is(obj);

  public static isUpperLip = (obj: unknown): obj is UpperLip =>
    CharacterValidator.#upperLipValidator.is(obj);

  public static isLowerLip = (obj: unknown): obj is LowerLip =>
    CharacterValidator.#lowerLipValidator.is(obj);

  public static isLipCupidBow = (obj: unknown): obj is CupidBow =>
    CharacterValidator.#lipCupidBowValidator.is(obj);

  public static isCharacter = (obj: unknown): obj is Character =>
    CharacterValidator.#characterValidator.is(obj);

  public static ensureHead<T extends StateWithCharacter>(
    state: T,
  ): Draft<Head> {
    return CharacterValidator.#headValidator.ensure(state, ["head"]);
  }

  public static ensureHair<T extends StateWithCharacter>(
    state: T,
  ): Draft<Hair> {
    return CharacterValidator.#hairValidator.ensure(state, ["hair"]);
  }

  public static ensureForehead<T extends StateWithCharacter>(
    state: T,
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
    state: T,
  ): Draft<Eyebrow> {
    return CharacterValidator.#browValidator.ensure(state, [
      "head",
      "eye",
      "brow",
    ]);
  }

  public static ensureEyeBall<T extends StateWithCharacter>(
    state: T,
  ): Draft<EyeBall> {
    return CharacterValidator.#eyeBallValidator.ensure(state, [
      "head",
      "eye",
      "ball",
    ]);
  }

  public static ensureEyeShape<T extends StateWithCharacter>(
    state: T,
  ): Draft<EyeShape> {
    return CharacterValidator.#eyeShapeValidator.ensure(state, [
      "head",
      "eye",
      "shape",
    ]);
  }

  public static ensureEyeLid<T extends StateWithCharacter>(
    state: T,
  ): Draft<EyeLid> {
    return CharacterValidator.#eyeLidValidator.ensure(state, [
      "head",
      "eye",
      "shape",
      "lid",
    ]);
  }

  public static ensureEyeBag<T extends StateWithCharacter>(
    state: T,
  ): Draft<EyeBag> {
    return CharacterValidator.#eyeBagValidator.ensure(state, [
      "head",
      "eye",
      "bag",
    ]);
  }

  public static ensureEyeLash<T extends StateWithCharacter>(
    state: T,
  ): Draft<EyeLash> {
    return CharacterValidator.#eyeLashValidator.ensure(state, [
      "head",
      "eye",
      "lashes",
    ]);
  }

  public static ensureMouth<T extends StateWithCharacter>(
    state: T,
  ): Draft<Mouth> {
    return CharacterValidator.#mouthValidator.ensure(state, ["head", "mouth"]);
  }

  public static ensureLips<T extends StateWithCharacter>(
    state: T,
  ): Draft<Lips> {
    return CharacterValidator.#lipValidator.ensure(state, [
      "head",
      "mouth",
      "lips",
    ]);
  }

  public static ensureUpperLip<T extends StateWithCharacter>(
    state: T,
  ): Draft<UpperLip> {
    return CharacterValidator.#upperLipValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
      "upper",
    ]);
  }

  public static ensureLowerLip<T extends StateWithCharacter>(
    state: T,
  ): Draft<LowerLip> {
    return CharacterValidator.#lowerLipValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
      "lower",
    ]);
  }

  public static ensureLipTubercule<T extends StateWithCharacter>(
    state: T,
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
    state: T,
  ): Draft<CupidBow> {
    return CharacterValidator.#lipCupidBowValidator.ensure(state, [
      "head",
      "mouth",
      "lip",
      "upper",
      "cupidBow",
    ]);
  }

  // ─── Nose ───────────────────────────────────────────
  public static isNose = (obj: unknown): obj is Nose =>
    CharacterValidator.#noseValidator.is(obj);

  public static ensureNose<T extends StateWithCharacter>(
    state: T,
  ): Draft<Nose> {
    return CharacterValidator.#noseValidator.ensure(state, ["head", "nose"]);
  }

  // ─── Ear ────────────────────────────────────────────
  public static isEar = (obj: unknown): obj is Ear =>
    CharacterValidator.#earValidator.is(obj);

  public static ensureEar<T extends StateWithCharacter>(state: T): Draft<Ear> {
    return CharacterValidator.#earValidator.ensure(state, ["head", "ear"]);
  }

  // ─── Chin ───────────────────────────────────────────
  public static isChin = (obj: unknown): obj is Chin =>
    CharacterValidator.#chinValidator.is(obj);

  public static ensureChin<T extends StateWithCharacter>(
    state: T,
  ): Draft<Chin> {
    return CharacterValidator.#chinValidator.ensure(state, ["head", "chin"]);
  }

  // ─── Skin ───────────────────────────────────────────
  public static isSkin = (obj: unknown): obj is Skin =>
    CharacterValidator.#skinValidator.is(obj);

  public static ensureSkin<T extends StateWithCharacter>(
    state: T,
  ): Draft<Skin> {
    return CharacterValidator.#skinValidator.ensure(state, ["skin"]);
  }

  // ─── Body Modifications ────────────────────────────
  public static isBodyModifications = (
    obj: unknown,
  ): obj is BodyModifications =>
    CharacterValidator.#bodyModificationsValidator.is(obj);

  public static ensureBodyModifications<T extends StateWithCharacter>(
    state: T,
  ): Draft<BodyModifications> {
    return CharacterValidator.#bodyModificationsValidator.ensure(state, [
      "bodyModifications",
    ]);
  }

  public static createDefaultCharacter(): Draft<Character> {
    return ObjectHelper.deepCopyObj(defaultCharacter) as Draft<Character>;
  }

  public static ensureFullCharacter<T extends StateWithCharacter>(
    state: T,
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
