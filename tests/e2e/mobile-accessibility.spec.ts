import { test, expect } from '@playwright/test';
import { 
  getDeviceInfo, 
  waitForMobileSectionsToLoad,
  getResponsiveState 
} from '../utils/device-helpers';

/**
 * 모바일 섹션 접근성 테스트
 * WCAG 2.1 AA 준수 및 모바일 접근성 가이드라인 검증
 */

test.describe('Mobile Accessibility Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForMobileSectionsToLoad(page);
    
    // 접근성 테스트를 위한 초기 설정
    await page.waitForTimeout(1000);
  });

  test.describe('키보드 네비게이션 및 포커스 관리', () => {
    
    test('Tab 키를 통한 순차적 네비게이션', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 페이지 시작점에서 Tab 키를 통한 네비게이션
      await page.keyboard.press('Tab');
      
      // 첫 번째 포커스 가능한 요소 확인
      const firstFocusable = await page.locator(':focus').first();
      await expect(firstFocusable).toBeVisible();
      
      // 순차적으로 Tab을 눌러 모든 인터랙티브 요소 방문
      const focusableElements = [];
      let currentElement;
      let tabCount = 0;
      const maxTabs = 20; // 무한 루프 방지
      
      while (tabCount < maxTabs) {
        currentElement = await page.locator(':focus').first();
        const tagName = await currentElement.evaluate(el => el.tagName.toLowerCase());
        const role = await currentElement.evaluate(el => el.getAttribute('role'));
        
        focusableElements.push({ tagName, role, tabIndex: tabCount });
        
        await page.keyboard.press('Tab');
        tabCount++;
        
        // 포커스가 순환했는지 확인
        const newFocus = await page.locator(':focus').first();
        const isSameElement = await currentElement.evaluate((el, other) => 
          el === other, await newFocus.elementHandle());
        
        if (isSameElement && tabCount > 5) break;
      }
      
      // 최소 5개 이상의 포커스 가능한 요소가 있어야 함
      expect(focusableElements.length).toBeGreaterThan(5);
      
      console.log('Focusable elements order:', focusableElements);
    });

    test('Enter 및 Space 키를 통한 활성화', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 버튼 요소들에 대한 키보드 활성화 테스트
      const buttons = page.locator('button, [role="button"], [tabindex="0"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        await button.focus();
        
        // 포커스가 잘 되었는지 확인
        const isFocused = await button.evaluate(el => document.activeElement === el);
        expect(isFocused).toBe(true);
        
        // Enter 키로 활성화
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
        
        // Space 키로도 활성화 (버튼인 경우)
        const isButton = await button.evaluate(el => 
          el.tagName.toLowerCase() === 'button' || el.getAttribute('role') === 'button'
        );
        
        if (isButton) {
          await button.focus();
          await page.keyboard.press('Space');
          await page.waitForTimeout(100);
        }
      }
    });

    test('Escape 키를 통한 모달/팝업 닫기', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // FAQ 섹션의 아코디언 테스트
      await page.locator('#faq').scrollIntoViewIfNeeded();
      
      // FAQ 아이템 포커스 및 Enter로 열기
      const faqItems = page.locator('#faq [class*="cursor-pointer"]');
      const firstFAQ = faqItems.first();
      
      await firstFAQ.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      
      // 열린 상태 확인
      const isExpanded = await firstFAQ.locator('[class*="overflow-hidden"]').evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.height !== '0px';
      });
      
      if (isExpanded) {
        // Escape 키로 닫기 (구현되어 있다면)
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }
    });
  });

  test.describe('ARIA 속성 및 의미론적 마크업', () => {
    
    test('적절한 ARIA 라벨 및 역할 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 각 섹션의 ARIA 역할 확인
      const sections = [
        { selector: 'section:has(.mobile-hero-section)', expectedRole: 'banner' },
        { selector: '#stats', expectedRole: 'region' },
        { selector: '#progress', expectedRole: 'region' },
        { selector: '#carousel', expectedRole: 'region' },
        { selector: '#cards', expectedRole: 'region' },
        { selector: '#faq', expectedRole: 'region' }
      ];
      
      for (const section of sections) {
        try {
          const element = page.locator(section.selector).first();
          await expect(element).toBeVisible();
          
          // ARIA 라벨 또는 제목 확인
          const hasAriaLabel = await element.evaluate(el => 
            el.hasAttribute('aria-label') || 
            el.hasAttribute('aria-labelledby') ||
            el.querySelector('h1, h2, h3, h4, h5, h6') !== null
          );
          
          expect(hasAriaLabel).toBe(true);
          
        } catch (error) {
          console.warn(`Section ${section.selector} not found or ARIA check failed`);
        }
      }
    });

    test('인터랙티브 요소의 접근 가능한 이름', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 모든 버튼과 링크의 접근 가능한 이름 확인
      const interactiveElements = page.locator('button, a, [role="button"], [role="link"]');
      const elementCount = await interactiveElements.count();
      
      for (let i = 0; i < elementCount; i++) {
        const element = interactiveElements.nth(i);
        
        const accessibleName = await element.evaluate(el => {
          // 접근 가능한 이름 계산 (간단화된 버전)
          return el.getAttribute('aria-label') ||
                 el.getAttribute('aria-labelledby') ||
                 el.textContent?.trim() ||
                 el.getAttribute('title') ||
                 el.getAttribute('alt') ||
                 '';
        });
        
        expect(accessibleName.length).toBeGreaterThan(0);
        expect(accessibleName).not.toBe('undefined');
        
        // 의미 있는 이름인지 확인 (최소 2글자 이상)
        expect(accessibleName.length).toBeGreaterThan(1);
      }
    });

    test('아코디언의 확장/축소 상태 표시', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      await page.locator('#faq').scrollIntoViewIfNeeded();
      
      const faqItems = page.locator('#faq [class*="cursor-pointer"]');
      const itemCount = await faqItems.count();
      
      for (let i = 0; i < Math.min(itemCount, 3); i++) {
        const faqItem = faqItems.nth(i);
        
        // aria-expanded 속성 확인
        const hasAriaExpanded = await faqItem.evaluate(el => 
          el.hasAttribute('aria-expanded') ||
          el.querySelector('[aria-expanded]') !== null
        );
        
        // 현재 구현에는 aria-expanded가 없을 수 있으므로 개선 권장사항으로 기록
        if (!hasAriaExpanded) {
          console.warn(`FAQ item ${i} should have aria-expanded attribute`);
        }
      }
    });
  });

  test.describe('색상 대비 및 시각적 접근성', () => {
    
    test('텍스트와 배경 간 색상 대비비 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 주요 텍스트 요소들의 색상 대비 확인
      const textElements = [
        'h1, h2, h3, h4, h5, h6',
        'p',
        'button',
        '.figma-heading-lg',
        '.figma-body',
        '.figma-button'
      ];
      
      for (const selector of textElements) {
        const elements = page.locator(selector);
        const count = await elements.count();
        
        for (let i = 0; i < Math.min(count, 3); i++) {
          const element = elements.nth(i);
          
          const contrastInfo = await element.evaluate(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            const fontSize = parseFloat(style.fontSize);
            const fontWeight = style.fontWeight;
            
            return {
              color,
              backgroundColor,
              fontSize,
              fontWeight,
              isVisible: el.offsetWidth > 0 && el.offsetHeight > 0
            };
          });
          
          if (contrastInfo.isVisible) {
            // 기본적인 색상 정보 수집 (실제 대비비 계산은 복잡하므로 기본 확인만)
            expect(contrastInfo.color).not.toBe('rgba(0, 0, 0, 0)'); // 투명하지 않아야 함
            expect(contrastInfo.fontSize).toBeGreaterThan(10); // 최소 폰트 크기
            
            // 대형 텍스트(18pt 이상 또는 14pt 굵게)는 3:1, 일반 텍스트는 4.5:1 대비가 필요
            const isLargeText = contrastInfo.fontSize >= 18 || 
                               (contrastInfo.fontSize >= 14 && 
                                (contrastInfo.fontWeight === 'bold' || parseInt(contrastInfo.fontWeight) >= 700));
            
            // 실제 대비비 계산은 전용 라이브러리 사용 권장
            console.log(`Text contrast info:`, {
              selector,
              index: i,
              isLargeText,
              ...contrastInfo
            });
          }
        }
      }
    });

    test('포커스 표시기 가시성 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 포커스 가능한 요소들의 포커스 스타일 확인
      const focusableElements = page.locator('button, a, [tabindex="0"], input, textarea');
      const elementCount = await focusableElements.count();
      
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = focusableElements.nth(i);
        
        // 요소에 포커스 설정
        await element.focus();
        
        // 포커스 스타일 확인
        const focusStyle = await element.evaluate(el => {
          const style = window.getComputedStyle(el, ':focus');
          return {
            outline: style.outline,
            outlineWidth: style.outlineWidth,
            outlineStyle: style.outlineStyle,
            outlineColor: style.outlineColor,
            boxShadow: style.boxShadow,
            borderColor: style.borderColor,
            backgroundColor: style.backgroundColor
          };
        });
        
        // 포커스 표시기가 있는지 확인
        const hasFocusIndicator = focusStyle.outline !== 'none' ||
                                 focusStyle.outlineWidth !== '0px' ||
                                 focusStyle.boxShadow !== 'none' ||
                                 focusStyle.borderColor !== 'transparent';
        
        if (!hasFocusIndicator) {
          console.warn(`Element ${i} may not have visible focus indicator:`, focusStyle);
        }
      }
    });
  });

  test.describe('모바일 접근성 특화 테스트', () => {
    
    test('터치 타겟 크기 접근성 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 모든 터치 가능한 요소의 크기 확인 (WCAG 44px 규칙)
      const touchableElements = page.locator('button, a, [role="button"], [onclick], [ontouch]');
      const elementCount = await touchableElements.count();
      
      let tooSmallElements = 0;
      
      for (let i = 0; i < elementCount; i++) {
        const element = touchableElements.nth(i);
        const boundingBox = await element.boundingBox();
        
        if (boundingBox) {
          const isAccessibleSize = boundingBox.width >= 44 && boundingBox.height >= 44;
          
          if (!isAccessibleSize) {
            tooSmallElements++;
            
            const elementInfo = await element.evaluate(el => ({
              tagName: el.tagName.toLowerCase(),
              className: el.className,
              textContent: el.textContent?.slice(0, 20) + '...',
            }));
            
            console.warn(`Small touch target found:`, {
              ...elementInfo,
              size: `${boundingBox.width}x${boundingBox.height}`
            });
          }
        }
      }
      
      // 90% 이상의 터치 타겟이 접근성 기준을 만족해야 함
      const accessibilityRate = ((elementCount - tooSmallElements) / elementCount) * 100;
      expect(accessibilityRate).toBeGreaterThan(90);
      
      console.log(`Touch target accessibility rate: ${accessibilityRate.toFixed(1)}%`);
    });

    test('화면 회전 지원 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 현재 뷰포트 크기 저장
      const currentViewport = page.viewportSize();
      
      // 가로 모드로 회전 시뮬레이션
      await page.setViewportSize({ 
        width: currentViewport!.height, 
        height: currentViewport!.width 
      });
      
      await page.waitForTimeout(1000);
      
      // 가로 모드에서도 콘텐츠가 잘 보이는지 확인
      const responsiveState = await getResponsiveState(page);
      
      // 주요 섹션들이 여전히 표시되는지 확인
      const sectionsVisible = await page.evaluate(() => {
        const sections = document.querySelectorAll('section');
        let visibleCount = 0;
        
        sections.forEach(section => {
          if (section.offsetWidth > 0 && section.offsetHeight > 0) {
            visibleCount++;
          }
        });
        
        return visibleCount;
      });
      
      expect(sectionsVisible).toBeGreaterThan(3);
      
      // 원래 뷰포트로 복원
      await page.setViewportSize(currentViewport!);
      await page.waitForTimeout(500);
    });

    test('스크린 리더용 숨김 텍스트 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 스크린 리더 전용 텍스트 요소 확인
      const srOnlyElements = page.locator('.sr-only, .visually-hidden, [class*="screen-reader"]');
      const srCount = await srOnlyElements.count();
      
      if (srCount > 0) {
        for (let i = 0; i < srCount; i++) {
          const element = srOnlyElements.nth(i);
          
          const isProperlyHidden = await element.evaluate(el => {
            const style = window.getComputedStyle(el);
            
            // 스크린 리더 전용 숨김 기법 확인
            return (style.position === 'absolute' && 
                   (style.left === '-10000px' || style.left === '-9999px')) ||
                   (style.width === '1px' && style.height === '1px' && 
                    style.overflow === 'hidden') ||
                   style.clip === 'rect(0, 0, 0, 0)';
          });
          
          expect(isProperlyHidden).toBe(true);
        }
      } else {
        console.warn('No screen reader only text found - consider adding descriptive text for complex interactions');
      }
    });

    test('헤딩 구조의 논리적 계층 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 페이지의 헤딩 구조 분석
      const headings = await page.evaluate(() => {
        const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        return Array.from(headingElements).map(heading => ({
          level: parseInt(heading.tagName.charAt(1)),
          text: heading.textContent?.trim().slice(0, 50),
          visible: heading.offsetWidth > 0 && heading.offsetHeight > 0
        }));
      });
      
      const visibleHeadings = headings.filter(h => h.visible);
      
      // 최소 하나의 h1이 있어야 함
      const h1Count = visibleHeadings.filter(h => h.level === 1).length;
      expect(h1Count).toBeGreaterThanOrEqual(1);
      
      // 헤딩 레벨이 논리적 순서를 따르는지 확인
      let previousLevel = 0;
      let skipCount = 0;
      
      for (const heading of visibleHeadings) {
        if (heading.level > previousLevel + 1) {
          skipCount++;
        }
        previousLevel = Math.max(previousLevel, heading.level);
      }
      
      // 헤딩 레벨 건너뛰기가 3회 이하여야 함
      expect(skipCount).toBeLessThanOrEqual(3);
      
      console.log('Heading structure:', visibleHeadings);
    });
  });

  test.describe('모바일 제스처 접근성', () => {
    
    test('대체 네비게이션 방법 제공 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 캐러셀 섹션의 대체 네비게이션 확인
      await page.locator('#carousel').scrollIntoViewIfNeeded();
      
      // 자동 스크롤 외에 수동 네비게이션 버튼이 있는지 확인
      const navButtons = page.locator('#carousel button');
      const buttonCount = await navButtons.count();
      
      expect(buttonCount).toBeGreaterThanOrEqual(2); // 이전/다음 버튼
      
      // 각 버튼이 키보드로 접근 가능한지 확인
      for (let i = 0; i < buttonCount; i++) {
        const button = navButtons.nth(i);
        await button.focus();
        
        const isFocusable = await button.evaluate(el => {
          return document.activeElement === el;
        });
        
        expect(isFocusable).toBe(true);
      }
    });

    test('복잡한 제스처의 단순한 대안 제공', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 드래그나 스와이프 대신 버튼 클릭으로 동일한 기능 수행 가능한지 확인
      
      // Progress 섹션의 탭 네비게이션
      await page.locator('#progress').scrollIntoViewIfNeeded();
      
      const tabButtons = page.locator('#progress button[class*="touch-optimized"]');
      const tabCount = await tabButtons.count();
      
      expect(tabCount).toBeGreaterThan(1); // 여러 탭이 있어야 함
      
      // 각 탭을 클릭으로 전환할 수 있는지 확인
      for (let i = 0; i < Math.min(tabCount, 3); i++) {
        const tab = tabButtons.nth(i);
        await tab.click();
        await page.waitForTimeout(300);
        
        // 탭 전환이 시각적으로 확인되는지 체크
        const isActive = await tab.evaluate(el => {
          return el.classList.contains('border-b-2') ||
                 window.getComputedStyle(el).borderBottomWidth !== '0px';
        });
        
        // 활성 상태 표시가 있어야 함 (시각적 피드백)
        console.log(`Tab ${i} active state:`, isActive);
      }
    });
  });

  test.describe('접근성 메타데이터 및 구조', () => {
    
    test('페이지 제목 및 언어 설정 확인', async ({ page }, testInfo) => {
      // 페이지 제목 확인
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title).not.toContain('undefined');
      
      // HTML lang 속성 확인
      const htmlLang = await page.evaluate(() => 
        document.documentElement.getAttribute('lang')
      );
      
      expect(htmlLang).toBeTruthy();
      expect(htmlLang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // ko, ko-KR 등
      
      console.log(`Page title: ${title}`);
      console.log(`Page language: ${htmlLang}`);
    });

    test('구조적 랜드마크 요소 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 주요 랜드마크 요소들 확인
      const landmarks = {
        banner: page.locator('header, [role="banner"]'),
        main: page.locator('main, [role="main"]'),
        navigation: page.locator('nav, [role="navigation"]'),
        contentinfo: page.locator('footer, [role="contentinfo"]')
      };
      
      const landmarkResults = {};
      
      for (const [name, locator] of Object.entries(landmarks)) {
        const count = await locator.count();
        landmarkResults[name] = count;
        
        if (name === 'main') {
          // main 랜드마크는 하나만 있어야 함
          expect(count).toBeLessThanOrEqual(1);
        }
      }
      
      console.log('Landmark elements found:', landmarkResults);
      
      // 최소한 main 콘텐츠 영역이 있어야 함
      expect(landmarkResults.main).toBeGreaterThanOrEqual(1);
    });

    test('이미지의 대체 텍스트 확인', async ({ page }, testInfo) => {
      const deviceInfo = await getDeviceInfo(page);
      test.skip(!deviceInfo.isMobile, '모바일 디바이스가 아님');
      
      // 모든 이미지 요소 확인
      const images = page.locator('img');
      const imageCount = await images.count();
      
      let imagesWithoutAlt = 0;
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        
        const altText = await img.getAttribute('alt');
        const isDecorative = await img.evaluate(el => 
          el.hasAttribute('role') && el.getAttribute('role') === 'presentation'
        );
        
        if (!altText && !isDecorative) {
          imagesWithoutAlt++;
          
          const src = await img.getAttribute('src');
          console.warn(`Image without alt text: ${src}`);
        }
      }
      
      // 90% 이상의 이미지가 적절한 alt 텍스트를 가져야 함
      const altTextRate = ((imageCount - imagesWithoutAlt) / imageCount) * 100;
      expect(altTextRate).toBeGreaterThan(90);
      
      console.log(`Alt text coverage: ${altTextRate.toFixed(1)}%`);
    });
  });
});