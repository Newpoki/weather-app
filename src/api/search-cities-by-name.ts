import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { citySchema } from "./fetch-city-by-id";
import { openMeteoGeocodingAPI } from "./meteo-api";

const responseSchema = z.object({
  generationtime_ms: z.number(),
  // Missing results means no results
  results: z.array(citySchema).optional(),
});

export const searchCitiesByNameQueryOption = (search: string) =>
  queryOptions({
    queryKey: ["search", search],
    queryFn: async () => {
      const response = await openMeteoGeocodingAPI(
        `/search?name=${search}&count=10&language=en&format=json`,
      );

      return responseSchema.parse(response);
    },
    enabled: search.length > 2,
    staleTime: Infinity, // This shouldn't get updated very often, we can consider it always valid
  });
