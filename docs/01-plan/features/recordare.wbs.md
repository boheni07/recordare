# Recordare WBS — MVP Beta 기준

> 작성일: 2026-05-26  
> 기준 문서: `recordare-prd-v2.md` v2.4, `recordare.plan.md` v1.3, `recordare-ux-structure.md` v1.3, `recordare-workflows.md` v1.4, `recordare-lifecycle-recording-and-legal-screening.md`  
> 범위: MVP Beta M3~M6, 16주, 28개 FR + 7개 NFR  
> 목표: 시범 시설 8곳, 보호자 100명, 활동지원사 50명, 통합학급 일반교사 25명 대상 검증

---

## 1. WBS 전제

### 1.1 MVP Beta 포함 범위

| 그룹 | 포함 기능 |
|---|---|
| 기록 코어 | 계정, 권한 매트릭스, 빠른 선택 일지, 사진 기록, 통합 타임라인, 3분 인계서 |
| 접근성·당사자 UI | AAC 동의, 쉬운말, 큰글씨, TTS, 2단계 확인 |
| 자가진단 | K-DST, M-CHAT-R, AI 추이 분석, FR-68 면책 |
| v2.4 신규 | FR-69 다중 입력 4종, FR-71 후견인 얼굴 인증, U6 일반교사 화면 |
| 보안·컴플라이언스 | 민감정보 분리 동의, 암호화, Audit Log, 의료법 안전 고지 |
| 프로토타입 | Next.js 화면 흐름, mock data, 역할별 라우팅 |

### 1.2 MVP Beta 제외/이연 범위

| 이연 항목 | 이연 시점 | 비고 |
|---|---|---|
| B2B 결제·B2G 청구 | GA 1.0 | MVP는 무료 시범 |
| 18세 권한 이양 전체 자동화 | GA 1.0 | 일부 UI/자가진단 연동만 준비 |
| 후견 모드 차등 권한 전체 | GA 1.0 | MVP는 FR-71 인증 PoC 중심 |
| 행복e음·NEIS 연동 | v1.1 | 공공 API 사전 절차 필요 |
| IoT/PHR/국민건강보험 연동 | v2.0 | 장기 로드맵 |

---

## 2. 투입 인력 계획

| 코드 | 분야별 전문가 명칭 | 등급 | 주요 책임 | 투입 단계 |
|---|---|---|---|---|
| PM-01 | Product Manager / PM Lead | 고급 | 범위·우선순위·요구사항·리빙랩 의사결정 관리 | 전 단계 |
| PL-01 | Service Planner / 복지서비스 기획자 | 고급 | 생애주기 기록 체계, 사용자 여정, 권한 업무 흐름 설계 | 기획~검증 |
| UX-01 | UX/UI Lead | 고급 | 정보구조, 접근성, 당사자 모드, 디자인 시스템 | 설계~검증 |
| UX-02 | Product Designer | 중급 | 화면 상세, 컴포넌트, 사용성 테스트 반영 | 설계~구현 |
| FE-01 | Frontend Lead / Next.js Architect | 고급 | App Router 구조, 상태관리, 접근성, 성능 기준 | 설계~구현 |
| FE-02 | Frontend Engineer | 중급 | 보호자/활동지원사/당사자 화면 구현 | 구현 |
| FE-03 | Frontend Engineer | 초급 | 정적 화면, UI 컴포넌트, QA 수정 | 구현~검증 |
| BE-01 | Backend Lead / API Architect | 고급 | API, 권한 엔진, 트랜잭션, Audit 구조 | 설계~구현 |
| BE-02 | Backend Engineer | 중급 | 인증, 기록, 타임라인, 인계서 API 구현 | 구현 |
| BE-03 | Backend Engineer | 중급 | 자가진단, 알림, 파일/PDF, 오프라인 동기화 | 구현 |
| SEC-01 | Security & Compliance Lead | 고급 | 개인정보, 의료법, 후견, 감사 로그, 침투 테스트 대응 | 전 단계 |
| LEG-01 | Legal Counsel / 개인정보·의료법 자문 | 고급 | 의료법·개인정보·후견 관련 문구 및 절차 검토 | 설계~검증 |
| AI-01 | AI/LLM Engineer | 중급 | 사진 분류, AI 추이 분석, LLM 가드레일 | PoC~구현 |
| QA-01 | QA Lead / Test Architect | 고급 | 테스트 전략, 권한 매트릭스, E2E 기준 | 설계~검증 |
| QA-02 | QA Engineer | 중급 | Playwright, 접근성, 회귀 테스트 수행 | 구현~검증 |
| DEVOPS-01 | DevOps / Cloud Engineer | 중급 | NCP/AWS 환경, CI/CD, 로그, 모니터링 | PoC~운영 |
| ACC-01 | Accessibility Consultant | 고급 | KWCAG, 인지 접근성, 당사자 사용성 자문 | 설계~검증 |
| BIZ-01 | Partnership / Field Coordinator | 중급 | 시범 시설, 보호자/활동지원사/일반교사 모집 | 준비~운영 |

