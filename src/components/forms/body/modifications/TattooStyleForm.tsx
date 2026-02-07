import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../../../errors/GenericErrorComponent";
import { useCallback, useMemo, RefObject, ChangeEvent, JSX } from "react";
import { imgBasePath, ttStls } from "../../../../lib/data/opts";
import { TattooStyle } from "../../../../lib/declarations/types/anatomy";
import { updateBodyModifications } from "../../../../redux/mainStore/slices/promptSlice";
import { CLASSES } from "../../../../lib/data/classes";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/mainStore/hooks";
import { useOptFormCtx } from "../../../../lib/hooks/contexts/useOptFormCtx";
import OptionFieldset from "../../../bloc/OptionFieldset";
import OptionFigure from "../../../bloc/OptionFigure";
import Forms from "../../../../pages/Forms";
import { bodyModificationsSelector } from "../../../../redux/mainStore/selectors/characterSelectors";

export default function TattooStyleForm(): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["tattooStyleForm"],
    objectFit: "contain",
  });
  const dispatch = useAppDispatch();
  const bodyMods = useAppSelector(bodyModificationsSelector);

  const options = useMemo(
    () =>
      ttStls.map(style => ({
        key: style,
        friendlyName: style
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        src: `${imgBasePath}/creations/tattoo-style-${style}.png`,
      })),
    [],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value as TattooStyle;
      if (!(ttStls as readonly string[]).includes(value)) return;
      dispatch(updateBodyModifications({ tattoo: { style: value } }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        ref={formRef as RefObject<HTMLFieldSetElement>}
        id="tattooStyleForm"
      >
        <Forms.Header containerId="ttStlLeg" id="ttStlLegStack">
          Tattoo Style
        </Forms.Header>
        <OptionFieldset selector="ttStl">
          {options.map((opt, i) => (
            <OptionFigure
              key={opt.key}
              figureAddClasses={[CLASSES.STL_OPT]}
              prefix="ttStl"
              suffix={`${i + 1}`}
              value={opt.key}
              checked={bodyMods.tattoo.style === opt.key}
              handleChange={handleChange}
              name="ttStl"
              src={opt.src}
              caption={opt.friendlyName}
              imgAddProps={{ alt: `${opt.friendlyName} tattoo style` }}
              imgStyle={{ objectFit: "contain" }}
            />
          ))}
        </OptionFieldset>
      </fieldset>
      <Forms.Result variable={bodyMods.tattoo.style} />
    </ErrorBoundary>
  );
}
