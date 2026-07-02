"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const logoSrc = "/katha-media/kathadigital-logo-cutout.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/productions", label: "Productions" },
  { to: "/news", label: "News" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <Container className="pointer-events-auto px-3 sm:px-5">
        <div className="premium-panel flex items-center justify-between gap-4 rounded-full px-4 py-3 transition-all duration-500 md:px-6">
          <Link
            href="/"
            className="group flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-12 w-32 items-center justify-center sm:w-40">
              <Image
                src={logoSrc}
                alt="Katha Digital"
                className="h-full w-full object-contain"
                width={176}
                height={56}
              />
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 rounded-full border border-white/8 bg-background/28 p-1.5 backdrop-blur-xl xl:flex"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  "rounded-full border border-transparent px-4 py-2 text-sm font-semibold tracking-wide text-white/64 transition-all duration-300 hover:text-white",
                  (l.to === "/" ? pathname === "/" : pathname.startsWith(l.to)) &&
                    "border-gold/35 bg-gold/15 text-gold",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/book-now"
              className="hidden rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 xl:inline-flex"
            >
              Book Now
            </Link>
            <button
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-white/10 p-2 text-white transition-colors hover:border-gold/50 hover:text-gold xl:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "pointer-events-auto mx-3 mt-2 overflow-hidden rounded-3xl border border-border/70 bg-background/95 shadow-[0_24px_80px_-44px_oklch(0_0_0/0.85)] backdrop-blur-xl transition-all duration-500 sm:mx-5 xl:hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <nav aria-label="Mobile navigation" className="container-cinema flex flex-col gap-1 py-6">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-lg font-display text-white/90 border-b border-white/10",
                (l.to === "/" ? pathname === "/" : pathname.startsWith(l.to)) && "text-gold",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book-now"
            onClick={() => setOpen(false)}
            className="mt-4 text-center px-5 py-3 rounded-full bg-gold text-primary-foreground font-medium"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
