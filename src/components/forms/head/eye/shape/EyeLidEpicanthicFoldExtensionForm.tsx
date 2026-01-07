// src/components/forms/EyeLidEpicanthicFoldExtensionForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeEpicanthicFoldExtension } from "../../../../../lib/declarations/types/anatomy";
import { updateEyeLid } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { eyeLidEpcExt } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeLidEpicanthicFoldExtensionForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeLidEpicanthicFoldExtensionForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    foldOptions = useMemo<
      DeepAnatomicOption<EyeEpicanthicFoldExtension>[]
    >(() => {
      const basePath = "/imgs/head/eyelid-epicanthic-fold-extension",
        labelMap: Record<EyeEpicanthicFoldExtension, string> = {
          none: "No epicanthic fold",
          partial: "Partial epicanthic fold",
          full: "Full epicanthic fold",
        },
        uniqueFolds = Array.from(
          new Set(eyeLidEpcExt)
        ) as EyeEpicanthicFoldExtension[];
      return uniqueFolds.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleFoldChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeEpicanthicFoldExtension;
        dispatch(
          updateEyeLid({
            epicanthicFold: value,
          })
        );
      },
      [dispatch]
    ),
    selectedFold = state.character.head?.eye?.shape?.lid?.epicanthicFold as
      | EyeEpicanthicFoldExtension
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
        id="eyeLidEpicanthicFoldExtensionForm"
      >
        <Forms.Header containerId="elefLeg" id="elefLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.elef ??
            "What is the epicanthic fold extension of your character?"}
        </Forms.Header>
        <OptionFieldset selector="elef">
          {foldOptions.map((opt, i) => {
            const isChecked = selectedFold === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="elef"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleFoldChange}
                name="elef"
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
      <Forms.Result variable={selectedFold ?? ""} />
    </ErrorBoundary>
  );
}
