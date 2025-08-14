'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight, BarChart3, Brain, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface Card {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  bgGradient: string;
  textColor: string;
  buttonColor: string;
  imagePath: string;
  imageAlt: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "바즈비 콘텐츠 최적화 솔루션",
    description: "유튜브 알고리즘을 분석하여 콘텐츠의 노출도를 극대화하고, 시청자 참여도를 높이는 맞춤형 최적화 솔루션을 제공합니다.",
    icon: BarChart3,
    bgGradient: "from-blue-50 to-blue-100",
    textColor: "text-blue-900",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    imagePath: "/images/mobile/cards/card-1@2x.png",
    imageAlt: "콘텐츠 최적화 솔루션"
  },
  {
    id: 2,
    title: "AI 기반 시청자 분석",
    description: "딥러닝 기술을 활용한 시청자 행동 패턴 분석으로 타겟 오디언스를 정확히 파악하고 맞춤형 콘텐츠 전략을 수립합니다.",
    icon: Brain,
    bgGradient: "from-yellow-50 to-amber-100",
    textColor: "text-amber-900",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
    imagePath: "/images/mobile/cards/card-2@2x.png",
    imageAlt: "AI 기반 시청자 분석"
  },
  {
    id: 3,
    title: "실시간 수익 최적화",
    description: "실시간 데이터 분석을 통해 수익화 전략을 최적화하고, 광고 수익과 후원 수익을 극대화하는 인사이트를 제공합니다.",
    icon: TrendingUp,
    bgGradient: "from-red-50 to-rose-100",
    textColor: "text-red-900",
    buttonColor: "bg-red-600 hover:bg-red-700",
    imagePath: "/images/mobile/cards/card-3@2x.png",
    imageAlt: "실시간 수익 최적화"
  }
];

const MobileCardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const handleImageError = (cardId: number) => {
    setImageErrors(prev => ({ ...prev, [cardId]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4"
    >
      <div className="max-w-md mx-auto">
        {/* 섹션 제목 */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
            바즈비는 어떤 새로운 가치를
            <br />
            제공할까요?
          </h2>
          <p className="text-gray-600 text-sm">
            AI 기반 유튜브 최적화 플랫폼으로 크리에이터의 성공을 지원합니다
          </p>
        </motion.div>

        {/* 카드 리스트 */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          transition={{ 
            staggerChildren: 0.2,
            delayChildren: 0.1
          }}
          className="space-y-6"
        >
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 shadow-lg border border-white/50 backdrop-blur-sm`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 카드 헤더 - 아이콘과 이미지 */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/80 ${card.textColor}`}>
                    <IconComponent size={24} strokeWidth={2} />
                  </div>
                  
                  {/* 카드 이미지 */}
                  <div className="w-16 h-16 relative">
                    {!imageErrors[card.id] ? (
                      <Image
                        src={card.imagePath}
                        alt={card.imageAlt}
                        fill
                        className="object-contain"
                        onError={() => handleImageError(card.id)}
                      />
                    ) : (
                      <div className={`w-full h-full rounded-lg bg-white/80 flex items-center justify-center ${card.textColor}`}>
                        <IconComponent size={32} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </div>

                {/* 카드 콘텐츠 */}
                <div className="mb-6">
                  <h3 className={`text-lg font-bold ${card.textColor} mb-3`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm ${card.textColor} opacity-80 leading-relaxed`}>
                    {card.description}
                  </p>
                </div>

                {/* CTA 버튼 */}
                <motion.button
                  className={`w-full ${card.buttonColor} text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>자세히 보기</span>
                  <ChevronRight size={18} strokeWidth={2} />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 하단 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-sm mb-4">
            지금 바로 바즈비와 함께 시작하세요
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            무료로 시작하기
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileCardsSection;