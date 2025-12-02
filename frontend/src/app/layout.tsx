import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-zen-old-mincho",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Zenn Books Clone",
  description: "Zennの書籍機能のクローンアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.className}`}
      >
        {children}
      </body>
    </html>
  );
}
