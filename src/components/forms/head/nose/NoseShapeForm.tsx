import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsShp, imgBasePath } from "../../../../lib/data/opts";
import { NoseShape } from "../../../../lib/declarations/types/anatomy";
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
import {
  noseSelector,
  filteredNoseShapesSelector,
} from "../../../../redux/mainStore/selectors/characterSelectors";

export default function NoseShapeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseShapeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);
  const filteredShapes = useAppSelector(filteredNoseShapesSelector);

  const options = useMemo(() => {
    const basePath = `${imgBasePath}/head/noses`;
    return filteredShapes.map(shape => ({
      key: shape,
      friendlyName: shape
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      src: `${basePath}/${shape}.png`,
    }));
  }, [filteredShapes]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseShape;
      if (!nsShp.includes(value)) return;
      dispatch(updateNose({ shape: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseShapeForm"
      >
        <Forms.Header containerId="nsShpLeg" id="nsShpLegStack">
          Nose Shape
        </Forms.Header>
        <OptionFieldset selector="nsShp">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsShp"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.shape === opt.key}
              handleChange={handleChange}
              name="nsShp"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nose shape` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.shape} />
    </ErrorBoundary>
  );
}
