import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "../../../../lib/utils/ErrorHandler";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import { MouthCommissureShape } from "../../../../lib/declarations/types/anatomy";
import { updateMouth } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { RootState } from "../../../../redux/mainStore";
import { PromptState } from "../../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { mthCmmShp } from "../../../../lib/data/opts";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";

export default function MouthCommissureShapeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["mouthCommissureShapeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    shapeOptions = useMemo<DeepAnatomicOption<MouthCommissureShape>[]>(() => {
      const basePath = "/imgs/mouth/commissure-shape",
        labelMap: Record<MouthCommissureShape, string> = {
          thin: "Thin",
          average: "Average",
          large: "Large",
        },
        uniqueShapes = Array.from(new Set(mthCmmShp)) as MouthCommissureShape[];
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
        const value = e.target.value as MouthCommissureShape;
        dispatch(
          updateMouth({
            commissure: {
              shape: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedShape = state.character.head?.mouth?.commissure?.shape as
      | MouthCommissureShape
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, info) =>
        ErrorHandler.handleReactBoundaryError({
          error,
          info,
          alertType: "hot",
          context: "MouthCommissureShapeForm",
        })
      }
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="mouthCommissureShapeForm"
      >
        <Forms.Header containerId="mcsLeg" id="mcsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.mcs ??
            "What is the mouth commissure shape of your character?"}
        </Forms.Header>
        <OptionFieldset selector="mcs">
          {shapeOptions.map((opt, i) => {
            const isChecked = selectedShape === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="mcs"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleShapeChange}
                name="mcs"
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
