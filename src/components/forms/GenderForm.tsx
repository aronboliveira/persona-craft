import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { CLASSES } from "../../lib/data/classes";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { useMemo } from "react";
import { update } from "../../redux/mainStore/formsSlice";
import { ValidateGender } from "../../lib/utils/validations";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { StyleSets } from "../../lib/declarations/types/helpers";
import { useLaterForm } from "../../lib/hooks/useLaterForm";

export default function GenderForm() {
  const { lang, dispatch, state, gdSelected, setGd } = useLaterForm(),
    stKey = useMemo(
      () =>
        ((): StyleSets => {
          switch (state.style) {
            case "anime":
              return "anm";
            case "cartoon":
              return "crt";
            case "photorealistic":
              return "ptr";
            case "pixel":
              return "px";
            default:
              return "sr";
          }
        })(),
      [state.style]
    ),
    handleStlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      if (ValidateGender(newValue)) {
        setGd(newValue);
        dispatch(
          update({
            ...state,
            character: { ...state.character, gender: newValue },
          })
        );
      } else setGd(gdSelected);
    };
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset id="genderForm">
        <legend id="stlLeg">{FORM_DICT[lang]?.stl ?? "Gender:"}</legend>
        {Object.entries((FORMS_OPTS.gd as Record<StyleSets, any>)[stKey]).map(
          ([k, v], i) => {
            console.log([(v as any).src]);
            return (
              <figure key={k}>
                <label htmlFor={`stl_${i + 1}`} className={CLASSES.IMG_RD_LB}>
                  <input
                    className={CLASSES.IMG_RD_INP}
                    type="radio"
                    id={`stl_${i + 1}`}
                    value={k}
                    onChange={handleStlChange}
                    name="stl"
                  />
                  <img
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    src={(v as OptDict).src}
                    alt={`${(v as OptDict).friendlyName} — ${
                      GENERIC_DICT[lang]?.img ?? "Image"
                    }`}
                    style={{ objectFit: "contain" }}
                  />
                </label>
                <figcaption>{(v as OptDict).friendlyName}</figcaption>
              </figure>
            );
          }
        )}
      </fieldset>
      <div style={{ marginTop: "20px" }}>
        <strong>Selected Style:</strong> {gdSelected}
      </div>
    </ErrorBoundary>
  );
}
