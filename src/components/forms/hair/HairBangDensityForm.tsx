// src/components/forms/HairBangDensityForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairBangDensity } from "../../../lib/declarations/types/anatomy";
import { updateHair } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrBgDs } from "../../../lib/data/opts";
import { DeepOptional } from "../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../lib/declarations/interfaces/anatomy";

export default function HairBangDensityForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairBangDensityForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    bangOptions = useMemo<DeepAnatomicOption<HairBangDensity>[]>(() => {
      const basePath = "/imgs/hair/bang",
        labelMap: Record<HairBangDensity, string> = {
          full: "Full",
          fringe: "Fringe",
          piecey: "Piecey",
          wispy: "Wispy",
          absent: "Absent",
        };
      return hrBgDs.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleBangDensityChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairBangDensity;
        dispatch(
          updateHair({
            bang: {
              density: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedDensity = state.character.hair?.bang?.density as
      | HairBangDensity
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
        id="hairBangDensityForm"
      >
        <Forms.Header containerId="hbdLeg" id="hbdLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hbd ??
            "What is the bang density of your character?"}
        </Forms.Header>
        <OptionFieldset selector="hbd">
          {bangOptions.map((opt, i) => {
            const isChecked = selectedDensity === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hbd"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleBangDensityChange}
                name="hbd"
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
      <Forms.Result variable={selectedDensity ?? ""} />
    </ErrorBoundary>
  );
}
