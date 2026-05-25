# 분야별 검토보고서 — 05. Frontend Lead

> **검토자**: 가상 Frontend Lead (Next.js · React · Tailwind · Code Quality)
> **검토일**: 2026-05-25
> **검토 범위**: prototype/ 코드 (41화면, 51 파일, ~4,200 lines) + mock-data + 컴포넌트

| 항목 | 값 |
|------|-----|
| 종합 평점 | ⭐⭐⭐⭐☆ 4.0 / 5 |
| Critical 이슈 | 2건 |
| Important 이슈 | 7건 |
| Do 단계 진입 가능성 | ✅ 가능 (현재는 정적 프로토타입, API 연결만 추가) |

---

## 1. 검토 대상

- `prototype/package.json` — Next 15.5.18 + React 19 + Tailwind 3.4
- `prototype/src/app/` — 41 page.tsx + 6 layout.tsx (App Router)
- `prototype/src/components/` — AppHeader, RoleSidebar, Card, StepProgress, ModeBanner
- `prototype/src/lib/mock-data.ts` — Person, Screening, 6 페르소나, 4 자가진단 이력 등

## 2. 강점 (Strengths)

### 2.1 App Router 구조의 일관성 — ⭐⭐⭐⭐⭐
- 폴더 = 라우트 = 화면 1:1 매핑 (38+3=41)
- role 별 layout.tsx로 사이드바·헤더·모드 배너 자동 적용
- Server Component 기본 + 인터랙션 필요한 곳만 Client 패턴 가능

### 2.2 Tailwind 디자인 토큰 일관 — ⭐⭐⭐⭐⭐
- `tailwind.config.ts`에 primary/accent/alert/life-* 토큰 정의
- 모든 화면이 동일 토큰 사용 (커스텀 컬러 인라인 0건 가까움)
- `.card / .btn-primary / .btn-secondary` 등 Layer Components 활용

### 2.3 TypeScript 타입 안전성 — ⭐⭐⭐⭐
- `Person`, `Screening*`, `LifeStage`, `Category`, `Role` 등 ENUM 명확
- mock-data가 타입 정의의 single source

### 2.4 의료법 안전 자동 노출 — ⭐⭐⭐⭐⭐
- 자가진단 3화면 모두 면책 배너를 페이지 상단에 의무 노출
- 컴포넌트 분리는 안 됐지만 텍스트가 비슷한 패턴으로 통일

### 2.5 41화면 무리 없는 빌드 — ⭐⭐⭐⭐⭐
- HTTP 200 모두 응답
- 컴파일 평균 < 500ms (캐시 이후)
- 페이지당 80~100 KB HTML — Next.js streaming SSR 활용

## 3. 약점 / 개선점 (Weaknesses)

### 3.1 🔴 Critical — 상태 관리 인프라 부재
- 현재는 mock-data를 직접 import → **사용자 상호작용 후 상태 변경 흐름 0**
- TanStack Query (서버 상태) + Zustand (클라이언트 상태) 도입 결정만 있고 코드 없음
- Do 단계에서 API 연결 시 **모든 화면 동시 리팩토링** 부담
- **권장**: Sprint 1에 Query/Zustand 인프라 셋업 후 화면별 단계 마이그레이션

### 3.2 🔴 Critical — 면책 배너 컴포넌트 분리 부재
- FR-68 자동 노출이 텍스트 복사로 구현 (4개 위치) → **문구 변경 시 누락 위험**
- LLM 출력 가드레일 미구현 (LLM 호출 자체가 없는 정적 프로토타입)
- **권장**: `<DisclaimerBanner kind="medical" fr="FR-68" />` 단일 컴포넌트 + 자동 워터마크

### 3.3 🟡 Important — Server Component / Client Component 경계 미명시
- 모든 page.tsx가 Server Component 기본이지만 `useState`·`onClick` 등 사용 안 됨
- Do 단계에서 클라이언트 인터랙션 추가 시 `"use client"` 분리 필요
- **권장**: Design 단계에 컴포넌트별 SC/CC 명세

### 3.4 🟡 Important — 접근성 자동 검사 미설정
- axe-core, eslint-plugin-jsx-a11y 미설치
- aria-label·htmlFor·alt 등 누락 위험 (현재는 수동 검토만)
- **권장**: Sprint 0a에 axe-core CI 통합 + WCAG 자동 검사 게이트

