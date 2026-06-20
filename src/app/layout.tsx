import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Roboto } from "next/font/google";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://founderreach.app"),
  title: "FounderReach",
  description:
    "FounderReach helps founders find active hackathons, accelerators, funding, conferences, launch channels, talent, mentors, and trusted startup resources.",
  applicationName: "FounderReach",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/assets/brand/founderreach-logo-mark.png", type: "image/png", sizes: "248x264" },
      { url: "/assets/brand/founderreach-logo-mark.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/assets/brand/founderreach-logo-mark.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "FounderReach",
    url: "/",
    title: "FounderReach",
    description:
      "A founder opportunity radar for hackathons, accelerators, funding, events, credits, talent, mentors, and launch channels.",
    images: [
      {
        url: "/assets/brand/founderreach-og.png",
        width: 1200,
        height: 630,
        alt: "FounderReach opportunity radar for founders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FounderReach",
    description:
      "Find active startup opportunities, credits, funding, events, talent, mentors, and launch channels in one founder workspace.",
    images: ["/assets/brand/founderreach-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
