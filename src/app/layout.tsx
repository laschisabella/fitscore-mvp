import { AnimatePresence } from "framer-motion";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitscore MVP",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Raleway', sans-serif" }}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}
