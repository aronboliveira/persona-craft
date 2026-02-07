// src/components/forms/EyebrowSlitAngleForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import {
  EyebrowSlitAngle,
  EyebrowSlitNumber,
} from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwSltAng } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";
import { VALID_SLIT_NUMBERS } from "../../../../../redux/data/defaults";
export default function EyebrowSlitAngleForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowSlitAngleForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    angleOptions = useMemo<DeepAnatomicOption<EyebrowSlitAngle>[]>(() => {
      const basePath = "/imgs/head/eye/brow/slit",
        labelMap: Record<EyebrowSlitAngle, string> = {
          none: "No slit",
          diagonal: "Diagonal slit",
          vertical: "Vertical slit",
        },
        fileMap: Record<EyebrowSlitAngle, string> = {
          none: "skt_eye_brw_sslt.png",
          diagonal: "skt_eye_brw_dgslt.png",
          vertical: "skt_eye_brw_bslt.png",
        },
        uniqueAngles = Array.from(new Set(eyeBrwSltAng)) as EyebrowSlitAngle[];
      return uniqueAngles.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleAngleChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const requested = e.target.value as EyebrowSlitAngle,
          currentNumber = state.character.head?.eye?.brow?.slit?.number as
            | EyebrowSlitNumber
            | undefined,
          normalizedAngle: EyebrowSlitAngle =
            currentNumber && VALID_SLIT_NUMBERS.includes(currentNumber)
              ? requested
              : "none";
        dispatch(
          updateBrow({
            slit: {
              angle: normalizedAngle,
            },
          }),
        );
      },
      [dispatch, state.character],
    ),
    selectedAngle = state.character.head?.eye?.brow?.slit?.angle as
      | EyebrowSlitAngle
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
        id="eyebrowSlitAngleForm"
      >
        <Forms.Header containerId="ebsaLeg" id="ebsaLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebsa ??
            "What is the angle of your character's eyebrow slit?"}
        </Forms.Header>
        <OptionFieldset selector="ebsa">
          {angleOptions.map((opt, i) => {
            const isChecked = selectedAngle === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebsa"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleAngleChange}
                name="ebsa"
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
