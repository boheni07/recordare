# Recordare PM Phase 완료 보고서

> **보고서 유형**: PM Phase 완료 보고 (PRD → Plan → UX → Workflows 문서 작업 사이클)
> **작성일**: 2026-05-27
> **작성자**: PDCA Report (PM Lead · CTO Team)
> **대상 독자**: 개발팀·투자자·운영팀·시범 기관 담당자

---

## Executive Summary

| 관점 | 내용 |
|------|------|
| **Problem** | 지적장애인 당사자의 생애주기(0세~사후) 기록이 기관별로 분절되어 당사자 이양 시 유실되고, 보호자 노화·사망 후 돌봄 공백이 발생. 기존 PRD(v2.4)는 PBS·PCP·사후지원 기록 체계가 누락되어 있었고, 이해관계자(의료진·직업재활사·후견인)가 미정의 상태였음. |
| **Solution** | record_data/ 폴더 4종 기획 문서 + code_artifact-2.html UI 샘플 분석 결과를 CTO팀 협업으로 4개 핵심 문서(PRD·Plan·UX·Workflows)에 통합 흡수. 숨가든(Soom-Garden) 브랜드 콘텐츠를 Recordare로 통합. FR 85건 → 92건, 이해관계자 6종 → 9종, 생애주기 5단계 → 7단계로 확장. |
| **Function/UX** | PBS ABC 구조화 입력 + AI 패턴 분석(FR-84~86), PCP 당사자 선호 프로필 AAC·쉬운말 입력(FR-87), SNT·후견·거주지 원스톱 사후 지원 계획(FR-88~90), 숨가든 그린 대안 디자인 토큰(UX v1.5 §0.3). 문서 정합성 Match Rate 70% → 91%. |
| **Core Value** | "생애 0세~사후까지 끊김 없는 기록" — MVP Beta(M3-M6)가 First Value(일지 15초·인계서 3분)를 달성하고, M7+에서 PBS AI 패턴 분석·PCP 매칭·사후 지원 원스톱이 추가됨으로써 당사자 중심의 전생애 플랫폼 완성. |

---

## 1. 작업 개요

### 1.1 작업 범위

| 항목 | Before | After |
|------|--------|-------|
| PRD 버전 | v2.5 (FR 85건) | **v2.6 (FR 92건)** |
| Plan 버전 | v1.4 | **v1.6** |
| UX Structure 버전 | v1.4 | **v1.5** |
| Workflows 버전 | v1.5 (21종) | **v1.6 (24종)** |
| 이해관계자 수 | 6종 (U1~U6) | **9종 (+MP·VC·LG)** |
| 생애주기 단계 수 | 5단계 | **7단계 (+영아기·사후지원기)** |
| 신규 FR | 0 | **+7건 (FR-84~90)** |
| 단위업무 (Workflows) | 21종 | **24종 (+B22·B23·B24)** |
| 문서 정합성 | 70% (PRD v2.4 기준) | **91% (PRD v2.6 기준)** |

### 1.2 작업 기간

| 일자 | 작업 내용 |
|------|-----------|
| 2026-05-26 | PRD v2.6 작성 (§24 PBS·§25 PCP·§26 사후지원·§27 입력폼 스키마) |
| 2026-05-26 | UX Structure v1.5 작성 (B.8~B.10·대안 디자인 시스템) |
| 2026-05-27 | Workflows v1.6 작성 (B22·B23·B24·MP·VC·LG 역할) |
| 2026-05-27 | Plan v1.6 작성 (LifecycleStage 7단계·RecordCategory 확장) |
| 2026-05-27 | 갭 분석 실행 → Critical 4건·Important 5건 즉시 수정 |

---

## 2. 주요 산출물 목록

### 2.1 생성/수정 문서

| 문서 | 경로 | 버전 | 주요 변경 |
|------|------|------|-----------|
| PRD | `docs/00-pm/recordare-prd-v2.md` | v2.6 | §24~§27 신규 + FR-84~90 + 이해관계자 §0.2 |
| UX Structure | `docs/00-pm/recordare-ux-structure.md` | v1.5 | B.8~B.10 + §0.3 대안 디자인 + 7단계 색상 |
| Workflows | `docs/00-pm/recordare-workflows.md` | v1.6 | B22~B24 + §0.1 MP·VC·LG + §0.4 7단계 |
| Plan | `docs/01-plan/features/recordare.plan.md` | v1.6 | LifecycleStage 7단계·STT 제거·RecordCategory 확장 |
| 갭 분석 | `docs/03-analysis/recordare-v2.6-document-coherence.analysis.md` | v1.0 | 4축 분석·13건 갭 목록 |

### 2.2 신규 추가 참조 자료

