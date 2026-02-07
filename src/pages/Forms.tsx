import {
  JSX,
  useMemo,
  useReducer,
  useCallback,
  useRef,
  useState,
  PropsWithChildren,
  useContext,
  ActionDispatch,
  useLayoutEffect,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/styles/useOpacityTransition";
import useLanguage from "../lib/hooks/resources/useLanguage";
import MainFormCtx from "../lib/states/contexts/MainFormCtx";
import MainStyleForm from "../components/forms/MainStyleForm";
import { GENERIC_DICT } from "../lib/states/lang/generic";
import FormsStrategist from "../classes/strategists/FormsStrategist";
import { FORM_DICT } from "../lib/states/lang/forms";
import { useFormsStrategist } from "../lib/hooks/contexts/useStrategy";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
import { LayoutProvider } from "../components/layouts/LayoutProvider";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import StartFormTip from "../components/modals/tips/StartFormTip";
import { TipsState, TipsAction } from "../lib/declarations/interfaces/redux";
import { IMainFormCtx } from "../lib/declarations/interfaces/contexts";
import SideSwipe from "../components/buttons/SideSwipe";
import { NHtEl } from "../lib/declarations/types/foundations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/mainStore";
import {
  nextForm,
  previousForm,
  resetForm,
} from "../redux/mainStore/slices/formStrategySlice";
import { FormState } from "../lib/declarations/types/redux";
import { useOptionGrid } from "../lib/hooks/mount/useOptsGrid";
import HeightForm from "../components/forms/HeightForm";
import BodyFatForm from "../components/forms/BodyFatForm";
import HairTextureForm from "../components/forms/hair/HairTextureForm";
import HairBangDensityForm from "../components/forms/hair/HairBangDensityForm";
import HairBangLengthForm from "../components/forms/hair/HairBangLengthForm";
import HairTidinessForm from "../components/forms/hair/HairTidinessForm";
import HairBangShapeForm from "../components/forms/hair/HairBangShapeForm";
import HairLengthForm from "../components/forms/hair/HairLengthForm";
import ForeheadHairlineHeightForm from "../components/forms/head/forehead/ForeheadHairLineHeightForm";
import ForeheadHairlineRecidingForm from "../components/forms/head/forehead/ForeheadHairlineRecidingForm";
import ForeheadHairlineShapeForm from "../components/forms/head/forehead/ForeheadHairlineShapeForm";
import ForeheadHeightForm from "../components/forms/head/forehead/ForeheadHeightForm";
import EyebrowArchAngleForm from "../components/forms/head/eye/brow/EyebrowArchAngleForm";
import EyebrowDensityForm from "../components/forms/head/eye/brow/EyebrowDensityForm";
import EyebrowGrowthDirectionForm from "../components/forms/head/eye/brow/EyebrowGrowthDirectionForm";
import EyebrowGrowthPatternForm from "../components/forms/head/eye/brow/EyebrowGrowthPatternForm";
import EyebrowArchDistanceForm from "../components/forms/head/eye/brow/EyebrowArchDistanceForm";
import EyebrowArchHeightForm from "../components/forms/head/eye/brow/EyebrowArchHeightForm";
import EyebrowTextureForm from "../components/forms/head/eye/brow/EyebrowTextureForm";
import EyebrowHeightForm from "../components/forms/head/eye/brow/EyebrowHeightForm";
import EyebrowLengthForm from "../components/forms/head/eye/brow/EyebrowLengthForm";
import EyebrowThicknessForm from "../components/forms/head/eye/brow/EyebrowThicknessForm";
import EyebrowUnibrowForm from "../components/forms/head/eye/brow/EyebrowUnibrowForm";
import EyebrowTrimmingForm from "../components/forms/head/eye/brow/EyebrowTrimmingForm";
import EyebrowSlitAngleForm from "../components/forms/head/eye/brow/EyebrowSlitAngleForm";
import EyebrowSlitNumberForm from "../components/forms/head/eye/brow/EyebrowSlitNumberForm";
import EyeBallSizeForm from "../components/forms/head/eye/ball/EyeBallSizeForm";
import EyeColorForm from "../components/forms/head/eye/ball/EyeColorForm";
import IrisSizeForm from "../components/forms/head/eye/ball/IrisSizeForm";
import PupilPatternForm from "../components/forms/head/eye/ball/PupilPatternForm";
import PupilSizeForm from "../components/forms/head/eye/ball/PupilSizeForm";
import EyeFissureForm from "../components/forms/head/eye/shape/EyeFissureForm";
import EyeTiltForm from "../components/forms/head/eye/shape/EyeTiltForm";
import EyeDepthForm from "../components/forms/head/eye/shape/EyeDepthForm";
import EyeSpacingForm from "../components/forms/head/eye/shape/EyeSpacingForm";
import EyeLidCreaseNumberForm from "../components/forms/head/eye/shape/EyeLidCreaseNumberForm";
import EyeLidCreaseHeightForm from "../components/forms/head/eye/shape/EyeLidCreaseHeightForm";
import EyeLidEpicanthicFoldExtensionForm from "../components/forms/head/eye/shape/EyeLidEpicanthicFoldExtensionForm";
import EyeLidEpicanthicFoldClassForm from "../components/forms/head/eye/shape/EyeLidEpicanthicFoldClassForm";
import EyeBagCountorForm from "../components/forms/head/eye/bag/EyeBagCountorForm";
import EyeBagColorForm from "../components/forms/head/eye/bag/EyeBagColorForm";
import EyeLashesDensityForm from "../components/forms/head/eye/lash/EyeLashesDensityForm";
import EyeLashesLengthForm from "../components/forms/head/eye/lash/EyeLashesLengthForm";
import EyeLashesCurlForm from "../components/forms/head/eye/lash/EyeLashesCurlForm";
import EyeHoodForm from "../components/forms/head/eye/shape/EyeHoodForm";
import AccessibilityHandler from "../lib/utils/AcessibilityHandler";
import ErrorHandler from "../lib/utils/ErrorHandler";
import LowerLipShapeForm from "../components/forms/head/mouth/lips/lower/LowerLipShapeForm";
import UpperLipVolumeForm from "../components/forms/head/mouth/lips/upper/UpperLipVolumeForm";
import LipTuberculeProminenceForm from "../components/forms/head/mouth/lips/upper/tubercule/LipTuberculeProminenceForm";
import LipTuberculeShapeForm from "../components/forms/head/mouth/lips/upper/tubercule/LipTuberculeShapeForm";
import CupidBowHeightForm from "../components/forms/head/mouth/lips/upper/bow/CupidBowHeightForm";
import CupidBowWidthForm from "../components/forms/head/mouth/lips/upper/bow/CupidBowWidthForm";
import LowerLipVolumeForm from "../components/forms/head/mouth/lips/lower/LowerLipVolumeForm";
import LipsVermillionForm from "../components/forms/head/mouth/lips/LipsVermillionForm";
import MouthCommissureAngleForm from "../components/forms/head/mouth/MouthCommissureAngleForm";
import MouthCommissureShapeForm from "../components/forms/head/mouth/MouthCommissureShapeForm";
import MouthDimpleSizeForm from "../components/forms/head/mouth/MouthDimpleSizeForm";
import MouthDimpleShapeForm from "../components/forms/head/mouth/MouthDimpleShapeForm";
import EthnicityForm from "../components/forms/skin/EthnicityForm";
import SkinToneForm from "../components/forms/skin/SkinToneForm";
import SkinUndertoneForm from "../components/forms/skin/SkinUndertoneForm";
import NoseShapeForm from "../components/forms/head/nose/NoseShapeForm";
import NoseBridgeWidthForm from "../components/forms/head/nose/NoseBridgeWidthForm";
import NoseBridgeHeightForm from "../components/forms/head/nose/NoseBridgeHeightForm";
import NoseNostrilSizeForm from "../components/forms/head/nose/NoseNostrilSizeForm";
import NoseNostrilFlareForm from "../components/forms/head/nose/NoseNostrilFlareForm";
import NoseLengthForm from "../components/forms/head/nose/NoseLengthForm";
import NoseTipAngleForm from "../components/forms/head/nose/NoseTipAngleForm";
import EarSizeForm from "../components/forms/head/ear/EarSizeForm";
import EarShapeForm from "../components/forms/head/ear/EarShapeForm";
import EarLobeForm from "../components/forms/head/ear/EarLobeForm";
import EarAngleForm from "../components/forms/head/ear/EarAngleForm";
import EarWidthForm from "../components/forms/head/ear/EarWidthForm";
import ChinProjectionForm from "../components/forms/head/chin/ChinProjectionForm";
import ChinPrognathismForm from "../components/forms/head/chin/ChinPrognathismForm";
import ChinWidthForm from "../components/forms/head/chin/ChinWidthForm";
import ChinHeightForm from "../components/forms/head/chin/ChinHeightForm";
import ChinCleftForm from "../components/forms/head/chin/ChinCleftForm";
import TattooStyleForm from "../components/forms/body/modifications/TattooStyleForm";
import TattooPlacementForm from "../components/forms/body/modifications/TattooPlacementForm";
import TattooCoverageForm from "../components/forms/body/modifications/TattooCoverageForm";
import PiercingTypeForm from "../components/forms/body/modifications/PiercingTypeForm";
import ScarTypeForm from "../components/forms/body/modifications/ScarTypeForm";
import ScarPlacementForm from "../components/forms/body/modifications/ScarPlacementForm";
import ScarProminenceForm from "../components/forms/body/modifications/ScarProminenceForm";
import useUrlFormSync from "../lib/hooks/sync/useUrlFormSync";
import SymmetryForm from "../components/forms/SymmetryForm";
import toast from "react-hot-toast";

export default function Forms(): JSX.Element {
  useOpacityTransition();
  // Sync form state with URL query params (storage/cache takes precedence)
  useUrlFormSync();
  const { lang } = useLanguage(),
    mainRef = useRef<NHtEl>(null),
    mainId = "main-forms-stack-section",
    dispatch = useDispatch<AppDispatch>(),
    stateOrder = useSelector(
      (s: RootState) => (s.formStrategy as unknown as FormState).order,
    ),
    [, setColumnRepeat] = useState<number>(2),
    [tipsState, dispatchTips] = useReducer<TipsState, [action: TipsAction]>(
      (s: TipsState, a: TipsAction): TipsState => {
        const payload = a?.payload || s;
        switch (a.type) {
          case "OPEN_START_TIP":
            return { ...s, startFormTip: true };
          case "CLOSE_START_TIP":
            return { ...s, startFormTip: false };
          case "OPEN_ALL":
            return {
              ...s,
              ...Object.fromEntries(
                Object.entries(payload).map(([k]) => [k, true]),
              ),
            };
          case "CLOSE_ALL":
            return {
              ...s,
              ...Object.fromEntries(
                Object.entries(payload).map(([k]) => [k, false]),
              ),
            };
          default:
            return s;
        }
      },
      { startFormTip: false },
    ),
    strategist = useFormsStrategist(),
    strategistRef = useRef<FormsStrategist | null>(strategist),
    selectedForm = useMemo<JSX.Element>(() => {
      strategistRef.current ??= new FormsStrategist();
      switch (
        strategistRef.current.render({ order: stateOrder }) // ? this is a custom method, not a React.Root.prototype.render
      ) {
        case MainStyleForm.name:
          return <MainStyleForm />;
        // * body sillouhette
        case GenderForm.name:
          return <GenderForm />;
        case BodyTypeMuscleForm.name:
          return <BodyTypeMuscleForm />;
        case HeightForm.name:
          return <HeightForm />;
        case BodyFatForm.name:
          return <BodyFatForm />;
        // * hair
        case HairTextureForm.name:
          return <HairTextureForm />;
        case HairLengthForm.name:
          return <HairLengthForm />;
        case HairTidinessForm.name:
          return <HairTidinessForm />;
        case HairBangDensityForm.name:
          return <HairBangDensityForm />;
        case HairBangLengthForm.name:
          return <HairBangLengthForm />;
        case HairBangShapeForm.name:
          return <HairBangShapeForm />;
        // * forehead
        case ForeheadHairlineHeightForm.name:
          return <ForeheadHairlineHeightForm />;
        case ForeheadHairlineRecidingForm.name:
          return <ForeheadHairlineRecidingForm />;
        case ForeheadHairlineShapeForm.name:
          return <ForeheadHairlineShapeForm />;
        case ForeheadHeightForm.name:
          return <ForeheadHeightForm />;
        // * eyebrow general form
        case EyebrowLengthForm.name:
          return <EyebrowLengthForm />;
        case EyebrowHeightForm.name:
          return <EyebrowHeightForm />;
        case EyebrowTextureForm.name:
          return <EyebrowTextureForm />;
        case EyebrowThicknessForm.name:
          return <EyebrowThicknessForm />;
        case EyebrowDensityForm.name:
          return <EyebrowDensityForm />;
        case EyebrowGrowthDirectionForm.name:
          return <EyebrowGrowthDirectionForm />;
        case EyebrowGrowthPatternForm.name:
          return <EyebrowGrowthPatternForm />;
        // * eyebrow arch
        case EyebrowArchAngleForm.name:
          return <EyebrowArchAngleForm />;
        case EyebrowArchDistanceForm.name:
          return <EyebrowArchDistanceForm />;
        case EyebrowArchHeightForm.name:
          return <EyebrowArchHeightForm />;
        // * eyebrow others
        case EyebrowUnibrowForm.name:
          return <EyebrowUnibrowForm />;
        case EyebrowTrimmingForm.name:
          return <EyebrowTrimmingForm />;
        case EyebrowSlitAngleForm.name:
          return <EyebrowSlitAngleForm />;
        case EyebrowSlitNumberForm.name:
          return <EyebrowSlitNumberForm />;
        // * eye ball
        case EyeBallSizeForm.name:
          return <EyeBallSizeForm />;
        case EyeColorForm.name:
          return <EyeColorForm />;
        case IrisSizeForm.name:
          return <IrisSizeForm />;
        case PupilPatternForm.name:
          return <PupilPatternForm />;
        case PupilSizeForm.name:
          return <PupilSizeForm />;
        // * eye shape (skin + bone structure)
        case EyeFissureForm.name:
          return <EyeFissureForm />;
        case EyeTiltForm.name:
          return <EyeTiltForm />;
        case EyeDepthForm.name:
          return <EyeDepthForm />;
        case EyeSpacingForm.name:
          return <EyeSpacingForm />;
        case EyeHoodForm.name:
          return <EyeHoodForm />;
        // * eyelid
        case EyeLidCreaseNumberForm.name:
          return <EyeLidCreaseNumberForm />;
        case EyeLidCreaseHeightForm.name:
          return <EyeLidCreaseHeightForm />;
        case EyeLidEpicanthicFoldExtensionForm.name:
          return <EyeLidEpicanthicFoldExtensionForm />;
        case EyeLidEpicanthicFoldClassForm.name:
          return <EyeLidEpicanthicFoldClassForm />;
        // * eyebag
        case EyeBagCountorForm.name:
          return <EyeBagCountorForm />;
        case EyeBagColorForm.name:
          return <EyeBagColorForm />;
        // * eyelashes
        case EyeLashesDensityForm.name:
          return <EyeLashesDensityForm />;
        case EyeLashesLengthForm.name:
          return <EyeLashesLengthForm />;
        case EyeLashesCurlForm.name:
          return <EyeLashesCurlForm />;
        // * mouth
        case UpperLipVolumeForm.name:
          return <UpperLipVolumeForm />;
        case LipTuberculeProminenceForm.name:
          return <LipTuberculeProminenceForm />;
        case LipTuberculeShapeForm.name:
          return <LipTuberculeShapeForm />;
        case CupidBowWidthForm.name:
          return <CupidBowWidthForm />;
        case CupidBowHeightForm.name:
          return <CupidBowHeightForm />;
        case LowerLipVolumeForm.name:
          return <LowerLipVolumeForm />;
        case LowerLipShapeForm.name:
          return <LowerLipShapeForm />;
        case LipsVermillionForm.name:
          return <LipsVermillionForm />;
        case MouthCommissureAngleForm.name:
          return <MouthCommissureAngleForm />;
        case MouthCommissureShapeForm.name:
          return <MouthCommissureShapeForm />;
        case MouthDimpleSizeForm.name:
          return <MouthDimpleSizeForm />;
        case MouthDimpleShapeForm.name:
          return <MouthDimpleShapeForm />;
        // * skin & ethnicity
        case EthnicityForm.name:
          return <EthnicityForm />;
        case SkinToneForm.name:
          return <SkinToneForm />;
        case SkinUndertoneForm.name:
          return <SkinUndertoneForm />;
        // * nose
        case NoseShapeForm.name:
          return <NoseShapeForm />;
        case NoseBridgeWidthForm.name:
          return <NoseBridgeWidthForm />;
        case NoseBridgeHeightForm.name:
          return <NoseBridgeHeightForm />;
        case NoseNostrilSizeForm.name:
          return <NoseNostrilSizeForm />;
        case NoseNostrilFlareForm.name:
          return <NoseNostrilFlareForm />;
        case NoseLengthForm.name:
          return <NoseLengthForm />;
        case NoseTipAngleForm.name:
          return <NoseTipAngleForm />;
        // * ear
        case EarSizeForm.name:
          return <EarSizeForm />;
        case EarShapeForm.name:
          return <EarShapeForm />;
        case EarLobeForm.name:
          return <EarLobeForm />;
        case EarAngleForm.name:
          return <EarAngleForm />;
        case EarWidthForm.name:
          return <EarWidthForm />;
        // * chin
        case ChinProjectionForm.name:
          return <ChinProjectionForm />;
        case ChinPrognathismForm.name:
          return <ChinPrognathismForm />;
        case ChinWidthForm.name:
          return <ChinWidthForm />;
        case ChinHeightForm.name:
          return <ChinHeightForm />;
        case ChinCleftForm.name:
          return <ChinCleftForm />;
        // * body modifications
        case TattooStyleForm.name:
          return <TattooStyleForm />;
        case TattooPlacementForm.name:
          return <TattooPlacementForm />;
        case TattooCoverageForm.name:
          return <TattooCoverageForm />;
        case PiercingTypeForm.name:
          return <PiercingTypeForm />;
        case ScarTypeForm.name:
          return <ScarTypeForm />;
        case ScarPlacementForm.name:
          return <ScarPlacementForm />;
        case ScarProminenceForm.name:
          return <ScarProminenceForm />;
        // * symmetry forms (placeholders)
        case "symmetry": {
          // Determine feature name based on order
          const symmetryFeatures: Record<number, string> = {
            29: "Eyebrow",
            33: "Iris",
            36: "Pupil",
            40: "Eye Shape",
            46: "Eyelid",
            50: "Eye Bag",
            53: "Eyelash",
            80: "Ear",
          };
          const featureName = symmetryFeatures[stateOrder] || "Feature";
          return <SymmetryForm featureName={featureName} />;
        }
        default:
          return (
            <div className="text-error">
              {FORM_DICT[lang].null || "# ERROR"}
            </div>
          );
      }
    }, [stateOrder, lang]),
    handleNext = useCallback((): void => {
      // Check if we're at the last form (93 is the max)
      if (stateOrder >= 93) {
        toast("🎉 You've completed all character creation forms!", {
          duration: 5000,
          position: "top-center",
          icon: "✅",
          style: {
            background: "#10b981",
            color: "#fff",
          },
        });
        return; // Don't increment further
      }
      dispatch(nextForm());
    }, [dispatch, stateOrder]),
    handlePrevious = useCallback((): void => {
      dispatch(previousForm());
    }, [dispatch]),
    handleReset = useCallback((): void => {
      dispatch(resetForm());
    }, [dispatch]),
    selectedFormRef = useRef<NHtEl>(null);
  useOptionGrid({
    selectedFormRef,
    setColumns: setColumnRepeat,
    order: stateOrder,
  });
  useLayoutEffect(() => {
    mainRef.current ??= document.getElementById(mainId) as NHtEl;
    mainRef.current && AccessibilityHandler.trackAriaState(mainRef.current);
  }, [mainRef]);
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        ErrorHandler.handleReactBoundaryError({
          error,
          info: errorInfo,
          alertType: "hot",
        });
      }}
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <MainFormCtx.Provider
        value={{
          lang,
          tipsState,
          dispatchTips,
          handleNext,
          handleReset,
          handlePrevious,
        }}
      >
        <LayoutProvider
          style={{
            display: "grid",
            // gridTemplateColumns: `repeat(${columnRepeat}, 1fr)`,
            gridAutoFlow: "row",
          }}
          classNameMap={{}}
          selectedFormRef={selectedFormRef}
        >
          <Stack
            component="section"
            alignItems={"center"}
            sx={{ px: 2, py: 3 }}
            ref={mainRef}
            id={mainId}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "max-content",
                bgcolor: "grey.900",
                borderRadius: 2,
              }}
            >
              <Forms.Body>{selectedForm}</Forms.Body>
              <Forms.Actions>
                <fieldset className="cta-form-pacing">
                  <Button color="warning" onClick={handleReset}>
                    {GENERIC_DICT[lang].reset}
                  </Button>
                  <Button color="info" onClick={handlePrevious}>
                    {GENERIC_DICT[lang].return}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    style={{ color: "#ffffff" }}
                  >
                    {GENERIC_DICT[lang].next}
                  </Button>
                </fieldset>
              </Forms.Actions>
            </Box>
          </Stack>
        </LayoutProvider>
      </MainFormCtx.Provider>
    </ErrorBoundary>
  );
}

