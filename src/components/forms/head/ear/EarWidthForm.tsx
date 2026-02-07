import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { erWd } from "../../../../lib/data/opts";
import { EarWidth } from "../../../../lib/declarations/types/anatomy";
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

export default function EarWidthForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["earWidthForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const ear = useAppSelector(earSelector);

  const options = useMemo(() => {
    const basePath = "/imgs/head/ear/width",
      fileMap: Record<EarWidth, string> = {
        narrow: "skt_ear_wdt_0_nrw.png",
        average: "skt_ear_wdt_1_0_avg.png",
        wide: "skt_ear_wdt_2_wid.png",
      };
    return erWd.map(w => ({
      key: w,
      friendlyName: w.charAt(0).toUpperCase() + w.slice(1),
      src: `${basePath}/${fileMap[w]}`,
    }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as EarWidth;
      if (!erWd.includes(value)) return;
      dispatch(updateEar({ width: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="earWidthForm"
      >
        <Forms.Header containerId="erWdLeg" id="erWdLegStack">
          Ear Width
        </Forms.Header>
        <OptionFieldset selector="erWd">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="erWd"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={ear.width === opt.key}
              handleChange={handleChange}
              name="erWd"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} ear width` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={ear.width} />
    </ErrorBoundary>
  );
}
