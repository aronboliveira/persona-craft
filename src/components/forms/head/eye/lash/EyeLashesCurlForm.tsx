// src/components/forms/EyeLashesCurlForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeLashesCurl } from "../../../../../lib/declarations/types/anatomy";
import { updateEyelash } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeLshCrl } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeLashesCurlForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeLashesCurlForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    curlOptions = useMemo<DeepAnatomicOption<EyeLashesCurl>[]>(() => {
      const basePath = "/imgs/head/eyelashes-curl",
        labelMap: Record<EyeLashesCurl, string> = {
          straight: "Straight",
          "slightly-downward-curled": "Slightly downward-curled",
          "downward-curled": "Downward-curled",
          "slightly-upward-curled": "Slightly upward-curled",
          "upward-curled": "Upward-curled",
        },
        uniqueCurls = Array.from(new Set(eyeLshCrl)) as EyeLashesCurl[];
      return uniqueCurls.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleCurlChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeLashesCurl;
        dispatch(
          updateEyelash({
            curl: value,
          })
        );
      },
      [dispatch]
    ),
    selectedCurl = state.character.head?.eye?.lashes?.curl as
      | EyeLashesCurl
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
        id="eyeLashesCurlForm"
      >
        <Forms.Header containerId="elcLeg" id="elcLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.elc ??
            "What is the eyelash curl of your character?"}
        </Forms.Header>
        <OptionFieldset selector="elc">
          {curlOptions.map((opt, i) => {
            const isChecked = selectedCurl === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="elc"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleCurlChange}
                name="elc"
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
      <Forms.Result variable={selectedCurl ?? ""} />
    </ErrorBoundary>
  );
}
