import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Katha Digital",
    template: "%s - Katha Digital",
  },
  description:
    "Katha Digital is a premium cinematic production studio for wedding films, photography, events, original shows, music videos, brand stories, and digital media.",
  authors: [{ name: "Katha Digital" }],
  icons: {
    icon: [
      {
        url: "/katha-media/kathadigital-logo.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/katha-media/kathadigital-logo.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Katha Digital - Premium Cinematic Production Studio",
    description:
      "Premium wedding films, photography, events, original shows, music videos, brand stories, and digital media.",
    type: "website",
    images: ["/katha-media/hero-preview.jpg"],
  },
  twitter: {
    card: "summary",
    site: "@KathaDigital",
    title: "Katha Digital - Premium Cinematic Production Studio",
    description:
      "Premium wedding films, photography, events, original shows, music videos, brand stories, and digital media.",
    images: ["/katha-media/hero-preview.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
            <Navbar />
            <main className="w-full max-w-full flex-1 overflow-x-clip">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
