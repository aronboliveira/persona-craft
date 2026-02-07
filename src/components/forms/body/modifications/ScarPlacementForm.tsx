import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, scrPlcs } from "../../../../lib/data/opts";
import { ScarPlacement } from "../../../../lib/declarations/types/anatomy";
import { updateBodyModifications } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { bodyModificationsSelector } from "../../../../redux/mainStore/selectors/characterSelectors";

export default function ScarPlacementForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["scarPlacementForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const bodyMods = useAppSelector(bodyModificationsSelector);

  const options = useMemo(
    () =>
      scrPlcs.map(plc => ({
        key: plc,
        friendlyName: plc
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/scar-placement-${plc}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as ScarPlacement;
      if (!(scrPlcs as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ scar: { placement: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="scarPlacementForm"
      >
        <Forms.Header containerId="scrPlcLeg" id="scrPlcLegStack">
          Scar Placement
        </Forms.Header>
        <OptionFieldset selector="scrPlc">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="scrPlc"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.scar.placement === opt.key}
              handleChange={handleChange}
              name="scrPlc"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} scar placement` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.scar.placement} />
    </ErrorBoundary>
  );
}
