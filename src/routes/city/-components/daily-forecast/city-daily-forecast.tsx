import { useMemo } from "react";
import { CityDailyForecastCard } from "./city-daily-forecast-card";
import { formatTemperature } from "@/lib/format-temperature";
import { useFetchCityAndForecast } from "../use-fetch-city-and-forecast";

export const CityDailyForecast = () => {
  const { forecast, unit } = useFetchCityAndForecast();

  const sevenDayForecast = useMemo(
    () =>
      forecast.daily.time
        .map((date, index) => {
          const maxTemp = formatTemperature(
            forecast.daily.temperature_2m_max[index],
            unit,
          );

          const minTemp = formatTemperature(
            forecast.daily.temperature_2m_min[index],
            unit,
          );

          const weatherCode = forecast.daily.weathercode[index] ?? null;

          return {
            date,
            maxTemp,
            minTemp,
            weatherCode,
          };
        })
        // Shouldn't have more than 7 elements, but just in case
        .slice(0, 7),
    [
      forecast.daily.temperature_2m_max,
      forecast.daily.temperature_2m_min,
      forecast.daily.time,
      forecast.daily.weathercode,
      unit,
    ],
  );

  return sevenDayForecast.map((dailyForecast) => {
    return (
      <CityDailyForecastCard {...dailyForecast} key={dailyForecast.date} />
    );
  });
};
