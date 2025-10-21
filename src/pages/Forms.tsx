import { JSX, useMemo, useReducer, useCallback, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import useLanguage from "../lib/hooks/useLanguage";
import MainFormCtx from "../lib/states/contexts/MainFormCtx";
import MainStyleForm from "../components/forms/MainStyleForm";
import { CLASSES } from "../lib/data/classes";
import { GENERIC_DICT } from "../lib/states/lang/generic";
import FormsStrategist from "../classes/FormsStrategist";
import { FORM_DICT } from "../lib/states/lang/forms";
import { useFormsStrategist } from "../lib/hooks/useStrategy";
import { FormState, FormAction } from "../lib/declarations/types/redux";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
import { LayoutProvider } from "../components/layouts/LayoutProvider";
import { Box, Stack } from "@mui/material";
const initialState: FormState = {
    order: 0,
  },
  formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case "NEXT_FORM":
        return { ...state, order: state.order + 1 };
      case "RESET_FORM":
        return { ...state, order: 0 };
      case "SET_ORDER":
        return { ...state, order: action.payload };
      default:
        return state;
    }
  };
export default function Forms(): JSX.Element {
  useOpacityTransition();
  const { lang } = useLanguage(),
    [state, dispatch] = useReducer<FormState, [action: FormAction]>(
      formReducer,
      initialState
    ),
    strategist = useFormsStrategist(),
    strategistRef = useRef<FormsStrategist | null>(strategist),
    selectedForm = useMemo(() => {
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
    handleNext = useCallback(() => dispatch({ type: "NEXT_FORM" }), []),
    handleReset = useCallback(() => dispatch({ type: "RESET_FORM" }), []),
    selectedFormRef = useRef<HTMLElement | null>(null);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <MainFormCtx.Provider value={{ lang }}>
        <LayoutProvider
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
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
              {selectedForm}
              <fieldset className="cta-form-pacing">
                <button
                  type="button"
                  className={CLASSES.BTN_WARN}
                  onClick={handleReset}
                >
                  {GENERIC_DICT[lang].reset}
                </button>
                <button
                  type="button"
                  className={CLASSES.BTN_INFO}
                  onClick={handleReset}
                >
                  {GENERIC_DICT[lang].return}
                </button>
                <button
                  type="button"
                  className={CLASSES.BTN_PRIM}
                  onClick={handleNext}
                >
                  {GENERIC_DICT[lang].next}
                </button>
              </fieldset>
            </Box>
          </Stack>
        </LayoutProvider>
      </MainFormCtx.Provider>
    </ErrorBoundary>
  );
}
