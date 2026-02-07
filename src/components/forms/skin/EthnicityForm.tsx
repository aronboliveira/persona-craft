import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { ethnicities, imgBasePath } from "../../../lib/data/opts";
import { Ethnicity } from "../../../lib/declarations/types/anatomy";
import { updateSkin } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { skinSelector } from "../../../redux/mainStore/selectors/characterSelectors";

export default function EthnicityForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["ethnicityForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const skin = useAppSelector(skinSelector);

  const options = useMemo(
    () =>
      ethnicities.map(eth => ({
        key: eth,
        friendlyName: eth
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/${eth}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as Ethnicity;
      if (!ethnicities.includes(value)) return;
      dispatch(updateSkin({ ethnicity: value }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="ethnicityForm"
      >
        <Forms.Header containerId="ethLeg" id="ethLegStack">
          Ethnicity
        </Forms.Header>
        <OptionFieldset selector="eth">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="eth"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={skin.ethnicity === opt.key}
              handleChange={handleChange}
              name="eth"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} ethnicity` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={skin.ethnicity} />
    </ErrorBoundary>
  );
}
