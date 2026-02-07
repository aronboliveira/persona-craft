import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { cnHgt, imgBasePath } from "../../../../lib/data/opts";
import { ChinHeight } from "../../../../lib/declarations/types/anatomy";
import { updateChin } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { chinSelector } from "../../../../redux/mainStore/selectors/characterSelectors";
import { styleAbbrSelector } from "../../../../redux/mainStore/selectors/styleSelectors";

export default function ChinHeightForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["chinHeightForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const chin = useAppSelector(chinSelector);
  const style = useAppSelector(styleAbbrSelector);

  const options = useMemo(
    () =>
      cnHgt.map(v => ({
        key: v,
        friendlyName: v
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/head/chin/${style}/${v}.png`,
      })),
    [style],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as ChinHeight;
      if (!cnHgt.includes(value)) return;
      dispatch(updateChin({ height: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="chinHeightForm"
      >
        <Forms.Header containerId="cnHgtLeg" id="cnHgtLegStack">
          Chin Height
        </Forms.Header>
        <OptionFieldset selector="cnHgt">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="cnHgt"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={chin.height === opt.key}
              handleChange={handleChange}
              name="cnHgt"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} chin height` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={chin.height} />
    </ErrorBoundary>
  );
}
