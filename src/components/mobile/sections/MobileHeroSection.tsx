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
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden gpu-accelerated smooth-scroll"
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
          <div style={{marginTop: '60px', marginBottom: '94px'}}>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-semibold text-white mb-6">
                온라인 광고
              </h2>
              {/* 애니메이션 텍스트 */}
              <div className="h-32 flex items-center justify-center" style={{marginTop: '30px'}}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessageIndex}
                    className="text-5xl font-bold text-white leading-tight text-center whitespace-pre-line gpu-accelerated"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5, // Android에서 더 빠른 애니메이션
                      ease: "easeInOut",
                      type: "tween" // Android에서 더 부드러운 애니메이션
                    }}
                    style={{
                      willChange: 'opacity, transform',
                      backfaceVisibility: 'hidden',
                      transform: 'translate3d(0, 0, 0)'
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
            <button className="bg-white text-black font-medium py-4 px-12 rounded-full transition-all duration-300 hover:bg-gray-100 hover:shadow-lg inline-flex items-center gap-3 touch-optimized gpu-accelerated"
              style={{ minHeight: '44px', minWidth: '44px' }} // Android 터치 타겟 최소 크기
            >
              문의하기
              <img
                src="/images/hero/icon_1.png"
                alt="arrow"
                className="w-4 h-4 transition-transform duration-300"
              />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}