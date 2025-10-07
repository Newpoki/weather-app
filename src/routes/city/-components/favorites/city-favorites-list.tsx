import { useNavigate } from "@tanstack/react-router";
import { useFavoritesCities } from "./use-favorites-cities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type CityFavoritesListProps = {
  setOpen: (open: boolean) => void;
};

export const CityFavoritesList = ({ setOpen }: CityFavoritesListProps) => {
  const navigate = useNavigate();

  const { favoriteCities } = useFavoritesCities();

  const options = Object.keys(favoriteCities);

  return (
    <Command>
      <CommandInput autoFocus placeholder="Your favorites cities" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option}
              value={option}
              onSelect={(value) => {
                navigate({
                  to: "/city/$city-id",
                  params: { "city-id": value as any as number },
                });

                setOpen(false);
              }}
            >
              {option}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