### 2.1 권장 투입 규모

| 구분 | 인원 | 비고 |
|---|---:|---|
| 핵심 상시 인력 | 8명 | PM 1, UX 1, FE 2, BE 2, QA 1, DevOps 1 |
| 파트타임/자문 | 5명 | 법무, 보안, 접근성, AI, 현장 코디네이터 |
| 총 권장 투입 | 13명 내외 | 16주 MVP Beta 기준 |

---

## 3. WBS 요약

| WBS | 단계 | 기간 | 주요 산출물 |
|---|---|---:|---|
| 1.0 | 착수·범위 확정 | 1주 | 킥오프, 범위 기준, 리스크 등록부 |
| 2.0 | Design 단계 | 2주 | ERD, API, 권한 정책, Design Anchor |
| 3.0 | Sprint 0 PoC·기반 구축 | 2주 | 개발환경, CI, 외부 의존성 PoC |
| 4.0 | Sprint 1 인증·동의·권한 | 2주 | 인증, RBAC/ABAC, 민감정보 동의 |
| 5.0 | Sprint 2 기록·타임라인 | 3주 | 다중 입력, 사진 기록, 타임라인 |
| 6.0 | Sprint 3 AAC·인계서·권한 완성 | 3주 | AAC 동의, 3분 인계서, 권한 테스트 |
| 7.0 | Sprint 4 자가진단·오프라인·후견 인증 | 3주 | K-DST, M-CHAT-R, FR-71, 오프라인 큐 |
| 8.0 | Sprint 5 U6·접근성·알림·PDF | 2주 | U6 화면, AI 추이, PDF, 알림, 접근성 |
| 9.0 | Beta 준비·검증 | 2주 | 침투 테스트, E2E, 시범 운영 준비 |
| 10.0 | Beta 운영·회고 | 4주 | 운영 지표, 사용자 피드백, 개선 백로그 |

---

## 4. 상세 WBS

### 1.0 착수·범위 확정

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 1.1 | 프로젝트 킥오프 | 목표, 범위, 의사결정 구조, 커뮤니케이션 룰 확정 | Kickoff Deck, 회의록 | PM-01 | 고급 | 1일 | - |
| 1.2 | 기준 문서 Baseline | PRD/Plan/UX/Workflow/생애주기 문서 버전 잠금 | Baseline 목록 | PM-01, PL-01 | 고급 | 1일 | 1.1 |
| 1.3 | MVP 범위 확정 | 28개 FR, 7개 NFR, 제외 범위 확인 | Scope Statement | PM-01 | 고급 | 1일 | 1.2 |
| 1.4 | 리스크 등록부 작성 | 의료법, 개인정보, 권한, PWA, 시범 모집 리스크 등록 | Risk Register | SEC-01, PM-01 | 고급 | 2일 | 1.3 |
| 1.5 | 현장 검증 계획 | 시범 시설 8곳, 사용자 150명, 일반교사 25명 모집 계획 | Field Test Plan | BIZ-01, PL-01 | 중급/고급 | 2일 | 1.3 |

