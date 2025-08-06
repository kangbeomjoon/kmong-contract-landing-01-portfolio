'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    id: 1,
    number: '01',
    title: '간편한 쇼핑몰 제작\n몇 분 만에 시작하세요',
    description: '복잡한 설정 없이 클릭 몇 번으로\n전문적인 쇼핑몰을 만들 수 있어요.\n누구나 쉽게 시작할 수 있는\n직관적인 인터페이스를 제공합니다.'
  },
  {
    id: 2,
    number: '02',
    title: '스마트한 상품 관리\n자동화로 시간 절약',
    description: '상품 등록부터 재고 관리까지\n모든 과정이 자동으로 처리됩니다.\n효율적인 관리 시스템으로\n더 많은 시간을 판매에 집중하세요.'
  },
  {
    id: 3,
    number: '03',
    title: '크리에이터와의 협업\n새로운 판매 채널 개척',
    description: '유명 인플루언서들과 함께\n제품을 홍보하고 판매하세요.\n다양한 협업 기회를 통해\n브랜드 가치를 높일 수 있습니다.'
  },
  {
    id: 4,
    number: '04',
    title: '글로벌 진출 지원\n전 세계가 여러분의 시장',
    description: '다국어 지원과 현지화 서비스로\n해외 시장 진출을 도와드려요.\n전 세계 고객들에게\n여러분의 상품을 선보이세요.'
  },
  {
    id: 5,
    number: '05',
    title: '실시간 데이터 분석\n성공을 위한 인사이트',
    description: '매출, 트래픽, 고객 행동 등\n모든 데이터를 한눈에 확인하세요.\n데이터 기반의 의사결정으로\n비즈니스를 더욱 성장시키세요.'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // power2.out equivalent
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    }
  }
};

export default function CardsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 제목 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            서비스가 어떻게 새로워졌을까요?
          </h2>
        </motion.div>

        {/* 카드 그리드 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.8 }} // 80% 보일 때 트리거, once: false로 역방향도 지원
        >
          {/* 첫 번째 행: 2개 카드 */}
          <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl font-bold text-lg">
                {cards[0].number}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight whitespace-pre-line">
              {cards[0].title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {cards[0].description}
            </p>
            
            {/* 호버 효과를 위한 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-xl font-bold text-lg">
                {cards[1].number}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight whitespace-pre-line">
              {cards[1].title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {cards[1].description}
            </p>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* 두 번째 행: 2개 카드 */}
          <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-xl font-bold text-lg">
                {cards[2].number}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight whitespace-pre-line">
              {cards[2].title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {cards[2].description}
            </p>
            
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-xl font-bold text-lg">
                {cards[3].number}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight whitespace-pre-line">
              {cards[3].title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {cards[3].description}
            </p>
            
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* 세 번째 행: 1개 카드 (중앙 정렬) */}
          <motion.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 md:max-w-2xl md:mx-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-xl font-bold text-lg">
                {cards[4].number}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight whitespace-pre-line">
              {cards[4].title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {cards[4].description}
            </p>
            
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}