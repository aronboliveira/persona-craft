// src/components/forms/EyeTiltForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeTilt } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeTlt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyeTiltForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeTiltForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    tiltOptions = useMemo<DeepAnatomicOption<EyeTilt>[]>(() => {
      const basePath = "/imgs/head/eye-tilt",
        labelMap: Record<EyeTilt, string> = {
          upturned: "Upturned",
          downturned: "Downturned",
          "neutral-turned": "Neutral-turned",
        },
        uniqueTilts = Array.from(new Set(eyeTlt)) as EyeTilt[];
      return uniqueTilts.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleTiltChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeTilt;
        dispatch(
          updateEyeShape({
            tilt: value,
          })
        );
      },
      [dispatch]
    ),
    selectedTilt = state.character.head?.eye?.shape?.tilt as
      | EyeTilt
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
        id="eyeTiltForm"
      >
        <Forms.Header containerId="eytLeg" id="eytLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.eyt ??
            "What is the eye tilt of your character?"}
        </Forms.Header>
        <OptionFieldset selector="eyt">
          {tiltOptions.map((opt, i) => {
            const isChecked = selectedTilt === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="eyt"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleTiltChange}
                name="eyt"
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
      <Forms.Result variable={selectedTilt ?? ""} />
    </ErrorBoundary>
  );
}
