import { ImageStyle } from "../types/helpers";
import { TipsActionType } from "../types/redux";
import { Character, Environment } from "./utils";
import { FormState } from "../types/redux";
import { Reducer } from "@reduxjs/toolkit";
export interface PromptState {
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

export type MainStoreState = PromptState & FormState & TipsState;
export type MainStoreReducer = {
  prompt: Reducer<PromptState>;
  formStrategy: Reducer<FormState>;
  tips: Reducer<TipsState>;
};
