import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderIcon, SearchIcon } from "lucide-react";
import { searchCitiesByNameQueryOption } from "@/api/search-cities-by-name";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import type { City } from "@/api/fetch-city-by-id";
import { CitySearchMenuItem } from "./city-search-menu-item";
import { CityFavoritePicker } from "../favorite/city-favorite-picker";

export const CitySearch = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isFetching } = useQuery(searchCitiesByNameQueryOption(search));

  const debouncedSearch = useMemo(() => debounce(setSearch, 300), [setSearch]);

  const shouldShowPopover =
    isFocused &&
    search.length >= 2 &&
    (isFetching || data != null || (data == null && !isFetching));

  const handleCleanBeforeNavigate = useCallback((city: City) => {
    setSearch(city.name);
    setIsFocused(false);

    if (inputRef.current == null) {
      return;
    }

    inputRef.current.value = "";
    inputRef.current?.blur();
  }, []);

  const handleNavigateToCity = useCallback(() => {
    const firstOption = data?.results?.[0];

    if (firstOption == null) {
      return;
    }

    handleCleanBeforeNavigate(firstOption);

    navigate({
      to: "/city/$city-id",
      params: { "city-id": firstOption.id },
    });
  }, [data?.results, handleCleanBeforeNavigate, navigate]);

  const handleOnKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") {
        return;
      }

      handleNavigateToCity();
    },

    [handleNavigateToCity],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        setIsFocused((currentIsFocused) => !currentIsFocused);
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex flex-col gap-8 xl:mx-auto xl:gap-16">
      <h1 className="text-preset-2 mx-2 text-center md:mx-[25%] xl:mx-auto">
        How&apos;s the sky looking today?
      </h1>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <Popover open={shouldShowPopover}>
          <PopoverTrigger asChild>
            <div className="w-full xl:mx-5">
              <Input
                startIcon={<SearchIcon className="h-5 w-5" />}
                placeholder="Search for a place..."
                onChange={(e) => debouncedSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyUp={handleOnKeyUp}
                ref={inputRef}
              />
            </div>
          </PopoverTrigger>

          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[var(--radix-popover-trigger-width)]"
          >
            <ScrollArea>
              {/* div needed as ScrollArea doesn't work with max-h */}
              <div className="max-h-52">
                {isFetching && (
                  <div className="flex items-center gap-2.5 px-2 py-2.5">
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    <p className="text-preset-7">Search in progress</p>
                  </div>
                )}

                {(!isFetching &&
                  data?.results?.map((option) => (
                    <CitySearchMenuItem
                      key={option.id}
                      city={option}
                      onClick={handleCleanBeforeNavigate}
                    />
                  ))) ?? <p className="text-preset-7">No results</p>}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <CityFavoritePicker />
      </div>
    </div>
  );
};
