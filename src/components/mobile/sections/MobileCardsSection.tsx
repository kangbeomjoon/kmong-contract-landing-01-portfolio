'use client';

import { motion } from 'framer-motion';


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
            initial={{ opacity: 0, y: -15 }} // Android에서 더 부드러운 시작
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.5, // Android에서 더 빠른 애니메이션
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
            initial={{ opacity: 0, y: 15 }} // Android에서 더 부드러운 시작
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.6, // Android에서 더 빠른 애니메이션
              delay: 0.15, // 더 짧은 딜레이
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
            {/* 이미지 */}
            <motion.div
              className="relative flex justify-center mb-12 gpu-accelerated"
              initial={{ opacity: 0, scale: 0.95 }} // Android에서 더 부드러운 스케일
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, // Android에서 더 빠른 애니메이션
                delay: 0.3, // 더 짧은 딜레이
                type: 'tween',
                ease: 'easeOut'
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <div
                className="bg-center bg-cover bg-no-repeat rounded-3xl w-full max-w-sm"
                style={{
                  height: '200px',
                  backgroundImage: 'url("/images/cards/img_con.png")'
                }}
              />
            </motion.div>

            {/* 텍스트 및 콘텐츠 */}
            <motion.div
              className="gpu-accelerated"
              initial={{ opacity: 0, y: 30 }} // Android에서 더 부드러운 시작
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6, // Android에서 더 빠른 애니메이션
                delay: 0.4, // 더 짧은 딜레이
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
                <div className="text-[var(--color-brand-accent)] figma-heading-sm mb-4 text-center">01</div>
                <h3 className="figma-heading-md text-white mb-6 whitespace-pre-line text-center">
                  {futureFeatures[0].title}
                </h3>
                <p className="figma-body text-[var(--color-text-secondary)] whitespace-pre-line text-center">
                  {futureFeatures[0].description}
                </p>
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