| 파일 | 경로 | 역할 |
|------|------|------|
| 생애주기별 지원 플랫폼 데이터 구조 정의서 | `docs/00-pm/record_data/1 지적장애인...md` | DB 스키마 참조 |
| 기록종류별 세부기록 항목 | `docs/00-pm/record_data/2 기록종류별...md` | PBS·PCP 필드 정의 |
| 전생애 기록 체계 및 데이터 항목 정의서 | `docs/00-pm/record_data/3 지적장애...md` | 이해관계자·권한 매트릭스 |
| 숨가든 핵심 용어 사전 | `docs/00-pm/record_data/용어집-숨가든...md` | 도메인 용어 정의 |
| UI 프로토타입 샘플 | `docs/00-pm/record_data/code_artifact-2.html` | 대안 디자인 시스템 참조 |

---

## 3. 핵심 의사결정 기록 (Decision Record)

| # | 의사결정 | 배경 | 결과 |
|---|---------|------|------|
| D1 | 숨가든(Soom-Garden) 콘텐츠 **Recordare로 통합 흡수** | 사용자 확인: "Recordare로 통합 흡수" 선택 | 브랜드 단일화, 용어·데이터 구조 Recordare에 반영 |
| D2 | 숨가든 그린 디자인을 **기존 파랑의 대안 테마**로 추가 | "기존 파랑 유지 + 대안 추가" 선택 | UX v1.5 §0.3 `[data-theme="soomgarden"]` CSS 변수 |
| D3 | **G1~G7 전체 갭 반영** | "전체 반영" 선택 | PRD§24~§27 + UX B.8~B.10 + Workflows B22~B24 모두 완성 |
| D4 | LifecycleStage enum **5단계 → 7단계 확장** | 갭 분석 Critical GAP-A1-04 발견 | Plan §2.0.1 `INFANT·EARLY_CHILDHOOD·POST_CARE` 추가 |
| D5 | PBS RecordCategory를 **별도 카테고리**로 분리 | 기존 `BEHAVIOR_EMOTION`과 스키마 구조 차이 | `PBS_BEHAVIOR_SUPPORT` + `POST_CARE_LEGAL` 신설 |
| D6 | STT 자체 통합 **폐기 확정** (v2.4 결정 재확인) | Plan 내 STT 잔존 6건 발견 (갭 분석) | Plan H2·FR-05·NFR-01·Sprint2·RISK#1 모두 수정 완료 |

---

## 4. 성공 기준 검증 (Plan v1.6 KPI 기준)

> **주의**: 본 보고서는 PM 단계 완료 기준이며, 구현 코드가 없으므로 KPI는 "설계 완비" 여부로 평가.

| KPI | 기준 | 설계 완비 여부 | 근거 |
|-----|------|:---:|------|
| KPI-01 First Value 1h | ≥ 60% 도달율 | ✅ 설계 | B1 온보딩 + B10 인계서 워크플로우 완비 |
| KPI-02 일지 작성 ≤ 5분 | 평균 5분/건 | ✅ 설계 | FR-05 빠른 선택 4종 + B4 워크플로우 |
| KPI-03 인계서 ≤ 5분 | 1건 작성 | ✅ 설계 | B10 3분 인계서 + FR-11 자동 생성 |
| KPI-04 오프라인 ≥ 95% | 동기화 성공률 | ✅ 설계 | FR-30 오프라인 큐 + B15 워크플로우 |
| KPI-05 AAC 만족도 ≥ 4/5 | 자문단 5인 | ✅ 설계 | AAC + 쉬운말 모드 UX 명세 완비 |
| KPI-06 NPS ≥ 30 | 시범 사용자 | ⏳ 미측정 | 시범 운영 이후 측정 가능 |
| M7+ PBS AI | FR-85 패턴 분석 | ✅ 설계 | §24 PBS 모듈 + B22.3 AI 워크플로우 |
| M7+ PCP 매칭 | FR-87 선호 반영 | ✅ 설계 | §25 PCP + B23 워크플로우 |
| M7+ 사후지원 | FR-88~90 | ✅ 설계 | §26 SNT·후견·거주지 + B24 워크플로우 |

**설계 완비율: 8/9 (89%)** — NPS는 시범 운영 후 측정

---

## 5. 문서 정합성 최종 Match Rate

| 분석 기준일 | 대상 | Match Rate | 주요 갭 |
|-----------|------|:---:|---------|
| 2026-05-26 | 프로토타입 vs PRD v2.4 | **70%** | STT 잔존 4건, U6 페르소나 미반영 |
| 2026-05-27 (분석 전) | PRD v2.6 × 4개 문서 | **80%** | STT 잔존 6건, LifecycleStage 5단계, VC 화면 없음 |
| 2026-05-27 (분석 후) | PRD v2.6 × 4개 문서 | **91% ✅** | VC 화면 1건 (M7+ 이연) |

