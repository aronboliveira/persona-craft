import { ImageStyle, QuestionId } from "../types/helpers";
import { FormsState } from "./redux";

export interface UIRenderingStrategy {
  render(
    context: Partial<ImageStyle & QuestionId & FormsState & { order: number }>
  ): JSX.Element;
}
