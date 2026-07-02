import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary rounded-full",
  secondary: "btn-secondary rounded-full",
  ghost: "btn-ghost rounded-full",
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <Link className={cn(variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
