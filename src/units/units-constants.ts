export const UNIT_MODE = {
  METRIC: "metric",
  IMPERIAL: "imperial",
} as const;

export const TEMPERATURE_UNIT = {
  [UNIT_MODE.METRIC]: {
    label: "Celsius (°C)",
    short_label: "°",
    value: "celcius",
  },
  [UNIT_MODE.IMPERIAL]: {
    label: "Fahrenheit (°F)",
    short_label: "°",
    value: "fahrenheit",
  },
};

export const WIND_SPEED_UNIT = {
  [UNIT_MODE.METRIC]: {
    label: "km/h",
    short_label: "km/h",
    value: "kmh",
  },
  [UNIT_MODE.IMPERIAL]: {
    label: "mph",
    short_label: "mph",
    value: "mph",
  },
};

export const PRECIPITATION_UNIT = {
  [UNIT_MODE.METRIC]: {
    label: "Millimeters (mm)",
    short_label: "mm",
    value: "millimeter",
  },
  [UNIT_MODE.IMPERIAL]: {
    label: "Inches (in)",
    short_label: "in",
    value: "inch",
  },
};
