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

export default function ProgressSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="progress" ref={ref} className="py-20 relative bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* 좌측 텍스트 및 메뉴 */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="figma-subtitle mb-8">HOW TO</div>
              <h2 className="figma-heading-lg leading-tight mb-12">
                부동산 종합광고 대행<br />
                어떻게 시작하면 되나요?
              </h2>
            </motion.div>

            {/* 탭 메뉴 */}
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`block w-full text-left transition-all duration-300 ${
                    activeStep === index 
                      ? 'border-b-2 border-[var(--color-brand-accent)] pb-2' 
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                  onClick={() => setActiveStep(index)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`figma-heading-sm ${
                    activeStep === index 
                      ? 'text-[var(--color-brand-accent)]' 
                      : 'text-[var(--color-text-muted)]'
                  }`}>
                    {step.title}
                  </div>
                  {activeStep === index && (
                    <div className="w-16 h-1 bg-[var(--color-brand-accent)] mt-2 rounded" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 우측 이미지 및 콘텐츠 */}
          <div className="relative">
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-black/10 to-black/80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                backgroundImage: 'url("http://localhost:3845/assets/cf1153605fe5ccdea0462492abbee14dee6187c7.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
              
              {/* 재생 버튼 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 bg-center bg-cover bg-no-repeat cursor-pointer"
                  style={{
                    backgroundImage: 'url("http://localhost:3845/assets/90ee5763b70ad7eff6e0ec58bb36d2f14910706c.svg")'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>
              
              {/* 하단 텍스트 */}
              <div className="absolute bottom-8 left-8 right-8">
                <motion.h3
                  key={activeStep}
                  className="text-white text-2xl font-bold leading-tight mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {progressSteps[activeStep].description}
                </motion.h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}