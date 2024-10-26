import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giva store by Sachida",
  description: "Simple e-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
