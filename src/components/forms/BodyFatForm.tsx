// src/components/forms/BodyFatForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { BodyFat } from "../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../redux/mainStore/hooks";
import { RootState } from "../../redux/mainStore";
import { PromptState } from "../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../bloc/OptionFieldset";
import OptionFigure from "../bloc/OptionFigure";
import Forms from "../../pages/Forms";
import { bdTps } from "../../lib/data/opts";
import { BodyFatOption } from "../../lib/declarations/interfaces/anatomy";
export default function BodyFatForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: ["bodyFatForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const state = useAppSelector((s: RootState) => s.prompt as PromptState);
  const fatOptions = useMemo<BodyFatOption[]>(() => {
    // basic, photorealistic feminine mapping using existing assets
    const basePath = "/imgs/creations/full-body/ptr/fm";
    const imgMap: Record<BodyFat, string> = {
      thin: `${basePath}/srm_fm_slender-01.png`,
      scrawny: `${basePath}/srm_fm_frail-01.png`,
      skinny: `${basePath}/srm_fm_frail-02.png`,
      thick: `${basePath}/srm_fm_herculean-02.png`,
      obese: `${basePath}/srm_fm_herculean_03.png`,
    };
    const labelMap: Record<BodyFat, string> = {
      thin: "Thin",
      skinny: "Skinny",
      scrawny: "Scrawny",
      thick: "Thick",
      obese: "Obese",
    };
    return bdTps.map(key => ({
      key,
      friendlyName: labelMap[key],
      src: imgMap[key],
    }));
  }, []);

  const handleBodyFatChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as BodyFat;
      dispatch(
        updatePrompt({
          character: {
            ...state.character,
            // store body-fat level here; align Character["weight"] to BodyFat in types
            weight: value,
          },
        })
      );
    },
    [dispatch, state.character]
  );

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
        id="bodyFatForm"
      >
        <Forms.Header containerId="bftLeg" id="bftLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.bft ??
            "What is the body fat level of your character?"}
        </Forms.Header>

        <OptionFieldset selector="bft">
          {fatOptions.map((opt, i) => {
            const isChecked = state.character.weight === opt.key;

            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="bft"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleBodyFatChange}
                name="bft"
                src={opt.src}
                caption={opt.friendlyName}
                imgAddProps={{
                  alt: `${opt.friendlyName} — ${
                    GENERIC_DICT[lang]?.img ?? "Image"
                  }`,
                }}
                imgStyle={{ objectFit: "contain" }}
              />
            );
          })}
        </OptionFieldset>
      </fieldset>

      <Forms.Result variable={state.character.weight} />
    </ErrorBoundary>
  );
}
