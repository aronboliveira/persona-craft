import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../../lib/states/lang/generic";
import { CupidBowHeight } from "../../../../../../lib/declarations/types/anatomy";
import { updateUpperLip } from "../../../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../redux/mainStore/hooks";
import { RootState } from "../../../../../../redux/mainStore";
import { PromptState } from "../../../../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../../../bloc/OptionFieldset";
import OptionFigure from "../../../../../bloc/OptionFigure";
import Forms from "../../../../../../pages/Forms";
import { mtCpBwHgt } from "../../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../../lib/declarations/interfaces/anatomy";

export default function CupidBowHeightForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["cupidBowHeightForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    heightOptions = useMemo<DeepAnatomicOption<CupidBowHeight>[]>(() => {
      const basePath = "/imgs/mouth/cupid-bow-height",
        labelMap: Record<CupidBowHeight, string> = {
          short: "Short",
          average: "Average",
          tall: "Tall",
        },
        uniqueHeights = Array.from(new Set(mtCpBwHgt)) as CupidBowHeight[];
      return uniqueHeights.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleHeightChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as CupidBowHeight;
        dispatch(
          updateUpperLip({
            cupidBow: { height: value },
          })
        );
      },
      [dispatch]
    ),
    selectedHeight = state.character.head?.mouth?.lip?.upper?.cupidBow
      ?.height as CupidBowHeight | undefined;
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
        id="cupidBowHeightForm"
      >
        <Forms.Header containerId="cbhLeg" id="cbhLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.cbh ??
            "What is the cupid bow height of your character?"}
        </Forms.Header>
        <OptionFieldset selector="cbh">
          {heightOptions.map((opt, i) => {
            const isChecked = selectedHeight === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="cbh"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleHeightChange}
                name="cbh"
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
      <Forms.Result variable={selectedHeight ?? ""} />
    </ErrorBoundary>
  );
}
