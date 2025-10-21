import { FormsState } from "../lib/declarations/interfaces/redux";
import { UIRenderingStrategy } from "../lib/declarations/interfaces/classes";
import MainStyleForm from "../components/forms/MainStyleForm";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
import NarrativeForm from "../components/forms/NarrativeForm";

export default class FormsStrategist implements UIRenderingStrategy {
  render(context: Partial<FormsState & { order: number }>): string {
    if (!context?.order) return MainStyleForm.name;
    switch (context.order) {
      case 1:
        return GenderForm.name;
      case 2:
        return NarrativeForm.name;
      case 3:
        return BodyTypeMuscleForm.name;
      default:
        return "";
    }
  }
}
