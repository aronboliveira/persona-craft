import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { RefObject, useState } from "react";
import { update } from "../../redux/mainStore/formsSlice";
import { ValidateImgStyle } from "../../lib/utils/validations";
import { useAppSelector } from "../../redux/mainStore/hooks";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { ImageStyle } from "../../lib/declarations/types/helpers";
import { useFormCtxStore } from "../../lib/hooks/contexts/useFormCtxStore";
import OptionFigure from "../bloc/OptionFigure";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { useLayoutCtx } from "../../lib/hooks/contexts/useLayoutCtx";
import Forms from "../../pages/Forms";
import { Typography } from "@mui/material";
export default function MainStyleForm() {
  const { lang, dispatch } = useFormCtxStore(),
    { formRef } = useLayoutCtx("mainStyleForm"),
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
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="mainStyleForm"
      >
        <Forms.Header>
          <Typography id="stlLeg" variant="h6">
            {FORM_DICT[lang]?.stl ?? "Style"}
          </Typography>
        </Forms.Header>
        {Object.entries(FORMS_OPTS.stl).map(([k, v], i) => (
          <OptionFigure
            figureAddClasses={["stl-option"]}
            prefix="stl"
            suffix={`${i + 1}`}
            value={k}
            handleChange={handleStlChange}
            name="stl"
            src={(v as OptDict).src}
            key={k}
            caption={(v as OptDict).friendlyName}
            imgAddProps={{
              alt: `${(v as OptDict).friendlyName} — ${
                GENERIC_DICT[lang]?.img ?? "Image"
              }`,
            }}
            imgStyle={{ objectFit: "contain" }}
          />
        ))}
      </fieldset>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Selected:</strong>
        <span>{stlSelected}</span>
      </Typography>
    </ErrorBoundary>
  );
}
