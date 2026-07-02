import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type CardProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Card<T extends ElementType = "article">({ as, className, ...props }: CardProps<T>) {
  const Component = as ?? "article";

  return (
    <Component
      className={cn(
        "premium-panel rounded-3xl ring-1 ring-white/5 transition-all duration-300",
        className,
      )}
      {...props}
    />
  );
}
