import {
  PRECIPITATION_UNIT,
  TEMPERATURE_UNIT,
  UNIT_MODE,
  WIND_SPEED_UNIT,
} from "@/units/units-constants";
import type { UnitMode } from "@/units/units-types";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { openMeteoAPI } from "./meteo-api";

export const CITY_FORECAST_WEATHER_CODE = {
  CLEAR_SKY: 0,
  MAINLY_CLEAR: 1,
  PARTLY_CLOUDY: 2,
  OVERCAST: 3,
  FOG: 45,
  DEPOSITING_RIME_FOG: 48,
  DRIZZLE_LIGHT: 51,
  DRIZZLE_MODERATE: 53,
  DRIZZLE_DENSE: 55,
  FREEZING_DRIZZLE_LIGHT: 56,
  FREEZING_DRIZZLE_DENSE: 57,
  RAIN_SLIGHT: 61,
  RAIN_MODERATE: 63,
  RAIN_HEAVY: 65,
  FREEZING_RAIN_LIGHT: 66,
  FREEZING_RAIN_HEAVY: 67,
  SNOWFALL_SLIGHT: 71,
  SNOWFALL_MODERATE: 73,
  SNOWFALL_HEAVY: 75,
  SNOW_GRAINS: 77,
  RAIN_SHOWERS_SLIGHT: 80,
  RAIN_SHOWERS_MODERATE: 81,
  RAIN_SHOWERS_VIOLENT: 82,
  SNOW_SHOWERS_SLIGHT: 85,
  SNOW_SHOWERS_HEAVY: 86,
  THUNDERSTORM_MODERATE: 95,
  THUNDERSTORM_SLIGHT_HAIL: 96,
  THUNDERSTORM_HEAVY_HAIL: 99,
} as const;

const cityForecastWeatherCodeSchema = z.enum(CITY_FORECAST_WEATHER_CODE);

export type CityForecastWeatherCode = z.infer<
  typeof cityForecastWeatherCodeSchema
>;

const cityForecastSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),

  current_weather: z.object({
    temperature: z.number(), // °C
    windspeed: z.number(), // km/h
    winddirection: z.number(), // degrees
    weathercode: cityForecastWeatherCodeSchema, // Open-Meteo weather code
    is_day: z.number(), // 1 = day, 0 = night
    time: z.string(), // ISO timestamp
  }),

  hourly: z.object({
    time: z.array(z.string()), // ISO timestamps
    temperature_2m: z.array(z.number()),
    apparent_temperature: z.array(z.number()),
    relative_humidity_2m: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
    precipitation: z.array(z.number()),
    weathercode: z.array(cityForecastWeatherCodeSchema),
  }),

  daily: z.object({
    time: z.array(z.string()), // ISO dates
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    apparent_temperature_max: z.array(z.number()),
    apparent_temperature_min: z.array(z.number()),
    weathercode: z.array(cityForecastWeatherCodeSchema),
  }),
});

export type CityForecast = z.infer<typeof cityForecastSchema>;

export const fetchCityForecastQueryOptions = ({
  latitude,
  longitude,
  unit,
}: {
  latitude: number;
  longitude: number;
  unit: UnitMode;
}) =>
  queryOptions({
    queryKey: ["city", "forecast", latitude, longitude, unit],
    queryFn: async () => {
      const precipitationUnitParam =
        unit === UNIT_MODE.METRIC
          ? ""
          : `&precipitation_unit=${PRECIPITATION_UNIT[unit].value}`;
      const temperatureUnitParam =
        unit === UNIT_MODE.METRIC
          ? ""
          : `&temperature_unit=${TEMPERATURE_UNIT[unit].value}`;
      const windSpeedUnitParam =
        unit === UNIT_MODE.METRIC
          ? ""
          : `&wind_speed_unit=${WIND_SPEED_UNIT[unit].value}`;

      const response = await openMeteoAPI(
        `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode&timezone=auto${precipitationUnitParam}${temperatureUnitParam}${windSpeedUnitParam}`,
      );

      return cityForecastSchema.parse(response);
    },
    staleTime: 1000 * 60 * 60, // Caching for one hour, as the data update every hour
  });
