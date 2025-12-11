// src/components/forms/EyeLidCreaseNumberForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyeLidCreaseNumber } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeLidCrsN } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyeLidCreaseNumberForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyeLidCreaseNumberForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    creaseOptions = useMemo<DeepAnatomicOption<EyeLidCreaseNumber>[]>(() => {
      const basePath = "/imgs/head/eyelid-crease-number",
        labelMap: Record<EyeLidCreaseNumber, string> = {
          monolid: "Monolid",
          doublelid: "Double lid",
          triplelid: "Triple lid",
          quadruplelid: "Quadruple lid",
        },
        uniqueCreases = Array.from(new Set(eyeLidCrsN)) as EyeLidCreaseNumber[];
      return uniqueCreases.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleCreaseChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyeLidCreaseNumber;
        dispatch(
          updateEyeLid({
            creaseNumber: value,
          })
        );
      },
      [dispatch]
    ),
    selectedCrease = state.character.head?.eye?.shape?.lid?.creaseNumber as
      | EyeLidCreaseNumber
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
        id="eyeLidCreaseNumberForm"
      >
        <Forms.Header containerId="elcLeg" id="elcLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.elc ??
            "How many eyelid creases does your character have?"}
        </Forms.Header>
        <OptionFieldset selector="elc">
          {creaseOptions.map((opt, i) => {
            const isChecked = selectedCrease === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="elc"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleCreaseChange}
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
      <Forms.Result variable={selectedCrease ?? ""} />
    </ErrorBoundary>
  );
}
