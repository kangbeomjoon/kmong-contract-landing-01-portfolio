'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const messages = [
  "버즈비 애드 전문가들과 함께 해보세요",
  "부동산 종합광고 대행 1위 기업", 
  "온라인 광고의 새로운 시작",
  "효과적인 광고 솔루션을 만나보세요"
];

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

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
        backgroundImage: 'url("http://localhost:3845/assets/cee35f5c45c570984cc0b1bacbd40bca3a683c9d.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 새로운 네비게이션 바 - 배경에 자연스럽게 녹아들게 */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-4">
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
                  backgroundImage: 'url("http://localhost:3845/assets/e165a1c2d8980fa0000db1c35be2faec39a06f94.png")'
                }}
              />
            </motion.div>

            {/* 중앙 메뉴 (데스크톱 전용) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`figma-button text-white transition-colors duration-200 hover:text-white/80 ${
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
                  className="figma-button text-white transition-colors duration-200 hover:text-white/80 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  포트폴리오
                  <svg 
                    className="w-4 h-4 transition-transform duration-200"
                    style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
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
                        className={`block w-full text-left px-4 py-2 text-gray-800 font-medium transition-colors duration-200 hover:bg-gray-100 ${
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

            {/* 우측 메뉴 버튼 (데스크톱 전용) */}
            <div className="hidden lg:block">
              <div
                className="h-6 w-6 bg-center bg-cover bg-no-repeat cursor-pointer"
                style={{
                  backgroundImage: 'url("http://localhost:3845/assets/b1f03d20d6e148bb9f4b91a7ca980f0e506a9e02.svg")'
                }}
              />
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

      {/* 메인 콘텐츠 영역 */}
      <div className="text-center px-4 relative z-10 mt-16 max-w-4xl mx-auto">
        {/* 수직선 */}
        <motion.div 
          className="w-px h-28 bg-white mx-auto mb-8"
          initial={{ height: 0 }}
          animate={{ height: 112 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* 서브타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="figma-subtitle mb-8"
        >
          온라인 광고
        </motion.div>
        
        {/* 메인 텍스트 */}
        <motion.h1
          key={currentIndex}
          className="figma-heading-xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {messages[currentIndex]}
        </motion.h1>
        
        {/* CTA 버튼 */}
        <motion.button
          className="bg-white text-black px-12 py-4 rounded-full figma-button hover:bg-white/90 transition-colors duration-200 inline-flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          문의하기
          {/* 화살표 아이콘 */}
          <div className="flex items-center">
            <div className="w-3 h-0.5 bg-black rounded-full" />
            <div className="w-0.5 h-3 bg-black rounded-full ml-2 transform rotate-45 origin-bottom" />
            <div className="w-0.5 h-3 bg-black rounded-full ml-1 transform -rotate-45 origin-top" />
          </div>
        </motion.button>
      </div>
    </section>
  );
}