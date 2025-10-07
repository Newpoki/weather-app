import { useFavoritesCities } from "./use-favorites-cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CityFavoriteListItem } from "./city-favorite-list-item";
import { useMemo } from "react";

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

  return (
    <Command>
      <CommandInput autoFocus placeholder="Your favorites cities" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
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
