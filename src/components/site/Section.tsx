import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      <div className="container-cinema">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-14 md:mb-20",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-light leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.13_80/0.12),transparent_60%)]" />
      <div className="container-cinema relative">
        <div className="eyebrow mb-5 animate-fade-up">{eyebrow}</div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[1.02] max-w-4xl animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
