# Recordare 문서 정합성 갭 분석 — PRD v2.6 기준

> **생성일**: 2026-05-27
> **검사자**: PDCA Check Phase (정적 문서 분석 — 구현 코드 미존재, Design 부재 단계)
> **검사 대상**: PRD v2.6 × Plan v1.5 × UX v1.5 × Workflows v1.6 (총 4개 문서 교차 검증)
> **이전 분석**: `recordare-prototype-gap.md` (2026-05-26, 프로토타입 vs PRD v2.4 기준, 70%)

---

## Executive Summary

| 축 | Match Rate | 갭 건수 (Critical / Important / Minor) |
|---|---:|:---:|
| Axis 1. FR 커버리지 일관성 | **75%** | 3 / 1 / 2 |
| Axis 2. 이해관계자 역할 일관성 | **80%** | 0 / 2 / 1 |
| Axis 3. 생애주기 7단계 일관성 | **85%** | 1 / 0 / 1 |
| Axis 4. 화면-워크플로우-FR 추적성 | **80%** | 0 / 2 / 0 |
| **Overall (가중: 0.35/0.25/0.25/0.15)** | **80%** | **4 / 5 / 4** |

**판정**: ⚠️ **Match Rate 80%** — 이전 분석(70%)에서 **+10%p 개선**.  
PRD v2.6 / UX v1.5 / Workflows v1.6은 **상호 정합성 높음(85~90%)**.  
**Plan v1.5의 내부 일관성(STT 폐기 미반영, LifecycleStage enum 구식)**이 전체 점수를 견인.  
**Critical 4건 해소 시 90% 달성 가능**. Design 단계 진입 전 수정 권고.

---

## Context Anchor (Plan v1.5에서 전파)

| 차원 | 내용 |
|------|------|
| **WHY** | PRD 92개 FR을 MVP(28) + M7+(7) + 제외(57)로 분리해 4개월 First Value 달성. 생애주기 7단계 × 9개 이해관계자 매핑 완성 |
| **WHO** | 검사 대상 독자: Plan/Design 단계 PM·아키텍트. 갭은 Design ERD·API 설계 오염으로 전파될 위험 |
| **RISK** | Plan 내 STT 관련 구식 내용이 Design 단계에서 잘못된 API 설계(STT 엔드포인트 포함)로 이어질 위험 |
| **SUCCESS** | 4개 문서 간 FR 번호, 이해관계자 코드, 생애주기 단계 코드, 화면 URL이 전부 일치하면 Match Rate 90%+ |

---

## 1. FR 커버리지 일관성 (Axis 1) — 75%

### 1.1 정상 추적 확인 ✅

| 검증 항목 | PRD | Plan | 결과 |
|---|---|---|:---:|
| FR-84~86 (PBS) | §24 | M7+ SCOPE | ✅ |
| FR-87 (PCP) | §25 | M7+ SCOPE | ✅ |
| FR-88~90 (사후지원) | §26 | M7+ SCOPE | ✅ |
| FR-74~83 (자조모임) | §22 | 별도 Plan 참조 | ✅ |
| FR-69 (다중 입력) | §21 | MVP SCOPE | ✅ |
| FR-71 (후견인 얼굴인증) | §18 | MVP SCOPE | ✅ |
| FR-72/73 (U6 일반교사) | §3.7 | MVP SCOPE | ✅ |
| FR 총계 92건 | §12 | 35건 계획(28+7) | ✅ |

### 1.2 갭 목록

#### GAP-A1-01 🔴 Critical — Plan H2 가설에 STT 잔존

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` 62행 `§1.2 H2 핵심 가설` |
| **내용** | "활동지원사(U3)의 **음성 일지 30초 → STT 자동 카테고리**가 일평균 5건 사용된다" |
| **문제** | STT 자체 통합은 **PRD v2.4 C24에서 폐기**. Workflows/UX는 "빠른 선택 4종 모드"로 대체됨 |
| **리스크** | Design 단계에서 STT API 엔드포인트 설계로 이어져 개발 낭비 발생 |
| **수정 방향** | H2를 "활동지원사(U3)의 **빠른 선택 입력(4종 모드) 15초 이하**가 일평균 5건 사용된다"로 변경 |

#### GAP-A1-02 🔴 Critical — Plan §2 FR-05 항목에 STT 잔존

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` §2 Requirements FR-05 항목 |
| **내용** | "STT 음성 일지 + AI 카테고리 자동 태깅 (식사/투약/행동/정서/학습)" |
| **문제** | PRD v2.4 C24에서 FR-05 정의를 "빠른 선택 일지"로 변경했으나 Plan §2 FR 표에 미반영 |
| **리스크** | Design 단계의 FR-05 구현 명세 오류 유발 |
| **수정 방향** | "빠른 선택 일지 (4종 모드: 빠른 선택·체크리스트·사진+태그·텍스트) + AI 카테고리 자동 태깅" |

