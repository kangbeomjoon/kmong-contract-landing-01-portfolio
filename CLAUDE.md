# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 프로젝트 개요

카페24 유튜브 쇼핑 랜딩페이지 - Next.js로 구축된 단일 페이지 유튜브 쇼핑 서비스 랜딩페이지로, 고급 스크롤 기반 상호작용을 통한 6개의 뚜렷한 애니메이션 섹션을 제공합니다.

**참조 사이트**: https://www.cafe24.com/youtubeshopping/about.html

## 아키텍처 및 구조

### 반응형 아키텍처 패턴
이 프로젝트는 정교한 이중 레이아웃 아키텍처를 사용합니다:
- **src/page.tsx**: `useIsMobile()` 훅을 사용하여 레이아웃을 동적으로 전환하는 메인 라우팅 로직
- **데스크톱 레이아웃**: `src/components/layouts/DesktopLayout.tsx` - 전통적인 섹션 기반 레이아웃
- **모바일 레이아웃**: `src/components/mobile/layout/MobileLayout.tsx` - 안드로이드 전용 최적화가 포함된 모바일 경험

### 컴포넌트 구조
```
src/components/
├── dev/                    # 개발 도구 (안드로이드 디버거, 개발 모드 토글)
├── layouts/               # 레이아웃 컴포넌트
├── mobile/               # 완전한 모바일 최적화 컴포넌트 세트
│   ├── layout/          # 모바일 컨테이너 및 레이아웃 컴포넌트
│   ├── sections/        # 모바일 전용 섹션 구현
│   ├── ui/              # 모바일 네비게이션 컴포넌트
│   └── utils/           # 안드로이드 성능 최적화
├── sections/            # 데스크톱 섹션 컴포넌트
└── ui/                  # ShadCN UI 컴포넌트 (공용)
```

### 주요 섹션 컴포넌트
1. **HeroSection**: 4개 순환 메시지를 포함한 텍스트 모핑 애니메이션
2. **StatsSection**: 패럴랙스 스크롤링 숫자와 고정 텍스트  
3. **ProgressSection**: 콘텐츠 공개를 위한 프로그레스 바 트리거
4. **CarouselSection**: 성공 사례를 담은 무한 수평 캐러셀
5. **CardsSection**: 스크롤에 따른 순차적 카드 스택 애니메이션
6. **FAQSection**: 아코디언 FAQ + 문의 폼

## 개발 명령어

### 핵심 명령어
```bash
# Turbopack을 사용한 개발 서버
npm run dev

# 모바일 개발 서버 (네트워크 접근 가능)
npm run dev:mobile

# 프로덕션 빌드
npm run build

# 프로덕션 서버  
npm start

# 린팅
npm run lint
```

### 모바일 테스트 명령어
```bash
# 크로스 플랫폼 모바일 테스트
npm run test:mobile
npm run test:cross-platform
npm run test:android
npm run test:ios
npm run test:tablet

# 전문 테스트
npm run test:visual        # 시각적 회귀 테스트
npm run test:performance   # 애니메이션 성능 테스트  
npm run test:accessibility # 접근성 준수 테스트
npm run test:ui           # 인터랙티브 테스트 UI

# 완전한 테스트 스위트
npm run test:all-devices
npm run test:full-suite
```

### 주요 기술 스택
- **프레임워크**: Next.js 15 with App Router
- **스타일링**: TailwindCSS v4 + ShadCN/UI
- **애니메이션**: Framer Motion + react-intersection-observer
- **아이콘**: Lucide React
- **폼**: 검증이 포함된 내장 API 라우트
- **테스트**: 포괄적인 모바일 디바이스 에뮬레이션을 포함한 Playwright

## 모바일 우선 개발 아키텍처

### 반응형 훅 시스템
이 프로젝트는 정교한 반응형 감지 시스템을 사용합니다:
- **`useResponsive()`**: 디바운스된 리사이즈 처리를 포함한 완전한 반응형 상태
- **`useIsMobile()`**: 개발 URL 매개변수 재정의(`?mobile=true/false`)를 포함한 기본 훅
- **안드로이드 최적화**: 동적 주소 표시줄 동작을 고려한 뷰포트 감지

### 모바일 개발 워크플로
```bash
# 모바일 개발 서버 시작 (네트워크에서 접근 가능)
npm run dev:mobile

# 브라우저에서 모바일 레이아웃 강제 적용 (개발 전용)
http://localhost:3002?mobile=true

# 특정 모바일 시나리오 테스트
npm run test:android  # Galaxy S21, Pixel 5
npm run test:ios      # iPhone 15, iPhone 15 Pro
```

## 애니메이션 요구사항

### 성능 표준
- **목표**: 모든 애니메이션에서 60fps
- **GPU 가속**: 레이아웃 변경보다 `transform` 속성 사용  
- **스크롤 최적화**: 쓰로틀된 스크롤 이벤트 (16ms 간격)
- **뷰포트 감지**: 성능을 위한 Intersection Observer
- **안드로이드 전용**: `transform3d(0,0,0)` 및 `backfaceVisibility: hidden`을 통한 GPU 가속