### 2.0 Design 단계

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 2.1 | 데이터 모델 ERD | Person, JournalEntry, TimelineCard, ScreeningResult, Permission, AuditLog 모델 설계 | ERD, Prisma 초안 | BE-01 | 고급 | 3일 | 1.2 |
| 2.2 | Lifecycle/RecordCategory 반영 | `LifecycleStage`, `RecordCategory` enum과 민감정보 정책 매핑 | Data Taxonomy Spec | PL-01, BE-01 | 고급 | 2일 | 2.1 |
| 2.3 | API 설계 | 인증, 기록, 타임라인, 권한, 자가진단, 인계서 API 정의 | OpenAPI 초안 | BE-01, BE-02 | 고급/중급 | 4일 | 2.1 |
| 2.4 | 권한 엔진 PoC 설계 | 코드 기반 vs OPA, 6×20 권한 매트릭스 테스트 기준 | Permission PoC Plan | BE-01, SEC-01 | 고급 | 3일 | 2.2 |
| 2.5 | UX Design Anchor | 색상, 타이포, 컴포넌트, 생애주기·카테고리 필터 기준 | Design Anchor | UX-01 | 고급 | 4일 | 1.2 |
| 2.6 | FR-68 법적 문구 검토 | 자가진단 화면/PDF/AI 인사이트 문구 법무 검토 | Legal Copy Pack | LEG-01, SEC-01 | 고급 | 3일 | 1.4 |
| 2.7 | Saga/트랜잭션 경계 | 권한 부여, 인계서 발행, 자가진단 제출, 오프라인 동기화 트랜잭션 정의 | Transaction Spec | BE-01, PL-01 | 고급 | 3일 | 2.3 |

### 3.0 Sprint 0 PoC·기반 구축

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 3.1 | 개발환경 정비 | Next.js, API, DB, Redis, 로컬 실행 환경 정리 | Dev Setup Guide | DEVOPS-01, FE-01 | 중급/고급 | 2일 | 2.1 |
| 3.2 | CI/CD 구성 | lint, typecheck, build, test 파이프라인 구성 | CI Workflow | DEVOPS-01 | 중급 | 3일 | 3.1 |
| 3.3 | 상태관리 기반 | TanStack Query, Zustand, shared types 구성 | Frontend State Base | FE-01 | 고급 | 3일 | 3.1 |
| 3.4 | Disclaimer 컴포넌트 | `<DisclaimerBanner />`, PDF 워터마크 기준 컴포넌트화 | UI Component | FE-01, UX-02 | 고급/중급 | 2일 | 2.6 |
| 3.5 | AI/Vision/OCR PoC | 사진 분류, OCR, LLM 추이 분석, 가드레일 검증 | PoC Report | AI-01, BE-03 | 중급 | 5일 | 2.3 |
| 3.6 | 빠른 선택 UI PoC | FR-69 빠른 선택·체크리스트 15초/5초 사용성 검증 | UI PoC 결과 | UX-01, FE-02, PL-01 | 고급/중급 | 5일 | 2.5 |

### 4.0 Sprint 1 인증·동의·권한

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 4.1 | 인증/역할 모델 | 보호자, 활동지원사, 당사자, U4, 시설장, 일반교사 역할 모델 | Auth/Roles | BE-02, FE-02 | 중급 | 4일 | 3.1 |
| 4.2 | 보호자 온보딩 7-Step | 가입, 자녀 등록, 소속기관, 알림, First Value 흐름 | Onboarding Flow | FE-02, BE-02 | 중급 | 5일 | 4.1 |
| 4.3 | 민감정보 분리 동의 | 건강·자가진단·후견·장애정보 별도 동의 화면/API | Consent Module | SEC-01, BE-02, FE-01 | 고급/중급 | 5일 | 2.6 |
| 4.4 | 권한 매트릭스 v1 | 6×20 권한 정책 JSON/코드 구현 | Permission Matrix | BE-01 | 고급 | 5일 | 2.4 |
| 4.5 | Audit Log 기본 | 데이터 액션 로그, actor/subject/action/time 구조 | Audit Base | BE-03, SEC-01 | 중급/고급 | 4일 | 4.3 |
| 4.6 | E2E 회귀 1차 | 가입, 동의, 권한 기본 플로우 테스트 | E2E Suite 1 | QA-01, QA-02 | 고급/중급 | 3일 | 4.1~4.5 |

