import type { CityForecastWeatherCode } from "@/api/fetch-city-forecast";
import { WeatherIcon } from "@/components/weather-icon";
import { formatTemperature } from "@/lib/format-temperature";
import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";

type CityHourlyForecastCardProps = {
  time: string;
  temperature: number | undefined;
  weatherCode: CityForecastWeatherCode | undefined;
};

const cityRouteAPi = getRouteApi("/city/$city-id");

export const CityHourlyForecastCard = ({
  temperature,
  time,
  weatherCode,
}: CityHourlyForecastCardProps) => {
  const { unit } = cityRouteAPi.useSearch();

  const formattedTime = useMemo(() => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  }, [time]);

  return (
    <li className="border-border bg-accent grid h-[60px] grid-cols-[40px_1fr_auto] items-center gap-2 rounded-[8px] border px-3 py-2.5">
      {weatherCode != null && (
        <WeatherIcon className="aspect-square w-10" code={weatherCode} />
      )}

      <p className="text-preset-5 font-medium">{formattedTime}</p>

      <p className="text-preset-7">{formatTemperature(temperature, unit)}</p>
    </li>
  );
};
