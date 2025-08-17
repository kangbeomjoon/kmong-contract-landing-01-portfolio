import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Next.js 최적화된 폰트 로딩
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
};

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
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 웹폰트 추가 - Windows 호환성 개선 */}
        <link 
          rel="preconnect" 
          href="https://cdn.jsdelivr.net" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        
        {/* Android optimization meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
