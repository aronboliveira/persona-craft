import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { erLb } from "../../../../lib/data/opts";
import { EarLobe } from "../../../../lib/declarations/types/anatomy";
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

export default function EarLobeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["earLobeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const ear = useAppSelector(earSelector);

  const options = useMemo(() => {
    const basePath = "/imgs/head/ear/lobe",
      fileMap: Record<EarLobe, string> = {
        attached: "skt_ear_lb_2_at.png",
        "partially-attached": "skt_ear_lb_1_hat.png",
        free: "skt_ear_lb_0_uat.png",
      };
    return erLb.map(l => ({
      key: l,
      friendlyName: l
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      src: `${basePath}/${fileMap[l]}`,
    }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as EarLobe;
      if (!erLb.includes(value)) return;
      dispatch(updateEar({ lobe: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="earLobeForm"
      >
        <Forms.Header containerId="erLbLeg" id="erLbLegStack">
          Ear Lobe
        </Forms.Header>
        <OptionFieldset selector="erLb">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="erLb"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={ear.lobe === opt.key}
              handleChange={handleChange}
              name="erLb"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} ear lobe` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={ear.lobe} />
    </ErrorBoundary>
  );
}
