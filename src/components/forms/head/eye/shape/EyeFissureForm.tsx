// src/components/forms/EyeFissureForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeFissure } from "../../../../../lib/declarations/types/anatomy";
import { updateEyeShape } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeFs } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyeFissureForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeFissureForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    fissureOptions = useMemo<DeepAnatomicOption<EyeFissure>[]>(() => {
      const basePath = "/imgs/head/eye-fissure",
        labelMap: Record<EyeFissure, string> = {
          round: "Round",
          almond: "Almond",
          wide: "Wide",
          narrow: "Narrow",
        },
        uniqueFissures = Array.from(new Set(eyeFs)) as EyeFissure[];
      return uniqueFissures.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleFissureChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeFissure;
        dispatch(
          updateEyeShape({
            fissure: value,
          })
        );
      },
      [dispatch]
    ),
    selectedFissure = state.character.head?.eye?.shape?.fissure as
      | EyeFissure
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
        id="eyeFissureForm"
      >
        <Forms.Header containerId="eyfLeg" id="eyfLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.eyf ??
            "What is the eye fissure shape of your character?"}
        </Forms.Header>
        <OptionFieldset selector="eyf">
          {fissureOptions.map((opt, i) => {
            const isChecked = selectedFissure === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="eyf"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleFissureChange}
                name="eyf"
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
      <Forms.Result variable={selectedFissure ?? ""} />
    </ErrorBoundary>
  );
}
