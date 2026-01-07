import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "../../../../../lib/utils/ErrorHandler";
import GenericErrorComponent from "../../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../../lib/states/lang/generic";
import { LipsVermillion } from "../../../../../lib/declarations/types/anatomy";
import { updateMouth } from "../../../../../redux/mainStore/slices/promptSlice";
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
import { mtLpVrm } from "../../../../../lib/data/opts";
import { DeepOptional } from "../../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../../lib/declarations/interfaces/anatomy";

export default function LipsVermillionForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["lipsVermillionForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    vermillionOptions = useMemo<DeepAnatomicOption<LipsVermillion>[]>(() => {
      const basePath = "/imgs/mouth/lips-vermillion",
        labelMap: Record<LipsVermillion, string> = {
          blurred: "Blurred",
          noticeable: "Noticeable",
          marked: "Marked",
        },
        uniqueVermillions = Array.from(new Set(mtLpVrm)) as LipsVermillion[];
      return uniqueVermillions.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleVermillionChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as LipsVermillion;
        dispatch(
          updateMouth({
            lips: {
              vermillion: value,
            },
          } as any)
        );
      },
      [dispatch]
    ),
    selectedVermillion = state.character.head?.mouth?.lips?.vermillion as
      | LipsVermillion
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, info) =>
        ErrorHandler.handleReactBoundaryError({
          error,
          info,
          alertType: "hot",
          context: "LipsVermillionForm",
        })
      }
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="lipsVermillionForm"
      >
        <Forms.Header containerId="lvLeg" id="lvLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.lv ??
            "How defined is the lips vermillion border of your character?"}
        </Forms.Header>
        <OptionFieldset selector="lv">
          {vermillionOptions.map((opt, i) => {
            const isChecked = selectedVermillion === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="lv"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleVermillionChange}
                name="lv"
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
      <Forms.Result variable={selectedVermillion ?? ""} />
    </ErrorBoundary>
  );
}
