// src/components/forms/EyebrowUnibrowForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { Unibrow } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwUnb } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function EyebrowUnibrowForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowUnibrowForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    unibrowOptions = useMemo<DeepAnatomicOption<Unibrow>[]>(() => {
      const basePath = "/imgs/head/eyebrow-unibrow",
        labelMap: Record<Unibrow, string> = {
          absent: "Absent",
          faint: "Faint",
          partial: "Partial",
          bushy: "Bushy",
          full: "Full",
        },
        uniqueUnibrows = Array.from(new Set(eyeBrwUnb)) as Unibrow[];
      return uniqueUnibrows.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleUnibrowChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as Unibrow;
        dispatch(
          updateBrow({
            unibrow: value,
          })
        );
      },
      [dispatch]
    ),
    selectedUnibrow = state.character.head?.eye?.brow?.unibrow as
      | Unibrow
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
        id="eyebrowUnibrowForm"
      >
        <Forms.Header containerId="ebunLeg" id="ebunLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebun ??
            "Does your character have a unibrow, and how intense is it?"}
        </Forms.Header>
        <OptionFieldset selector="ebun">
          {unibrowOptions.map((opt, i) => {
            const isChecked = selectedUnibrow === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebun"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleUnibrowChange}
                name="ebun"
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
      <Forms.Result variable={selectedUnibrow ?? ""} />
    </ErrorBoundary>
  );
}
