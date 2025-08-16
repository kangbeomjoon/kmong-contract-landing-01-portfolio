'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

const portfolioItems = [
  {
    id: 1,
    title: "부동산 광고",
    image: "/images/progress/img_1.png",
    category: "분양 마케팅"
  },
  {
    id: 2,
    title: "부동산 광고",
    image: "/images/progress/img_2.png",
    category: "매매 광고"
  },
  {
    id: 3,
    title: "부동산 광고",
    image: "/images/progress/img_1.png",
    category: "임대 광고"
  },
  {
    id: 4,
    title: "부동산 광고",
    image: "/images/progress/img_2.png",
    category: "상업 부동산"
  },
  {
    id: 5,
    title: "부동산 광고",
    image: "/images/progress/img_1.png",
    category: "주택 분양"
  },
  {
    id: 6,
    title: "부동산 광고",
    image: "/images/progress/img_2.png",
    category: "오피스텔"
  },
  {
    id: 7,
    title: "부동산 광고",
    image: "/images/progress/img_1.png",
    category: "분양 마케팅"
  },
  {
    id: 8,
    title: "부동산 광고",
    image: "/images/progress/img_2.png",
    category: "매매 광고"
  }
];

export default function MobileCarouselSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  const itemWidth = 280; // 모바일에서 카드 너비 (320 -> 280으로 조정)

  // 무한 스크롤을 위해 포트폴리오 배열을 3번 복제
  const duplicatedItems = [...portfolioItems, ...portfolioItems, ...portfolioItems];

  // 화살표 버튼 클릭 핸들러
  const handlePrevious = () => {
    setIsManualControl(true);
    setCurrentIndex((prev) => {
      // 2.5칸 왼쪽으로 "쭉" 이동
      const newIndex = prev - 2.5;
      // 첫 번째 세트로 가면 마지막 세트로 점프
      if (newIndex < 0) {
        return portfolioItems.length * 2 - 2.5;
      }
      return newIndex;
    });
    
    // 1.5초 후 자동 스크롤 재개
    setTimeout(() => {
      setIsManualControl(false);
    }, 1500);
  };

  const handleNext = () => {
    setIsManualControl(true);
    setCurrentIndex((prev) => {
      // 2.5칸 오른쪽으로 "쭉" 이동
      const newIndex = prev + 2.5;
      // 마지막 세트로 가면 첫 번째 세트로 점프
      if (newIndex >= portfolioItems.length * 2) {
        return portfolioItems.length + 2.5;
      }
      return newIndex;
    });
    
    // 1.5초 후 자동 스크롤 재개
    setTimeout(() => {
      setIsManualControl(false);
    }, 1500);
  };

  // Android 최적화된 애니메이션 함수
  const animate = useCallback((currentTime: number) => {
    if (!isManualControl && !isPaused) {
      // 60fps 타겟으로 16ms마다 업데이트
      if (currentTime - lastTimeRef.current >= 100) { // 100ms마다 위치 업데이트
        setCurrentIndex((prev) => {
          const newIndex = prev + 0.015; // Android에서 더 부드러운 이동
          if (newIndex >= portfolioItems.length * 2) {
            return portfolioItems.length;
          }
          return newIndex;
        });
        lastTimeRef.current = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [isManualControl, isPaused, portfolioItems.length]);

  // 자동 스크롤 효과 - requestAnimationFrame 사용
  useEffect(() => {
    if (!isManualControl && !isPaused) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isManualControl, isPaused, animate]);

  return (
    <section 
      id="carousel"
      className="py-20 relative overflow-hidden gpu-accelerated smooth-scroll"
      style={{
        backgroundImage: 'url("/images/carousel/con_4.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* 섹션 제목과 자세히 보기 버튼 */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="figma-subtitle mb-8">Portfolio</div>
            <h2 className="figma-heading-lg leading-tight mb-8">
              버즈비의 포트폴리오를<br />
              소개합니다
            </h2>
            
            {/* 자세히 보기 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="border border-white rounded-full px-8 py-3 figma-button text-white hover:bg-white/10 transition-colors inline-flex items-center gap-3">
                자세히 보기
                <img
                  src="/images/hero/icon_2.png"
                  alt="arrow"
                  className="w-4 h-4"
                />
              </button>
            </motion.div>
          </motion.div>

          {/* 네비게이션 버튼들 - 캐러셀 바로 위에 위치 */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button 
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors text-white text-lg font-bold touch-optimized gpu-accelerated"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              &lt;
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center hover:bg-[var(--color-brand-accent)]/80 transition-colors text-white text-lg font-bold touch-optimized gpu-accelerated"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              &gt;
            </button>
          </motion.div>
        </div>

        {/* 무한 스크롤 캐러셀 */}
        <div className="relative">
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-4 gpu-accelerated"
              animate={{
                x: -currentIndex * itemWidth,
              }}
              transition={{
                duration: isManualControl ? 0.6 : 0.1, // Android에서 더 빠른 전환
                ease: isManualControl ? "easeOut" : "linear",
                type: "tween" // Android에서 더 부드러운 애니메이션
              }}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {duplicatedItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-64 group cursor-pointer gpu-accelerated touch-optimized"
                  whileHover={{ y: -5 }}
                  transition={{ type: "tween", duration: 0.2 }}
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                    <div
                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${item.image})`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <h3 className="figma-button text-white mb-1 text-sm">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}