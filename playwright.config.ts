import { defineConfig, devices } from '@playwright/test';

/**
 * 크로스 플랫폼 모바일 테스트를 위한 Playwright 설정
 * Android와 iOS 디바이스 에뮬레이션 중심으로 구성
 */
export default defineConfig({
  testDir: './tests',
  
  /* 병렬 실행 설정 */
  fullyParallel: true,
  
  /* CI에서 실패 시 재시도 설정 */
  retries: process.env.CI ? 2 : 0,
  
  /* 병렬 실행 프로세스 수 */
  workers: process.env.CI ? 1 : undefined,
  
  /* 리포터 설정 - HTML 리포트 포함 */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['line'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  
  /* 전역 테스트 설정 */
  use: {
    /* 기본 URL */
    baseURL: 'http://localhost:3002',
    
    /* 스크린샷 설정 */
    screenshot: 'only-on-failure',
    
    /* 비디오 녹화 */
    video: 'retain-on-failure',
    
    /* 트레이스 수집 */
    trace: 'on-first-retry',
    
    /* 모바일 터치 이벤트 시뮬레이션 */
    hasTouch: true,
    
    /* 네트워크 조건 시뮬레이션 (3G) */
    // launchOptions: {
    //   slowMo: 100, // 디버깅용 느린 실행
    // },
  },

  /* 프로젝트별 설정 - 모바일 디바이스 중심 */
  projects: [
    /* === 안드로이드 디바이스 === */
    {
      name: 'Android Chrome - Galaxy S21',
      use: { 
        ...devices['Galaxy S21'],
        // 안드로이드 특화 설정
        viewport: { width: 375, height: 812 },
        userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
      },
    },
    {
      name: 'Android Chrome - Pixel 5',
      use: { 
        ...devices['Pixel 5'],
        hasTouch: true,
        isMobile: true,
      },
    },
    
    /* === iOS 디바이스 === */
    {
      name: 'iOS Safari - iPhone 15',
      use: { 
        viewport: { width: 393, height: 852 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
      },
    },
    {
      name: 'iOS Safari - iPhone 15 Pro',
      use: { 
        viewport: { width: 393, height: 852 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
      },
    },
    {
      name: 'iOS Safari - iPhone 15 Pro Max',
      use: { 
        viewport: { width: 430, height: 932 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
      },
    },
    
    /* === 태블릿 디바이스 === */
    {
      name: 'Android Tablet - Galaxy Tab',
      use: {
        viewport: { width: 768, height: 1024 },
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-T720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
        hasTouch: true,
        isMobile: false, // 태블릿은 모바일이 아님
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'iOS Safari - iPad',
      use: { 
        ...devices['iPad Pro'],
        hasTouch: true,
        isMobile: false,
      },
    },
    
    /* === 데스크톱 비교용 === */
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        hasTouch: false,
        isMobile: false,
      },
    },
    {
      name: 'Desktop Safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
        hasTouch: false,
        isMobile: false,
      },
    },
  ],

  /* 로컬 개발 서버 설정 */
  webServer: {
    command: 'PORT=3002 npm run dev',
    url: 'http://localhost:3002',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2분 타임아웃
  },
});