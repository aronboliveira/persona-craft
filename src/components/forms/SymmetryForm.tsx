// src/components/forms/SymmetryForm.tsx

import { JSX, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import { useOptFormCtx } from "../../lib/hooks/contexts/useOptFormCtx";
import { DeepOptional } from "../../lib/declarations/types/utils";
import Forms from "../../pages/Forms";
import { Typography, Box } from "@mui/material";
import ErrorHandler from "../../lib/utils/ErrorHandler";

interface SymmetryFormProps {
  featureName: string;
}

/**
 * Symmetry Form - A placeholder component for anatomical symmetry options
 * These forms allow users to specify if features should be symmetric or asymmetric
 */
export default function SymmetryForm({
  featureName,
}: SymmetryFormProps): JSX.Element {
  const { formRef } = useOptFormCtx({
    layoutParams: ["symmetryForm"],
  }) as DeepOptional<ReturnType<typeof useOptFormCtx>> & {};

  const formRef2 = useRef<HTMLFieldSetElement>(null);

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        ErrorHandler.handleReactBoundaryError({
          error,
          info: errorInfo,
          alertType: "hot",
        });
      }}
      FallbackComponent={() => <GenericErrorComponent />}
    >
      <fieldset
        ref={formRef || formRef2}
        id="symmetryForm"
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          padding: "24px",
          minHeight: "200px",
        }}
      >
        <Forms.Header containerId="symLeg" id="symLegStack">
          {`${featureName} Symmetry`}
        </Forms.Header>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            py: 4,
          }}
        >
          <Typography variant="body1" textAlign="center" sx={{ opacity: 0.7 }}>
            This feature allows you to specify symmetry preferences for{" "}
            <strong>{featureName.toLowerCase()}</strong>.
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ opacity: 0.5, fontStyle: "italic" }}
          >
            Symmetry options will be available in a future update.
          </Typography>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.4, mt: 2 }}
          >
            For now, this step is automatically skipped.
          </Typography>
        </Box>
      </fieldset>
    </ErrorBoundary>
  );
}
