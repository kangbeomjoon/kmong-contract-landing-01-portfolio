'use client';

import { motion, useMotionValue, PanInfo } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const successStories = [
  {
    id: 1,
    thumbnail: "/images/mobile/carousel/success-story-1@2x.png",
    brand: "패션 브랜드 A",
    title: "유튜브 쇼핑으로 매출 300% 증가",
    description: "전통적인 온라인 쇼핑몰에서 유튜브 쇼핑으로 전환하여 월 매출 300% 증가를 달성했습니다.",
    result: "월매출 300% ↑",
    category: "패션"
  },
  {
    id: 2,
    thumbnail: "/images/mobile/carousel/success-story-2@2x.png",
    brand: "뷰티 브랜드 B",
    title: "라이브 쇼핑으로 신규 고객 5,000명 확보",
    description: "유튜브 라이브 쇼핑을 통해 3개월 만에 신규 고객 5,000명을 확보했습니다.",
    result: "신규고객 5,000명",
    category: "뷰티"
  },
  {
    id: 3,
    thumbnail: "/images/mobile/carousel/success-story-3@2x.png",
    brand: "홈리빙 브랜드 C",
    title: "쇼츠 광고로 브랜드 인지도 대폭 상승",
    description: "유튜브 쇼츠를 활용한 바이럴 마케팅으로 브랜드 인지도를 크게 향상시켰습니다.",
    result: "조회수 100만+",
    category: "홈리빙"
  },
  {
    id: 4,
    thumbnail: "/images/mobile/carousel/success-story-4@2x.png",
    brand: "식품 브랜드 D",
    title: "크리에이터 협업으로 매출 급상승",
    description: "인기 푸드 크리에이터와의 협업으로 단기간 내 매출이 급상승했습니다.",
    result: "매출 250% ↑",
    category: "식품"
  },
  {
    id: 5,
    thumbnail: "/images/mobile/carousel/success-story-5@2x.png",
    brand: "전자제품 브랜드 E",
    title: "제품 리뷰 콘텐츠로 신뢰도 향상",
    description: "전문적인 제품 리뷰 콘텐츠를 통해 고객 신뢰도와 구매 전환율을 높였습니다.",
    result: "전환율 180% ↑",
    category: "전자제품"
  },
  {
    id: 6,
    thumbnail: "/images/mobile/carousel/success-story-6@2x.png",
    brand: "스포츠 브랜드 F",
    title: "피트니스 콘텐츠로 젊은 고객층 확보",
    description: "운동 관련 콘텐츠와 제품 소개를 통해 2030 고객층을 성공적으로 확보했습니다.",
    result: "2030 고객 70% ↑",
    category: "스포츠"
  }
];

export default function MobileCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const cardWidth = 280; // 모바일 카드 너비
  const cardGap = 16; // 카드 간격
  const totalWidth = cardWidth + cardGap;

  // 자동 재생 기능
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % successStories.length);
    }, 4000); // 4초마다 자동 전환

    return () => clearInterval(interval);
  }, [isAutoPlay, isDragging]);

  // 드래그 핸들러
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = 50; // 드래그 임계값
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > 0 || velocity > 0) {
        // 오른쪽으로 드래그 (이전 카드)
        setCurrentIndex((prev) => prev === 0 ? successStories.length - 1 : prev - 1);
      } else {
        // 왼쪽으로 드래그 (다음 카드)
        setCurrentIndex((prev) => (prev + 1) % successStories.length);
      }
    }
    
    // 드래그 후 자동재생 재개
    setTimeout(() => setIsAutoPlay(true), 3000);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setIsAutoPlay(false);
  }, []);

  // 도트 클릭 핸들러
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  return (
    <section 
      id="mobile-carousel"
      className="py-16 bg-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* 섹션 제목 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white leading-tight mb-4">
            바즈비의 성공스토리를<br />
            소개합니다
          </h2>
          <p className="text-gray-300 text-sm">
            실제 고객사의 성공 사례를 확인해보세요
          </p>
        </motion.div>

        {/* 캐러셀 컨테이너 */}
        <div className="relative">
          <div className="overflow-hidden mx-4">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              animate={{
                x: -currentIndex * totalWidth
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              style={{ x }}
            >
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  className="flex-shrink-0 mr-4"
                  style={{ width: cardWidth }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                    {/* 썸네일 이미지 */}
                    <div className="relative h-40 overflow-hidden">
                      <div
                        className="w-full h-full bg-gray-700 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                        style={{
                          backgroundImage: `url(${story.thumbnail})`
                        }}
                      />
                      {/* 카테고리 배지 */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {story.category}
                        </span>
                      </div>
                      {/* 성과 배지 */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {story.result}
                        </span>
                      </div>
                    </div>

                    {/* 카드 내용 */}
                    <div className="p-5">
                      <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                        {story.brand}
                      </h3>
                      <h4 className="text-gray-300 font-semibold text-base mb-3 leading-tight">
                        {story.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                        {story.description}
                      </p>

                      {/* 자세히 보기 버튼 */}
                      <motion.button
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        자세히 보기
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 도트 인디케이터 */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          {successStories.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-red-500 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* 자동재생 컨트롤 */}
        <div className="flex justify-center mt-6">
          <motion.button
            className={`flex items-center space-x-2 text-sm px-4 py-2 rounded-full border transition-colors ${
              isAutoPlay 
                ? 'border-red-500 text-red-500' 
                : 'border-gray-500 text-gray-400'
            }`}
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-2 h-2 rounded-full ${
              isAutoPlay ? 'bg-red-500' : 'bg-gray-500'
            }`} />
            <span>{isAutoPlay ? '자동재생 중' : '자동재생 정지'}</span>
          </motion.button>
        </div>

        {/* 스와이프 힌트 (처음 방문시에만 표시) */}
        <motion.div
          className="text-center mt-6 text-gray-500 text-xs"
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          ← 좌우로 스와이프하여 다른 성공사례를 확인하세요 →
        </motion.div>
      </div>
    </section>
  );
}