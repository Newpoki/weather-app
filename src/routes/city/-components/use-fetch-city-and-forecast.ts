import { fetchCityByIdQueryOption } from "@/api/fetch-city-by-id";
import { fetchCityForecastQueryOptions } from "@/api/fetch-city-forecast";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";

const cityRouteAPi = getRouteApi("/city/$city-id");

export const useFetchCityAndForecast = () => {
  const { unit } = cityRouteAPi.useSearch();
  const params = cityRouteAPi.useParams();

  const { data: city } = useSuspenseQuery(
    fetchCityByIdQueryOption(params["city-id"]),
  );

  const { data: forecast } = useSuspenseQuery(
    fetchCityForecastQueryOptions({
      latitude: city.latitude,
      longitude: city.longitude,
      unit,
    }),
  );

  return useMemo(
    () => ({
      city,
      forecast,
      unit,
    }),
    [city, forecast, unit],
  );
};
