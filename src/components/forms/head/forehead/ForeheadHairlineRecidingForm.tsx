// src/components/forms/ForeheadHairlineRecidingForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import {
  RecidingLevel,
  ForeheadHairlineHeight,
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
import { frHdLnRcvLv } from "../../../../lib/data/opts";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
export default function ForeheadHairlineRecidingForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["foreheadHairlineRecidingForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    recidingOptions = useMemo<DeepAnatomicOption<RecidingLevel>[]>(() => {
      const basePath = "/imgs/head/forehead-hairline-reciding",
        labelMap: Record<RecidingLevel, string> = {
          straight: "Straight hairline",
          triangular: "Triangular hairline",
          square: "Square hairline",
          bitemporal: "Bitemporal recession",
          diffuse: "Diffuse recession",
          complete: "Complete recession",
        },
        uniqueLevels = Array.from(new Set(frHdLnRcvLv)) as RecidingLevel[];
      return uniqueLevels.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleRecidingChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as RecidingLevel,
          defaultHairline = {
            height: "average" as ForeheadHairlineHeight,
            recidingLevel: "straight" as RecidingLevel,
            shape: "straight" as any,
          };
        dispatch(
          updatePrompt({
            character: {
              ...state.character,
              head: {
                ...(state.character.head ?? {
                  forehead: {
                    hairline: defaultHairline,
                  },
                }),
                forehead: {
                  ...(state.character.head?.forehead ?? {
                    hairline: defaultHairline,
                  }),
                  hairline: {
                    ...(state.character.head?.forehead?.hairline ??
                      defaultHairline),
                    recidingLevel: value,
                  },
                },
              },
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedReciding = state.character.head?.forehead?.hairline
      ?.recidingLevel as RecidingLevel | undefined;
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
        id="foreheadHairlineRecidingForm"
      >
        <Forms.Header containerId="fhlrLeg" id="fhlrLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.fhlr ??
            "What is the hairline receding pattern of your character?"}
        </Forms.Header>
        <OptionFieldset selector="fhlr">
          {recidingOptions.map((opt, i) => {
            const isChecked = selectedReciding === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="fhlr"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleRecidingChange}
                name="fhlr"
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
      <Forms.Result variable={selectedReciding ?? ""} />
    </ErrorBoundary>
  );
}
