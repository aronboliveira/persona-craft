// src/components/forms/EyeDepthForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeDepth } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeDpt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeDepthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeDepthForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    depthOptions = useMemo<DeepAnatomicOption<EyeDepth>[]>(() => {
      const basePath = "/imgs/head/eye-depth",
        labelMap: Record<EyeDepth, string> = {
          "deep-set": "Deep-set",
          "neutral-set": "Neutral-set",
          protruding: "Protruding",
        },
        uniqueDepths = Array.from(new Set(eyeDpt)) as EyeDepth[];
      return uniqueDepths.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleDepthChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeDepth;
        dispatch(
          updateEyeShape({
            depth: value,
          })
        );
      },
      [dispatch]
    ),
    selectedDepth = state.character.head?.eye?.shape?.depth as
      | EyeDepth
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
        id="eyeDepthForm"
      >
        <Forms.Header containerId="eydLeg" id="eydLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.eyd ??
            "What is the eye depth of your character?"}
        </Forms.Header>
        <OptionFieldset selector="eyd">
          {depthOptions.map((opt, i) => {
            const isChecked = selectedDepth === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="eyd"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleDepthChange}
                name="eyd"
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
      <Forms.Result variable={selectedDepth ?? ""} />
    </ErrorBoundary>
  );
}
