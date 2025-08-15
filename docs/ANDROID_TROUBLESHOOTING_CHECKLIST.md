# 안드로이드 실제 디바이스 트러블슈팅 체크리스트

## 🚨 긴급 문제 해결 가이드

### 1단계: 즉시 확인사항
```bash
# 1. 네트워크 연결 확인
ping [개발자PC IP주소]

# 2. 개발 서버 실행 확인
npm run dev:mobile
# 또는
next dev --turbopack --hostname 0.0.0.0
```

### 2단계: 디바이스 디버깅 활성화
1. **안드로이드 개발자 옵션**
   - 설정 > 휴대전화 정보 > 빌드 번호 7회 탭
   - 설정 > 개발자 옵션 > USB 디버깅 활성화

2. **Chrome Remote Debugging**
   - 데스크탑 Chrome에서 `chrome://inspect` 접속
   - 모바일에서 `http://[PC_IP]:3000` 접속
   - "inspect" 버튼 클릭

### 3단계: 실시간 성능 모니터링
- 화면 우상단 5번 터치로 디버거 활성화
- FPS, 메모리, 터치 지연시간 실시간 확인
- 성능 이슈 발생 시 자동 최적화 모드 전환

## 📋 체계적 트러블슈팅 체크리스트

### A. 환경 설정 확인 ✅

#### A1. 네트워크 설정
- [ ] 개발 서버가 `0.0.0.0:3000`으로 실행 중인가?
- [ ] 방화벽에서 포트 3000이 허용되어 있는가?
- [ ] PC와 모바일이 같은 WiFi 네트워크에 연결되어 있는가?
- [ ] PC IP 주소가 정확한가? (`ifconfig` 또는 `ipconfig` 확인)

#### A2. 안드로이드 디바이스 설정
- [ ] 개발자 옵션이 활성화되어 있는가?
- [ ] USB 디버깅이 활성화되어 있는가?
- [ ] Chrome 브라우저가 최신 버전인가?
- [ ] 디바이스가 절전 모드에 있지 않은가?

#### A3. 개발 환경 설정
- [ ] Next.js 15와 React 19가 정상 설치되어 있는가?
- [ ] Framer Motion과 관련 의존성이 정상인가?
- [ ] TypeScript 컴파일 에러가 없는가?

### B. 렌더링 성능 문제 🎯

#### B1. FPS 및 애니메이션 문제
**증상**: 애니메이션이 끊기거나 스크롤이 버벅임

**원인 분석**:
```javascript
// Chrome DevTools Console에서 실행
console.time('animation-test');
requestAnimationFrame(() => {
  console.timeEnd('animation-test');
});

// 16.67ms 이상이면 60fps 미달
```

**해결책**:
1. **즉시 해결**: 
   ```javascript
   // 성능 모드 강제 활성화
   document.body.classList.add('performance-low');
   ```

2. **근본적 해결**:
   - GPU 가속 확인: CSS에서 `transform: translate3d(0,0,0)` 적용
   - 복잡한 애니메이션 비활성화: `enableComplexAnimations: false`
   - 애니메이션 지속시간 단축: `duration: 0.2s`

#### B2. 메모리 부족 문제
**증상**: 앱이 느려지거나 갑자기 종료됨

**원인 분석**:
```javascript
// 메모리 사용량 확인
if (performance.memory) {
  const usage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
  console.log('Memory usage:', (usage * 100).toFixed(2) + '%');
}
```

**해결책**:
1. **즉시 해결**: 페이지 새로고침
2. **근본적 해결**:
   - 이미지 최적화: WebP 포맷 사용, 크기 줄이기
   - 불필요한 리렌더링 방지: React.memo, useMemo 활용
   - 이벤트 리스너 정리: useEffect cleanup

#### B3. 터치 응답 지연
**증상**: 터치 후 반응이 느림 (100ms 이상)

**해결책**:
```css
/* 터치 최적화 CSS 적용 */
.touch-element {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
  min-width: 44px;
}
```

### C. 호환성 문제 🔧

#### C1. Android WebView vs Chrome 호환성
**문제**: WebView에서만 렌더링 문제 발생

**감지 방법**:
```javascript
const isWebView = navigator.userAgent.includes('wv') || 
                 (navigator.userAgent.includes('Version/') && 
                  navigator.userAgent.includes('Chrome/'));
```

**해결책**:
- WebView 감지 시 자동으로 fallback 모드 활성화
- 복잡한 CSS 변환 비활성화
- 애니메이션 지속시간 단축

#### C2. Android 버전별 호환성
**문제**: 오래된 Android 버전에서 문제 발생

**확인 방법**:
```javascript
const androidVersion = navigator.userAgent.match(/Android\s([0-9\.]*)/)?.[1];
console.log('Android version:', androidVersion);
```

