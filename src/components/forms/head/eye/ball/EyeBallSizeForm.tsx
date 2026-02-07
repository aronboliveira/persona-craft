// src/components/forms/EyeBallSizeForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeBallSize } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBlSz } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";
export default function EyeBallSizeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeBallSizeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    sizeOptions = useMemo<DeepAnatomicOption<EyeBallSize>[]>(() => {
      const basePath = "/imgs/head/eye/ball/size",
        labelMap: Record<EyeBallSize, string> = {
          "extremely-small": "Extremely small",
          "very-small": "Very small",
          small: "Small",
          average: "Average",
          large: "Large",
          "very-large": "Very large",
          "extremely-large": "Extremely large",
          "absurdly-large": "Absurdly large",
        },
        fileMap: Record<EyeBallSize, string> = {
          "extremely-small": "skt_eyesz_0_xsm.png",
          "very-small": "skt_eyesz_1_vsm.png",
          small: "skt_eyesz_2_sm.png",
          average: "skt_eyesz_3_avg.png",
          large: "skt_eyesz_4_lg.png",
          "very-large": "skt_eyesz_5_vlg.png",
          "extremely-large": "skt_eyesz_6_xlg.png",
          "absurdly-large": "skt_eyesz_7_ablg.png",
        },
        uniqueSizes = Array.from(new Set(eyeBlSz)) as EyeBallSize[];
      return uniqueSizes.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleSizeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeBallSize;
        dispatch(
          updateEye({
            ball: {
              size: value,
            },
          }),
        );
      },
      [dispatch],
    ),
    selectedSize = state.character.head?.eye?.ball?.size as
      | EyeBallSize
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
        id="eyeBallSizeForm"
      >
        <Forms.Header containerId="ebsLeg" id="ebsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebs ??
            "What is the eyeball size of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebs">
          {sizeOptions.map((opt, i) => {
            const isChecked = selectedSize === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebs"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleSizeChange}
                name="ebs"
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
