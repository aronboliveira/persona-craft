// src/components/forms/EyebrowDensityForm.tsx

import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { EyebrowDensity } from "../../../../../lib/declarations/types/anatomy";
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
import { eyeBrwDst } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";

export default function EyebrowDensityForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["eyebrowDensityForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    densityOptions = useMemo<DeepAnatomicOption<EyebrowDensity>[]>(() => {
      const basePath = "/imgs/head/brow/density",
        labelMap: Record<EyebrowDensity, string> = {
          absent: "Absent",
          bare: "Bare",
          sparse: "Sparse",
          light: "Light",
          medium: "Medium",
          dense: "Dense",
          bushy: "Bushy",
        },
        fileMap: Record<EyebrowDensity, string> = {
          absent: "skt_eye_brw_0_null.png",
          bare: "skt_eye_brw_1_br.png",
          sparse: "skt_eye_brw_2_spr.png",
          light: "skt_eye_brw_3_lg.png",
          medium: "skt_eye_brw_4_0_md.png",
          dense: "skt_eye_brw_5_dns.png",
          bushy: "skt_eye_brw_6_bs.png",
        },
        uniqueDensities = Array.from(new Set(eyeBrwDst)) as EyebrowDensity[];
      return uniqueDensities.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${fileMap[key]}`,
      }));
    }, []),
    handleDensityChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as EyebrowDensity;
        dispatch(
          updateBrow({
            density: value,
          }),
        );
      },
      [dispatch],
    ),
    selectedDensity = state.character.head?.eye?.brow?.density as
      | EyebrowDensity
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
        id="eyebrowDensityForm"
      >
        <Forms.Header containerId="ebdLeg" id="ebdLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.ebd ??
            "What is the eyebrow density of your character?"}
        </Forms.Header>
        <OptionFieldset selector="ebd">
          {densityOptions.map((opt, i) => {
            const isChecked = selectedDensity === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="ebd"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleDensityChange}
                name="ebd"
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
