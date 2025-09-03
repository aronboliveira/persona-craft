import { JSX, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import useLanguage from "../lib/hooks/useLanguage";
import MainFormContext from "../lib/states/contexts/MainFormCtx";
import MainStyleForm from "../components/forms/MainStyleForm";
import { CLASSES } from "../lib/data/classes";
import { GENERIC_DICT } from "../lib/states/lang/generic";
export default function Forms(): JSX.Element {
  useOpacityTransition();
  const { lang } = useLanguage(),
    [selectedForm, setForm] = useState<JSX.Element>(<MainStyleForm />);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <MainFormContext value={{ lang }}>
        {selectedForm}
        <fieldset className="cta-form-pacing">
          <button
            type="button"
            className={CLASSES.BTN_INFO}
            onClick={() => setForm(<MainStyleForm />)}
          >
            {GENERIC_DICT[lang].return}
          </button>
          <button
            type="button"
            className={CLASSES.BTN_WARN}
            onClick={() => setForm(<MainStyleForm />)}
          >
            {GENERIC_DICT[lang].reset}
          </button>
          <button
            type="button"
            className={CLASSES.BTN_PRIM}
            onClick={() => setForm(<></>)}
          >
            {GENERIC_DICT[lang].next}
          </button>
        </fieldset>
      </MainFormContext>
    </ErrorBoundary>
  );
}
