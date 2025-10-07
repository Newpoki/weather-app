import { PRECIPITATION_UNIT } from "@/units/units-constants";
import type { UnitMode } from "@/units/units-types";

export const formatPrecipitation = (
  temperature: number | undefined,
  unit: UnitMode,
) => {
  if (temperature == null) {
    return "N/A";
  }

  return `${temperature.toFixed()} ${PRECIPITATION_UNIT[unit].short_label}`;
};
