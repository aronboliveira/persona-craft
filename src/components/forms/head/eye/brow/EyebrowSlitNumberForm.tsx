// src/components/forms/EyebrowSlitNumberForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import {
  EyebrowSlitNumber,
  EyebrowSlitAngle,
} from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwSltNum } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import { VALID_SLIT_NUMBERS } from "../../../../../redux/data/defaults";
export default function EyebrowSlitNumberForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowSlitNumberForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    numberOptions = useMemo<DeepAnatomicOption<EyebrowSlitNumber>[]>(() => {
      const basePath = "/imgs/head/eyebrow-slit-number",
        labelMap: Record<EyebrowSlitNumber, string> = {
          none: "No slit",
          one: "One slit",
          two: "Two slits",
          three: "Three slits",
        },
        uniqueNumbers = Array.from(
          new Set(eyeBrwSltNum)
        ) as EyebrowSlitNumber[];
      return uniqueNumbers.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleNumberChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowSlitNumber,
          currentAngle = state.character.head?.eye?.brow?.slit?.angle as
            | EyebrowSlitAngle
            | undefined,
          normalizedAngle: EyebrowSlitAngle = VALID_SLIT_NUMBERS.includes(value)
            ? currentAngle ?? "diagonal"
            : "none";
        dispatch(
          updateBrow({
            slit: {
              number: value,
              angle: normalizedAngle,
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedNumber = state.character.head?.eye?.brow?.slit?.number as
      | EyebrowSlitNumber
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
        id="eyebrowSlitNumberForm"
      >
        <Forms.Header containerId="ebsnLeg" id="ebsnLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebsn ??
            "How many eyebrow slits does your character have?"}
        </Forms.Header>
        <OptionFieldset selector="ebsn">
          {numberOptions.map((opt, i) => {
            const isChecked = selectedNumber === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebsn"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleNumberChange}
                name="ebsn"
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
      <Forms.Result variable={selectedNumber ?? ""} />
    </ErrorBoundary>
  );
}
