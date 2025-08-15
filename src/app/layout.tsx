import type { Metadata } from "next";
import "./globals.css";

// Pretendard 폰트를 외부 CDN에서 로드하기 위한 설정
// globals.css에서 @import 대신 HTML head에서 로드

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
        {/* Android optimization meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        
        {/* Font optimization */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
