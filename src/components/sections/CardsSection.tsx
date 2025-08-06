'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stageCards = [
  {
    id: '01',
    title: '대규모 유저 접근',
    subtitle: '글로벌 플랫폼 진출',
    tag: 'Reach',
    description: '20억 명 이상의 유튜브 사용자에게 당신의 상품을 노출시킬 수 있습니다.',
    color: 'from-purple-600 to-purple-400',
    bgColor: 'bg-purple-100'
  },
  {
    id: '02',
    title: '콘텐츠 커머스',
    subtitle: '영상과 쇼핑의 결합',
    tag: 'Content',
    description: '제품 리뷰, 언박싱, 튜토리얼 등 다양한 콘텐츠와 함께 자연스럽게 상품을 홍보합니다.',
    color: 'from-blue-600 to-blue-400',
    bgColor: 'bg-blue-100'
  },
  {
    id: '03',
    title: '실시간 라이브 커머스',
    subtitle: '인터랙티브 쇼핑 경험',
    tag: 'Live',
    description: '실시간 방송을 통해 고객과 소통하며 제품을 소개하고 즉각적인 구매 전환을 이끌어냅니다.',
    color: 'from-green-600 to-green-400',
    bgColor: 'bg-green-100'
  },
  {
    id: '04',
    title: 'AI 추천 시스템',
    subtitle: '맞춤형 상품 노출',
    tag: 'AI',
    description: '유튜브의 강력한 AI 알고리즘이 관심사가 맞는 잠재 고객에게 자동으로 상품을 추천합니다.',
    color: 'from-orange-600 to-orange-400',
    bgColor: 'bg-orange-100'
  },
  {
    id: '05',
    title: '크리에이터 협업을 통한\n새로운 판매 채널 확장',
    subtitle: '크리에이터 ↔ 브랜드',
    tag: '♥ Creator X Brand',
    description: '판매할 상품이 있다면 다양한 크리에이터들과 협업하여\n내 콘텐츠와 어울리는 브랜드를\n상품 연동, 판매, 운영으로 새로운 수익 모델을\n만들어 보세요.',
    color: 'from-red-600 to-pink-400',
    bgColor: 'bg-red-50'
  }
];

export default function CardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative bg-white">
      {/* 스크롤 높이를 위한 컨테이너 - 카드가 순차적으로 나타나도록 충분한 높이 확보 */}
      <div className="relative h-[500vh]">
        {/* 고정된 뷰포트 컨테이너 */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* 섹션 제목 */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                유튜브 쇼핑의 5가지 성공 전략
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                카페24와 함께라면 유튜브 쇼핑 성공이 더 가까워집니다
              </p>
            </motion.div>

            {/* 스택 카드 컨테이너 */}
            <div className="relative h-[500px] flex items-center justify-center">
              {stageCards.map((card, index) => {
                // 각 카드가 순차적으로 나타나도록 스크롤 진행도 설정
                // 전체 스크롤의 80%를 5개 카드에 균등 분배
                const cardInterval = 0.16; // 각 카드당 16%의 스크롤 구간
                const cardScrollStart = index * cardInterval + 0.1; // 0.1부터 시작 (초기 여백)
                const cardScrollEnd = cardScrollStart + cardInterval;
                
                // 카드 위치 변환 - 아래에서 위로 올라오며 최종 위치에 도달
                // 01번이 맨 뒤(위), 05번이 맨 앞(아래)에 오도록 설정
                const finalYPosition = index * -35; // 01번이 가장 위(0), 05번이 가장 아래(-140)
                const y = useTransform(
                  scrollYProgress,
                  [0, cardScrollStart, cardScrollEnd, 1],
                  [600, 600, finalYPosition, finalYPosition]
                );
                
                // 카드 크기 변환 - 01번이 가장 작고 05번이 가장 크게
                const finalScale = 0.82 + (index * 0.035);
                const scale = useTransform(
                  scrollYProgress,
                  [0, cardScrollStart, cardScrollEnd, 1],
                  [0.75, 0.75, finalScale, finalScale]
                );
                
                // 불투명도 변환 - 각 카드가 나타날 때만 보이도록
                const opacity = useTransform(
                  scrollYProgress,
                  [cardScrollStart - 0.02, cardScrollStart, cardScrollEnd, 1],
                  [0, 0, 1, 1]
                );

                // z-index 설정 - 05번이 맨 앞(5), 01번이 맨 뒤(1)
                const zIndex = index + 1;

                return (
                  <motion.div
                    key={card.id}
                    className="absolute w-full max-w-4xl"
                    style={{
                      y,
                      scale,
                      opacity,
                      zIndex
                    }}
                  >
                    <div className={`
                      ${card.bgColor} rounded-2xl shadow-2xl p-8 md:p-10
                      border border-gray-200 relative overflow-hidden
                    `}>
                      {/* 배경 장식 */}
                      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-white/40 to-transparent -translate-y-32 translate-x-32" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-white/30 to-transparent translate-y-24 -translate-x-24" />
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-6">
                          {/* 번호 */}
                          <div className={`
                            w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${card.color}
                            flex items-center justify-center text-white font-bold text-xl md:text-2xl
                            shadow-lg flex-shrink-0
                          `}>
                            {card.id}
                          </div>
                          
                          {/* 제목 영역 */}
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 whitespace-pre-line">
                              {card.title}
                            </h3>
                            <p className="text-base md:text-lg text-gray-600 mb-3">
                              {card.subtitle}
                            </p>
                            {card.tag && (
                              <span className={`
                                inline-block px-3 py-1 md:px-4 md:py-2 rounded-full text-sm font-semibold
                                bg-gradient-to-r ${card.color} text-white shadow-md
                              `}>
                                {card.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 설명 */}
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-6 whitespace-pre-line">
                          {card.description}
                        </p>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}