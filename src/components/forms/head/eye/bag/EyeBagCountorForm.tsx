// src/components/forms/EyeBagCountorForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeBagCountor } from "../../../../../lib/declarations/types/anatomy";
import { updateEyeBag } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeBagCnt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyeBagCountorForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeBagCountorForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    countorOptions = useMemo<DeepAnatomicOption<EyeBagCountor>[]>(() => {
      const basePath = "/imgs/head/eye-bag-countor",
        labelMap: Record<EyeBagCountor, string> = {
          flat: "Flat",
          "low-budge": "Low bulge",
          "average-budge": "Average bulge",
          "high-budge": "High bulge",
        },
        uniqueCountors = Array.from(new Set(eyeBagCnt)) as EyeBagCountor[];
      return uniqueCountors.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleCountorChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeBagCountor;
        dispatch(
          updateEyeBag({
            countor: value,
          })
        );
      },
      [dispatch]
    ),
    selectedCountor = state.character.head?.eye?.bag?.countor as
      | EyeBagCountor
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
        id="eyeBagCountorForm"
      >
        <Forms.Header containerId="ebcLeg" id="ebcLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebc ??
            "What is the eye bag contour of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebc">
          {countorOptions.map((opt, i) => {
            const isChecked = selectedCountor === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebc"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleCountorChange}
                name="ebc"
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
      <Forms.Result variable={selectedCountor ?? ""} />
    </ErrorBoundary>
  );
}
