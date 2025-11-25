// src/components/forms/HeightForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { BodyHeight } from "../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../redux/mainStore/hooks";
import { RootState } from "../../redux/mainStore";
import { PromptState } from "../../lib/declarations/interfaces/redux";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../bloc/OptionFieldset";
import OptionFigure from "../bloc/OptionFigure";
import Forms from "../../pages/Forms";

export default function HeightForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: ["bodyHeightForm"],
  });

  const dispatch = useAppDispatch();

  const state = useAppSelector((s: RootState) => s.prompt as PromptState);

  const heightOptions = useMemo(
    () => (FORMS_OPTS.hgt as Record<BodyHeight, OptDict>) ?? null,
    []
  );

  const handleHeightChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as BodyHeight;

      dispatch(
        updatePrompt({
          character: {
            ...state.character,
            height: value,
          },
        })
      );
    },
    [dispatch, state.character]
  );

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
        id="bodyHeightForm"
      >
        <Forms.Header containerId="hgtLeg" id="hgtLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hgt ?? "Height"}
        </Forms.Header>

        <OptionFieldset selector="hgt">
          {heightOptions &&
            Object.entries(heightOptions).map(([k, v], i) => {
              const opt = v as OptDict;
              const isChecked = state.character.height === k;

              return (
                <OptionFigure
                  key={k}
                  figureAddClasses={[CLASSES.STL_OPT]}
                  prefix="hgt"
                  suffix={`${i + 1}`}
                  value={k}
                  checked={isChecked}
                  handleChange={handleHeightChange}
                  name="hgt"
                  src={opt.src}
                  caption={opt.friendlyName}
                  imgAddProps={{
                    alt: `${opt.friendlyName} — ${
                      GENERIC_DICT[lang]?.img ?? "Image"
                    }`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                />
              );
            })}
        </OptionFieldset>
      </fieldset>

      <Forms.Result variable={state.character.height} />
    </ErrorBoundary>
  );
}
