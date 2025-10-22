import {
  JSX,
  useMemo,
  useReducer,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
  PropsWithChildren,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/styles/useOpacityTransition";
import useLanguage from "../lib/hooks/resources/useLanguage";
import MainFormCtx from "../lib/states/contexts/MainFormCtx";
import MainStyleForm from "../components/forms/MainStyleForm";
import { CLASSES } from "../lib/data/classes";
import { GENERIC_DICT } from "../lib/states/lang/generic";
import FormsStrategist from "../classes/FormsStrategist";
import { FORM_DICT } from "../lib/states/lang/forms";
import { useFormsStrategist } from "../lib/hooks/contexts/useStrategy";
import { FormState, FormAction } from "../lib/declarations/types/redux";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
import { LayoutProvider } from "../components/layouts/LayoutProvider";
import { Box, Button, Divider, Stack } from "@mui/material";
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
    [columnRepeat, setColumnRepeat] = useState(2),
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
      <MainFormCtx.Provider value={{ lang }}>
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
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleReset}
                  >
                    {GENERIC_DICT[lang].reset}
                  </Button>
                  <Button variant="outlined" color="info" onClick={handleReset}>
                    {GENERIC_DICT[lang].return}
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
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
      justifyContent={"space-between"}
      spacing={2}
      sx={{ p: 2, pb: 1 }}
      id={id}
    >
      {children}
    </Stack>
  );
}
function Body({ children }: PropsWithChildren) {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {children}
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
        justifyContent={"flex-end"}
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
