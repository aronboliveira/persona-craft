// src/components/forms/EyeSpacingForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeSpacing } from "../../../../../lib/declarations/types/anatomy";
import { updateEyeShape } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeSpc } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeSpacingForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeSpacingForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    spacingOptions = useMemo<DeepAnatomicOption<EyeSpacing>[]>(() => {
      const basePath = "/imgs/head/eye/ball/spacing",
        labelMap: Record<EyeSpacing, string> = {
          "close-set": "Close-set",
          "average-distanced": "Average-distanced",
          "wide-set": "Wide-set",
        },
        fileMap: Record<EyeSpacing, string> = {
          "close-set": "skt_eye_spacing_0_close.png",
          "average-distanced": "skt_eye_spacing_1_avg.png",
          "wide-set": "skt_eye_spacing_2_wide.png",
        },
        uniqueSpacings = Array.from(new Set(eyeSpc)) as EyeSpacing[];
      return uniqueSpacings.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleSpacingChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeSpacing;
        dispatch(
          updateEyeShape({
            spacing: value,
          }),
        );
      },
      [dispatch],
    ),
    selectedSpacing = state.character.head?.eye?.shape?.spacing as
      | EyeSpacing
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
        id="eyeSpacingForm"
      >
        <Forms.Header containerId="eysLeg" id="eysLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.eys ??
            "What is the eye spacing of your character?"}
        </Forms.Header>
        <OptionFieldset selector="eys">
          {spacingOptions.map((opt, i) => {
            const isChecked = selectedSpacing === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="eys"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleSpacingChange}
                name="eys"
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
      <Forms.Result variable={selectedSpacing ?? ""} />
    </ErrorBoundary>
  );
}
