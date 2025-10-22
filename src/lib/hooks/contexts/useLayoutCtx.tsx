import { RefObject, useContext, useEffect, useRef } from "react";
import { ILayoutCtx } from "../../declarations/interfaces/contexts";
import { LayoutCtx } from "../../states/contexts/LayoutCtx";
import { StringStyleKeys } from "../../declarations/types/helpers";

export function useLayoutCtx(
  idf: string,
  applyLayoutStyle: boolean = true
): {
  layoutCtx: ILayoutCtx | null;
  formRef: RefObject<HTMLFieldSetElement | HTMLFormElement | null>;
} {
  const layoutCtx = useContext<ILayoutCtx | null>(LayoutCtx);
  let formRef = useRef<HTMLFieldSetElement | HTMLFormElement | null>(null);
  if (layoutCtx && "selectedFormRef" in layoutCtx)
    formRef = layoutCtx.selectedFormRef as RefObject<
      HTMLFieldSetElement | HTMLFormElement
    >;
  useEffect(() => {
    if (!layoutCtx || !applyLayoutStyle) return;
    formRef.current ??= document.getElementById(idf) as
      | HTMLFieldSetElement
      | HTMLFormElement
      | null;
    if (!layoutCtx?.style) return;
    const desc = Object.getOwnPropertyDescriptors(
      (formRef.current as HTMLFieldSetElement | HTMLFormElement).style
    );
    Object.entries(layoutCtx.style).forEach(([key, value]) => {
      if (
        (!desc ||
          desc[key as keyof HTMLFieldSetElement | keyof HTMLFormElement]
            ?.writable) &&
        formRef.current instanceof HTMLElement
      )
        formRef.current.style[key as StringStyleKeys] = value as string;
    });
  }, [layoutCtx, formRef, applyLayoutStyle, idf]);
  return { layoutCtx, formRef };
}
