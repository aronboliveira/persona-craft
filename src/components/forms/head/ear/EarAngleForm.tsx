import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { erAng } from "../../../../lib/data/opts";
import { EarAngle } from "../../../../lib/declarations/types/anatomy";
import { updateEar } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { earSelector } from "../../../../redux/mainStore/selectors/characterSelectors";

export default function EarAngleForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["earAngleForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const ear = useAppSelector(earSelector);

  const options = useMemo(() => {
    const basePath = "/imgs/head/ear/angle",
      fileMap: Record<EarAngle, string> = {
        flat: "skt_ear_frt_0_rcs.png",
        "slightly-protruding": "skt_ear_frt_1_ntr.png",
        protruding: "skt_ear_frt_2_0_prm.png",
      };
    return erAng.map(a => ({
      key: a,
      friendlyName: a
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      src: `${basePath}/${fileMap[a]}`,
    }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as EarAngle;
      if (!erAng.includes(value)) return;
      dispatch(updateEar({ angle: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="earAngleForm"
      >
        <Forms.Header containerId="erAngLeg" id="erAngLegStack">
          Ear Angle
        </Forms.Header>
        <OptionFieldset selector="erAng">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="erAng"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={ear.angle === opt.key}
              handleChange={handleChange}
              name="erAng"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} ear angle` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={ear.angle} />
    </ErrorBoundary>
  );
}
