// src/components/forms/IrisSizeForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { IrisSize } from "../../../../../lib/declarations/types/anatomy";
import { updateEye } from "../../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/mainStore/hooks";
import { RootState } from "../../../../../redux/mainStore";
import { PromptState } from "../../../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../../bloc/OptionFieldset";
import OptionFigure from "../../../../bloc/OptionFigure";
import Forms from "../../../../../pages/Forms";
import { eyeIrisSz } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function IrisSizeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["irisSizeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    sizeOptions = useMemo<DeepAnatomicOption<IrisSize>[]>(() => {
      const basePath = "/imgs/head/iris-size",
        labelMap: Record<IrisSize, string> = {
          small: "Small",
          average: "Average",
          large: "Large",
        },
        uniqueSizes = Array.from(new Set(eyeIrisSz)) as IrisSize[];
      return uniqueSizes.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleSizeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as IrisSize;
        dispatch(
          updateEye({
            ball: {
              iris: {
                size: value,
              },
            },
          })
        );
      },
      [dispatch]
    ),
    selectedSize = state.character.head?.eye?.ball?.iris?.size as
      | IrisSize
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        ErrorHandler.handleReactBoundaryError({
          error,
          info: errorInfo,
          alertType: "hot",
        });
      }}
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="irisSizeForm"
      >
        <Forms.Header containerId="irsLeg" id="irsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.irs ??
            "What is the iris size of your character?"}
        </Forms.Header>
        <OptionFieldset selector="irs">
          {sizeOptions.map((opt, i) => {
            const isChecked = selectedSize === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="irs"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleSizeChange}
                name="irs"
                src={opt.src}
                caption={opt.friendlyName}
                imgAddProps={{
                  alt: `${opt.friendlyName} — ${
                    GENERIC_DICT[lang as keyof typeof GENERIC_DICT]?.img ??
                    "Image"
                  }`,
                }}
                imgStyle={{ objectFit: "contain" }}
              />
            );
          })}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={selectedSize ?? ""} />
    </ErrorBoundary>
  );
}
