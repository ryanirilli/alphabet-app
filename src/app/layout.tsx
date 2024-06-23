import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAdsense from "@/components/google-adsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn the alphabet and have fun doing it",
  description:
    "Your kids are always taking your phone, they might as well learn something while they're at it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
