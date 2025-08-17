'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const stats = [
  { label: '진행 클라이언트 고객', value: '1000', suffix: ' +', description: '프로젝트 진행 고객 수' },
  { label: '분양현장', value: '500', suffix: ' +', description: '성공적인 분양 사례' },
  { label: '유의미 리드 고객', value: '90', suffix: ' %', description: '고품질 리드 비율' },
  { label: '평균 계약전환율', value: '15', suffix: ' %', description: '업계 최고 수준' },
  { label: '연간 광고 집행 예산', value: '20억', suffix: '', description: '광고 운영 규모' }
];

export default function MobileStatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2, // Android에서 더 낮은 임계값
    triggerOnce: true,
    rootMargin: '-5% 0px -5% 0px', // Android 최적화
    delay: 50 // Android 렌더링 지연 고려
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 통계 카드들의 parallax 효과 - Android 최적화 (더 부드러운 효과)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -75]);

  const parallaxYs = [y1, y2, y3, y4, y5];

  return (
    <section 
      id="stats"
      ref={containerRef} 
      className="py-20 relative gpu-accelerated smooth-scroll"
      style={{
        background: 'linear-gradient(to bottom, #000000 0%, #000000 85%, rgba(246,222,53,0.3) 100%)',
        minHeight: '140vh'
      }}
    >
      <div ref={ref} className="container mx-auto px-4 relative z-10">
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
            className="text-left mb-16 gpu-accelerated" 
            style={{
              paddingLeft: '30px',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <div className="figma-subtitle mb-8">ABOUT US</div>
            <h2 className="figma-heading-lg leading-tight">
              부동산 종합광고 대행<br />
              <span className="text-white">1위 기업 버즈비</span>
            </h2>
          </motion.div>

          {/* 통계 목록 */}
          <div className="space-y-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="py-8 border-b border-white/20 last:border-b-0 gpu-accelerated"
                initial={{ opacity: 0, y: 30 }} // Android에서 더 부드러운 시작
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, // Android에서 더 빠른 애니메이션
                  delay: index * 0.1, // 더 짧은 딜레이
                  ease: 'easeOut',
                  type: 'tween' // Android에서 더 부드러운 애니메이션
                }}
                style={{ 
                  y: parallaxYs[index],
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)'
                }}
              >
                <div className="text-left" style={{paddingLeft: '30px'}}>
                  <div className="figma-stats-number mb-4">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="figma-body-lg text-white mb-2">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}