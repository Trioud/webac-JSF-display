import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alternance Quest",
  description: "Phaser games created by the Web@cademie 2023/2024",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body
        style={{
          height: "100%",
          backgroundColor: "#0091d3",
          overflow: "hidden",
        }}
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
