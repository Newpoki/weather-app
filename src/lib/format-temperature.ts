import { TEMPERATURE_UNIT } from "@/units/units-constants";
import type { UnitMode } from "@/units/units-types";

export const formatTemperature = (
  temperature: number | undefined,
  unit: UnitMode,
) => {
  if (temperature == null) {
    return "N/A";
  }

  return `${temperature.toFixed()}${TEMPERATURE_UNIT[unit].short_label}`;
};
