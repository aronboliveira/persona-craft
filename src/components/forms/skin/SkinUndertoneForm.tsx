import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, skinUndertones } from "../../../lib/data/opts";
import { SkinUndertone } from "../../../lib/declarations/types/anatomy";
import { updateSkin } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { skinSelector } from "../../../redux/mainStore/selectors/characterSelectors";

export default function SkinUndertoneForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["skinUndertoneForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((s: RootState) => s);
  const skin = skinSelector(rootState);

  const options = useMemo(
    () =>
      skinUndertones.map(ut => ({
        key: ut,
        friendlyName: ut.charAt(0).toUpperCase() + ut.slice(1),
        src: `${imgBasePath}/creations/undertone-${ut}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as SkinUndertone;
      if (!(skinUndertones as readonly string[]).includes(value)) return;
      dispatch(updateSkin({ undertone: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="skinUndertoneForm"
      >
        <Forms.Header containerId="skuLeg" id="skuLegStack">
          Skin Undertone
        </Forms.Header>
        <OptionFieldset selector="sku">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="sku"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={skin.undertone === opt.key}
              handleChange={handleChange}
              name="sku"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} undertone` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={skin.undertone} />
    </ErrorBoundary>
  );
}
