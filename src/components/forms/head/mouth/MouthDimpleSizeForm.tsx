import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "../../../../lib/utils/ErrorHandler";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../../lib/states/lang/generic";
import { MouthDimpleSize } from "../../../../lib/declarations/types/anatomy";
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
import { mthDmpSz } from "../../../../lib/data/opts";
import { DeepOptional } from "../../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../../lib/declarations/interfaces/anatomy";

export default function MouthDimpleSizeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["mouthDimpleSizeForm"],
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    sizeOptions = useMemo<DeepAnatomicOption<MouthDimpleSize>[]>(() => {
      const basePath = "/imgs/mouth/dimple-size",
        labelMap: Record<MouthDimpleSize, string> = {
          null: "None",
          small: "Small",
          average: "Average",
          large: "Large",
        },
        uniqueSizes = Array.from(new Set(mthDmpSz)) as MouthDimpleSize[];
      return uniqueSizes.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleSizeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as MouthDimpleSize;
        dispatch(
          updateMouth({
            dimple: {
              size: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedSize = state.character.head?.mouth?.dimple?.size as
      | MouthDimpleSize
      | undefined;
  return (
    <ErrorBoundary
      onError={(error, info) =>
        ErrorHandler.handleReactBoundaryError({
          error,
          info,
          alertType: "hot",
          context: "MouthDimpleSizeForm",
        })
      }
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="mouthDimpleSizeForm"
      >
        <Forms.Header containerId="mdsLeg" id="mdsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.mds ??
            "What is the mouth dimple size of your character?"}
        </Forms.Header>
        <OptionFieldset selector="mds">
          {sizeOptions.map((opt, i) => {
            const isChecked = selectedSize === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="mds"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleSizeChange}
                name="mds"
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
      <Forms.Result variable={selectedSize ?? ""} />
    </ErrorBoundary>
  );
}
