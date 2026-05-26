# 통합 검토보고서 — Recordare 전반 (PRD + Plan + UX + Workflow + 프로토타입)

> **회의 주관**: CTO (가상)
> **회의 일자**: 2026-05-25
> **회의 형식**: 6인 전문가 동기 검토 + 비동기 보고서 통합
> **참석자**: PM Lead / Tech Architect / UX/UI Lead / Service Planner / Frontend Lead / Security & Compliance Lead

| 항목 | 값 |
|------|-----|
| **종합 평점 (가중 평균)** | ⭐⭐⭐⭐☆ **4.17 / 5** |
| **합의된 Critical 이슈** | **14건** (분야별 합산) |
| **합의된 Important 이슈** | **31건** |
| **Plan v1.1 → Design 진입 가능성** | ✅ **조건부 가능** (Critical P0 8건 해소 후) |
| **출시 (M6 Beta) 가능성** | ⚠️ **외부 자문 + 의료법 보강 필수** |

---

## 1. 회의 안건 (Agenda)

```
09:00 - 09:10  CTO 개요 + 검토 범위 확정
09:10 - 09:25  PM Lead 보고 (PRD)
09:25 - 09:40  Tech Architect 보고 (Plan + 아키텍처)
09:40 - 09:55  UX/UI Lead 보고 (UX 구조 + 디자인 시스템)
09:55 - 10:10  Service Planner 보고 (Workflows + 권한)
10:10 - 10:25  Frontend Lead 보고 (프로토타입 코드)
10:25 - 10:40  Security & Compliance 보고 (의료법·개인정보·감사)
10:40 - 11:30  통합 토론 + Critical 합의
11:30 - 11:50  Action Item 우선순위 매트릭스
11:50 - 12:00  CTO 결론 + 다음 단계 의사결정
```

---

## 2. 분야별 평점 종합

| # | 검토자 | 영역 | 점수 | Critical | Important |
|---|--------|------|:---:|:--------:|:--------:|
| 01 | 🎯 PM Lead | PRD 전략·시장·페르소나 | 4.2/5 | 2 | 4 |
| 02 | 🏗️ Tech Architect | Plan·아키텍처·기술스택 | 4.0/5 | 3 | 5 |
| 03 | 🎨 UX/UI Lead | UX·디자인 시스템·접근성 | 4.6/5 | 1 | 4 |
| 04 | 📋 Service Planner | 워크플로우·권한·페르소나 | 4.3/5 | 2 | 6 |
| 05 | 💻 Frontend Lead | 프로토타입 코드 품질 | 4.0/5 | 2 | 7 |
| 06 | 🔒 Security & Compliance | 의료법·보안·감사 | 3.9/5 | 4 | 5 |
| — | **CTO 종합 (가중 평균)** | — | **4.17/5** | **14** | **31** |

### 점수 시각화

```
PM Lead         ████████████████░░░░  4.2
Tech Architect  ████████████████░░░░  4.0
UX/UI Lead      ██████████████████░░  4.6  ⭐ 최고점
Service Planner ████████████████░░░░  4.3
Frontend Lead   ████████████████░░░░  4.0
Security        ████████████████░░░░  3.9  ⚠ 최저점
─────────────────────────────────────
종합 평균        ████████████████░░░░  4.17
```

---

## 3. 분야별 강점 요약 (Top 3)

### 🎯 PM Lead
1. PRD 누적 구조 v1.0→v2.2 결정 컨텍스트 100% 보존 (Changelog C1~C18)
2. 7종 페르소나 + JTBD 6-Part + 비치헤드 수도권 그룹홈 30곳 명확
3. 자가진단 §20 추가의 전략적 가치 (신규 진단 보호자 First Value 강화)

### 🏗️ Tech Architect
1. Next.js + Node + PG + Redis 검증된 스택 + 모노레포 명확한 경계
2. PWA 우선 결정 + Service Worker + IndexedDB 오프라인 정합
3. 횡단 관심사 4종(인증·권한·오프라인·알림) 명시적 분리

### 🎨 UX/UI Lead
1. 5색 생애주기 시스템 일관 적용 + 색약 대응 패턴 동반
2. 인지 접근성 5원칙 (KWCAG·WCAG 직접 인용)
3. 당사자 모드 별도 셸 (24px·거대 카드·TTS·픽토그램) — 업계 시그니처

### 📋 Service Planner
1. 권한 매트릭스 5×20 = 100셀 ✅/△/❌ 명시
2. 18세 이양 6개월 D-180~D+30 8단계
3. 페르소나·FR·화면 3-way trace 완비

