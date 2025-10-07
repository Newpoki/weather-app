import { useMemo } from "react";
import { CityKPIsCard } from "./city-kpis-card";
import { formatTemperature } from "@/lib/format-temperature";
import { formatPrecipitation } from "@/lib/format-precipitation";
import { formatWindSpeed } from "@/lib/format-wind-speed";
import { formatHumidity } from "@/lib/format-humidity";
import { useFetchCityAndForecast } from "../use-fetch-city-and-forecast";

export const CityKPIs = () => {
  const { forecast, unit } = useFetchCityAndForecast();

  const currentKpis = useMemo(() => {
    const currentIndex = forecast.current_weather.time.indexOf(
      forecast.current_weather.time,
    );

    const feelsLike =
      forecast.hourly.apparent_temperature[currentIndex] ??
      forecast.hourly.apparent_temperature[0];
    const humidity =
      forecast.hourly.relative_humidity_2m[currentIndex] ??
      forecast.hourly.relative_humidity_2m[0];
    const windSpeed =
      forecast.hourly.wind_speed_10m[currentIndex] ??
      forecast.hourly.wind_speed_10m[0];
    const precipitation =
      forecast.hourly.precipitation[currentIndex] ??
      forecast.hourly.precipitation[0];

    return {
      feelsLike: formatTemperature(feelsLike, unit),
      humidity: formatHumidity(humidity),
      wind: formatWindSpeed(windSpeed, unit),
      precipitation: formatPrecipitation(precipitation, unit),
    };
  }, [
    forecast.current_weather.time,
    forecast.hourly.apparent_temperature,
    forecast.hourly.precipitation,
    forecast.hourly.relative_humidity_2m,
    forecast.hourly.wind_speed_10m,
    unit,
  ]);

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 xl:gap-6">
      <CityKPIsCard label="Feels like" value={currentKpis.feelsLike} />

      <CityKPIsCard label="Humidity" value={currentKpis.humidity} />

      <CityKPIsCard label="Wind" value={currentKpis.wind} />

      <CityKPIsCard label="Precipitation" value={currentKpis.precipitation} />
    </ul>
  );
};
