// src/components/forms/EyebrowGrowthPatternForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowGrowthPattern } from "../../../../../lib/declarations/types/anatomy";
import { updateBrow } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeBrwGrwtPtn } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyebrowGrowthPatternForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowGrowthPatternForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    patternOptions = useMemo<DeepAnatomicOption<EyebrowGrowthPattern>[]>(() => {
      const basePath = "/imgs/head/eyebrow-growth-pattern",
        labelMap: Record<EyebrowGrowthPattern, string> = {
          even: "Even",
          "front-heavy": "Front-heavy",
          "tail-heavy": "Tail-heavy",
          "center-heavy": "Center-heavy",
        },
        uniquePatterns = Array.from(
          new Set(eyeBrwGrwtPtn)
        ) as EyebrowGrowthPattern[];
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
        const value = e.target.value as EyebrowGrowthPattern;
        dispatch(
          updateBrow({
            growth: {
              pattern: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedPattern = state.character.head?.eye?.brow?.growth?.pattern as
      | EyebrowGrowthPattern
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
        id="eyebrowGrowthPatternForm"
      >
        <Forms.Header containerId="ebgpLeg" id="ebgpLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebgp ??
            "What is the eyebrow growth pattern of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebgp">
          {patternOptions.map((opt, i) => {
            const isChecked = selectedPattern === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebgp"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handlePatternChange}
                name="ebgp"
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
