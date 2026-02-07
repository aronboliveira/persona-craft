import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsBrH, imgBasePath } from "../../../../lib/data/opts";
import { NoseBridgeHeight } from "../../../../lib/declarations/types/anatomy";
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

export default function NoseBridgeHeightForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseBridgeHeightForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);

  const options = useMemo(
    () =>
      nsBrH.map(h => ({
        key: h,
        friendlyName: h.charAt(0).toUpperCase() + h.slice(1),
        src: `${imgBasePath}/head/noses/${h}-bridge-h.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseBridgeHeight;
      if (!nsBrH.includes(value)) return;
      dispatch(updateNose({ bridge: { height: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseBridgeHeightForm"
      >
        <Forms.Header containerId="nsBrHLeg" id="nsBrHLegStack">
          Nose Bridge Height
        </Forms.Header>
        <OptionFieldset selector="nsBrH">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsBrH"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.bridge.height === opt.key}
              handleChange={handleChange}
              name="nsBrH"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nose bridge height` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.bridge.height} />
    </ErrorBoundary>
  );
}
