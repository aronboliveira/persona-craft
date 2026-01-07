// src/components/forms/ForeheadHairlineHeightForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import { ForeheadHairlineHeight } from "../../../../lib/declarations/types/anatomy";
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
import { frHdLnHg } from "../../../../lib/data/opts";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
import ErrorHandler from "../../../../lib/utils/ErrorHandler";
export default function ForeheadHairlineHeightForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["foreheadHairlineHeightForm"],
      objectFit: "contain",
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    heightOptions = useMemo<
      DeepAnatomicOption<ForeheadHairlineHeight>[]
    >(() => {
      const basePath = "/imgs/head/forehead/hairline/height",
        labelMap: Record<ForeheadHairlineHeight, string> = {
          low: "Low hairline",
          average: "Average hairline",
          high: "High hairline",
        };
      return frHdLnHg.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleHeightChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as ForeheadHairlineHeight;
        dispatch(
          updatePrompt({
            character: {
              ...state.character,
              head: {
                ...(state.character.head ?? {
                  forehead: {
                    hairline: {
                      height: "average" as ForeheadHairlineHeight,
                      recidingLevel: "none" as any,
                      shape: "straight" as any,
                    },
                  },
                }),
                forehead: {
                  ...(state.character.head?.forehead ?? {
                    hairline: {
                      height: "average" as ForeheadHairlineHeight,
                      recidingLevel: "none" as any,
                      shape: "straight" as any,
                    },
                  }),
                  hairline: {
                    ...(state.character.head?.forehead?.hairline ?? {
                      recidingLevel: "none" as any,
                      shape: "straight" as any,
                    }),
                    height: value,
                  },
                },
              },
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedHeight = state.character.head?.forehead?.hairline?.height as
      | ForeheadHairlineHeight
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
        id="foreheadHairlineHeightForm"
      >
        <Forms.Header containerId="fhlhLeg" id="fhlhLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.fhlh ??
            "What is the forehead hairline height of your character?"}
        </Forms.Header>
        <OptionFieldset selector="fhlh">
          {heightOptions.map((opt, i) => {
            const isChecked = selectedHeight === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="fhlh"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleHeightChange}
                name="fhlh"
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
