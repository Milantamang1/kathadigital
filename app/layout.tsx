import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { getSiteSettings } from "@/lib/cms/settings";
import { Providers } from "./providers";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
      default: settings.siteTitle,
      template: `%s - ${settings.brandName}`,
    },
    description: settings.siteDescription,
    authors: [{ name: settings.brandName }],
    icons: {
      icon: [
        {
          url: settings.faviconSrc,
          type: "image/png",
        },
      ],
      apple: [
        {
          url: settings.faviconSrc,
          type: "image/png",
        },
      ],
    },
    openGraph: {
      title: settings.openGraphTitle,
      description: settings.openGraphDescription,
      type: "website",
      images: [settings.openGraphImage],
    },
    twitter: {
      card: "summary",
      site: settings.twitterSite || undefined,
      title: settings.openGraphTitle,
      description: settings.openGraphDescription,
      images: [settings.openGraphImage],
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="min-h-full w-full overflow-x-clip">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-dvh w-full overflow-x-clip">
        <Providers>
          <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-clip bg-background text-foreground">
            <Navbar settings={settings} />
            <main className="w-full max-w-full flex-1 overflow-x-clip">{children}</main>
            <Footer settings={settings} />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
