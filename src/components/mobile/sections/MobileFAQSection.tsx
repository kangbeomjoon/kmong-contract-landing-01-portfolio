'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "새로운 유튜브 쇼핑, 어떤 게 달라졌나요?",
    answer: "카페24와 유튜브가 함께 개편한 유튜브 쇼핑에서는 별도의 디자인 작업 없이 손쉽게 스토어를 만들 수 있고, 상품 관리 및 주문/배송 관리 등 간편하게 스토어를 관리할 수 있는 기능들이 제공돼요.\n\n또한, 구매자는 여러 스토어에서 배송지 매번 입력할 필요 없이 자동으로 입력되어 더욱 편리하게 주문할 수 있어요.",
    isExpanded: true
  },
  {
    question: "부동산 광고 대행 서비스는 어떤 것들이 있나요?",
    answer: "버즈비에서는 온라인 광고 전략 수립부터 크리에이티브 제작, 광고 집행, 성과 분석까지 원스톱 서비스를 제공합니다. 네이버, 구글, 페이스북, 인스타그램 등 주요 플랫폼에서 효과적인 광고를 진행할 수 있습니다.",
    isExpanded: false
  },
  {
    question: "광고 효과는 어떻게 측정하나요?",
    answer: "실시간 대시보드를 통해 광고 성과를 확인할 수 있으며, 클릭률, 전환율, 리드 생성률 등 다양한 지표로 광고 효과를 측정합니다. 정기적인 성과 리포트도 제공해드립니다.",
    isExpanded: false
  },
  {
    question: "최소 광고 예산은 얼마인가요?",
    answer: "프로젝트 규모와 목표에 따라 광고 예산이 달라집니다. 자세한 견적은 무료 상담을 통해 맞춤형으로 제안해드리며, 합리적인 비용으로 최대 효과를 낼 수 있도록 도와드립니다.",
    isExpanded: false
  },
  {
    question: "계약 기간은 어떻게 되나요?",
    answer: "일반적으로 3개월 이상의 계약을 권장드리며, 프로젝트 특성에 따라 유연하게 조정 가능합니다. 단기간 캠페인부터 장기간 브랜딩까지 다양한 옵션을 제공합니다.",
    isExpanded: false
  }
];

export default function MobileFAQSection() {
  const [expandedIndex, setExpandedIndex] = useState(0); // First item expanded by default

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 bg-[var(--color-bg-secondary)] gpu-accelerated smooth-scroll">
      <div className="container mx-auto px-4">
        {/* 제목 영역 */}
        <div className="mb-16 max-w-lg mx-auto">
          <div className="flex items-center justify-between gap-4 mb-12">
            {/* 왼쪽 제목 */}
            <motion.div
              className="text-left flex-1 min-w-0 gpu-accelerated"
              initial={{ opacity: 0, y: 20 }} // Android에서 더 부드러운 시작
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.2 }}
              transition={{ 
                duration: 0.6, // Android에서 더 빠른 애니메이션
                type: 'tween',
                ease: 'easeOut'
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <div className="figma-subtitle mb-4">Q & A</div>
              <h2 className="figma-heading-md leading-tight">
                궁금한 점이 있으면<br />
                문의해 주세요
              </h2>
            </motion.div>

            {/* 오른쪽 더보기 버튼 */}
            <motion.div
              className="flex-shrink-0 gpu-accelerated"
              initial={{ opacity: 0, y: 15 }} // Android에서 더 부드러운 시작
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.2 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.15, // 더 짧은 딜레이
                type: 'tween',
                ease: 'easeOut'
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <motion.button 
                className="border border-white rounded-full px-6 py-2.5 figma-button text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2 text-sm whitespace-nowrap touch-optimized gpu-accelerated"
                whileHover={{ scale: 1.02 }} // Android에서 더 부드러운 호버
                whileTap={{ scale: 0.98 }} // Android에서 더 부드러운 탭
                transition={{ type: 'tween', duration: 0.15 }}
                style={{ 
                  minHeight: '44px', // Android 터치 타겟 최소 크기
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
              >
                더보기
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M1 8h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* FAQ 목록 */}
        <div className="max-w-lg mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[rgba(0,0,0,0.3)] rounded-[10px] overflow-hidden cursor-pointer touch-optimized gpu-accelerated"
              initial={{ opacity: 0, y: 15 }} // Android에서 더 부드러운 시작
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.2 }}
              transition={{ 
                duration: 0.5, // Android에서 더 빠른 애니메이션
                delay: index * 0.08, // 더 짧은 딜레이
                type: 'tween',
                ease: 'easeOut'
              }}
              onClick={() => toggleExpanded(index)}
              whileTap={{ scale: 0.98 }} // Android 터치 피드백
              style={{
                minHeight: '44px', // Android 터치 타겟 최소 크기
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <div className="p-6">
                {/* 질문 */}
                <div className="flex items-center justify-between">
                  <h3 className="figma-body-lg text-white font-semibold leading-relaxed text-sm">
                    Q. {faq.question}
                  </h3>
                  
                  {/* 펼침/접힘 아이콘 */}
                  <div className="ml-4 flex-shrink-0">
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white rounded-full" />
                      <div 
                        className={`absolute w-0.5 h-4 bg-white rounded-full transition-transform duration-300 ${
                          expandedIndex === index ? 'rotate-0 opacity-0' : 'rotate-90 opacity-100'
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* 답변 */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0
                  }}
                  transition={{ 
                    duration: 0.25, // Android에서 더 빠른 전환
                    ease: 'easeInOut',
                    type: 'tween'
                  }}
                  className="overflow-hidden gpu-accelerated"
                  style={{
                    willChange: 'height, opacity',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="pt-4">
                    <p className="figma-body text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line text-xs">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}