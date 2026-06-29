import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTA({
  className,
  panelClassName,
  title = "Have a story worth telling?",
  subtitle = "Let's create something cinematic together.",
  buttonText = "Book Your Shoot",
  to = "/book",
}: {
  className?: string;
  panelClassName?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  to?: string;
}) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container-cinema">
        <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-ink p-10 md:p-20", panelClassName)}>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="eyebrow mb-4">Let's collaborate</div>
              <h3 className="text-4xl md:text-6xl font-display font-light leading-[1.05]">
                {title}
              </h3>
              <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>
            </div>
            <Link
              to={to}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-gold transition-all whitespace-nowrap self-start lg:self-end"
            >
              {buttonText}
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
