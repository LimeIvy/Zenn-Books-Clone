import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
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
        className={`${zenMaruGothic.className}`}
      >
        {children}
      </body>
    </html>
  );
}
