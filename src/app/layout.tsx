import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

const decart = localFont({
  src: "../../public/fonts/Decart-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-decart",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Virtuaze",
  description: "A concrete certainty in real estate",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { PreloaderProvider } from "@/components/PreloaderContext";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gilroy.variable} ${decart.variable} h-full antialiased bg-background text-foreground`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <PreloaderProvider>
            <Preloader />
            {children}
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}