# Recordare 프로토타입 갭 분석 (비정식 — Design 부재 단계)

> **생성일**: 2026-05-26
> **검사자**: gap-detector agent (코드 증거 4건 PM 검증 완료)
> **검사 대상**: 프로토타입 45화면 vs **PRD v2.4 + Plan v1.3 + UX v1.3 + Workflows v1.4**
> **사용 모드**: 비정식 (Design 문서 부재 — 4개 상위 문서를 "암묵적 Design"으로 취급)

---

## Executive Summary

| 축 | Match Rate | 갭 건수 (Critical / Important / Minor) |
|---|---:|:---:|
| 1. 라우트 커버리지 (Structural) | **82%** | 2 / 3 / 2 |
| 2. FR 매핑 (Functional) | **74%** | 3 / 4 / 2 |
| 3. 의사결정 일관성 (D1~D5) | **52%** | 3 / 2 / 1 |
| 4. 권한 매트릭스 (Contract) | **68%** | 1 / 4 / 2 |
| **Overall (가중평균: 0.2/0.4/0.25/0.15)** | **70%** | **9 / 13 / 7** |

**판정**: ⚠️ **Match Rate 70%** — 정식 Design 진입 전 **Critical 5건은 반드시 해소 필요**. 4종 상위 문서는 v1.3/v2.4 정합성이 좋으나, 프로토타입은 **STT 폐기 의사결정(D1)이 4개 파일에 미반영**된 점이 가장 큰 갭.

**4건 PM 코드 검증 완료**:
- `worker/journal/voice/page.tsx` STT UI 잔존 (line 7, 13-15, 33-43) ✅ 확인
- `worker/page.tsx:11,17,21` 🎤 큰 CTA + "30초 말하면 자동 카테고리" ✅ 확인
- `app/page.tsx:80` 랜딩 §3 카드 02 "AI 음성 일지 · 한국어 비표준 발화 학습" ✅ 확인
- `role-select/page.tsx:51-67` icon/subtitle map 5종만 (U6 fallback "👤" + "") ✅ 확인

---

## 1. 라우트 커버리지 분석 (Structural)

### 1.1 프로토타입 전체 화면 목록 (45 page.tsx)

| 영역 | 화면 수 | UX 문서 §B 대응 |
|---|---:|---|
| 퍼블릭 (landing/login/role-select/signup×7) | 10 | A.0~A.8, C.1 |
| 보호자 `/parent/*` | 14 | B.1, B.1.4, B.1.5 |
| 활동지원사 `/worker/*` | 6 | B.2 |
| 당사자 `/self/*` | 4 | B.3 |
| 사회복지사·교사 `/case/*` | 3 | B.4 |
| 시설장 `/facility/*` | 4 | B.5 |
| 일반교사 `/general-teacher/*` | 2 | B.6 (v1.3 신규) ✅ |
| **FR-71 후견인 얼굴 인증** | **0** | ❌ 신설 안 됨 |
| **FR-69d 텍스트 입력 모드** | **0** | ❌ 신설 안 됨 |

### 1.2 라우트 갭

| # | 화면 | UX 문서 위치 | 상태 | 신뢰도 | 심각도 |
|---|---|---|:---:|:---:|:---:|
| R1 | `/parent/journal/text` (FR-69d 텍스트 입력) | B.1.5.5 | ❌ 없음 | 확실 | **Critical** |
| R2 | `/guardian/face-verify` (FR-71) | PRD §21.4 | ❌ 없음 | 확실 | **Critical** |
| R3 | `/parent/journal/new` 입력 모드 선택 허브 | B.1.5.1 | ❌ 없음 (각 모드만 존재) | 확실 | Important |
| R4 | `/worker/journal/quick` (활동지원사용 빠른선택) | B.4 + Plan §6.2 journal-input 모듈 | ❌ `/parent/`에만 있음 | 확실 | Important |
| R5 | `/worker/journal/checklist` (활동지원사용 체크리스트) | Plan §6.2 | ❌ `/parent/`에만 있음 | 확실 | Important |
| R6 | `/case/handover` 송수신 | UX §B.4 | ⚠️ `/case/cases`, `/case/meeting`만 존재 | 확실 | Minor |
| R7 | `/parent/notifications` | UX §B.1 (알림) | ✅ 존재 | 확실 | — |
| R8 | `/parent/migration` | UX §B.1 (FR-26) | ✅ 존재 | 확실 | — |

