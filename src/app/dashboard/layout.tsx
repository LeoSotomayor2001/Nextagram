import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/dashboard/Sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nextagram Dashboard",
  description: "Copia de instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}