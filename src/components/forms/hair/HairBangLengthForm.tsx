import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import {
  useCallback,
  useMemo,
  useRef,
  RefObject,
  ChangeEvent,
  JSX,
} from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairBangLength } from "../../../lib/declarations/types/anatomy";
import { updateHair } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrBgLg } from "../../../lib/data/opts";
import { DeepOptional } from "../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../lib/utils/ErrorHandler";

export default function HairBangLengthForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairBangLengthForm"],
      objectFit: "contain",
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    suffix = useRef<string>(Math.floor(Math.random() * 100) > 50 ? "" : "_2"),
    lengthOptions = useMemo<DeepAnatomicOption<HairBangLength>[]>(() => {
      const basePath = "/imgs/hair/bang/length",
        labelMap: Record<HairBangLength, string> = {
          micro: "Micro",
          short: "Short",
          "eyebrow-skimming": "Eyebrow-skimming",
          "lash-length": "Lash-length",
          "cheekbone-length": "Cheekbone-length",
          "lip-length": "Lip-length",
        };
      return hrBgLg.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}${suffix.current}.png`,
      }));
    }, []),
    handleBangLengthChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairBangLength;
        dispatch(
          updateHair({
            bang: {
              length: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedLength = state.character.hair?.bang?.length as
      | HairBangLength
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
        id="hairBangLengthForm"
      >
        <Forms.Header containerId="hblLeg" id="hblLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hbl ??
            "What is the bang length of your character?"}
        </Forms.Header>
        <OptionFieldset selector="hbl">
          {lengthOptions.map((opt, i) => {
            const isChecked = selectedLength === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hbl"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleBangLengthChange}
                name="hbl"
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
      <Forms.Result variable={selectedLength ?? ""} />
    </ErrorBoundary>
  );
}
