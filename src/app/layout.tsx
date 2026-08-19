import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOC Intelligence Academy",
  description: "SOC & Security Monitoring + Threat Intelligence & Advanced Dark Web Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex h-dvh min-h-0 overflow-hidden bg-background text-foreground`}>
        <Sidebar />
        <div className="flex min-w-0 flex-1 min-h-0 flex-col overflow-hidden">
          <TopNav />
          <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
