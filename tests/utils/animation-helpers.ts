import { Page, expect } from '@playwright/test';

/**
 * 모바일 섹션 애니메이션 테스트 전용 헬퍼 유틸리티
 * Android/iOS 특화 애니메이션 성능 및 시각적 검증
 */

export interface AnimationMetrics {
  fps: number;
  jankFrames: number;
  averageFrameTime: number;
  maxFrameTime: number;
  totalDuration: number;
}

export interface TouchGestureResult {
  success: boolean;
  duration: number;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
}

/**
 * 텍스트 모핑 애니메이션 검증 (MobileHeroSection)
 */
export async function validateTextMorphingAnimation(page: Page): Promise<boolean> {
  const morphingElement = page.locator('[class*="text-5xl"][class*="gpu-accelerated"]');
  
  // 초기 텍스트 저장
  const initialText = await morphingElement.textContent();
  
  // 애니메이션 실행을 위해 4.5초 대기
  await page.waitForTimeout(4500);
  
  // 텍스트 변경 확인
  const changedText = await morphingElement.textContent();
  const hasChanged = changedText !== initialText;
  
  // CSS transition 속성 확인
  const hasTransition = await morphingElement.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.transition.includes('opacity') || style.transition.includes('transform');
  });
  
  // GPU 가속 확인
  const hasGPUAcceleration = await morphingElement.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.willChange === 'opacity, transform' || 
           style.transform.includes('translate3d') ||
           style.backfaceVisibility === 'hidden';
  });
  
  return hasChanged && hasTransition && hasGPUAcceleration;
}

/**
 * Parallax 스크롤 효과 검증 (MobileStatsSection)
 */
export async function validateParallaxScrollEffect(page: Page, sectionId: string): Promise<boolean> {
  const section = page.locator(`#${sectionId}`);
  await section.scrollIntoViewIfNeeded();
  
  // Parallax 요소들 찾기
  const parallaxElements = section.locator('[style*="y:"], [class*="gpu-accelerated"]');
  const elementCount = await parallaxElements.count();
  
  if (elementCount === 0) return false;
  
  // 스크롤 전 위치 기록
  const beforePositions = [];
  for (let i = 0; i < Math.min(elementCount, 5); i++) {
    const box = await parallaxElements.nth(i).boundingBox();
    beforePositions.push(box?.y || 0);
  }
  
  // 스크롤 수행
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(300);
  
  // 스크롤 후 위치 확인
  let positionChanged = false;
  for (let i = 0; i < Math.min(elementCount, 5); i++) {
    const box = await parallaxElements.nth(i).boundingBox();
    const currentY = box?.y || 0;
    if (Math.abs(currentY - beforePositions[i]) > 1) {
      positionChanged = true;
      break;
    }
  }
  
  return positionChanged;
}

/**
 * 무한 캐러셀 애니메이션 검증 (MobileCarouselSection)
 */
export async function validateInfiniteCarousel(page: Page): Promise<AnimationMetrics> {
  const carouselContainer = page.locator('#carousel .flex.gap-4');
  
  // requestAnimationFrame 기반 성능 측정
  const metrics = await page.evaluate(() => {
    return new Promise<AnimationMetrics>((resolve) => {
      let frameCount = 0;
      let jankFrames = 0;
      let frameTimes: number[] = [];
      let lastTime = performance.now();
      const startTime = lastTime;
      
      const measureFrame = (currentTime: number) => {
        frameCount++;
        const frameTime = currentTime - lastTime;
        frameTimes.push(frameTime);
        
        // 16.67ms (60fps) 기준으로 지연 감지
        if (frameTime > 20) {
          jankFrames++;
        }
        
        lastTime = currentTime;
        
        if (frameCount < 120) { // 2초간 측정
          requestAnimationFrame(measureFrame);
        } else {
          const totalDuration = currentTime - startTime;
          const averageFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length;
          const maxFrameTime = Math.max(...frameTimes);
          const fps = Math.round(1000 / averageFrameTime);
          
          resolve({
            fps,
            jankFrames,
            averageFrameTime,
            maxFrameTime,
            totalDuration
          });
        }
      };
      
      requestAnimationFrame(measureFrame);
    });
  });
  
  return metrics;
}

