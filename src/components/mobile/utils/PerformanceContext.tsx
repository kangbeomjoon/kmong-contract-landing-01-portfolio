'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { detectAndroid, getOptimizedAnimationConfig } from './android-optimized';

interface PerformanceLevel {
  level: 'high' | 'medium' | 'low';
  score: number;
  settings: {
    animationDuration: number;
    enableParallax: boolean;
    enableComplexAnimations: boolean;
    enableTransforms3D: boolean;
    quality: 'high' | 'medium' | 'low';
    reducedMotion: boolean;
  };
}

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
}

interface AdaptiveSettings {
  duration: number;
  ease: string;
  type: string;
  skipAnimation: boolean;
  animationDuration: number;
  enableParallax: boolean;
  enableComplexAnimations: boolean;
  enableTransforms3D: boolean;
  quality: 'high' | 'medium' | 'low';
  reducedMotion: boolean;
  transition: {
    type: string;
    ease: string;
    duration: number;
  };
  style: Record<string, string | undefined>;
  className: string;
}

interface PerformanceContextType {
  performanceLevel: PerformanceLevel;
  isAndroid: boolean;
  isLowPerformance: boolean;
  adaptiveSettings: AdaptiveSettings;
  enableFallbackMode: () => void;
  disableFallbackMode: () => void;
  updatePerformanceLevel: (metrics: PerformanceMetrics) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const [isAndroid] = useState(() => detectAndroid());
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState<PerformanceLevel>(() => {
    return detectPerformanceLevel();
  });

  // 성능 레벨 감지 함수
  function detectPerformanceLevel(): PerformanceLevel {
    // 하드웨어 정보 수집
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const memoryInfo = (performance as Performance & { memory?: { jsHeapSizeLimit: number } }).memory?.jsHeapSizeLimit || 0;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // GPU 가속 지원 확인
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;

    // 성능 점수 계산 (0-100)
    let score = 0;
    
    // CPU 코어 수 (최대 40점)
    score += Math.min(hardwareConcurrency * 10, 40);
    
    // 메모리 (최대 30점)
    if (memoryInfo > 0) {
      const memoryGB = memoryInfo / (1024 * 1024 * 1024);
      score += Math.min(memoryGB * 10, 30);
    } else {
      score += 15; // 기본값
    }
    
    // GPU 가속 지원 (20점)
    if (hasWebGL) score += 20;
    
    // 픽셀 밀도 보정 (10점)
    if (devicePixelRatio <= 2) score += 10;
    else if (devicePixelRatio <= 3) score += 5;

    // 안드로이드는 성능 페널티 적용
    if (isAndroid) {
      score *= 0.8; // 20% 감소
    }

    // 사용자 설정 확인
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 레벨 결정
    let level: 'high' | 'medium' | 'low';
    if (score >= 70) level = 'high';
    else if (score >= 40) level = 'medium';
    else level = 'low';

    // 설정 생성
    const settings = createSettingsForLevel(level, prefersReducedMotion);

    return { level, score, settings };
  }

  function createSettingsForLevel(level: 'high' | 'medium' | 'low', reducedMotion: boolean) {
    const baseSettings = {
      high: {
        animationDuration: 0.6,
        enableParallax: true,
        enableComplexAnimations: true,
        enableTransforms3D: true,
        quality: 'high' as const
      },
      medium: {
        animationDuration: 0.4,
        enableParallax: true,
        enableComplexAnimations: false,
        enableTransforms3D: true,
        quality: 'medium' as const
      },
      low: {
        animationDuration: 0.2,
        enableParallax: false,
        enableComplexAnimations: false,
        enableTransforms3D: false,
        quality: 'low' as const
      }
    };

    const settings = { ...baseSettings[level], reducedMotion };

    // 모션 감소 설정이 활성화된 경우
    if (reducedMotion) {
      settings.animationDuration = 0.1;
      settings.enableParallax = false;
      settings.enableComplexAnimations = false;
    }

    return settings;
  }

  // adaptive 설정 생성
  const adaptiveSettings = React.useMemo(() => {
    const config = getOptimizedAnimationConfig();
    
    return {
      ...config,
      ...performanceLevel.settings,
      // Framer Motion 설정
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: performanceLevel.settings.animationDuration,
      },
      // GPU 가속 스타일
      style: performanceLevel.settings.enableTransforms3D ? {
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      } : {},
      // 클래스명
      className: [
        performanceLevel.level === 'low' && 'low-performance',
        isAndroid && 'android-optimized',
        isLowPerformance && 'fallback-mode'
      ].filter(Boolean).join(' ')
    };
  }, [performanceLevel, isAndroid, isLowPerformance]);

  // 성능 저하 감지 시 호출
  const updatePerformanceLevel = useCallback((metrics: PerformanceMetrics) => {
    if (metrics.fps < 20 || metrics.memoryUsage > 90) {
      setIsLowPerformance(true);
      // 더 낮은 성능 레벨로 강등
      if (performanceLevel.level !== 'low') {
        const newLevel = performanceLevel.level === 'high' ? 'medium' : 'low';
        setPerformanceLevel(prev => ({
          ...prev,
          level: newLevel,
          settings: createSettingsForLevel(newLevel, prev.settings.reducedMotion)
        }));
      }
    } else if (metrics.fps >= 50 && metrics.memoryUsage < 70) {
      setIsLowPerformance(false);
    }
  }, [performanceLevel.level]);

  const enableFallbackMode = () => {
    setIsLowPerformance(true);
    document.body.classList.add('fallback-mode');
    
    // 모든 애니메이션 비활성화
    const style = document.createElement('style');
    style.id = 'fallback-mode-styles';
    style.textContent = `
      .fallback-mode * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
        transform: none !important;
      }
      .fallback-mode .parallax-disabled {
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  const disableFallbackMode = () => {
    setIsLowPerformance(false);
    document.body.classList.remove('fallback-mode');
    
    const fallbackStyles = document.getElementById('fallback-mode-styles');
    if (fallbackStyles) {
      document.head.removeChild(fallbackStyles);
    }
  };

  // 초기 성능 레벨 적용
  useEffect(() => {
    const className = `performance-${performanceLevel.level}`;
    document.body.classList.add(className);
    
    if (isAndroid) {
      document.body.classList.add('android-device');
    }

    return () => {
      document.body.classList.remove(className);
      if (isAndroid) {
        document.body.classList.remove('android-device');
      }
    };
  }, [performanceLevel.level, isAndroid]);

  // 성능 저하 감지
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // 메모리 사용량 체크
        const performanceMemory = (performance as Performance & { 
          memory?: { 
            usedJSHeapSize: number; 
            jsHeapSizeLimit: number; 
          } 
        }).memory;
        const memoryUsage = performanceMemory 
          ? (performanceMemory.usedJSHeapSize / performanceMemory.jsHeapSizeLimit) * 100
          : 0;

        updatePerformanceLevel({ fps, memoryUsage });
      }

      animationFrame = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [updatePerformanceLevel]);

  const value: PerformanceContextType = {
    performanceLevel,
    isAndroid,
    isLowPerformance,
    adaptiveSettings,
    enableFallbackMode,
    disableFallbackMode,
    updatePerformanceLevel
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

// 성능 기반 컴포넌트 HOC
export function withPerformanceOptimization<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function PerformanceOptimizedComponent(props: P) {
    const { adaptiveSettings, isLowPerformance } = usePerformance();

    // 성능이 낮은 경우 간단한 버전 렌더링
    if (isLowPerformance) {
      return (
        <div className="fallback-component" style={adaptiveSettings.style}>
          <Component {...props} />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

export default PerformanceProvider;