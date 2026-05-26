# Plan: Recordare (레코다레) — MVP Beta

> 지적장애인 자립을 위한 평생 기록 + 권한 매칭 플랫폼
> MVP Beta 범위 (M3-M6): v1.0 P0 11건 + v2.0 P0 10건 = 21개 FR + 8개 NFR

| 항목 | 값 |
|------|-----|
| 제품명 | Recordare (레코다레) |
| Plan 버전 | **v1.3 (리빙랩 #01 의사결정 반영)** |
| 작성일 | 2026-05-24~25 (v1.0~v1.3) |
| 작성자 | PM Lead (PDCA plan phase) |
| 범위 | MVP Beta (M3-M6, 4개월) |
| 입력 문서 | `recordare.prd.md` v1.0 · `recordare-prd-v2.md` **v2.4** · `recordare-workflows.md` v1.3 · `recordare-ux-structure.md` v1.2 · `07-livinglab/01-living-lab-meeting-minutes.md` **v1.1** · `recordare-lifecycle-recording-and-legal-screening.md` |
| 상태 | Draft v1.3 (PRD v2.4 동기화 + 리빙랩 #01 의사결정 반영) |
| v1.3 변경 | **STT 폐기** + MVP 25 → **28 FR** (FR-69 다중 입력 + FR-71 후견인 얼굴 인증 + FR-72/73 U6 일반교사) + 6종 사용자 + Sprint 4·5 재배치 + PoC E1' 신설 |
| 다음 단계 | `/pdca design recordare` |

---

## Executive Summary

| 관점 | 내용 |
|------|------|
| **Problem** | PRD v2.4까지 75개 FR이 정의되었으나, 한 번에 전부 구현은 불가. M3-M6 4개월 안에 어떤 FR을 어떤 순서로 만들어 누구에게 검증받을 것인가에 대한 실행 계획이 필요. **리빙랩 #01에서 STT 단일 입력의 시설 환경 부적합성 발견 → 다중 입력 4종 신설**. |
| **Solution** | v1.0 P0 11건 + v2.0 P0 10건 + v2.2 P0 4건(자가진단) + **v2.4 P0 3건(FR-69 다중 입력·FR-71 후견인 얼굴 인증·FR-72/73 U6 일반교사)** = **28개 FR** MVP Beta. Next.js 15 + Node.js/Express + PostgreSQL + Redis 자체 스택, PWA 우선. 시범 시설 8곳 + 보호자 100명 + 통합학급 일반교사 25명에게 시범 운영. |
| **Function/UX** | First Value 1시간·일지 30분→**15초 (빠른 선택, -99%)**·인계서 2주→3분·자가진단 70%·AI 추이 만족도 4/5·**시설 점심·교실 환경 무관 100% 입력 가능**·**통합학급 짧은 메모 1건 < 30초**. 결제·18세 이양·후견 차등 모드는 GA 1.0로 이연. |
| **Core Value** | "4개월 안에 가족이 자녀의 사진 1만 장 자동 분류 + 활동지원사가 시설 점심에서 15초 빠른 선택 입력 + 3분 인계서 PDF + K-DST 자가진단 + **통합학급 일반교사 짧은 메모로 케어 사각지대 해소**가 실제로 작동한다" — 환경·페르소나 사각지대 0건. |

---

## Context Anchor

| 차원 | 내용 |
|------|------|
| **WHY** | PRD v2.1의 61개 FR은 24개월 로드맵 전체이고, 본 Plan은 그 중 First Value 달성에 필요한 21개를 분리해 4개월 안에 검증한다. 핵심 가설: "보호자(U2)와 활동지원사(U3) 양면 시장에서, 일지 30분→5분 + 인계서 2주→3분이 가능하면 시범 5곳에서 NPS 30+를 달성한다." |
| **WHO** | 1차 사용자: 보호자(U2 100명) + 활동지원사(U3 50명) + 당사자(U1 부수, AAC 사용) / 비치헤드: 특수학교 5곳(서울·경기) + 그룹홈 3곳 / 결제자(U5 시설장)와 행정자(U4 사회복지사·교사)는 일부만 시범 참여 |
| **RISK** | (1) STT 한국어 비표준 발화 정확도 < 70% 시 일지 가치 미달 (Risk #1) (2) 보호자 권한 거부감으로 활동지원사 권한 위임 시도가 30% 미만 (Risk #2) (3) 카톡 사진 마이그레이션 정확도 < 70% 시 보호자 이탈 (Risk #4) (4) 시범 5곳 인프라 부재 시 ISMS-P 사전 절차 지연 (5) 자체 스택 채택으로 인한 초기 인프라 셋업 4주 소요 |
| **SUCCESS** | (1) First Value 1h 도달율 ≥ 60% (KPI-01) (2) 활성 사용자 일지 작성 평균 ≤ 5분/건 (KPI-02) (3) 인계서 1건 작성 시간 ≤ 5분 (KPI-03) (4) 오프라인 동기화 성공률 ≥ 95% (KPI-04) (5) 당사자 자문단 5인 평가 ‘쉬운말 모드’ 만족도 ≥ 4/5 (KPI-05) (6) NPS ≥ 30 (시범 사용자, KPI-06) |
| **SCOPE** | **포함 (v2.4)**: FR-01,02,**05(빠른 선택)**,06,08,09,11,13~16 + FR-17~19,25,26,**30(오프라인 일지)**,32,35,40,43 + FR-62,63,67,68 (자가진단) + ⭐ **FR-69 다중 입력 + FR-71 후견인 얼굴 인증 + FR-72/73 U6 일반교사** = **28개 FR** / NFR-01,02,04,05,06,07,09 = 7개 / PWA 단일 빌드 / **시범: 보호자 100명 + 시설 8곳 + 통합학급 일반교사 25명** / **제외**: B2B 결제·18세 이양·후견 차등(FR-48~58,60,61) / 케이스 회의(FR-53) / 자가진단 P1·P2(FR-64~66) / 행복e음·NEIS(v1.1) / IoT/PHR(v2.0) |

---

## 1. Overview

### 1.1 Background

Recordare의 PRD v2.1은 24개월 로드맵에 걸친 61개 FR을 정의한다. 단일 Plan으로 전체를 다루면 산정 정확도가 떨어지고 First Value 도달이 지연된다. 본 Plan은 **MVP Beta 단계(M3-M6, 4개월)** 한정으로 작성된다.

본 Plan의 입력 문서:
- `docs/00-pm/recordare.prd.md` v1.0 — Discovery·Strategy·Research 본문 + FR-01~16 + NFR-01~08
- `docs/00-pm/recordare-prd-v2.md` v2.1 — §6~§19 + FR-17~61 + NFR-09,10 누적
- `docs/00-pm/recordare-workflows.md` v1.1 — 5종 사용자 × 18종 단위업무 매트릭스
- `docs/00-pm/recordare-ux-structure.md` — 퍼블릭 랜딩 + 대시보드 5종
- `docs/00-pm/recordare-lifecycle-recording-and-legal-screening.md` — 생애주기별 기록 체계, 공통 기록 카테고리, 자가진단 법적·공식 자료

### 1.2 핵심 가설 (MVP Beta 단계)

| # | 가설 | 검증 방법 | 통과 기준 |
|---|------|----------|----------|
| H1 | 보호자(U2)가 7-Step 온보딩 1시간 안에 인계서 PDF 1건을 받으면 다음 일주일 잔존율이 70%+ | 시범 100명 코호트 분석 | First Value 1h 도달율 ≥ 60% |
| H2 | 활동지원사(U3)의 음성 일지 30초 → STT 자동 카테고리가 일평균 5건 사용된다 | 산간·시설 시범 50명 (4주) | 활성 사용자 일평균 일지 5건+ |
| H3 | 3분 마스터 인계서가 신규 기관에 PDF로 전달되면 ‘재작성’ 요청율 < 20% | 인계서 100건 발행 후 추적 | 재작성 요청 < 20%, NPS 30+ |
| H4 | 카톡 사진 zip 1만 장 마이그레이션 후 보호자 검수에서 정확도 70%+ 달성 | 시범 30가족, 카드 스와이프 정정 추적 | 분류 수정율 < 30% |
| H5 | 당사자 모드(AAC + 쉬운말)가 분기 자문단 평가에서 4/5+ 받는다 | 발달장애 당사자 자문단 5인 분기 평가 | 만족도 ≥ 4/5 |

---

## 2. Requirements

### 2.0 공통 데이터 분류 기준 (Lifecycle × RecordCategory)

> 기준 문서: `docs/00-pm/recordare-lifecycle-recording-and-legal-screening.md`  
> Design 단계의 ERD, Prisma schema, API DTO, 필터 UI, 권한 정책, 인계서 템플릿은 아래 enum을 공통 기준으로 사용한다.

#### 2.0.1 LifecycleStage

| 코드 | 생애주기 | 연령 기준 | 대표 기록 |
|---|---|---:|---|
| `INFANT_EARLY` | 영유아기 | 0~6세 | 건강검진, K-DST, M-CHAT-R, 발달재활, 보호자 관찰 |
| `SCHOOL_AGE` | 학령기 | 7~14세 | IEP, 학습, 학교생활, 일반교사/특수교사 메모 |
| `TRANSITION` | 전환기 | 15~24세 | 자기결정, 진로·직업, AAC 동의, 18세 권한 이양 |
| `ADULT` | 성인기 | 25~64세 | 주거, 고용, 활동지원, 권한관리, 후견 |
| `SENIOR` | 고령기 | 65세+ | 의료·돌봄 인계, 인지·신체 변화, 장기돌봄, 후견 로그 |

#### 2.0.2 RecordCategory

| 코드 | 대분류 | 대표 세부 항목 | 민감정보 여부 |
|---|---|---|:---:|
| `PROFILE` | 기본 프로필 | 인적사항, 장애등록, 가족관계, 소속기관 | 높음 |
| `HEALTH_MEDICAL` | 건강·의료 | 검진, 진료, 투약, 알레르기, 응급 | 높음 |
| `DEVELOPMENT_SCREENING` | 발달·자가진단 | K-DST, M-CHAT-R, AIR-SDS, 적응행동 | 높음 |
| `EDUCATION_LEARNING` | 교육·학습 | IEP, 학습목표, 수업참여, 일반교사 메모 | 중간 |
| `DAILY_CARE` | 일상·돌봄 | 식사, 수면, 위생, 이동, 활동 | 중간 |
| `BEHAVIOR_EMOTION` | 행동·정서 | 트리거, 안정방법, 감정 변화 | 높음 |
| `INDEPENDENCE_WORK` | 자립·직업 | 직업훈련, 주거, 금전관리, 이동훈련 | 중간 |
| `PERMISSION_CONSENT` | 권한·동의 | 접근권한, 동의, 회수, 후견 | 높음 |
| `HANDOVER_CASE` | 인계·회의 | 3분 인계서, 케이스 회의, PDF 공유 | 중간 |
| `AUDIT_SECURITY` | 감사·보안 | 접근로그, 이상접근, 다운로드 | 높음 |

#### 2.0.3 구현 요구

- 모든 `JournalEntry`, `TimelineCard`, `ScreeningResult`, `Handover`, `CaseMaterial`, `AuditLog`는 `lifecycleStage`와 `recordCategory[]`를 가진다.
- `HEALTH_MEDICAL`, `DEVELOPMENT_SCREENING`, `BEHAVIOR_EMOTION`, `PERMISSION_CONSENT`, `AUDIT_SECURITY`는 기본값으로 민감정보 처리 정책(FR-13~15)을 적용한다.
- 자가진단 관련 화면·PDF·AI 출력은 `DEVELOPMENT_SCREENING` 카테고리로 분류하고 FR-68 면책 고지를 강제한다.
- U6 일반교사 메모는 기본적으로 `EDUCATION_LEARNING` 또는 `BEHAVIOR_EMOTION`만 허용하며 일반 학생 식별정보 입력을 차단한다.

### 2.1 Functional Requirements (21개, MVP Beta)

#### Group A. 기록 코어 (v1.0 P0)

| FR# | 영역 | 요구사항 | 출처 |
|-----|------|---------|------|
| **FR-01** | 계정 | 보호자/당사자/전문가 3종 가입, PASS/카카오 본인인증, 1:1 매칭 | v1.0 §5 |
| **FR-02** | 권한 | 생애주기별 권한 매트릭스 자동 적용 (RBAC + ABAC) | v1.0 §5 |
| **FR-05** | 기록 | STT 음성 일지 + AI 카테고리 자동 태깅 (식사/투약/행동/정서/학습) | v1.0 §5 |
| **FR-06** | 기록 | 사진/동영상 드래그앤드롭 일괄 업로드 + 자동 시기 분류 (EXIF 기반) | v1.0 §5 |
| **FR-08** | 타임라인 | 단일 통합 타임라인 (생애주기 5단계 색상 구분) | v1.0 §5 |
| **FR-09** | 인계서 | 3분 마스터 인계서 자동 생성 (PDF + 시스템 동시 전달) | v1.0 §5 |
| **FR-11** | 당사자 UI | AAC 픽토그램 기반 Yes/No 동의 화면 + 음성 안내 | v1.0 §5 |
| **FR-13** | 보안 | 민감정보 암호화 (AES-256) + 접근 로그 5년 보존 | v1.0 §5 |
| **FR-14** | 보안 | Audit Log + 보호자/당사자 접근 알림 | v1.0 §5 |
| **FR-15** | 컴플라이언스 | 개인정보보호법 분리 동의 (민감정보) | v1.0 §5 |
| **FR-16** | 접근성 | WCAG 2.1 AA + 한국형 웹접근성 + AAC 가이드 | v1.0 §5 |

#### Group B. 사용자 경험 강화 (v2.0 P0)

| FR# | 영역 | 요구사항 | 출처 |
|-----|------|---------|------|
| **FR-17** | 당사자 모드 | 픽토그램+음성+큰글씨 3종 동시 제공 | v2.0 §6.1 |
| **FR-18** | 당사자 모드 | 모든 권한 동의 화면 2단계 확인(Double-confirm) 의무 | v2.0 §6.1 |
| **FR-19** | 당사자 모드 | 당사자 동의 행사 시 보호자에게 5분 내 푸시 알림 | v2.0 §6.1 |
| **FR-25** | 온보딩 | 7단계 온보딩 마법사 (각 단계 스킵 가능) | v2.0 §7 |
| **FR-26** | 온보딩 | 카톡 zip 백업 일괄 업로드 + AI 자동 시기·카테고리 분류 | v2.0 §7.3 |
| **FR-30** | 오프라인 | 오프라인 음성 녹음 + 로컬 큐 (최대 500MB, AES-256) | v2.0 §8 |
| **FR-32** | 오프라인 | 오프라인 모드 상단 배너 + 큐 건수 표시 | v2.0 §8 |
| **FR-35** | 알림 | 권한 만료 D-30/D-7/D-1 3단 자동 알림 (푸시+이메일+SMS) | v2.0 §9 |
| **FR-40** | 접근성 | 쉬운말 모드 전역 토글 (어휘/문장/픽토그램/TTS) | v2.0 §10 |
| **FR-43** | 내보내기 | 인계서 PDF 즉시 출력 (A4, 비밀번호 옵션) | v2.0 §11 |

#### Group C. 자가진단 도구 (v2.2 P0) — v1.1 신규 추가

| FR# | 영역 | 요구사항 | 출처 |
|-----|------|---------|------|
| **FR-62** | 자가진단 | K-DST 영유아 정기 자가진단 (8단계, 보호자 응답, PDF + 타임라인 자동 등록) | v2.2 §20 |
| **FR-63** | 자가진단 | M-CHAT-R 자폐 선별 검사 (16~30개월, 6개월 재검사 옵션) | v2.2 §20 |
| **FR-67** | AI 분석 | 자가진단 시계열 추이 분석 + LLM 자연어 인사이트 (최소 3회 누적 후 활성화) | v2.2 §20 |
| **FR-68** | 컴플라이언스 | 모든 자가진단 화면·PDF에 "보호자 관찰 의견 / 정식 진단은 전문의 상담" 면책 의무 표기 | v2.2 §20.5 (법적 필수) |

#### Group D. 다중 입력 모드 (v2.4 P0) — v1.3 리빙랩 신규 ⭐

> **FR-05·FR-30 정의 변경**: "STT 음성 일지" → "빠른 선택 일지" / "오프라인 음성" → "오프라인 일지"

| FR# | 영역 | 요구사항 | 출처 |
|-----|------|---------|------|
| **FR-69** | 입력 모드 | 다중 입력 4종 (⚡빠른 선택 / ✅체크리스트 / 📷사진+태그 / ⌨️텍스트+OS음성) + UserPreferences 기본 모드 저장 | v2.4 §21 |
| **FR-71** | 보안 | 후견인 본인 얼굴 인증 (셀카 + 동영상 라이브니스 + 대법원 결정문 신분증과 AI 얼굴 매칭) | v2.4 §21.4 (Risk #9 보강) |

#### Group E. U6 일반교사 페르소나 (v2.4 P0) — v1.3 리빙랩 신규 ⭐

| FR# | 영역 | 요구사항 | 출처 |
|-----|------|---------|------|
| **FR-72** | 권한 | U6 일반교사 권한 모델 (담당 학생 한정 + 학급 컨텍스트 마스킹) | v2.4 §3.7 |
| **FR-73** | 화면 | U6 통합학급 짧은 메모 화면 (1줄, 빠른 선택 모드 기반, 특수교사·보호자 공유) | v2.4 §3.7 |

### 2.2 Non-Functional Requirements (7개)

| NFR# | 영역 | 요구사항 | 검증 방법 |
|------|------|---------|----------|
| **NFR-01** | 성능 | 페이지 로드 ≤ 2초 (P75) / STT 응답 ≤ 3초 / API P95 ≤ 500ms | Lighthouse + APM 모니터링 |
| **NFR-02** | 가용성 | 99.5% (월 다운타임 ≤ 3.6시간) | UptimeRobot + Healthcheck |
| **NFR-04** | 확장성 | 동시 사용자 1,000명 / 1,000만 건 로그 (MVP Beta 한정) | 부하 테스트 |
| **NFR-05** | 접근성 | 색약/저시력 대응 + 음성안내 + 큰글씨 모드 | WCAG 자동 검사 + 자문단 |
| **NFR-06** | 호환성 | iOS 14+ / Android 9+ / Chrome·Safari·Edge 최신 2버전 | BrowserStack 매트릭스 |
| **NFR-07** | 데이터 보존 | 보호자 요청 시 30일 내 완전 삭제 + 감사 로그 5년 | 삭제 워크플로 자동 테스트 |
| **NFR-09** | 인증 | KWCAG 2.2 AA + 한국웹접근성 인증 (M6에 사전 평가 신청) | 외부 인증 기관 |

### 2.3 의도적 제외 (GA 1.0 / v1.1 / v2.0 이연)

| 제외 항목 | 이연 시점 | 사유 |
|----------|----------|------|
| FR-03,04,07,10,12 (v1.0 P1) | GA 1.0 (M7-M12) | MVP First Value에 미필수 |
| FR-21~24 (시설장 모드) | GA 1.0 | B2B는 GA에서 본격 |
| FR-27,28,33,34,36~39,41~47 (v2.0 P1) | GA 1.0 / v1.1 | 다이제스트·휴지통·다채널 등 보강 기능 |
| FR-48~52 (18세 이양) | GA 1.0 | v2.1 신규, GA에서 시범 시설 자녀 18세 대상 |
| FR-53 (케이스 회의 자료) | GA 1.0 | U4 핵심 기능, MVP에서 U4는 부수적 |
| FR-54~58 (결제·B2G) | GA 1.0 / v1.1 | MVP는 무료 시범, GA에서 결제 활성화 |
| FR-59~61 (후견 모드) | GA 1.0 | 법무 자문 위촉 필요, MVP는 일반 권한만 |
| 행복e음 · NEIS 연동 | v1.1 (M13-M18) | 공공 API 사전 절차 장기 |
| IoT/PHR/국민건강보험 | v2.0 (M19-M24) | 범위 외 |

---

## 3. Success Criteria

| SC# | 영역 | 측정 지표 | MVP Beta 목표 (M6) | 측정 방법 |
|-----|------|----------|-------------------|----------|
| **SC-01** | First Value | 가입 1h 내 인계서 PDF 다운로드 도달율 | ≥ 60% | 코호트 funnel (Mixpanel/PostHog) |
| **SC-02** | 효율 | 일지 1건 작성 평균 시간 | ≤ 5분 (목표 2분) | 클라이언트 측 timing event |
| **SC-03** | 효율 | 인계서 1건 작성 시간 | ≤ 5분 (목표 3분) | 사용자 행동 로그 |
| **SC-04** | 오프라인 | 동기화 성공률 | ≥ 95% | 서버 동기화 로그 |
| **SC-05** | 접근성 | 당사자 자문단(5인) 쉬운말 모드 평가 | ≥ 4/5 | 분기 1회 사용성 테스트 |
| **SC-06** | 만족 | 시범 사용자 NPS | ≥ 30 | NPS 인앱 설문 |
| **SC-07** | 보안 | Audit Log 누락 케이스 | 0건 | 자동 회귀 테스트 |
| **SC-08** | 마이그레이션 | 카톡 사진 분류 정확도 (보호자 검수 후) | ≥ 70% | 보호자 정정율 분석 |
| **SC-09** | 알림 | 권한 만료 D-7 알림 클릭율 | ≥ 35% | 알림 분석 |
| **SC-10** | 회귀 | TC-13 (당사자 모드 2단계 확인 누락) 회귀 차단율 | 100% | CI 빌드 차단 |
| **SC-11** | 자가진단 | 신규 보호자 가입 후 7일 내 자가진단 1회+ 도달율 | ≥ 70% | 코호트 funnel |
| **SC-12** | 자가진단 | K-DST 8단계 완주율 (영유아 자녀 보호자) | ≥ 60% | 단계별 완료 추적 |
| **SC-13** | AI 분석 | AI 추이 분석 인사이트 보호자 만족도 | ≥ 4/5 | 분기 NPS |
| **SC-14** | 컴플라이언스 | LLM 출력의 의료적 표현 (진단·치료·의심) 위반 건수 | **0건** | 분기 LLM 감사 |

### 3.1 Critical Path (모든 SC 미충족 시 GA 1.0 진입 차단)
- SC-01, SC-02, SC-03 (효율 가치 검증) — 미충족 시 가설 H1, H2, H3 재검토
- SC-05 (접근성) — 미충족 시 NFR-09 인증 절차 영향
- SC-07 (보안 누락) — 단 1건도 발생 시 즉시 핫픽스

---

## 4. Scope

### 4.1 In-Scope

#### 4.1.1 사용자 그룹
- U2 보호자 (100명 시범) — Primary
- U3 활동지원사 (50명 시범) — Primary
- U1 당사자 (AAC 모드 부수, 보호자가 활성화) — Secondary
- U4 사회복지사·교사 (5명 한정, 케이스 회의 자료 미포함) — Beta tester
- U5 시설장 (3곳 시범, 결제 미포함) — Beta tester

#### 4.1.2 비즈니스 가설 검증
- 가치 검증 (효율 30%↓, NPS 30+)
- 시범 도입 가능성 검증 (특수학교 5곳 + 그룹홈 3곳)
- 자문단 평가 (당사자 5인, 분기 1회)

#### 4.1.3 기술 인프라
- Next.js 15 (App Router) + TypeScript
- Node.js 20 + Express + Prisma ORM
- PostgreSQL 16 (Primary DB)
- Redis 7 (세션 + 큐 + Rate Limit)
- S3-호환 스토리지 (AWS S3 또는 NCP Object Storage)
- PWA + Service Worker + IndexedDB (오프라인)

### 4.2 Out-of-Scope

| 항목 | 이유 |
|------|------|
| B2B 결제·구독 시스템 (FR-54~58) | MVP는 무료 시범, GA 1.0 시작 |
| 18세 권한 이양 가이드 (FR-48~52) | 자녀가 만 18세 도래하는 시범 가정 0건 |
| 후견 모드 차등 권한 (FR-59~61) | 법무 자문 위촉 필요 (M5-M6 PoC) |
| 케이스 회의 자료 (FR-53) | U4 비치헤드 아님, GA 1.0 |
| 외부 행정 연동 (행복e음·NEIS) | 보건복지부·교육부 API 사전 절차 6개월+ |
| 다국어 (NFR-08) | 한국어만 MVP |
| iOS 네이티브 앱 / Android 네이티브 | PWA로 대체 |
| AI 자체 모델 학습 (한국어 비표준 발화) | 외부 API (Whisper + Naver Clova) 사용, PoC E1만 자체 |

### 4.3 Deferred Decisions (Design 단계로 위임)

| # | 결정 항목 | 위임 단계 |
|---|----------|----------|
| 1 | AI 외부 API 선택 (OpenAI Whisper vs Naver Clova STT) | Design §3.4 |
| 2 | S3-호환 스토리지 (AWS S3 vs NCP Object Storage) | Design §3.5 |
| 3 | 인증 라이브러리 (NextAuth.js vs 자체 구현) | Design §4.1 |
| 4 | 알림 채널 PG (FCM + SMS 게이트웨이 선정) | Design §5.2 |
| 5 | PDF 생성 라이브러리 (puppeteer vs react-pdf) | Design §6.1 |
| 6 | 백엔드 배포 (AWS EKS vs 일반 EC2 vs Vercel Function) | Design §10.1 |

---

## 5. Approach / Strategy

### 5.1 개발 전략 — 모노레포 단일 빌드

```
recordare/
├── apps/
│   ├── web/                  # Next.js 15 App Router (PWA)
│   └── api/                  # Node.js 20 + Express
├── packages/
│   ├── shared/               # 타입·유틸 공유
│   ├── ui/                   # Radix UI 기반 컴포넌트 (AAC 픽토그램 포함)
│   ├── db/                   # Prisma 스키마 + 마이그레이션
│   └── access-control/       # 권한 매트릭스 5×18 RBAC+ABAC 정책
├── docs/                     # PRD/Plan/Design 산출물 (현재)
├── infrastructure/
│   ├── terraform/            # AWS or NCP IaC
│   └── docker/               # 로컬 개발 환경
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/                  # Playwright
```

### 5.2 우선순위 흐름

```
Sprint 1 (M3 W1-W2): 인프라 셋업 + Auth + 기본 RBAC
  → FR-01, FR-02 부분, NFR-04 부하 테스트 환경

Sprint 2 (M3 W3-M4 W2): 기록 코어 (음성·사진 일지 + 타임라인)
  → FR-05, FR-06, FR-08 + STT 외부 API 통합

Sprint 3 (M4 W3-M5 W2): 권한 매트릭스 + AAC 동의 + 인계서
  → FR-02 완성, FR-09, FR-11, FR-17, FR-18, FR-19

Sprint 4 (M5 W3-M6 W2): 온보딩 + 마이그레이션 + 오프라인
  → FR-25, FR-26, FR-30, FR-32 + Service Worker

Sprint 5 (M6 W3-W4): 접근성 + 알림 + 인계서 PDF + 시범 오픈
  → FR-35, FR-40, FR-43, FR-13, FR-14, FR-15, FR-16 + Beta 진입
```

### 5.3 의사 결정 원칙

| 원칙 | 적용 |
|------|------|
| **Vertical Slice** | 각 Sprint는 한 사용자 흐름 완결 (예: Sprint 2는 ‘활동지원사가 음성 일지 1건 저장’ End-to-End) |
| **Test First on Critical Path** | 권한 매트릭스 5×18 = 90셀 단위 테스트 의무 (SC-10) |
| **Real Data Early** | Sprint 1부터 PoC 가족 5쌍의 실제 데이터로 테스트 |
| **Accessibility Built-in** | 매 PR에 axe-core 자동 검사 통과 의무 (FR-16) |
| **Audit Always** | 모든 데이터 액션이 Audit Log를 통과 (NFR-07) |

---

## 6. Architecture Overview

### 6.1 3-Tier 구조

```
┌────────────────────────────────────────────────────────┐
│ Client Layer (PWA)                                     │
│ Next.js 15 App Router · TypeScript                     │
│ - Server Components (RSC) + Client Components          │
│ - Service Worker + IndexedDB (오프라인 큐)             │
│ - Radix UI + Tailwind CSS (AAC 픽토그램 컴포넌트)      │
└─────────────────────┬──────────────────────────────────┘
                      │ HTTPS (REST + Server Actions)
                      ↓
┌────────────────────────────────────────────────────────┐
│ Server Layer                                           │
│ Next.js Route Handlers + Node.js/Express API           │
│ - NextAuth.js (PASS/카카오/이메일)                      │
│ - access-control 미들웨어 (RBAC + ABAC)                 │
│ - Zod 입력 검증                                         │
│ - Rate Limit (Redis)                                    │
│ - 외부 AI 게이트웨이 (STT/Vision/OCR)                   │
└─────────────────────┬──────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
┌──────────────┐ ┌─────────┐ ┌──────────────┐
│ PostgreSQL   │ │ Redis   │ │ S3-Compatible│
│ 16 (Primary) │ │ 7       │ │ Object Store │
│ + Prisma     │ │ 세션·큐 │ │ 사진·음성·PDF │
└──────────────┘ └─────────┘ └──────────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ↓
            ┌──────────────────┐
            │ Audit Log Pipeline│
            │ (별도 partition) │
            │ 5년 보존         │
            └──────────────────┘
```

### 6.2 핵심 모듈

| 모듈 | 책임 | 주요 FR |
|------|------|--------|
| `auth` | 본인인증, 세션, 다중 역할 관리 | FR-01 |
| `permissions` | 5×18 권한 매트릭스 정책 평가 | FR-02 |
| `journal` | 음성/사진 일지 작성 + STT 호출 | FR-05, FR-06 |
| `timeline` | 타임라인 조회 + 카테고리 필터 + 색상 띠 | FR-08 |
| `handover` | 3분 마스터 인계서 생성 + PDF | FR-09, FR-43 |
| `aac` | 당사자 모드 + AAC 동의 + 2단계 확인 | FR-11, FR-17, FR-18, FR-19 |
| `accessibility` | 쉬운말 모드 + TTS + 큰글씨 | FR-16, FR-40 |
| `onboarding` | 7-Step 마법사 + First Value 추적 | FR-25 |
| `migration` | 카톡 zip 일괄 + AI 자동 분류 | FR-26 |
| `offline` | Service Worker + IndexedDB + 동기화 | FR-30, FR-32 |
| `notifications` | 권한 만료 3단 알림 + 다채널 | FR-35 |
| `audit` | 모든 데이터 액션 로그 + 보호자 알림 + **해시 체인 무결성** | FR-13, FR-14, FR-15, FR-47 |
| `screening` | 자가진단 6종 응답·결과 + AI 추이 + 의료법 면책 | FR-62~68 |
| `disclaimer` | DisclaimerBanner 단일 컴포넌트 (FR-68 자동 노출) + LLM 가드레일 (정규식+임베딩) | FR-68 |
| ⭐ `journal-input` (v1.3) | 다중 입력 4종 (빠른 선택·체크리스트·사진+태그·텍스트) + UserPreferences 모드 저장 | **FR-69** (Group D) |
| ⭐ `guardian-face` (v1.3) | 후견인 얼굴 인증 (셀카 + 라이브니스 + 신분증 매칭) | **FR-71** |
| ⭐ `general-teacher` (v1.3) | U6 일반교사 대시보드 + 통합학급 짧은 메모 + 특수교사 공유 | **FR-72, FR-73** |

### 6.3 데이터 모델 개요 (상세는 Design §5)

```
User                Person (자녀/당사자)        Permission
├ id (PK)           ├ id (PK)                    ├ id (PK)
├ email             ├ name, birthDate           ├ granterId → User
├ role              ├ disabilityLevel           ├ granteeId → User
├ phone             ├ aacUserFlag               ├ subjectId → Person
└ createdAt         └ guardianId → User         ├ scope: JSON (5카테고리 + 의료)
                                                 ├ startsAt, endsAt
JournalEntry        Handover                    ├ status: enum
├ id                ├ id                         └ auditId → AuditLog
├ personId          ├ personId
├ authorId          ├ fromGuardian               AuditLog
├ category: enum    ├ toRecipient                ├ id
├ contentText       ├ summary (4 sections)       ├ actorId
├ audioUrl          ├ pdfUrl                     ├ subjectId
├ imageUrls (JSON)  ├ status                     ├ action
├ createdAt         └ createdAt                  ├ context (JSON)
└ offlineFlag                                    ├ createdAt (partition key)
                    ConsentRequest               └ retainUntil (5년)
                    ├ id
                    ├ subjectId (Person)
                    ├ requesterId
                    ├ scope
                    ├ status: enum
                    └ aacConsentId → AacConsent
```

### 6.4 v1.2 신규 — Audit Log 3-Tier 아키텍처

> CTO팀 Tech Architect 권고 — NFR-07 5년 보존 + Security 권고 해시 체인 통합

| Tier | 기간 | 저장소 | 검색 | 비용 효율 |
|------|:----:|--------|:----:|:--------:|
| **Hot** | 0~30일 | PostgreSQL partition (월 단위) | 즉시 (< 100ms) | 높음 |
| **Warm** | 30일~1년 | PostgreSQL archive partition | 1~5초 | 중간 |
| **Cold** | 1년~5년 | NCP Object Storage (Glacier 호환) | 분 단위 (요청 후 복원) | 매우 낮음 |

**무결성 보장**:
- 각 로그 레코드는 이전 레코드의 SHA-256 해시 포함 → **해시 체인 형성**
- 일 1회 외부 타임스탬프 서비스 (KISA 공인전자서명) 통합 → 일별 root hash 보관
- 내부 직원이 로그 조작 시 해시 체인 깨짐 → 자동 감지

### 6.5 v1.2 신규 — 외부 의존성 SLA·Fallback 매트릭스

> CTO팀 Tech Architect Important #5 대응 — SPOF 사전 식별 + Graceful Degradation

| 의존성 | SLA 요구 | Fallback | 영향 |
|--------|:-------:|---------|------|
| **PASS 본인인증** | 99.5% | 카카오 OAuth 단독 모드 | 신규 가입만 영향 |
| **NCP HyperCLOVA X (LLM)** | 99.0% | OpenAI GPT-4 Mini 백업 (사진 익명화 후) | AI 추이 인사이트 임시 비활성 |
| ~~Whisper STT (자체 호스팅)~~ | **v1.3 폐기** (STT 자체 통합 폐기, PRD §21) | 음성 입력은 OS 키보드 기능 의존 — 자체 STT API 미사용 | — |
| **Clova OCR** | 99.0% | 종이 노트 마이그레이션 일시 중단 + 보호자 안내 | 마이그레이션 지연 (FR-27 사용자 영향 적음) |
| **Toss Payments** | 99.9% | NHN KCP 백업 PG | 결제 임시 중단 → 데이터 30일 보존 (FR-55) |
| **국세청 e-Tax** | 95% | 수동 발행 백업 (월말 일괄) | 세금계산서 발행 지연 |
| **대법원 가족관계등록** | 95% | 기본값 = 일반 보호자 권한 (FR-59 Risk #9 대응) | 후견 권한 미활성 |
| **FCM 푸시** | 99.5% | 이메일·SMS 폴백 (FR-36) | 알림 도달 지연 |
| **SMS Gateway (NHN Toast)** | 99.0% | 카카오 알림톡 백업 | 만료 D-1 알림 채널 변경 |

---

## 7. Tech Stack Decisions

| 영역 | 선정 | 이유 |
|------|------|------|
| **Frontend Framework** | Next.js 15 (App Router) + TypeScript | RSC로 권한 마스킹 서버 처리, PWA 지원, SEO |
| **UI Library** | Radix UI + Tailwind CSS v4 | 접근성 헤드리스 컴포넌트 (KWCAG 호환 보장 용이) |
| **State Management** | Zustand + TanStack Query | 클라이언트 상태 + 서버 상태 분리, RSC와 호환 |
| **Backend Framework** | Node.js 20 + Express 5 | 자체 스택, 외부 의존성 통제, 인증 미들웨어 자유도 |
| **ORM** | Prisma 6 | 타입 안전, 마이그레이션 자동, Audit Log partition 지원 |
| **Database** | PostgreSQL 16 | RBAC + Row-Level Security, JSON 컬럼, partition |
| **Cache/Queue** | Redis 7 | 세션, Rate Limit, 오프라인 동기화 작업 큐 |
| **Auth** | NextAuth.js v5 (Auth.js) + PASS/카카오 OAuth | Custom Provider로 PASS API 통합 |
| **Validation** | Zod | Server Actions 입력 검증 + 타입 추론 |
| **Test** | Vitest (Unit) + Playwright (E2E) | TypeScript 친화, 빠른 실행 |
| **Lint/Format** | ESLint + Prettier + axe-core (a11y) | a11y 검사 자동 (FR-16) |
| **Storage** | S3-호환 (AWS S3 or NCP Object Storage — Design 결정) | 표준 SDK |
| **PDF** | puppeteer or react-pdf (Design 결정) | 인계서 출력 (FR-09, FR-43) |
| **STT** | Whisper API or Naver Clova STT (Design 결정) | 한국어 비표준 발화 정확도 PoC 후 선정 |
| **Vision** | OpenAI Vision or Naver Clova Vision | 카톡 사진 카테고리 자동 분류 |
| **OCR** | Naver Clova OCR | 종이 노트 (GA 1.0에서 사용, MVP 미포함) |
| **CI/CD** | GitHub Actions + Docker | 표준 |
| **Monitoring** | Sentry (Error) + PostHog (Product) + UptimeRobot | OSS 자체 호스팅 가능 |
| **모바일** | PWA 단일 빌드 | 네이티브 앱 미포함 |

---

## 8. Milestones (M3-M6, 16주)

### 8.1 Sprint별 산출물 (v1.2 갱신 — Sprint 0 분할)

| Sprint | 기간 | 목표 | 주요 FR | 검증 |
|--------|------|------|--------|------|
| **Sprint 0a (PoC)** | M3 W-1~W0 (2주) | **외부 의존성 4종 PoC** | STT (Whisper vs Clova) + Vision + OCR + LLM 가드레일 | PoC 결과 보고서 + 의사결정 |
| **Sprint 0b (코어)** | M3 W1 (1주) | 인프라 셋업 + DisclaimerBanner + 상태관리 | — | 로컬 환경 + CI + axe-core + TanStack Query + Zustand |
| **Sprint 1** | M3 W2-W3 (2주) | 인증 + 기본 RBAC + 개인정보 분리 동의 | FR-01, FR-02 (기본), FR-15 | 3종 가입 + 분리 동의 시퀀스 + E2E 회귀 5개 |
| **Sprint 2** | M3 W3-M4 W2 (4주) | 기록 코어 (음성·사진·타임라인) | FR-05, FR-06, FR-08 | E2E: 음성→일지→타임라인 |
| **Sprint 3** | M4 W3-M5 W2 (4주) | 권한 매트릭스 + AAC 동의 + 인계서 | FR-02 완성, FR-09, FR-11, FR-17, FR-18, FR-19 | 90셀 RBAC 자동 테스트 |
| **Sprint 4** | M5 W3-M6 W2 (4주) | 온보딩 + 마이그레이션 + 오프라인 + **자가진단 + ⚡빠른 선택 + ✅체크리스트 (FR-69)** | FR-25, FR-26, FR-30, FR-32, FR-62, FR-68, ⭐ **FR-69 (모든 모드), FR-71** | First Value 1h + K-DST + 빠른 선택 15초 검증 + 후견인 얼굴 인증 |
| **Sprint 5** | M6 W3 (1주) | 접근성 + 알림 + PDF + AI 추이·M-CHAT-R + ⭐ **U6 일반교사 화면** | FR-35, FR-40, FR-43, FR-13~16, FR-63, FR-67, ⭐ **FR-72, FR-73** | KWCAG + LLM 가드레일 자동 + Bundle Analyzer + U6 시범 일반교사 25명 |
| **M5 W4** | M5 W4 (4일) | **1차 침투 테스트** (외부 KISA 위촉) | — | OWASP Top 10 + 권한 100셀 + 의료법 면책 우회 시도 |
| **M6 W4** | M6 W4 (1주) | **MVP Beta Open + 2차 침투 테스트** | — | 8곳 시범 + 운영 환경 재테스트 + 모바일 실기 (5종 기기) |
| **Beta Open** | M6 W4 (1주) | 시범 오픈 (특수학교 5곳 + 그룹홈 3곳) | — | 100명 가족 + 50명 활동지원사 초대 |

### 8.2 Critical Milestones

| M# | 날짜 | 마일스톤 | 통과 기준 |
|----|------|---------|----------|
| M3.0 | 2026-07-01 | Plan 승인 + Sprint 0 완료 | Design 문서 승인 |
| M3.5 | 2026-07-15 | 첫 E2E 흐름 시연 | 가입 → 일지 1건 → 타임라인 확인 |
| M4.5 | 2026-08-31 | 권한 매트릭스 GA | 90셀 통과 + Audit Log 무결성 |
| M5.5 | 2026-09-30 | First Value 흐름 완성 | 가입 1h 내 인계서 PDF |
| M6.0 | 2026-10-15 | 접근성·알림·PDF 완료 | KWCAG 사전 평가 통과 |
| **M6.4** | **2026-10-31** | **MVP Beta Open** | **8곳 시범 + 150명 사용자** |

### 8.3 자원 가정 (Design에서 정밀화)

| 역할 | 인원 | 비고 |
|------|------|------|
| Lead Engineer (Full-stack) | 1 | 아키텍처 책임 |
| Frontend Engineer | 2 | Next.js + PWA + 접근성 |
| Backend Engineer | 2 | API + 권한 매트릭스 + AI 통합 |
| QA Engineer | 1 | Playwright E2E + 회귀 |
| Product Designer | 1 | UX 구조 + AAC 픽토그램 보강 |
| Accessibility Consultant | 0.5 (외부) | 분기 자문 |
| Legal Counsel | 0.2 (외부) | 개인정보·후견 자문 |
| **합계** | **8 명** | 4개월 × 8명 = 32 인월 |

---

## 9. Risks & Mitigations (MVP Beta 6건)

본 단계 관련 PRD Risk 9건 중 6건이 MVP에 해당. #7~9는 GA 1.0 이슈.

| Risk | 확률/영향 | 대응 |
|------|----------|------|
| **#1 STT 정확도 부족** | 中/中 | Sprint 0에 Whisper vs Clova PoC 4주, 70% 미달 시 자체 모델 학습 검토 (단 MVP는 외부 API만) |
| **#2 보호자 권한 거부감** | 中/高 | Sprint 3에서 권한 위임 ‘단계적 시뮬레이션 마법사’ 추가 (FR-12 일부 사전 도입) |
| **#3 시설 가격 저항** | 中/中 | MVP는 무료 시범 — 결제 없음 |
| **#4 마이그레이션 이탈** | 中/高 | First Value를 마이그레이션 이전 배치 (Step 7), 분류 정확도 70% 보장 명시 |
| **#5 알림 피로 → 만료 사고** | 中/高 | FR-35 D-30/D-7/D-1 3단 강제 + 전체 OFF 금지 |
| **#6 시설장 일괄 갱신 실수** | — | MVP는 시설장 일괄 기능 미포함, GA에서 도입 |

### 9.1 MVP 신규 식별 리스크

| Risk | 확률/영향 | 대응 |
|------|----------|------|
| **#MVP-1 자체 스택 인프라 셋업 4주 초과** | 中/中 | Sprint 0를 1주 → 2주로 여유 / Vercel + Supabase 빠른 백업 옵션 |
| **#MVP-2 시범 시설 8곳 확보 실패** | 中/致命 | M3 이전 영업 사전 약속 + 보건복지부 협력 레터 / 백업: 비치헤드 ‘신규 진단 보호자’만으로 진행 |
| **#MVP-3 ISMS-P 사전 평가 절차 지연** | 中/中 | M4부터 컨설팅 위촉, M6 사전 평가 신청 (정식 인증은 GA 1.0) |
| **#MVP-4 PWA가 iOS 사파리에서 백그라운드 동기화 제한** | 高/中 | 사파리 한계는 ‘앱 포그라운드 시 동기화’ UX로 회피 + 향후 GA에서 네이티브 검토 |
| **#MVP-5 당사자 자문단 5인 모집 지연** | 中/中 | M3 이전 한국지적발달장애인복지협회 + 특수학교 학부모회 사전 협력 |
| **#10 자가진단을 의료 진단으로 오인** | 中/긴급 | FR-68 면책 표기 의무 + LLM 가드레일 + 보건복지부 의료법 자문 위촉(M3 이전) + 분기 LLM 출력 감사 |
| **#11 AI 추이 분석 오해석** | 中/높음 | 최소 3회 데이터 누적 시 활성화 + "전문가 상담 권장" 의무 동반 + 보호자 만족도 분기 측정 |

---

## 10. Dependencies (외부)

| # | 의존성 | 시작 시점 | 상태 | 백업 |
|---|--------|----------|------|------|
| D-1 | PASS 본인인증 API 계약 | M3 W0 | 미체결 | 카카오 인증 단독 |
| D-2 | STT API (Whisper or Clova) 계약 | M3 W0 | 미체결 | 자체 호스팅 OpenAI Whisper |
| D-3 | Vision API (사진 분류) | M3 W2 | 미체결 | 룰 기반 EXIF + 사용자 수동 분류 |
| D-4 | S3-호환 스토리지 계약 (AWS/NCP) | M3 W0 | 미체결 | 로컬 디스크 (개발 단계) |
| D-5 | FCM (푸시 알림) | M5 W1 | 무료 | — |
| D-6 | SMS 게이트웨이 (NHN Toast or Naver Cloud) | M5 W1 | 미체결 | 카톡 알림톡 백업 |
| D-7 | 시범 시설 8곳 (특수학교 5 + 그룹홈 3) | M3 이전 | 영업 中 | 보호자 직접 모집 |
| D-8 | 당사자 자문단 5인 | M3 이전 | 협력 中 | 협회 추천 |
| D-9 | KWCAG 사전 평가 기관 | M5 W4 | 미선정 | 한국웹접근성평가센터 |
| D-10 | 법률 자문 (개인정보보호) | M3 | 미위촉 | — |

---

## 11. Open Questions / TBDs

| # | 질문 | Design 단계 결정 |
|---|------|---------------|
| Q-01 | STT 선정: Whisper vs Clova (한국어 비표준 발화 정확도) | PoC E1 결과 기반 |
| Q-02 | 호스팅: AWS vs NCP (Naver Cloud) — B2G·B2B 고객 선호 고려 | 시장 조사 + 비용 분석 |
| Q-03 | PDF 생성: puppeteer (Headless Chrome) vs react-pdf | 한글 폰트 임베드 안정성 |
| Q-04 | 알림 채널 우선순위: 푸시 → 이메일 → SMS → 카톡 순 폴백 정책의 카톡 알림톡 채널 정보 | 알림톡 사업자 계약 |
| Q-05 | Audit Log 보관: PostgreSQL partition vs OpenSearch | NFR-07 5년 보존 + 검색 요구 |
| Q-06 | RBAC 정책 평가: 코드 vs OPA (Open Policy Agent) | 권한 매트릭스 5×18 복잡도 평가 |
| Q-07 | 다자녀 가구 UX: 자녀별 완전 분리 vs 통합 뷰 | UX 자문단 평가 |
| Q-08 | 보호자 권한 위임 단계: ‘권한 시뮬레이션’ FR-12 일부 MVP 포함 여부 | Risk #2 대응 강도 결정 |

---

## 12. Definition of Done (MVP Beta)

본 단계가 ‘완료’로 선언되려면 다음 모두 충족.

- [ ] **25개 FR** + 7개 NFR 모두 구현 + 통과 (E2E, 자가진단 FR-62,63,67,68 포함)
- [ ] 자가진단 결과 PDF/화면에 FR-68 면책 표기 누락 0건 (CI 자동 검사)
- [ ] LLM 출력 감사 — 의료적 표현 0건 (Sprint 5에서 첫 회귀)
- [ ] 권한 매트릭스 5×18 = 90셀 자동 테스트 100% 통과
- [ ] Audit Log 누락 0건 (자동 회귀)
- [ ] First Value funnel 측정 가능 (analytics 인프라)
- [ ] KWCAG 2.2 AA 자체 평가 통과 (자동 + 자문단 5인)
- [ ] 시범 사용자 150명 + 시설 8곳 활성화
- [ ] 4개월 운영 후 SC-01~10 측정 가능
- [ ] Design 문서 / Do 가이드 / Analysis 보고서 / Report 모두 작성
- [ ] PRD v2.1 ↔ Plan ↔ Design ↔ Code Match Rate ≥ 90%

---

## 13. Next Steps

### 13.1 즉시 (이번 PM 세션 산출물)
- **`/pdca design recordare`** — Plan 기반 Design 단계 진입
- Plan 단계 의사 결정 사항을 토대로 3가지 아키텍처 옵션 생성

### 13.2 사용자 확정 필요 항목 (Design 진입 전)
- 시범 시설 8곳 영업 진척도 점검 (D-7)
- 자문단 5인 모집 시작 (D-8)
- 법률 자문 위촉 (D-10)
- 호스팅 의사 결정 (Q-02 — AWS vs NCP)

### 13.3 Design 단계 산출물 예상
1. `docs/02-design/features/recordare.design.md` — 3가지 아키텍처 선택 후
2. `docs/02-design/styles/recordare.design-anchor.md` — 디자인 토큰 (BI 기반)
3. 권한 매트릭스 90셀 정책 JSON
4. 데이터 모델 ERD (Prisma 스키마)
5. API 명세서 (OpenAPI 3.0)
6. PWA Service Worker 동기화 흐름도

---

## 14. Attribution

본 Plan v1.0은 다음 문서의 누적 컨텍스트 위에 작성:
- `recordare.prd.md` v1.0 — PRD 본문 + FR-01~16 + NFR-01~08
- `recordare-prd-v2.md` v2.1 — §6~§19 + FR-17~61 + NFR-09,10
- `recordare-workflows.md` v1.1 — 5종 사용자 × 18종 단위업무 + 권한 매트릭스
- `recordare-ux-structure.md` v1.0 — 퍼블릭 랜딩 + 대시보드 5종 명세
- `recordare-bi-guide.md` v1.0 — 브랜드 컬러·픽토그램·슬로건

검증 기준:
- WCAG 2.1 AA + KWCAG 2.2 (한국형 웹접근성 지침)
- 개정 개인정보보호법 §35의2 (데이터 이동권 — GA 1.0)
- 한국 민법 §938~§959 (후견 제도 — GA 1.0)
- 한국지적발달장애인복지협회 사용성 가이드

---

**문서 종료 — Plan v1.0 (MVP Beta)**
