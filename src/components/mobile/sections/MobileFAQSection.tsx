'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MobileContactForm from './MobileContactForm';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "바즈비 플랫폼 이용 요금은 어떻게 되나요?",
    answer: "바즈비는 기본 이용료 무료로 시작하실 수 있습니다. 추가 기능이나 고급 분석 도구는 월 구독제로 제공되며, 자세한 요금 정보는 문의를 통해 안내드리고 있습니다."
  },
  {
    id: 2,
    question: "콘텐츠 업로드에 제한이 있나요?",
    answer: "기본 플랜에서는 월 100개의 콘텐츠 업로드가 가능하며, 프리미엄 플랜에서는 무제한 업로드를 지원합니다. 파일 크기는 개당 최대 2GB까지 지원됩니다."
  },
  {
    id: 3,
    question: "수익 정산 주기는 어떻게 되나요?",
    answer: "수익 정산은 매월 말일 기준으로 계산되어 익월 15일에 지급됩니다. 최소 정산 금액은 50,000원이며, 세금계산서 발행도 가능합니다."
  },
  {
    id: 4,
    question: "기업용 솔루션도 제공하나요?",
    answer: "네, 기업 고객을 위한 전용 솔루션을 제공합니다. 대량 콘텐츠 관리, 팀 협업 기능, 전담 고객지원 등 기업 맞춤형 서비스를 이용하실 수 있습니다."
  },
  {
    id: 5,
    question: "API 연동이 가능한가요?",
    answer: "RESTful API를 통해 다양한 시스템과 연동이 가능합니다. 개발자 문서와 SDK를 제공하며, 기술 지원팀이 연동 과정을 도와드립니다."
  },
  {
    id: 6,
    question: "사용자 데이터는 안전하게 보호되나요?",
    answer: "SSL 암호화, 정기적인 보안 점검, GDPR 준수 등 엄격한 보안 정책을 적용하고 있습니다. 사용자의 개인정보와 콘텐츠는 안전하게 보호됩니다."
  },
  {
    id: 7,
    question: "모바일 앱도 제공되나요?",
    answer: "iOS와 Android용 모바일 앱을 제공하며, 웹과 동일한 기능을 모바일에서도 편리하게 이용하실 수 있습니다. 앱스토어와 플레이스토어에서 다운로드 가능합니다."
  },
  {
    id: 8,
    question: "고객 지원은 어떻게 받을 수 있나요?",
    answer: "평일 오전 9시부터 오후 6시까지 실시간 채팅, 이메일, 전화 지원을 제공합니다. 긴급한 문제의 경우 24시간 지원도 가능합니다."
  }
];

const FAQAccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle
}) => {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 px-0 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-white pr-4 leading-relaxed">
          {item.question}
        </h3>
        <div className="flex-shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-blue-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="pb-6 px-0">
          <p className="text-gray-300 leading-relaxed text-base">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
};

const MobileFAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full">
      {/* FAQ Section */}
      <section className="bg-black py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              궁금한 점이 있으시나요?
            </h2>
            <p className="text-gray-400 text-lg">
              자주 묻는 질문들을 확인해보세요
            </p>
          </div>

          <div className="space-y-0">
            {faqData.map((item) => (
              <FAQAccordionItem
                key={item.id}
                item={item}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-100 py-16 px-5">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              문의하기
            </h2>
            <p className="text-gray-600">
              더 궁금한 점이 있으시면 언제든 연락주세요
            </p>
          </div>
          <MobileContactForm />
        </div>
      </section>
    </div>
  );
};

export default MobileFAQSection;