function Header({
  children,
  id,
  containerId,
}: PropsWithChildren & { id?: string; containerId?: string }) {
  return (
    <Typography id={containerId} variant="h4" fontWeight={"bold"}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
        sx={{ p: 2, pb: 1 }}
        id={id}
      >
        {children}
      </Stack>
    </Typography>
  );
}

function Body({ children }: PropsWithChildren) {
  const ctx = useContext<IMainFormCtx>(MainFormCtx);
  let tipsState: TipsState = { startFormTip: false },
    tipsDispatch = null;
  if (ctx) {
    tipsState = ctx.tipsState;
    tipsDispatch = ctx.dispatchTips as ActionDispatch<[a: TipsAction]>;
  }
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {children}
      <StartFormTip state={tipsState} dispatch={tipsDispatch ?? (() => {})} />
      <SideSwipe />
    </Stack>
  );
}

function Result({ variable }: { variable: string }) {
  return (
    <Typography
      variant="body2"
      sx={{ mt: 1 }}
      fontSize={"1.5rem"}
      className="result-display"
    >
      <strong>Selected:&nbsp;</strong>
      <span>{variable}</span>
    </Typography>
  );
}

function Actions({ children }: PropsWithChildren) {
  return (
    <>
      <Divider />
      <Stack
        direction={"row"}
        spacing={1.5}
        justifyContent={"space-evenly"}
        sx={{ p: 2 }}
      >
        {children}
      </Stack>
    </>
  );
}

Forms.Header = Header;
Forms.Body = Body;
Forms.Actions = Actions;
Forms.Result = Result;