### 3.5 🟡 Important — 컴포넌트 prop 타입 누락
- `Card.tsx`의 `LifeBadge`, `CategoryChip`은 타입 명확하나 `StatCard`, `PageHeader` 등은 props가 산발적
- 일부 인라인 객체 prop 사용
- **권장**: 컴포넌트별 prop interface 정식 export (`PageHeaderProps` 등)

### 3.6 🟡 Important — 응답성·모바일 검증 부족
- `lg:grid-cols-*` 기반 데스크탑 우선
- 모바일 사이드바 토글 (Drawer) 미구현
- **권장**: Sprint 5 모바일 실기 테스트 + Drawer 컴포넌트 추가

### 3.7 🟡 Important — 이미지·아이콘 emoji 의존
- 카테고리 픽토그램 (🍚💊🏃💭📘), 페르소나 (👶🧒👦🧑👵) — emoji 사용
- 시스템 폰트에 따라 표시 차이 (iOS·Windows·Linux)
- KWCAG 2.2 픽토그램 표준 부합 검증 안 됨
- **권장**: SVG 픽토그램 컴포넌트화 (선택 — 빠른 프로토타입은 emoji 허용)

### 3.8 🟡 Important — 테스트 코드 0건
- Vitest·Playwright 인프라 결정만 있고 코드 없음
- 회귀 테스트 자동화 안 됨 (예: FR-18 2단계 확인 누락 차단 회귀 TC-13)
- **권장**: Sprint 1부터 E2E 회귀 5개 (가입·일지·인계서·AAC 동의·자가진단)

### 3.9 🟡 Important — Bundle Size 최적화 미검토
- 현재 페이지당 80~100 KB (개발 모드)
- production build 시 크기·LCP 측정 안 됨
- **권장**: `next build` 후 bundle analyzer로 정적 자산 최적화 (Sprint 5)

## 4. Critical 이슈

| # | 이슈 | 영향 | 해소 방법 |
|---|------|------|----------|
| C1 | 상태 관리 인프라 부재 | API 연결 시 전체 리팩토링 부담 | Sprint 1에 Query + Zustand 셋업 |
| C2 | 면책 배너 컴포넌트화 부재 | 문구 변경 누락 위험 (FR-68 위반) | `<DisclaimerBanner />` 단일 컴포넌트 |

## 5. 권장 사항 (Action Items)

| # | 항목 | 우선순위 | 책임자 |
|---|------|:------:|------|
| A1 | TanStack Query + Zustand 인프라 (Sprint 1) | 🔴 P0 | Frontend |
| A2 | DisclaimerBanner 단일 컴포넌트화 | 🔴 P0 | Frontend |
| A3 | axe-core + jsx-a11y CI 통합 (Sprint 0a) | 🟡 P1 | Frontend + DevOps |
| A4 | 컴포넌트 prop interface 정식 export | 🟡 P1 | Frontend |
| A5 | 모바일 Drawer + 실기 테스트 (Sprint 5) | 🟡 P1 | Frontend + QA |
| A6 | E2E 회귀 5개 (Sprint 1 시작) | 🟡 P1 | QA |
| A7 | Bundle Analyzer + LCP 최적화 (Sprint 5) | 🟡 P1 | Frontend |
| A8 | SVG 픽토그램 컴포넌트화 (선택) | 🟢 P2 | UX + Frontend |

## 6. 점수 평가

| 항목 | 점수 | 메모 |
|------|:---:|------|
| App Router 구조 | 5/5 | 41 화면 1:1 매핑 |
| Tailwind 토큰 일관성 | 5/5 | 인라인 컬러 거의 없음 |
| TypeScript 타입 안전 | 4/5 | Person·Screening 우수, 컴포넌트 props 부분 누락 |
| 의료법 자동 노출 | 4/5 | 패턴 통일, 컴포넌트화 미흡 |
| 상태 관리 | 2/5 | 인프라 부재 |
| 접근성 자동화 | 2/5 | axe-core 미설치 |
| 테스트 자동화 | 1/5 | 0건 |
| 빌드 안정성 | 5/5 | 41 라우트 모두 200 |
| **종합** | **4.0/5** | **정적 프로토타입으로 우수, Do 단계 인프라 보강 필수** |

---

**결론**: 정적 프로토타입으로서는 매우 우수합니다. App Router 구조·Tailwind 토큰·의료법 자동 노출이 강점. Do 단계 진입 시 상태 관리·테스트·접근성 자동화 3개 인프라를 Sprint 1 이전에 셋업하는 것이 핵심입니다.
