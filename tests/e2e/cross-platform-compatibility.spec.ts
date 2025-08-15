import { test, expect } from '@playwright/test';
import { 
  getDeviceInfo, 
  verifyAndroidOptimizations, 
  getResponsiveState,
  waitForMobileSectionsToLoad,
  takeDeviceScreenshot,
  verifyCrossPlatformCompatibility 
} from '../utils/device-helpers';

/**
 * 크로스 플랫폼 호환성 테스트
 * Android vs iOS 렌더링 일관성 검증
 */

test.describe('Cross-Platform Mobile Compatibility', () => {
  
  test.beforeEach(async ({ page }) => {
    // 모든 테스트 전에 홈페이지 로드
    await page.goto('/');
    
    // 모바일 섹션 로딩 대기
    await waitForMobileSectionsToLoad(page);
  });

  test('Android 디바이스에서 정상 렌더링 확인', async ({ page }, testInfo) => {
    // 안드로이드 디바이스에서만 실행
    test.skip(
      !testInfo.project.name.includes('Android'), 
      '안드로이드 디바이스 테스트가 아님'
    );

    const deviceInfo = await getDeviceInfo(page);
    const responsiveState = await getResponsiveState(page);
    
    // 디바이스 정보 확인
    expect(deviceInfo.platform).toBe('android');
    expect(deviceInfo.isMobile).toBe(true);
    
    // 반응형 상태 확인
    expect(responsiveState.isMobile).toBe(true);
    expect(responsiveState.screenWidth).toBeLessThan(768);
    
    // 안드로이드 최적화 적용 확인
    const hasOptimizations = await verifyAndroidOptimizations(page);
    expect(hasOptimizations).toBe(true);
    
    // 모바일 레이아웃 컴포넌트 확인
    await expect(page.locator('.mobile-layout')).toBeVisible();
    
    // 스크린샷 촬영
    await takeDeviceScreenshot(page, 'android-rendering', testInfo.project.name);
  });

  test('iOS 디바이스에서 정상 렌더링 확인', async ({ page }, testInfo) => {
    // iOS 디바이스에서만 실행
    test.skip(
      !testInfo.project.name.includes('iOS'), 
      'iOS 디바이스 테스트가 아님'
    );

    const deviceInfo = await getDeviceInfo(page);
    const responsiveState = await getResponsiveState(page);
    
    // 디바이스 정보 확인
    expect(deviceInfo.platform).toBe('ios');
    expect(deviceInfo.isMobile).toBe(true);
    
    // 반응형 상태 확인
    expect(responsiveState.isMobile).toBe(true);
    expect(responsiveState.screenWidth).toBeLessThan(768);
    
    // 모바일 레이아웃 컴포넌트 확인
    await expect(page.locator('.mobile-layout')).toBeVisible();
    
    // iOS Safari 특화 확인 (바운스 스크롤 제한)
    const hasIOSOptimizations = await page.evaluate(() => {
      return document.body.style.overscrollBehaviorY === 'contain';
    });
    expect(hasIOSOptimizations).toBe(true);
    
    // 스크린샷 촬영
    await takeDeviceScreenshot(page, 'ios-rendering', testInfo.project.name);
  });

  test('Android와 iOS 간 레이아웃 일관성 검증', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    
    // 모바일 디바이스에서만 실행
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    // 6개 주요 섹션이 모두 존재하는지 확인
    const sections = [
      '.mobile-hero-section',
      '.mobile-stats-section', 
      '.mobile-progress-section',
      '.mobile-carousel-section',
      '.mobile-cards-section',
      '.mobile-faq-section'
    ];
    
    for (const selector of sections) {
      await expect(page.locator(selector).first()).toBeVisible({ timeout: 10000 });
    }
    
    // 전체 페이지 높이 확인 (일관성 검증)
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(pageHeight).toBeGreaterThan(3000); // 최소 페이지 높이
    
    // 뷰포트 적응성 확인
    const isCompatible = await verifyCrossPlatformCompatibility(page, 'mobile');
    expect(isCompatible).toBe(true);
  });

  test('태블릿 디바이스 반응형 동작 확인', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    const responsiveState = await getResponsiveState(page);
    
    // 태블릿 디바이스에서만 실행
    test.skip(
      !testInfo.project.name.includes('Tablet') && !testInfo.project.name.includes('iPad'), 
      '태블릿 디바이스가 아님'
    );
    
    // 태블릿 반응형 상태 확인
    expect(responsiveState.isTablet).toBe(true);
    expect(responsiveState.screenWidth).toBeGreaterThanOrEqual(768);
    expect(responsiveState.screenWidth).toBeLessThan(1024);
    
    // 태블릿에서는 모바일 레이아웃 또는 데스크톱 레이아웃 확인
    const hasLayout = await page.locator('.mobile-layout, .desktop-layout').first().isVisible();
    expect(hasLayout).toBe(true);
    
    // 스크린샷 촬영
    await takeDeviceScreenshot(page, 'tablet-rendering', testInfo.project.name);
  });

  test('데스크톱과 모바일 간 컨텐츠 일관성', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    
    // 주요 컨텐츠 요소들이 모든 디바이스에서 존재하는지 확인
    const contentElements = [
      'h1, h2, h3', // 제목들
      'p', // 텍스트 컨텐츠
      'button', // 버튼들
      'img, picture', // 이미지들
    ];
    
    for (const selector of contentElements) {
      const elements = page.locator(selector);
      const count = await elements.count();
      expect(count).toBeGreaterThan(0);
    }
    
    // 전체 페이지 스크린샷 (디바이스별 비교용)
    await page.screenshot({
      path: `tests/screenshots/actual/full-page-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });

  test('터치 영역 최소 크기 준수 확인 (모바일)', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    
    // 모바일 디바이스에서만 실행
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    // 모든 클릭 가능한 요소의 크기 확인
    const touchTargets = await page.locator('button, a, [role="button"]').all();
    
    for (const target of touchTargets) {
      const box = await target.boundingBox();
      if (box) {
        // 최소 터치 영역 44px 확인 (Android 가이드라인)
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

});

test.describe('Android 특화 최적화 검증', () => {
  
  test('GPU 가속 설정 확인', async ({ page }, testInfo) => {
    // 안드로이드 디바이스에서만 실행
    test.skip(
      !testInfo.project.name.includes('Android'), 
      '안드로이드 디바이스 테스트가 아님'
    );
    
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
    
    // GPU 가속 관련 CSS 속성 확인
    const gpuSettings = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      
      return {
        transform: html.style.transform,
        backfaceVisibility: html.style.backfaceVisibility,
        perspective: html.style.perspective,
        touchAction: body.style.touchAction,
      };
    });
    
    expect(gpuSettings.transform).toContain('translate3d');
    expect(gpuSettings.backfaceVisibility).toBe('hidden');
    expect(gpuSettings.perspective).toBe('1000px');
    expect(gpuSettings.touchAction).toBe('pan-y');
  });

  test('안드로이드 뷰포트 높이 최적화 확인', async ({ page }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes('Android'), 
      '안드로이드 디바이스 테스트가 아님'
    );
    
    await page.goto('/');
    
    // 뷰포트 높이 최적화 CSS 변수 확인
    const viewportOptimization = await page.evaluate(() => {
      const vh = document.documentElement.style.getPropertyValue('--vh');
      const minHeight = document.documentElement.style.minHeight;
      
      return {
        hasVhVariable: !!vh,
        hasMinHeight: minHeight === '-webkit-fill-available'
      };
    });
    
    expect(viewportOptimization.hasMinHeight).toBe(true);
  });

});

test.describe('성능 기준선 검증', () => {
  
  test('페이지 로딩 성능 측정', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    
    // 페이지 로딩 시간 측정
    const startTime = Date.now();
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
    const loadTime = Date.now() - startTime;
    
    // 디바이스별 성능 기준
    const performanceThreshold = deviceInfo.isMobile ? 5000 : 3000; // 모바일: 5초, 데스크톱: 3초
    expect(loadTime).toBeLessThan(performanceThreshold);
    
    console.log(`${testInfo.project.name} 로딩 시간: ${loadTime}ms`);
  });

  test('애니메이션 부드러움 확인', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    
    // 모바일에서만 실행
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
    
    // 스크롤을 통한 애니메이션 트리거
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);
    
    // 스크롤 성능 측정은 브라우저 환경에서는 제한적이므로
    // 애니메이션 요소가 정상적으로 표시되는지만 확인
    const animatedElements = page.locator('.gpu-accelerated');
    const count = await animatedElements.count();
    expect(count).toBeGreaterThan(0);
  });

});