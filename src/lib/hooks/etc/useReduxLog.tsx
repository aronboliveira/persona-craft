import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/mainStore/hooks";
useEffect;
export default function useReduxLog(): void {
  const dispatch = useAppDispatch(),
    selector = useAppSelector(s => s);
  useEffect(() => {
    console.groupCollapsed(
      "---- NEW FORM CONTEXT ----",
      new Date().getMinutes()
    );
    // these are the reducers
    // console.log("DISPATCH");
    // console.log(dispatch);
    // this is the context value
    console.log("STYLE");
    console.log(selector.style);
    console.log("CHARACTER");
    console.log(selector.character);
    console.log("ENVIRONMENT");
    console.log(selector.environment);
    console.groupEnd();
  }, [dispatch, selector]);
}
