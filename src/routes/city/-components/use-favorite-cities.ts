import type { City } from "@/api/fetch-city-by-id";
import { useLocalStorage } from "@/lib/use-local-storage";
import { useCallback, useMemo, useState } from "react";
import z from "zod";

const favoriteCitiesSchema = z.record(z.string(), z.boolean());

export const useFavoriteCities = () => {
  const favoriteCitiesLS = useLocalStorage(
    "favorite-city",
    favoriteCitiesSchema,
  );

  const [favoriteCities, setFavoriteCities] = useState(
    favoriteCitiesLS.get() ?? {},
  );

  const handleToggleCity = useCallback(
    (cityId: City["id"]) => {
      setFavoriteCities((currentFavoriteCities) => {
        const cityCurrentFavoriteState = currentFavoriteCities[cityId] ?? false;

        const newValues = {
          ...currentFavoriteCities,
          [cityId]: !cityCurrentFavoriteState,
        };

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
