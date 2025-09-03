import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { CLASSES } from "../../lib/data/classes";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { DEFAULTS } from "../../lib/states/default";
import { useContext, useState } from "react";
import { IMainFormCtx } from "../../lib/declarations/interfaces/contexts";
import MainFormCtx from "../../lib/states/contexts/MainFormCtx";
import { update } from "../../redux/mainStore/formsSlice";
import { ValidateImgStyle, ValidateLang } from "../../lib/utils/validations";
import { AvailableLang } from "../../lib/declarations/types/utils";
import { useAppSelector } from "../../redux/mainStore/hooks";
import { useDispatch } from "react-redux";
import { FormsAppDispatch } from "../../lib/declarations/types/redux";

export default function MainStyleForm() {
  let lang: AvailableLang = DEFAULTS.lang;
  const ctx = useContext<IMainFormCtx>(MainFormCtx),
    dispatch = useDispatch<FormsAppDispatch>();
  if (ctx && ValidateLang(ctx.lang)) lang = ctx.lang;
  const selectedStl = useAppSelector(s => s.style),
    [stlSelected, setStl] = useState<string>(selectedStl),
    handleStlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (ValidateImgStyle(newValue)) {
        setStl(newValue);
        dispatch(update({ style: newValue }));
      } else setStl(stlSelected);
    };
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
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
    </ErrorBoundary>
  );
}
