import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
};

function Input({ className, type, startIcon, ...props }: InputProps) {
  return (
    <label
      className={cn(
        "transition-color inline-flex h-14 w-full min-w-0 items-center gap-4 rounded-[12px] border-[3px] border-transparent bg-neutral-800 px-8 py-4",
        "focus-within:border-background text-muted-foreground focus-within:ring-2 focus-within:outline-2",
      )}
    >
      {startIcon}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground text-preset-5 h-14 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    </label>
  );
}

export { Input };
