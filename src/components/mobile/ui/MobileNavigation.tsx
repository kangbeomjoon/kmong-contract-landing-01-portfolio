'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md ${className}`}>
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
          
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={toggleMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[calc(100vw-2rem)] bg-white shadow-xl transform transition-transform duration-300">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div 
                className="h-7 w-20 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("/images/hero/logo 1.png")',
                }}
              />
              <button
                onClick={toggleMenu}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="메뉴 닫기"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            {/* Menu Items */}
            <nav className="px-6 py-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => scrollToSection('stats')}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    통계
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('progress')}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    진행과정
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('carousel')}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    성공사례
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('cards')}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    카드 정보
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    문의하기
                  </button>
                </li>
              </ul>
              
              {/* CTA Button in Menu */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg">
                  바로 시작하기
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}