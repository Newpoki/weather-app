import { CityKPIsCard } from "./city-kpis-card";

export const CityKPIsFallback = () => {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 xl:gap-6">
      <CityKPIsCard label="Feels like" value={undefined} />

      <CityKPIsCard label="Humidity" value={undefined} />

      <CityKPIsCard label="Wind" value={undefined} />

      <CityKPIsCard label="Precipitation" value={undefined} />
    </ul>
  );
};
