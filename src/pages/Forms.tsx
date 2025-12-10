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
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/styles/useOpacityTransition";
import useLanguage from "../lib/hooks/resources/useLanguage";
import MainFormCtx from "../lib/states/contexts/MainFormCtx";
import MainStyleForm from "../components/forms/MainStyleForm";
import { GENERIC_DICT } from "../lib/states/lang/generic";
import FormsStrategist from "../classes/FormsStrategist";
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
import HairTidinessForm from "../components/forms/hair/HairTidiness";
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
import EyebrowTrimmingForm from "../components/forms/head/eye/brow/EyebroTrimmingForm";
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

export default function Forms(): JSX.Element {
  useOpacityTransition();
  const { lang } = useLanguage(),
    dispatch = useDispatch<AppDispatch>(),
    stateOrder = useSelector(
      (s: RootState) => (s.formStrategy as unknown as FormState).order
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
                Object.entries(payload).map(([k]) => [k, true])
              ),
            };
          case "CLOSE_ALL":
            return {
              ...s,
              ...Object.fromEntries(
                Object.entries(payload).map(([k]) => [k, false])
              ),
            };
          default:
            return s;
        }
      },
      { startFormTip: false }
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
        case EyeFissureForm.name:
          return <EyeFissureForm />;
        case EyeTiltForm.name:
          return <EyeTiltForm />;
        case EyeDepthForm.name:
          return <EyeDepthForm />;
        case EyeSpacingForm.name:
          return <EyeSpacingForm />;
        default:
          return (
            <div className="text-error">
              {FORM_DICT[lang].null || "# ERROR"}
            </div>
          );
      }
    }, [stateOrder, lang]),
    handleNext = useCallback((): void => {
      dispatch(nextForm());
    }, [dispatch]),
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

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error("Error caught by boundary:", error);
        console.error("Component stack:", errorInfo.componentStack);
        alert(`An error occurred: ${error.message}`);
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
