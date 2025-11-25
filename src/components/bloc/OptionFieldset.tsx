import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { PropsWithChildren } from "react";
export default function OptionFieldset({
  children,
  selector,
}: PropsWithChildren & { selector: string }) {
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <fieldset
        id={`main${selector[0].toUpperCase()}${selector.slice(1)}Form`}
        className="option-fieldset"
      >
        {children}
      </fieldset>
    </ErrorBoundary>
  );
}