### 5.0 Sprint 2 기록·타임라인

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 5.1 | FR-69 빠른 선택 일지 | 식사/투약/행동/정서/학습 옵션, 저장 API | Quick Journal | FE-02, BE-02 | 중급 | 5일 | 4.4 |
| 5.2 | 체크리스트 입력 | 일과 슬롯, 5분 단위 체크, 패턴 저장 구조 | Checklist Journal | FE-02, BE-03 | 중급 | 5일 | 5.1 |
| 5.3 | 사진+태그 입력 | 사진 5장, Quick Tags, 짧은 캡션 | Photo Journal | FE-03, BE-03 | 초급/중급 | 4일 | 5.1 |
| 5.4 | 텍스트+OS 음성 안내 | 자체 STT 없음, OS 키보드 음성 안내 UX | Text Journal | FE-03, UX-02 | 초급/중급 | 2일 | 5.1 |
| 5.5 | 통합 타임라인 | 생애주기 색상, RecordCategory 필터, 권한 마스킹 | Timeline | FE-01, BE-02 | 고급/중급 | 5일 | 5.1 |
| 5.6 | 기록 카테고리 검증 | `RecordCategory[]`, 민감정보 정책, 필터 정확성 테스트 | Category Test | QA-02, PL-01 | 중급/고급 | 3일 | 5.5 |

### 6.0 Sprint 3 AAC·인계서·권한 완성

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 6.1 | 당사자 모드 셸 | 큰글씨, TTS, 큰 카드, 되돌리기, 쉬운말 | Self Mode Shell | FE-01, UX-01 | 고급 | 5일 | 4.1 |
| 6.2 | AAC 동의 UI | Yes/No 카드, 2단계 확인, 보호자 알림 | AAC Consent | FE-02, BE-02 | 중급 | 5일 | 6.1 |
| 6.3 | 권한 부여/회수 | 기간·범위·만료 D-30/D-7/D-1, 긴급 회수 | Permission Flow | FE-02, BE-01 | 중급/고급 | 5일 | 4.4 |
| 6.4 | 3분 인계서 생성 | 의료, 식사, AAC, 위험행동, 권한 범위 요약 | Handover Draft | BE-03, FE-03 | 중급/초급 | 5일 | 5.5 |
| 6.5 | 인계서 PDF | 한글 폰트, 비밀번호 옵션, FR-68 포함 시 워터마크 | PDF Export | BE-03, FE-01 | 중급/고급 | 4일 | 6.4 |
| 6.6 | 권한 120셀 테스트 | 정상/거부 케이스, U6 조건부 권한 포함 | Permission Test Suite | QA-01, BE-01 | 고급 | 4일 | 6.3 |

### 7.0 Sprint 4 자가진단·오프라인·후견 인증

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 7.1 | K-DST 화면/API | 8단계, 보호자 응답, PDF, 타임라인 등록 | K-DST Module | FE-02, BE-03 | 중급 | 5일 | 3.4 |
| 7.2 | M-CHAT-R 화면/API | 16~30개월, 20문항, 6개월 재검사 옵션 | M-CHAT-R Module | FE-03, BE-03 | 초급/중급 | 4일 | 7.1 |
| 7.3 | FR-68 자동 적용 | 자가진단 화면, PDF, 외부공유 모달, AI 출력 검증 | Compliance Guard | SEC-01, FE-01, AI-01 | 고급/중급 | 5일 | 7.1 |
| 7.4 | AI 추이 분석 기반 | 3회 이상 활성화, 상승/정체/하락, LLM 가드레일 | Trend Insight Base | AI-01, BE-03 | 중급 | 5일 | 7.1 |
| 7.5 | 오프라인 큐 | IndexedDB, Service Worker, 동기화 상태, 충돌 처리 | Offline Queue | FE-01, BE-02 | 고급/중급 | 5일 | 5.1 |
| 7.6 | FR-71 후견인 얼굴 인증 PoC | 셀카, 라이브니스, 결정문 신분증 매칭 플로우 | Guardian Face PoC | SEC-01, AI-01, BE-01 | 고급/중급 | 5일 | 2.6 |