### 💻 Frontend Lead
1. App Router 41화면 1:1 매핑 + 빌드 안정성 100%
2. Tailwind 토큰 일관성 (인라인 컬러 0건 가까움)
3. 의료법 면책 텍스트 패턴 통일 (4 위치)

### 🔒 Security & Compliance
1. 의료법 안전 면책 (FR-68) 사전 명시 + Risk #10 식별
2. 18세 이양 법적 정합 (한국 민법 §938~§959 직접 인용)
3. 데이터 이동권 JSON 표준 GDPR Art.20 호환

---

## 4. 합의된 Critical 이슈 14건 (출시 전 해소 필수)

### 4.1 6인 전원 합의 — 출시 차단급 (P0 — M3 이전 해소)

| # | 이슈 | 책임 분야 | 영향 | 해소 시점 |
|---|------|----------|------|----------|
| **🔴 C1** | **의료법 변호사 자문 미위촉** | Security · PM | Risk #10 출시 차단, 의료법 §27 위반 | **M3 이전** |
| **🔴 C2** | 개인정보 분리 동의 시퀀스 부재 | Security · UX | 개인정보보호법 §22 위반 | Sprint 1 |
| **🔴 C3** | 데이터 모델 ERD 부재 | Tech | 구현 시작 불가 | Design 단계 |
| **🔴 C4** | 권한 정책 엔진 (5×20 매트릭스) 결정 보류 | Tech · Service | 권한 마스킹 일관성 위험 | Design 단계 |
| **🔴 C5** | 단위업무 간 트랜잭션 경계 미정 (Saga) | Tech · Service | 분산 트랜잭션 실패 | Design 단계 |
| **🔴 C6** | Audit Log 위변조 방지 (해시 체인) 부재 | Security · Tech | 내부자 조작 증거력 약화 | Sprint 3 |
| **🔴 C7** | LLM 가드레일 자동화 약함 | Security · Tech | 의료적 표현 위반 누락 | Sprint 5 |
| **🔴 C8** | 시장 규모·경쟁 분석 깊이 부족 | PM | 투자자·파트너 신뢰 | PRD v2.3 |

### 4.2 분야별 Critical (보조)

| # | 이슈 | 책임 | 해소 |
|---|------|------|------|
| C9 | 외부 API 4종 동시 PoC 일정 부담 (Sprint 0 분할) | Tech | Sprint 0a/0b |
| C10 | 정식 Design Anchor 부재 | UX | Design |
| C11 | 권한 △ 조건 100% 명세 부재 | Service · Tech | Design |
| C12 | 상태 관리 인프라 부재 (Query + Zustand) | Frontend | Sprint 1 |
| C13 | 면책 배너 컴포넌트 분리 부재 | Frontend · UX | Sprint 1 |
| C14 | 미성년 자녀 의사 표명 변호사 자문 | Security · Legal | M3 |

---

## 5. 토론 결과 — 분야 간 충돌·시너지

### 5.1 충돌 영역 (Conflict)

| # | 충돌 | 영역 A | 영역 B | CTO 결정 |
|---|------|--------|--------|---------|
| F1 | 외부 API 의존 vs 자체 모델 | Tech (Whisper API) | Security (데이터 거주성) | NCP + Whisper 자체 호스팅 검토 (Design) |
| F2 | Hi-fi 디자인 vs Sprint 일정 | UX (다크모드·i18n) | Tech (M3-M6 25 FR) | Hi-fi는 GA 1.0으로 이연, MVP는 라이트 모드만 |
| F3 | 권한 마스킹 세밀도 vs 구현 복잡도 | Service (OPA 100셀) | Frontend (개발 부담) | Design PoC 2주로 의사결정 후 단순화 |

### 5.2 시너지 영역 (Synergy)

| # | 시너지 | 분야 결합 | 효과 |
|---|--------|----------|------|
| S1 | 자가진단 + 18세 이양 | PM(§15) + Service(B12) + UX(B.1.4) | AIR-SDS 결과 → 이양 D-90 의사결정 근거 → 데이터 흐름 정합 |
| S2 | 면책 자동 노출 + 컴포넌트화 | Security(FR-68) + Frontend(DisclaimerBanner) | 단일 변경 점으로 LLM 가드레일 + 워터마크 통합 |
| S3 | 5색 생애주기 + 페르소나 카드 | UX + Service + Frontend | 타임라인·자가진단·페르소나 동일 색상 → 인지 부담 ↓ |
| S4 | 권한 매트릭스 + 회의 자료 마스킹 | Service + Security | OPA 도입 시 케이스 회의 자료의 권한 외 N건 자동 비공개 가능 |

