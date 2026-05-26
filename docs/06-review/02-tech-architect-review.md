# 분야별 검토보고서 — 02. Tech Architect

> **검토자**: 가상 Tech Architect (Backend Architecture · System Design)
> **검토일**: 2026-05-25
> **검토 범위**: Plan v1.1 / 기술 스택 / 아키텍처 / 데이터 모델 / 외부 연동

| 항목 | 값 |
|------|-----|
| 종합 평점 | ⭐⭐⭐⭐☆ 4.0 / 5 |
| Critical 이슈 | 3건 |
| Important 이슈 | 5건 |
| Design 진입 가능성 | ✅ 조건부 (Critical 3건 해소 후) |

---

## 1. 검토 대상 문서

- `docs/01-plan/features/recordare.plan.md` v1.1 — MVP Beta 25 FR (M3-M6)
- `docs/00-pm/recordare-prd-v2.md` §17 결제·§18 후견 §19 외부연동 §20 자가진단
- `docs/00-pm/recordare-workflows.md` v1.2 §0.3 횡단 관심사 (인증·권한·오프라인·알림)

## 2. 강점 (Strengths)

### 2.1 스택 선정의 일관성 — ⭐⭐⭐⭐⭐
- Next.js 15 + Node.js/Express + PostgreSQL 16 + Redis 7 — **검증된 조합, 신규 학습 비용 최소**
- Prisma ORM + NextAuth.js v5 — RBAC + Row-Level Security 자연스러운 통합
- 모노레포 구조 (apps/web + apps/api + packages/shared/ui/db/access-control) **명확한 경계**

### 2.2 PWA 우선 결정 — ⭐⭐⭐⭐⭐
- 보호자 진입 장벽 최소화 (앱 설치 불필요)
- Service Worker + IndexedDB로 **오프라인 큐 (FR-30~34)** 정상 구현 가능
- iOS Safari 백그라운드 동기화 제약을 Risk #MVP-4로 사전 식별

### 2.3 횡단 관심사 (Cross-Cutting Concerns) 분리 — ⭐⭐⭐⭐⭐
- 인증·세션 / 권한 검증 / 오프라인 큐 / 알림 매트릭스 4개 횡단 정책을 명시 (Workflows §0.3)
- 권한 매트릭스 5×20 = 100셀 RBAC+ABAC 정책으로 일원화

### 2.4 5-Sprint 흐름 (M3-M6) — ⭐⭐⭐⭐
- Vertical Slice 원칙 (각 Sprint = End-to-End 사용자 흐름)
- Sprint 1 인증/RBAC → Sprint 2 기록 → Sprint 3 권한·AAC·인계서 → Sprint 4 온보딩·오프라인·자가진단 → Sprint 5 접근성·알림·PDF
- 의존성 순서 합리적

## 3. 약점 / 개선점 (Weaknesses)

### 3.1 🔴 Critical — 데이터 모델 ERD 부재
- Plan에 `User / Person / Permission / Journal / Handover / AuditLog` 6개 엔티티 개요만 있음
- **Person 인터페이스 20+ 필드를 어떻게 정규화할지 결정 안 됨** (의료/식사/위험은 별도 테이블 vs JSON)
- 자가진단 도구별 스키마 (K-DST 48문항 vs M-CHAT-R 20문항) 매우 다름 — 통합 vs 분리 결정 필요
- **권장**: Design 단계에 정식 ERD + Prisma 스키마 + 마이그레이션 전략 명시

### 3.2 🔴 Critical — 권한 매트릭스 5×20 정책 평가 엔진 미정
- 권한 매트릭스 100셀의 의사결정 엔진을 코드로 구현 vs OPA (Open Policy Agent) 사용 결정 보류
- 케이스 회의 자료 (B17) "권한 외 N건 비공개" 등 **세밀 마스킹** 구현 복잡도 평가 안 됨
- **권장**: Design 단계 §4 권한 정책 평가 방식 명세 + PoC 2주 (코드 vs OPA 벤치마크)

### 3.3 🔴 Critical — STT/Vision/OCR/LLM 의존성 4종 동시 PoC 부담
- Whisper or Clova STT (PoC E1, 4주) + GPT-Vision (마이그레이션) + Clova OCR (종이 노트) + GPT/Claude (AI 추이 인사이트)
- **Sprint 0 1주에 모두 셋업 불가능** — 외부 API 4종 동시 의존
- LLM 가드레일 (의료 표현 0건, FR-67/68) 회귀 테스트 디자인 부재
- **권장**: Sprint 0 → Sprint 0a (PoC 2주) + Sprint 0b (코어 1주) 분할

### 3.4 🟡 Important — Audit Log 5년 보존 인프라 설계 부재
- NFR-07 + FR-47에 5년 보존 명시되나 **저장 인프라 미정**
  - PostgreSQL partition? OpenSearch? S3 Glacier?
