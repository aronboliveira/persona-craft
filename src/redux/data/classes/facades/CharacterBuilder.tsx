// src/redux/mainStore/builders/CharacterBuilder.ts

import { Draft } from "@reduxjs/toolkit";
import { Eye, Eyebrow } from "../../../../lib/declarations/interfaces/anatomy";
import { DeepPartial } from "../../../../lib/declarations/types/utils";
import { defaultEye } from "../../defaults";

export class CharacterBuilder {
  public static mergeEye(
    target: Draft<Eye>,
    patch: DeepPartial<Eye>
  ): Draft<Eye> {
    if (patch.ball)
      target.ball = CharacterBuilder.mergeBall(target.ball, patch.ball);
    if (patch.shape)
      target.shape = CharacterBuilder.mergeShape(target.shape, patch.shape);
    if (patch.bag)
      target.bag = CharacterBuilder.mergeBag(target.bag, patch.bag);
    if (patch.brow)
      target.brow = CharacterBuilder.mergeBrow(target.brow, patch.brow);
    if (patch.lashes)
      target.lashes = CharacterBuilder.mergeLashes(target.lashes, patch.lashes);
    return target;
  }

  public static mergeBall(
    target: Draft<Eye>["ball"] | undefined,
    patch: DeepPartial<Eye>["ball"]
  ): Draft<Eye>["ball"] {
    const base = (target ?? defaultEye.ball) as Draft<Eye>["ball"];
    return {
      ...base,
      ...patch,
    } as Draft<Eye>["ball"];
  }

  public static mergeShape(
    target: Draft<Eye>["shape"] | undefined,
    patch: DeepPartial<Eye>["shape"]
  ): Draft<Eye>["shape"] {
    const base = (target ?? defaultEye.shape) as Draft<Eye>["shape"];
    return {
      ...base,
      ...patch,
    } as Draft<Eye>["shape"];
  }

  public static mergeBag(
    target: Draft<Eye>["bag"] | undefined,
    patch: DeepPartial<Eye>["bag"]
  ): Draft<Eye>["bag"] {
    const base = (target ?? defaultEye.bag) as Draft<Eye>["bag"];
    return {
      ...base,
      ...patch,
    } as Draft<Eye>["bag"];
  }

  public static mergeBrow(
    target: Draft<Eye>["brow"] | undefined,
    patch: DeepPartial<Eye>["brow"]
  ): Draft<Eye>["brow"] {
    const base = (target ?? defaultEye.brow) as Draft<Eyebrow>;
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
    } as Draft<Eye>["brow"];
  }

  public static mergeLashes(
    target: Draft<Eye>["lashes"] | undefined,
    patch: DeepPartial<Eye>["lashes"]
  ): Draft<Eye>["lashes"] {
    const base = (target ?? defaultEye.lashes) as Draft<Eye>["lashes"];
    return {
      ...base,
      ...patch,
    } as Draft<Eye>["lashes"];
  }
}
