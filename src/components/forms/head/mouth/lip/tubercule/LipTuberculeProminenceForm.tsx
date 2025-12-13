// src/components/forms/LipTuberculeProminenceForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../../lib/states/lang/generic";
import { LipTuberculeProminence } from "../../../../../../lib/declarations/types/anatomy";
import { updateLipTubercule } from "../../../../../../redux/mainStore/slices/promptSlice";
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
import { mtLpTrbPrm } from "../../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../../lib/declarations/interfaces/anatomy";

export default function LipTuberculeProminenceForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["lipTuberculeProminenceForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    prominenceOptions = useMemo<
      DeepAnatomicOption<LipTuberculeProminence>[]
    >(() => {
      const basePath = "/imgs/mouth/lip-tubercule-prominence",
        labelMap: Record<LipTuberculeProminence, string> = {
          absent: "Absent",
          traced: "Traced",
          mild: "Mild",
          prominent: "Prominent",
        },
        uniqueProminences = Array.from(
          new Set(mtLpTrbPrm)
        ) as LipTuberculeProminence[];
      return uniqueProminences.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleProminenceChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as LipTuberculeProminence;
        dispatch(
          updateLipTubercule({
            prominence: value,
          })
        );
      },
      [dispatch]
    ),
    selectedProminence = state.character.head?.mouth?.lip?.tubercule
      ?.prominence as LipTuberculeProminence | undefined;
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
        id="lipTuberculeProminenceForm"
      >
        <Forms.Header containerId="ltpLeg" id="ltpLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ltp ??
            "How prominent is the lip tubercule of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ltp">
          {prominenceOptions.map((opt, i) => {
            const isChecked = selectedProminence === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ltp"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleProminenceChange}
                name="ltp"
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
      <Forms.Result variable={selectedProminence ?? ""} />
    </ErrorBoundary>
  );
}
