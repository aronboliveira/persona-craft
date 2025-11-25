import { UseOptImgListenersProps } from "../../declarations/interfaces/hooks";
import { useFormCtxStore } from "./useFormCtxStore";
import { useLayoutCtx } from "./useLayoutCtx";
import useOptImgsListeners from "./useOptImgsListeners";

export const useOptFormCtx = ({
  layoutParams,
  imgParams = { globalNumbersAlso: true },
  formParams = [],
}: {
  layoutParams: Parameters<typeof useLayoutCtx>;
  imgParams?: UseOptImgListenersProps;
  formParams?: Parameters<typeof useFormCtxStore>;
}): ReturnType<typeof useLayoutCtx> &
  ReturnType<typeof useFormCtxStore> &
  ReturnType<typeof useOptImgsListeners> => {
  const { layoutCtx, formRef } = useLayoutCtx(...layoutParams),
    validFormParams: any[] = !Array.isArray(formParams) ? [] : formParams,
    formCtx = useFormCtxStore(...(validFormParams as [])),
    optImgs = useOptImgsListeners(imgParams ?? { globalNumbersAlso: true });
  return {
    ...layoutCtx,
    formRef,
    ...(formCtx ?? ({} as any)),
    ...(optImgs ?? ({} as any)),
  };
};
