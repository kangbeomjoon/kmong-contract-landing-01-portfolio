'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Store, Package, Users, Globe, BarChart } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: '쉬운 스토어 구축',
    description: '별도 디자인 작업 없이 바로 시작',
    icon: Store,
    gradient: 'from-blue-500 via-purple-500 to-pink-400',
    number: '01'
  },
  {
    id: 2,
    title: '상품 관리 자동화',
    description: '클릭 몇 번으로 상품 등록 완료',
    icon: Package,
    gradient: 'from-indigo-500 via-blue-500 to-purple-500',
    number: '02'
  },
  {
    id: 3,
    title: '크리에이터 협업',
    description: '다양한 인플루언서와 파트너십',
    icon: Users,
    gradient: 'from-purple-500 via-pink-500 to-red-400',
    number: '03'
  },
  {
    id: 4,
    title: '글로벌 판매',
    description: '전 세계 시장 진출 지원',
    icon: Globe,
    gradient: 'from-pink-500 via-red-500 to-orange-400',
    number: '04'
  },
  {
    id: 5,
    title: '매출 분석',
    description: '실시간 성과 데이터 제공',
    icon: BarChart,
    gradient: 'from-red-500 via-orange-500 to-yellow-400',
    number: '05'
  }
];

export default function CardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 각 카드의 스크롤 기반 변환 값 - 완전히 겹치는 스택 효과
  const y1 = useTransform(scrollYProgress, [0, 0.15], [200, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.15], [3, 0]);

  const y2 = useTransform(scrollYProgress, [0.15, 0.3], [200, 0]);
  const scale2 = useTransform(scrollYProgress, [0.15, 0.3], [0.8, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const rotate2 = useTransform(scrollYProgress, [0.15, 0.3], [3, 0]);

  const y3 = useTransform(scrollYProgress, [0.3, 0.45], [200, 0]);
  const scale3 = useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const rotate3 = useTransform(scrollYProgress, [0.3, 0.45], [3, 0]);

  const y4 = useTransform(scrollYProgress, [0.45, 0.6], [200, 0]);
  const scale4 = useTransform(scrollYProgress, [0.45, 0.6], [0.8, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const rotate4 = useTransform(scrollYProgress, [0.45, 0.6], [3, 0]);

  const y5 = useTransform(scrollYProgress, [0.6, 0.75], [200, 0]);
  const scale5 = useTransform(scrollYProgress, [0.6, 0.75], [0.8, 1]);
  const opacity5 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const rotate5 = useTransform(scrollYProgress, [0.6, 0.75], [3, 0]);

  const cardTransforms = [
    { y: y1, scale: scale1, opacity: opacity1, rotate: rotate1 },
    { y: y2, scale: scale2, opacity: opacity2, rotate: rotate2 },
    { y: y3, scale: scale3, opacity: opacity3, rotate: rotate3 },
    { y: y4, scale: scale4, opacity: opacity4, rotate: rotate4 },
    { y: y5, scale: scale5, opacity: opacity5, rotate: rotate5 }
  ];

  return (
    <section ref={containerRef} className="min-h-[600vh] bg-black py-20 relative">
      <div className="container mx-auto px-4">
        {/* 상단 제목 */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            유튜브 쇼핑,<br />
            <span className="text-gray-300">어떻게 새로워졌을까요?</span>
          </h2>
        </div>

        {/* 스티키 컨테이너 - 카드들이 완전히 겹치도록 */}
        <div className="sticky top-20 flex items-center justify-center h-screen">
          <div className="relative max-w-6xl mx-auto w-full h-[600px]">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const transforms = cardTransforms[index];
              
              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    y: transforms.y,
                    scale: transforms.scale,
                    opacity: transforms.opacity,
                    rotate: transforms.rotate,
                    zIndex: 50 - index
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden`}>
                    {/* 배경 장식 요소 */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      {/* 상단 번호와 아이콘 */}
                      <div className="flex items-start justify-between mb-12">
                        <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm">
                          <span className="w-4 h-4 bg-white rounded-full mr-4"></span>
                          <span className="text-lg font-bold">{card.number}</span>
                        </div>
                        
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      {/* 메인 콘텐츠 */}
                      <div className="flex-1 flex items-center">
                        <div className="w-full">
                          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8">
                            {card.title}
                          </h3>
                          
                          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-12 max-w-4xl">
                            {card.description}
                          </p>

                          <motion.button
                            className="inline-flex items-center px-10 py-5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors text-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            유튜브 쇼핑 시작하기
                            <span className="ml-3">→</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 스크롤 프로그레스 인디케이터 */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
          <div className="w-1 h-40 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-white rounded-full"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}