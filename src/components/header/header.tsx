import Logo from "@/icons/logo.svg?react";
import { HeaderUnitsPicker } from "./header-units-picker";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-8 xl:gap-16">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="focus-visible:ring-neutral-0 -m-2 rounded-[8px] p-2 focus-visible:ring-2"
        >
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-10" />

            <h1 className="text-preset-7 font-bricolage-grotesque font-bold">
              Weather Now
            </h1>
          </div>
        </Link>

        <HeaderUnitsPicker />
      </header>
    </div>
  );
};
