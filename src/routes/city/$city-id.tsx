import { createFileRoute } from "@tanstack/react-router";
import { z, ZodError } from "zod";
import { CityHero } from "./-components/city-hero";
import { CityNotFound } from "./-components/city-not-found";
import { CityKPIs } from "./-components/kpis/city-kpis";
import { CityDailyForecast } from "./-components/daily-forecast/city-daily-forecast";
import { CityHourlyForecast } from "./-components/hourly-forecast/city-hourly-forecast";
import { unitModeSchema } from "@/units/units-types";
import { UNIT_MODE } from "@/units/units-constants";
import { Suspense } from "react";
import { CityHeroFallback } from "./-components/city-hero-fallback";
import { CityKPIsFallback } from "./-components/kpis/city-kpis-fallback";
import { CityDailyForecastFallback } from "./-components/daily-forecast/city-daily-forecast-fallback";
import { CityHourlyForecastFallback } from "./-components/hourly-forecast/city-hourly-forecast-fallback";
import { CityError } from "./-components/city-error";
import { CitySearch } from "./-components/search/city-search";

const citySearchParamsSchema = z.object({
  unit: unitModeSchema.default(UNIT_MODE.METRIC),
});

export const Route = createFileRoute("/city/$city-id")({
  component: RouteComponent,
  validateSearch: citySearchParamsSchema,
  params: {
    parse: (params) => ({
      ["city-id"]: z.number().int().parse(Number(params["city-id"])),
    }),
  },
  notFoundComponent: CityNotFound,
  errorComponent: CityError,
  onCatch: (error) => {
    if (error instanceof ZodError) {
      console.log(error);
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-8 md:gap-12 xl:gap-16">
      <CitySearch />

      <main className="flex flex-col gap-8 xl:grid xl:grid-cols-[2fr_1fr]">
        <div className="flex w-full flex-col gap-8 xl:justify-between xl:gap-12">
          <div className="flex flex-col gap-5 xl:gap-8">
            <Suspense fallback={<CityHeroFallback />}>
              <CityHero />
            </Suspense>

            <Suspense fallback={<CityKPIsFallback />}>
              <CityKPIs />
            </Suspense>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-preset-5">Daily forecast</h3>

            <ul className="grid grid-cols-3 gap-4 md:grid-cols-7">
              <Suspense fallback={<CityDailyForecastFallback />}>
                <CityDailyForecast />
              </Suspense>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[20px] bg-neutral-800 px-4 py-5 md:p-6">
          <Suspense fallback={<CityHourlyForecastFallback />}>
            <CityHourlyForecast />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
