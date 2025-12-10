// src/components/forms/PupilPatternForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { PupilPattern } from "../../../../../lib/declarations/types/anatomy";
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
import { eyePplPtn } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function PupilPatternForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["pupilPatternForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    patternOptions = useMemo<DeepAnatomicOption<PupilPattern>[]>(() => {
      const basePath = "/imgs/head/pupil-pattern",
        labelMap: Record<PupilPattern, string> = {
          round: "Round",
          "vertical-slit": "Vertical slit",
          "horizontal-slit": "Horizontal slit",
          heart: "Heart",
          square: "Square",
          diamond: "Diamond",
          star: "Star",
          cross: "Cross",
        },
        uniquePatterns = Array.from(new Set(eyePplPtn)) as PupilPattern[];
      return uniquePatterns.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handlePatternChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as PupilPattern;
        dispatch(
          updateEye({
            ball: {
              pupil: {
                pattern: value,
              },
            },
          })
        );
      },
      [dispatch]
    ),
    selectedPattern = state.character.head?.eye?.ball?.pupil?.pattern as
      | PupilPattern
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
        id="pupilPatternForm"
      >
        <Forms.Header containerId="pplpLeg" id="pplpLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.pplp ??
            "What is the pupil pattern of your character?"}
        </Forms.Header>
        <OptionFieldset selector="pplp">
          {patternOptions.map((opt, i) => {
            const isChecked = selectedPattern === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="pplp"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handlePatternChange}
                name="pplp"
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
      <Forms.Result variable={selectedPattern ?? ""} />
    </ErrorBoundary>
  );
}
