import { ErrorInfo } from "react";
import toast from "react-hot-toast";

export default class ErrorHandler {
  public static handleReactBoundaryError({
    error,
    info,
    alertType = "vanilla",
    context = "Rendering React component",
  }: {
    error: Error;
    info: ErrorInfo;
    alertType?: "vanilla" | "hot";
    context?: string;
  }): void {
    console.error(
      `Error caught by boundary${context ? ` in ${context}` : ""}:`,
      error
    );
    console.error("Component stack:", info.componentStack);
    alertType === "hot" &&
    (typeof toast === "object" || typeof toast === "function")
      ? toast.error(`An error occurred: ${error.message}`)
      : alert(`An error occurred: ${error.message}`);
  }
}