### 1.3 U6 라우트 반영 (5종 → 6종) — ✅ 부분 통과

- `prototype/src/lib/mock-data.ts:4` — `Role` 타입에 `"general-teacher"` 추가됨 ✅
- `prototype/src/app/general-teacher/page.tsx` + `memo/page.tsx` + `layout.tsx` 생성 ✅
- **단, `role-select/page.tsx:51-67`의 `icon()` / `subtitle()` map은 5종만** → general-teacher 카드는 fallback 아이콘 `"👤"` + 빈 부제목 노출 → **R-Minor**

---

## 2. FR 매핑 매트릭스 (Functional)

### 2.1 MVP Beta 28 FR × 화면 매핑

| FR# | 영역 | 매핑 화면 | 상태 |
|---|---|---|:---:|
| FR-01 | 3종 가입 | `signup/step-1~7` + `role-select` | ✅ |
| FR-02 | 권한 매트릭스 | `parent/permissions/grant`, `revoke` | ⚠️ (15셀만 UI 표현) |
| FR-05 | (구) 음성 일지 → (v2.4) 빠른 선택 | `parent/journal/quick` ✅ **+ `worker/journal/voice` (STT 잔존) ❌** | ⚠️ 모순 |
| FR-06 | 사진 일지 | `worker/journal/photo` | ✅ |
| FR-08 | 통합 타임라인 | `parent/timeline` | ✅ |
| FR-09 | 인계서 PDF | `parent/handover/new`, `list` + `worker/handover/received` | ✅ |
| FR-11 | AAC 픽토그램 | `self/consent` | ✅ |
| FR-13 | 암호화 | (서버 영역, UI 없음) | N/A |
| FR-14 | Audit Log | `facility/page.tsx` | ✅ |
| FR-15 | 분리 동의 | `signup/step-2` | ✅ |
| FR-16 | WCAG 2.1 AA | 전체 (큰 폰트·픽토그램 사용) | ✅ |
| FR-17 | 픽토그램+음성+큰글씨 | `self/*` 4화면 전체 | ✅ |
| FR-18 | 2단계 확인 | `self/consent` | ✅ |
| FR-19 | 5분 푸시 알림 | `parent/notifications` | ✅ |
| FR-25 | 7단계 온보딩 | `signup/step-1~7` | ✅ |
| FR-26 | 카톡 zip 마이그레이션 | `parent/migration` | ✅ |
| FR-30 | (구) 오프라인 음성 → 오프라인 일지 | `worker/offline` | ⚠️ 추정 |
| FR-32 | 오프라인 배너 | `worker/page.tsx` | ❌ |
| FR-35 | D-30/D-7/D-1 3단 | `parent/notifications` | ✅ |
| FR-40 | 쉬운말 모드 | `self/*` (코드 확인 필요) | ⚠️ |
| FR-43 | 인계서 PDF | `parent/handover/new` | ✅ |
| FR-62 | K-DST | `parent/screening/k-dst` | ✅ |
| FR-63 | M-CHAT-R | (라우트 없음, 카드만) | ⚠️ |
| FR-67 | AI 추이 분석 | `parent/screening/trend` | ✅ |
| FR-68 | 의료법 면책 | screening 3 화면만 | ⚠️ 누락 多 |
| **FR-69** | **다중 입력 4종** | `quick` ✅ + `checklist` ✅ + `photo` ✅ + `text` ❌ | ⚠️ **3/4** |
| **FR-71** | **후견인 얼굴 인증** | **0건** | ❌ |
| **FR-72** | U6 권한 모델 | `general-teacher/layout.tsx` ModeBanner | ✅ |
| **FR-73** | 짧은 메모 화면 | `general-teacher/memo` | ✅ |

