import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { update } from "../../redux/mainStore/formsSlice";
import { ValidateImgStyle } from "../../lib/utils/validations";
import { useAppSelector } from "../../redux/mainStore/hooks";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { ImageStyle } from "../../lib/declarations/types/helpers";
import { useFormCtxStore } from "../../lib/hooks/useFormCtxStore";
import OptionFigure from "../bloc/OptionFigure";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { ILayoutCtx } from "../../lib/declarations/interfaces/contexts";
import { LayoutCtx } from "../../lib/states/contexts/LayoutCtx";
type StringStyleKeys = {
  [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string
    ? K
    : never;
}[keyof CSSStyleDeclaration];

export default function MainStyleForm() {
  const { lang, dispatch } = useFormCtxStore(),
    selectedStl = useAppSelector(s => s.style),
    [stlSelected, setStl] = useState<ImageStyle>(selectedStl),
    layoutCtx = useContext<ILayoutCtx | null>(LayoutCtx),
    handleStlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      if (ValidateImgStyle(newValue)) {
        setStl(newValue);
        dispatch(update({ style: newValue }));
      } else setStl(stlSelected);
    };
  let formRef = useRef<HTMLFieldSetElement | null>(null);
  if (layoutCtx && "selectedFormRef" in layoutCtx)
    formRef = layoutCtx.selectedFormRef as RefObject<HTMLFieldSetElement>;
  useEffect(() => {
    if (!layoutCtx) return;
    formRef.current ??= document.getElementById(
      "mainStyleForm"
    ) as HTMLFieldSetElement | null;
    if (!layoutCtx?.style) return;
    console.log(layoutCtx.style);
    const desc = Object.getOwnPropertyDescriptors(
      (formRef.current as HTMLFieldSetElement).style
    );
    console.log(desc);
    Object.entries(layoutCtx.style).forEach(([key, value]) => {
      if (
        (!desc || desc[key as keyof HTMLFieldSetElement]?.writable) &&
        formRef.current instanceof HTMLElement
      )
        formRef.current.style[key as StringStyleKeys] = value as string;
    });
    console.log(
      getComputedStyle(formRef.current as HTMLFieldSetElement).display
    );
  }, [layoutCtx, formRef]);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="mainStyleForm"
      >
        <legend id="stlLeg">{FORM_DICT[lang]?.stl ?? "Style:"}</legend>
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
      <div style={{ marginTop: "20px" }}>
        <strong>Selected Style:</strong> {stlSelected}
      </div>
    </ErrorBoundary>
  );
}
