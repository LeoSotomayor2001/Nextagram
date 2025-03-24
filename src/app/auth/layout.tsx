import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nextagram Auth",
  description: "Copia de instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
  
      >
        <main >
          {children}

        </main>
      </body>
    </html>
  );
}