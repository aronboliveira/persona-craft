import { PromptState } from "../lib/declarations/interfaces/redux";
import { UIRenderingStrategy } from "../lib/declarations/interfaces/classes";
import MainStyleForm from "../components/forms/MainStyleForm";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
// import NarrativeForm from "../components/forms/NarrativeForm";
import HeightForm from "../components/forms/HeightForm";
import BodyFatForm from "../components/forms/BodyFatForm";
import HairTextureForm from "../components/forms/hair/HairTextureForm";
import HairBangDensityForm from "../components/forms/hair/HairBangDensityForm";
import HairBangLengthForm from "../components/forms/hair/HairBangLengthForm";
import HairBangShapeForm from "../components/forms/hair/HairBangShapeForm";
import HairTidinessForm from "../components/forms/hair/HairTidiness";
import HairLengthForm from "../components/forms/hair/HairLengthForm";
import ForeheadHairlineHeightForm from "../components/forms/head/forehead/ForeheadHairLineHeightForm";
import ForeheadHairlineRecidingForm from "../components/forms/head/forehead/ForeheadHairlineRecidingForm";
import ForeheadHeightForm from "../components/forms/head/forehead/ForeheadHeightForm";
import EyebrowArchAngleForm from "../components/forms/head/eye/brow/EyebrowArchAngleForm";
import EyebrowDensityForm from "../components/forms/head/eye/brow/EyebrowDensityForm";
import EyebrowGrowthDirectionForm from "../components/forms/head/eye/brow/EyebrowGrowthDirectionForm";
import EyebrowGrowthPatternForm from "../components/forms/head/eye/brow/EyebrowGrowthPatternForm";
import EyebrowArchHeightForm from "../components/forms/head/eye/brow/EyebrowArchHeightForm";
import EyebrowArchDistanceForm from "../components/forms/head/eye/brow/EyebrowArchDistanceForm";
import EyebrowHeightForm from "../components/forms/head/eye/brow/EyebrowHeightForm";
import EyebrowLengthForm from "../components/forms/head/eye/brow/EyebrowLengthForm";
import EyebrowTextureForm from "../components/forms/head/eye/brow/EyebrowTextureForm";
import EyebrowThicknessForm from "../components/forms/head/eye/brow/EyebrowThicknessForm";
import EyebrowUnibrowForm from "../components/forms/head/eye/brow/EyebrowUnibrowForm";
import EyebrowTrimmingForm from "../components/forms/head/eye/brow/EyebroTrimmingForm";
import EyebrowSlitAngleForm from "../components/forms/head/eye/brow/EyebrowSlitAngleForm";
import EyebrowSlitNumberForm from "../components/forms/head/eye/brow/EyebrowSlitNumberForm";

export default class FormsStrategist implements UIRenderingStrategy {
  render(context: Partial<PromptState & { order: number }>): string {
    if (!context?.order) return MainStyleForm.name;
    switch (context.order) {
      case 0:
        return MainStyleForm.name;
      case 1:
        return GenderForm.name;
      case 2:
        return BodyTypeMuscleForm.name;
      case 3:
        return HeightForm.name;
      case 4:
        return BodyFatForm.name;
      case 5:
        return HairTextureForm.name;
      case 6:
        return HairLengthForm.name;
      case 7:
        return HairTidinessForm.name;
      case 8:
        return HairBangDensityForm.name;
      case 9:
        return HairBangLengthForm.name;
      case 10:
        return HairBangShapeForm.name;
      case 11:
        return ForeheadHairlineHeightForm.name;
      case 12:
        return ForeheadHairlineRecidingForm.name;
      case 13:
        return ForeheadHeightForm.name;
      case 14:
        return EyebrowHeightForm.name;
      case 15:
        return EyebrowLengthForm.name;
      case 16:
        return EyebrowTextureForm.name;
      case 17:
        return EyebrowDensityForm.name;
      case 18:
        return EyebrowThicknessForm.name;
      case 19:
        return EyebrowGrowthDirectionForm.name;
      case 20:
        return EyebrowGrowthPatternForm.name;
      case 21:
        return EyebrowArchAngleForm.name;
      case 22:
        return EyebrowArchHeightForm.name;
      case 23:
        return EyebrowArchDistanceForm.name;
      case 24:
        return EyebrowUnibrowForm.name;
      case 25:
        return EyebrowTrimmingForm.name;
      case 26:
        return EyebrowSlitNumberForm.name;
      case 27:
        return EyebrowSlitAngleForm.name;
      // case 11:
      //   return NarrativeForm.name;
      default:
        return "";
    }
  }
}
