import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { nsNtSz, imgBasePath } from "../../../../lib/data/opts";
import { NoseNostrilSize } from "../../../../lib/declarations/types/anatomy";
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

export default function NoseNostrilSizeForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["noseNostrilSizeForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const nose = useAppSelector(noseSelector);

  const options = useMemo(
    () =>
      nsNtSz.map(sz => ({
        key: sz,
        friendlyName: sz.charAt(0).toUpperCase() + sz.slice(1),
        src: `${imgBasePath}/head/noses/${sz}-nostril.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as NoseNostrilSize;
      if (!nsNtSz.includes(value)) return;
      dispatch(updateNose({ nostril: { size: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="noseNostrilSizeForm"
      >
        <Forms.Header containerId="nsNtSzLeg" id="nsNtSzLegStack">
          Nostril Size
        </Forms.Header>
        <OptionFieldset selector="nsNtSz">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="nsNtSz"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={nose.nostril.size === opt.key}
              handleChange={handleChange}
              name="nsNtSz"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} nostril size` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={nose.nostril.size} />
    </ErrorBoundary>
  );
}
