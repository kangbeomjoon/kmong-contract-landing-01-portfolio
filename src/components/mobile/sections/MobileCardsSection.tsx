'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useImageSwiper, SwiperImage } from '@/hooks';

// 모바일용 스와이퍼 이미지 데이터
const swiperImages: SwiperImage[] = [
  {
    id: '1',
    src: '/images/cards/img_con.png',
    alt: '버즈비 전용 스토어 메인 화면',
    title: '버즈비 관리에\n최적화된 전용 스토어',
    description: '상품 등록부터 결제, 고객관리, 마케팅,애널리스트까지 모든 것을 한곳에서 처리하세요.'
  },
  {
    id: '2', 
    src: '/images/cards/con_5.png',
    alt: '버즈비 관리 대시보드',
    title: '통합 관리\n대시보드',
    description: '모든 데이터를 한눈에 확인하고\n효율적으로 관리할 수 있습니다.'
  },
  {
    id: '3',
    src: '/images/cards/Mask group.png', 
    alt: '버즈비 애드 전문가 상담',
    title: '전문가와 함께하는\n성공적인 광고',
    description: '버즈비 애드 전문가들의 노하우로\n더 나은 결과를 만들어보세요.'
  }
];

const futureFeatures = [
  {
    id: '01',
    title: '버즈비 관리에\n최적화된 전용 스토어',
    description: '상품 등록부터 결제, 고객관리, 마케팅,애널리스트까지 모든 것을 한곳에서 처리하세요.\n새롭게 통합된 전용 스토어로 더 편리하게 이용하고시간도 절약해 보세요.',
    image: '/images/cards/con_5.png'
  }
];

const ctaSection = {
  title: '티켓광고,\n버즈비와 함께라면 더 쉬워져요',
  subtitle: 'Future',
  description: '버즈비 애드 전문가들과 함께 해보세요.',
  buttonText: '바로가기',
  image: '/images/cards/con_5.png'
};

