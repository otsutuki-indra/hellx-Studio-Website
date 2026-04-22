import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HELLX | Beyond the Fear",
  description:
    "We made Whatever Others Fear. The digital laboratory for building next-generation AI-powered applications.",
  generator: "HELLX STUDIO",
  keywords: [
    "AI",
    "Web Development",
    "Next.js",
    "Digital Laboratory",
    "Creative Hub",
    "HELLX",
  ],
  authors: [{ name: "HELLX STUDIO" }],
  openGraph: {
    title: "HELLX | Beyond the Fear",
    description:
      "We made Whatever Others Fear. Build next-generation digital experiences powered by cutting-edge AI technology.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00D4FF",
          colorBackground: "#0D0D0D",
          colorInputBackground: "#1A1A1A",
          colorInputText: "#FAFAFA",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "glass-card border-white/10",
          formButtonPrimary: "neon-button",
          footerActionLink: "text-neon-blue hover:text-neon-blue/80",
        },
      }}
    >
      <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <body className="bg-background font-sans antialiased">
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </body>
      </html>
    </ClerkProvider>
  );
}