#### GAP-A1-03 🔴 Critical — Plan Context Anchor RISK #1에 STT 잔존

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` `Context Anchor > RISK` (1) |
| **내용** | "(1) STT 한국어 비표준 발화 정확도 < 70% 시 일지 가치 미달 (Risk #1)" |
| **문제** | STT 폐기로 Risk #1 자체가 무의미. Design 단계에서 리스크 우선순위 왜곡 |
| **수정 방향** | "(1) 빠른 선택 UI의 기본 카테고리 15개가 실제 시설 환경 케이스를 70%+ 커버하지 못하면 '기타' 입력 비중 증가로 AI 태깅 품질 저하 (Risk #1)" |

#### GAP-A1-04 🔴 Critical — Plan §2.0.1 LifecycleStage enum이 5단계 구식

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` §2.0.1 LifecycleStage 표 (80~84행) |
| **내용** | `INFANT_EARLY` (0~6세), `SCHOOL_AGE` (7~**14**세), (사후지원기 없음) — 5단계 |
| **문제** | PRD v2.6 §0.1 / UX v1.5 §0.1 / Workflows v1.6 §0.4는 모두 **7단계**로 확장됨. 영아기(0~2세)와 영유아기(3~6세) 분리 + 사후지원기 추가. SCHOOL_AGE는 7~18세가 정확 |
| **리스크** | Design ERD에서 `lifecycleStage` enum이 5값으로 설계되어 DB 마이그레이션 비용 발생 |
| **수정 방향** | `INFANT` (0~2세), `EARLY_CHILDHOOD` (3~6세), `SCHOOL_AGE` (7~18세, 수정), `TRANSITION`, `ADULT`, `SENIOR`, `POST_CARE` (사후지원기) 7단계로 확장 |

#### GAP-A1-05 🟡 Important — Plan NFR-01에 STT 응답 시간 잔존

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` NFR-01 |
| **내용** | "페이지 로드 ≤ 2초 (P75) / **STT 응답 ≤ 3초** / API P95 ≤ 500ms" |
| **문제** | STT 폐기로 이 NFR 항목 무의미. 다중 입력 성능 기준이 없음 |
| **수정 방향** | "STT 응답 ≤ 3초" 제거 → "빠른 선택 패널 렌더 ≤ 300ms" 추가 |

#### GAP-A1-06 🟡 Minor — Plan Q-01 의사결정 사항에 STT API 선택 잔존

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` §13 또는 Open Questions |
| **내용** | "AI 외부 API 선택 (OpenAI Whisper vs Naver Clova STT)" |
| **문제** | STT 폐기로 이 의사결정 사항 무의미 |
| **수정 방향** | 항목 제거 또는 "PBS AI 패턴 분석 모델 선택 (Fine-tune vs Zero-shot)" 등으로 대체 |

#### GAP-A1-07 🟡 Minor — PRD 문서 헤더 제목 버전 미갱신

| 항목 | 내용 |
|------|------|
| **위치** | `recordare-prd-v2.md` 1행 |
| **내용** | "# PRD: 레코다레 (Recordare) — **v2.2**" |
| **문제** | 헤더 제목 버전이 v2.2로 고정, 실제 문서 버전 v2.6과 불일치 (독자 혼란 유발) |
| **수정 방향** | "# PRD: 레코다레 (Recordare) — v2.6" |

---

## 2. 이해관계자 역할 일관성 (Axis 2) — 80%

### 2.1 정상 확인 ✅

| 역할 | PRD v2.6 | Plan v1.5 | UX v1.5 | Workflows v1.6 |
|------|:---:|:---:|:---:|:---:|
| U1~U6 | ✅ | ✅ | ✅ | ✅ |
| MP (의료진·치료사) | ✅ §0.2 | ✅ M7+ | ✅ B.8 접근 | ✅ §0.1 |
| VC (직업재활사) | ✅ §0.2 | ✅ M7+ | ⚠️ B.8만 언급 | ✅ §0.1 |
| LG (성년후견인) | ✅ §0.2 | ✅ M7+ | ✅ B.10 전용 | ✅ §0.1 |

### 2.2 갭 목록

