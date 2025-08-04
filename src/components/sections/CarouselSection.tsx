'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselData = [
  {
    id: 1,
    title: "유튜브 채널 'VETIVER' | VVR",
    description: "온라인 스토어 상품이 유튜브 영상, 라이브, 숏츠, 스토어 탭에도 노출되어서 마케팅 비용을 줄일 수 있었어요!",
    image: "/api/placeholder/600/400",
    brand: "VETIVER",
    stats: "+500% 매출 증가"
  },
  {
    id: 2,
    title: "패션 브랜드 성공사례",
    description: "유튜브 쇼핑과 연동하여 브랜드 인지도와 매출이 동시에 증가했습니다.",
    image: "/api/placeholder/600/400",
    brand: "SPAO",
    stats: "+300% 매출 증가"
  },
  {
    id: 3,
    title: "뷰티 크리에이터 협업",
    description: "라이브 커머스를 통한 실시간 상품 소개로 구독자와 매출이 크게 늘었습니다.",
    image: "/api/placeholder/600/400",
    brand: "예주가TV3iPD",
    stats: "+400% 구독자 증가"
  }
];

const brandLogos = [
  { name: "예주가TV3iPD", logo: "/api/placeholder/120/60" },
  { name: "SPAO", logo: "/api/placeholder/120/60" },
  { name: "영자씨의 부업", logo: "/api/placeholder/120/60" },
  { name: "에이저니즈", logo: "/api/placeholder/120/60" },
  { name: "VETIVER", logo: "/api/placeholder/120/60" },
  { name: "NICKYLAB지", logo: "/api/placeholder/120/60" },
  { name: "신사용", logo: "/api/placeholder/120/60" },
  { name: "골리앤제프", logo: "/api/placeholder/120/60" }
];

export default function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 브랜드 로고 무한 스크롤을 위해 아이템을 두 번 복제
  const duplicatedLogos = [...brandLogos, ...brandLogos];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  // 자동 슬라이드 효과
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* 메인 슬라이드 섹션 */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div className="flex h-full">
                {/* 좌측 텍스트 영역 */}
                <div className="w-1/2 p-12 flex flex-col justify-center">
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {carouselData[currentSlide].title}
                  </motion.h2>
                  
                  <motion.p
                    className="text-xl text-gray-300 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {carouselData[currentSlide].description}
                  </motion.p>

                  <motion.div
                    className="inline-flex items-center space-x-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                      {carouselData[currentSlide].stats}
                    </span>
                    <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                      자세히 보기
                    </button>
                  </motion.div>
                </div>

                {/* 우측 이미지 영역 */}
                <div className="w-1/2 relative">
                  <motion.div
                    className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-8 bg-white rounded-xl shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="p-6 text-black">
                      <div className="text-sm text-gray-500 mb-2">Success Story</div>
                      <div className="text-lg font-bold text-gray-900">{carouselData[currentSlide].brand}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 화살표 네비게이션 */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 슬라이드 인디케이터 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 브랜드 로고 무한 스크롤 */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-8 items-center"
            animate={{
              x: isPaused ? 0 : -960,
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedLogos.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-sm font-medium text-gray-300">{brand.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}