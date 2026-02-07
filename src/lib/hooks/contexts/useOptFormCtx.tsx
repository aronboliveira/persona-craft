import { UseOptImgListenersProps } from "../../declarations/interfaces/hooks";
import { useFormCtxStore } from "./useFormCtxStore";
import { useLayoutCtx } from "./useLayoutCtx";
import useOptImgsListeners from "./useOptImgsListeners";
import { useEffect } from "react";

export const useOptFormCtx = ({
  layoutParams,
  imgParams = { globalNumbersAlso: true },
  formParams = [],
  objectFit = "cover",
}: {
  layoutParams: Parameters<typeof useLayoutCtx>;
  imgParams?: UseOptImgListenersProps;
  formParams?: Parameters<typeof useFormCtxStore>;
  objectFit?: "cover" | "contain" | "scale-down";
}) => {
  const layoutHook = useLayoutCtx(...layoutParams),
    { layoutCtx, formRef } = layoutHook,
    validFormParams: Parameters<typeof useFormCtxStore> = !Array.isArray(
      formParams,
    )
      ? []
      : formParams,
    formCtx = useFormCtxStore(...(validFormParams as []));
  // Side effect hook for keyboard listeners
  useOptImgsListeners(imgParams ?? { globalNumbersAlso: true });
  useEffect(() => {
    if (!window?.document) return;
    formRef.current ??= document.querySelector(
      '[id$="Form"]:has(.option-fieldset)',
    );
    if (!(formRef.current instanceof HTMLElement)) return;
    formRef.current
      .querySelectorAll(".option-figure-img")
      .forEach((img: Element) => {
        if (img instanceof HTMLImageElement) {
          img.style.objectFit = objectFit;
        }
      });
  }, [formRef, objectFit]);
  return {
    layoutCtx,
    formRef,
    ...formCtx,
  };
};
