import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ketchup - Decentralized HR System",
  description: "A decentralized HR management system with Algorand integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}


