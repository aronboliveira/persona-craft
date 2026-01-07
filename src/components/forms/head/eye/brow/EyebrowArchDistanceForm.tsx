// src/components/forms/EyebrowArchDistanceForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowArchDistance } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwTipsDst } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";
export default function EyebrowArchDistanceForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowArchDistanceForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    distanceOptions = useMemo<DeepAnatomicOption<EyebrowArchDistance>[]>(() => {
      const basePath = "/imgs/head/eyebrow-arch-distance",
        labelMap: Record<EyebrowArchDistance, string> = {
          even: "Even",
          "almost-even": "Almost-even",
          uneven: "Uneven",
          "extremely-uneven": "Extremely uneven",
        },
        uniqueDistances = Array.from(
          new Set(eyeBrwTipsDst)
        ) as EyebrowArchDistance[];
      return uniqueDistances.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleDistanceChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowArchDistance;
        dispatch(
          updateBrow({
            arch: {
              distance: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedDistance = state.character.head?.eye?.brow?.arch?.distance as
      | EyebrowArchDistance
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
        id="eyebrowArchDistanceForm"
      >
        <Forms.Header containerId="ebadLeg" id="ebadLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebad ??
            "What is the eyebrow arch distance (between tips) of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebad">
          {distanceOptions.map((opt, i) => {
            const isChecked = selectedDistance === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebad"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleDistanceChange}
                name="ebad"
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
      <Forms.Result variable={selectedDistance ?? ""} />
    </ErrorBoundary>
  );
}
