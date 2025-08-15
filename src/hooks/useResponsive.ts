'use client';

import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      // Android-optimized viewport detection
      const width = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      
      // Handle Android dynamic viewport (address bar hide/show)
      const height = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
        window.screen?.height || 0
      );
      
      setState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
      });
    };

    // Initial check
    updateScreenSize();

    // Android-optimized resize handling with debouncing
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 100); // 100ms debounce for Android
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Also listen for orientation changes on mobile
    window.addEventListener('orientationchange', updateScreenSize);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateScreenSize);
    };
  }, []);

  return state;
};

// Helper hooks for specific breakpoints
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobileState = () => {
      // 개발 환경에서만 URL 파라미터 확인
      if (process.env.NODE_ENV === 'development') {
        const params = new URLSearchParams(window.location.search);
        const mobileParam = params.get('mobile');
        
        if (mobileParam === 'true') {
          setIsMobile(true);
          return;
        }
        
        if (mobileParam === 'false') {
          setIsMobile(false);
          return;
        }
      }
      
      // URL 파라미터가 없거나 프로덕션 환경에서는 자동 감지
      // Android-optimized viewport detection
      const width = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      setIsMobile(width < 768);
    };

    // Initial check
    updateMobileState();

    // URL 변경 감지 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      const handlePopState = () => {
        updateMobileState();
      };
      window.addEventListener('popstate', handlePopState);
      
      // pushState, replaceState 감지를 위한 커스텀 이벤트
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      
      history.pushState = function(...args) {
        originalPushState.apply(history, args);
        setTimeout(updateMobileState, 0);
      };
      
      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args);
        setTimeout(updateMobileState, 0);
      };
      
      // Cleanup
      const cleanup = () => {
        window.removeEventListener('popstate', handlePopState);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
      
      return cleanup;
    }

    // 프로덕션 환경에서는 resize 이벤트만 감지
    const handleResize = () => {
      // Android-optimized viewport detection
      const width = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      setIsMobile(width < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const useIsTablet = (): boolean => {
  const { isTablet } = useResponsive();
  return isTablet;
};

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useResponsive();
  return isDesktop;
};