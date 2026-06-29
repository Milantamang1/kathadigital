import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-5",
        scrolled
          ? "pt-3"
          : "pt-5",
      )}
    >
      <div className="container-cinema flex items-center justify-between rounded-full border border-white/10 bg-ink/95 px-5 py-3 shadow-[0_22px_70px_-34px_oklch(0_0_0/0.9)] backdrop-blur-xl transition-all duration-500 md:px-7">
        <Link to="/" className="group flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]" onClick={() => setOpen(false)}>
          <span className="flex h-14 w-36 items-center justify-center sm:w-44">
            <img
              src={logoSrc}
              alt="Katha Digital"
              className="h-full w-full object-contain"
              width={176}
              height={56}
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-background/28 p-1.5 backdrop-blur-xl lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "border-gold/35 bg-gold/15 text-gold" }}
              className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold tracking-wide text-white/64 transition-all duration-300 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="hidden rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Book Now
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-white"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-3 mt-2 overflow-hidden rounded-3xl border border-border/70 bg-background/95 backdrop-blur-xl transition-all duration-500 sm:mx-5 lg:hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <nav className="container-cinema flex flex-col py-6 gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="py-3 text-lg font-display text-white/90 border-b border-white/10"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
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
