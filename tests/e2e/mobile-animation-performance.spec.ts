import { test, expect } from '@playwright/test';
import { 
  getDeviceInfo, 
  waitForMobileSectionsToLoad,
  takeDeviceScreenshot 
} from '../utils/device-helpers';
import {
  validateTextMorphingAnimation,
  validateParallaxScrollEffect,
  validateInfiniteCarousel,
  validateAccordionAnimation,
  simulateAndValidateTouch,
  validateGPUAcceleration,
  validateTouchTargetSize,
  validateSmoothScrolling,
  detectFrameDrops,
  profileCSSAnimations
} from '../utils/animation-helpers';

/**
 * 모바일 섹션 애니메이션 성능 전문 테스트
 * Android/iOS 특화 애니메이션 품질 및 성능 검증
 */

test.describe('Mobile Animation Performance Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // 성능 측정을 위한 초기 설정
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
    
    // 애니메이션 초기화 대기
    await page.waitForTimeout(1500);
  });

  test.describe('MobileHeroSection - 텍스트 모핑 성능', () => {
    
    test('텍스트 모핑 애니메이션 성능 검증', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // Hero 섹션으로 이동
      await page.locator('section:has(.mobile-hero-section)').first().scrollIntoViewIfNeeded();
      
      // 텍스트 모핑 애니메이션 검증
      const isValidAnimation = await validateTextMorphingAnimation(page);
      expect(isValidAnimation).toBe(true);
      
      // GPU 가속 설정 확인
      const hasGPUAcceleration = await validateGPUAcceleration(
        page, 
        '[class*="text-5xl"][class*="gpu-accelerated"]'
      );
      expect(hasGPUAcceleration).toBe(true);
      
      // CSS 애니메이션 프로파일링
      const animationProfile = await profileCSSAnimations(
        page, 
        '[class*="text-5xl"][class*="gpu-accelerated"]'
      );
      
      expect(animationProfile.hasHardwareAcceleration).toBe(true);
      expect(animationProfile.willChangeValue).toContain('opacity');
      
      console.log(`Hero Text Animation Profile:`, animationProfile);
    });

    test('CTA 버튼 터치 인터랙션 성능', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // CTA 버튼 터치 타겟 크기 검증
      const isValidTouchTarget = await validateTouchTargetSize(
        page, 
        'button:has-text("문의하기")'
      );
      expect(isValidTouchTarget).toBe(true);
      
      // 터치 제스처 시뮬레이션
      const touchResult = await simulateAndValidateTouch(
        page, 
        'button:has-text("문의하기")', 
        'tap'
      );
      
      expect(touchResult.success).toBe(true);
      expect(touchResult.duration).toBeLessThan(200); // 200ms 미만의 반응 시간
      
      console.log(`CTA Button Touch Performance:`, touchResult);
    });
  });

  test.describe('MobileStatsSection - Parallax 성능', () => {
    
    test('Parallax 스크롤 효과 성능 측정', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // Stats 섹션으로 이동
      await page.locator('#stats').scrollIntoViewIfNeeded();
      
      // Parallax 효과 검증
      const hasValidParallax = await validateParallaxScrollEffect(page, 'stats');
      expect(hasValidParallax).toBe(true);
      
      // 스크롤 성능 측정
      const scrollMetrics = await validateSmoothScrolling(page);
      
      // 성능 기준 확인 (모바일에서 최소 45fps)
      expect(scrollMetrics.fps).toBeGreaterThan(45);
      expect(scrollMetrics.jankFrames).toBeLessThan(5);
      expect(scrollMetrics.averageFrameTime).toBeLessThan(22); // ~45fps
      
      console.log(`Stats Parallax Performance:`, scrollMetrics);
    });

    test('통계 카드 GPU 가속 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#stats').scrollIntoViewIfNeeded();
      
      // 각 통계 카드의 GPU 가속 확인
      const statsCards = page.locator('#stats [class*="gpu-accelerated"]');
      const cardCount = await statsCards.count();
      
      expect(cardCount).toBeGreaterThan(0);
      
      for (let i = 0; i < Math.min(cardCount, 5); i++) {
        const hasGPU = await validateGPUAcceleration(
          page, 
          `#stats [class*="gpu-accelerated"]:nth-child(${i + 1})`
        );
        expect(hasGPU).toBe(true);
      }
    });
  });

  test.describe('MobileCarouselSection - 무한 스크롤 성능', () => {
    
    test('무한 캐러셀 애니메이션 성능 측정', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // Carousel 섹션으로 이동
      await page.locator('#carousel').scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      // 무한 캐러셀 성능 측정
      const carouselMetrics = await validateInfiniteCarousel(page);
      
      // 성능 기준 확인
      expect(carouselMetrics.fps).toBeGreaterThan(50); // 최소 50fps
      expect(carouselMetrics.jankFrames).toBeLessThan(8); // 지연 프레임 8개 미만
      expect(carouselMetrics.averageFrameTime).toBeLessThan(20); // 평균 20ms 미만
      
      console.log(`Carousel Animation Metrics:`, carouselMetrics);
      
      // 프레임 드롭 검출
      const frameDrops = await detectFrameDrops(page, 3000);
      expect(frameDrops.frameDropRate).toBeLessThan(5); // 5% 미만의 프레임 드롭
      
      console.log(`Carousel Frame Drops:`, frameDrops);
    });

    test('캐러셀 네비게이션 버튼 성능', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#carousel').scrollIntoViewIfNeeded();
      
      // 네비게이션 버튼 터치 타겟 검증
      const isValidNavButtons = await validateTouchTargetSize(
        page, 
        '#carousel button'
      );
      expect(isValidNavButtons).toBe(true);
      
      // Next 버튼 터치 성능 측정
      const nextButtonTouch = await simulateAndValidateTouch(
        page, 
        '#carousel button:has-text(">")', 
        'tap'
      );
      
      expect(nextButtonTouch.success).toBe(true);
      expect(nextButtonTouch.duration).toBeLessThan(150);
      
      // 버튼 클릭 후 애니메이션 성능 측정
      await page.waitForTimeout(800); // 애니메이션 완료 대기
      
      const postClickMetrics = await detectFrameDrops(page, 1000);
      expect(postClickMetrics.averageFPS).toBeGreaterThan(50);
      
      console.log(`Navigation Button Performance:`, nextButtonTouch);
    });
  });

  test.describe('MobileProgressSection - 탭 전환 성능', () => {
    
    test('진행 단계 탭 전환 애니메이션', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#progress').scrollIntoViewIfNeeded();
      
      // 탭 버튼 터치 타겟 검증
      const isValidTabButtons = await validateTouchTargetSize(
        page, 
        '#progress button[class*="touch-optimized"]'
      );
      expect(isValidTabButtons).toBe(true);
      
      // 탭 전환 성능 측정
      const tabButtons = page.locator('#progress button[class*="touch-optimized"]');
      const buttonCount = await tabButtons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const touchResult = await simulateAndValidateTouch(
          page, 
          `#progress button[class*="touch-optimized"]:nth-child(${i + 1})`, 
          'tap'
        );
        
        expect(touchResult.success).toBe(true);
        expect(touchResult.duration).toBeLessThan(100);
        
        await page.waitForTimeout(300); // 전환 애니메이션 대기
      }
    });

    test('이미지 영역 터치 반응성', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#progress').scrollIntoViewIfNeeded();
      
      // 이미지 영역 GPU 가속 확인
      const hasGPU = await validateGPUAcceleration(
        page, 
        '#progress [class*="cursor-pointer"]'
      );
      expect(hasGPU).toBe(true);
      
      // 터치 제스처 시뮬레이션
      const touchResult = await simulateAndValidateTouch(
        page, 
        '#progress [class*="cursor-pointer"]', 
        'tap'
      );
      
      expect(touchResult.success).toBe(true);
    });
  });

  test.describe('MobileCardsSection - 순차 애니메이션 성능', () => {
    
    test('카드 섹션 순차 로딩 애니메이션', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // Cards 섹션으로 이동 (처음에는 화면 밖에 있음)
      await page.locator('#cards').scrollIntoViewIfNeeded();
      
      // GPU 가속 요소들 확인
      const gpuElements = page.locator('#cards [class*="gpu-accelerated"]');
      const gpuCount = await gpuElements.count();
      expect(gpuCount).toBeGreaterThan(0);
      
      // 각 GPU 가속 요소의 설정 확인
      for (let i = 0; i < Math.min(gpuCount, 5); i++) {
        const hasGPU = await gpuElements.nth(i).evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.willChange.includes('transform') || 
                 style.willChange.includes('opacity') ||
                 style.transform.includes('translate3d');
        });
        expect(hasGPU).toBe(true);
      }
      
      // 순차 애니메이션 동안 프레임 드롭 측정
      const frameDrops = await detectFrameDrops(page, 2000);
      expect(frameDrops.frameDropRate).toBeLessThan(3);
      
      console.log(`Cards Section Animation Performance:`, frameDrops);
    });

    test('CTA 버튼 애니메이션 성능', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // CTA 섹션으로 이동
      await page.locator('button:has-text("바로가기")').scrollIntoViewIfNeeded();
      
      // CTA 버튼 성능 프로파일링
      const buttonProfile = await profileCSSAnimations(
        page, 
        'button:has-text("바로가기")'
      );
      
      expect(buttonProfile.hasHardwareAcceleration).toBe(true);
      
      // 호버/탭 효과 성능 측정
      const hoverTouch = await simulateAndValidateTouch(
        page, 
        'button:has-text("바로가기")', 
        'tap'
      );
      
      expect(hoverTouch.success).toBe(true);
      expect(hoverTouch.duration).toBeLessThan(120);
      
      console.log(`CTA Button Profile:`, buttonProfile);
    });
  });

  test.describe('MobileFAQSection - 아코디언 성능', () => {
    
    test('FAQ 아코디언 전환 애니메이션 성능', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#faq').scrollIntoViewIfNeeded();
      
      // 여러 FAQ 아코디언 전환 테스트
      for (let i = 1; i < 4; i++) {
        const isValidAnimation = await validateAccordionAnimation(page, i);
        expect(isValidAnimation).toBe(true);
        
        await page.waitForTimeout(400); // 애니메이션 완료 대기
      }
      
      // 아코디언 전환 중 프레임 성능 측정
      const frameMetrics = await detectFrameDrops(page, 1500);
      expect(frameMetrics.averageFPS).toBeGreaterThan(45);
      expect(frameMetrics.frameDropRate).toBeLessThan(8);
      
      console.log(`FAQ Accordion Performance:`, frameMetrics);
    });

    test('FAQ 아이템 터치 타겟 및 반응성', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#faq').scrollIntoViewIfNeeded();
      
      // 모든 FAQ 아이템의 터치 타겟 검증
      const isValidTouchTargets = await validateTouchTargetSize(
        page, 
        '#faq [class*="cursor-pointer"]'
      );
      expect(isValidTouchTargets).toBe(true);
      
      // GPU 가속 설정 확인
      const faqItems = page.locator('#faq [class*="cursor-pointer"]');
      const itemCount = await faqItems.count();
      
      for (let i = 0; i < Math.min(itemCount, 3); i++) {
        const hasGPU = await faqItems.nth(i).evaluate(el => {
          return el.classList.contains('gpu-accelerated') ||
                 window.getComputedStyle(el).willChange !== 'auto';
        });
        expect(hasGPU).toBe(true);
      }
    });
  });

  test.describe('크로스 섹션 성능 통합 테스트', () => {
    
    test('전체 페이지 스크롤 성능 측정', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 전체 페이지 스크롤 성능 측정
      const scrollMetrics = await page.evaluate(() => {
        return new Promise<any>((resolve) => {
          let frameCount = 0;
          let jankFrames = 0;
          let lastTime = performance.now();
          const startTime = lastTime;
          let scrollPosition = 0;
          
          const measureScrollPerformance = (currentTime: number) => {
            frameCount++;
            const frameTime = currentTime - lastTime;
            
            if (frameTime > 20) {
              jankFrames++;
            }
            
            // 점진적 스크롤
            scrollPosition += 3;
            window.scrollTo(0, scrollPosition);
            
            lastTime = currentTime;
            
            if (frameCount < 200 && scrollPosition < 3000) { // 전체 페이지 스크롤
              requestAnimationFrame(measureScrollPerformance);
            } else {
              const totalDuration = currentTime - startTime;
              const fps = Math.round((frameCount / totalDuration) * 1000);
              const jankRate = (jankFrames / frameCount) * 100;
              
              resolve({
                fps,
                jankFrames,
                jankRate,
                totalFrames: frameCount,
                duration: totalDuration
              });
            }
          };
          
          requestAnimationFrame(measureScrollPerformance);
        });
      });
      
      // 전체 페이지 성능 기준
      expect(scrollMetrics.fps).toBeGreaterThan(40); // 최소 40fps
      expect(scrollMetrics.jankRate).toBeLessThan(10); // 10% 미만 지연
      
      console.log(`Full Page Scroll Performance:`, scrollMetrics);
      
      // 성능 결과를 바탕으로 최종 스크린샷
      await takeDeviceScreenshot(page, 'performance-test-complete', testInfo.project.name);
    });

    test('메모리 및 CPU 사용량 모니터링', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 성능 메트릭 수집 (JavaScript heap, DOM nodes 등)
      const memoryMetrics = await page.evaluate(() => {
        const performance = (window as any).performance;
        const memory = performance.memory;
        
        return {
          usedJSHeapSize: memory?.usedJSHeapSize || 0,
          totalJSHeapSize: memory?.totalJSHeapSize || 0,
          jsHeapSizeLimit: memory?.jsHeapSizeLimit || 0,
          domNodes: document.querySelectorAll('*').length,
          images: document.querySelectorAll('img').length,
          animations: document.querySelectorAll('[class*="gpu-accelerated"]').length
        };
      });
      
      // 메모리 사용량 확인 (50MB 미만)
      const usedMB = memoryMetrics.usedJSHeapSize / (1024 * 1024);
      expect(usedMB).toBeLessThan(50);
      
      // DOM 복잡도 확인
      expect(memoryMetrics.domNodes).toBeLessThan(2000);
      expect(memoryMetrics.animations).toBeGreaterThan(5);
      
      console.log(`Memory Metrics:`, {
        ...memoryMetrics,
        usedMB: Math.round(usedMB * 100) / 100
      });
    });
  });
});