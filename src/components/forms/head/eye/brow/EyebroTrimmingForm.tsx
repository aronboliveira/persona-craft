// src/components/forms/EyebrowTrimmingForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowTrimming } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwTrm } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
export default function EyebrowTrimmingForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowTrimmingForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    trimmingOptions = useMemo<DeepAnatomicOption<EyebrowTrimming>[]>(() => {
      const basePath = "/imgs/head/eyebrow-trimming",
        labelMap: Record<EyebrowTrimming, string> = {
          clean: "Clean",
          fine: "Fine",
          feathered: "Feathered",
          heavy: "Heavy",
          laminated: "Laminated",
          natural: "Natural",
          tapered: "Tapered",
        },
        uniqueTrimmings = Array.from(new Set(eyeBrwTrm)) as EyebrowTrimming[];
      return uniqueTrimmings.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleTrimmingChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowTrimming;
        dispatch(
          updateBrow({
            trimming: value,
          })
        );
      },
      [dispatch]
    ),
    selectedTrimming = state.character.head?.eye?.brow?.trimming as
      | EyebrowTrimming
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
        id="eyebrowTrimmingForm"
      >
        <Forms.Header containerId="ebtrLeg" id="ebtrLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebtr ??
            "How are your character's eyebrows trimmed or styled?"}
        </Forms.Header>
        <OptionFieldset selector="ebtr">
          {trimmingOptions.map((opt, i) => {
            const isChecked = selectedTrimming === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebtr"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleTrimmingChange}
                name="ebtr"
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
      <Forms.Result variable={selectedTrimming ?? ""} />
    </ErrorBoundary>
  );
}
