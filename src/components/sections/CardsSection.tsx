'use client';

import { motion } from 'framer-motion';


const futureFeatures = [
  {
    id: '01',
    title: '버즈비 관리에\n최적화된 전용 스토어',
    description: '상품 등록부터 결제, 고객관리, 마케팅,\n애널리스트까지 모든 것을 한곳에서 처리하세요.\n새롭게 통합된 전용 스토어로 더 편리하게 이용하고\n시간도 절약해 보세요.',
    image: 'http://localhost:3845/assets/9a6cc1fa1f6b5e4116cd9fd6a1f00feaf1f2378c.png'
  }
];

const ctaSection = {
  title: '티켓광고,\n버즈비와 함께라면 더 쉬워져요',
  subtitle: 'Future',
  description: '온라인 광고는 처음이신가요?\n버즈비 애드 전문가들과 함께 해보세요.',
  buttonText: '바로가기',
  image: 'http://localhost:3845/assets/bab29d3f438aee5dbf96ae12d177e4199ab39a2c.png'
};

export default function CardsSection() {
  return (
    <>
      {/* Future Section (con_5) */}
      <section 
        id="cards"
        className="py-20 bg-[var(--color-bg-secondary)]"
      >
        {/* 상단 제목 - 섹션 맨 위 */}
        <div className="text-center mb-20">
          <motion.div
            className="figma-subtitle mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Future
          </motion.div>
          <motion.h2
            className="figma-heading-lg leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            버즈비는<br />
            어떻게 새로워졌을까?
          </motion.h2>
        </div>

        {/* 하단 컨텐츠 영역 */}
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* 좌측 텍스트 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="mb-12">
                  <div className="w-12 h-2.5 mb-4">
                    <div
                      className="w-full h-full bg-center bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: 'url("http://localhost:3845/assets/81530fd841cbeef2b56afd2a285004316f9be22d.svg")'
                      }}
                    />
                  </div>
                  <div className="text-[var(--color-brand-accent)] figma-heading-sm mb-4">01</div>
                  <h3 className="figma-heading-md text-white mb-6 whitespace-pre-line">
                    {futureFeatures[0].title}
                  </h3>
                  <p className="figma-body text-[var(--color-text-secondary)] whitespace-pre-line">
                    {futureFeatures[0].description}
                  </p>
                </div>
              </motion.div>

              {/* 우측 이미지 */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="bg-gradient-to-b from-[var(--color-brand-accent)] to-[var(--color-bg-secondary)] p-8 rounded-3xl">
                  <div
                    className="w-full h-96 bg-center bg-cover bg-no-repeat rounded-2xl overflow-hidden"
                    style={{
                      backgroundImage: `url(${futureFeatures[0].image})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(246,222,53,0.1)] to-[var(--color-bg-secondary)] to-[96.635%] rounded-3xl" />
                </div>
              </motion.div>
            </div>
        </div>
      </section>

      {/* CTA Section (con_6) */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `url(${ctaSection.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* 좌측 텍스트 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="figma-subtitle mb-8">Future</div>
              <h2 className="figma-heading-lg text-center leading-tight mb-8 whitespace-pre-line">
                {ctaSection.title}
              </h2>
              
              <div className="mb-8">
                <div className="figma-heading-sm text-white mb-4">운영대행</div>
                <h3 className="figma-heading-md text-white mb-6">
                  온라인 광고는 처음이신가요?
                </h3>
                <p className="figma-body-lg text-white mb-8 whitespace-pre-line">
                  {ctaSection.description}
                </p>
              </div>

              <motion.button
                className="bg-[var(--color-brand-accent)] text-black px-12 py-4 rounded-full figma-button hover:bg-[var(--color-brand-accent)]/90 transition-colors duration-200 inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ctaSection.buttonText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M1 8h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* 우측 여백 (배경 이미지 보이도록) */}
            <div />
          </div>
        </div>
      </section>
    </>
  );
}