import { JSX, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../components/errors/GenericErrorComponent";
import useOpacityTransition from "../lib/hooks/useOpacityTransition";
import useLanguage from "../lib/hooks/useLanguage";
import { useAppDispatch, useAppSelector } from "../redux/mainStore/hooks";
import { update } from "../redux/mainStore/formsSlice";
import { FORM_DICT } from "../lib/states/lang/forms";
import { FORMS_OPTS } from "../lib/data/opts";
import { CLASSES } from "../lib/data/classes";
import { GENERIC_DICT } from "../lib/states/lang/generic";
import { ImageStyle } from "../lib/declarations/types/helpers";

export default function Forms(): JSX.Element {
  useOpacityTransition();
  const { lang } = useLanguage(),
    dispatch = useAppDispatch(),
    selectedStl = useAppSelector(s => s.style),
    [stlSelected, setStl] = useState<string>(selectedStl),
    handleStlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value,
        isValid = (v: string): v is ImageStyle =>
          [
            "anime",
            "photorealistic",
            "sketch",
            "cartoon",
            "pixel",
            "semi-realistic",
          ].includes(v);
      if (isValid(newValue)) {
        setStl(newValue);
        dispatch(update({ style: newValue }));
      } else setStl(stlSelected);
    };
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <form>
        <fieldset>
          <legend id="stlLeg">{FORM_DICT[lang].stl}</legend>
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
                  src={v.src}
                  alt={`${v.friendlyName} — ${
                    GENERIC_DICT[lang]?.img ?? "Image"
                  }`}
                />
              </label>
              <figcaption>{v.friendlyName}</figcaption>
            </figure>
          ))}
        </fieldset>
        <div style={{ marginTop: "20px" }}>
          <strong>Selected STL:</strong> {stlSelected}
        </div>
      </form>
    </ErrorBoundary>
  );
}
