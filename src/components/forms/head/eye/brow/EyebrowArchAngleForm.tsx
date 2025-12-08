// src/components/forms/EyebrowArchAngleForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowArchAngle } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwGrwArcAng } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { EyebrowArchAngleOption } from "../../../../../lib/declarations/interfaces/anatomy";
import { updateBrow } from "../../../../../redux/mainStore/slices/promptSlice";
export default function EyebrowArchAngleForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowArchAngleForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    angleOptions = useMemo<EyebrowArchAngleOption[]>(() => {
      const basePath = "/imgs/head/eyebrow-arch-angle",
        labelMap: Record<EyebrowArchAngle, string> = {
          radial: "Radial",
          obtuse: "Obtuse",
          acute: "Acute",
          "very-acute": "Very acute",
          "extremely-acute": "Extremely acute",
          "s-shaped": "S-shaped",
        },
        uniqueAngles = Array.from(
          new Set(eyeBrwGrwArcAng)
        ) as EyebrowArchAngle[];
      return uniqueAngles.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleAngleChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowArchAngle;
        dispatch(
          updateBrow({
            arch: { angle: value },
          })
        );
      },
      [dispatch]
    ),
    selectedAngle = state.character.head?.eye?.brow?.arch?.angle as
      | EyebrowArchAngle
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
        id="eyebrowArchAngleForm"
      >
        <Forms.Header containerId="ebaaLeg" id="ebaaLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebaa ??
            "What is the eyebrow arch angle of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebaa">
          {angleOptions.map((opt, i) => {
            const isChecked = selectedAngle === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebaa"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleAngleChange}
                name="ebaa"
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
      <Forms.Result variable={selectedAngle ?? ""} />
    </ErrorBoundary>
  );
}
