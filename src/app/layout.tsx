import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { ToastContainer } from "react-toastify";



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
    <html lang="es">
      <body
     
      >
         <header className="flex justify-end bg-white dark:bg-black p-4">
          <ThemeToggle />
        </header>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
