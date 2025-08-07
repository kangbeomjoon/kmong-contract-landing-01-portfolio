'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';
import { Camera, Settings, Play } from 'lucide-react';

const progressSteps = [
  {
    id: 1,
    title: '사진 준비',
    icon: Camera,
    image: '/api/placeholder/600/400'
  },
  {
    id: 2,
    title: '기간 및 스토어 세팅', 
    icon: Settings,
    image: '/api/placeholder/600/400'
  },
  {
    id: 3,
    title: '판매 시작',
    icon: Play,
    image: '/api/placeholder/600/400'
  }
];

export default function ProgressSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgresses, setStepProgresses] = useState<number[]>([0, 0, 0]);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false]);
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);

  // 특정 스텝의 프로그레스를 실행하는 함수
  const runProgressForStep = useCallback((stepIndex: number) => {
    // 이전 타이머가 있다면 정리
    setActiveTimer(prevTimer => {
      if (prevTimer) {
        clearInterval(prevTimer);
      }
      return null;
    });

    // 모든 프로그레스 초기화
    setStepProgresses([0, 0, 0]);
    setCompletedSteps([false, false, false]);
    setCurrentStep(stepIndex);

    // 선택된 스텝만 프로그레스 실행
    const timer = setInterval(() => {
      setStepProgresses(prev => {
        const newProgresses = [...prev];
        if (newProgresses[stepIndex] >= 100) {
          setCompletedSteps(prevCompleted => {
            const newCompleted = [...prevCompleted];
            newCompleted[stepIndex] = true;
            return newCompleted;
          });
          clearInterval(timer);
          setActiveTimer(null);
          return newProgresses;
        }
        newProgresses[stepIndex] += 2; // 프로그레스 속도
        return newProgresses;
      });
    }, 50); // 애니메이션 속도

    setActiveTimer(timer);
  }, [setActiveTimer, setStepProgresses, setCompletedSteps, setCurrentStep]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearInterval(activeTimer);
      }
    };
  }, [activeTimer]);

  // 초기 로드 시 첫 번째 스텝 자동 실행
  useEffect(() => {
    if (inView) {
      runProgressForStep(0);
    }
  }, [inView, runProgressForStep]);

  return (
    <section ref={ref} className="min-h-screen bg-gray-900 py-20 flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p
            className="text-gray-400 mb-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            YouTube 채널이 있는 Google 계정을 준비해 주세요.
          </motion.p>
          
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            어떻게 시작하면 될까요?
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* 좌측 대형 이미지 영역 */}
          <div className="relative">
            <motion.div
              className="relative bg-gray-800 rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* 메인 이미지가 변환되는 영역 */}
              <div className="relative h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-6 overflow-hidden">
                <motion.div
                  key={currentStep}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const IconComponent = progressSteps[currentStep].icon;
                        return <IconComponent className="w-12 h-12" />;
                      })()}
                    </div>
                    <h3 className="text-2xl font-bold">
                      {progressSteps[currentStep].title}
                    </h3>
                  </div>
                </motion.div>
              </div>

              {/* 하단 정보 */}
              <div className="text-center text-white">
                <p className="text-lg mb-4">
                  상품을 라이브 방송에 연결하여 바로 판매할 수 있어요.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full">
                  <span className="text-sm">Step {currentStep + 1} of 3</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 우측 3개 프로그레스 카드 */}
          <div className="space-y-6">
            {progressSteps.map((step, index) => {
              const IconComponent = step.icon;
              const progress = stepProgresses[index];
              const isCompleted = completedSteps[index];
              const isActive = currentStep === index;
              
              return (
                <motion.div
                  key={step.id}
                  className={`bg-gray-800 rounded-xl p-6 text-white transition-all duration-500 cursor-pointer hover:bg-gray-700 ${
                    isActive ? 'ring-2 ring-blue-400 scale-105' : 'scale-100'
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                  onClick={() => runProgressForStep(index)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-blue-600' : 'bg-gray-700'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg transition-colors ${
                          isActive ? 'text-blue-400' : 'text-white'
                        }`}>{step.title}</h4>
                        <p className="text-gray-400 text-sm">
                          {index === 0 && "고품질 이미지 업로드"}
                          {index === 1 && "판매 설정 완료"}
                          {index === 2 && "스토어 오픈 준비"}
                        </p>
                        <p className="text-xs text-blue-300 mt-1">
                          클릭하여 진행 상황 확인
                        </p>
                      </div>
                    </div>
                    
                    {/* 완료 표시 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      {isCompleted ? (
                        <span className="text-white font-bold">✓</span>
                      ) : (
                        <span className="text-gray-400 text-sm">{index + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* 프로그레스 바 */}
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-blue-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  
                  {/* 프로그레스 퍼센트 표시 */}
                  <div className="mt-2 text-right">
                    <span className="text-blue-400 font-medium text-sm">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors text-lg">
            유튜브 쇼핑 상품 신청하기
          </button>
        </motion.div>
      </div>
    </section>
  );
}