### 8.0 Sprint 5 U6·접근성·알림·최종 UI

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 8.1 | U6 일반교사 대시보드 | 담당 통합학생, 주간 메모, 특수교사 공유 | U6 Dashboard | FE-03, FE-02 | 초급/중급 | 4일 | 5.5 |
| 8.2 | U6 짧은 메모 | 학급 컨텍스트 마스킹, 의료 카테고리 차단 | U6 Memo | FE-02, BE-02 | 중급 | 4일 | 8.1 |
| 8.3 | 알림 시스템 | 권한 만료, 동의, 인계서, 자가진단 이상치 | Notification Base | BE-03, FE-03 | 중급/초급 | 5일 | 6.3 |
| 8.4 | 접근성 점검 | KWCAG, 키보드 탐색, 색약, 큰글씨, 쉬운말 | A11y Report | ACC-01, QA-02, UX-01 | 고급/중급 | 5일 | 8.1 |
| 8.5 | 모바일 반응형 검증 | iOS/Android, Safari/Chrome, PWA 설치 안내 | Mobile QA | QA-02, FE-01 | 중급/고급 | 4일 | 8.4 |
| 8.6 | LLM 가드레일 회귀 | 의료적 표현 금지, 정규식+샘플 출력 검사 | LLM Guard Test | AI-01, QA-01, SEC-01 | 중급/고급 | 3일 | 7.4 |

### 9.0 Beta 준비·검증

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 9.1 | 통합 E2E 테스트 | 가입→기록→타임라인→인계서→동의→자가진단 | E2E Final | QA-01, QA-02 | 고급/중급 | 5일 | 8.6 |
| 9.2 | 침투 테스트 1차 | OWASP, 권한 우회, 민감정보 접근, Audit 변조 | Pen-test Report 1 | SEC-01, 외부보안 | 고급 | 4일 | 9.1 |
| 9.3 | 성능·부하 테스트 | 동시 1,000명, API P95, PDF 생성, 로그량 | Performance Report | DEVOPS-01, QA-01 | 중급/고급 | 3일 | 9.1 |
| 9.4 | 운영 모니터링 | Sentry/PostHog/Uptime, 로그 대시보드 | Monitoring Board | DEVOPS-01 | 중급 | 3일 | 9.1 |
| 9.5 | 시범 운영 온보딩 | 시설 8곳, 보호자 100명, 활동지원사 50명, 일반교사 25명 초대 | Beta Onboarding Kit | BIZ-01, PM-01 | 중급/고급 | 5일 | 9.1 |
| 9.6 | Beta Go/No-Go | 법무, 보안, 접근성, 핵심 KPI 계측 가능 여부 판단 | Go/No-Go Record | PM-01, SEC-01, QA-01 | 고급 | 1일 | 9.2~9.5 |

### 10.0 Beta 운영·회고

| WBS ID | 작업명 | 상세 작업 | 산출물 | 담당 | 등급 | 기간 | 선행 |
|---|---|---|---|---|---|---:|---|
| 10.1 | Beta 운영 | 4주간 시범 운영, 장애 대응, 사용자 문의 | 운영 로그 | PM-01, DEVOPS-01, FE/BE | 고급/중급 | 4주 | 9.6 |
| 10.2 | KPI 측정 | First Value, 일지 작성 시간, 인계서 시간, 자가진단 도달, NPS | KPI Report | PM-01, QA-01 | 고급 | 1주 | 10.1 |
| 10.3 | 리빙랩 회고 | 당사자/보호자/활동지원사/일반교사 피드백 수집 | Living Lab Report | PL-01, UX-01, BIZ-01 | 고급/중급 | 1주 | 10.1 |
| 10.4 | 개선 백로그 | Critical/Important/Minor로 분류, GA 1.0 반영 결정 | Backlog vNext | PM-01, 각 Lead | 고급 | 3일 | 10.2 |
| 10.5 | MVP Beta 종료 보고 | 산출물, 지표, 리스크, 예산, 다음 단계 정리 | Beta Closing Report | PM-01 | 고급 | 3일 | 10.4 |

---

## 5. FR 기준 추적 매트릭스

