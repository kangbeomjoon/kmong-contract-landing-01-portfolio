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
    // 모바일 터치 스크롤 최적화 설정
    const setTouchOptimization = () => {
      // 터치 스크롤 부드럽게 설정
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.overscrollBehavior = 'contain';
      
      // 터치 딜레이 제거
      document.body.style.touchAction = 'manipulation';
      
      // iOS Safari 바운스 스크롤 제한
      document.body.style.overscrollBehaviorY = 'contain';
    };

    setTouchOptimization();

    return () => {
      // 클린업
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehaviorY = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
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