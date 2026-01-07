import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { FORMS_OPTS } from "../../lib/data/opts";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import { useMemo, useCallback, RefObject } from "react"; // * added useCallback + RefObject
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { ValidateGender } from "../../lib/utils/validations";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { StyleSets } from "../../lib/declarations/types/helpers";
import { RootState } from "../../redux/mainStore"; // * kept for selector typing
import { PromptState } from "../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import APP_IDS from "../../lib/data/ids";
import OptionFigure from "../bloc/OptionFigure";
import { CLASSES } from "../../lib/data/classes";
import OptionFieldset from "../bloc/OptionFieldset";
import Forms from "../../pages/Forms";
import { useAppDispatch, useAppSelector } from "../../redux/mainStore/hooks"; // * use typed hooks instead of raw useSelector

export default function GenderForm() {
  const { lang, formRef } = useOptFormCtx({
    layoutParams: [APP_IDS["GENDER_FORM_ID"]],
  }); // * use layout context for ref/lang only

  const dispatch = useAppDispatch(); // * Redux dispatch

  const state = useAppSelector((s: RootState) => s.prompt as PromptState); // * prompt state from Redux as single source of truth

  const stKey = useMemo(
    () =>
      ((): StyleSets => {
        // * map ImageStyle -> StyleSets (aligns with /public/imgs/gender/{anm,crt,ptr,px,skt,sr})
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
  );

  const handleGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      // * event-based handler compatible with Radio
      const newValue = e.target.value;
      if (!ValidateGender(newValue)) return;

      dispatch(
        updatePrompt({
          character: {
            ...state.character,
            gender: newValue,
          },
        })
      );
    },
    [dispatch, state.character]
  );

  const genderOptions = useMemo(() => {
    const raw = (FORMS_OPTS.gd as Record<StyleSets, Record<string, OptDict>>)[
      stKey
    ]; // * pick the correct style-set branch
    return raw ?? null;
  }, [stKey]);

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>} // * ensure layout/grid hooks can measure this form
        id={APP_IDS["GENDER_FORM_ID"]}
      >
        <Forms.Header containerId="gdLeg" id="gdLegStack">
          {/* * still using stl key as you have no dedicated gd label yet; fallback is "Gender" */}
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.gd ?? "Gender"}
        </Forms.Header>
        <OptionFieldset selector="gd">
          {genderOptions &&
            Object.entries(genderOptions).map(([k, v], i) => {
              const opt = v as OptDict;
              const isChecked = state.character.gender === k; // * Redux-controlled selection

              return (
                <OptionFigure
                  key={k}
                  figureAddClasses={[CLASSES.STL_OPT]}
                  prefix="gd" // * match gender field
                  suffix={`${i + 1}`}
                  value={k}
                  checked={isChecked} // * OptionFigure now controlled
                  handleChange={handleGenderChange}
                  name="gd"
                  src={opt.src} // * src comes from FORMS_OPTS.gd, which matches /public/imgs/gender tree
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
      <Forms.Result variable={state.character.gender} />
    </ErrorBoundary>
  );
}