---

## 6. Action Items 우선순위 매트릭스 (45건 통합)

### 6.1 P0 — M3 이전 해소 (출시 차단급, 14건)

```
[법무·외부]
A1   의료법·전자상거래법 변호사 위촉                  → M3 이전 (Security)
A2   미성년 자녀 의사 표명 변호사 자문               → M3 (Security · Legal)
A3   국내 경쟁 SaaS 5종 + 공공 5종 분석               → PRD v2.3 (PM)
A4   PRD §3.5 시장 산정 워크시트 신설                → PRD v2.3 (PM)
A5   M3 이전 시설 5곳 가격 사전 인터뷰              → 영업 + PM

[Design 단계 진입]
A6   Design §5 데이터 모델 ERD + Prisma 스키마      → Design (Tech)
A7   권한 정책 엔진 PoC (코드 vs OPA) 2주           → Design (Tech)
A8   Design §6 트랜잭션 경계 Saga 패턴              → Design (Tech · Service)
A9   `recordare.design-anchor.md` 정식 캡처         → Design (UX)
A10  Sprint 0 → 0a (PoC) + 0b (코어) 분할           → Design (Tech)

[Sprint 1]
A11  TanStack Query + Zustand 인프라               → Sprint 1 (Frontend)
A12  `<DisclaimerBanner />` 단일 컴포넌트         → Sprint 1 (Frontend · UX)
A13  개인정보 분리 동의 화면 시퀀스 명세           → Sprint 1 (Security · UX)
A14  Audit Log 해시 체인 도입                       → Sprint 3 (Backend · Security)
```

### 6.2 P1 — Sprint 진행 중 (31건, 요약)

| Sprint | P1 Action Items | 책임 |
|:------:|----------------|------|
| **0a (PoC)** | LLM 가드레일 정규식+임베딩 / axe-core CI / 권한 OPA PoC | Tech · Security · Frontend |
| **0b (코어)** | 호스팅 NCP 우선 / 외부 의존성 SLA 매트릭스 / 컴포넌트 props 인터페이스 | Tech · Frontend |
| **1** | UserPreferences 모델 / E2E 회귀 5개 / 동의 시퀀스 / 권한 JSON 100셀 | UX · QA · Security |
| **2-3** | 기록 코어 + 권한 매트릭스 / 다자녀·후견 분기 / 자격증 진위 API | Tech · Service |
| **4** | 자가진단 + 오프라인 + k6 부하 테스트 | Tech · DevOps |
| **5** | M-CHAT-R + AI 추이 + 모바일 실기 + Bundle 최적화 + LLM 자동 가드 | Frontend · QA · Backend |
| **M5W4** | 1차 침투 테스트 | Security |
| **M6W4** | Beta 오픈 + 2차 침투 테스트 + 모니터링 | Security · DevOps |

---

## 7. 출시 가능성 평가 (Go/No-Go)

### 7.1 출시 차단 요인 (현재 시점)

| 요인 | 상태 | 해소 일정 | Risk |
|------|:---:|:--------:|:---:|
| 의료법 자문 미위촉 | ⛔ | M3 이전 | 致命 → 긴급 |
| 개인정보 분리 동의 시퀀스 부재 | ⛔ | Sprint 1 | 높음 |
| Audit Log 위변조 방지 부재 | ⚠️ | Sprint 3 | 높음 |
| LLM 가드레일 자동화 약함 | ⚠️ | Sprint 5 | 중간 |
| ERD·권한 엔진 미결정 | ⏳ | Design | 구현 차단 |

### 7.2 출시 평가

| 단계 | 상태 | 권고 |
|------|:---:|------|
| **Plan v1.1 → Design 진입** | 🟡 **조건부 GO** | Critical C1, C2, C3, C4, C5 해소 시 |
| **Design → Do 진입** | 🟡 **조건부 GO** | A1~A10 P0 완료 시 |
| **M6 Beta 오픈** | 🔴 **NO-GO** | 의료법 자문 + 동의 시퀀스 + Audit 체인 + 침투 테스트 필수 |

### 7.3 권장 출시 시나리오