/**
 * 아코디언 애니메이션 검증 (MobileFAQSection)
 */
export async function validateAccordionAnimation(page: Page, faqIndex: number): Promise<boolean> {
  const faqItems = page.locator('#faq [class*="cursor-pointer"]');
  const targetFAQ = faqItems.nth(faqIndex);
  
  // 클릭 전 높이 측정
  const contentElement = targetFAQ.locator('[class*="overflow-hidden"]');
  const beforeHeight = await contentElement.evaluate(el => el.getBoundingClientRect().height);
  
  // FAQ 클릭
  await targetFAQ.click();
  
  // 애니메이션 완료 대기
  await page.waitForTimeout(500);
  
  // 클릭 후 높이 측정
  const afterHeight = await contentElement.evaluate(el => el.getBoundingClientRect().height);
  
  // 높이 변화 확인 (토글됨)
  const heightChanged = Math.abs(afterHeight - beforeHeight) > 10;
  
  // CSS transition 확인
  const hasTransition = await contentElement.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.transition.includes('height') || style.transition.includes('opacity');
  });
  
  return heightChanged && hasTransition;
}

/**
 * 터치 제스처 시뮬레이션 및 검증
 */
export async function simulateAndValidateTouch(
  page: Page, 
  elementSelector: string,
  gestureType: 'tap' | 'swipe' | 'longpress'
): Promise<TouchGestureResult> {
  const element = page.locator(elementSelector);
  await expect(element).toBeVisible();
  
  const boundingBox = await element.boundingBox();
  if (!boundingBox) {
    return { success: false, duration: 0, startPosition: { x: 0, y: 0 }, endPosition: { x: 0, y: 0 } };
  }
  
  const centerX = boundingBox.x + boundingBox.width / 2;
  const centerY = boundingBox.y + boundingBox.height / 2;
  
  const startTime = Date.now();
  let endPosition = { x: centerX, y: centerY };
  
  try {
    switch (gestureType) {
      case 'tap':
        await page.touchscreen.tap(centerX, centerY);
        break;
        
      case 'swipe':
        await page.touchscreen.tap(centerX, centerY);
        endPosition = { x: centerX + 100, y: centerY };
        await page.touchscreen.tap(endPosition.x, endPosition.y);
        break;
        
      case 'longpress':
        await page.mouse.move(centerX, centerY);
        await page.mouse.down();
        await page.waitForTimeout(800); // Long press duration
        await page.mouse.up();
        break;
    }
    
    const duration = Date.now() - startTime;
    
    return {
      success: true,
      duration,
      startPosition: { x: centerX, y: centerY },
      endPosition
    };
  } catch (error) {
    return {
      success: false,
      duration: Date.now() - startTime,
      startPosition: { x: centerX, y: centerY },
      endPosition
    };
  }
}

/**
 * GPU 가속 설정 검증
 */
export async function validateGPUAcceleration(page: Page, elementSelector: string): Promise<boolean> {
  const element = page.locator(elementSelector);
  await expect(element).toBeVisible();
  
  return await element.evaluate(el => {
    const style = window.getComputedStyle(el);
    
    // GPU 가속 관련 CSS 속성 확인
    const hasTransform3d = style.transform.includes('translate3d') || 
                           style.transform.includes('translateZ');
    const hasWillChange = style.willChange.includes('transform') || 
                          style.willChange.includes('opacity');
    const hasBackfaceHidden = style.backfaceVisibility === 'hidden';
    const hasPerspective = style.perspective !== 'none';
    
    // 클래스 기반 확인
    const hasGPUClass = el.classList.contains('gpu-accelerated');
    
    return hasTransform3d || hasWillChange || hasBackfaceHidden || hasPerspective || hasGPUClass;
  });
}

/**
 * 터치 타겟 크기 검증 (Android 44px 규칙)
 */
export async function validateTouchTargetSize(page: Page, elementSelector: string): Promise<boolean> {
  const elements = page.locator(elementSelector);
  const count = await elements.count();
  
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const boundingBox = await element.boundingBox();
    
    if (!boundingBox) continue;
    
    // Android 가이드라인: 최소 44px x 44px
    if (boundingBox.width < 44 || boundingBox.height < 44) {
      return false;
    }
  }
  
  return true;
}

