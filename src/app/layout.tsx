import type { Metadata } from "next";
import { Inter, Koulen } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const koulen = Koulen({
  weight: "400",
  variable: "--font-koulen",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shill Official Store – SHILL",
  description: "Shill, Everywhere You Go. Renew your clothes right now with our cool and stylish collections.",
  icons: {
    icon: "/sites/shillstore/root/images/favicon-shill.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${koulen.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#121212] selection:bg-[#ff1b2d] selection:text-white">
        {children}
      </body>
    </html>
  );
}
