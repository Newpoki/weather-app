import { useFavoritesCities } from "./use-favorites-cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CityFavoriteListItem } from "./city-favorite-list-item";

type CityFavoritesListProps = {
  onClose: () => void;
};

export const CityFavoritesList = ({ onClose }: CityFavoritesListProps) => {
  const { favoriteCities } = useFavoritesCities();

  const options = Object.values(favoriteCities);

  return (
    <Command>
      <CommandInput autoFocus placeholder="Your favorites cities" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
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