export default function MobileCardsSection() {
  const {
    currentIndex,
    isPlaying,
    goToSlide,
    goToPrevious,
    goToNext,
    pauseAutoPlay,
    resumeAutoPlay,
    dragHandlers
  } = useImageSwiper({
    images: swiperImages,
    autoPlayInterval: 4000,
    enableAutoPlay: true,
    loop: true
  });

  const currentImage = swiperImages[currentIndex];

  return (
    <>
      {/* Future Section (con_5) */}
      <section 
        id="cards"
        className="py-20 bg-[var(--color-bg-secondary)] gpu-accelerated smooth-scroll"
      >
        {/* 상단 제목 - 섹션 맨 위 */}
        <div className="text-center mb-20">
          <motion.div
            className="figma-subtitle mb-8 gpu-accelerated"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.5,
              type: 'tween',
              ease: 'easeOut'
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            Future
          </motion.div>
          <motion.h2
            className="figma-heading-lg leading-tight gpu-accelerated"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.6,
              delay: 0.15,
              type: 'tween',
              ease: 'easeOut'
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            버즈비는<br />
            어떻게 새로워졌을까?
          </motion.h2>
        </div>

        {/* 하단 컨텐츠 영역 */}
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            {/* 이미지 스와이퍼 */}
            <motion.div
              className="relative flex justify-center mb-8 gpu-accelerated"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6,
                delay: 0.3,
                type: 'tween',
                ease: 'easeOut'
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {/* 이미지 컨테이너 */}
              <div className="relative overflow-hidden rounded-3xl w-full max-w-[660px] h-[424px] sm:h-[300px] xs:h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.id}
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat gpu-accelerated"
                    style={{
                      backgroundImage: `url("${currentImage.src}")`,
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                      touchAction: 'pan-y'
                    }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5,
                      ease: 'easeInOut'
                    }}
                    {...dragHandlers}
                  />
                </AnimatePresence>

                {/* 네비게이션 버튼들 - 이미지 오버레이 */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-200 touch-optimized gpu-accelerated z-10"
                  style={{ 
                    willChange: 'transform, background-color',
                    backfaceVisibility: 'hidden',
                    minHeight: '44px',
                    minWidth: '44px'
                  }}
                  aria-label="이전 이미지"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-200 touch-optimized gpu-accelerated z-10"
                  style={{ 
                    willChange: 'transform, background-color',
                    backfaceVisibility: 'hidden',
                    minHeight: '44px',
                    minWidth: '44px'
                  }}
                  aria-label="다음 이미지"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

              </div>
            </motion.div>

            {/* 인디케이터 도트들 (모바일 중앙) */}
            <div className="flex justify-center gap-2 mb-8">
              {swiperImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-[15px] h-[15px] rounded-full transition-all duration-300 touch-optimized relative before:absolute before:inset-[-15px] before:content-[''] ${
                    index === currentIndex 
                      ? 'bg-[var(--color-brand-accent)] scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  style={{ 
                    willChange: 'transform, background-color',
                    backfaceVisibility: 'hidden'
                  }}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>

            {/* 텍스트 및 콘텐츠 */}
            <motion.div
              className="gpu-accelerated"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6,
                delay: 0.4,
                type: 'tween',
                ease: 'easeOut'
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <div className="mb-12">
                <div className="text-[var(--color-brand-accent)] figma-heading-sm mb-4 text-center">
                  {String(currentIndex + 1).padStart(2, '0')}
                </div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentImage.id}
                    className="figma-heading-md text-white mb-6 whitespace-pre-line text-center gpu-accelerated"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {currentImage.title}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentImage.id}
                    className="figma-body text-[var(--color-text-secondary)] whitespace-pre-line text-center gpu-accelerated"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    style={{
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {currentImage.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section (con_6) */}
      <section 
        className="py-20 bg-black gpu-accelerated smooth-scroll"
      >
        {/* 상단 제목 - 섹션 맨 위 가운데 */}
        <div className="text-center mb-20">
          <motion.div
            className="figma-subtitle mb-8 gpu-accelerated"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.5,
              type: 'tween',
              ease: 'easeOut'
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            Future
          </motion.div>
          <motion.h2
            className="figma-heading-lg text-center leading-tight mb-8 whitespace-pre-line gpu-accelerated"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.6,
              delay: 0.15,
              type: 'tween',
              ease: 'easeOut'
            }}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {ctaSection.title}
          </motion.h2>
        </div>

        {/* 하단 배경 이미지 컨테이너 - 모바일 최적화 */}
        <div className="container mx-auto px-4">
          <div className="w-full max-w-lg h-96 relative mx-auto">
            {/* 배경 이미지 */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: 'url("/images/cards/Mask group.png")'
              }}
            />
            {/* 선명한 오버레이 */}
            <div className="absolute inset-0 bg-black/40 rounded-lg" />
            
            {/* 배경 위 텍스트 컨텐츠 - 중앙 정렬 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.div
                className="figma-heading-sm text-white mb-4 gpu-accelerated"
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3,
                  type: 'tween',
                  ease: 'easeOut'
                }}
                style={{
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                운영대행
              </motion.div>
              
              <motion.h3
                className="figma-heading-md text-white mb-6 gpu-accelerated"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4,
                  type: 'tween',
                  ease: 'easeOut'
                }}
                style={{
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                온라인 광고는 처음이신가요?
              </motion.h3>
              
              <motion.p
                className="figma-body-lg text-white mb-8 whitespace-pre-line gpu-accelerated"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5,
                  type: 'tween',
                  ease: 'easeOut'
                }}
                style={{
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                {ctaSection.description}
              </motion.p>

              <motion.button
                className="bg-[var(--color-brand-accent)] text-black px-8 py-3 rounded-full figma-button hover:bg-[var(--color-brand-accent)]/90 transition-colors duration-200 inline-flex items-center gap-3 touch-optimized gpu-accelerated"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6,
                  type: 'tween',
                  ease: 'easeOut'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  minHeight: '44px',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden'
                }}
              >
                {ctaSection.buttonText}
                <img
                  src="/images/hero/icon_2.png"
                  alt="arrow"
                  className="w-3 h-3"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}