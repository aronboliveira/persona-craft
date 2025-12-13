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
  Forehead,
  Hair,
  HairBang,
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
} from "../../defaults";

export class CharacterBuilder {
  public static mergeHair(
    target: Draft<Hair>,
    patch: DeepPartial<Hair>
  ): Draft<Hair> {
    if (patch.bang)
      target.bang = CharacterBuilder.mergeHairBang(target.bang, patch.bang);
    return {
      ...defaultHair,
      ...target,
      ...patch,
    } as Draft<Hair>;
  }

  public static mergeHairBang(
    target: Draft<HairBang>,
    patch: DeepPartial<HairBang>
  ): Draft<HairBang> {
    return {
      ...defaultHairBang,
      ...target,
      ...patch,
    } as Draft<HairBang>;
  }

  public static mergeForehead(
    target: Draft<Forehead>,
    patch: DeepPartial<Forehead>
  ): Draft<Forehead> {
    return {
      ...defaultForehead,
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
    return { ...defaultEye, ...target } as Draft<Eye>;
  }

  public static mergeBall(
    target: Draft<EyeBall> | undefined,
    patch: DeepPartial<EyeBall>
  ): Draft<EyeBall> {
    return {
      ...defaultEyeBall,
      ...target,
      ...patch,
    } as Draft<EyeBall>;
  }

  public static mergeEyeShape(
    target: Draft<EyeShape> | undefined,
    patch: DeepPartial<EyeShape>
  ): Draft<EyeShape> {
    return {
      ...defaultEyeShape,
      ...target,
      ...patch,
    } as Draft<EyeShape>;
  }

  public static mergeBag(
    target: Draft<EyeBag> | undefined,
    patch: DeepPartial<EyeBag>
  ): Draft<EyeBag> {
    return {
      ...defaultEyeBag,
      ...target,
      ...patch,
    } as Draft<EyeBag>;
  }

  public static mergeBrow(
    target: Draft<Eyebrow> | undefined,
    patch: DeepPartial<Eyebrow>
  ): Draft<Eyebrow> {
    return {
      ...defaultBrow,
      ...target,
      ...patch,
    } as Draft<Eyebrow>;
  }

  public static mergeLashes(
    target: Draft<EyeLash> | undefined,
    patch: DeepPartial<EyeLash>
  ): Draft<EyeLash> {
    return {
      ...defaultEyeLash,
      ...target,
      ...patch,
    } as Draft<EyeLash>;
  }

  public static mergeEyeLid(
    target: Draft<EyeLid> | undefined,
    patch: DeepPartial<EyeLid>
  ): Draft<EyeLid> {
    return {
      ...defaultEyeLid,
      ...target,
      ...patch,
    } as Draft<EyeLid>;
  }

  public static mergeEyeBag(
    target: Draft<EyeBag> | undefined,
    patch: DeepPartial<EyeBag>
  ): Draft<EyeBag> {
    return {
      ...defaultEyeBag,
      ...target,
      ...patch,
    } as Draft<EyeBag>;
  }

  public static mergeEyeLash(
    target: Draft<EyeLash> | undefined,
    patch: DeepPartial<EyeLash>
  ): Draft<EyeLash> {
    return {
      ...defaultEyeLash,
      ...target,
      ...patch,
    } as Draft<EyeLash>;
  }
}
