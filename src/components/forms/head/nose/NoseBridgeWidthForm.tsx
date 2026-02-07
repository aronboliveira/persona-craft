import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsBrW, imgBasePath } from "../../../../lib/data/opts";
import { NoseBridgeWidth } from "../../../../lib/declarations/types/anatomy";
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

export default function NoseBridgeWidthForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseBridgeWidthForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);

  const options = useMemo(
    () =>
      nsBrW.map(w => ({
        key: w,
        friendlyName: w.charAt(0).toUpperCase() + w.slice(1),
        src: `${imgBasePath}/head/noses/${w}-bridge.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseBridgeWidth;
      if (!nsBrW.includes(value)) return;
      dispatch(updateNose({ bridge: { width: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseBridgeWidthForm"
      >
        <Forms.Header containerId="nsBrWLeg" id="nsBrWLegStack">
          Nose Bridge Width
        </Forms.Header>
        <OptionFieldset selector="nsBrW">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsBrW"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.bridge.width === opt.key}
              handleChange={handleChange}
              name="nsBrW"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nose bridge width` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.bridge.width} />
    </ErrorBoundary>
  );
}
