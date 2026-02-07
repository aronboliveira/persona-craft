import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath } from "../../../lib/data/opts";
import { SkinTone } from "../../../lib/declarations/types/anatomy";
import { updateSkin } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import {
  skinSelector,
  filteredSkinTonesSelector,
} from "../../../redux/mainStore/selectors/characterSelectors";

export default function SkinToneForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["skinToneForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((s: RootState) => s);
  const skin = skinSelector(rootState);
  const filteredTones = filteredSkinTonesSelector(rootState);

  const options = useMemo(
    () =>
      filteredTones.map(tone => ({
        key: tone,
        friendlyName: tone
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/skin-${tone}.png`,
      })),
    [filteredTones],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as SkinTone;
      if (!(filteredTones as readonly string[]).includes(value)) return;
      dispatch(updateSkin({ tone: value }));
    },
    [dispatch, filteredTones],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="skinToneForm"
      >
        <Forms.Header containerId="sktLeg" id="sktLegStack">
          Skin Tone
        </Forms.Header>
        <OptionFieldset selector="skt">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="skt"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={skin.tone === opt.key}
              handleChange={handleChange}
              name="skt"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} skin tone` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={skin.tone} />
    </ErrorBoundary>
  );
}
