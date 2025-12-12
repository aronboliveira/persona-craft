// src/redux/mainStore/builders/CharacterBuilder.ts

import { Draft } from "@reduxjs/toolkit";
import {
  Eye,
  EyeBag,
  EyeBall,
  Eyebrow,
  EyeLash,
  EyeLid,
  EyeShape,
  Hair,
  HairBang,
} from "../../../../lib/declarations/interfaces/anatomy";
import { DeepPartial } from "../../../../lib/declarations/types/utils";
import { defaultEye, defaultEyeBag } from "../../defaults";

export class CharacterBuilder {
  public static mergeHair(
    target: Draft<Hair>,
    patch: DeepPartial<Hair>
  ): Draft<Hair> {
    if (patch.bang)
      target.bang = CharacterBuilder.mergeHairBang(target.bang, patch.bang);
    if (patch.length) target.length = patch.length;
    if (patch.texture) target.texture = patch.texture;
    if (patch.tidiness) target.tidiness = patch.tidiness;
    return {
      ...target,
      ...patch,
    } as Draft<Hair>;
  }

  public static mergeHairBang(
    target: Draft<HairBang> | undefined,
    patch: DeepPartial<HairBang>
  ): Draft<HairBang> {
    const base = (target ?? {}) as Draft<HairBang>;
    return {
      ...base,
      ...patch,
    } as Draft<HairBang>;
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
    return target;
  }

  public static mergeBall(
    target: Draft<EyeBall> | undefined,
    patch: DeepPartial<EyeBall>
  ): Draft<EyeBall> {
    const base = (target ?? defaultEye.ball ?? {}) as Draft<EyeBall>;
    return {
      ...base,
      ...patch,
    } as Draft<EyeBall>;
  }

  public static mergeEyeShape(
    target: Draft<EyeShape> | undefined,
    patch: DeepPartial<EyeShape>
  ): Draft<EyeShape> {
    const base = (target ?? defaultEye.shape ?? {}) as Draft<EyeShape>;
    return {
      ...base,
      ...patch,
    } as Draft<EyeShape>;
  }

  public static mergeBag(
    target: Draft<EyeBag> | undefined,
    patch: DeepPartial<EyeBag>
  ): Draft<EyeBag> {
    const base = (target ?? defaultEye.bag ?? {}) as Draft<EyeBag>;
    return {
      ...base,
      ...patch,
    } as Draft<EyeBag>;
  }

  public static mergeBrow(
    target: Draft<Eyebrow> | undefined,
    patch: DeepPartial<Eyebrow>
  ): Draft<Eyebrow> {
    const base = (target ?? defaultEye.brow ?? {}) as Draft<Eyebrow>;
    const mergedArch = patch?.arch
      ? {
          ...(base.arch ?? ({} as any)),
          ...patch.arch,
        }
      : base.arch;
    const mergedGrowth = patch?.growth
      ? {
          ...(base.growth ?? ({} as any)),
          ...patch.growth,
        }
      : base.growth;
    return {
      ...base,
      ...patch,
      arch: mergedArch,
      growth: mergedGrowth,
    } as Draft<Eyebrow>;
  }

  public static mergeLashes(
    target: Draft<EyeLash> | undefined,
    patch: DeepPartial<EyeLash>
  ): Draft<EyeLash> {
    const base = (target ?? defaultEye.lashes ?? {}) as Draft<EyeLash>;
    return {
      ...base,
      ...patch,
    } as Draft<EyeLash>;
  }

  public static mergeEyeLid(
    target: Draft<EyeLid> | undefined,
    patch: DeepPartial<EyeLid>
  ): Draft<EyeLid> {
    const base = (target ?? defaultEye.shape?.lid ?? {}) as Draft<EyeLid>;
    return {
      ...base,
      ...patch,
    } as Draft<EyeLid>;
  }

  public static mergeEyeBag(
    target: Draft<EyeBag> | undefined,
    patch: DeepPartial<EyeBag>
  ): Draft<EyeBag> {
    const base = (target ?? defaultEyeBag ?? {}) as Draft<EyeBag>;
    return {
      ...base,
      ...patch,
    } as Draft<EyeBag>;
  }
}
