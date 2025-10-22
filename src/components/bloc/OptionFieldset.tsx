import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { FORM_DICT } from "../../lib/states/lang/forms";
import { useState } from "react";
import { useAppSelector } from "../../redux/mainStore/hooks";
import { LangDict } from "../../lib/declarations/interfaces/utils";
import { useFormCtxStore } from "../../lib/hooks/contexts/useFormCtxStore";
import { Parent } from "../../lib/declarations/interfaces/components";
import { FormRootState } from "../../lib/declarations/types/redux";
import OptionFsCtx from "../../lib/states/contexts/OptionFsCtx";
import { Grid } from "@mui/material";

export default function OptionFieldset({
  children,
  selector,
  abbr,
}: Parent & { selector: keyof FormRootState; abbr: LangDict[keyof LangDict] }) {
  const { lang } = useFormCtxStore(),
    selectedStl = useAppSelector(s => s[selector]),
    [selected, setSelected] = useState<keyof FormRootState>(
      selectedStl as unknown as any
    );
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <OptionFsCtx.Provider value={{ selected, setSelected }}>
        <fieldset
          id={`main${selector[0].toUpperCase()}${selector.slice(1)}Form`}
        >
          <legend id={`${abbr}Leg`}>
            {FORM_DICT[lang]?.[abbr] ??
              `${selector[0].toUpperCase()}${selector.slice(1)}`}
          </legend>
          <Grid container spacing={1.5}>
            {children}
          </Grid>
        </fieldset>
        <div style={{ marginTop: "20px" }}>
          <strong>
            Selected {`${selector[0].toUpperCase()}${selector.slice(1)}`}
          </strong>
          : {selected}
        </div>
      </OptionFsCtx.Provider>
    </ErrorBoundary>
  );
}
