// src/components/forms/ForeheadHeightForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import { ForeheadHeight } from "../../../../lib/declarations/types/anatomy";
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
import { frHdHgt } from "../../../../lib/data/opts";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../lib/utils/ErrorHandler";
export default function ForeheadHeightForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["foreheadHeightForm"],
      objectFit: "contain",
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    heightOptions = useMemo<DeepAnatomicOption<ForeheadHeight>[]>(() => {
      const basePath = "/imgs/head/forehead/height",
        labelMap: Record<ForeheadHeight, string> = {
          short: "Short forehead",
          average: "Average forehead",
          tall: "Tall forehead",
          "very-tall": "Very tall forehead",
        },
        uniqueHeights = Array.from(new Set(frHdHgt)) as ForeheadHeight[];
      return uniqueHeights.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleHeightChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as ForeheadHeight,
          defaultForehead = {
            // minimal safe defaults if head/forehead are missing
            height: "average" as ForeheadHeight,
            hairline: {
              height: "average" as any,
              recidingLevel: "straight" as any,
              shape: "rounded" as any,
            },
          };
        dispatch(
          updatePrompt({
            character: {
              ...state.character,
              head: {
                ...(state.character.head ?? {
                  forehead: defaultForehead,
                }),
                forehead: {
                  ...(state.character.head?.forehead ?? defaultForehead),
                  height: value,
                },
              },
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedHeight = state.character.head?.forehead?.height as
      | ForeheadHeight
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
        id="foreheadHeightForm"
      >
        <Forms.Header containerId="fhdhLeg" id="fhdhLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.fhdh ??
            "What is the forehead height of your character?"}
        </Forms.Header>
        <OptionFieldset selector="fhdh">
          {heightOptions.map((opt, i) => {
            const isChecked = selectedHeight === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="fhdh"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleHeightChange}
                name="fhdh"
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
