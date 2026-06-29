import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

const logoSrc = "/katha-media/kathadigital-logo-cutout.png";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-ink">
      <div className="container-cinema py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-64 items-center justify-center">
              <img
                src={logoSrc}
                alt="Katha Digital"
                loading="lazy"
                className="h-full w-full object-contain"
                width={256}
                height={80}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Katha Digital - Stories That Inspire, Moments That Last.
          </p>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            A creative media and production company telling powerful visual stories.
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["/about", "About"],
              ["/portfolio", "Portfolio"],
              ["/productions", "Productions"],
              ["/news", "News & Blog"],
              ["/events", "Events"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-muted-foreground hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Services</h4>
          <ul className="space-y-3 text-sm">
            {[
              "Wedding Photography",
              "Wedding Cinematography",
              "Event Coverage",
              "Travel Stories",
              "Commercial Production",
              "Original Productions",
            ].map((s) => (
              <li key={s}>
                <Link to="/services" className="text-muted-foreground hover:text-gold transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="size-4 text-gold mt-0.5 shrink-0" />
              Bhaktapur, Nepal
            </li>
            <li className="flex items-start gap-3">
              <Phone className="size-4 text-gold mt-0.5 shrink-0" />
              +977 9861078220
            </li>
            <li className="flex items-start gap-3">
              <Mail className="size-4 text-gold mt-0.5 shrink-0" />
              hello@kathadigital.com
            </li>
          </ul>
          <div className="flex gap-3 mt-6">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="size-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-cinema py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <p>Copyright {new Date().getFullYear()} Katha Digital. All rights reserved.</p>
          <p>Crafted with cinematic care.</p>
        </div>
      </div>
    </footer>
  );
}
