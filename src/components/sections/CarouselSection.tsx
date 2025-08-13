'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const portfolioItems = [
  {
    id: 1,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/22995cd5b64305a7d5c32b2e2b16f9386eb4655d.png",
    category: "분양 마케팅"
  },
  {
    id: 2,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/e0a6f266159c345a5840f74943993d10057e4498.png",
    category: "매매 광고"
  },
  {
    id: 3,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/22995cd5b64305a7d5c32b2e2b16f9386eb4655d.png",
    category: "임대 광고"
  },
  {
    id: 4,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/e0a6f266159c345a5840f74943993d10057e4498.png",
    category: "상업 부동산"
  },
  {
    id: 5,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/22995cd5b64305a7d5c32b2e2b16f9386eb4655d.png",
    category: "주택 분양"
  },
  {
    id: 6,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/e0a6f266159c345a5840f74943993d10057e4498.png",
    category: "오피스텔"
  },
  {
    id: 7,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/22995cd5b64305a7d5c32b2e2b16f9386eb4655d.png",
    category: "분양 마케팅"
  },
  {
    id: 8,
    title: "부동산 광고",
    image: "http://localhost:3845/assets/e0a6f266159c345a5840f74943993d10057e4498.png",
    category: "매매 광고"
  }
];

export default function CarouselSection() {
  const [isPaused, setIsPaused] = useState(false);

  // 무한 스크롤을 위해 포트폴리오 배열을 3번 복제
  const duplicatedItems = [...portfolioItems, ...portfolioItems, ...portfolioItems];

  return (
    <section 
      id="carousel"
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: 'url("http://localhost:3845/assets/e8e56a06e856ebc7bed1992bc75be53f64db75e0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 섹션 제목 */}
        <div className="flex justify-between items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="figma-subtitle mb-8">Portfolio</div>
            <h2 className="figma-heading-lg leading-tight">
              버즈비의 포트폴리오를<br />
              소개합니다
            </h2>
          </motion.div>

          {/* 네비게이션 버튼들 */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button 
              className="w-15 h-15 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <div
                className="w-6 h-6 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url("http://localhost:3845/assets/416c3529fa97a348e1174c2c8ec1e003a6bafc71.svg")'
                }}
              />
            </button>
            <button 
              className="w-15 h-15 rounded-full bg-[var(--color-brand-accent)] flex items-center justify-center hover:bg-[var(--color-brand-accent)]/80 transition-colors"
            >
              <div
                className="w-6 h-6 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: 'url("http://localhost:3845/assets/268a2e2905f08423204f728187e66b76fdc67b05.svg")'
                }}
              />
            </button>
          </motion.div>
        </div>

        {/* 자세히 보기 버튼 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="border border-white rounded-full px-8 py-3 figma-button text-white hover:bg-white/10 transition-colors inline-flex items-center gap-3">
            자세히 보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M1 8h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* 무한 스크롤 캐러셀 */}
        <div className="relative">
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: isPaused ? 0 : -2400, // 8개 항목 * 300px = 2400px
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {duplicatedItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <div
                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${item.image})`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <h3 className="figma-button text-white mb-1">
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