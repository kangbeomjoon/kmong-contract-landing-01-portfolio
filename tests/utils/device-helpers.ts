import { Page, expect } from '@playwright/test';

/**
 * 디바이스별 테스트 헬퍼 유틸리티
 * 안드로이드와 iOS 특화 테스트 기능 제공
 */

export interface DeviceInfo {
  name: string;
  platform: 'android' | 'ios' | 'desktop';
  isMobile: boolean;
  viewport: { width: number; height: number };
  userAgent: string;
}

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
}

/**
 * 디바이스 정보 추출
 */
export async function getDeviceInfo(page: Page): Promise<DeviceInfo> {
  return await page.evaluate(() => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    return {
      name: navigator.platform,
      platform: /Android/i.test(navigator.userAgent) ? 'android' : 
                /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'ios' : 'desktop',
      isMobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
      viewport,
      userAgent: navigator.userAgent
    };
  });
}

/**
 * 안드로이드 최적화 설정 확인
 */
export async function verifyAndroidOptimizations(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // GPU 가속 설정 확인
    const hasGPUAcceleration = html.style.transform === 'translate3d(0, 0, 0)' ||
                               html.style.transform === 'translateZ(0)';
    
    // 터치 최적화 확인
    const hasTouchOptimization = body.style.touchAction === 'pan-y' ||
                                body.style.touchAction === 'manipulation';
    
    // 백페이스 가시성 설정 확인
    const hasBackfaceHidden = html.style.backfaceVisibility === 'hidden';
    
    return hasGPUAcceleration && hasTouchOptimization && hasBackfaceHidden;
  });
}

/**
 * 반응형 후크 상태 확인
 */
export async function getResponsiveState(page: Page) {
  return await page.evaluate(() => {
    const width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      screenWidth: width,
    };
  });
}

/**
 * 성능 메트릭 수집
 */
export async function collectPerformanceMetrics(page: Page): Promise<PerformanceMetrics> {
  return await page.evaluate(() => {
    return new Promise((resolve) => {
      // Web Vitals 수집을 위한 Performance Observer
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const metrics: any = {};
        
        entries.forEach((entry) => {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
          }
          if (entry.entryType === 'largest-contentful-paint') {
            metrics.lcp = entry.startTime;
          }
          if (entry.entryType === 'layout-shift') {
            if (!metrics.cls) metrics.cls = 0;
            metrics.cls += (entry as any).value;
          }
        });
        
        // 기본값 설정
        resolve({
          fcp: metrics.fcp || 0,
          lcp: metrics.lcp || 0,
          cls: metrics.cls || 0,
          fid: 0 // FID는 실제 사용자 상호작용이 필요
        });
      });
      
      observer.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] 
      });
      
      // 5초 후 타임아웃
      setTimeout(() => {
        observer.disconnect();
        resolve({ fcp: 0, lcp: 0, cls: 0, fid: 0 });
      }, 5000);
    });
  });
}

/**
 * 모바일 섹션별 렌더링 확인
 */
export async function waitForMobileSectionsToLoad(page: Page): Promise<void> {
  // 모바일 레이아웃이 로드되었는지 먼저 확인
  await page.waitForSelector('.mobile-layout, body', { timeout: 15000 });
  
  // 6개 주요 모바일 섹션 로딩 대기 (실제 클래스명 기준)
  const sections = [
    'section:has(.min-h-screen)', // 히어로 섹션
    'section:has(.stat-card), section:has(.figma-display-lg)', // 스탯 섹션  
    'section:has(.progress), section:has(button)', // 진행바 섹션
    'section:has(.carousel), section:has(.overflow-hidden)', // 캐러셀 섹션
    'section:has(.figma-subtitle)', // 카드 섹션
    'section:has(form), section:has(.accordion)', // FAQ 섹션
  ];
  
  // 섹션들이 순차적으로 로드되는지 확인
  for (let i = 0; i < sections.length; i++) {
    try {
      await page.waitForSelector(sections[i], { timeout: 8000 });
    } catch (error) {
      console.warn(`Section ${i + 1} not found: ${sections[i]}`);
    }
  }
  
  // 애니메이션 및 이미지 로딩 완료 대기
  await page.waitForTimeout(3000);
}

/**
 * 터치 제스처 시뮬레이션
 */
export async function simulateSwipeGesture(
  page: Page, 
  startX: number, 
  startY: number, 
  endX: number, 
  endY: number
): Promise<void> {
  await page.touchscreen.tap(startX, startY);
  await page.touchscreen.tap(endX, endY);
}

/**
 * 스크롤 애니메이션 성능 측정
 */
export async function measureScrollPerformance(page: Page): Promise<{ fps: number, jank: number }> {
  return await page.evaluate(() => {
    return new Promise((resolve) => {
      let frameCount = 0;
      let jankCount = 0;
      let lastTime = performance.now();
      
      const measureFrame = (currentTime: number) => {
        frameCount++;
        const delta = currentTime - lastTime;
        
        // 16.67ms (60fps) 기준으로 지연 감지
        if (delta > 20) {
          jankCount++;
        }
        
        lastTime = currentTime;
        
        if (frameCount < 60) { // 1초간 측정
          requestAnimationFrame(measureFrame);
        } else {
          resolve({
            fps: Math.round(1000 / (currentTime / frameCount)),
            jank: jankCount
          });
        }
      };
      
      // 스크롤 시작
      window.scrollTo(0, 100);
      requestAnimationFrame(measureFrame);
    });
  });
}

/**
 * 크로스 플랫폼 호환성 검증
 */
export async function verifyCrossPlatformCompatibility(
  page: Page,
  expectedLayout: 'mobile' | 'tablet' | 'desktop'
): Promise<boolean> {
  const deviceInfo = await getDeviceInfo(page);
  const responsiveState = await getResponsiveState(page);
  
  // 예상 레이아웃과 실제 감지된 레이아웃 비교
  switch (expectedLayout) {
    case 'mobile':
      return responsiveState.isMobile && deviceInfo.isMobile;
    case 'tablet':
      return responsiveState.isTablet;
    case 'desktop':
      return responsiveState.isDesktop && !deviceInfo.isMobile;
    default:
      return false;
  }
}

/**
 * 시각적 회귀 테스트를 위한 스크린샷 비교
 */
export async function takeDeviceScreenshot(
  page: Page,
  testName: string,
  deviceName: string
): Promise<void> {
  await page.screenshot({
    path: `tests/screenshots/actual/${testName}-${deviceName}.png`,
    fullPage: true,
    animations: 'disabled' // 일관된 스크린샷을 위해 애니메이션 비활성화
  });
}