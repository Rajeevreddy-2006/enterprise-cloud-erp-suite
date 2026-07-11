import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10",
        "w-full",
        "rounded-lg",
        "border",
        "border-slate-700",
        "bg-slate-900",
        "px-3",
        "text-white",
        "placeholder:text-slate-400",
        "outline-none",
        "transition",
        "focus:ring-2",
        "focus:ring-blue-500",
        "focus:border-blue-500",
        "disabled:opacity-50",
        className
      )}
      {...props}
      />
  );
}

export { Input };