/**
 * 스크롤 지연 없는 부드러움 검증
 */
export async function validateSmoothScrolling(page: Page): Promise<AnimationMetrics> {
  // 스크롤 성능 측정을 위한 설정
  const metrics = await page.evaluate(() => {
    return new Promise<AnimationMetrics>((resolve) => {
      let frameCount = 0;
      let jankFrames = 0;
      let frameTimes: number[] = [];
      let lastTime = performance.now();
      const startTime = lastTime;
      
      // 스크롤 이벤트 시작
      window.scrollTo(0, 100);
      
      const measureScroll = (currentTime: number) => {
        frameCount++;
        const frameTime = currentTime - lastTime;
        frameTimes.push(frameTime);
        
        // 16.67ms (60fps) 기준
        if (frameTime > 20) {
          jankFrames++;
        }
        
        lastTime = currentTime;
        
        if (frameCount < 60) { // 1초간 측정
          // 계속 스크롤
          window.scrollTo(0, window.scrollY + 2);
          requestAnimationFrame(measureScroll);
        } else {
          const totalDuration = currentTime - startTime;
          const averageFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length;
          const maxFrameTime = Math.max(...frameTimes);
          const fps = Math.round(1000 / averageFrameTime);
          
          resolve({
            fps,
            jankFrames,
            averageFrameTime,
            maxFrameTime,
            totalDuration
          });
        }
      };
      
      requestAnimationFrame(measureScroll);
    });
  });
  
  return metrics;
}

/**
 * 반응형 브레이크포인트 검증
 */
export async function validateResponsiveBreakpoints(page: Page): Promise<{
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentWidth: number;
}> {
  return await page.evaluate(() => {
    const width = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      currentWidth: width
    };
  });
}

/**
 * 애니메이션 프레임 드롭 검출
 */
export async function detectFrameDrops(page: Page, durationMs: number = 2000): Promise<{
  totalFrames: number;
  droppedFrames: number;
  frameDropRate: number;
  averageFPS: number;
}> {
  const result = await page.evaluate((duration) => {
    return new Promise<any>((resolve) => {
      let frameCount = 0;
      let droppedFrames = 0;
      let lastTime = performance.now();
      const startTime = lastTime;
      const expectedInterval = 16.67; // 60fps
      
      const countFrames = (currentTime: number) => {
        frameCount++;
        const interval = currentTime - lastTime;
        
        // 예상 간격보다 50% 이상 지연된 경우 드롭으로 간주
        if (interval > expectedInterval * 1.5) {
          droppedFrames += Math.floor(interval / expectedInterval) - 1;
        }
        
        lastTime = currentTime;
        
        if (currentTime - startTime < duration) {
          requestAnimationFrame(countFrames);
        } else {
          const totalDuration = currentTime - startTime;
          const frameDropRate = (droppedFrames / frameCount) * 100;
          const averageFPS = Math.round((frameCount / totalDuration) * 1000);
          
          resolve({
            totalFrames: frameCount,
            droppedFrames,
            frameDropRate,
            averageFPS
          });
        }
      };
      
      requestAnimationFrame(countFrames);
    });
  }, durationMs);
  
  return result;
}

/**
 * CSS 애니메이션 성능 프로파일링
 */
export async function profileCSSAnimations(page: Page, elementSelector: string): Promise<{
  hasHardwareAcceleration: boolean;
  animationProperties: string[];
  transitionProperties: string[];
  willChangeValue: string;
  transformValue: string;
}> {
  const element = page.locator(elementSelector);
  await expect(element).toBeVisible();
  
  return await element.evaluate(el => {
    const style = window.getComputedStyle(el);
    
    return {
      hasHardwareAcceleration: style.transform.includes('translate3d') || 
                               style.backfaceVisibility === 'hidden' ||
                               style.willChange.includes('transform'),
      animationProperties: style.animation.split(',').map(prop => prop.trim()).filter(Boolean),
      transitionProperties: style.transition.split(',').map(prop => prop.trim()).filter(Boolean),
      willChangeValue: style.willChange,
      transformValue: style.transform
    };
  });
}