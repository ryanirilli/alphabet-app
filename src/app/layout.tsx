import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAdsense from "@/components/google-adsense";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn the alphabet and have fun doing it",
  description:
    "Your kids are always taking your phone, they might as well learn something while they're at it!",
  openGraph: {
    title: "Learn the alphabet and have fun doing it",
    description: `Your kids are always taking your phone, they might as well learn something while they're at it!`,
    images: [
      {
        url: "https://www.abcflashcards.xyz/social-share.png",
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.abcflashcards.xyz/social-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <GoogleTagManager gtmId="GTM-TPKVMX3J" />
      <body className={`${inter.className} sm:overflow-auto`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <GoogleAdsense pId="2840020936892211" />
    </html>
  );
}
