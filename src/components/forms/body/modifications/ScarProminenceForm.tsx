import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, scrPrms } from "../../../../lib/data/opts";
import { ScarProminence } from "../../../../lib/declarations/types/anatomy";
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

export default function ScarProminenceForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["scarProminenceForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const bodyMods = useAppSelector(bodyModificationsSelector);

  const options = useMemo(
    () =>
      scrPrms.map(prm => ({
        key: prm,
        friendlyName: prm.charAt(0).toUpperCase() + prm.slice(1),
        src: `${imgBasePath}/creations/scar-prominence-${prm}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as ScarProminence;
      if (!(scrPrms as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ scar: { prominence: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="scarProminenceForm"
      >
        <Forms.Header containerId="scrPrmLeg" id="scrPrmLegStack">
          Scar Prominence
        </Forms.Header>
        <OptionFieldset selector="scrPrm">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="scrPrm"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.scar.prominence === opt.key}
              handleChange={handleChange}
              name="scrPrm"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} scar prominence` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.scar.prominence} />
    </ErrorBoundary>
  );
}
