import { ImageStyle } from "../types/helpers";
import { TipsActionType } from "../types/redux";
import { Character, Environment } from "./utils";

export interface FormsState {
  style: ImageStyle;
  character: Character;
  environment: Environment;
  updatedAt: number;
}

export type TipsState = {
  startFormTip: boolean;
} & Record<string, boolean>;

export type TipsAction = {
  type: TipsActionType;
  payload?: TipsState;
};
