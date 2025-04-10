import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { WhatsAppBanner } from "@/app/components/whatsapp-banner";
import CursorEffects from "@/components/cursor-effects.client";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata = {
  title: "GlowGirl - Beauty Products for Girls",
  description: "Safe, fun, and age-appropriate beauty products designed especially for young skin.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${quicksand.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
            <WhatsAppBanner />
            <CursorEffects />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}