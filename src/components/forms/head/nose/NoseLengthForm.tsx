import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsLng, imgBasePath } from "../../../../lib/data/opts";
import { NoseLength } from "../../../../lib/declarations/types/anatomy";
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

export default function NoseLengthForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseLengthForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);

  const options = useMemo(
    () =>
      nsLng.map(l => ({
        key: l,
        friendlyName: l.charAt(0).toUpperCase() + l.slice(1),
        src: `${imgBasePath}/head/noses/${l}-length.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseLength;
      if (!nsLng.includes(value)) return;
      dispatch(updateNose({ length: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseLengthForm"
      >
        <Forms.Header containerId="nsLngLeg" id="nsLngLegStack">
          Nose Length
        </Forms.Header>
        <OptionFieldset selector="nsLng">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsLng"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.length === opt.key}
              handleChange={handleChange}
              name="nsLng"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nose length` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.length} />
    </ErrorBoundary>
  );
}
