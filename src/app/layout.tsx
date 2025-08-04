import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "카페24 유튜브 쇼핑 - 전 세계 20억 사용자와 만나세요",
  description: "새로운 유튜브 쇼핑을 시작하세요. 간편한 스토어 구축부터 매출 증대까지 한번에. 전 세계 20억 사용자와 만나보세요.",
  keywords: "유튜브 쇼핑, 카페24, 온라인 쇼핑몰, 크리에이터 협업, 글로벌 판매",
  authors: [{ name: "카페24" }],
  openGraph: {
    title: "카페24 유튜브 쇼핑 - 전 세계 20억 사용자와 만나세요",
    description: "새로운 유튜브 쇼핑을 시작하세요. 간편한 스토어 구축부터 매출 증대까지 한번에.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "카페24 유튜브 쇼핑",
    description: "새로운 유튜브 쇼핑을 시작하세요. 전 세계 20억 사용자와 만나보세요.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
