import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./Container";

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
    <section id={id} className={cn("w-full max-w-full overflow-x-clip py-24 md:py-32", className)}>
      <Container>{children}</Container>
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
      <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-display font-light leading-[1.05]">
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
    <section
      className={cn(
        "relative isolate w-full max-w-full overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_25%_0%,oklch(0.78_0.13_80/0.16),transparent_58%),radial-gradient(ellipse_at_82%_12%,oklch(0.42_0.04_250/0.15),transparent_48%),linear-gradient(180deg,oklch(0.16_0.014_70/0.62),transparent_68%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px gold-line" />
      <Container className="relative">
        <div className="eyebrow mb-5 animate-fade-up">{eyebrow}</div>
        <h1 className="text-balance text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[1.02] max-w-5xl animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-8 animate-fade-up">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
