import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { erSz } from "../../../../lib/data/opts";
import { EarSize } from "../../../../lib/declarations/types/anatomy";
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

export default function EarSizeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["earSizeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const ear = useAppSelector(earSelector);

  const options = useMemo(() => {
    const basePath = "/imgs/head/ear/size",
      fileMap: Record<EarSize, string> = {
        small: "skt_ear_sz_0_sm.png",
        average: "skt_ear_sz_1_avg.png",
        large: "skt_ear_sz_2_lg.png",
      };
    return erSz.map(sz => ({
      key: sz,
      friendlyName: sz.charAt(0).toUpperCase() + sz.slice(1),
      src: `${basePath}/${fileMap[sz]}`,
    }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as EarSize;
      if (!erSz.includes(value)) return;
      dispatch(updateEar({ size: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="earSizeForm"
      >
        <Forms.Header containerId="erSzLeg" id="erSzLegStack">
          Ear Size
        </Forms.Header>
        <OptionFieldset selector="erSz">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="erSz"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={ear.size === opt.key}
              handleChange={handleChange}
              name="erSz"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} ear size` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={ear.size} />
    </ErrorBoundary>
  );
}
