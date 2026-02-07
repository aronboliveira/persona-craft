// src/components/forms/EyeColorForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeColor } from "../../../../../lib/declarations/types/anatomy";
import { updateEye } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeClr } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeColorForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeColorForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    colorOptions = useMemo<DeepAnatomicOption<EyeColor>[]>(() => {
      const basePath = "/imgs/head/eye/ball/color",
        labelMap: Record<EyeColor, string> = {
          hazel: "Hazel",
          black: "Black",
          blue: "Blue",
          green: "Green",
          fire: "Fire",
          light: "Light",
          demon: "Demon",
          blind: "Blind",
          scar: "Scar",
        },
        fileMap: Record<EyeColor, string> = {
          hazel: "srm_fm_closeup-01b.png",
          black: "srm_fm_closeup-01-black.png",
          blue: "srm_fm_closeup-01-blue.png",
          green: "srm_fm_closeup-01-green.png",
          fire: "srm_fm_closeup-01-flame.png",
          light: "srm_fm_closeup-01-light.png",
          demon: "srm_fm_closeup-01-demon.png",
          blind: "srm_fm_closeup-01-blind.png",
          scar: "srm_fm_closeup-01-scar.png",
        },
        uniqueColors = Array.from(new Set(eyeClr)) as EyeColor[];
      return uniqueColors.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleColorChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeColor;
        dispatch(
          updateEye({
            ball: {
              iris: {
                color: value,
              },
            },
          }),
        );
      },
      [dispatch],
    ),
    selectedColor = state.character.head?.eye?.ball?.iris?.color as
      | EyeColor
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
        id="eyeColorForm"
      >
        <Forms.Header containerId="eclLeg" id="eclLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ecl ??
            "What is the eye color of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ecl">
          {colorOptions.map((opt, i) => {
            const isChecked = selectedColor === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ecl"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleColorChange}
                name="ecl"
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
