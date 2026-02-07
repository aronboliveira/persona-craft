import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { RefObject, useCallback } from "react"; // * removed useState, now using Redux as single source of truth
import OptionFieldset from "../bloc/OptionFieldset";
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { ValidateImgStyle } from "../../lib/utils/validations";
import { useAppSelector, useAppDispatch } from "../../redux/mainStore/hooks"; // * added useAppDispatch to use the Redux store dispatcher
import { OptDict } from "../../lib/declarations/interfaces/utils";
import OptionFigure from "../bloc/OptionFigure";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import Forms from "../../pages/Forms";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import { PromptState } from "../../lib/declarations/interfaces/redux";
import { RootState } from "../../redux/mainStore";
import APP_IDS from "../../lib/data/ids";
import { CLASSES } from "../../lib/data/classes";

export default function MainStyleForm() {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: [APP_IDS["FORM_ID"]],
  }); // * no longer reading dispatch from this context; it only provides layout-related items
  const dispatch = useAppDispatch(); // * use Redux dispatch explicitly
  const selectedStl = useAppSelector(
    (s: RootState) => (s.prompt as PromptState).style,
  ); // * style is taken directly from Redux, no local mirror state

  const handleStlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      if (ValidateImgStyle(newValue)) {
        dispatch(updatePrompt({ style: newValue })); // * update Redux only; component becomes fully controlled
      }
    },
    [dispatch], // * dependencies simplified (removed local state)
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id={APP_IDS["FORM_ID"]}
      >
        <Forms.Header containerId="stlLeg" id="stlLegStack">
          {FORM_DICT[lang]?.stl ?? "Style"}
        </Forms.Header>
        <OptionFieldset selector="stl">
          {Object.entries(FORMS_OPTS.stl).map(([k, v], i) => {
            const opt = v as OptDict; // * avoid repeating the cast inline

            return (
              <OptionFigure
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="stl"
                suffix={`${i + 1}`}
                value={k}
                checked={selectedStl === k} // * controlled checked state derived from Redux
                handleChange={handleStlChange}
                name="stl"
                src={opt.src}
                key={k}
                caption={opt.friendlyName}
                imgAddProps={{
                  alt: `${opt.friendlyName} — ${
                    GENERIC_DICT[lang]?.img ?? "Image"
                  }`,
                }}
                imgStyle={{ objectFit: "contain" }}
              />
            );
          })}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={selectedStl} />{" "}
      {/* * result now reflects the Redux style directly */}
    </ErrorBoundary>
  );
}