- MVP 1년차 1,000만 건 로그 (NFR-04) → 5년차 5,000만+ 가정 시 비용·검색 영향 큼
- **권장**: Design 단계 §10.5 Audit Log 아키텍처 (Hot/Warm/Cold 3-Tier)

### 3.5 🟡 Important — 외부 API 장애 대응 미정
- PASS·STT·Vision·SMS·국세청 API 등 **단일 장애점(SPOF) 식별 안 됨**
- 각 외부 의존성에 대한 graceful degradation 시나리오 부재
- **권장**: 외부 의존성별 SLA + Fallback 정책 매트릭스

### 3.6 🟡 Important — 호스팅 결정 보류 (Q-02)
- AWS vs NCP — Plan에 보류로 명시되나 **데이터 거주성** (의료 데이터 국내 보존 의무) 관점에서 NCP 권장 가능성
- ISMS-P 인증 환경 영향
- **권장**: Design §10.1에 결정. NCP 우선 검토 (B2G 친화)

### 3.7 🟡 Important — 동시 사용자 1,000명 (NFR-04 MVP) 검증 부재
- MVP는 시범 8곳 (150명) → 1,000명까지 여유 있으나, **권한 정책 평가 + Audit Log + 알림 발사 동시 부하** 미검증
- **권장**: Sprint 4에 k6 부하 테스트 환경 셋업 + 1,000 동시 시뮬레이션

### 3.8 🟡 Important — 자가진단 LLM 가드레일 회귀 자동화 부재
- "의료 표현 0건" (SC-14) 측정 방법이 분기 샘플링 수동
- **권장**: LLM 출력 → 의료 표현 정규식 + 임베딩 분류기 이중 가드 + CI 회귀

## 4. Critical 이슈 (Design 진입 전 해소)

| # | 이슈 | 영향 | 해소 방법 |
|---|------|------|----------|
| C1 | 데이터 모델 ERD 부재 | 구현 시작 불가 | Design §5 정식 ERD + Prisma 스키마 |
| C2 | 권한 정책 엔진 결정 보류 | 5×20 매트릭스 구현 방식 미정 | Design §4 + 2주 PoC (코드 vs OPA) |
| C3 | 외부 API 4종 동시 PoC 일정 부담 | Sprint 0 1주 부족 | Sprint 0a (PoC 2주) + 0b (코어 1주) 분할 |

## 5. 권장 사항 (Action Items)

| # | 항목 | 우선순위 | 책임자 |
|---|------|:------:|------|
| A1 | Design §5 데이터 모델 ERD + Prisma 스키마 | 🔴 P0 | Tech + Backend |
| A2 | 권한 정책 엔진 PoC (코드 vs OPA) 2주 | 🔴 P0 | Backend |
| A3 | Sprint 0 → 0a + 0b 분할 (PoC + 코어) | 🔴 P0 | Tech Lead |
| A4 | Audit Log Hot/Warm/Cold 3-Tier 아키텍처 | 🟡 P1 | Tech + DevOps |
| A5 | 외부 의존성 SLA·Fallback 매트릭스 | 🟡 P1 | Backend |
| A6 | 호스팅 결정 (NCP 우선 검토) | 🟡 P1 | Tech + 영업 |
| A7 | k6 부하 테스트 환경 (Sprint 4) | 🟡 P1 | DevOps |
| A8 | LLM 가드레일 회귀 자동화 (정규식+임베딩) | 🟡 P1 | Backend + Data |

## 6. 점수 평가

| 항목 | 점수 | 메모 |
|------|:---:|------|
| 스택 일관성 | 5/5 | Next.js + Node + PG + Redis 최적 |
| PWA 결정 적절성 | 5/5 | 진입 장벽 최소화 검증 |
| 횡단 관심사 분리 | 5/5 | 4개 정책 명시 우수 |
| 데이터 모델 명확성 | 2/5 | ERD 부재가 가장 큰 약점 |
| Sprint 계획 현실성 | 4/5 | Sprint 0 부담 외 양호 |
| 외부 의존성 관리 | 3/5 | SLA·Fallback 미정 |
| 보안·감사 아키텍처 | 3/5 | Audit Log 5년 보존 인프라 미정 |
| **종합** | **4.0/5** | **Design 단계 ERD·권한 엔진 결정 시 우수** |

---

**결론**: 스택 선정과 5-Sprint 흐름은 우수합니다. 데이터 모델 ERD + 권한 정책 엔진 결정이 Design 단계의 **최우선 결정 항목**입니다. Sprint 0 분할은 외부 API 4종 동시 의존성 부담을 합리적으로 분산시킵니다.
