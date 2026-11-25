import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwitchNotify | Nintendo Switch Notification Bridge",
  description: "Monitor and receive notifications for your Nintendo Switch activity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-switch-dark text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
