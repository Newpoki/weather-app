import { useMemo, useState } from "react";
import { CityHourlyForecastCard } from "./city-hourly-forecast-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CityHourlyForecastDaySelect } from "./city-hourly-forecast-day-select";
import { useFetchCityAndForecast } from "../use-fetch-city-and-forecast";

export const CityHourlyForecast = () => {
  const { forecast } = useFetchCityAndForecast();

  const [selectedDay, setSelectedDay] = useState(forecast.daily.time[0]);

  const hourlyForecastForSelectedDay = useMemo(() => {
    if (!forecast || !selectedDay) return [];

    return forecast.hourly.time
      .map((time, index) => {
        return {
          time,
          hour: new Date(time).getHours(),
          temperature: forecast.hourly.temperature_2m[index],
          weatherCode: forecast.hourly.weathercode?.[index],
        };
      })
      .filter((entry) => entry.time.startsWith(selectedDay)); // matches "YYYY-MM-DD"
  }, [forecast, selectedDay]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h5 className="text-preset-5 whitespace-nowrap">Hourly forecast</h5>

        <CityHourlyForecastDaySelect
          value={selectedDay}
          onChange={setSelectedDay}
          forecast={forecast}
        />
      </div>

      <ScrollArea>
        <ul className="flex max-h-[592px] flex-col gap-4">
          {hourlyForecastForSelectedDay.map((entry) => {
            return <CityHourlyForecastCard {...entry} key={entry.time} />;
          })}
        </ul>
      </ScrollArea>
    </>
  );
};
