// src/components/forms/EyebrowTextureForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowTexture } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwTxt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
export default function EyebrowTextureForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowTextureForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    textureOptions = useMemo<DeepAnatomicOption<EyebrowTexture>[]>(() => {
      const basePath = "/imgs/head/eyebrow-texture",
        labelMap: Record<EyebrowTexture, string> = {
          straight: "Straight",
          wavy: "Wavy",
          curly: "Curly",
        },
        uniqueTextures = Array.from(new Set(eyeBrwTxt)) as EyebrowTexture[];
      return uniqueTextures.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleTextureChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowTexture;
        dispatch(
          updateBrow({
            texture: value,
          })
        );
      },
      [dispatch]
    ),
    selectedTexture = state.character.head?.eye?.brow?.texture as
      | EyebrowTexture
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
        id="eyebrowTextureForm"
      >
        <Forms.Header containerId="ebtLeg" id="ebtLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebt ??
            "What is the eyebrow hair texture of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebt">
          {textureOptions.map((opt, i) => {
            const isChecked = selectedTexture === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebt"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleTextureChange}
                name="ebt"
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
      <Forms.Result variable={selectedTexture ?? ""} />
    </ErrorBoundary>
  );
}
