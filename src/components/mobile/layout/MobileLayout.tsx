'use client';

import { useEffect } from 'react';
import { MobileHeroSection } from '../sections/MobileHeroSection';
import MobileStatsSection from '../sections/MobileStatsSection';
import MobileProgressSection from '../sections/MobileProgressSection';
import MobileCarouselSection from '../sections/MobileCarouselSection';
import MobileCardsSection from '../sections/MobileCardsSection';
import MobileFAQSection from '../sections/MobileFAQSection';
import MobileFooter from '../sections/MobileFooter';

export default function MobileLayout() {
  useEffect(() => {
    // 안드로이드 및 모바일 터치 스크롤 최적화 설정
    const setTouchOptimization = () => {
      // 안드로이드 GPU 가속 및 렌더링 최적화
      document.documentElement.style.transform = 'translate3d(0, 0, 0)';
      document.documentElement.style.backfaceVisibility = 'hidden';
      document.documentElement.style.perspective = '1000px';
      
      // 터치 스크롤 부드럽게 설정
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.overscrollBehavior = 'contain';
      
      // 안드로이드 터치 최적화
      document.body.style.touchAction = 'pan-y';
      document.body.style.webkitTapHighlightColor = 'transparent';
      document.body.style.webkitTouchCallout = 'none';
      
      // 안드로이드 폰트 렌더링 최적화
      document.body.style.webkitFontSmoothing = 'antialiased';
      document.body.style.mozOsxFontSmoothing = 'grayscale';
      
      // 안드로이드 뷰포트 높이 최적화
      document.documentElement.style.minHeight = '-webkit-fill-available';
      document.body.style.minHeight = '-webkit-fill-available';
      
      // iOS Safari 바운스 스크롤 제한
      document.body.style.overscrollBehaviorY = 'contain';
      
      // 안드로이드 Chrome 주소창 높이 변화 대응
      const handleResize = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    };

    const cleanup = setTouchOptimization();

    return () => {
      // 클린업
      if (cleanup) cleanup();
      document.documentElement.style.transform = '';
      document.documentElement.style.backfaceVisibility = '';
      document.documentElement.style.perspective = '';
      document.documentElement.style.scrollBehavior = '';
      document.documentElement.style.minHeight = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.touchAction = '';
      document.body.style.webkitTapHighlightColor = '';
      document.body.style.webkitTouchCallout = '';
      document.body.style.webkitFontSmoothing = '';
      document.body.style.mozOsxFontSmoothing = '';
      document.body.style.minHeight = '';
      document.body.style.overscrollBehaviorY = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white gpu-accelerated smooth-scroll"
      style={{
        willChange: 'scroll-position',
        backfaceVisibility: 'hidden',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Hero Section with Navigation */}
      <MobileHeroSection />

      {/* Stats Section */}
      <MobileStatsSection />

      {/* Progress Section */}
      <MobileProgressSection />

      {/* Carousel Section */}
      <MobileCarouselSection />

      {/* Cards Section */}
      <MobileCardsSection />

      {/* FAQ Section */}
      <MobileFAQSection />

      {/* Footer */}
      <MobileFooter />
    </div>
  );
}