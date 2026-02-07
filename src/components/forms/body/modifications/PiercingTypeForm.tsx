import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, prcTps } from "../../../../lib/data/opts";
import { PiercingType } from "../../../../lib/declarations/types/anatomy";
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

export default function PiercingTypeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["piercingTypeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const bodyMods = useAppSelector(bodyModificationsSelector);

  const options = useMemo(
    () =>
      prcTps.map(tp => ({
        key: tp,
        friendlyName: tp
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/piercing-${tp}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as PiercingType;
      if (!(prcTps as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ piercing: { type: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="piercingTypeForm"
      >
        <Forms.Header containerId="prcTpLeg" id="prcTpLegStack">
          Piercing Type
        </Forms.Header>
        <OptionFieldset selector="prcTp">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="prcTp"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.piercing.type === opt.key}
              handleChange={handleChange}
              name="prcTp"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} piercing` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.piercing.type} />
    </ErrorBoundary>
  );
}
