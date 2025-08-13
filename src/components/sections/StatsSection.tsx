'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const stats = [
  { label: '월간 활성 사용자', value: '20억 명', icon: '👥' },
  { label: '일일 시청 시간', value: '10억 시간', icon: '⏰' },
  { label: '크리에이터 수', value: '200만 명', icon: '🎬' },
  { label: '서비스 국가', value: '100개국 이상', icon: '🌍' }
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

  const parallaxYs = [y1, y2, y3, y4];

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen py-20 relative"
      style={{
        backgroundImage: 'url("/images/stats/con_2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for content readability */}
      <div className="absolute inset-0 bg-white/60" />
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 고정 텍스트 (원래 크기로 복원) */}
          <div className="lg:sticky lg:top-1/2 lg:transform lg:-translate-y-1/2">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              전 세계에서 사용하는<br />
              <span className="text-red-500">압도적 1위 플랫폼</span><br />
              유튜브
            </motion.h2>
          </div>

          {/* 우측 통계 카드들 - parallax 효과 적용 */}
          <div className="space-y-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: 'easeOut'
                }}
                style={{ y: parallaxYs[index] }}
              >
                <div className="flex items-center space-x-6">
                  <div className="text-4xl">{stat.icon}</div>
                  <div>
                    <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-blue-600 leading-none">
                      {stat.value}
                    </div>
                    <div className="text-lg text-gray-600 font-medium mt-2">
                      {stat.label}
                    </div>
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