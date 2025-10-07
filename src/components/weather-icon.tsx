import type { CityForecastWeatherCode } from "@/api/fetch-city-forecast";
import type React from "react";

// Import SVGs directly from src/icons
import ClearSunny from "@/icons/clear-sunny.svg";
import PartlyCloudy from "@/icons/partly-cloudy.svg";
import Overcast from "@/icons/overcast.svg";
import Fog from "@/icons/fog.svg";
import Drizzle from "@/icons/drizzle.svg";
import Rain from "@/icons/rain.svg";
import Snow from "@/icons/snow.svg";
import Thunderstorms from "@/icons/thunderstorms.svg";

// Map weather codes to imported SVG URLs
const CODE_TO_ICON_MAPPING: Record<CityForecastWeatherCode, string> = {
  0: ClearSunny,
  1: PartlyCloudy,
  2: PartlyCloudy,
  3: Overcast,
  45: Fog,
  48: Fog,
  51: Drizzle,
  53: Drizzle,
  55: Drizzle,
  56: Drizzle,
  57: Drizzle,
  61: Rain,
  63: Rain,
  65: Rain,
  66: Rain,
  67: Rain,
  71: Snow,
  73: Snow,
  75: Snow,
  77: Snow,
  80: Rain,
  81: Rain,
  82: Rain,
  85: Snow,
  86: Snow,
  95: Thunderstorms,
  96: Thunderstorms,
  99: Thunderstorms,
};

type WeatherIconProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  code: CityForecastWeatherCode;
};

export const WeatherIcon = ({ code, ...others }: WeatherIconProps) => {
  return (
    <img
      {...others}
      src={CODE_TO_ICON_MAPPING[code]}
      alt={`Weather icon for the weather code ${code}`}
    />
  );
};
