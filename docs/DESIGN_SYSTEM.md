# 디자인 시스템 & 가이드라인

## 🎨 컬러 팔레트

- **주색상**: #FF0000 (유튜브 레드)
- **보조색상**: #1976D2 (블루)
- **배경색**: #FFFFFF (화이트)
- **텍스트**: #212121 (다크 그레이)
- **강조**: #FF6B6B (코랄)

## ✍️ 타이포그래피

```css
/* 메인 헤딩 */
font-family: 'Pretendard', 'Inter', sans-serif
font-size: 48px ~ 72px (반응형)
font-weight: 700

/* 서브 헤딩 */
font-size: 24px ~ 36px
font-weight: 600

/* 본문 */
font-size: 16px ~ 18px
font-weight: 400
line-height: 1.6
```

## 📐 컴포넌트 사이즈 가이드

### 카드 디자인
- **캐러셀 카드**: 300px × 200px (간격: 20px, 모서리: 8px)
- **스택 카드**: 전체 너비의 80% (패딩: 2rem)
- **그림자**: subtle shadow (캐러셀), 깊은 shadow (스택)

### 프로그레스 바
- **색상**: #1976D2 (유튜브 브랜드 컬러)
- **너비**: 400px (데스크톱), 90vw (모바일)
- **높이**: 4px
- **모서리**: 둥글게 처리

## 🎭 애니메이션 원칙

### 성능 최적화
- `transform` 속성 우선 사용 (GPU 가속)
- `requestAnimationFrame` 활용
- Intersection Observer로 뷰포트 감지
- 스크롤 이벤트 throttling (16ms)

### 애니메이션 타이밍
- **카드 간 딜레이**: 0.2초
- **캐러셀 속도**: 30px/초
- **모든 애니메이션**: 60fps 목표