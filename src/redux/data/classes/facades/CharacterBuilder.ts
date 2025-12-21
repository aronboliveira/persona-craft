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
  HairBang,
  Lip,
  LipTubercule,
  Mouth,
} from "../../../../lib/declarations/interfaces/anatomy";
import { DeepPartial } from "../../../../lib/declarations/types/utils";
import {
  defaultBrow,
  defaultEye,
  defaultEyeBag,
  defaultEyeBall,
  defaultEyeLash,
  defaultEyeLid,
  defaultEyeShape,
  defaultForehead,
  defaultHair,
  defaultHairBang,
  defaultLip,
  defaultMouth,
  defaultLipTubercule,
} from "../../defaults";
import ObjectHelper from "../../../../lib/utils/ObjectHelper";

export class CharacterBuilder {
  public static merge<T>(
    defaultValue: T,
    target: Draft<T> | undefined,
    patch: DeepPartial<T>
  ): Draft<T> {
    return {
      ...ObjectHelper.deepCopyObj(defaultValue),
      ...(target || {}),
      ...patch,
    } as Draft<T>;
  }

  public static mergeHair(
    target: Draft<Hair>,
    patch: DeepPartial<Hair>
  ): Draft<Hair> {
    if (patch.bang)
      target.bang = CharacterBuilder.mergeHairBang(target.bang, patch.bang);
    return {
      ...ObjectHelper.deepCopyObj(defaultHair),
      ...target,
      ...patch,
    } as Draft<Hair>;
  }

  public static mergeHairBang(
    target: Draft<HairBang>,
    patch: DeepPartial<HairBang>
  ): Draft<HairBang> {
    return {
      ...ObjectHelper.deepCopyObj(defaultHairBang),
      ...target,
      ...patch,
    } as Draft<HairBang>;
  }

  public static mergeForehead(
    target: Draft<Forehead>,
    patch: DeepPartial<Forehead>
  ): Draft<Forehead> {
    return {
      ...ObjectHelper.deepCopyObj(defaultForehead),
      ...target,
      ...patch,
    } as Draft<Forehead>;
  }

  public static mergeEye(
    target: Draft<Eye>,
    patch: DeepPartial<Eye>
  ): Draft<Eye> {
    if (patch.ball)
      target.ball = CharacterBuilder.mergeBall(target.ball, patch.ball);
    if (patch.shape)
      target.shape = CharacterBuilder.mergeEyeShape(target.shape, patch.shape);
    if (patch.bag)
      target.bag = CharacterBuilder.mergeBag(target.bag, patch.bag);
    if (patch.brow)
      target.brow = CharacterBuilder.mergeBrow(target.brow, patch.brow);
    if (patch.lashes)
      target.lashes = CharacterBuilder.mergeLashes(target.lashes, patch.lashes);
    return { ...ObjectHelper.deepCopyObj(defaultEye), ...target } as Draft<Eye>;
  }

  public static mergeBall(
    target: Draft<EyeBall> | undefined,
    patch: DeepPartial<EyeBall>
  ): Draft<EyeBall> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeBall),
      ...target,
      ...patch,
    } as Draft<EyeBall>;
  }

  public static mergeEyeShape(
    target: Draft<EyeShape> | undefined,
    patch: DeepPartial<EyeShape>
  ): Draft<EyeShape> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeShape),
      ...target,
      ...patch,
    } as Draft<EyeShape>;
  }

  public static mergeBag(
    target: Draft<EyeBag> | undefined,
    patch: DeepPartial<EyeBag>
  ): Draft<EyeBag> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeBag),
      ...target,
      ...patch,
    } as Draft<EyeBag>;
  }

  public static mergeBrow(
    target: Draft<Eyebrow> | undefined,
    patch: DeepPartial<Eyebrow>
  ): Draft<Eyebrow> {
    return {
      ...ObjectHelper.deepCopyObj(defaultBrow),
      ...target,
      ...patch,
    } as Draft<Eyebrow>;
  }

  public static mergeLashes(
    target: Draft<EyeLash> | undefined,
    patch: DeepPartial<EyeLash>
  ): Draft<EyeLash> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeLash),
      ...target,
      ...patch,
    } as Draft<EyeLash>;
  }

  public static mergeEyeLid(
    target: Draft<EyeLid> | undefined,
    patch: DeepPartial<EyeLid>
  ): Draft<EyeLid> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeLid),
      ...target,
      ...patch,
    } as Draft<EyeLid>;
  }

  public static mergeEyeBag(
    target: Draft<EyeBag> | undefined,
    patch: DeepPartial<EyeBag>
  ): Draft<EyeBag> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeBag),
      ...target,
      ...patch,
    } as Draft<EyeBag>;
  }

  public static mergeEyeLash(
    target: Draft<EyeLash> | undefined,
    patch: DeepPartial<EyeLash>
  ): Draft<EyeLash> {
    return {
      ...ObjectHelper.deepCopyObj(defaultEyeLash),
      ...target,
      ...patch,
    } as Draft<EyeLash>;
  }

  public static mergeMouth(
    target: Draft<Mouth>,
    patch: DeepPartial<Mouth>
  ): Draft<Mouth> {
    return {
      ...ObjectHelper.deepCopyObj(defaultMouth),
      ...target,
      ...patch,
    } as Draft<Mouth>;
  }

  public static mergeLip(
    target: Draft<Lip>,
    patch: DeepPartial<Lip>
  ): Draft<Lip> {
    return {
      ...ObjectHelper.deepCopyObj(defaultLip),
      ...target,
      ...patch,
    } as Draft<Lip>;
  }

  public static mergeLipTubercule(
    target: Draft<LipTubercule>,
    patch: DeepPartial<LipTubercule>
  ): Draft<LipTubercule> {
    return {
      ...ObjectHelper.deepCopyObj(defaultLipTubercule),
      ...target,
      ...patch,
    } as Draft<LipTubercule>;
  }
}
