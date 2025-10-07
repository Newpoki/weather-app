import { useFavoritesCities } from "./use-favorites-cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  CityFavoriteListItem,
  getDisplayedCityName,
} from "./city-favorite-list-item";
import { useCallback, useMemo } from "react";

type CityFavoritesListProps = {
  onClose: () => void;
};

export const CityFavoritesList = ({ onClose }: CityFavoritesListProps) => {
  const { favoriteCities } = useFavoritesCities();

  const sortedFavorites = useMemo(() => {
    return Object.values(favoriteCities)
      .filter(Boolean)
      .toSorted(
        // Most recent favorite cities are displayed first
        (cityA, cityB) => cityB.updatedAt - cityA.updatedAt,
      );
  }, [favoriteCities]);

  const filterList = useCallback(
    (cityId: string, search: string) => {
      const city = favoriteCities[cityId];

      if (city == null) {
        return 0;
      }

      return getDisplayedCityName(city)
        .toLowerCase()
        .includes(search.toLowerCase())
        ? 1
        : 0;
    },
    [favoriteCities],
  );

  return (
    <Command filter={filterList}>
      <CommandInput
        autoFocus
        placeholder="Your favorites cities"
        disabled={sortedFavorites.length === 0}
      />
      <CommandList>
        <CommandEmpty>
          {sortedFavorites.length === 0
            ? "You haven't save as favorite any city yet."
            : "No results found."}
        </CommandEmpty>
        <CommandGroup>
          {sortedFavorites.map((option) => (
            <CityFavoriteListItem
              key={option.id}
              city={option}
              onValueSelected={onClose}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
