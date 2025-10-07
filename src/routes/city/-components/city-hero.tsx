import { WeatherIcon } from "@/components/weather-icon";
import { formatTemperature } from "@/lib/format-temperature";
import { useFetchCityAndForecast } from "./use-fetch-city-and-forecast";
import { StarIcon, StarOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useFavoritesCities } from "./favorites/use-favorites-cities";

export const CityHero = () => {
  const { forecast, unit, city } = useFetchCityAndForecast();

  const { favoriteCities, toggleFavoriteCity } = useFavoritesCities();

  const isFavoriteCity = favoriteCities[city.id] ?? false;

  const FavoriteIconComponent = isFavoriteCity ? StarOffIcon : StarIcon;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(forecast.current_weather.time));

  const handleToggleFavorite = useCallback(() => {
    toggleFavoriteCity(city.id);
  }, [city.id, toggleFavoriteCity]);

  return (
    <div className="relative flex flex-col gap-3 rounded-[20px] bg-[url('/mobile-hero.svg')] bg-cover bg-center px-6 pt-20 pb-10 text-center md:flex-row md:items-center md:justify-between md:bg-[url('/desktop-hero.svg')] md:py-[84px] md:text-left">
      <div className="absolute top-4 right-4">
        <Button
          size="small"
          onClick={handleToggleFavorite}
          className={cn(
            "aspect-square rounded-[12px] bg-neutral-800/50 p-2.5 hover:bg-neutral-800/80",
            {
              "text-yellow-500": isFavoriteCity,
              "hover:text-yellow-500": !isFavoriteCity,
            },
          )}
        >
          <FavoriteIconComponent className="rounded-[8px]" />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-preset-4">
          {city.name}, {city.country}
        </h4>

        <p className="text-preset-6 text-neutral-0/80">{formattedDate}</p>
      </div>

      <div className="flex items-center justify-between gap-5">
        <WeatherIcon
          className="aspect-square w-[120px]"
          code={forecast.current_weather.weathercode}
        />

        {/* Adding some MR because due to the font size / font, the text box is smaller than the area it actually takes */}
        <p className="text-preset-1 mr-3">
          {formatTemperature(forecast.current_weather.temperature, unit)}
        </p>
      </div>
    </div>
  );
};
