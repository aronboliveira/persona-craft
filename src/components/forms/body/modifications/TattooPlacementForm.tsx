import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, ttPlcs } from "../../../lib/data/opts";
import { TattooPlacement } from "../../../lib/declarations/types/anatomy";
import { updateBodyModifications } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { bodyModificationsSelector } from "../../../redux/mainStore/selectors/characterSelectors";

export default function TattooPlacementForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["tattooPlacementForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((s: RootState) => s);
  const bodyMods = bodyModificationsSelector(rootState);

  const options = useMemo(
    () =>
      ttPlcs.map(plc => ({
        key: plc,
        friendlyName: plc
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/tattoo-placement-${plc}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as TattooPlacement;
      if (!(ttPlcs as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ tattoo: { placement: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="tattooPlacementForm"
      >
        <Forms.Header containerId="ttPlcLeg" id="ttPlcLegStack">
          Tattoo Placement
        </Forms.Header>
        <OptionFieldset selector="ttPlc">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="ttPlc"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.tattoo.placement === opt.key}
              handleChange={handleChange}
              name="ttPlc"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} tattoo placement` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.tattoo.placement} />
    </ErrorBoundary>
  );
}
