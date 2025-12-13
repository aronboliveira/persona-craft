import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFields } from "../../../lib/declarations/types/redux";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import {
  Eye,
  EyeBag,
  Eyebrow,
  EyeLash,
  EyeLid,
  Forehead,
  Hair,
} from "../../../lib/declarations/interfaces/anatomy";
import {
  defaultBrow,
  defaultEye,
  defaultForehead,
  defaultHair,
  defaultEyeLid,
  VALID_SLIT_NUMBERS,
  defaultEyeBag,
} from "../../data/defaults";
import { DeepPartial } from "../../../lib/declarations/types/utils";
import { CharacterBuilder } from "../../data/classes/facades/CharacterBuilder";
import { CharacterValidator } from "../../data/classes/facades/CharacterValidator";
import { EyeShape } from "../../../lib/declarations/interfaces/anatomy";

const initialState: PromptState = {
  style: "anime",
  character: {
    gender: "female",
    height: "average",
    weight: "thin",
    age: "adult",
    muscle: "average",
    hair: defaultHair as Hair,
    head: {
      forehead: defaultForehead as Forehead,
      eye: defaultEye as Eye,
    },
  },
  environment: {
    type: "indoor",
    lighting: "bright",
    timeOfDay: "morning",
  },
  updatedAt: Date.now(),
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    updatePrompt: (s: any, a: PayloadAction<UpdateFields>): void => {
      Object.assign(s, a.payload);
      s.updatedAt = Date.now();
    },
    resetPrompt: (): PromptState => ({
      ...initialState,
      updatedAt: Date.now(),
    }),
    updateHair(s: PromptState, a: PayloadAction<DeepPartial<Hair>>): void {
      const hair = CharacterBuilder.mergeHair(
        CharacterValidator.ensureHair(s),
        a.payload
      );
      s.character.hair = hair;
      s.updatedAt = Date.now();
    },
    resetHair(s: PromptState): void {
      s.character.hair = defaultHair as Hair;
      s.updatedAt = Date.now();
    },
    updateEye(s: PromptState, a: PayloadAction<DeepPartial<Eye>>): void {
      const eye = CharacterBuilder.mergeEye(
        CharacterValidator.ensureEye(s) as Eye,
        a.payload
      );
      if (
        eye.brow?.slit &&
        eye.brow.slit.number &&
        !VALID_SLIT_NUMBERS.includes(eye.brow.slit.number)
      )
        eye.brow.slit.angle = "none";
      if (eye.shape?.lid?.epicanthicFold === "none")
        eye.shape.lid.epicanthicFoldVariation = "none";
      s.character.head.eye = eye;
      s.updatedAt = Date.now();
    },
    resetEye(s: PromptState): void {
      s.character.head.eye = defaultEye as Eye;
      s.updatedAt = Date.now();
    },
    updateBrow(s: PromptState, a: PayloadAction<DeepPartial<Eyebrow>>): void {
      const brow =
        CharacterBuilder.mergeBrow(
          CharacterValidator.ensureBrow(s),
          a.payload
        ) || defaultBrow;
      if (
        brow.slit &&
        brow.slit.number &&
        !VALID_SLIT_NUMBERS.includes(brow.slit.number)
      )
        brow.slit.angle = "none";
      s.character.head.eye.brow = brow;
      s.updatedAt = Date.now();
    },
    resetBrow(s: PromptState): void {
      s.character.head.eye.brow = defaultBrow as Eyebrow;
      s.updatedAt = Date.now();
    },
    updateEyeShape(
      s: PromptState,
      a: PayloadAction<DeepPartial<EyeShape>>
    ): void {
      const shape = CharacterBuilder.mergeEyeShape(
        CharacterValidator.ensureEyeShape(s),
        a.payload
      );
      if (shape.lid?.epicanthicFold === "none")
        shape.lid.epicanthicFoldVariation = "none";
      s.character.head.eye.shape = shape;
      s.updatedAt = Date.now();
    },
    resetEyeShape(s: PromptState): void {
      s.character.head.eye.shape = defaultEye.shape as EyeShape;
      s.updatedAt = Date.now();
    },
    updateEyeLid(s: PromptState, a: PayloadAction<DeepPartial<EyeLid>>): void {
      const lid = CharacterBuilder.mergeEyeLid(
        CharacterValidator.ensureEyeLid(s),
        a.payload
      );
      if (lid.epicanthicFold === "none") lid.epicanthicFoldVariation = "none";
      if (s.character.head.eye.shape) s.character.head.eye.shape.lid = lid;
      s.updatedAt = Date.now();
    },
    resetEyeLid(s: PromptState): void {
      if (!s?.character?.head?.eye?.shape)
        s.character.head.eye.shape = defaultEye.shape as EyeShape;
      s.character.head.eye.shape.lid = defaultEyeLid as EyeLid;
      s.updatedAt = Date.now();
    },
    updateEyeBag(s: PromptState, a: PayloadAction<DeepPartial<EyeBag>>): void {
      s.character.head.eye.bag = CharacterBuilder.mergeEyeBag(
        CharacterValidator.ensureEyeBag(s),
        a.payload
      );
      s.updatedAt = Date.now();
    },
    resetEyeBag(s: PromptState): void {
      s.character.head.eye.bag = defaultEyeBag as EyeBag;
      s.updatedAt = Date.now();
    },
    updateEyelash(
      s: PromptState,
      a: PayloadAction<DeepPartial<EyeLash>>
    ): void {
      s.character.head.eye.lashes = CharacterBuilder.mergeEyeLash(
        CharacterValidator.ensureEyeLash(s),
        a.payload
      );
      s.updatedAt = Date.now();
    },
    resetEyelash(s: PromptState): void {
      s.character.head.eye.lashes = undefined;
      s.updatedAt = Date.now();
    },
    updateForehead(
      s: PromptState,
      a: PayloadAction<DeepPartial<Forehead>>
    ): void {
      const forehead = CharacterBuilder.mergeForehead(
        CharacterValidator.ensureForehead(s),
        a.payload
      );
      s.character.head.forehead = forehead;
      s.updatedAt = Date.now();
    },
    resetForehead(s: PromptState): void {
      s.character.head.forehead = defaultForehead as Forehead;
      s.updatedAt = Date.now();
    },
  },
});

export const {
  updatePrompt,
  resetPrompt,
  updateEye,
  resetEye,
  updateEyeShape,
  resetEyeShape,
  updateEyeLid,
  resetEyeLid,
  updateBrow,
  resetBrow,
  updateEyeBag,
  resetEyeBag,
  updateEyelash,
  resetEyelash,
  updateHair,
  resetHair,
  updateForehead,
  resetForehead,
} = promptSlice.actions;
export default promptSlice.reducer;
