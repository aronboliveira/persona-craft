// src/components/forms/EyebrowArchHeightForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowArchHeight } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwArchHgt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyebrowArchHeightForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowArchHeightForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    heightOptions = useMemo<DeepAnatomicOption<EyebrowArchHeight>[]>(() => {
      // ! MISSING IMAGE - using default placeholder
      const basePath = "public/imgs/dall-e-cuca.jpeg",
        labelMap: Record<EyebrowArchHeight, string> = {
          "very-low": "Very low",
          low: "Low",
          average: "Average",
          high: "High",
          "very-high": "Very high",
        },
        uniqueHeights = Array.from(
          new Set(eyeBrwArchHgt),
        ) as EyebrowArchHeight[];
      return uniqueHeights.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: basePath,
      }));
    }, []),
    handleHeightChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowArchHeight;
        dispatch(
          updateBrow({
            arch: {
              height: value,
            },
          }),
        );
      },
      [dispatch],
    ),
    selectedHeight = state.character.head?.eye?.brow?.arch?.height as
      | EyebrowArchHeight
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
        id="eyebrowArchHeightForm"
      >
        <Forms.Header containerId="ebahLeg" id="ebahLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebah ??
            "What is the eyebrow arch height of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebah">
          {heightOptions.map((opt, i) => {
            const isChecked = selectedHeight === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebah"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleHeightChange}
                name="ebah"
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
      <Forms.Result variable={selectedHeight ?? ""} />
    </ErrorBoundary>
  );
}
