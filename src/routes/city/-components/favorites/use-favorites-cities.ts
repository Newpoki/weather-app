import {
  citySchema,
  fetchCityByIdQueryOption,
  type City,
} from "@/api/fetch-city-by-id";
import { useLocalStorage } from "@/lib/use-local-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import z from "zod";

const favoriteCitySchema = citySchema.extend({
  updatedAt: z.number().int(),
});

const favoriteCitiesSchema = z.record(
  z.string(),
  favoriteCitySchema.nullable(),
);

export type FavoriteCity = z.infer<typeof favoriteCitySchema>;
export type FavoriteCities = z.infer<typeof favoriteCitiesSchema>;

export const useFavoritesCities = () => {
  const queryClient = useQueryClient();

  const favoriteCitiesLS = useLocalStorage(
    "FAVORITE_CITIES",
    favoriteCitiesSchema.nullable(),
  );

  const [favoriteCities, setFavoriteCities] = useState(() => {
    const favoriteCitiesFromLS = favoriteCitiesLS.get() ?? {};

    // As city data (not the forecast) shouldn't really evolved at all,
    // It's safe to initialize query data from local storage
    Object.values(favoriteCitiesFromLS).forEach((city) => {
      if (city != null) {
        queryClient.setQueryData(
          fetchCityByIdQueryOption(city.id).queryKey,
          city,
        );
      }
    });

    return favoriteCitiesFromLS;
  });

  const handleToggleCity = useCallback(
    (city: City) => {
      setFavoriteCities((currentFavoriteCities) => {
        const newValues = {
          ...currentFavoriteCities,
          [city.id]:
            currentFavoriteCities[city.id] == null
              ? { ...city, updatedAt: new Date().getTime() }
              : null,
        } satisfies FavoriteCities;

        favoriteCitiesLS.set(newValues);

        return newValues;
      });
    },
    [favoriteCitiesLS],
  );

  return useMemo(
    () => ({
      favoriteCities,
      toggleFavoriteCity: handleToggleCity,
    }),
    [favoriteCities, handleToggleCity],
  );
};
