// src/components/forms/HairBangLengthForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairBangLength } from "../../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrBgLg } from "../../../lib/data/opts";

type HairBangLengthOption = {
  key: HairBangLength;
  friendlyName: string;
  src: string;
};

export default function HairBangLengthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: ["hairBangLengthForm"],
  });

  const dispatch = useAppDispatch();

  const state = useAppSelector((s: RootState) => s.prompt as PromptState);

  const lengthOptions = useMemo<HairBangLengthOption[]>(() => {
    const basePath = "/imgs/hair/bang-length"; // expects /public/imgs/hair/bang-length/{key}.png

    const labelMap: Record<HairBangLength, string> = {
      micro: "Micro",
      short: "Short",
      "eyebrow-skimming": "Eyebrow-skimming",
      "blunt-cut": "Blunt cut",
      "blunt-across": "Blunt across",
      "lash-length": "Lash-length",
      "cheekbone-length": "Cheekbone-length",
      "lip-length": "Lip-length",
    };

    return hrBgLg.map(key => ({
      key,
      friendlyName: labelMap[key],
      src: `${basePath}/${key}.png`,
    }));
  }, []);

  const handleBangLengthChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as HairBangLength;

      dispatch(
        updatePrompt({
          character: {
            ...state.character,
            hair: {
              ...(state.character.hair ?? {
                texture: "wavy" as any,
                bang: { density: "full" as any, length: "short" as any },
              }),
              bang: {
                ...(state.character.hair?.bang ?? {
                  density: "full" as any,
                }),
                length: value,
              },
            },
          },
        })
      );
    },
    [dispatch, state.character]
  );

  const selectedLength = state.character.hair?.bang?.length as
    | HairBangLength
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
        id="hairBangLengthForm"
      >
        <Forms.Header containerId="hblLeg" id="hblLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hbl ??
            "What is the bang length of your character?"}
        </Forms.Header>

        <OptionFieldset selector="hbl">
          {lengthOptions.map((opt, i) => {
            const isChecked = selectedLength === opt.key;

            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hbl"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleBangLengthChange}
                name="hbl"
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

      <Forms.Result variable={selectedLength ?? ""} />
    </ErrorBoundary>
  );
}
