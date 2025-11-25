import { ReactNode, useEffect } from "react";
import { LayoutCtx } from "../../lib/states/contexts/LayoutCtx";
import { ILayoutCtx } from "../../lib/declarations/interfaces/contexts";
import { useSelector } from "react-redux";
import { MainStoreState } from "../../lib/declarations/interfaces/redux";
export function LayoutProvider(
  props: ILayoutCtx & {
    children: ReactNode;
    portalChildren?: ReactNode;
  }
) {
  const formState = useSelector((state: MainStoreState) => state);
  useEffect(() => {
    if (
      !Object.keys(props.classNameMap).length ||
      !props.selectedFormRef?.current
    )
      return;
    Object.entries(props.classNameMap).forEach(([key, value]) => {
      const elements =
        props.selectedFormRef?.current?.querySelectorAll(key) ?? [];
      elements.forEach(el => {
        el.classList.add(...value.split(" "));
      });
    });
  }, [props.classNameMap, props.selectedFormRef, formState]);
  return (
    <LayoutCtx.Provider value={props}>
      {props.children}
      <span id="portal-span">{props.portalChildren || <></>}</span>
    </LayoutCtx.Provider>
  );
}
