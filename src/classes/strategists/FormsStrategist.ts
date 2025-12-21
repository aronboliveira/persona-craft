import { PromptState } from "../../lib/declarations/interfaces/redux";
import { UIRenderingStrategy } from "../../lib/declarations/interfaces/classes";
import MainStyleForm from "../../components/forms/MainStyleForm";
import GenderForm from "../../components/forms/GenderForm";
import BodyTypeMuscleForm from "../../components/forms/BodyTypeMuscleForm";
// import NarrativeForm from "../../components/forms/NarrativeForm";
import HeightForm from "../../components/forms/HeightForm";
import BodyFatForm from "../../components/forms/BodyFatForm";
import HairTextureForm from "../../components/forms/hair/HairTextureForm";
import HairBangDensityForm from "../../components/forms/hair/HairBangDensityForm";
import HairBangLengthForm from "../../components/forms/hair/HairBangLengthForm";
import HairBangShapeForm from "../../components/forms/hair/HairBangShapeForm";
import HairTidinessForm from "../../components/forms/hair/HairTidiness";
import HairLengthForm from "../../components/forms/hair/HairLengthForm";
import ForeheadHairlineHeightForm from "../../components/forms/head/forehead/ForeheadHairLineHeightForm";
import ForeheadHairlineRecidingForm from "../../components/forms/head/forehead/ForeheadHairlineRecidingForm";
import ForeheadHeightForm from "../../components/forms/head/forehead/ForeheadHeightForm";
import EyebrowArchAngleForm from "../../components/forms/head/eye/brow/EyebrowArchAngleForm";
import EyebrowDensityForm from "../../components/forms/head/eye/brow/EyebrowDensityForm";
import EyebrowGrowthDirectionForm from "../../components/forms/head/eye/brow/EyebrowGrowthDirectionForm";
import EyebrowGrowthPatternForm from "../../components/forms/head/eye/brow/EyebrowGrowthPatternForm";
import EyebrowArchHeightForm from "../../components/forms/head/eye/brow/EyebrowArchHeightForm";
import EyebrowArchDistanceForm from "../../components/forms/head/eye/brow/EyebrowArchDistanceForm";
import EyebrowHeightForm from "../../components/forms/head/eye/brow/EyebrowHeightForm";
import EyebrowLengthForm from "../../components/forms/head/eye/brow/EyebrowLengthForm";
import EyebrowTextureForm from "../../components/forms/head/eye/brow/EyebrowTextureForm";
import EyebrowThicknessForm from "../../components/forms/head/eye/brow/EyebrowThicknessForm";
import EyebrowUnibrowForm from "../../components/forms/head/eye/brow/EyebrowUnibrowForm";
import EyebrowTrimmingForm from "../../components/forms/head/eye/brow/EyebroTrimmingForm";
import EyebrowSlitAngleForm from "../../components/forms/head/eye/brow/EyebrowSlitAngleForm";
import EyebrowSlitNumberForm from "../../components/forms/head/eye/brow/EyebrowSlitNumberForm";
import EyeBallSizeForm from "../../components/forms/head/eye/ball/EyeBallSizeForm";
import EyeColorForm from "../../components/forms/head/eye/ball/EyeColorForm";
import IrisSizeForm from "../../components/forms/head/eye/ball/IrisSizeForm";
import PupilSizeForm from "../../components/forms/head/eye/ball/PupilSizeForm";
import PupilPatternForm from "../../components/forms/head/eye/ball/PupilPatternForm";
import EyeFissureForm from "../../components/forms/head/eye/shape/EyeFissureForm";
import EyeTiltForm from "../../components/forms/head/eye/shape/EyeTiltForm";
import EyeDepthForm from "../../components/forms/head/eye/shape/EyeDepthForm";
import EyeSpacingForm from "../../components/forms/head/eye/shape/EyeSpacingForm";
import EyeLidCreaseNumberForm from "../../components/forms/head/eye/shape/EyeLidCreaseNumberForm";
import EyeLidCreaseHeightForm from "../../components/forms/head/eye/shape/EyeLidCreaseHeightForm";
import EyeLidEpicanthicFoldExtensionForm from "../../components/forms/head/eye/shape/EyeLidEpicanthicFoldExtensionForm";
import EyeLidEpicanthicFoldClassForm from "../../components/forms/head/eye/shape/EyeLidEpicanthicFoldClassForm";
import EyeBagCountorForm from "../../components/forms/head/eye/bag/EyeBagCountorForm";
import EyeBagColorForm from "../../components/forms/head/eye/bag/EyeBagColorForm";
import EyeLashesDensityForm from "../../components/forms/head/eye/lash/EyeLashesDensityForm";
import EyeLashesLengthForm from "../../components/forms/head/eye/lash/EyeLashesLengthForm";
import EyeLashesCurlForm from "../../components/forms/head/eye/lash/EyeLashesCurlForm";
import EyeHoodForm from "../../components/forms/head/eye/shape/EyeHoodForm";

