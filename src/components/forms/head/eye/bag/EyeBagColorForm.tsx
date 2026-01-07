// src/components/forms/EyeBagColorForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeBagColor } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBagClr } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeBagColorForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeBagColorForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    colorOptions = useMemo<DeepAnatomicOption<EyeBagColor>[]>(() => {
      const basePath = "/imgs/head/eye-bag-color",
        labelMap: Record<EyeBagColor, string> = {
          "skin-tone": "Skin tone",
          dark: "Dark",
          "blue-violet": "Blue-violet",
          "purple-maroon": "Purple-maroon",
          reddish: "Reddish",
          "yellow-brown": "Yellow-brown",
        },
        uniqueColors = Array.from(new Set(eyeBagClr)) as EyeBagColor[];
      return uniqueColors.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleColorChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeBagColor;
        dispatch(
          updateEyeBag({
            color: value,
          })
        );
      },
      [dispatch]
    ),
    selectedColor = state.character.head?.eye?.bag?.color as
      | EyeBagColor
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
        id="eyeBagColorForm"
      >
        <Forms.Header containerId="ebclLeg" id="ebclLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebcl ??
            "What is the eye bag color of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebcl">
          {colorOptions.map((opt, i) => {
            const isChecked = selectedColor === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebcl"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleColorChange}
                name="ebcl"
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
      <Forms.Result variable={selectedColor ?? ""} />
    </ErrorBoundary>
  );
}
