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

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 우측 카드들의 parallax 효과
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const parallaxYs = [y1, y2, y3, y4, y5];

  return (
    <section 
      id="stats"
      ref={containerRef} 
      className="py-20 relative"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 10%, rgba(123,111,27,0.05) 50%, rgba(246,222,53,0.3) 100%)',
        minHeight: '140vh'
      }}
    >
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* 좌측 고정 텍스트 */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              style={{ paddingLeft: '30px' }}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="figma-subtitle mb-8">ABOUT US</div>
              <h2 className="figma-heading-lg leading-tight">
                부동산 종합광고 대행<br />
                <span className="text-white">1위 기업 버즈비</span>
              </h2>
            </motion.div>
          </div>

          {/* 우측 통계 목록 - Figma 스타일 */}
          <div className="space-y-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="py-16 border-b border-white/20 last:border-b-0"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: 'easeOut'
                }}
                style={{ y: parallaxYs[index] }}
              >
                <div className="text-left">
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