**해결책**:
- Android 7.0 미만: 모든 애니메이션 비활성화
- Android 8.0 미만: 3D 변환 비활성화
- Android 9.0 미만: 복잡한 그라데이션 비활성화

### D. 네트워크 및 로딩 문제 🌐

#### D1. 느린 리소스 로딩
**증상**: 이미지나 폰트 로딩이 느림

**진단**:
```javascript
// 네트워크 지연 측정
const startTime = performance.now();
fetch('/api/ping').then(() => {
  const delay = performance.now() - startTime;
  console.log('Network delay:', delay + 'ms');
});
```

**해결책**:
1. **이미지 최적화**:
   ```javascript
   // Next.js Image 컴포넌트 사용
   <Image
     src="/image.jpg"
     alt="description"
     width={800}
     height={600}
     priority={true}
     placeholder="blur"
   />
   ```

2. **폰트 최적화**:
   ```css
   @font-face {
     font-family: 'Pretendard';
     font-display: swap; /* 폰트 로딩 중에도 텍스트 표시 */
   }
   ```

#### D2. CORS 또는 네트워크 오류
**증상**: API 호출 실패 또는 리소스 로딩 실패

**확인사항**:
- 개발 서버가 모든 IP에서 접근 가능한지 확인
- 방화벽이나 보안 소프트웨어 차단 여부 확인
- 모바일 데이터 vs WiFi 차이 확인

## 🛠️ 고급 디버깅 도구

### 1. Chrome DevTools 활용
```javascript
// 성능 프로파일링 시작
console.profile('mobile-performance');

// 애니메이션 실행

// 성능 프로파일링 종료
console.profileEnd('mobile-performance');
```

### 2. 실시간 성능 모니터링
```javascript
// FPS 모니터 시작
class FPSMonitor {
  constructor() {
    this.fps = 0;
    this.start();
  }
  
  start() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measure = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        this.fps = frameCount;
        console.log('FPS:', this.fps);
        
        if (this.fps < 30) {
          console.warn('Low FPS detected!');
          // 자동 최적화 모드 활성화
          document.body.classList.add('performance-low');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measure);
    };
    
    requestAnimationFrame(measure);
  }
}

new FPSMonitor();
```

### 3. 메모리 누수 감지
```javascript
// 메모리 사용량 주기적 체크
setInterval(() => {
  if (performance.memory) {
    const usage = performance.memory.usedJSHeapSize / 1024 / 1024;
    console.log('Memory usage:', usage.toFixed(2) + ' MB');
    
    if (usage > 100) {
      console.warn('High memory usage detected!');
    }
  }
}, 5000);
```

## 🚀 자동 최적화 및 복구

### 1. 자동 성능 조정
시스템이 자동으로 성능 문제를 감지하고 최적화 모드로 전환:

- **FPS < 30**: 애니메이션 지속시간 단축
- **메모리 > 80%**: 이미지 품질 낮춤
- **터치 지연 > 100ms**: 터치 이벤트 최적화 활성화

### 2. 폴백 모드
심각한 성능 문제 발생 시 자동으로 폴백 모드 활성화:

```css
.fallback-mode * {
  animation: none !important;
  transform: none !important;
  transition: opacity 0.1s ease !important;
}
```

### 3. 사용자 알림
성능 문제 발생 시 사용자에게 안내:

```javascript
if (isLowPerformance) {
  showNotification('성능 최적화 모드가 활성화되었습니다.');
}
```

## 📞 긴급 연락처 및 지원

### 개발자 도구 활성화
화면 우상단을 5번 연속 터치하면 디버깅 도구가 활성화됩니다.

### 로그 수집
문제 발생 시 다음 정보를 수집해주세요:

1. **디바이스 정보**:
   - Android 버전
   - Chrome 버전  
   - 디바이스 모델
   - 메모리 용량

2. **성능 지표**:
   - FPS 값
   - 메모리 사용량
   - 네트워크 지연시간
   - 터치 응답시간

3. **에러 로그**:
   - Console 에러 메시지
   - Network 탭 실패 요청
   - Performance 탭 결과

### 빠른 해결책 요약

| 문제 유형 | 즉시 해결 | 근본 해결 |
|-----------|-----------|-----------|
| 낮은 FPS | `performance-low` 클래스 추가 | GPU 가속, 애니메이션 최적화 |
| 높은 메모리 | 페이지 새로고침 | 이미지 최적화, 메모리 관리 |
| 터치 지연 | `touch-optimized` 클래스 추가 | 터치 이벤트 최적화 |
| 렌더링 오류 | `fallback-mode` 활성화 | WebView 호환성 개선 |
| 네트워크 문제 | WiFi 재연결 | 리소스 최적화, CDN 활용 |

이 체크리스트를 따라 단계별로 문제를 해결하면 대부분의 안드로이드 렌더링 문제를 해결할 수 있습니다.