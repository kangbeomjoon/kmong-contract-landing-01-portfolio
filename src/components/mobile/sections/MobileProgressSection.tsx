'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const progressSteps = [
  {
    id: 1,
    title: '사전준비 영상',
    description: '부동산 종합광고\n버즈비로 시작하세요',
    active: true
  },
  {
    id: 2,
    title: '광고 효율 테스트',
    description: '최적화된 광고 전략으로\n효과를 극대화합니다',
    active: false
  },
  {
    id: 3,
    title: '광고 집행 및 실시간 알림',
    description: '실시간 모니터링과\n즉각적인 대응 서비스',
    active: false
  }
];

export default function MobileProgressSection() {
  const { ref, inView } = useInView({
    threshold: 0.2, // Android에서 더 낮은 임계값
    triggerOnce: false,
    rootMargin: '-5% 0px -5% 0px', // Android 최적화
    delay: 50 // Android 렌더링 지연 고려
  });

  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="progress" ref={ref} className="py-20 relative bg-black gpu-accelerated smooth-scroll">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          {/* 헤더 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: -30 }} // Android에서 더 부드러운 시작
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, // Android에서 더 빠른 애니메이션
              type: 'tween',
              ease: 'easeOut'
            }}
            className="text-center mb-12 gpu-accelerated"
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <div className="figma-subtitle mb-8">HOW TO</div>
            <h2 className="figma-heading-lg leading-tight">
              부동산 종합광고 대행<br />
              어떻게 시작하면 되나요?
            </h2>
          </motion.div>

          {/* 탭 메뉴 - 가로 배치 */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {progressSteps.map((step, index) => (
              <motion.button
                key={step.id}
                className={`flex-1 min-w-0 text-center transition-all duration-300 px-2 py-3 touch-optimized gpu-accelerated ${
                  activeStep === index 
                    ? 'border-b-2 border-[var(--color-brand-accent)] pb-2' 
                    : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, y: -15 }} // Android에서 더 부드러운 시작
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, // Android에서 더 빠른 애니메이션
                  delay: index * 0.08, // 더 짧은 딜레이
                  type: 'tween',
                  ease: 'easeOut'
                }}
                style={{ 
                  minHeight: '44px', // Android 터치 타겟 최소 크기
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className={`figma-heading-sm text-xs sm:text-sm ${
                  activeStep === index 
                    ? 'text-[var(--color-brand-accent)]' 
                    : 'text-[var(--color-text-muted)]'
                }`}>
                  {step.title}
                </div>
              </motion.button>
            ))}
          </div>

          {/* 이미지 및 콘텐츠 */}
          <div className="relative">
            <motion.div
              className="relative h-80 rounded-2xl overflow-hidden gpu-accelerated"
              initial={{ opacity: 0, scale: 0.95 }} // Android에서 더 부드러운 스케일
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, // Android에서 더 빠른 애니메이션
                delay: 0.3, // 더 짧은 딜레이
                type: 'tween',
                ease: 'easeOut'
              }}
              style={{
                backgroundImage: 'url("/images/cards/img_con.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
              
              {/* 전체 클릭 버튼 */}
              <motion.div
                className="absolute inset-0 cursor-pointer touch-optimized gpu-accelerated"
                style={{
                  backgroundImage: 'url("/images/progress/list.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
                whileHover={{ scale: 1.02 }} // Android에서 더 부드러운 호버
                whileTap={{ scale: 0.98 }} // Android에서 더 부드러운 탭
                transition={{ 
                  type: 'tween',
                  duration: 0.15 // Android에서 더 빠른 반응
                }}
              />
              
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}