import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIMTALENTA DJBC · Simulator Dukungan Manajemen",
  description:
    "100 soal analitik Manajemen Talenta DJBC dengan pembahasan seluruh pilihan jawaban dan sumber resmi.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
