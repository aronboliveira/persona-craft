import { UseOptImgListenersProps } from "../../declarations/interfaces/hooks";
import { useFormCtxStore } from "./useFormCtxStore";
import { useLayoutCtx } from "./useLayoutCtx";
import useOptImgsListeners from "./useOptImgsListeners";

export const useOptFormCtx = ({
  layoutParams,
  imgParams,
  formParams = [],
}: {
  layoutParams: Parameters<typeof useLayoutCtx>;
  imgParams: UseOptImgListenersProps;
  formParams: Parameters<typeof useFormCtxStore>;
}): ReturnType<typeof useLayoutCtx> &
  ReturnType<typeof useFormCtxStore> &
  ReturnType<typeof useOptImgsListeners> => {
  const { layoutCtx, formRef } = useLayoutCtx(...layoutParams),
    formCtx = useFormCtxStore(...formParams),
    optImgs = useOptImgsListeners(imgParams);
  return {
    ...layoutCtx,
    formRef,
    ...(formCtx ?? ({} as any)),
    ...(optImgs ?? ({} as any)),
  };
};
