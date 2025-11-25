import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject } from "react"; // * useCallback/useMemo/RefObject for controlled behavior and layout ref
import { BodyMuscleTypes } from "../../lib/declarations/types/anatomy";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../lib/data/classes";
import { RootState } from "../../redux/mainStore";
import { FORMS_OPTS } from "../../lib/data/opts";
import { PromptState } from "../../lib/declarations/interfaces/redux";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import OptionFigure from "../bloc/OptionFigure";
import { useAppDispatch, useAppSelector } from "../../redux/mainStore/hooks"; // * typed Redux hooks
import { StyleSets } from "../../lib/declarations/types/helpers"; // * for mapping ImageStyle -> StyleSets
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx"; // * unify with other forms (layout + tips)
import OptionFieldset from "../bloc/OptionFieldset"; // * consistent fieldset wrapper
import Forms from "../../pages/Forms"; // * reuse shared Header/Result components

export default function BodyTypeMuscleForm() {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: ["bodyTypeMuscleForm"], // * use layout context; no APP_IDS key yet, so use literal id
  });

  const dispatch = useAppDispatch(); // * Redux dispatch instead of context-only dispatch

  const state = useAppSelector((s: RootState) => s.prompt as PromptState); // * prompt state from Redux as single source of truth

  const stKey = useMemo(
    () =>
      ((): StyleSets => {
        // * map current image style (anime/photorealistic/etc.) to StyleSets
        switch (state.style) {
          case "anime":
            return "anm";
          case "cartoon":
            return "crt";
          case "photorealistic":
            return "ptr";
          case "pixel":
            return "px";
          case "semi-realistic":
            return "sr";
          default:
            return "sr";
        }
      })(),
    [state.style]
  ); // * ensures we pick the correct muscle images directory under /imgs/muscle/{styleSet}

  const muscleOptions = useMemo(() => {
    if (typeof FORMS_OPTS.msc !== "function") return null; // * defensive check

    return FORMS_OPTS.msc(
      state.character.gender, // * use actual gender ("female" | "masculine" | "nonBinary")
      stKey // * use style code ("anm" | "ptr" | "sr" etc.)
    ) as {
      [K in BodyMuscleTypes]: {
        friendlyName: string;
        src: string;
      };
    };
  }, [state.character.gender, stKey]); // * recompute when style or gender changes

  const handleBodyTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // * event-based handler, compatible with OptionFigure/Radio
      const value = e.target.value as BodyMuscleTypes;

      dispatch(
        updatePrompt({
          character: {
            ...state.character,
            muscle: value,
          },
        })
      );
    },
    [dispatch, state.character] // * only depend on what is read
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
        ref={formRef as RefObject<HTMLFieldSetElement>} // * integrate with layout grid logic
        id="bodyTypeMuscleForm" // * matches layoutParams above
      >
        <Forms.Header containerId="mscLeg" id="mscLegStack">
          {/* * reuse dictionary key for muscle level */}
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.mcl ?? "Muscle Level"}
        </Forms.Header>

        <OptionFieldset selector="msc">
          {muscleOptions &&
            Object.entries(muscleOptions).map(([k, v], i) => {
              const opt = v as OptDict; // * single cast to OptDict
              const isChecked = state.character.muscle === k; // * controlled selection from Redux

              return (
                <OptionFigure
                  key={k}
                  figureAddClasses={[CLASSES.STL_OPT]}
                  prefix="msc" // * match selector / group
                  suffix={`${i + 1}`}
                  value={k}
                  checked={isChecked} // * OptionFigure controlled through checked
                  handleChange={handleBodyTypeChange}
                  name="msc" // * correct radio group name for muscle
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

      <Forms.Result variable={state.character.muscle} />
      {/* * shared result component, consistent with other forms */}
    </ErrorBoundary>
  );
}
