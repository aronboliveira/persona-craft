import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { cnWd, imgBasePath } from "../../../../lib/data/opts";
import { ChinWidth } from "../../../../lib/declarations/types/anatomy";
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

export default function ChinWidthForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["chinWidthForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const chin = useAppSelector(chinSelector);
  const style = useAppSelector(styleAbbrSelector);

  const options = useMemo(
    () =>
      cnWd.map(v => ({
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
      const value = e.target.value as ChinWidth;
      if (!cnWd.includes(value)) return;
      dispatch(updateChin({ width: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="chinWidthForm"
      >
        <Forms.Header containerId="cnWdLeg" id="cnWdLegStack">
          Chin Width
        </Forms.Header>
        <OptionFieldset selector="cnWd">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="cnWd"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={chin.width === opt.key}
              handleChange={handleChange}
              name="cnWd"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} chin width` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={chin.width} />
    </ErrorBoundary>
  );
}
