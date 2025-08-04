'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: "유튜브 쇼핑은 어떻게 시작하나요?",
    answer: "카페24 계정 생성 후 유튜브 채널을 연동하고, 상품을 등록하면 바로 시작할 수 있습니다. 별도의 복잡한 설정 없이 몇 분만에 준비 완료됩니다."
  },
  {
    question: "수수료는 얼마인가요?",
    answer: "기본 월 사용료는 무료이며, 판매 성사 시에만 합리적인 수수료가 발생합니다. 자세한 요금 정책은 문의하시면 안내해드립니다."
  },
  {
    question: "어떤 상품을 판매할 수 있나요?",
    answer: "패션, 뷰티, 가전, 식품, 도서 등 대부분의 상품 카테고리를 판매할 수 있습니다. 다만 일부 제한 품목이 있으니 상세 가이드를 확인해주세요."
  },
  {
    question: "해외 판매도 가능한가요?",
    answer: "네, 글로벌 배송 서비스를 통해 전 세계 고객에게 판매가 가능합니다. 언어별 상품페이지 자동 번역 기능도 제공됩니다."
  },
  {
    question: "크리에이터와 협업하려면 어떻게 하나요?",
    answer: "플랫폼 내 크리에이터 매칭 시스템을 통해 브랜드에 맞는 인플루언서를 찾고 협업 제안을 보낼 수 있습니다."
  }
];

export default function FAQSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      setSubmitMessage('개인정보 처리 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    
    // 실제 폼 제출 로직 (Vercel Forms 등)
    try {
      // TODO: 실제 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000)); // 시뮬레이션
      setSubmitMessage('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
      setFormData({ name: '', email: '', phone: '', message: '', agreement: false });
    } catch {
      setSubmitMessage('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-xl text-gray-600">
            궁금한 점이 있으시면 언제든 문의해주세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* FAQ 아코디언 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>
                  자주 묻는 질문들을 확인해보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* 문의 폼 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>문의하기</CardTitle>
                <CardDescription>
                  더 자세한 정보가 필요하시면 문의해주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">연락처</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">문의 내용 *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreement"
                      checked={formData.agreement}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, agreement: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreement" className="text-sm">
                      개인정보 처리 동의 (필수)
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '전송 중...' : '문의 보내기'}
                  </Button>

                  {submitMessage && (
                    <div className={`text-sm p-3 rounded-md ${
                      submitMessage.includes('성공') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}