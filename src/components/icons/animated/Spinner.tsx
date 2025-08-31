import type { JSX } from "react";

export default function Spinner(): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent" />
    </div>
  );
}
