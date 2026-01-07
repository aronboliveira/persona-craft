import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "../../../../../../lib/utils/ErrorHandler";
import GenericErrorComponent from "../../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../../lib/states/lang/generic";
import { LowerLipShape } from "../../../../../../lib/declarations/types/anatomy";
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
import { mtLwLpShp } from "../../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../../lib/declarations/interfaces/anatomy";

export default function LowerLipShapeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["lowerLipShapeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    shapeOptions = useMemo<DeepAnatomicOption<LowerLipShape>[]>(() => {
      const basePath = "/imgs/mouth/lower-lip-shape",
        labelMap: Record<LowerLipShape, string> = {
          centralized: "Centralized",
          "flat-abroad": "Flat abroad",
          lateralized: "Lateralized",
          "rounded-pillow": "Rounded pillow",
          pronounced: "Pronounced",
          "pouty-everted": "Pouty everted",
        },
        uniqueShapes = Array.from(new Set(mtLwLpShp)) as LowerLipShape[];
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
        const value = e.target.value as LowerLipShape;
        dispatch(
          updateLowerLip({
            shape: value,
          } as any)
        );
      },
      [dispatch]
    ),
    selectedShape = state.character.head?.mouth?.lips?.lower?.shape as
      | LowerLipShape
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, info) =>
        ErrorHandler.handleReactBoundaryError({
          error,
          info,
          alertType: "hot",
          context: "LowerLipShapeForm",
        })
      }
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="lowerLipShapeForm"
      >
        <Forms.Header containerId="llsLeg" id="llsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.lls ??
            "What is the lower lip shape of your character?"}
        </Forms.Header>
        <OptionFieldset selector="lls">
          {shapeOptions.map((opt, i) => {
            const isChecked = selectedShape === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="lls"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleShapeChange}
                name="lls"
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
