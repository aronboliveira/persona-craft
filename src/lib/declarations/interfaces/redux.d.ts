import { ImageStyle } from "../types/helpers";
import { Character, Environment } from "./utils";

export interface FormsState {
  style: ImageStyle;
  character: Character;
  environment: Environment;
  updatedAt: number;
}
