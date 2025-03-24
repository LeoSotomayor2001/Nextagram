import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ThemeToggle } from "@/components/ThemeToggle";

import { ThemeProvider } from "@/components/theme-provider";



export const metadata: Metadata = {
  title: "Nextagram",
  description: "Copia de instagram",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body >
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <header className="flex justify-end p-4">
            <ThemeToggle />
          </header>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
