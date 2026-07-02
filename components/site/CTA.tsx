import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function CTA({
  className,
  panelClassName,
  title = "Ready to make your story look unforgettable?",
  subtitle = "Bring us the moment, the brand, or the idea. We will shape it with cinematic craft, calm direction, and a polished final delivery.",
  buttonText = "Book Now",
  to = "/book-now",
}: {
  className?: string;
  panelClassName?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  to?: string;
}) {
  return (
    <section className={cn("w-full max-w-full overflow-x-clip py-24 md:py-32", className)}>
      <Container>
        <div
          className={cn(
            "premium-panel relative overflow-hidden rounded-3xl p-10 md:p-20",
            panelClassName,
          )}
        >
          <div className="absolute inset-x-10 top-0 h-px gold-line" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/12 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-gold/7 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="eyebrow mb-4">Let's build the frame</div>
              <h3 className="text-4xl md:text-6xl font-display font-light leading-[1.05]">
                {title}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                {subtitle}
              </p>
            </div>
            <Link
              href={to}
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-semibold text-primary-foreground shadow-gold transition-all hover:-translate-y-0.5 whitespace-nowrap self-start lg:self-end"
            >
              {buttonText}
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
