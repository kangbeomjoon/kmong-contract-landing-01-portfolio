'use client';

import { useMobileCounter, easingFunctions, formatStatNumber } from '@/hooks/useMobileCounter';

interface StatItem {
  id: string;
  value: number;
  type: 'default' | 'percentage' | 'currency';
  label: string;
  description?: string;
  delay?: number;
}

const statsData: StatItem[] = [
  {
    id: 'platform-usage',
    value: 1000,
    type: 'default',
    label: '바즈비 플랫폼을 네번 1개 기업 이용수',
    delay: 0
  },
  {
    id: 'active-users',
    value: 500,
    type: 'default',
    label: '활성 이용 기업수',
    delay: 200
  },
  {
    id: 'satisfaction',
    value: 90,
    type: 'percentage',
    label: '고객 만족도',
    delay: 400
  },
  {
    id: 'growth-rate',
    value: 15,
    type: 'percentage',
    label: '월 평균 성장률',
    delay: 600
  },
  {
    id: 'annual-revenue',
    value: 200000,
    type: 'currency',
    label: '연간 거래액',
    delay: 800
  }
];

const StatCard: React.FC<{ stat: StatItem; index: number }> = ({ stat, index }) => {
  const { count, ref, isVisible } = useMobileCounter({
    target: stat.value,
    duration: 2500,
    easing: easingFunctions.easeOutQuart,
    startDelay: stat.delay || 0
  });

  return (
    <div
      ref={ref}
      className={`
        flex flex-col items-center text-center py-8 px-6
        transform transition-all duration-1000 ease-out
        ${isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
        }
      `}
      style={{
        transitionDelay: `${(stat.delay || 0) + 100}ms`
      }}
    >
      {/* Number Display */}
      <div className="mb-4">
        <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
          {formatStatNumber(count, stat.type)}
        </div>
        
        {/* Progress indicator for visual feedback */}
        <div className="w-16 h-0.5 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-red-500 transition-all duration-2000 ease-out"
            style={{
              width: isVisible ? '100%' : '0%',
              transitionDelay: `${stat.delay || 0}ms`
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="space-y-2">
        <h3 className="text-white text-sm md:text-base font-medium leading-relaxed">
          {stat.label}
        </h3>
        
        {stat.description && (
          <p className="text-gray-400 text-xs md:text-sm">
            {stat.description}
          </p>
        )}
      </div>
    </div>
  );
};

const MobileStatsSection: React.FC = () => {
  return (
    <section className="relative bg-black py-16 md:py-20 overflow-hidden">
      {/* Background Image - Optional */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-b from-gray-900/50 to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            신뢰할 수 있는 성과
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            바즈비와 함께한 기업들의 실제 성과와 만족도를 확인해보세요
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-2 max-w-lg mx-auto">
          {statsData.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="flex justify-center mt-12 md:mt-16">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlays for Visual Polish */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default MobileStatsSection;