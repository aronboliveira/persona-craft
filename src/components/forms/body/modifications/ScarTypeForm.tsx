import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, scrTps } from "../../../../lib/data/opts";
import { ScarType } from "../../../../lib/declarations/types/anatomy";
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

export default function ScarTypeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["scarTypeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const bodyMods = useAppSelector(bodyModificationsSelector);

  const options = useMemo(
    () =>
      scrTps.map(tp => ({
        key: tp,
        friendlyName: tp
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/scar-type-${tp}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as ScarType;
      if (!(scrTps as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ scar: { type: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="scarTypeForm"
      >
        <Forms.Header containerId="scrTpLeg" id="scrTpLegStack">
          Scar Type
        </Forms.Header>
        <OptionFieldset selector="scrTp">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="scrTp"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.scar.type === opt.key}
              handleChange={handleChange}
              name="scrTp"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} scar type` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.scar.type} />
    </ErrorBoundary>
  );
}
