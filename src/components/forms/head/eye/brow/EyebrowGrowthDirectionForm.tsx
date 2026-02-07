// src/components/forms/EyebrowGrowthDirectionForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowGrowthDirection } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwGrwtDir } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyebrowGrowthDirectionForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowGrowthDirectionForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    directionOptions = useMemo<
      DeepAnatomicOption<EyebrowGrowthDirection>[]
    >(() => {
      // ! MISSING IMAGE - using default placeholder
      const basePath = "public/imgs/dall-e-cuca.jpeg",
        labelMap: Record<EyebrowGrowthDirection, string> = {
          upward: "Upward",
          "upward-lateral": "Upward-lateral",
          lateral: "Lateral",
          downward: "Downward",
          "downward-lateral": "Downward-lateral",
          radial: "Radial",
        },
        uniqueDirections = Array.from(
          new Set(eyeBrwGrwtDir),
        ) as EyebrowGrowthDirection[];
      return uniqueDirections.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: basePath,
      }));
    }, []),
    handleDirectionChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowGrowthDirection;
        dispatch(
          updateBrow({
            growth: {
              direction: value,
            },
          }),
        );
      },
      [dispatch],
    ),
    selectedDirection = state.character.head?.eye?.brow?.growth?.direction as
      | EyebrowGrowthDirection
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
        id="eyebrowGrowthDirectionForm"
      >
        <Forms.Header containerId="ebgdLeg" id="ebgdLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebgd ??
            "What is the eyebrow growth direction of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebgd">
          {directionOptions.map((opt, i) => {
            const isChecked = selectedDirection === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebgd"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleDirectionChange}
                name="ebgd"
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
      <Forms.Result variable={selectedDirection ?? ""} />
    </ErrorBoundary>
  );
}
