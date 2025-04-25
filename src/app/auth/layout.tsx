import DashboardGuard from "@/components/Guards/DashboardGuard";
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
    <DashboardGuard>
      <main >
        {children}

      </main>
    </DashboardGuard>
  );
}