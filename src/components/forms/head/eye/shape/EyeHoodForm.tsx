// src/components/forms/EyeHoodForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeHood } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeHd } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyeHoodForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeHoodForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    hoodOptions = useMemo<DeepAnatomicOption<EyeHood>[]>(() => {
      const basePath = "/imgs/head/eye/ball/hood",
        labelMap: Record<EyeHood, string> = {
          hooded: "Hooded",
          "partially-hooded": "Partially hooded",
          unhooded: "Unhooded",
        },
        fileMap: Record<EyeHood, string> = {
          hooded: "skt_eye_hood_f.png",
          "partially-hooded": "skt_eye_hood_p.png",
          unhooded: "skt_eye_hood_n.png",
        },
        uniqueHoods = Array.from(new Set(eyeHd)) as EyeHood[];
      return uniqueHoods.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleHoodChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeHood;
        dispatch(
          updateEyeShape({
            hood: value,
          }),
        );
      },
      [dispatch],
    ),
    selectedHood = state.character.head?.eye?.shape?.hood as
      | EyeHood
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
        id="eyeHoodForm"
      >
        <Forms.Header containerId="ehdLeg" id="ehdLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ehd ??
            "How hooded are your character's eyes?"}
        </Forms.Header>
        <OptionFieldset selector="ehd">
          {hoodOptions.map((opt, i) => {
            const isChecked = selectedHood === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ehd"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleHoodChange}
                name="ehd"
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
      <Forms.Result variable={selectedHood ?? ""} />
    </ErrorBoundary>
  );
}
