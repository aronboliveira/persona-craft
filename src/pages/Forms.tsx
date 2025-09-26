import { JSX, useMemo, useReducer, useCallback, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import useLanguage from "../lib/hooks/useLanguage";
import MainFormContext from "../lib/states/contexts/MainFormCtx";
import MainStyleForm from "../components/forms/MainStyleForm";
import { CLASSES } from "../lib/data/classes";
import { GENERIC_DICT } from "../lib/states/lang/generic";
import FormsStrategist from "../classes/FormsStrategist";
import { FORM_DICT } from "../lib/states/lang/forms";
import { useFormsStrategist } from "../lib/hooks/useStrategy";
import { FormState, FormAction } from "../lib/declarations/types/redux";
import GenderForm from "../components/forms/GenderForm";
import BodyTypeMuscleForm from "../components/forms/BodyTypeMuscleForm";
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
    handleReset = useCallback(() => dispatch({ type: "RESET_FORM" }), []);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <MainFormContext value={{ lang }}>
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
      </MainFormContext>
    </ErrorBoundary>
  );
}