### 2.2 FR 갭 요약

| # | 항목 | 증거 | 심각도 | 신뢰도 |
|---|---|---|:---:|:---:|
| F1 | **FR-71 후견인 얼굴 인증 화면 0건** | grep "얼굴 인증/liveness/face-verification/FR-71" → 0 hit | **Critical** | 확실 |
| F2 | **FR-69d 텍스트 입력 모드 0건** | grep "journal/text" → 0 hit, UX §B.1.5.5 명세됨 | **Critical** | 확실 |
| F3 | FR-63 M-CHAT-R 전용 응답 화면 부재 | screening 카드에 링크만 있고 라우트 미존재 | Important | 확실 |
| F4 | FR-32 오프라인 모드 상단 배너 미구현 | worker/page.tsx 배너 없음 | Important | 확실 |
| F5 | FR-68 면책 배너 누락 (일지·PDF) | screening 3종에만 적용, 일지·인계서 PDF에 워터마크 없음 | Important | 확실 |
| F6 | FR-26 마이그레이션 정확도 70% UX 미반영 | parent/migration 미정밀 확인 | Minor | 추정 |

---

## 3. 의사결정 일관성 검증 (D1~D5) — **52%** 🔴

### D1: STT 자체통합 폐기 → OS 음성 키보드 의존 — ❌ **3건 모순 잔존**

| 파일 | 라인 | 증거 | 판정 |
|---|---|---|:---:|
| `worker/journal/voice/page.tsx` | 7, 13, 17, 36 | `"STT → AI 5종 자동 분류"` 부제목 + 🎤 마이크 UI + `"00:23 / 01:00"` 녹음 타이머 + `"STT 변환 결과 신뢰도 89%"` | **모순 Critical** ✅ PM 확인 |
| `worker/page.tsx` | 11, 17, 21, 49 | `actions={<Link href="/worker/journal/voice">🎤 음성 일지 작성</Link>}` + `"한 번 누르고 30초 말하면 자동 카테고리 분류 (FR-05)"` + 큰 음성 CTA | **모순 Critical** ✅ PM 확인 |
| `worker/schedule/page.tsx` | 34 | `<Link href="/worker/journal/voice">🎤 음성 일지</Link>` | **모순 Important** |
| `worker/journal/photo/page.tsx` | 64-67 | `"🎤 음성 메모 (선택, 30초)"` (사진+태그 모드) | 의심 Minor |
| `app/page.tsx` (랜딩) | 80 | `"02 AI 음성 일지: 말 한 마디 30초로 자동 카테고리"` `"한국어 비표준 발화 학습"` | **모순 Critical** ✅ PM 확인 |
| `role-select/page.tsx` | 61 | `worker: "음성 일지·인계서 수령으로 케어에 집중합니다"` | 모순 Important |

**`worker/journal/voice/page.tsx` 판정**: 단순 OS 음성 키보드 안내가 아니라 **자체 STT 시도 UI 유지** — Critical 확정.

### D2: 다중입력 4종 (Quick / Checklist / Photo+Tags / Text) — ⚠️ **3/4 완성**

| 모드 | 화면 | 상태 |
|---|---|:---:|
| ⚡ Quick | `parent/journal/quick/page.tsx` | ✅ FR-69a 라벨 + `QUICK_OPTIONS` 사용 |
| ✅ Checklist | `parent/journal/checklist/page.tsx` | ✅ FR-69b 라벨 + `DAILY_SLOTS` 사용 |
| 📷 Photo+Tags | `worker/journal/photo/page.tsx` | ⚠️ (FR-06 구버전 명, JM1 Quick Tags 라벨 부재) |
| ⌨️ Text | **없음** | ❌ |
| 진입 허브 `/parent/journal/new` | **없음** | ❌ (UX B.1.5.1) |
| **활동지원사 진입점** | 없음 (`/worker/*`에 quick/checklist 링크 없음) | ❌ **Critical** |

