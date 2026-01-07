// src/components/forms/LowerLipThicknessForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../../lib/states/lang/generic";
import { LowerLipThickness } from "../../../../../../lib/declarations/types/anatomy";
import { updateLowerLip } from "../../../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../redux/mainStore/hooks";
import { RootState } from "../../../../../../redux/mainStore";
import { PromptState } from "../../../../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../../../bloc/OptionFieldset";
import OptionFigure from "../../../../../bloc/OptionFigure";
import Forms from "../../../../../../pages/Forms";
import { mtLwLpVlm } from "../../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../../lib/utils/ErrorHandler";

export default function LowerLipVolumeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["lowerLipThicknessForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    volumeOptions = useMemo<DeepAnatomicOption<LowerLipThickness>[]>(() => {
      const basePath = "/imgs/mouth/lower-lip-volume",
        labelMap: Record<LowerLipThickness, string> = {
          "very-flat": "Very flat",
          flat: "Flat",
          average: "Average",
          full: "Full",
          "very-full": "Very full",
          "extremely-full": "Extremely full",
        },
        uniqueVolumes = Array.from(new Set(mtLwLpVlm)) as LowerLipThickness[];
      return uniqueVolumes.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleVolumeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as LowerLipThickness;
        dispatch(
          updateLowerLip({
            volume: value,
          })
        );
      },
      [dispatch]
    ),
    selectedVolume = state.character.head?.mouth?.lips?.lower?.volume as
      | LowerLipThickness
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
        id="lowerLipThicknessForm"
      >
        <Forms.Header containerId="lltLeg" id="lltLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.llt ??
            "What is the lower lip volume of your character?"}
        </Forms.Header>
        <OptionFieldset selector="llt">
          {volumeOptions.map((opt, i) => {
            const isChecked = selectedVolume === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="llt"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleVolumeChange}
                name="llt"
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
      <Forms.Result variable={selectedVolume ?? ""} />
    </ErrorBoundary>
  );
}
