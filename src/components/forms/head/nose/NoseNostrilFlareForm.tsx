import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsNtFl, imgBasePath } from "../../../../lib/data/opts";
import { NoseNostrilFlare } from "../../../../lib/declarations/types/anatomy";
import { updateNose } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { noseSelector } from "../../../../redux/mainStore/selectors/characterSelectors";

export default function NoseNostrilFlareForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseNostrilFlareForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);
  const options = useMemo(
    () =>
      nsNtFl.map(fl => ({
        key: fl,
        friendlyName: fl.charAt(0).toUpperCase() + fl.slice(1),
        src: `${imgBasePath}/head/noses/${fl}-flare.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseNostrilFlare;
      if (!nsNtFl.includes(value)) return;
      dispatch(updateNose({ nostril: { flare: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseNostrilFlareForm"
      >
        <Forms.Header containerId="nsNtFlLeg" id="nsNtFlLegStack">
          Nostril Flare
        </Forms.Header>
        <OptionFieldset selector="nsNtFl">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsNtFl"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.nostril.flare === opt.key}
              handleChange={handleChange}
              name="nsNtFl"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nostril flare` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.nostril.flare} />
    </ErrorBoundary>
  );
}
