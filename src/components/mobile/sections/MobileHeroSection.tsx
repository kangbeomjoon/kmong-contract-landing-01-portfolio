'use client'

import { useEffect, useState } from 'react'
import { MobileNavigation } from '../ui/MobileNavigation'

export function MobileHeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white leading-tight">
                  성공적인 온라인 광고를<br />해보세요
                </p>
                <p className="text-3xl font-bold text-white leading-tight">
                  버즈비 애드 전문가들과 함께<br />해보세요
                </p>
                <p className="text-3xl font-bold text-white leading-tight">
                  차별화된 부동산 광고를<br />해보세요
                </p>
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