| FR/NFR | 관련 WBS | 담당 리드 |
|---|---|---|
| FR-01 계정/가입 | 4.1, 4.2 | BE-02 |
| FR-02 권한 매트릭스 | 2.4, 4.4, 6.3, 6.6 | BE-01 |
| FR-05 빠른 선택 일지 | 5.1 | FE-02 |
| FR-06 사진 기록 | 5.3 | BE-03 |
| FR-08 타임라인 | 5.5 | FE-01 |
| FR-09 / FR-43 인계서·PDF | 6.4, 6.5 | BE-03 |
| FR-11, FR-17~19 AAC/당사자 UI | 6.1, 6.2 | UX-01 |
| FR-13~15 보안·민감정보 | 4.3, 4.5, 9.2 | SEC-01 |
| FR-16 접근성 | 8.4, 8.5 | ACC-01 |
| FR-25~26 온보딩·마이그레이션 | 4.2, 5.5 | PM-01 |
| FR-30~32 오프라인 | 7.5 | FE-01 |
| FR-35 알림 | 8.3 | BE-03 |
| FR-40 쉬운말 | 6.1, 8.4 | UX-01 |
| FR-62~63 자가진단 | 7.1, 7.2 | BE-03 |
| FR-67 AI 추이 | 7.4, 8.6 | AI-01 |
| FR-68 면책·가드레일 | 3.4, 7.3, 8.6 | SEC-01 |
| FR-69 다중 입력 | 3.6, 5.1~5.4 | FE-02 |
| FR-71 후견인 얼굴 인증 | 7.6 | SEC-01 |
| FR-72~73 U6 일반교사 | 8.1, 8.2 | FE-02 |
| NFR-01 성능 | 9.3 | DEVOPS-01 |
| NFR-05/NFR-09 접근성 | 8.4, 8.5 | ACC-01 |
| NFR-07 데이터 보존 | 4.5, 9.2 | SEC-01 |

---

## 6. 마일스톤

| 마일스톤 | 목표일 | 완료 기준 |
|---|---|---|
| M0 Kickoff 완료 | W1 | 범위·인력·리스크 등록 완료 |
| M1 Design 승인 | W3 | ERD, API, 권한 정책, Design Anchor 승인 |
| M2 Core Flow 시연 | W6 | 가입→권한→기록→타임라인 E2E |
| M3 Handover/AAC 시연 | W9 | AAC 동의, 인계서 PDF, 권한 테스트 통과 |
| M4 Screening/Offline 시연 | W12 | K-DST, M-CHAT-R, AI 추이, 오프라인 큐 |
| M5 U6/A11y 완료 | W14 | 일반교사 화면, 접근성 1차 통과 |
| M6 Beta Go/No-Go | W16 | 보안·법무·E2E·KPI 계측 기준 통과 |
| M7 Beta 운영 회고 | W20 | KPI Report, Living Lab Report, GA 백로그 |

---

## 7. 핵심 리스크 및 대응

| 리스크 | 영향 | 대응 WBS |
|---|---|---|
| 의료법상 자가진단 오인 | 출시 차단 | 2.6, 3.4, 7.3, 8.6, 9.2 |
| 개인정보 분리 동의 미흡 | 출시 차단 | 4.3, 9.2 |
| 권한 매트릭스 누락 | 고위험 | 2.4, 4.4, 6.6 |
| Audit Log 무결성 부족 | 고위험 | 4.5, 9.2 |
| FR-69 사용성 미달 | 핵심 가치 저하 | 3.6, 5.1, 5.2 |
| PWA/iOS 동기화 제약 | 사용성 저하 | 7.5, 8.5 |
| 시범 시설 모집 실패 | 검증 지연 | 1.5, 9.5 |
| U6 일반교사 개인정보 입력 위험 | 법적/학교 신뢰 리스크 | 8.1, 8.2, 6.6 |

---

## 8. 산출물 목록

| 구분 | 산출물 |
|---|---|
| 기획 | Scope Statement, Risk Register, Field Test Plan |
| 설계 | ERD, OpenAPI, Permission Policy, Transaction Spec, Design Anchor |
| UX/UI | 화면 설계, 접근성 가이드, FR-68 문구 세트, U6 화면 |
| 개발 | Web app, API, DB schema, Audit Log, PDF, Offline Queue |
| AI | Vision/OCR PoC, AI Trend Insight, LLM Guard Test |
| QA | E2E Suite, Permission Test Suite, A11y Report, Performance Report |
| 보안/법무 | Legal Copy Pack, Consent Spec, Pen-test Report |
| 운영 | Monitoring Board, Beta Onboarding Kit, KPI Report, Living Lab Report |