```
┌─────────────────────────────────────────────────────────────┐
│  M0 (현재) → M3 (의료법 자문 + 영업) → M6 (Beta) → M12 (GA) │
├─────────────────────────────────────────────────────────────┤
│  현재: Plan v1.1 완료, Critical 14건 식별                   │
│   ↓ A1~A14 P0 해소 (M0~M3)                                  │
│  M3: Design 단계 진입                                        │
│   ↓ Sprint 0a(PoC) → 0b → 1 → 2 → 3 → 4 → 5                │
│  M6 W4: Beta 오픈 (8곳 시범, 150명)                          │
│   ↓ 분기 평가 + Iteration                                    │
│  M12: GA 1.0 (B2B 결제·18세 이양 정식)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. CTO 결론 (Decision Record)

### 8.1 Strategic Decisions

| # | 결정 | 근거 |
|---|------|------|
| D1 | **MVP Beta 범위 유지** (25 FR) | Plan v1.1 적절 — 추가 확장 없음 |
| D2 | **NCP 호스팅 우선 검토** | 데이터 거주성 + B2G 친화 (Security + Tech 합의) |
| D3 | **Sprint 0 분할** (0a PoC 2주 + 0b 코어 1주) | Tech Architect 권고 수용 |
| D4 | **권한 엔진 결정 보류 → Design PoC** | 코드 vs OPA 2주 벤치마크 후 결정 |
| D5 | **의료법 자문 M3 이전 위촉 필수** | 출시 차단 요인 (Security #1 권고) |
| D6 | **다크 모드·i18n은 GA 1.0 이연** | MVP는 라이트 한국어만 (UX·Tech 일정 보호) |
| D7 | **DisclaimerBanner 컴포넌트 분리 의무** | FR-68 자동화 (Frontend + Security 합의) |
| D8 | **Audit Log 해시 체인 도입** | 내부자 조작 방지 + 분쟁 시 증거력 |

### 8.2 다음 단계

```
1단계 (M0~M3, 4주):
  □ 의료법·전자상거래법 변호사 위촉 (Legal)
  □ 미성년 자녀 의사 표명 자문 (Legal)
  □ PRD v2.3 시장 산정·경쟁 분석 보강 (PM)
  □ 시범 시설 5곳 가격 사전 인터뷰 (영업+PM)
  □ 자문단 5인 모집 (Korea Disability)
  □ NCP·Toss Payments 사전 협력 (Tech+영업)

2단계 (M3 진입):
  □ /pdca design recordare 실행
  □ ERD + Prisma 스키마 (Tech)
  □ 권한 엔진 PoC (코드 vs OPA, 2주)
  □ Sprint 0a PoC 환경 셋업
  □ Design Anchor 캡처 (UX)
  □ Saga 패턴 명세 (Tech+Service)

3단계 (M3~M6, Sprint 0~5):
  □ MVP Beta 25 FR 구현
  □ M5W4 침투 테스트 1차
  □ M6W4 Beta 오픈 + 침투 테스트 2차

4단계 (M6 이후):
  □ /pdca analyze recordare (Gap 분석)
  □ /pdca iterate (필요 시)
  □ /pdca report (완료 보고)
```

---

## 9. 다음 분야별 검토 일정 (Iteration)

| 시점 | 검토 항목 | 검토자 |
|------|----------|--------|
| M3 (Design 진입 직후) | ERD·권한 엔진 결정 결과 | Tech Architect 단독 |
| M3.5 | Design Anchor + Sprint 0a 결과 | UX/UI · Tech 공동 |
| M5 (Sprint 4 종료) | 자가진단·오프라인 통합 검증 | Service · Frontend · Security |
| M5.5 (Sprint 5 시작) | LLM 가드레일 + 모바일 실기 | Security · Frontend |
| M6 W3 (Beta 직전) | 침투 테스트 1차 + 동의 시퀀스 | Security |
| **M6 W4 (Beta 후 +2주)** | **전사 회고 + Iteration 계획** | **CTO + 6인 전원** |

---

## 10. 첨부 — 6개 분야별 보고서

| # | 파일 | 검토자 |
|---|------|--------|
| 01 | `docs/06-review/01-pm-lead-review.md` | PM Lead |
| 02 | `docs/06-review/02-tech-architect-review.md` | Tech Architect |
| 03 | `docs/06-review/03-uxui-lead-review.md` | UX/UI Lead |
| 04 | `docs/06-review/04-service-planner-review.md` | Service Planner |
| 05 | `docs/06-review/05-frontend-lead-review.md` | Frontend Lead |
| 06 | `docs/06-review/06-security-compliance-review.md` | Security & Compliance Lead |

---

**문서 종료 — 통합 검토보고서 v1.0**
**검토 주관**: CTO (가상)
**다음 검토**: M3.5 (Design Anchor + Sprint 0a 종료 시점)
