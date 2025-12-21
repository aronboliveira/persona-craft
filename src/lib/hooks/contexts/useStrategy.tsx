import { useMemo } from "react";
import FormsStrategist from "../../../classes/strategists/FormsStrategist";

export const useFormsStrategist = () =>
  useMemo(() => new FormsStrategist(), []);
