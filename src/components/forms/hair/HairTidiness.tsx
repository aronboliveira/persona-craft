import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { FORM_DICT } from "../../../lib/states/lang/forms";
import { GENERIC_DICT } from "../../../lib/states/lang/generic";
import { HairTidiness } from "../../../lib/declarations/types/anatomy";
import { updatePrompt } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { PromptState } from "../../../lib/declarations/interfaces/redux";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { hrTd } from "../../../lib/data/opts";
import { HairTidinessOption } from "../../../lib/declarations/interfaces/anatomy";
export default function HairTidinessForm(): JSX.Element {
  const { lang, formRef } = useOptFormCtx({
      layoutParams: ["hairTidinessForm"],
    }),
    dispatch = useAppDispatch(),
    state = useAppSelector((s: RootState) => s.prompt as PromptState),
    tidinessOptions = useMemo<HairTidinessOption[]>(() => {
      const basePath = "/imgs/hair/tidiness",
        labelMap: Record<HairTidiness, string> = {
          done: "Neatly done",
          tousled: "Tousled",
          frizzy: "Frizzy",
          disheveled: "Disheveled",
        };
      return hrTd.map(key => ({
        key,
        friendlyName: labelMap[key],
        src: `${basePath}/${key}.png`,
      }));
    }, []),
    handleTidinessChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value as HairTidiness;
        dispatch(
          updatePrompt({
            character: {
              ...state.character,
              hair: {
                ...(state.character.hair ?? {
                  texture: "wavy" as any,
                  tidiness: "done" as any,
                  bang: { density: "full" as any, length: "short" as any },
                }),
                tidiness: value,
              },
            },
          })
        );
      },
      [dispatch, state.character]
    ),
    selectedTidiness = state.character.hair?.tidiness as
      | HairTidiness
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
        id="hairTidinessForm"
      >
        <Forms.Header containerId="htdLeg" id="htdLegStack">
          {FORM_DICT[lang as keyof typeof FORM_DICT]?.htd ??
            "What is the hair tidiness of your character?"}
        </Forms.Header>
        <OptionFieldset selector="htd">
          {tidinessOptions.map((opt, i) => {
            const isChecked = selectedTidiness === opt.key;
            return (
              <OptionFigure
                key={opt.key}
                figureAddClasses={[CLASSES.STL_OPT]}
                prefix="htd"
                suffix={`${i + 1}`}
                value={opt.key}
                checked={isChecked}
                handleChange={handleTidinessChange}
                name="htd"
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
      <Forms.Result variable={selectedTidiness ?? ""} />
    </ErrorBoundary>
  );
}
