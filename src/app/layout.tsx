import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Loader } from "@/components/layout/Loader";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "علام المطري",
    "مصمم جرافيك",
    "تصميم هوية بصرية",
    "مصمم سعودي",
    "الذكاء الاصطناعي في التصميم",
    "تصميم سوشيال ميديا",
    "موشن جرافيك",
    "تصميم شعارات",
    "UI UX Designer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og-image.svg"],
    creator: "@allam_design",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/hero-portrait.svg`,
  jobTitle: "مصمم جرافيك ومبدع بالذكاء الاصطناعي",
  description: siteConfig.description,
  email: siteConfig.email,
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
    siteConfig.social.behance,
    siteConfig.social.twitter,
  ],
  knowsAbout: [
    "تصميم الهوية البصرية",
    "تصميم السوشيال ميديا",
    "الموشن جرافيك",
    "تصميم الإعلانات",
    "تصميم المتاجر الإلكترونية",
    "تصميم UI/UX",
    "الذكاء الاصطناعي في التصميم",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-arabic antialiased">
        <Loader />
        <BackgroundFX />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