### 애니메이션 사양
각 섹션은 `docs/PRD.md`에 자세히 설명된 특정 애니메이션 요구사항이 있습니다:
- 투명도 전환을 통한 텍스트 모핑
- 패럴랙스 스크롤링 효과
- 순차적 카드 공개
- 프로그레스 트리거 콘텐츠 공개
- 무한 수평 캐러셀

## 반응형 디자인

### 중단점 (훅 전체에서 일관됨)
- **모바일**: < 768px (useIsMobile, useResponsive)
- **태블릿**: 768px - 1024px  
- **데스크톱**: ≥ 1024px

### 모바일 성능 최적화
- **안드로이드 터치**: `touchAction: pan-y`, `-webkit-tap-highlight-color: transparent`
- **스크롤 동작**: iOS 바운스 방지를 위한 `overscrollBehavior: contain`
- **뷰포트 높이**: 안드로이드 Chrome 주소 표시줄용 CSS 사용자 정의 속성 `--vh`
- **폰트 렌더링**: 안드로이드용 `-webkit-font-smoothing: antialiased`

### 성능 목표
- **Lighthouse 성능**: 90점 이상
- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **모바일 사용성**: 100점

## 콘텐츠 및 로컬라이제이션

### 기본 언어
한국어 (ko_KR) - 모든 콘텐츠, 메타데이터, 폼 유효성 검사 메시지

### 색상 구성
- **기본색**: #FF0000 (유튜브 레드)
- **보조색**: #1976D2 (블루)
- **배경색**: #FFFFFF (화이트)
- **텍스트**: #212121 (다크 그레이)
- **강조색**: #FF6B6B (코랄)

## 문의 폼 구현

### API 엔드포인트
- **`/api/contact`**: 검증이 포함된 폼 제출 처리기
- **`/api/ping`**: 테스트용 상태 확인 엔드포인트

### 폼 필드 및 검증
- 이름 (필수)
- 이메일 (필수, 형식 검증)
- 전화번호 (선택)  
- 메시지 (필수, textarea)
- 개인정보 처리 동의 체크박스 (필수)

## 개발 도구 및 테스트

### 개발 모드 기능
- **DevModeToggle**: 항상 표시되는 개발 컨트롤
- **AndroidDeviceDebugger**: 성능 메트릭을 포함한 모바일 디바이스 디버깅
- **URL 매개변수 컨트롤**: 레이아웃 테스트를 위한 `?mobile=true/false`

### 포괄적인 테스트 아키텍처
이 프로젝트는 광범위한 Playwright 기반 테스트를 포함합니다:

**디바이스 커버리지**:
- Android: Galaxy S21, Pixel 5, Galaxy Tab
- iOS: iPhone 15, iPhone 15 Pro, iPhone 15 Pro Max, iPad Pro
- Desktop: Chrome, Safari (비교 기준선)

**테스트 카테고리**:
- 크로스 플랫폼 호환성 테스트
- 스크린샷 비교를 통한 시각적 회귀 테스트
- 애니메이션 성능 테스트 (60fps 검증)
- 모바일 접근성 테스트 (WCAG 준수)

### 테스트 모범 사례
- 충돌 방지를 위해 포트 3002에서 테스트 실행
- 실제 사용자 에이전트를 사용한 포괄적인 모바일 디바이스 에뮬레이션
- 실패 분석을 위한 비디오 녹화 및 스크린샷
- 애니메이션 검증을 위한 성능 메트릭 수집

## 주요 구현 참고사항

### 모바일 전용 아키텍처 결정
- **이중 레이아웃 시스템**: 최적 성능을 위한 별도 모바일/데스크톱 컴포넌트 트리
- **안드로이드 최적화**: 안드로이드 디바이스를 위한 특정 CSS 속성 및 이벤트 처리
- **터치 최적화**: 사용자 정의 스크롤 동작 및 터치 액션 컨트롤
- **성능 컨텍스트**: 모바일 성능 모니터링을 위한 React 컨텍스트

### 코드 품질 표준
- 모든 애니메이션은 모바일 디바이스에서 60fps 성능을 유지해야 함
- 모바일 터치 스크롤이 지원되는 모든 디바이스에서 원활하게 작동해야 함
- SEO 메타 태그가 layout.tsx에서 한국어 로컬라이제이션으로 적절히 구성됨
- 접근성 기능 (대체 텍스트, 키보드 내비게이션) 필수
- 크로스 브라우저 테스트 필요 (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)

## 문서 참조

세부 사양은 다음에서 확인할 수 있습니다:
- `docs/PRD.md` - 완전한 프로젝트 요구사항 및 섹션 사양
- `docs/TECH_STACK.md` - 기술 스택 세부사항
- `docs/DEVELOPMENT_GUIDE.md` - 개발 단계 및 체크리스트
- `docs/DESIGN_SYSTEM.md` - 디자인 가이드라인 및 컴포넌트
- `docs/SECTIONS_SPEC.md` - 세부 섹션 사양