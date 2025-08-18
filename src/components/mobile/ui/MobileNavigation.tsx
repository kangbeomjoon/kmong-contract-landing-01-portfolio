'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
              className="h-8 w-24 bg-contain bg-center bg-no-repeat cursor-pointer"
              style={{
                backgroundImage: 'url("/images/hero/logo 1.png")',
              }}
              onClick={() => scrollToSection('hero')}
            />
          </div>
          
          {/* Hamburger Menu Button with Dropdown */}
          <div className="relative" ref={menuRef}>
            <motion.button
              onClick={toggleMenu}
              className="w-[50px] h-[33px] flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="메뉴 열기"
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/images/hero/icon_1.png" 
                alt="메뉴 아이콘" 
                className="w-[50px] h-[33px]"
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
                    <motion.button
                      onClick={() => scrollToSection('stats')}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      섹션1
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection('progress')}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      섹션2
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection('carousel')}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      섹션3
                    </motion.button>
                    <motion.button
                      onClick={() => scrollToSection('cards')}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      섹션4
                    </motion.button>
                    
                    {/* 구분선 */}
                    <div className="border-t border-gray-200 my-2" />
                    
                    <motion.button
                      onClick={() => scrollToSection('faq')}
                      className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition-colors"
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