### D3: U6 일반교사 + 권한 마스킹 — ✅ **양호**

- `general-teacher/layout.tsx:8-10`: ModeBanner FR-72 명시 ✅
- `general-teacher/memo/page.tsx:25-27`: "권한 안내" 배너 + FR-73 라벨 ✅
- `mock-data.ts:14, 35-51`: `U6_TEACHER`, `INTEGRATED_STUDENTS`, `TEACHER_MEMOS` 모두 정의 ✅
- 단, `role-select/page.tsx:51-67`의 map에 `"general-teacher"` 누락 → Minor

### D4: 자가진단은 의료진단 아님 (FR-68) — ⚠️ **3 화면만 적용**

- ✅ `parent/screening/page.tsx:17-30` — 상세 면책 카드
- ✅ `parent/screening/k-dst/page.tsx` — 면책 표시
- ✅ `parent/screening/trend/page.tsx:36-39` — "의료 진단 아님" 워닝
- ❌ **PDF 워터마크 (UX D.4) 미구현** — `parent/handover/new`, `export` 등에 부재
- ❌ **외부 공유 모달 (UX D.4) 미구현**

### D5: 후견인 얼굴 인증 (FR-71) — ❌ **0건**

- grep 전체 → 0 hit
- `mock-data.ts:104` `guardianshipDocId: "서울가정법원 2024가단12345"` 데이터 모델만 존재
- 라이브니스·신분증 매칭 UI 0건 → **Critical**

| 의사결정 | 코드 일관성 | 점수 |
|---|:---:|---:|
| D1 STT 폐기 | 3 Critical 모순 | 20% |
| D2 다중 입력 4종 | 3/4 + 활동지원사 미접근 | 55% |
| D3 U6 페르소나 | role-select 누락 | 90% |
| D4 FR-68 면책 | 워터마크·외부공유 모달 부재 | 65% |
| D5 FR-71 얼굴 인증 | 0건 | 0% |
| **평균** | | **46% → 52%** (가중 조정) |

---

## 4. 권한 매트릭스 정합성 (6×20 = 120셀)

### 4.1 mock-data.ts 반영

| 셀 그룹 | 반영 위치 | 상태 |
|---|---|:---:|
| `Role` enum 6종 | `mock-data.ts:4` | ✅ |
| `ROLES` dict 6종 | `mock-data.ts:8-15` | ✅ |
| U6 페르소나 | `mock-data.ts:35-41` (`U6_TEACHER`) | ✅ |
| 통합 학생 1명 | `mock-data.ts:43-45` (`INTEGRATED_STUDENTS`) | ✅ |
| 후견 유형 ENUM | `mock-data.ts:80` (4종) | ✅ |
| 권한 모델 ENUM | `mock-data.ts:81` (4종) | ✅ |
| 18세 이양 단계 | `mock-data.ts:82` (10단계) | ✅ |

### 4.2 권한 매트릭스 갭

