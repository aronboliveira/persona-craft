// src/components/forms/EyeLashesLengthForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeLashesLength } from "../../../../../lib/declarations/types/anatomy";
import { updateEyelash } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeLshLgt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyeLashesLengthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeLashesLengthForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    lengthOptions = useMemo<DeepAnatomicOption<EyeLashesLength>[]>(() => {
      const basePath = "/imgs/head/eyelashes-length",
        labelMap: Record<EyeLashesLength, string> = {
          absent: "Absent",
          "very-short": "Very short",
          short: "Short",
          average: "Average",
          long: "Long",
          "extra-long": "Extra long",
        },
        uniqueLengths = Array.from(new Set(eyeLshLgt)) as EyeLashesLength[];
      return uniqueLengths.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleLengthChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeLashesLength;
        dispatch(
          updateEyelash({
            length: value,
          })
        );
      },
      [dispatch]
    ),
    selectedLength = state.character.head?.eye?.lashes?.length as
      | EyeLashesLength
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
        id="eyeLashesLengthForm"
      >
        <Forms.Header containerId="ellLeg" id="ellLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ell ??
            "What is the eyelash length of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ell">
          {lengthOptions.map((opt, i) => {
            const isChecked = selectedLength === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ell"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleLengthChange}
                name="ell"
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
      <Forms.Result variable={selectedLength ?? ""} />
    </ErrorBoundary>
  );
}
