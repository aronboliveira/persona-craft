import {
  JSX,
  useMemo,
  useReducer,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
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
import { FormState, FormReducerAction } from "../lib/declarations/types/redux";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
import { LayoutProvider } from "../components/layouts/LayoutProvider";
import { Box, Button, Divider, Stack } from "@mui/material";
import StartFormTip from "../components/modals/tips/StartFormTip";
import { TipsState, TipsAction } from "../lib/declarations/interfaces/redux";
import { IMainFormCtx } from "../lib/declarations/interfaces/contexts";
import SideSwipe from "../components/buttons/SideSwipe";
import { NHtEl } from "../lib/declarations/types/foundations";
export default function Forms(): JSX.Element {
  useOpacityTransition();
  const { lang } = useLanguage(),
    [state, dispatch] = useReducer<FormState, [action: FormReducerAction]>(
      (state: FormState, action: FormReducerAction): FormState => {
        switch (action.type) {
          case "NEXT_FORM":
            return { ...state, order: state.order + 1 };
          case "PREVIOUS_FORM":
            return {
              ...state,
              order: state.order - 1 >= 0 ? state.order - 1 : 0,
            };
          case "RESET_FORM":
            return { ...state, order: 0 };
          case "SET_ORDER":
            return { ...state, order: action.payload ?? 0 };
          default:
            return state;
        }
      },
      {
        order: 0,
      }
    ),
    [columnRepeat, setColumnRepeat] = useState<number>(2),
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
      switch (strategistRef.current.render({ order: state.order })) {
        case MainStyleForm.name:
          return <MainStyleForm />;
        case GenderForm.name:
          return <GenderForm />;
        case BodyTypeMuscleForm.name:
          return <BodyTypeMuscleForm />;
        default:
          return (
            <div className="text-error">
              {FORM_DICT[lang].null || "# ERROR"}
            </div>
          );
      }
    }, [state.order, lang]),
    handleNext: () => void = useCallback<() => void>(
      (): void => dispatch({ type: "NEXT_FORM" }),
      []
    ),
    handlePrevious: () => void = useCallback<() => void>(
      (): void => dispatch({ type: "PREVIOUS_FORM" }),
      []
    ),
    handleReset: () => void = useCallback<() => void>(
      (): void => dispatch({ type: "RESET_FORM" }),
      []
    ),
    selectedFormRef = useRef<NHtEl>(null);
  useLayoutEffect(() => {
    const imgCls = "option-figure-img",
      optImgs =
        selectedFormRef.current instanceof HTMLElement
          ? selectedFormRef.current.querySelectorAll(`.${imgCls}`)
          : document.getElementsByClassName(imgCls);
    console.log(optImgs.length);
    setColumnRepeat(
      optImgs.length % 2 === 0 ? optImgs.length * 0.5 : optImgs.length * 0.5 + 1
    );
  }, [selectedFormRef, state.order]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <MainFormCtx.Provider
        value={{
          lang,
          tipsState,
          dispatchTips,
          handleNext,
          handleReset,
          handlePrevious,
          formState: state,
          formDispatch: dispatch,
        }}
      >
        <LayoutProvider
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columnRepeat}, 1fr)`,
            gridAutoFlow: "row",
          }}
          classNameMap={{}}
          selectedFormRef={selectedFormRef}
          formState={state}
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
                  <Button color="info" onClick={handleReset}>
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
function Header({ children, id }: PropsWithChildren & { id?: string }) {
  return (
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
