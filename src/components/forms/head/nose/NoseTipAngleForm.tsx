import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsTpAng, imgBasePath } from "../../../../lib/data/opts";
import { NoseTipAngle } from "../../../../lib/declarations/types/anatomy";
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

export default function NoseTipAngleForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseTipAngleForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);

  const options = useMemo(
    () =>
      nsTpAng.map(a => ({
        key: a,
        friendlyName: a.charAt(0).toUpperCase() + a.slice(1),
        src: `${imgBasePath}/head/noses/${a}-tip.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseTipAngle;
      if (!nsTpAng.includes(value)) return;
      dispatch(updateNose({ tipAngle: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseTipAngleForm"
      >
        <Forms.Header containerId="nsTpAngLeg" id="nsTpAngLegStack">
          Nose Tip Angle
        </Forms.Header>
        <OptionFieldset selector="nsTpAng">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsTpAng"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.tipAngle === opt.key}
              handleChange={handleChange}
              name="nsTpAng"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nose tip angle` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.tipAngle} />
    </ErrorBoundary>
  );
}
