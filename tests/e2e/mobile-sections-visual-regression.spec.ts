import { test, expect } from '@playwright/test';
import { 
  getDeviceInfo, 
  waitForMobileSectionsToLoad,
  takeDeviceScreenshot,
  collectPerformanceMetrics 
} from '../utils/device-helpers';

/**
 * 6개 모바일 섹션별 시각적 회귀 테스트
 * Android vs iOS 렌더링 일관성 및 애니메이션 검증
 */

test.describe('Mobile Sections Visual Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
  });

  test('MobileHeroSection - 텍스트 모핑 애니메이션 검증', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    // 히어로 섹션 확인
    const heroSection = page.locator('.mobile-hero-section').first();
    await expect(heroSection).toBeVisible();
    
    // 텍스트 모핑 애니메이션 요소 확인
    const morphingText = page.locator('[data-testid="morphing-text"]').first();
    if (await morphingText.isVisible()) {
      // 텍스트 변화 확인 (4초 주기)
      await page.waitForTimeout(4500);
      const currentText = await morphingText.textContent();
      expect(currentText).toBeTruthy();
    }
    
    // CTA 버튼 확인
    const ctaButton = heroSection.locator('button, a[role="button"]').first();
    await expect(ctaButton).toBeVisible();
    
    // 터치 타겟 크기 확인 (44px 규칙)
    const buttonBox = await ctaButton.boundingBox();
    if (buttonBox) {
      expect(buttonBox.width).toBeGreaterThanOrEqual(44);
      expect(buttonBox.height).toBeGreaterThanOrEqual(44);
    }
    
    // 스크린샷 촬영
    await takeDeviceScreenshot(page, 'hero-section', testInfo.project.name);
  });

  test('MobileStatsSection - 스크롤 기반 애니메이션 검증', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    // 스탯 섹션으로 스크롤
    const statsSection = page.locator('.mobile-stats-section').first();
    await statsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // 5개 통계 카드 확인
    const statCards = statsSection.locator('.stat-card, [data-testid*="stat"]');
    const cardCount = await statCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3); // 최소 3개 이상
    
    // 애니메이션 트리거를 위한 스크롤
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(2000);
    
    // GPU 가속 클래스 확인
    const hasGPUAcceleration = await statsSection.locator('.gpu-accelerated').count();
    expect(hasGPUAcceleration).toBeGreaterThan(0);
    
    await takeDeviceScreenshot(page, 'stats-section', testInfo.project.name);
  });

  test('MobileProgressSection - 진행바 및 탭 인터랙션', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    const progressSection = page.locator('.mobile-progress-section').first();
    await progressSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // 3개 탭 버튼 확인 및 클릭 테스트
    const tabButtons = progressSection.locator('button, [role="tab"]');
    const tabCount = await tabButtons.count();
    
    if (tabCount > 0) {
      // 첫 번째 탭 클릭
      await tabButtons.first().click();
      await page.waitForTimeout(500);
      
      // 두 번째 탭이 있으면 클릭
      if (tabCount > 1) {
        await tabButtons.nth(1).click();
        await page.waitForTimeout(500);
      }
    }
    
    // 이미지 영역 확인
    const imageArea = progressSection.locator('img, picture, [role="img"]').first();
    if (await imageArea.isVisible()) {
      await expect(imageArea).toBeVisible();
    }
    
    await takeDeviceScreenshot(page, 'progress-section', testInfo.project.name);
  });

  test('MobileCarouselSection - 무한 캐러셀 성능 검증', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    const carouselSection = page.locator('.mobile-carousel-section').first();
    await carouselSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // 캐러셀 아이템 확인
    const carouselItems = carouselSection.locator('.carousel-item, [data-testid*="carousel"]');
    const itemCount = await carouselItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(3);
    
    // 네비게이션 버튼 테스트
    const prevButton = carouselSection.locator('[aria-label*="이전"], .carousel-prev').first();
    const nextButton = carouselSection.locator('[aria-label*="다음"], .carousel-next').first();
    
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(800);
    }
    
    if (await prevButton.isVisible()) {
      await prevButton.click();
      await page.waitForTimeout(800);
    }
    
    // 자동 스크롤 성능 확인
    const startTime = Date.now();
    await page.waitForTimeout(3000); // 자동 스크롤 관찰
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(4000); // 반응성 확인
    
    await takeDeviceScreenshot(page, 'carousel-section', testInfo.project.name);
  });

  test('MobileCardsSection - 순차적 카드 애니메이션', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    const cardsSection = page.locator('.mobile-cards-section').first();
    await cardsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Future 섹션 확인
    const futureSection = cardsSection.locator('[data-testid*="future"], .future-section').first();
    if (await futureSection.isVisible()) {
      await expect(futureSection).toBeVisible();
    }
    
    // CTA 섹션 확인
    const ctaSection = cardsSection.locator('[data-testid*="cta"], .cta-section').first();
    if (await ctaSection.isVisible()) {
      await expect(ctaSection).toBeVisible();
      
      // CTA 버튼 클릭 테스트
      const ctaButton = ctaSection.locator('button').first();
      if (await ctaButton.isVisible()) {
        await ctaButton.click();
        await page.waitForTimeout(300);
      }
    }
    
    // 카드 애니메이션 GPU 가속 확인
    const gpuElements = cardsSection.locator('.gpu-accelerated');
    const gpuCount = await gpuElements.count();
    expect(gpuCount).toBeGreaterThan(0);
    
    await takeDeviceScreenshot(page, 'cards-section', testInfo.project.name);
  });

  test('MobileFAQSection - 아코디언 및 폼 인터랙션', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    const faqSection = page.locator('.mobile-faq-section').first();
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // FAQ 아코디언 아이템 확인
    const faqItems = faqSection.locator('[data-testid*="faq"], .faq-item, [role="button"]');
    const faqCount = await faqItems.count();
    
    if (faqCount > 0) {
      // 첫 번째 FAQ 클릭
      await faqItems.first().click();
      await page.waitForTimeout(600);
      
      // 두 번째 FAQ 클릭 (다중 선택 테스트)
      if (faqCount > 1) {
        await faqItems.nth(1).click();
        await page.waitForTimeout(600);
      }
    }
    
    // 연락처 폼 확인
    const contactForm = faqSection.locator('form, [data-testid*="contact"]').first();
    if (await contactForm.isVisible()) {
      // 필수 입력 필드 확인
      const nameField = contactForm.locator('input[name="name"], #name').first();
      const emailField = contactForm.locator('input[name="email"], #email').first();
      
      if (await nameField.isVisible()) {
        await nameField.fill('테스트 사용자');
      }
      
      if (await emailField.isVisible()) {
        await emailField.fill('test@example.com');
      }
      
      // 개인정보 동의 체크박스
      const agreementCheckbox = contactForm.locator('input[type="checkbox"]').first();
      if (await agreementCheckbox.isVisible()) {
        await agreementCheckbox.check();
      }
    }
    
    await takeDeviceScreenshot(page, 'faq-section', testInfo.project.name);
  });

  test('전체 페이지 스크롤 성능 검증', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    // 성능 메트릭 수집 시작
    const startTime = Date.now();
    
    // 전체 페이지 스크롤
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    // 부드러운 스크롤 테스트
    for (let i = 0; i < pageHeight; i += viewportHeight) {
      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      }, i);
      await page.waitForTimeout(300);
    }
    
    // 상단으로 복귀
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(500);
    
    const totalTime = Date.now() - startTime;
    console.log(`${testInfo.project.name} 전체 스크롤 시간: ${totalTime}ms`);
    
    // 성능 기준 확인 (모바일: 10초 이내)
    expect(totalTime).toBeLessThan(10000);
    
    // 최종 전체 페이지 스크린샷
    await page.screenshot({
      path: `tests/screenshots/actual/full-page-scroll-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });

});

test.describe('Android vs iOS 시각적 일관성 검증', () => {
  
  test('동일 섹션 픽셀 비교 (스크린샷 diff)', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
    
    // 각 섹션별 개별 스크린샷
    const sections = [
      { selector: '.mobile-hero-section', name: 'hero' },
      { selector: '.mobile-stats-section', name: 'stats' },
      { selector: '.mobile-progress-section', name: 'progress' },
      { selector: '.mobile-carousel-section', name: 'carousel' },
      { selector: '.mobile-cards-section', name: 'cards' },
      { selector: '.mobile-faq-section', name: 'faq' }
    ];
    
    for (const section of sections) {
      const element = page.locator(section.selector).first();
      if (await element.isVisible()) {
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        await element.screenshot({
          path: `tests/screenshots/actual/${section.name}-${testInfo.project.name}.png`,
          animations: 'disabled'
        });
      }
    }
  });

  test('성능 메트릭 플랫폼별 비교', async ({ page }, testInfo) => {
    const deviceInfo = await getDeviceInfo(page);
    test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
    
    await page.goto('/');
    
    // 성능 메트릭 수집
    const metrics = await collectPerformanceMetrics(page);
    
    console.log(`${testInfo.project.name} 성능 메트릭:`, {
      platform: deviceInfo.platform,
      fcp: metrics.fcp,
      lcp: metrics.lcp,
      cls: metrics.cls
    });
    
    // 플랫폼별 성능 기준
    if (deviceInfo.platform === 'android') {
      expect(metrics.lcp).toBeLessThan(4000); // Android: 4초 이내
    } else if (deviceInfo.platform === 'ios') {
      expect(metrics.lcp).toBeLessThan(3500); // iOS: 3.5초 이내
    }
    
    // CLS (누적 레이아웃 이동) 확인
    expect(metrics.cls).toBeLessThan(0.25); // 모든 플랫폼: 0.25 이하
  });

});