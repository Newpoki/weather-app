import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // This is needed to avoid conflict with text color and font size
      "font-size": [
        "text-preset-1",
        "text-preset-2",
        "text-preset-3",
        "text-preset-4",
        "text-preset-5",
        "text-preset-6",
        "text-preset-7",
        "text-preset-8",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
