import type { JSX } from "react";

export default function Test(): JSX.Element {
  return (
    <div dangerouslySetInnerHTML={{ __html: "<p>This is a test!</p>" }}></div>
  );
}
