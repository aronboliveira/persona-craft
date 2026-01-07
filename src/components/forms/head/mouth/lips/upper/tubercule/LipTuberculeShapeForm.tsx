// src/components/forms/LipTuberculeShapeForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../../../lib/states/lang/generic";
import { LipTuberculeShape } from "../../../../../../../lib/declarations/types/anatomy";
import { updateLipTubercule } from "../../../../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/mainStore/hooks";
import { RootState } from "../../../../../../../redux/mainStore";
import { PromptState } from "../../../../../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../../../../bloc/OptionFieldset";
import OptionFigure from "../../../../../../bloc/OptionFigure";
import Forms from "../../../../../../../pages/Forms";
import { mtLpTrbShp } from "../../../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../../../lib/declarations/interfaces/anatomy";

export default function LipTuberculeShapeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["lipTuberculeShapeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    shapeOptions = useMemo<DeepAnatomicOption<LipTuberculeShape>[]>(() => {
      const basePath = "/imgs/mouth/lip-tubercule-shape",
        labelMap: Record<LipTuberculeShape, string> = {
          rounded: "Rounded",
          "flat-top": "Flat-top",
          peaked: "Peaked",
          angular: "Angular",
        },
        uniqueShapes = Array.from(new Set(mtLpTrbShp)) as LipTuberculeShape[];
      return uniqueShapes.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleShapeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as LipTuberculeShape;
        dispatch(
          updateLipTubercule({
            shape: value,
          })
        );
      },
      [dispatch]
    ),
    selectedShape = state.character.head?.mouth?.lips?.upper?.tubercule
      ?.shape as LipTuberculeShape | undefined;
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
        id="lipTuberculeShapeForm"
      >
        <Forms.Header containerId="ltsLeg" id="ltsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.lts ??
            "What is the lip tubercule shape of your character?"}
        </Forms.Header>
        <OptionFieldset selector="lts">
          {shapeOptions.map((opt, i) => {
            const isChecked = selectedShape === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="lts"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleShapeChange}
                name="lts"
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
      <Forms.Result variable={selectedShape ?? ""} />
    </ErrorBoundary>
  );
}
