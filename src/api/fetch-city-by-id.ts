import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { openMeteoGeocodingAPI } from "./meteo-api";

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number(),
  timezone: z.string(),
  feature_code: z.string(),
  country_code: z.string().length(2), // ISO-3166-1 alpha2
  country: z.string(),
  country_id: z.number(),
  population: z.number().optional(),
  postcodes: z.array(z.string()).optional(),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
  admin3: z.string().optional(),
  admin4: z.string().optional(),
});

export type City = z.infer<typeof citySchema>;

export const BERLIN_CITY_ID = 2950159 as const;

export const fetchCityByIdQueryOption = (id: number) =>
  queryOptions({
    queryKey: ["city", id],
    queryFn: async () => {
      const response = await openMeteoGeocodingAPI(`/get?id=${id}`);

      return citySchema.parse(response);
    },
    staleTime: Infinity, // This shouldn't get updated very often, we can consider it always valid
  });
