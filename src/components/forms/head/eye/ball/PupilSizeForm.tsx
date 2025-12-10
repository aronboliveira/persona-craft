// src/components/forms/PupilSizeForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { PupilSize } from "../../../../../lib/declarations/types/anatomy";
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
import { eyePplSz } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function PupilSizeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["pupilSizeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    sizeOptions = useMemo<DeepAnatomicOption<PupilSize>[]>(() => {
      const basePath = "/imgs/head/pupil-size",
        labelMap: Record<PupilSize, string> = {
          "very-small": "Very small",
          small: "Small",
          average: "Average",
          large: "Large",
          "very-large": "Very large",
        },
        uniqueSizes = Array.from(new Set(eyePplSz)) as PupilSize[];
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
        const value = e.target.value as PupilSize;
        dispatch(
          updateEye({
            ball: {
              pupil: {
                size: value,
              },
            },
          })
        );
      },
      [dispatch]
    ),
    selectedSize = state.character.head?.eye?.ball?.pupil?.size as
      | PupilSize
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error("Error caught by boundary:", error);
        console.error("Component stack:", errorInfo.componentStack);
        alert(`An error occurred: ${error.message}`);
      }}
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="pupilSizeForm"
      >
        <Forms.Header containerId="pplLeg" id="pplLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ppl ??
            "What is the pupil size of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ppl">
          {sizeOptions.map((opt, i) => {
            const isChecked = selectedSize === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ppl"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleSizeChange}
                name="ppl"
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
