'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// 데스크톱과 동일한 navigationItems 사용
const navigationItems = [
  { id: 'stats', label: '섹션1' },
  { id: 'progress', label: '섹션2' },
  { id: 'carousel', label: '섹션3' },
  { id: 'cards', label: '섹션4' }
]

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Fixed Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="flex items-center justify-between px-4 py-3 h-16">
          {/* 카페24 로고 */}
          <div className="flex items-center">
            <div 
              className="h-[51px] w-[165px] bg-contain bg-center bg-no-repeat cursor-pointer"
              style={{
                backgroundImage: 'url("/images/hero/logo 1.png")',
              }}
              onClick={() => scrollToSection('hero')}
            />
          </div>
          
          {/* Hamburger Menu Button with Dropdown */}
          <div className="relative" ref={menuRef}>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="메뉴 열기"
              aria-expanded={isMenuOpen}
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

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
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
                          setIsMenuOpen(false);
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
                        setIsMenuOpen(false);
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
      </nav>
    </>
  )
}