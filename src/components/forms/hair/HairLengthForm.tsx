// src/components/forms/HairLengthForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairLength } from "../../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrLng } from "../../../lib/data/opts";
import { HairLengthOption } from "../../../lib/declarations/interfaces/anatomy";
export default function HairLengthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairLengthForm"],
    }),
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    lengthOptions = useMemo<HairLengthOption[]>(() => {
      const basePath = "/imgs/hair/length",
        labelMap: Record<HairLength, string> = {
          bald: "Bald",
          "very-short": "Very short",
          short: "Short",
          medium: "Medium",
          long: "Long",
          "very-long": "Very long",
          "extremely-long": "Extremely long",
        };
      return hrLng.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleLengthChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairLength;
        dispatch(
          updatePrompt({
            character: {
              ...state.character,
              hair: {
                ...(state.character.hair ?? {
                  texture: "wavy" as any,
                  length: "medium" as any,
                  tidiness: "done" as any,
                  bang: {
                    density: "full" as any,
                    length: "short" as any,
                    shape: "blunt" as any,
                  },
                }),
                length: value,
              },
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedLength = state.character.hair?.length as HairLength | undefined;
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
        id="hairLengthForm"
      >
        <Forms.Header containerId="hlnLeg" id="hlnLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hln ??
            "What is the hair length of your character?"}
        </Forms.Header>
        <OptionFieldset selector="hln">
          {lengthOptions.map((opt, i) => {
            const isChecked = selectedLength === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hln"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleLengthChange}
                name="hln"
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