export default class FormsStrategist implements UIRenderingStrategy {
  render(context: Partial<PromptState & { order: number | string }>): string {
    if (!context?.order) return MainStyleForm.name;
    if (typeof context.order === "number") {
      if (!Number.isInteger(context.order))
        context.order = this.map(context.order) as number;
      if (context.order < 0) context.order = Math.abs(context.order);
    }
    if (context.order === 41) context.order = this.map(context.order) as string;
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
      case 29:
        return EyeBallSizeForm.name;
      case 30:
        return EyeColorForm.name;
      case 31:
        return IrisSizeForm.name;
      case 33:
        return PupilSizeForm.name;
      case 34:
        return PupilPatternForm.name;
      case 36:
        return EyeFissureForm.name;
      case 37:
        return EyeTiltForm.name;
      case 38:
        return EyeDepthForm.name;
      case 39:
        return EyeSpacingForm.name;
      case 41:
        return EyeLidCreaseNumberForm.name;
      case 42:
        return EyeLidCreaseHeightForm.name;
      case 43:
        return EyeLidEpicanthicFoldExtensionForm.name;
      case 44:
        return EyeLidEpicanthicFoldClassForm.name;
      case 45:
        return EyeHoodForm.name;
      case 47:
        return EyeBagCountorForm.name;
      case 48:
        return EyeBagColorForm.name;
      case 50:
        return EyeLashesDensityForm.name;
      case 51:
        return EyeLashesLengthForm.name;
      case 52:
        return EyeLashesCurlForm.name;
      case "eyebrow-symmetry": // 28
      case "eyelid-symmetry": // 46
      case "eyebag-symmetry": // 49
      case "eyelash-symmetry": // 53
      case "eyeshape-symmetry": // 40
      case "pupil-symmetry": // 35
      case "iris-symmetry": // 32
        // todo change this later
        return "symmetry";
      // case 11:
      //   return NarrativeForm.name;
      default:
        return "";
    }
  }
  map(
    value: string | number | bigint | symbol
  ): string | number | bigint | symbol {
    if (
      typeof value === "object" ||
      typeof value === "boolean" ||
      typeof value === "function" ||
      !value
    )
      return value;
    if (typeof value === "number") {
      if (!Number.isFinite(value)) return value;
      value = Math.trunc(value);
    }
    if (typeof value === "string" && /^\d+$/.test(value))
      value = parseInt(value, 10);
    switch (value) {
      case 28:
        return "eyebrow-symmetry";
      case 32:
        return "iris-symmetry";
      case 35:
        return "pupil-symmetry";
      case 40:
        return "eyeshape-symmetry";
      case 46:
        return "eyelid-symmetry";
      case 49:
        return "eyebag-symmetry";
      case 53:
        return "eyelash-symmetry";
      default:
        return value;
    }
  }
}
