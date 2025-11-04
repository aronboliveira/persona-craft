import { useCallback, useEffect, useRef } from "react";
import { NDialog, NRDispatch } from "../../declarations/types/foundations";
export default function useDialog({
  state,
  dispatch,
}: {
  state: boolean;
  dispatch: NRDispatch<boolean>;
}): { handler: () => void; ref: React.RefObject<NDialog | HTMLElement> } {
  const ref = useRef<NDialog | HTMLElement>(null),
    handleClick = useCallback(
      (): void => dispatch?.(!state),
      [state, dispatch]
    );
  useEffect(() => {
    if (!dispatch || !ref.current) return;
    if (ref.current instanceof HTMLDialogElement)
      state ? ref.current.showModal() : ref.current.close();
  }, [state, dispatch]);
  return { handler: handleClick, ref };
}
