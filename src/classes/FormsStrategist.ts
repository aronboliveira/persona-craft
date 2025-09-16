import { FormsState } from "../lib/declarations/interfaces/redux";
import { UIRenderingStrategy } from "../lib/declarations/interfaces/classes";
import MainStyleForm from "../components/forms/MainStyleForm";
import GenderForm from "../components/forms/GenderForm";

export default class FormsStrategist implements UIRenderingStrategy {
  render(context: Partial<FormsState & { order: number }>): string {
    if (!context?.order) return MainStyleForm.name;
    else if (context.order === 1) return GenderForm.name;
    return "";
  }
}
