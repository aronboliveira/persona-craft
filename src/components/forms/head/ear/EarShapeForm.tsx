import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { erShp } from "../../../../lib/data/opts";
import { EarShape } from "../../../../lib/declarations/types/anatomy";
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

export default function EarShapeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["earShapeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const ear = useAppSelector(earSelector);

  const options = useMemo(() => {
    const basePath = "/imgs/head/ear/shape",
      fileMap: Record<EarShape, string> = {
        round: "skt_ear_sp_0_hmn.png",
        pointed: "skt_ear_sp_2_elf.png",
        square: "skt_ear_sp_1_helf.png",
        oval: "skt_ear_sp_3_nelf.png",
        triangular: "skt_ear_sp_4_cat.png",
      };
    return erShp.map(s => ({
      key: s,
      friendlyName: s.charAt(0).toUpperCase() + s.slice(1),
      src: `${basePath}/${fileMap[s]}`,
    }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as EarShape;
      if (!erShp.includes(value)) return;
      dispatch(updateEar({ shape: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="earShapeForm"
      >
        <Forms.Header containerId="erShpLeg" id="erShpLegStack">
          Ear Shape
        </Forms.Header>
        <OptionFieldset selector="erShp">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="erShp"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={ear.shape === opt.key}
              handleChange={handleChange}
              name="erShp"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} ear shape` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={ear.shape} />
    </ErrorBoundary>
  );
}
