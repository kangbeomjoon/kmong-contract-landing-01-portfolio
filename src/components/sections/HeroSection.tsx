'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const messages = [
  "새로운 유튜브 쇼핑을 시작하세요",
  "전 세계 20억 사용자와 만나세요", 
  "간편한 스토어 구축부터",
  "매출 증대까지 한번에"
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
        backgroundImage: 'url("/images/hero/con_1.png")',
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
              <Image
                src="/images/hero/logo 1.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>

            {/* 중앙 메뉴 (데스크톱 전용) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-white font-medium transition-colors duration-200 hover:text-white/80 ${
                    activeSection === item.id ? 'text-white' : 'text-white/70'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* 우측 메뉴 버튼 (데스크톱 전용) */}
            <div className="hidden lg:block relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/hero/btn_menu.png"
                  alt="Menu Button"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
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

      {/* 오버레이 추가로 텍스트 가독성 향상 */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="text-center px-4 relative z-10 mt-16">
        <motion.h1
          key={currentIndex}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {messages[currentIndex]}
        </motion.h1>
      </div>
    </section>
  );
}