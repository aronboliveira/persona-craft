// src/components/forms/ForeheadHairlineShapeForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import {
  ForeheadHairlineShape,
  ForeheadHairlineHeight,
  RecidingLevel,
} from "../../../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../../../redux/mainStore/slices/promptSlice";
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
import { frHdLnShp } from "../../../../lib/data/opts";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
export default function ForeheadHairlineShapeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["foreheadHairlineShapeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    shapeOptions = useMemo<DeepAnatomicOption<ForeheadHairlineShape>[]>(() => {
      const basePath = "/imgs/head/forehead-hairline-shape",
        labelMap: Record<ForeheadHairlineShape, string> = {
          rounded: "Rounded",
          "m-shaped": "M-shaped",
          "widow-s-peak": "Widow's peak",
          zigzag: "Zigzag",
          cowlick: "Cowlick",
          "u-shaped": "U-shaped",
          asymmetrical: "Asymmetrical",
        },
        uniqueShapes = Array.from(
          new Set(frHdLnShp)
        ) as ForeheadHairlineShape[];
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
        const value = e.target.value as ForeheadHairlineShape,
          defaultHairline = {
            height: "average" as ForeheadHairlineHeight,
            recidingLevel: "straight" as RecidingLevel,
            shape: "rounded" as ForeheadHairlineShape,
          };
        dispatch(
          updatePrompt({
            character: {
              ...state.character,
              head: {
                ...(state.character.head ?? {
                  forehead: { hairline: defaultHairline },
                }),
                forehead: {
                  ...(state.character.head?.forehead ?? {
                    hairline: defaultHairline,
                  }),
                  hairline: {
                    ...(state.character.head?.forehead?.hairline ??
                      defaultHairline),
                    shape: value,
                  },
                },
              },
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedShape = state.character.head?.forehead?.hairline?.shape as
      | ForeheadHairlineShape
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
        id="foreheadHairlineShapeForm"
      >
        <Forms.Header containerId="fhlshLeg" id="fhlshLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.fhlsh ??
            "What is the forehead hairline shape of your character?"}
        </Forms.Header>
        <OptionFieldset selector="fhlsh">
          {shapeOptions.map((opt, i) => {
            const isChecked = selectedShape === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="fhlsh"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleShapeChange}
                name="fhlsh"
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
