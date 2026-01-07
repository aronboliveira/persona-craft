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
import { HairBangShape } from "../../../lib/declarations/types/anatomy";
import { updateHair } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrBgSp } from "../../../lib/data/opts";
import { DeepOptional } from "../../../lib/declarations/types/utils";
import { DeepAnatomicOption } from "../../../lib/declarations/interfaces/anatomy";
import ErrorHandler from "../../../lib/utils/ErrorHandler";

export default function HairBangShapeForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairBangShapeForm"],
      objectFit: "contain",
    }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {},
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    suffix = useRef<string>(Math.floor(Math.random() * 100) > 50 ? "" : "_2"),
    shapeOptions = useMemo<DeepAnatomicOption<HairBangShape>[]>(() => {
      const basePath = "/imgs/hair/bang/shape",
        labelMap: Record<HairBangShape, string> = {
          blunt: "Blunt",
          arched: "Arched",
          feathered: "Feathered",
          curtain: "Curtain",
          "side-swept": "Side-swept",
          asymmetrical: "Asymmetrical",
        };
      return hrBgSp.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}${suffix.current}.png`,
      }));
    }, []),
    handleBangShapeChange = useCallback<
      DeepOptional<(e: ChangeEvent<HTMLInputElement>) => void>
    >(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairBangShape;
        dispatch(
          updateHair({
            bang: {
              shape: value,
            },
          })
        );
      },
      [dispatch]
    ),
    selectedShape = state.character.hair?.bang?.shape as
      | HairBangShape
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
        id="hairBangShapeForm"
      >
        <Forms.Header containerId="hbsLeg" id="hbsLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.hbs ??
            "What is the bang shape of your character?"}
        </Forms.Header>
        <OptionFieldset selector="hbs">
          {shapeOptions.map((opt, i) => {
            const isChecked = selectedShape === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="hbs"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleBangShapeChange}
                name="hbs"
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
      <Forms.Result variable={selectedShape ?? ""} />
    </ErrorBoundary>
  );
}
