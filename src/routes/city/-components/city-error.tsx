import { METEO_API_ERRORS } from "@/api/meteo-api";
import { Button } from "@/components/ui/button";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { BanIcon, RefreshCwIcon } from "lucide-react";
import { useCallback } from "react";
import { CitySearch } from "./search/city-search";

export const CityError = ({ error, reset }: ErrorComponentProps) => {
  const handleRetry = useCallback(() => {
    reset();
  }, [reset]);

  if (error.cause === METEO_API_ERRORS.NOT_FOUND.CODE) {
    return (
      <>
        <CitySearch />

        <h3 className="text-preset-4 text-center">No search result found!</h3>
      </>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center gap-6 text-center">
      <BanIcon className="h-10 w-10 text-neutral-300" />

      <h2 className="text-preset-2">{METEO_API_ERRORS.UNKNOWN.TITLE}</h2>

      <p className="text-muted-foreground">
        {METEO_API_ERRORS.UNKNOWN.MESSAGE}
      </p>

      <Button size="small" type="button" onClick={handleRetry}>
        <RefreshCwIcon />
        Retry
      </Button>
    </main>
  );
};
