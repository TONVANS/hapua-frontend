import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "42nd HAPUA Council Meeting | Luang Prabang, Lao PDR",
  description: "Official portal for the 42nd Heads of ASEAN Power Utilities/Authorities (HAPUA) Council Meeting. Leading ASEAN towards a sustainable and interconnected energy future.",
  keywords: ["HAPUA", "ASEAN", "Energy Summit", "Luang Prabang", "Power Utilities", "Council Meeting 2026"],
  authors: [{ name: "HAPUA Secretariat" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
