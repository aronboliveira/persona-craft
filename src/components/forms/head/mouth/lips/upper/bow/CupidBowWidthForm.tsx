// src/components/forms/CupidBowWidthForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../../../lib/states/lang/generic";
import { CupidBowWidth } from "../../../../../../../lib/declarations/types/anatomy";
import { updateUpperLip } from "../../../../../../../redux/mainStore/slices/promptSlice";
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
import { mtCpBwWd } from "../../../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../../../lib/declarations/interfaces/anatomy";

export default function CupidBowWidthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["cupidBowWidthForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    widthOptions = useMemo<DeepAnatomicOption<CupidBowWidth>[]>(() => {
      const basePath = "/imgs/mouth/cupid-bow-width",
        labelMap: Record<CupidBowWidth, string> = {
          narrow: "Narrow",
          average: "Average",
          wide: "Wide",
        },
        uniqueWidths = Array.from(new Set(mtCpBwWd)) as CupidBowWidth[];
      return uniqueWidths.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleWidthChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as CupidBowWidth;
        dispatch(
          updateUpperLip({
            cupidBow: { width: value },
          })
        );
      },
      [dispatch]
    ),
    selectedWidth = state.character.head?.mouth?.lips?.upper?.cupidBow
      ?.width as CupidBowWidth | undefined;
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
        id="cupidBowWidthForm"
      >
        <Forms.Header containerId="cbwLeg" id="cbwLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.cbw ??
            "What is the cupid bow width of your character?"}
        </Forms.Header>
        <OptionFieldset selector="cbw">
          {widthOptions.map((opt, i) => {
            const isChecked = selectedWidth === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="cbw"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleWidthChange}
                name="cbw"
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
      <Forms.Result variable={selectedWidth ?? ""} />
    </ErrorBoundary>
  );
}
