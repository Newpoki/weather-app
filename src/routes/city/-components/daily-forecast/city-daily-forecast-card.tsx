import type { CityForecastWeatherCode } from "@/api/fetch-city-forecast";
import { WeatherIcon } from "@/components/weather-icon";
import { useMemo } from "react";

type CityDailyForecastCardProps = {
  date: string;
  maxTemp: string;
  minTemp: string;
  weatherCode: CityForecastWeatherCode | null;
};

export const CityDailyForecastCard = ({
  date,
  maxTemp,
  minTemp,
  weatherCode,
}: CityDailyForecastCardProps) => {
  const abbreviatedDay = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      new Date(date),
    );
  }, [date]);

  return (
    <div className="bg-card text-card-foreground border-border flex flex-col items-center justify-between gap-4 rounded-[12px] border px-2.5 py-4">
      <h5 className="text-preset-6">{abbreviatedDay}</h5>

      {weatherCode != null && (
        <WeatherIcon className="aspect-square w-[60px]" code={weatherCode} />
      )}

      <div className="text-preset-7 flex w-full items-center justify-between">
        <p>{maxTemp}</p>
        <p className="text-muted-foreground">{minTemp}</p>
      </div>
    </div>
  );
};
