// src/components/forms/EyebrowThicknessForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowThickness } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwThk } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyebrowThicknessForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowThicknessForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    thicknessOptions = useMemo<DeepAnatomicOption<EyebrowThickness>[]>(() => {
      const basePath = "/imgs/head/eyebrow-thickness",
        labelMap: Record<EyebrowThickness, string> = {
          vellus: "Vellus",
          fine: "Fine",
          medium: "Medium",
          coarse: "Coarse",
        },
        uniqueThicknesses = Array.from(
          new Set(eyeBrwThk)
        ) as EyebrowThickness[];
      return uniqueThicknesses.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleThicknessChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowThickness;
        dispatch(
          updateBrow({
            thickness: value,
          })
        );
      },
      [dispatch]
    ),
    selectedThickness = state.character.head?.eye?.brow?.thickness as
      | EyebrowThickness
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
        id="eyebrowThicknessForm"
      >
        <Forms.Header containerId="ebthLeg" id="ebthLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebth ??
            "What is the eyebrow hair thickness of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebth">
          {thicknessOptions.map((opt, i) => {
            const isChecked = selectedThickness === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebth"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleThicknessChange}
                name="ebth"
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
      <Forms.Result variable={selectedThickness ?? ""} />
    </ErrorBoundary>
  );
}
