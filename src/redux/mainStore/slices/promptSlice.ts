import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateFields } from "../../../lib/declarations/types/redux";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import {
  CupidBow,
  Eye,
  EyeBag,
  Eyebrow,
  EyeLash,
  EyeLid,
  Forehead,
  Hair,
  Lip,
  LipTubercule,
  Mouth,
  UpperLip,
} from "../../../lib/declarations/interfaces/anatomy";
import {
  defaultBrow,
  defaultEye,
  defaultForehead,
  defaultHair,
  defaultEyeLid,
  VALID_SLIT_NUMBERS,
  defaultEyeBag,
  defaultMouth,
  defaultCharacter,
  defaultLipTubercule,
  defaultLip,
  defaultUpperLip,
  defaultLipCupidBow,
} from "../../data/defaults";
import { DeepPartial } from "../../../lib/declarations/types/utils";
import { CharacterBuilder } from "../../data/classes/facades/CharacterBuilder";
import { CharacterValidator } from "../../data/classes/facades/CharacterValidator";
import { EyeShape } from "../../../lib/declarations/interfaces/anatomy";
import { Character } from "../../../lib/declarations/interfaces/utils";
import ObjectHelper from "../../../lib/utils/ObjectHelper";

const initialState: PromptState = {
  style: "anime",
  character: ObjectHelper.deepCopyObj(defaultCharacter) as Character,
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
      s.character.hair = ObjectHelper.deepCopyObj(defaultHair) as Hair;
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
      s.character.head.eye = ObjectHelper.deepCopyObj(defaultEye) as Eye;
      s.updatedAt = Date.now();
    },
    updateBrow(s: PromptState, a: PayloadAction<DeepPartial<Eyebrow>>): void {
      const brow =
        CharacterBuilder.mergeBrow(
          CharacterValidator.ensureBrow(s),
          a.payload
        ) || ObjectHelper.deepCopyObj(defaultBrow);
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
      s.character.head.eye.brow = ObjectHelper.deepCopyObj(
        defaultBrow
      ) as Eyebrow;
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
      s.character.head.eye.shape = ObjectHelper.deepCopyObj(
        defaultEye.shape
      ) as EyeShape;
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
        s.character.head.eye.shape = ObjectHelper.deepCopyObj(
          defaultEye.shape
        ) as EyeShape;
      s.character.head.eye.shape.lid = ObjectHelper.deepCopyObj(
        defaultEyeLid
      ) as EyeLid;
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
      s.character.head.eye.bag = ObjectHelper.deepCopyObj(
        defaultEyeBag
      ) as EyeBag;
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
      s.character.head.forehead = ObjectHelper.deepCopyObj(
        defaultForehead
      ) as Forehead;
      s.updatedAt = Date.now();
    },
    updateMouth(s: PromptState, a: PayloadAction<DeepPartial<Mouth>>): void {
      const mouth = CharacterBuilder.mergeMouth(
        CharacterValidator.ensureMouth(s),
        a.payload
      );
      s.character.head.mouth = mouth;
      s.updatedAt = Date.now();
    },
    resetMouth(s: PromptState): void {
      s.character.head.mouth = ObjectHelper.deepCopyObj(defaultMouth) as Mouth;
      s.updatedAt = Date.now();
    },
    updateLip(s: PromptState, a: PayloadAction<DeepPartial<Lip>>): void {
      const lip = CharacterBuilder.mergeLip(
        CharacterValidator.ensureLip(s),
        a.payload
      );
      s.character.head.mouth.lip = lip;
      s.updatedAt = Date.now();
    },
    resetLip(s: PromptState): void {
      s.character.head.mouth.lip = ObjectHelper.deepCopyObj(defaultLip) as Lip;
      s.updatedAt = Date.now();
    },
    updateUpperLip(
      s: PromptState,
      a: PayloadAction<DeepPartial<UpperLip>>
    ): void {
      const upperLip = CharacterBuilder.merge(
        defaultUpperLip,
        CharacterValidator.ensureUpperLip(s),
        a.payload
      );
      s.character.head.mouth.lip.upper = ObjectHelper.deepCopyObj(
        upperLip
      ) as UpperLip;
      s.updatedAt = Date.now();
    },
    resetUpperLip(s: PromptState): void {
      s.character.head.mouth.lip.upper = ObjectHelper.deepCopyObj(
        defaultUpperLip
      ) as UpperLip;
      s.updatedAt = Date.now();
    },
    updateCupidBow(
      s: PromptState,
      a: PayloadAction<DeepPartial<CupidBow>>
    ): void {
      const cupidBow = CharacterBuilder.merge(
        defaultLipCupidBow,
        CharacterValidator.ensureCupidBow(s),
        a.payload
      );
      s.character.head.mouth.lip.upper.cupidBow = ObjectHelper.deepCopyObj(
        cupidBow
      ) as CupidBow;
      s.updatedAt = Date.now();
    },
    resetCupidBow(s: PromptState): void {
      s.character.head.mouth.lip.upper.cupidBow = ObjectHelper.deepCopyObj(
        defaultLipCupidBow
      ) as CupidBow;
      s.updatedAt = Date.now();
    },
    updateLipTubercule(
      s: PromptState,
      a: PayloadAction<DeepPartial<LipTubercule>>
    ): void {
      const lipTubercule = CharacterBuilder.mergeLipTubercule(
        CharacterValidator.ensureLipTubercule(s),
        a.payload
      );
      s.character.head.mouth.lip.upper.tubercule = ObjectHelper.deepCopyObj(
        lipTubercule
      ) as LipTubercule;
      s.updatedAt = Date.now();
    },
    resetLipTubercule(s: PromptState): void {
      s.character.head.mouth.lip.upper.tubercule = ObjectHelper.deepCopyObj(
        defaultLipTubercule
      ) as LipTubercule;
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
  updateMouth,
  resetMouth,
  updateLip,
  resetLip,
  updateUpperLip,
  resetUpperLip,
  updateCupidBow,
  resetCupidBow,
  updateLipTubercule,
  resetLipTubercule,
} = promptSlice.actions;
export default promptSlice.reducer;
