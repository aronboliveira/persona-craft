import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, ttCovs } from "../../../lib/data/opts";
import { TattooCoverage } from "../../../lib/declarations/types/anatomy";
import { updateBodyModifications } from "../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../lib/data/classes";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
import { RootState } from "../../../redux/mainStore";
import { useOptFormCtx } from "../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../bloc/OptionFieldset";
import OptionFigure from "../../bloc/OptionFigure";
import Forms from "../../../pages/Forms";
import { bodyModificationsSelector } from "../../../redux/mainStore/selectors/characterSelectors";

export default function TattooCoverageForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["tattooCoverageForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const rootState = useAppSelector((s: RootState) => s);
  const bodyMods = bodyModificationsSelector(rootState);

  const options = useMemo(
    () =>
      ttCovs.map(cov => ({
        key: cov,
        friendlyName: cov
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/tattoo-coverage-${cov}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as TattooCoverage;
      if (!(ttCovs as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ tattoo: { coverage: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="tattooCoverageForm"
      >
        <Forms.Header containerId="ttCovLeg" id="ttCovLegStack">
          Tattoo Coverage
        </Forms.Header>
        <OptionFieldset selector="ttCov">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="ttCov"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.tattoo.coverage === opt.key}
              handleChange={handleChange}
              name="ttCov"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} tattoo coverage` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.tattoo.coverage} />
    </ErrorBoundary>
  );
}
