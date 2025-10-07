import type { CityForecast } from "@/api/fetch-city-forecast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

type CityHourlyForecastDaySelectProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  forecast: CityForecast;
};

export const CityHourlyForecastDaySelect = ({
  value,
  onChange,
  forecast,
}: CityHourlyForecastDaySelectProps) => {
  const options = useMemo(
    () =>
      forecast.daily.time.slice(0, 7).map((date) => ({
        label: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        value: date, // ISO date string
      })),
    [forecast.daily.time],
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger size="sm">
        <SelectValue placeholder="Select a day" />
      </SelectTrigger>

      <SelectContent className="w-56" align="end" sideOffset={10}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
