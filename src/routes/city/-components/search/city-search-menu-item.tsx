import type { City } from "@/api/fetch-city-by-id";
import { Link } from "@tanstack/react-router";
import { useCallback } from "react";

type CitySearchMenuItemProps = {
  city: City;
  onClick: (city: City) => void;
};

export const CitySearchMenuItem = ({
  city,
  onClick,
}: CitySearchMenuItemProps) => {
  const handleClick = useCallback(() => {
    onClick(city);
  }, [city, onClick]);

  return (
    <Link to="/city/$city-id" params={{ "city-id": city.id }}>
      <div
        onClick={handleClick}
        className="hover:bg-accent flex cursor-pointer items-center gap-4 rounded-[8px] border border-transparent px-2 py-2 transition-colors hover:border-neutral-600"
      >
        <img
          src={`https://open-meteo.com/images/country-flags/${city.country_code.toLowerCase()}.svg`}
          className="h-5 w-5"
          alt={`Flag icon for the city's code country ${city.country_code.toLowerCase()}`}
        />
        {city.name}, {city.admin1}, {city.country}
      </div>
    </Link>
  );
};
