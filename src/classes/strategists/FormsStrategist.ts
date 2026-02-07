import { PromptState } from "../../lib/declarations/interfaces/redux";
import { UIRenderingStrategy } from "../../lib/declarations/interfaces/classes";
import MainStyleForm from "../../components/forms/MainStyleForm";
import GenderForm from "../../components/forms/GenderForm";
import BodyTypeMuscleForm from "../../components/forms/BodyTypeMuscleForm";
import HeightForm from "../../components/forms/HeightForm";
import BodyFatForm from "../../components/forms/BodyFatForm";
import HairTextureForm from "../../components/forms/hair/HairTextureForm";
import HairBangDensityForm from "../../components/forms/hair/HairBangDensityForm";
import HairBangLengthForm from "../../components/forms/hair/HairBangLengthForm";
import HairBangShapeForm from "../../components/forms/hair/HairBangShapeForm";
import HairTidinessForm from "../../components/forms/hair/HairTidinessForm";
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
import EyebrowTrimmingForm from "../../components/forms/head/eye/brow/EyebrowTrimmingForm";
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
import UpperLipVolumeForm from "../../components/forms/head/mouth/lips/upper/UpperLipVolumeForm";
import LipTuberculeProminenceForm from "../../components/forms/head/mouth/lips/upper/tubercule/LipTuberculeProminenceForm";
import LipTuberculeShapeForm from "../../components/forms/head/mouth/lips/upper/tubercule/LipTuberculeShapeForm";
import CupidBowWidthForm from "../../components/forms/head/mouth/lips/upper/bow/CupidBowWidthForm";
import CupidBowHeightForm from "../../components/forms/head/mouth/lips/upper/bow/CupidBowHeightForm";
import LowerLipVolumeForm from "../../components/forms/head/mouth/lips/lower/LowerLipVolumeForm";
import LowerLipShapeForm from "../../components/forms/head/mouth/lips/lower/LowerLipShapeForm";
import LipsVermillionForm from "../../components/forms/head/mouth/lips/LipsVermillionForm";
import MouthCommissureAngleForm from "../../components/forms/head/mouth/MouthCommissureAngleForm";
import MouthCommissureShapeForm from "../../components/forms/head/mouth/MouthCommissureShapeForm";
import MouthDimpleSizeForm from "../../components/forms/head/mouth/MouthDimpleSizeForm";
import MouthDimpleShapeForm from "../../components/forms/head/mouth/MouthDimpleShapeForm";
import ForeheadHairlineShapeForm from "../../components/forms/head/forehead/ForeheadHairlineShapeForm";
import EthnicityForm from "../../components/forms/skin/EthnicityForm";
import SkinToneForm from "../../components/forms/skin/SkinToneForm";
import SkinUndertoneForm from "../../components/forms/skin/SkinUndertoneForm";
import NoseShapeForm from "../../components/forms/head/nose/NoseShapeForm";
import NoseBridgeWidthForm from "../../components/forms/head/nose/NoseBridgeWidthForm";
import NoseBridgeHeightForm from "../../components/forms/head/nose/NoseBridgeHeightForm";
import NoseNostrilSizeForm from "../../components/forms/head/nose/NoseNostrilSizeForm";
import NoseNostrilFlareForm from "../../components/forms/head/nose/NoseNostrilFlareForm";
import NoseLengthForm from "../../components/forms/head/nose/NoseLengthForm";
import NoseTipAngleForm from "../../components/forms/head/nose/NoseTipAngleForm";
import EarSizeForm from "../../components/forms/head/ear/EarSizeForm";
import EarShapeForm from "../../components/forms/head/ear/EarShapeForm";
import EarLobeForm from "../../components/forms/head/ear/EarLobeForm";
import EarAngleForm from "../../components/forms/head/ear/EarAngleForm";
import EarWidthForm from "../../components/forms/head/ear/EarWidthForm";
import ChinProjectionForm from "../../components/forms/head/chin/ChinProjectionForm";
import ChinPrognathismForm from "../../components/forms/head/chin/ChinPrognathismForm";
import ChinWidthForm from "../../components/forms/head/chin/ChinWidthForm";
import ChinHeightForm from "../../components/forms/head/chin/ChinHeightForm";
import ChinCleftForm from "../../components/forms/head/chin/ChinCleftForm";
import TattooStyleForm from "../../components/forms/body/modifications/TattooStyleForm";
import TattooPlacementForm from "../../components/forms/body/modifications/TattooPlacementForm";
import TattooCoverageForm from "../../components/forms/body/modifications/TattooCoverageForm";
import PiercingTypeForm from "../../components/forms/body/modifications/PiercingTypeForm";
import ScarTypeForm from "../../components/forms/body/modifications/ScarTypeForm";
import ScarPlacementForm from "../../components/forms/body/modifications/ScarPlacementForm";
import ScarProminenceForm from "../../components/forms/body/modifications/ScarProminenceForm";

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
        return ForeheadHairlineShapeForm.name;
      case 13:
        return ForeheadHairlineRecidingForm.name;
      case 14:
        return ForeheadHeightForm.name;
      case 15:
        return EyebrowHeightForm.name;
      case 16:
        return EyebrowLengthForm.name;
      case 17:
        return EyebrowTextureForm.name;
      case 18:
        return EyebrowDensityForm.name;
      case 19:
        return EyebrowThicknessForm.name;
      case 20:
        return EyebrowGrowthDirectionForm.name;
      case 21:
        return EyebrowGrowthPatternForm.name;
      case 22:
        return EyebrowArchAngleForm.name;
      case 23:
        return EyebrowArchHeightForm.name;
      case 24:
        return EyebrowArchDistanceForm.name;
      case 25:
        return EyebrowUnibrowForm.name;
      case 26:
        return EyebrowTrimmingForm.name;
      case 27:
        return EyebrowSlitNumberForm.name;
      case 28:
        return EyebrowSlitAngleForm.name;
      case 30:
        return EyeBallSizeForm.name;
      case 31:
        return EyeColorForm.name;
      case 32:
        return IrisSizeForm.name;
      case 34:
        return PupilSizeForm.name;
      case 35:
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
      case 49:
        return EyeLashesDensityForm.name;
      case 51:
        return EyeLashesLengthForm.name;
      case 52:
        return EyeLashesCurlForm.name;
      case 54:
        return UpperLipVolumeForm.name;
      case 55:
        return LipTuberculeProminenceForm.name;
      case 56:
        return LipTuberculeShapeForm.name;
      case 57:
        return CupidBowWidthForm.name;
      case 58:
        return CupidBowHeightForm.name;
      case 59:
        return LowerLipVolumeForm.name;
      case 60:
        return LowerLipShapeForm.name;
      case 61:
        return LipsVermillionForm.name;
      case 62:
        return MouthCommissureAngleForm.name;
      case 63:
        return MouthCommissureShapeForm.name;
      case 64:
        return MouthDimpleSizeForm.name;
      case 65:
        return MouthDimpleShapeForm.name;
      case 66:
        return EthnicityForm.name;
      case 67:
        return SkinToneForm.name;
      case 68:
        return SkinUndertoneForm.name;
      case 69:
        return NoseShapeForm.name;
      case 70:
        return NoseBridgeWidthForm.name;
      case 71:
        return NoseBridgeHeightForm.name;
      case 72:
        return NoseNostrilSizeForm.name;
      case 73:
        return NoseNostrilFlareForm.name;
      case 74:
        return NoseLengthForm.name;
      case 75:
        return NoseTipAngleForm.name;
      case 76:
        return EarSizeForm.name;
      case 77:
        return EarShapeForm.name;
      case 78:
        return EarLobeForm.name;
      case 79:
        return EarAngleForm.name;
      case 81:
        return EarWidthForm.name;
      case 82:
        return ChinProjectionForm.name;
      case 83:
        return ChinPrognathismForm.name;
      case 84:
        return ChinWidthForm.name;
      case 85:
        return ChinHeightForm.name;
      case 86:
        return ChinCleftForm.name;
      case 87:
        return TattooStyleForm.name;
      case 88:
        return TattooPlacementForm.name;
      case 89:
        return TattooCoverageForm.name;
      case 90:
        return PiercingTypeForm.name;
      case 91:
        return ScarTypeForm.name;
      case 92:
        return ScarPlacementForm.name;
      case 93:
        return ScarProminenceForm.name;
      case "eyebrow-symmetry": // 29
      case "eyelid-symmetry": // 47
      case "eyebag-symmetry": // 50
      case "eyelash-symmetry": // 53
      case "eyeshape-symmetry": // 41
      case "pupil-symmetry": // 36
      case "iris-symmetry": // 33
      case "ear-symmetry": // 80
        return "symmetry";
      default:
        return "";
    }
  }
  map(
    value: string | number | bigint | symbol,
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
      case 29:
        return "eyebrow-symmetry";
      case 33:
        return "iris-symmetry";
      case 36:
        return "pupil-symmetry";
      case 40:
        return "eyeshape-symmetry";
      case 46:
        return "eyelid-symmetry";
      case 50:
        return "eyebag-symmetry";
      case 53:
        return "eyelash-symmetry";
      case 80:
        return "ear-symmetry";
      default:
        return value;
    }
  }
}
