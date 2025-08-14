import { useState, useEffect, useRef } from 'react';

interface CounterOptions {
  target: number;
  duration?: number;
  easing?: (t: number) => number;
  startDelay?: number;
}

export const useMobileCounter = (options: CounterOptions) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const { target, duration = 2000, easing = (t: number) => t, startDelay = 0 } = options;

  // Intersection Observer for visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now() + startDelay;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      
      if (progress < 1) {
        const easedProgress = easing(progress);
        const currentCount = Math.round(target * easedProgress);
        setCount(currentCount);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, target, duration, easing, startDelay]);

  return { count, ref, isVisible };
};

// Easing functions
export const easingFunctions = {
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutQuart: (t: number) => 
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
};

// Format number helper
export const formatStatNumber = (num: number, type: 'default' | 'percentage' | 'currency') => {
  switch (type) {
    case 'percentage':
      return `${num}%`;
    case 'currency':
      if (num >= 10000) {
        return `${Math.floor(num / 10000)}조원`;
      } else if (num >= 100) {
        return `${Math.floor(num / 100)}억원`;
      }
      return `${num}억원`;
    default:
      if (num >= 1000) {
        return `${Math.floor(num / 100) / 10}K+`;
      }
      return `${num}+`;
  }
};