#### GAP-A2-01 🟡 Important — Plan Context Anchor WHO에 MP/VC/LG 미언급

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` Context Anchor > WHO |
| **내용** | "1차 사용자: 보호자(U2 100명) + 활동지원사(U3 50명) + 당사자(U1 부수, AAC 사용)" — U1~U6만 언급 |
| **문제** | MP/VC/LG는 PRD v2.6에서 공식 이해관계자로 추가됐으나 Plan WHO에 미반영. Design 단계 권한 설계 시 3개 역할 누락 위험 |
| **수정 방향** | "M7+ 이해관계자: MP(의료진·치료사) · VC(직업재활사) · LG(성년후견인) — PBS·PCP·사후지원 화면 접근 설계 필요" 추가 |

#### GAP-A2-02 🟡 Important — UX v1.5에 VC(직업재활사) 전용 화면 없음

| 항목 | 내용 |
|------|------|
| **위치** | `recordare-ux-structure.md` (B 섹션 전체) |
| **내용** | VC는 B.8 PBS 화면 접근 권한 목록에만 등장 ("SW·SE·MP·VC·CG") |
| **문제** | Workflows v1.6 B23 PCP·직업훈련 기록은 VC가 주요 Actor. VC 대시보드 또는 직업훈련 기록 화면이 UX에 정의되지 않음 |
| **리스크** | Design 단계에서 VC 역할의 진입점 화면 설계 누락 → 구현 후 추가 시 라우트 재설계 비용 |
| **수정 방향** | UX v1.6에 B.11 VC 직업훈련 기록 화면 추가 (`/records/[personId]/vocational`) |

#### GAP-A2-03 🟡 Minor — Workflows §0.5 RecordCategory 매핑 테이블에 B22~B24 미포함

| 항목 | 내용 |
|------|------|
| **위치** | `recordare-workflows.md` §0.5 RecordCategory → Workflow 매핑 |
| **내용** | `행동·정서` → B4, B6, B10, B17 (B22 PBS 누락). `자립·직업` → B12, B17, B19 (B23 PCP 누락) |
| **문제** | PBS 입력(B22)은 `행동·정서` 카테고리의 핵심 워크플로우인데 §0.5 매핑 테이블에 없음 |
| **수정 방향** | `행동·정서` → B4, B6, B10, B17, **B22(PBS)** 추가. `자립·직업` → B12, B17, B19, **B23(PCP)** 추가. `권한·동의` → `B24(사후지원)` 참조 추가 |

---

## 3. 생애주기 7단계 일관성 (Axis 3) — 85%

### 3.1 정상 확인 ✅

| 문서 | 7단계 반영 | 세부 |
|------|:---:|------|
| PRD v2.6 §0.1 | ✅ | 영아기~사후지원기 7단계 |
| UX v1.5 §0.1 색상 시스템 | ✅ | 영아기 #FFB49A + 사후지원기 #8FAF8E |
| Workflows v1.6 §0.4 | ✅ | 7단계 × Actor × Workflow × 기록 전체 표 |
| Plan v1.5 Executive Summary | ✅ | "생애주기 5단계 → 7단계" 명시 |

### 3.2 갭 목록

#### GAP-A3-01 🔴 Critical — Plan §2.0.1 LifecycleStage enum이 5단계 (GAP-A1-04와 동일)

> GAP-A1-04 참조. Plan §2.0.1의 `INFANT_EARLY` (0~6세 통합), `SCHOOL_AGE` (7~14세), 사후지원기 없음 → 7단계 미반영.  
> 이 갭은 Axis 1과 Axis 3 양쪽에 영향.

#### GAP-A3-02 🟡 Minor — Plan §2.0.2 RecordCategory에 PBS/사후지원 카테고리 없음

| 항목 | 내용 |
|------|------|
| **위치** | `recordare.plan.md` §2.0.2 RecordCategory 표 |
| **내용** | `BEHAVIOR_EMOTION` 하나로 행동·정서 기록 전체 포괄. `POST_CARE_LEGAL` 없음 |
| **문제** | PBS 구조화 데이터(ABC 분석)는 단순 `BEHAVIOR_EMOTION`과 스키마 구조가 다름 (정형 A/B/C 3필드). 사후지원(SNT·후견) 기록은 별도 카테고리 필요 |
| **수정 방향** | `PBS_BEHAVIOR_SUPPORT` (PBS ABC 정형 데이터, 높음), `POST_CARE_LEGAL` (SNT·후견·거주지, 최높음) 카테고리 추가 |

---

## 4. 화면-워크플로우-FR 추적성 (Axis 4) — 80%

### 4.1 정상 추적 ✅

| 기능 | PRD | UX 화면 | Workflows |
|------|-----|---------|-----------|
| PBS 도전행동 기록 | §24 FR-84~86 | B.8 `/records/[personId]/pbs/*` | B22 ✅ |
| PCP 당사자 선호 프로필 | §25 FR-87 | B.9 `/person/[personId]/pcp` | B23 ✅ |
| 사후 지원 계획 | §26 FR-88~90 | B.10 `/guardian/post-care-plan` | B24 ✅ |
| 보호자 자조 모임 | §22 FR-74~83 | B.7 (3종 화면) | B21 ✅ |

### 4.2 갭 목록

#### GAP-A4-01 🟡 Important — Workflows §0.5 RecordCategory↔Workflow 테이블 미갱신

> GAP-A2-03과 동일 내용. §0.5 테이블은 B22/B23/B24를 `행동·정서`, `자립·직업` 카테고리에 연결하지 않음.  
> 추적성 기준: `RecordCategory` → `Workflow` → `FR번호`의 체인이 §0.5에서 끊김.

#### GAP-A4-02 🟡 Important — Plan §2.0.2에 PBS/사후지원 RecordCategory 없어 FR 추적 체인 불완전

> Plan §2.0.2에 `PBS_BEHAVIOR_SUPPORT`, `POST_CARE_LEGAL` 카테고리가 없어  
> FR-84~90 → RecordCategory → DB 테이블 설계로 이어지는 추적 체인이 Plan 수준에서 끊김.  
> GAP-A3-02와 동일 근원.

---

## 5. 갭 우선순위 통합 목록

| ID | 심각도 | 대상 문서 | 내용 요약 | 수정 난이도 |
|----|:------:|----------|-----------|:----------:|
| GAP-A1-04 | 🔴 Critical | Plan §2.0.1 | LifecycleStage enum 5→7단계 확장 | 중간 |
| GAP-A1-01 | 🔴 Critical | Plan §1.2 H2 | STT 가설 → 빠른 선택 가설로 교체 | 쉬움 |
| GAP-A1-02 | 🔴 Critical | Plan §2 FR-05 | "STT 음성 일지" → "빠른 선택 일지" | 쉬움 |
| GAP-A1-03 | 🔴 Critical | Plan Context Anchor | RISK #1 STT 제거 → 새 리스크 | 쉬움 |
| GAP-A2-01 | 🟡 Important | Plan Context Anchor WHO | MP/VC/LG M7+ 이해관계자 추가 | 쉬움 |
| GAP-A2-02 | 🟡 Important | UX v1.5 | VC 직업훈련 화면(B.11) 신설 | 어려움 |
| GAP-A2-03 / GAP-A4-01 | 🟡 Important | Workflows §0.5 | B22/B23/B24 RecordCategory 매핑 추가 | 쉬움 |
| GAP-A3-02 / GAP-A4-02 | 🟡 Important | Plan §2.0.2 | PBS/PostCare RecordCategory 2종 추가 | 쉬움 |
| GAP-A1-05 | 🟡 Important | Plan NFR-01 | STT 응답 제거 → 빠른 선택 성능 기준 | 쉬움 |
| GAP-A1-07 | 🟢 Minor | PRD 헤더 | 제목 버전 v2.2 → v2.6 | 쉬움 |
| GAP-A1-06 | 🟢 Minor | Plan Open Questions | STT API 선택 → PBS AI 모델 선택 | 쉬움 |

---

## 6. 수정 예상 효과

Critical 4건 수정 시:
- Axis 1: 75% → **92%** (STT 잔존 3건 + enum 1건 해소)
- Axis 3: 85% → **95%** (enum 해소)
- 전체: 80% → **~90%** (Design 진입 기준 충족)

Important 5건 추가 수정 시:
- Axis 2: 80% → **92%**
- Axis 4: 80% → **93%**
- 전체: **~92%**

---

## 7. 다음 단계 권고

### 즉시 수정 (30분 이내, Critical 4건)

```
1. Plan §2.0.1 LifecycleStage enum 7단계로 확장 (INFANT + EARLY_CHILDHOOD + POST_CARE 추가, SCHOOL_AGE 14→18세)
2. Plan §1.2 H2 가설 STT → 빠른 선택 4종 모드로 교체
3. Plan §2 FR-05 항목 "STT 음성 일지" → "빠른 선택 일지" 수정
4. Plan Context Anchor RISK #1 STT 리스크 제거 + 새 리스크 추가
```

### 단기 수정 (1시간 이내, Important 5건)

```
5. Plan Context Anchor WHO에 MP/VC/LG M7+ 이해관계자 추가
6. Plan §2.0.2에 PBS_BEHAVIOR_SUPPORT + POST_CARE_LEGAL RecordCategory 추가
7. Workflows §0.5 RecordCategory 테이블에 B22/B23/B24 매핑 추가
8. Plan NFR-01 STT 응답 제거 + 빠른 선택 성능 기준 추가
9. PRD 헤더 제목 v2.2 → v2.6 수정
```

### Design 단계 진입 조건

- [ ] Critical 4건 수정 완료 → Match Rate ≥ 90% 예상
- [ ] UX v1.6 VC 화면 추가 여부 결정 (M7+ Design 단계로 이연 가능)
- [ ] `/pdca design recordare` 실행

---

**문서 종료 — 정합성 갭 분석 v1.0 (PRD v2.6 × Plan v1.5 × UX v1.5 × Workflows v1.6)**
