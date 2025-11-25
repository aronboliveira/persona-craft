import { useLayoutEffect, useRef } from "react";
import { UseOptGridProps } from "../../declarations/interfaces/hooks";

export function useOptionGrid({
  selectedFormRef,
  order = 0,
  setColumns = () => {},
  columnArgs = [],
  setRows = () => {},
  rowArgs = [],
}: UseOptGridProps) {
  const columnArgsRef = useRef<any[]>(columnArgs);
  useLayoutEffect(() => {
    const imgCls = "option-figure-img",
      optImgs =
        selectedFormRef.current instanceof HTMLElement
          ? selectedFormRef.current.querySelectorAll(`.${imgCls}`)
          : document.getElementsByClassName(imgCls),
      setColumnsIsFunc = typeof setColumns === "function",
      calcImgLgt =
        optImgs.length % 2 === 0
          ? optImgs.length * 0.5
          : optImgs.length * 0.5 + 1;
    columnArgsRef.current = columnArgsRef.current.slice(
      0,
      setColumns.length + 1
    );
    setColumnsIsFunc && setColumns.length > 1
      ? setColumns(calcImgLgt, ...columnArgsRef.current)
      : setColumns(calcImgLgt);
    typeof setRows === "function" && setRows.length
      ? setRows(...rowArgs)
      : setRows();
    setRows();
  }, [selectedFormRef, order, setColumns, setRows, columnArgsRef, rowArgs]);
}
