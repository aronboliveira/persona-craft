import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useEffect, useState } from "react";
import { BodyMuscleTypes } from "../../lib/declarations/types/anatomy";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { useLaterForm } from "../../lib/hooks/useLaterForm";
import { update } from "../../redux/mainStore/formsSlice";
import { CLASSES } from "../../lib/data/classes";

export default function BodyTypeMuscleForm() {
  const { lang, dispatch, state } = useLaterForm(),
    [bdTp, setBodyType] = useState<BodyMuscleTypes>("average");
  useEffect(() => {
    dispatch(
      update({ ...state, character: { ...state.character, muscle: bdTp } })
    );
  }, [dispatch, state, bdTp]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset id="bodyTypeMuscleForm">
        <legend>{FORM_DICT[lang]?.mcl ?? "Muscle Level:"}</legend>
        {/* //TODO implement muscle level selection i18n */}
        {(
          [
            "frail",
            "weak",
            "average",
            "athletic",
            "herculean",
          ] as BodyMuscleTypes[]
        ).map(value => (
          <figure key={value}>
            <label
              htmlFor={`bodyTypeMuscle_${value}`}
              className={CLASSES.IMG_RD_LB}
            >
              <input
                className={CLASSES.IMG_RD_INP}
                type="radio"
                id={`bodyTypeMuscle_${value}`}
                name="bodyTypeMuscle"
                value={value}
                checked={bdTp === value}
                onChange={() => setBodyType(value)}
              />
              <img
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                src={`srm_fm_${value}-0${(() => {
                  return [1, 2, 3][Math.floor(Math.random() * 3)];
                })()}.png`}
                alt={value}
                style={{ objectFit: "contain" }}
              />
            </label>
            <figcaption>
              {value.slice(0, 1).toUpperCase()}
              {value.slice(1)}
            </figcaption>
          </figure>
        ))}
      </fieldset>
      <div style={{ marginTop: "20px" }}>
        <strong>Selected Body Muscle Level:</strong> {bdTp}
      </div>
    </ErrorBoundary>
  );
}