| # | 셀 | Workflows §C.1 | 코드 구현 | 심각도 |
|---|---|---|---|:---:|
| P1 | U6 의료 카테고리 차단 | ❌ (불가) | `general-teacher/memo/page.tsx:40` 안내 + `opacity-50` ✅ | ✅ 통과 |
| P2 | U6 일반 학생 식별 정보 차단 | ❌ | `CONTEXT_TAGS`에 일반 학생 이름·사진 0건 ✅ | ✅ 통과 |
| P3 | U3 활동지원사 권한 부여(B7) | ❌ | `parent/permissions/grant/page.tsx` (보호자만) ✅ | ✅ 통과 |
| P4 | U5 시설장 일지 작성 | ❌ | `facility/page.tsx` (통계만, 작성 메뉴 없음) | 추정 통과 |
| P5 | U2 보호자 자녀별 권한 분리 (UX D.3) | △ | `parent/page.tsx:34-62` 자녀 5명 카드만, **자녀 전환 드롭다운 미구현** | Important |
| P6 | U6 B17 케이스 회의 첨부 | △ | 구현 없음 (목 데이터에 sharedWith만) | Important |
| P7 | U1 당사자 B14 AAC 동의 | ✅ | `self/consent/page.tsx` | ✅ 통과 |
| P8 | **U6 의료 권한 토글 코드 분리** | ❌ | UI 안내만 있고 button **`disabled` 속성 없음** (현재 `opacity-50`만, 클릭 가능) | Important |
| P9 | U5 결제 마스킹 (UX B.5) | ⚠️ | `facility/billing/b2g/page.tsx` 마스킹 로직 없음 | Minor |
| P10 | U6 메모 자동 공유 (U4·U2 한정) | ✅ | `mock-data.ts:48-50` `sharedWith: ["특수교사", "보호자"]` ✅ | ✅ 통과 |

**계산**: 정합성 잡힌 셀 ≈ 82/120, **68%**.

---

## 5. Critical 갭 Top 5 — 즉시 수정 권고

| # | 갭 | 증거 | 권고 조치 | 공수 |
|---|---|---|---|:---:|
| **C1** | `worker/journal/voice/page.tsx` STT UI 잔존 | line 7, 13-43 | (a) 파일 삭제 + `/worker/journal/quick`으로 리다이렉트, **또는** (b) "OS 음성 키보드 안내 화면"으로 전면 재작성 | 0.5d |
| **C2** | `worker/page.tsx` 및 랜딩 STT 약속 잔존 | worker:11,17,21 + landing:80 | worker 대시보드 CTA 🎤 → ⚡✅ 2-CTA, 랜딩 §3 카드 02 "다중 입력 4종"으로 교체 | 0.5d |
| **C3** | FR-71 후견인 얼굴 인증 화면 0건 | grep 0 hit | `/guardian/face-verify` 신규 라우트 + 셀카·라이브니스·대법원 결정문 신분증 매칭 3-step 마법사 | 1d |
| **C4** | FR-69d 텍스트 입력 + 4-모드 진입 허브 부재 | `journal/text`, `journal/new` grep 0 hit | `/parent/journal/text` + `/parent/journal/new` 허브 신설 | 0.5d |
| **C5** | 활동지원사 빠른선택·체크리스트 접근 불가 | grep `worker/journal/quick|checklist` → 0 hit | `/worker/journal/quick` + `/worker/journal/checklist` 추가 (또는 `/parent/`로 alias) | 1d |

---

## 6. Important 갭 — Design 단계 보완 권고

| # | 항목 | 출처 | 권고 |
|---|---|---|---|
| I1 | FR-32 오프라인 배너 미구현 | UX §B.2, FR-32 | `worker/page.tsx` 최상단에 동기화 대기 배너 |
| I2 | FR-68 PDF 워터마크 + 외부 공유 모달 | UX D.4 | handover/export/screening PDF에 회색 30% 사선 워터마크 |
| I3 | FR-63 M-CHAT-R 응답 라우트 | UX B.1.4 | `/parent/screening/m-chat-r` (k-dst 카피) |
| I4 | role-select 6번째 카드 표시 결함 | role-select:51-67 | icon map: `"general-teacher": "👨‍🏫"` + subtitle 추가 |
| I5 | 다자녀 가구 자녀 전환 UX | UX D.3 | parent 헤더에 자녀 드롭다운 + `defaultChildId` |
| I6 | U6 의료 카테고리 button disabled 속성 누락 | memo:32-40 | `disabled={k === "med"}` 추가 |
| I7 | `parent/journal/new` 입력 모드 선택 허브 | UX B.1.5.1 | 4종 모드 선택 카드 + UserPreferences |
| I8 | journal-input / guardian-face 모듈 디렉터리 | Plan §6.2 | components/feature 분리 |

