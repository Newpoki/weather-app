import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StarIcon } from "lucide-react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { CityFavoritesList } from "./city-favorites-list";

export const CityFavoritesPicker = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="default"
            className="aspect-square w-auto p-0"
            variant="primary"
          >
            <StarIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[500px] p-0" align="end">
          <CityFavoritesList setOpen={setOpen} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="default"
          className="aspect-square w-auto p-0"
          variant="primary"
        >
          <StarIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CityFavoritesList setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// TODO: Create reusable utils to properly display a city name (flag, name, zone1,zone2, etc)
// TODO: Find a way to remove a favorite city
// TODO: Display a specific screen to show when user has no favorite yet
