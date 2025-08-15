/**
 * Android-optimized animation configurations and utilities
 * Ensures smooth performance across Android devices with GPU acceleration and touch optimization
 */

// Android GPU acceleration configuration
export const androidGPUConfig = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden' as const,
  transform: 'translate3d(0, 0, 0)',
  perspective: '1000px'
};

// Android-optimized transition settings
export const androidTransition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.5, // Shorter duration for better Android performance
};

// Android-optimized Framer Motion variants
export const androidScrollVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Reduced from 30px for smoother Android animation
    scale: 0.98 // Subtle scale for performance
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...androidTransition,
      staggerChildren: 0.08 // Faster stagger for Android
    }
  }
};

export const androidFadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: androidTransition
  }
};

export const androidScaleVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 // Subtle scale for Android performance
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: androidTransition
  }
};

// Intersection Observer settings optimized for Android
export const androidInViewOptions = {
  threshold: 0.2, // Lower threshold for Android performance
  rootMargin: '-5% 0px -5% 0px',
  triggerOnce: true,
  delay: 50 // Small delay for Android rendering
};

// Touch optimization utilities
export const androidTouchConfig = {
  minHeight: '44px', // Android minimum touch target size
  minWidth: '44px',
  touchAction: 'manipulation' as const,
  WebkitTapHighlightColor: 'transparent',
  cursor: 'pointer'
};

// Android-specific CSS classes (should match globals.css)
export const androidClasses = {
  gpuAccelerated: 'gpu-accelerated',
  touchOptimized: 'touch-optimized', 
  smoothScroll: 'smooth-scroll'
};

// Animation duration helpers for Android
export const androidDurations = {
  fast: 0.2,
  medium: 0.4,
  slow: 0.6,
  parallax: 0.1 // Very fast for parallax on Android
};

// Android device detection utility
export const detectAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

// Android version detection for specific optimizations
export const getAndroidVersion = (): number | null => {
  if (typeof window === 'undefined') return null;
  const match = navigator.userAgent.match(/Android\s([0-9\.]*)/);
  return match ? parseFloat(match[1]) : null;
};

// Performance-aware animation configuration
export const getOptimizedAnimationConfig = () => {
  const isAndroid = detectAndroid();
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    duration: isAndroid ? androidDurations.medium : 0.6,
    ease: 'easeOut',
    type: 'tween',
    // Disable animations if user prefers reduced motion
    skipAnimation: prefersReducedMotion
  };
};

// Android-optimized Framer Motion props generator
export const createAndroidMotionProps = (
  variants: any,
  delay: number = 0,
  customTransition?: any
) => {
  const optimizedTransition = {
    ...androidTransition,
    delay: delay * 0.8, // Reduce delay for Android
    ...customTransition
  };

  return {
    variants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: androidInViewOptions,
    transition: optimizedTransition,
    style: androidGPUConfig,
    className: `${androidClasses.gpuAccelerated} ${androidClasses.touchOptimized}`
  };
};

// Carousel/Animation frame optimization for Android
export class AndroidAnimationFrame {
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  private targetFPS: number = 60;
  private frameInterval: number;

  constructor(targetFPS: number = 60) {
    this.targetFPS = targetFPS;
    this.frameInterval = 1000 / targetFPS;
  }

  start(callback: (currentTime: number) => void) {
    const animate = (currentTime: number) => {
      if (currentTime - this.lastTime >= this.frameInterval) {
        callback(currentTime);
        this.lastTime = currentTime;
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Android viewport utilities
export const androidViewportUtils = {
  // Handle Android Chrome dynamic viewport
  setDynamicVH: () => {
    if (typeof window === 'undefined') return;
    
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },

  // Get accurate viewport size for Android
  getViewportSize: () => {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    
    return {
      width: Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
      height: Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )
    };
  }
};

// Export all Android optimization utilities
export default {
  androidGPUConfig,
  androidTransition,
  androidScrollVariants,
  androidFadeVariants,
  androidScaleVariants,
  androidInViewOptions,
  androidTouchConfig,
  androidClasses,
  androidDurations,
  detectAndroid,
  getAndroidVersion,
  getOptimizedAnimationConfig,
  createAndroidMotionProps,
  AndroidAnimationFrame,
  androidViewportUtils
};