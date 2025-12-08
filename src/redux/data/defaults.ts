import { Forehead, Eye, Hair } from "../../lib/declarations/interfaces/anatomy";
import { DeepPartial } from "../../lib/declarations/types/utils";
export const defaultForehead: Forehead = {
  hairline: {
    height: "average",
    recidingLevel: "straight",
    shape: "rounded",
  },
  height: "average",
};
export const defaultEye: DeepPartial<Eye> = {
  brow: {
    density: "light",
    growth: {
      pattern: "even",
      direction: "radial",
    },
  },
};
export const defaultHair: Hair = {
  texture: "straight",
  length: "medium",
  tidiness: "done",
  bang: {
    density: "wispy",
    length: "lash-length",
    shape: "curtain",
  },
};
