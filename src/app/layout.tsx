import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import ThemeProvider from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/layout-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SheyOTT - Local",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider>
            <LayoutProvider>
            {children}
            </LayoutProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
