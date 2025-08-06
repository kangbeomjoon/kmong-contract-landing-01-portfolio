'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cards = [
  {
    id: 1,
    number: '01',
    title: '간편한 쇼핑몰 제작',
    subtitle: '몇 분 만에 시작하세요',
    description: '복잡한 설정 없이 클릭 몇 번으로 전문적인 쇼핑몰을 만들 수 있어요. 누구나 쉽게 시작할 수 있는 직관적인 인터페이스를 제공합니다.',
    bgColor: 'from-blue-500 to-purple-600',
    shadowColor: 'shadow-blue-500/20'
  },
  {
    id: 2,
    number: '02',
    title: '스마트한 상품 관리',
    subtitle: '자동화로 시간 절약',
    description: '상품 등록부터 재고 관리까지 모든 과정이 자동으로 처리됩니다. 효율적인 관리 시스템으로 더 많은 시간을 판매에 집중하세요.',
    bgColor: 'from-purple-500 to-pink-600',
    shadowColor: 'shadow-purple-500/20'
  },
  {
    id: 3,
    number: '03',
    title: '크리에이터와의 협업',
    subtitle: '새로운 판매 채널 개척',
    description: '유명 인플루언서들과 함께 제품을 홍보하고 판매하세요. 다양한 협업 기회를 통해 브랜드 가치를 높일 수 있습니다.',
    bgColor: 'from-green-500 to-blue-600',
    shadowColor: 'shadow-green-500/20'
  },
  {
    id: 4,
    number: '04',
    title: '글로벌 진출 지원',
    subtitle: '전 세계가 여러분의 시장',
    description: '다국어 지원과 현지화 서비스로 해외 시장 진출을 도와드려요. 전 세계 고객들에게 여러분의 상품을 선보이세요.',
    bgColor: 'from-orange-500 to-red-600',
    shadowColor: 'shadow-orange-500/20'
  },
  {
    id: 5,
    number: '05',
    title: '실시간 데이터 분석',
    subtitle: '성공을 위한 인사이트',
    description: '매출, 트래픽, 고객 행동 등 모든 데이터를 한눈에 확인하세요. 데이터 기반의 의사결정으로 비즈니스를 더욱 성장시키세요.',
    bgColor: 'from-indigo-500 to-purple-600',
    shadowColor: 'shadow-indigo-500/20'
  }
];

export default function CardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 제목 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            서비스가 어떻게 새로워졌을까요?
          </h2>
          <p className="text-gray-600 mt-6 text-lg">
            혁신적인 기능들로 더욱 강력해진 서비스를 확인하세요
          </p>
        </motion.div>

        {/* 3D 스택 카드 컨테이너 */}
        <div className="relative h-[800px] md:h-[600px]">
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="relative w-full max-w-2xl mx-auto">
              {cards.map((card, index) => {
                // 스크롤 진행도에 따른 카드 등장 순서: 01→02→03→04→05
                const startProgress = index * 0.18;
                const endProgress = Math.min(startProgress + 0.3, 0.9);
                
                // 최종 스택에서의 위치 계산 (05번이 맨 앞에)
                const stackOrder = cards.length - 1 - index; // 05:4, 04:3, 03:2, 02:1, 01:0
                
                // 최종 카드 크기: 05번(1.0) → 01번(0.80)
                const finalScale = 1.0 - (stackOrder * 0.05);
                
                // 최종 Y 위치: 뒤로 갈수록 위로 올라가는 계단식
                const finalY = stackOrder * -12;
                
                // 최종 투명도: 뒤로 갈수록 흐려짐
                const finalOpacity = 1.0 - (stackOrder * 0.1);
                
                // 애니메이션 변환값
                const y = useTransform(
                  scrollYProgress,
                  [0, startProgress, endProgress, 1],
                  [200, 200, finalY, finalY]
                );
                
                const scale = useTransform(
                  scrollYProgress,
                  [0, startProgress, startProgress + 0.15, endProgress, 1],
                  [0.7, 0.7, finalScale * 0.95, finalScale, finalScale]
                );
                
                const opacity = useTransform(
                  scrollYProgress,
                  [0, startProgress, startProgress + 0.1, endProgress, 1],
                  [0, 0, 1, finalOpacity, finalOpacity]
                );
                
                const rotate = useTransform(
                  scrollYProgress,
                  [startProgress, startProgress + 0.15, endProgress],
                  [index * 5, index * 2, 0]
                );

                return (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0 w-full"
                    style={{
                      zIndex: index + 1, // 05번이 z-index 5로 맨 앞에
                      y,
                      scale,
                      opacity,
                      rotate,
                    }}
                  >
                    <motion.div
                      className={`
                        relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.bgColor} 
                        p-8 md:p-10 text-white backdrop-blur-sm border border-white/10
                      `}
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: `
                          0 ${8 + stackOrder * 4}px ${24 + stackOrder * 8}px rgba(0, 0, 0, 0.15),
                          0 ${4 + stackOrder * 2}px ${12 + stackOrder * 4}px rgba(0, 0, 0, 0.1),
                          0 2px 8px rgba(0, 0, 0, 0.05)
                        `,
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -8,
                        rotateY: 3,
                        rotateX: 3,
                        boxShadow: `
                          0 ${16 + stackOrder * 6}px ${32 + stackOrder * 10}px rgba(0, 0, 0, 0.2),
                          0 ${8 + stackOrder * 3}px ${16 + stackOrder * 6}px rgba(0, 0, 0, 0.15),
                          0 4px 12px rgba(0, 0, 0, 0.1)
                        `,
                        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                      }}
                    >
                      {/* 배경 패턴 */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-32 translate-x-32" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-24 -translate-x-24" />
                      </div>
                      
                      {/* 카드 콘텐츠 */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-2xl border border-white/20">
                            {card.number}
                          </div>
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-white/80 text-lg font-medium">
                            {card.subtitle}
                          </p>
                        </div>
                        
                        <p className="text-white/90 leading-relaxed text-base md:text-lg">
                          {card.description}
                        </p>
                        
                        {/* 장식적 요소 */}
                        <div className="absolute bottom-6 right-6 w-24 h-1 bg-white/30 rounded-full" />
                      </div>

                      {/* 글래스모피즘 효과 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      
                      {/* 테두리 하이라이트 */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-3">
            {cards.map((card, index) => {
              const startProgress = index * 0.18;
              const endProgress = Math.min(startProgress + 0.3, 0.9);
              
              return (
                <motion.div
                  key={card.id}
                  className="relative"
                >
                  {/* 배경 점 */}
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  
                  {/* 활성 상태 점 */}
                  <motion.div
                    className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [startProgress - 0.05, startProgress + 0.1, endProgress, endProgress + 0.1],
                        [0, 1, 1, 0.7]
                      ),
                      scale: useTransform(
                        scrollYProgress,
                        [startProgress - 0.05, startProgress + 0.1, endProgress],
                        [0.8, 1.2, 1]
                      ),
                    }}
                  />
                  
                  {/* 카드 번호 */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500">
                    {card.number}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}