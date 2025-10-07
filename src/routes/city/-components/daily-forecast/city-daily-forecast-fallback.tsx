export const CityDailyForecastFallback = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div
      className="bg-card border-border h-[167px] rounded-[12px] border"
      key={index}
    />
  ));
};
