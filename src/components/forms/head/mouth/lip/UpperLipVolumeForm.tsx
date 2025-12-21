import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { UpperLipThickness } from "../../../../../lib/declarations/types/anatomy";
import { updateUpperLip } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { mtUpLpVlm } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function UpperLipVolumeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["upperLipVolumeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    volumeOptions = useMemo<DeepAnatomicOption<UpperLipThickness>[]>(() => {
      const basePath = "/imgs/mouth/upper-lip-volume",
        labelMap: Record<UpperLipThickness, string> = {
          "very-flat": "Very flat",
          flat: "Flat",
          average: "Average",
          full: "Full",
          "very-full": "Very full",
          "extremely-full": "Extremely full",
        },
        uniqueVolumes = Array.from(new Set(mtUpLpVlm)) as UpperLipThickness[];
      return uniqueVolumes.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleVolumeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as UpperLipThickness;
        dispatch(
          updateUpperLip({
            volume: value,
          })
        );
      },
      [dispatch]
    ),
    selectedVolume = state.character.head?.mouth?.lip?.upper?.volume as
      | UpperLipThickness
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
        id="upperLipVolumeForm"
      >
        <Forms.Header containerId="ulvLeg" id="ulvLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ulv ??
            "What is the upper lip volume of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ulv">
          {volumeOptions.map((opt, i) => {
            const isChecked = selectedVolume === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ulv"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleVolumeChange}
                name="ulv"
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
      <Forms.Result variable={selectedVolume ?? ""} />
    </ErrorBoundary>
  );
}
