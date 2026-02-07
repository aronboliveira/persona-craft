import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject } from "react";
import { BodyMuscleTypes } from "../../lib/declarations/types/anatomy";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { updatePrompt } from "../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../lib/data/classes";
import { RootState } from "../../redux/mainStore";
import {
  GdAbbr,
  gdAbbrs,
  gds,
  imgBasePath,
  mscLvls,
  muscleDetails,
} from "../../lib/data/opts";
import { PromptState } from "../../lib/declarations/interfaces/redux";
import { OptDict } from "../../lib/declarations/interfaces/utils";
import { GENERIC_DICT } from "../../lib/states/lang/generic";
import OptionFigure from "../bloc/OptionFigure";
import { useAppDispatch, useAppSelector } from "../../redux/mainStore/hooks";
import {
  Gender,
  GenderAbbr,
  ImageFormat,
  StyleSets,
} from "../../lib/declarations/types/helpers";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../bloc/OptionFieldset";
import Forms from "../../pages/Forms";
import ErrorHandler from "../../lib/utils/ErrorHandler";
import { genderAbbrSelector } from "../../redux/mainStore/selectors/characterSelectors";

export default function BodyTypeMuscleForm() {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["bodyTypeMuscleForm"], // * use layout context; no APP_IDS key yet, so use literal id
      objectFit: "contain",
    }),
    dispatch = useAppDispatch(),
    rootState = useAppSelector((s: RootState) => s),
    state = rootState.prompt as PromptState,
    gender = genderAbbrSelector(rootState),
    stKey = useMemo(
      () =>
        ((): StyleSets => {
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
    ),
    muscleOptions = useMemo(() => {
      return ((
        gnd: GenderAbbr | Gender = "fm",
        stl: StyleSets = "anm"
      ): {
        [K in BodyMuscleTypes]: {
          friendlyName: string;
          src: `${typeof imgBasePath}/muscle/${string}.${ImageFormat}`;
        };
      } => {
        gnd = gdAbbrs.includes(gnd as any)
          ? gnd
          : gds.includes(gnd as any)
          ? GdAbbr[gnd as Gender]
          : "fm";
        return mscLvls.reduce(
          (acc, mscLvl) => {
            acc[mscLvl] = {
              friendlyName: muscleDetails[mscLvl].friendlyName,
              src: `${imgBasePath}/muscle/${stl}/${
                Object.values(GdAbbr).includes(gnd as GdAbbr)
                  ? gnd
                  : gnd in GdAbbr
                  ? GdAbbr[gnd as keyof typeof GdAbbr]
                  : "fm"
              }/${mscLvl}.png` as any,
            };
            return acc;
          },
          {} as {
            [K in BodyMuscleTypes]: {
              friendlyName: string;
              src: `${typeof imgBasePath}/muscle/${string}.${ImageFormat}`;
            };
          }
        );
      })(gender, stKey);
    }, [gender, stKey]),
    handleBodyTypeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      [dispatch, state.character]
    );
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
        id="bodyTypeMuscleForm"
      >
        <Forms.Header containerId="mscLeg" id="mscLegStack">
          {/* * reuse dictionary key for muscle level */}
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.mcl ?? "Muscle Level"}
        </Forms.Header>
        <OptionFieldset selector="msc">
          {muscleOptions &&
            Object.entries(muscleOptions).map(([k, v], i) => {
              const opt = v as OptDict;
              const isChecked = state.character.muscle === k;
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
