import { citySchema } from "@/api/fetch-city-by-id";
import { useLocalStorage } from "@/lib/use-local-storage";
import { useCallback, useMemo, useState } from "react";
import z from "zod";

const favoriteCitySchema = citySchema.extend({
  updatedAt: z.number().int(),
});

const favoriteCitiesSchema = z.record(z.string(), favoriteCitySchema);

export type FavoriteCity = z.infer<typeof favoriteCitySchema>;
export type FavoriteCities = z.infer<typeof favoriteCitiesSchema>;

export const useFavoritesCities = () => {
  const favoriteCitiesLS = useLocalStorage(
    "favorite-city",
    favoriteCitiesSchema.nullable(),
  );

  const [favoriteCities, setFavoriteCities] = useState(
    favoriteCitiesLS.get() ?? {},
  );

  const handleToggleCity = useCallback(
    (city: FavoriteCity) => {
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
