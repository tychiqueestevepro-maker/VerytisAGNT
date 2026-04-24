import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import "./globals.css";
import { headers } from "next/headers";
import { translations } from "@/lib/translations";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getLanguage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  return acceptLanguage.toLowerCase().startsWith("fr") ? "FR" : "EN";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguage();
  const t = lang === "FR" ? translations.FR.metadata : translations.EN.metadata;

  return {
    title: t.title,
    description: t.description,
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

import { LanguageProvider } from "@/context/LanguageContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLanguage();
  
  return (
    <html
      lang={lang.toLowerCase()}
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <LanguageProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
