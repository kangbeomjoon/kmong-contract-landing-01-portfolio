'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';


const navigationItems = [
  { id: 'stats', label: '섹션1' },
  { id: 'progress', label: '섹션2' },
  { id: 'carousel', label: '섹션3' },
  { id: 'cards', label: '섹션4' }
];

const dropdownItems = [
  { id: 'stats', label: '섹션1' },
  { id: 'progress', label: '섹션2' },
  { id: 'carousel', label: '섹션3' },
  { id: 'cards', label: '섹션4' },
  { id: 'faq', label: '포트폴리오' }
];

// 메인 텍스트 모핑 애니메이션용 메시지
const morphingMessages = [
  "버즈비 애드 전문가들과 함께",
  "성공적인 온라인 광고를",
  "데이터 기반의 마케팅 전략을", 
  "차별화된 부동산 광고를"
];

export default function HeroSection() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // 텍스트 모핑 애니메이션 (사용자가 애니메이션을 선호하지 않는 경우 처리)
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

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
        setIsHamburgerMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 스크롤 스파이 기능
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stats', 'progress', 'carousel', 'cards', 'faq'];
      const currentPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= currentPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스무스 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // 메인페이지로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
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
      {/* 새로운 네비게이션 바 - 배경에 자연스럽게 녹아들게 */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 pb-[68px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 좌측 로고 */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="h-12 w-40 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url("/images/hero/logo 1.png")',
                }}
              />
            </motion.div>

            {/* 중앙 메뉴 (데스크톱 전용) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`figma-button text-white transition-colors duration-200 hover:text-white/80 font-semibold text-lg ${
                    activeSection === item.id ? 'text-white' : 'text-white/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* 구분선 */}
              <div className="w-px h-4 bg-white/30" />
              
              {/* 포트폴리오 메뉴 (드롭다운) */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="figma-button text-white transition-colors duration-200 hover:text-white/80 flex items-center font-semibold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  포트폴리오
                  <Image 
                    src="/images/hero/icon_1.png" 
                    alt="포트폴리오 아이콘" 
                    width={8}
                    height={8}
                    className="w-2 h-2 ml-2.5 -translate-y-0.5"
                  />
                </motion.button>
                
                {/* 드롭다운 메뉴 */}
                <motion.div
                  className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg ${
                    isDropdownOpen ? 'block' : 'hidden'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: isDropdownOpen ? 1 : 0, 
                    y: isDropdownOpen ? 0 : -10 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="py-2">
                    {dropdownItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left px-4 py-2 text-gray-800 font-semibold text-lg transition-colors duration-200 hover:bg-gray-100 ${
                          activeSection === item.id ? 'bg-gray-100 text-blue-600' : ''
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 우측 햄버거 메뉴 버튼 */}
            <div className="relative" ref={hamburgerRef}>
              <motion.button
                onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src="/images/hero/btn_menu.png" 
                  alt="메뉴" 
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
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

            {/* 모바일 메뉴 버튼 */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2"
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>

          {/* 모바일 메뉴 */}
          <motion.div
            className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              y: isMobileMenuOpen ? 0 : -20 
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md rounded-b-lg">
              {dropdownItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-gray-800 font-medium rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                    activeSection === item.id ? 'bg-gray-100 text-blue-600' : ''
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 - 절대 위치 지정으로 변경 */}
      <div className="relative z-20 w-full h-screen">
        {/* 수직선 - Rectangle 5 */}
        <motion.div
          className="absolute w-px h-28 bg-white"
          style={{
            left: '50%',
            top: '280px',
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5,
            ease: "easeOut"
          }}
        />

        {/* 온라인 광고 텍스트 */}
        <motion.div
          className="absolute text-white text-center text-4xl font-semibold whitespace-nowrap"
          style={{
            left: '50%',
            top: '420px',
            transform: 'translateX(-50%)',
            fontFamily: 'Pretendard'
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

        {/* 메인 텍스트 - 버즈비 애드 전문가들과 함께 해보세요 */}
        <motion.div
          className="absolute text-white text-center max-w-4xl text-5xl lg:text-6xl font-bold leading-tight"
          style={{
            left: '50%',
            top: '490px',
            transform: 'translateX(-50%)',
            fontFamily: 'Pretendard'
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
              style={{ whiteSpace: 'nowrap' }}
            >
              {morphingMessages[currentMessageIndex]} 해보세요
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA 버튼 - Rectangle 9 */}
        <motion.button
          className="absolute bg-white text-black font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-full figma-button"
          style={{
            width: '200px',
            height: '56px',
            left: '50%',
            bottom: '70px',
            transform: 'translateX(-50%)',
            fontFamily: 'Pretendard, "Segoe UI", "Malgun Gothic", system-ui, sans-serif',
            lineHeight: '1.2'
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
          <Image
            src="/images/hero/icon_2.png"
            alt="화살표 아이콘"
            width={16}
            height={16}
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: 'translateX(0px)' }}
          />
        </motion.button>
      </div>

    </section>
  );
}