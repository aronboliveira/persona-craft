import { useMemo } from "react";
import FormsStrategist from "../../../classes/FormsStrategist";

export const useFormsStrategist = () =>
  useMemo(() => new FormsStrategist(), []);
