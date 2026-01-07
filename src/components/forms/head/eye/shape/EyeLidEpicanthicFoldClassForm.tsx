// src/components/forms/EyeLidEpicanthicFoldClassForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeEpicanthicFoldClass } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeLidEpcCls } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeLidEpicanthicFoldClassForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeLidEpicanthicFoldClassForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    classOptions = useMemo<DeepAnatomicOption<EyeEpicanthicFoldClass>[]>(() => {
      const basePath = "/imgs/head/eyelid-epicanthic-fold-class",
        labelMap: Record<EyeEpicanthicFoldClass, string> = {
          none: "None",
          tarsal: "Tarsal fold",
          palpebral: "Palpebral fold",
          inverted: "Inverted fold",
        },
        uniqueClasses = Array.from(
          new Set(eyeLidEpcCls)
        ) as EyeEpicanthicFoldClass[];
      return uniqueClasses.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleClassChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeEpicanthicFoldClass;
        dispatch(
          updateEyeLid({
            epicanthicFoldVariation: value,
          })
        );
      },
      [dispatch]
    ),
    selectedClass = state.character.head?.eye?.shape?.lid
      ?.epicanthicFoldVariation as EyeEpicanthicFoldClass | undefined;
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
        id="eyeLidEpicanthicFoldClassForm"
      >
        <Forms.Header containerId="elecLeg" id="elecLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.elec ??
            "What is the epicanthic fold class of your character?"}
        </Forms.Header>
        <OptionFieldset selector="elec">
          {classOptions.map((opt, i) => {
            const isChecked = selectedClass === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="elec"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleClassChange}
                name="elec"
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
      <Forms.Result variable={selectedClass ?? ""} />
    </ErrorBoundary>
  );
}
