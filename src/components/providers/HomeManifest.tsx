import type { JSX } from "react";
import { createContext, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Guidance from "../icons/buttons/Guidance";
import GenericErrorComponent from "../errors/GenericErrorComponent";
import type { IHomeManifestCtx } from "../../lib/declarations/interfaces/contexts";
import DialogManifest from "../modals/home/DialogManifest";
const defaultCtx = { isManifestOpen: false, setManifestOpen: null };
export const HomeManifestCtx = createContext<IHomeManifestCtx>(defaultCtx);
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
