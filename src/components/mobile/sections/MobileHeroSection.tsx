'use client'

import { useEffect, useState } from 'react'
import { MobileNavigation } from '../ui/MobileNavigation'
import { Play, ArrowRight } from 'lucide-react'

export function MobileHeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Text morphing messages
  const heroMessages = [
    "바즈비 에이전트가\n쉽고 빠르게 해결해요",
    "스마트한 AI로\n비즈니스를 성장시켜요",
    "24시간 언제든\n고객 응대가 가능해요",
    "맞춤형 솔루션으로\n효율성을 높여요"
  ]

  // Text morphing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % heroMessages.length)
        setIsVisible(true)
      }, 300)
    }, 3500)

    return () => clearInterval(interval)
  }, [heroMessages.length])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 overflow-hidden">
      {/* Mobile Navigation */}
      <MobileNavigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Background Pattern */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-l from-red-100 to-transparent rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-32 left-0 w-48 h-48 bg-gradient-to-r from-blue-100 to-transparent rounded-full opacity-30 blur-2xl" />
        
        {/* Decorative Dots */}
        <div className="absolute top-32 left-8 w-2 h-2 bg-red-300 rounded-full opacity-60" />
        <div className="absolute top-40 left-16 w-1 h-1 bg-blue-400 rounded-full opacity-50" />
        <div className="absolute bottom-48 right-12 w-3 h-3 bg-red-200 rounded-full opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative pt-20 px-4 pb-8">
        <div className="max-w-sm mx-auto">
          {/* Hero Text with Morphing Animation */}
          <div className="text-center mb-12 mt-16">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-6">
              <span 
                className={`block transition-opacity duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {heroMessages[currentTextIndex].split('\n').map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              AI 기반 고객 상담 솔루션으로
              <br />
              더 스마트한 비즈니스를 경험하세요
            </p>
          </div>

          {/* Hero Illustration */}
          <div className="relative mb-12">
            <div className="relative mx-auto w-80 h-64 bg-gradient-to-br from-blue-100 to-red-50 rounded-2xl overflow-hidden shadow-xl">
              {/* Placeholder for Hero Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-12 h-12 text-white ml-1" fill="currentColor" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center">
                <span className="text-sm">💬</span>
              </div>
              <div className="absolute top-6 right-6 w-6 h-6 bg-red-500 rounded-full shadow-md"></div>
              <div className="absolute bottom-8 left-6 w-10 h-6 bg-blue-500 rounded-full shadow-md"></div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            {/* Primary CTA */}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
              <span className="text-lg">무료 체험 시작하기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Secondary CTA */}
            <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3">
              <Play className="w-5 h-5" />
              <span className="text-lg">데모 영상 보기</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-4">
              이미 <span className="font-semibold text-red-600">1,000+</span> 기업이 선택했습니다
            </p>
            
            {/* Company Logos Placeholder */}
            <div className="flex justify-center items-center space-x-6 opacity-60">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <span className="text-xs font-medium">더 알아보기</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}