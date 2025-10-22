import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { CLASSES } from "../../lib/data/classes";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { useState } from "react";
import { update } from "../../redux/mainStore/formsSlice";
import { ValidateImgStyle } from "../../lib/utils/validations";
import { useAppSelector } from "../../redux/mainStore/hooks";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { ImageStyle } from "../../lib/declarations/types/helpers";
import { useFormCtxStore } from "../../lib/hooks/contexts/useFormCtxStore";

export default function NarrativeForm() {
  const { lang, dispatch } = useFormCtxStore(),
    selectedStl = useAppSelector(s => s.style),
    [stlSelected, setStl] = useState<ImageStyle>(selectedStl),
    handleStlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      if (ValidateImgStyle(newValue)) {
        setStl(newValue);
        dispatch(update({ style: newValue }));
      } else setStl(stlSelected);
    };
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset id="mainStyleForm">
        <legend id="stlLeg">{FORM_DICT[lang]?.stl ?? "Style:"}</legend>
        {Object.entries(FORMS_OPTS.stl).map(([k, v], i) => (
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
        ))}
      </fieldset>
      <div style={{ marginTop: "20px" }}>
        <strong>Selected Style:</strong> {stlSelected}
      </div>
    </ErrorBoundary>
  );
}
