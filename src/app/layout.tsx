import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig, isPlaceholder } from "@/data/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#162740",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Trident Prop Strategy | Real Estate Sales Acceleration for KDMC Developers",
    template: "%s | Trident Prop Strategy",
  },
  description:
    "B2B real estate sales advisory firm partnering with small developers and mandate owners in Kalyan, Dombivli and KDMC to accelerate stalled inventory through hyper-local intelligence, sales training, and active channel partner networks.",
  keywords: [
    "Kalyan Dombivli real estate sales advisory",
    "KDMC real estate mandates",
    "Kalyan builder sales accelerator",
    "Dombivli unsold inventory sales strategy",
    "real estate mandate owners Kalyan",
    "channel partner network MMR",
  ],
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.domain,
    title: "Trident Prop Strategy | Real Estate Sales Acceleration for KDMC Developers",
    description:
      "Data-driven sales advisory, sales team training, and channel partner activation for real estate developers across Kalyan, Dombivli, and KDMC suburbs.",
    siteName: siteConfig.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Trident Prop Strategy | Real Estate Sales Acceleration for KDMC Developers",
    description:
      "Data-driven sales advisory, sales team training, and channel partner activation for real estate developers across Kalyan, Dombivli, and KDMC suburbs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate JSON-LD with real values only
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brandName,
    description:
      "B2B real estate sales advisory firm partnering with small developers and mandate owners in Kalyan, Dombivli and KDMC suburbs.",
    url: siteConfig.domain,
    areaServed: [
      { "@type": "City", name: "Kalyan" },
      { "@type": "City", name: "Dombivli" },
      { "@type": "City", name: "Ambernath" },
      { "@type": "City", name: "Badlapur" },
      { "@type": "City", name: "Shahad" },
      { "@type": "City", name: "Titwala" },
    ],
  };

  if (!isPlaceholder(siteConfig.phone)) {
    jsonLd.telephone = siteConfig.phone;
  }
  if (!isPlaceholder(siteConfig.email)) {
    jsonLd.email = siteConfig.email;
  }
  if (!isPlaceholder(siteConfig.address)) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "IN",
    };
  }

  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#162740] text-white font-sans antialiased selection:bg-[#e4bd21] selection:text-[#162740]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#e4bd21] focus:text-[#162740] focus:font-semibold focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