**총 개선: +21%p** (70% → 91%)

---

## 6. 남은 갭 (Design 단계 이연)

| ID | 내용 | 이연 사유 | 담당 단계 |
|----|------|----------|----------|
| GAP-A2-02 | UX v1.6 VC 직업훈련 기록 화면 (B.11) 신설 | M7+ 설계 범위 — MVP에 VC 화면 불필요 | Design M7+ |

---

## 7. 다음 단계 로드맵

### 7.1 즉시 (M3 시작 — Design 단계)

```
/pdca design recordare
```

- Plan v1.6 기반 3가지 아키텍처 옵션 생성
- 데이터 모델 ERD (Prisma 스키마, LifecycleStage 7단계 enum 포함)
- API 명세서 (OpenAPI 3.0, PBS·PCP·사후지원 엔드포인트 포함)
- 권한 매트릭스 189셀 (9종 × 21종) 정책 JSON
- PWA Service Worker 동기화 흐름도

### 7.2 단기 (M3~M6 — MVP Beta 구현)

| Sprint | 범위 | FR |
|--------|------|-----|
| Sprint 1 | 인증·온보딩·프로필 | FR-01,02,07,08 |
| Sprint 2 | 기록 코어 (빠른 선택·사진) | FR-05,06,08 |
| Sprint 3 | 타임라인·인계서 | FR-13~16,11 |
| Sprint 4 | 권한·오프라인·AAC | FR-30,32,17~19,14 |
| Sprint 5 | 자가진단·AI 추이 | FR-62,63,67,68 |
| Sprint 6 | U6 일반교사·후견 | FR-72,73,71 |

### 7.3 M7+ (전생애 고도화)

| 기능 | FR | 이해관계자 |
|------|-----|-----------|
| PBS 도전행동 AI 패턴 분석 | FR-84~86 | MP·U2~U4 |
| PCP 당사자 선호 프로필 | FR-87 | U1·VC |
| 사후 지원 계획 (SNT·후견) | FR-88~90 | LG·U2 |
| VC 직업훈련 기록 화면 | 신규 | VC |

---

## 8. 학습 및 회고 (Learnings & Retrospective)

### 8.1 잘 된 점 ✅

1. **record_data 4종 문서의 체계적 흡수**: 숨가든 브랜드 콘텐츠를 단순 복사가 아닌 Recordare 아키텍처에 맞게 재구조화하여 통합
2. **7갭 전체 해소**: G1~G7 모두 PRD·UX·Workflows·Plan에 반영
3. **갭 분석의 즉각 수정**: 분석 직후 Critical 4건 + Important 5건을 같은 세션 내 수정하여 Match Rate 80% → 91% 달성
4. **STT 폐기 완전 정리**: Plan 내 STT 잔존 6개소를 모두 "빠른 선택 4종 모드"로 일관되게 교체

### 8.2 개선 필요 사항 ⚠️

1. **LifecycleStage enum 조기 갱신 필요**: PRD가 7단계로 변경될 때 Plan §2.0.1도 동시에 갱신하는 체크리스트 필요
2. **신규 이해관계자 추가 시 UX 화면 동시 생성**: MP/VC/LG 추가 시 각 역할의 진입점 화면도 같이 설계하는 원칙 수립
3. **STT 의사결정 전파 범위**: v2.4에서 STT 폐기 결정 후 Plan H2/NFR-01/Sprint2에 즉시 반영이 안 됐음 → 의사결정 체크리스트 도입 권고

### 8.3 다음 PDCA 사이클 개선 제안

- Design 단계 진입 시 **LifecycleStage enum + RecordCategory**를 첫 번째 설계 항목으로 고정
- 신규 이해관계자 추가 = UX 화면 추가를 **자동 트리거 규칙**으로 설정
- **Design Anchor 먼저**: UI 컨셉 1~2페이지 제작 후 `/design-anchor capture recordare`로 디자인 토큰 고정

---

## 9. 참조 문서 체인

```
record_data/ (4종 기획 문서 + UI 샘플)
    ↓
PRD v2.6 (92 FR, 9 Stakeholders, 7 Lifecycle Stages)
    ↓
UX v1.5 (7단계 색상 + B.8~B.10 + 대안 디자인)
    ↓
Workflows v1.6 (24종 단위업무 + B22~B24)
    ↓
Plan v1.6 (35 FR, 7단계 enum, PBS/PostCare RecordCategory)
    ↓
갭 분석 v1.0 (91% Match Rate, 이연 1건)
    ↓
【다음】 Design v1.0 (ERD + API + 권한 매트릭스)
```

---

**문서 종료 — PM Phase 완료 보고서 (2026-05-27)**
**다음 단계: `/pdca design recordare`**
