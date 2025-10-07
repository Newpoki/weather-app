import { CommandItem } from "@/components/ui/command";
import { useNavigate } from "@tanstack/react-router";
import type { FavoriteCity } from "./use-favorites-cities";

type CityFavoriteListItemProps = {
  city: FavoriteCity;
  onValueSelected: () => void;
};
export const CityFavoriteListItem = ({
  city,
  onValueSelected,
}: CityFavoriteListItemProps) => {
  const navigate = useNavigate();

  return (
    <CommandItem
      value={`${city.id}`}
      onSelect={() => {
        navigate({
          params: { "city-id": city.id },
          to: "/city/$city-id",
        });

        onValueSelected();
      }}
    >
      <img
        src={`https://open-meteo.com/images/country-flags/${city.country_code.toLowerCase()}.svg`}
        className="h-5 w-5"
        alt={`Flag icon for the city's code country ${city.country_code.toLowerCase()}`}
      />
      {city.name}, {city.admin1}, {city.country}
    </CommandItem>
  );
};
