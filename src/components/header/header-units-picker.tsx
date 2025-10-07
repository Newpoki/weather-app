"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, SettingsIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";

import { getRouteApi } from "@tanstack/react-router";
import {
  PRECIPITATION_UNIT,
  WIND_SPEED_UNIT,
  TEMPERATURE_UNIT,
  UNIT_MODE,
} from "@/units/units-constants";

const cityRouteAPi = getRouteApi("/city/$city-id");

const SECTIONS = [
  {
    label: "Temperature",
    units: [
      {
        type: UNIT_MODE.METRIC,
        label: TEMPERATURE_UNIT[UNIT_MODE.METRIC].label,
      },
      {
        type: UNIT_MODE.IMPERIAL,
        label: TEMPERATURE_UNIT[UNIT_MODE.IMPERIAL].label,
      },
    ],
  },
  {
    label: "Wind Speed",
    units: [
      {
        type: UNIT_MODE.METRIC,
        label: WIND_SPEED_UNIT[UNIT_MODE.METRIC].label,
      },
      {
        type: UNIT_MODE.IMPERIAL,
        label: WIND_SPEED_UNIT[UNIT_MODE.IMPERIAL].label,
      },
    ],
  },
  {
    label: "Precipitation",
    units: [
      {
        type: UNIT_MODE.METRIC,
        label: PRECIPITATION_UNIT[UNIT_MODE.METRIC].label,
      },
      {
        type: UNIT_MODE.IMPERIAL,
        label: PRECIPITATION_UNIT[UNIT_MODE.IMPERIAL].label,
      },
    ],
  },
] as const;

export const HeaderUnitsPicker = () => {
  const { unit: selectedUnit } = cityRouteAPi.useSearch();
  const cityRouteNavigate = cityRouteAPi.useNavigate();

  const handleMenuItemSelect = useCallback((event: Event) => {
    // We don't want to close the dropdown when user select an item
    // So user can change many unit before closing the menu
    event.preventDefault();
  }, []);

  const handleChangeMetric = useCallback(
    (event: Event) => {
      handleMenuItemSelect(event);

      cityRouteNavigate({
        to: "/city/$city-id",
        search: {
          unit:
            selectedUnit === UNIT_MODE.METRIC
              ? UNIT_MODE.IMPERIAL
              : UNIT_MODE.METRIC,
        },
      });
    },
    [cityRouteNavigate, handleMenuItemSelect, selectedUnit],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="small">
          <SettingsIcon className="aspect-square w-4" />
          Units
          <ChevronDownIcon className="aspect-square w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex w-56 flex-col gap-1"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuItem
          onSelect={handleChangeMetric}
          className="cursor-pointer"
        >
          {selectedUnit === UNIT_MODE.METRIC
            ? "Switch to Imperial"
            : "Switch to Metric"}
        </DropdownMenuItem>

        {SECTIONS.map((section, index) => {
          const isLastSection = SECTIONS.length - 1 === index;

          return (
            <ul key={section.label} className="flex flex-col gap-1">
              <DropdownMenuLabel tabIndex={-1}>
                {section.label}
              </DropdownMenuLabel>

              {section.units.map((unit) => {
                return (
                  <DropdownMenuCheckboxItem
                    onSelect={handleMenuItemSelect}
                    key={unit.type}
                    checked={unit.type === selectedUnit}
                    tabIndex={-1}
                  >
                    {unit.label}
                  </DropdownMenuCheckboxItem>
                );
              })}

              {!isLastSection && <DropdownMenuSeparator />}
            </ul>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
