// src/components/forms/EyeLashesDensityForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeLashesDensity } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeLshDst } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeLashesDensityForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeLashesDensityForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    densityOptions = useMemo<DeepAnatomicOption<EyeLashesDensity>[]>(() => {
      const basePath = "/imgs/head/eye/lashes/density",
        labelMap: Record<EyeLashesDensity, string> = {
          sparse: "Sparse",
          average: "Average",
          dense: "Dense",
          voluminous: "Voluminous",
        },
        uniqueDensities = Array.from(new Set(eyeLshDst)) as EyeLashesDensity[];
      return uniqueDensities.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleDensityChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeLashesDensity;
        dispatch(
          updateEyelash({
            density: value,
          }),
        );
      },
      [dispatch],
    ),
    selectedDensity = state.character.head?.eye?.lashes?.density as
      | EyeLashesDensity
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
        id="eyeLashesDensityForm"
      >
        <Forms.Header containerId="eldLeg" id="eldLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.eld ??
            "What is the eyelash density of your character?"}
        </Forms.Header>
        <OptionFieldset selector="eld">
          {densityOptions.map((opt, i) => {
            const isChecked = selectedDensity === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="eld"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleDensityChange}
                name="eld"
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
      <Forms.Result variable={selectedDensity ?? ""} />
    </ErrorBoundary>
  );
}
