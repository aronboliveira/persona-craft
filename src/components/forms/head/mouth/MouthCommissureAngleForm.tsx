import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "../../../../lib/utils/ErrorHandler";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import { MouthCommissureAngle } from "../../../../lib/declarations/types/anatomy";
import { updateMouth } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { RootState } from "../../../../redux/mainStore";
import { PromptState } from "../../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { mthCmmAng } from "../../../../lib/data/opts";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";

export default function MouthCommissureAngleForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["mouthCommissureAngleForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    angleOptions = useMemo<DeepAnatomicOption<MouthCommissureAngle>[]>(() => {
      const basePath = "/imgs/mouth/commissure-angle",
        labelMap: Record<MouthCommissureAngle, string> = {
          downturned: "Downturned",
          neutral: "Neutral",
          upturned: "Upturned",
        },
        uniqueAngles = Array.from(new Set(mthCmmAng)) as MouthCommissureAngle[];
      return uniqueAngles.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleAngleChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as MouthCommissureAngle;
        dispatch(
          updateMouth({
            commissure: {
              angle: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedAngle = state.character.head?.mouth?.commissure?.angle as
      | MouthCommissureAngle
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, info) =>
        ErrorHandler.handleReactBoundaryError({
          error,
          info,
          alertType: "hot",
          context: "MouthCommissureAngleForm",
        })
      }
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="mouthCommissureAngleForm"
      >
        <Forms.Header containerId="mcaLeg" id="mcaLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.mca ??
            "What is the mouth commissure angle of your character?"}
        </Forms.Header>
        <OptionFieldset selector="mca">
          {angleOptions.map((opt, i) => {
            const isChecked = selectedAngle === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="mca"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleAngleChange}
                name="mca"
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
      <Forms.Result variable={selectedAngle ?? ""} />
    </ErrorBoundary>
  );
}
