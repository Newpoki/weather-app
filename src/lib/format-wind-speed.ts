import { WIND_SPEED_UNIT } from "@/units/units-constants";
import type { UnitMode } from "@/units/units-types";

export const formatWindSpeed = (
  temperature: number | undefined,
  unit: UnitMode,
) => {
  if (temperature == null) {
    return "N/A";
  }

  return `${temperature.toFixed()} ${WIND_SPEED_UNIT[unit].short_label}`;
};
