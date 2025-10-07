import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CityHourlyForecastFallback = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h5 className="text-preset-5 whitespace-nowrap">Hourly forecast</h5>

        <Select disabled>
          <SelectTrigger size="sm">
            <SelectValue placeholder="-" />
          </SelectTrigger>
        </Select>
      </div>

      <ul className="flex max-h-[608px] flex-col gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className="border-border bg-accent h-[60px] rounded-[8px] border"
          />
        ))}
      </ul>
    </>
  );
};
