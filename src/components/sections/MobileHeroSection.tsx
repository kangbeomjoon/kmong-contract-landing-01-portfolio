'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';


const navigationItems = [
  { id: 'stats', label: '섹션1' },
  { id: 'progress', label: '섹션2' },
  { id: 'carousel', label: '섹션3' },
  { id: 'cards', label: '섹션4' }
];

// Note: dropdownItems available for future navigation implementation
// const dropdownItems = [
//   { id: 'stats', label: '섹션1' },
//   { id: 'progress', label: '섹션2' },
//   { id: 'carousel', label: '섹션3' },
//   { id: 'cards', label: '섹션4' },
//   { id: 'faq', label: '포트폴리오' }
// ];

// 메인 텍스트 모핑 애니메이션용 메시지 (데스크탑과 동일)
const morphingMessages = [
  "버즈비 애드 전문가들과 함께",
  "성공적인 온라인 광고를",
  "데이터 기반의 마케팅 전략을", 
  "차별화된 부동산 광고를"
];

export default function MobileHeroSection() {
  // Note: Navigation state variables available for future implementation
  // const [activeSection, setActiveSection] = useState('hero');
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  // const dropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // 텍스트 모핑 애니메이션 (데스크탑과 동일)
  useEffect(() => {
    // 사용자가 애니메이션을 선호하지 않는 경우 텍스트 변경 비활성화
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % morphingMessages.length);
      }, 4000); // 4초마다 변경

      return () => clearInterval(interval);
    }
  }, []);

  // Note: Navigation click handlers available for future implementation
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       // setIsDropdownOpen(false);
  //     }
  //     if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
  //       setIsHamburgerMenuOpen(false);
  //     }
  //   };
  //
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  // Note: Scroll spy functionality available for future implementation
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = ['hero', 'stats', 'progress', 'carousel', 'cards', 'faq'];
  //     const currentPosition = window.scrollY + 100;
  //
  //     for (let i = sections.length - 1; i >= 0; i--) {
  //       const section = document.getElementById(sections[i]);
  //       if (section && section.offsetTop <= currentPosition) {
  //         setActiveSection(sections[i]);
  //         break;
  //       }
  //     }
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // Note: Smooth scroll function available for future navigation implementation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Note: Menu state setters available for future implementation
    // setIsMobileMenuOpen(false);
    // setIsDropdownOpen(false);
    // setIsHamburgerMenuOpen(false);
  };

  // 메인페이지로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Note: Menu state setter available for future implementation
    // setIsMobileMenuOpen(false);
    // setIsDropdownOpen(false);
    setIsHamburgerMenuOpen(false);
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url("/images/hero/main_bg_1 1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      // SEO 및 접근성 개선
      role="banner"
      aria-label="히어로 섹션 - 온라인 광고 서비스 소개"
    >
      {/* 모바일 네비게이션 바 */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12 sm:h-16">
            {/* 좌측 로고 */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="h-8 w-24 sm:h-10 sm:w-32 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url("/images/hero/logo 1.png")',
                }}
              />
            </motion.div>

            {/* 우측 햄버거 메뉴 버튼 */}
            <div className="relative" ref={hamburgerRef}>
              <motion.button
                onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="메뉴 열기"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>

              {/* 햄버거 메뉴 드롭다운 */}
              <AnimatePresence>
                {isHamburgerMenuOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-2">
                      {navigationItems.map((item) => (
                        <motion.button
                          key={item.id}
                          onClick={() => {
                            scrollToSection(item.id);
                            setIsHamburgerMenuOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors figma-button"
                          whileHover={{ x: 4 }}
                        >
                          {item.label}
                        </motion.button>
                      ))}
                      
                      {/* 구분선 */}
                      <div className="border-t border-gray-200 my-2" />
                      
                      {/* 포트폴리오 메뉴 */}
                      <motion.button
                        onClick={() => {
                          scrollToSection('carousel');
                          setIsHamburgerMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors figma-button"
                        whileHover={{ x: 4 }}
                      >
                        포트폴리오
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 - 모바일 최적화 */}
      <div className="relative z-20 w-full h-screen flex flex-col items-center justify-center px-4">
        {/* 수직선 - 모바일 최적화 */}
        <motion.div
          className="absolute bg-white w-px"
          style={{
            height: '60px',
            top: '15%'
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5,
            ease: "easeOut"
          }}
        />

        {/* 온라인 광고 텍스트 - 모바일 최적화 */}
        <motion.div
          className="text-white text-center mb-6"
          style={{
            fontFamily: 'Pretendard',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 'clamp(20px, 4vw, 28px)',
            lineHeight: '1.2',
            color: '#FFFFFF',
            marginTop: '80px'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.2,
            ease: "easeOut"
          }}
        >
          온라인 광고
        </motion.div>

        {/* 메인 텍스트 - 모바일 최적화 */}
        <motion.div
          className="text-white text-center px-4 mb-12"
          style={{
            fontFamily: 'Pretendard',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 'clamp(24px, 6vw, 36px)',
            lineHeight: '1.3',
            color: '#FFFFFF',
            maxWidth: '100%'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1.5,
            ease: "easeOut"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut"
              }}
              aria-live="polite"
              aria-label={`${morphingMessages[currentMessageIndex]} 해보세요`}
            >
              {morphingMessages[currentMessageIndex]} 해보세요
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA 버튼 - 모바일 최적화 */}
        <motion.button
          className="bg-white text-black font-medium flex items-center justify-center gap-3 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer px-8 py-4 rounded-full"
          style={{
            minWidth: '160px',
            height: '48px',
            marginBottom: '70px'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 2,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const contactSection = document.getElementById('faq');
            if (contactSection) {
              contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}
          aria-label="문의하기 - FAQ 섹션으로 이동"
        >
          문의하기
          <motion.svg
            className="w-4 h-4 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: 3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </motion.button>
      </div>

    </section>
  );
}