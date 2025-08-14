'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileNavigation } from '../ui/MobileNavigation'

// 메인 텍스트 모핑 애니메이션용 메시지
const morphingMessages = [
  "성공적인 온라인 광고를\n해보세요",
  "버즈비 애드 전문가들과 함께\n해보세요", 
  "차별화된 부동산 광고를\n해보세요"
];

export function MobileHeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 텍스트 모핑 애니메이션
  useEffect(() => {
    if (!mounted) return

    // 사용자가 애니메이션을 선호하지 않는 경우 텍스트 변경 비활성화
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % morphingMessages.length)
      }, 4000) // 4초마다 변경

      return () => clearInterval(interval)
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url("/images/hero/main_bg_1 1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 pt-20 pb-12">
        <div className="max-w-sm mx-auto text-center">

          {/* 상단 구분선 */}
          <div className="mb-8 flex justify-center">
            <div className="w-px h-28 bg-white"></div>
          </div>

          {/* 메인 타이틀 */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                온라인 광고
              </h2>
              {/* 애니메이션 텍스트 */}
              <div className="h-32 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessageIndex}
                    className="text-3xl font-bold text-white leading-tight text-center whitespace-pre-line"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    {morphingMessages[currentMessageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="mb-16 flex justify-center">
            <button className="bg-white text-black font-medium py-4 px-12 rounded-full transition-all duration-300 hover:bg-gray-100 hover:shadow-lg inline-flex items-center gap-3">
              문의하기
              <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}