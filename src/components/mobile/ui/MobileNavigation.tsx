'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Fixed Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 ${className}`}>
        <div className="flex items-center justify-between px-4 py-3 h-16">
          {/* Left spacer for centering */}
          <div className="w-11" />
          
          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/mobile/hero/buzzbee-logo.svg"
              alt="버즈비 로고"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </div>
          
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[calc(100vw-2rem)] bg-white shadow-xl transform transition-transform duration-300">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <Image
                src="/images/mobile/hero/buzzbee-logo.svg"
                alt="버즈비 로고"
                width={100}
                height={28}
                className="h-7 w-auto"
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
                  <a 
                    href="#features"
                    className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    주요 기능
                  </a>
                </li>
                <li>
                  <a 
                    href="#benefits"
                    className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    장점
                  </a>
                </li>
                <li>
                  <a 
                    href="#success-stories"
                    className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    성공사례
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    문의하기
                  </a>
                </li>
              </ul>
              
              {/* CTA Button in Menu */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg">
                  무료 체험 시작하기
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}