import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairTexture } from "../../../lib/declarations/types/anatomy";
import { updateHair } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrTxt } from "../../../lib/data/opts";
import { DeepOptional } from "../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../lib/utils/ErrorHandler";

export default function HairTextureForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairTextureForm"],
      objectFit: "contain",
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    hairOptions = useMemo<DeepAnatomicOption<HairTexture>[]>(() => {
      const basePath = "/imgs/hair/texture",
        labelMap: Record<HairTexture, string> = {
          straight: "Straight",
          "straight-wavy": "Straight Wavy",
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
    }, []),
    handleHairTextureChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairTexture;
        dispatch(
          updateHair({
            texture: value,
          })
        );
      },
      [dispatch]
    ),
    selectedTexture = state.character.hair?.texture as HairTexture | undefined;
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
