import type { JSX } from "react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Guidance from "../icons/buttons/Guidance";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import DialogManifest from "../modals/home/DialogManifest";
import { HomeManifestCtx } from "../../lib/states/contexts/HomeManifestCtx";
export default function HomeManifest(): JSX.Element {
  const [isManifestOpen, setManifestOpen] = useState<boolean>(false);
  return (
    <ErrorBoundary FallbackComponent={() => <GenericErrorComponent />}>
      <HomeManifestCtx.Provider value={{ isManifestOpen, setManifestOpen }}>
        <DialogManifest />
        <Guidance
          style={{ top: "88%", left: "90%", position: "fixed" }}
          callback={setManifestOpen}
          callbackArgs={[!isManifestOpen]}
        />
      </HomeManifestCtx.Provider>
    </ErrorBoundary>
  );
}