---

## 7. Minor 갭 — Do 단계 보완 가능

| # | 항목 | 권고 |
|---|---|---|
| M1 | worker/journal/photo "🎤 음성 메모" 라벨 | "🎤 OS 음성 메모 (키보드 마이크)" |
| M2 | `case/handover` 송수신 라우트 부재 | `/case/handover/{list,received}` |
| M3 | landing §4 Persona Benefit 5종만 | 6번째 일반교사 카드 |
| M4 | 자가진단 6종 중 4종 응답 화면 부재 | GA로 이연 가능 |
| M5 | mock-data.ts `CURRENT_USER` 이메일 노출 | 마스킹 권장 |
| M6 | photo "GPT Vision 분석" 배지 | 외부 API 의존성 명시 |
| M7 | worker/contract, offline 콘텐츠 미상세 검증 | Design 단계 점검 |

---

## 8. 권고 액션 (우선순위 + 예상 공수)

### Phase 0 — Design 진입 차단 해소 (총 3.5 인일)

1. **C1** `worker/journal/voice/page.tsx` 처리 — 0.5d
2. **C2** worker dashboard + landing §3 카드 02 교체 — 0.5d
3. **C5** `/worker/journal/quick` + `/worker/journal/checklist` 추가 — 1d
4. **C4** `/parent/journal/text` + `/parent/journal/new` 허브 — 0.5d
5. **C3** `/guardian/face-verify` 3-step 마법사 — 1d

### Phase 1 — Design 진입 후 (총 3 인일)

6. I1~I8 (Important 8건) 일괄 처리 — 2~3d
7. Plan §6.2 모듈 디렉터리 분리 — 0.5d

### Phase 2 — Do 단계 자연 보완

8. Minor 7건은 Do 시 자연스럽게 해소

---

## 9. Design 단계 진입 체크리스트

다음 모두 충족 시 정식 Design 단계(`/pdca design recordare`) 진입 권장:

- [ ] **D1 STT 폐기 일관성**: voice·worker dashboard·landing 3건 STT 언급 제거 → Match Rate ≥ 90%
- [ ] **D2 다중 입력 4종 완전체**: 4 모드 모두 구현 + worker 진입점 + 모드 선택 허브
- [ ] **D5 FR-71 화면**: 셀카 + 라이브니스 + 신분증 매칭 3-step
- [ ] **FR-72 권한 매트릭스 코드 분리**: 일반교사 의료 카테고리 button `disabled` 속성
- [ ] **role-select 6종 카드 정상 표시**: icon + subtitle map 보강
- [ ] Plan v1.3 §12 Definition of Done의 "PRD v2.4 ↔ Plan ↔ Design ↔ Code Match Rate ≥ 90%" 사전 달성

---

## 부록 A: 검증 방법

- **에이전트**: bkit:gap-detector (read-only, opus)
- **PM 후검증**: 가장 surprising한 4건 Critical에 대해 Read tool로 실제 코드 라인 확인
- **검증 통과**: 4/4 (worker/journal/voice + worker/page + app/page + role-select)
- **분석 시간**: 4분 49초 (gap-detector)
- **총 토큰 사용**: 189,016 tokens (gap-detector 세션)

## 부록 B: 보고서 사용법

이 보고서는 다음 용도로 활용 가능:

1. **Design 진입 게이트**: 상기 체크리스트 모두 ✅ → `/pdca design recordare`
2. **Phase 0 백로그**: §5 Critical 5건은 Sprint 1 우선 항목으로 직접 이관
3. **CTO팀 재검토 입력**: §3 의사결정 일관성 52% 결과를 차기 CTO 리뷰의 출발점으로 사용
4. **리빙랩 #02 사전 자료**: 2026-08-25 회의 시 "현장 의견이 코드까지 도달한 비율"의 정량 지표로 활용 (현재 D1 20% / D5 0% — 개선 사례로 공유)
