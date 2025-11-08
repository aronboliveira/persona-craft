import { ImageStyle, QuestionId } from "../types/helpers";
import { PromptState } from "./redux";

export interface UIRenderingStrategy {
  render(
    context: Partial<ImageStyle & QuestionId & PromptState & { order: number }>
  ): JSX.Element;
}
