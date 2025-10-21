import { createContext } from "react";
import { IHomeManifestCtx } from "../../declarations/interfaces/contexts";

const defaultCtx = { isManifestOpen: false, setManifestOpen: null };
export const HomeManifestCtx = createContext<IHomeManifestCtx>(defaultCtx);
