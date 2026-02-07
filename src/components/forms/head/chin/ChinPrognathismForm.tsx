import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { cnPrg, imgBasePath } from "../../../../lib/data/opts";
import { ChinPrognathism } from "../../../../lib/declarations/types/anatomy";
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

export default function ChinPrognathismForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["chinPrognathismForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const chin = useAppSelector(chinSelector);
  const style = useAppSelector(styleAbbrSelector);

  const options = useMemo(
    () =>
      cnPrg.map(v => ({
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
      const value = e.target.value as ChinPrognathism;
      if (!cnPrg.includes(value)) return;
      dispatch(updateChin({ prognathism: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="chinPrognathismForm"
      >
        <Forms.Header containerId="cnPrgLeg" id="cnPrgLegStack">
          Chin Prognathism
        </Forms.Header>
        <OptionFieldset selector="cnPrg">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="cnPrg"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={chin.prognathism === opt.key}
              handleChange={handleChange}
              name="cnPrg"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} chin prognathism` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={chin.prognathism} />
    </ErrorBoundary>
  );
}
