// src/components/forms/EyebrowLengthForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowHairLength } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwLng } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyebrowLengthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowLengthForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    lengthOptions = useMemo<DeepAnatomicOption<EyebrowHairLength>[]>(() => {
      const basePath = "/imgs/head/brow/length",
        labelMap: Record<EyebrowHairLength, string> = {
          minimal: "Minimal",
          short: "Short",
          average: "Average",
          long: "Long",
          "extremely-long": "Extremely long",
        },
        fileMap: Record<EyebrowHairLength, string> = {
          minimal: "skt_eyebrw_lgt_0_mnm.png",
          short: "skt_eyebrw_lgt_1_sht.png",
          average: "skt_eyebrw_lgt_2_avg.png",
          long: "skt_eyebrw_lgt_3_lng.png",
          "extremely-long": "skt_eyebrw_lgt_4_xlng.png",
        },
        uniqueLengths = Array.from(new Set(eyeBrwLng)) as EyebrowHairLength[];
      return uniqueLengths.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleLengthChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowHairLength;
        dispatch(
          updateBrow({
            length: value,
          }),
        );
      },
      [dispatch],
    ),
    selectedLength = state.character.head?.eye?.brow?.length as
      | EyebrowHairLength
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
        id="eyebrowLengthForm"
      >
        <Forms.Header containerId="eblLeg" id="eblLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebl ??
            "What is the eyebrow hair length of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebl">
          {lengthOptions.map((opt, i) => {
            const isChecked = selectedLength === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebl"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleLengthChange}
                name="ebl"
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
      <Forms.Result variable={selectedLength ?? ""} />
    </ErrorBoundary>
  );
}
