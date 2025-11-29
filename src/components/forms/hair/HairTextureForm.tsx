// src/components/forms/HairTextureForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairTexture } from "../../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrTxt } from "../../../lib/data/opts";

type HairTextureOption = {
  key: HairTexture;
  friendlyName: string;
  src: string;
};

export default function HairTextureForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: ["hairTextureForm"],
  });

  const dispatch = useAppDispatch();

  const state = useAppSelector((s: RootState) => s.prompt as PromptState);

  const hairOptions = useMemo<HairTextureOption[]>(() => {
    const basePath = "/imgs/hair";

    const labelMap: Record<HairTexture, string> = {
      straight: "Straight",
      "straight-wavy": "Straight/Wavy",
      "body-wavy": "Body Wavy",
      wavy: "Wavy",
      "deep-wavy": "Deep Wavy",
      "deep-curly": "Deep Curly",
      "kinky-curly": "Kinky Curly",
      afro: "Afro",
      "kinky-straight": "Kinky Straight",
    };

    return hrTxt.map(key => ({
      key,
      friendlyName: labelMap[key],
      src: `${basePath}/${key}.png`,
    }));
  }, []);

  const handleHairTextureChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as HairTexture;

      dispatch(
        updatePrompt({
          character: {
            ...state.character,
            hair: {
              ...state.character.hair,
              texture: value,
            },
          },
        })
      );
    },
    [dispatch, state.character]
  );

  const selectedTexture = state.character.hair.texture as
    | HairTexture
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
        id="hairTextureForm"
      >
        <Forms.Header containerId="hrtLeg" id="hrtLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hrt ??
            "What is the hair texture of your character?"}
        </Forms.Header>

        <OptionFieldset selector="hrt">
          {hairOptions.map((opt, i) => {
            const isChecked = selectedTexture === opt.key;

            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hrt"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleHairTextureChange}
                name="hrt"
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

      <Forms.Result variable={selectedTexture ?? ""} />
    </ErrorBoundary>
  );
}
