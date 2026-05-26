# Recordare Prototype (Static UI)

> 38화면 화면 전환 프로토타입 — 기능 개발 없음, mock data만.

## 실행

```bash
cd prototype
npm install
npm run dev     # http://localhost:3000
```

## 화면 라우팅 (38화면)

### 공용 (10)
- `/` — 랜딩 페이지
- `/login` — 로그인
- `/signup/step-1` ~ `/signup/step-7` — 가입 7-Step 마법사
- `/role-select` — 다중 역할 선택

### 보호자 U2 (10)
- `/parent` — 대시보드
- `/parent/timeline` — 통합 타임라인
- `/parent/children/new` — 자녀 등록
- `/parent/migration` — 사진 마이그레이션 (카톡 zip)
- `/parent/permissions/grant` — 권한 위임
- `/parent/permissions/revoke` — 권한 회수 (긴급)
- `/parent/handover/new` — 인계서 생성
- `/parent/handover/list` — 인계서 리스트
- `/parent/notifications` — 알림 센터
- `/parent/export` — 데이터 내보내기 4종

### 활동지원사 U3 (7)
- `/worker` — 대시보드 (오프라인 배너)
- `/worker/schedule` — 오늘 일정
- `/worker/journal/voice` — 음성 일지 작성
- `/worker/journal/photo` — 사진 일지 작성
- `/worker/handover/received` — 3분 마스터 인계서 수령
- `/worker/offline` — 오프라인 큐
- `/worker/contract` — 계약 정보

### 당사자 U1 (4, AAC + 쉬운말)
- `/self` — 대시보드 (큰 사진 카드)
- `/self/diary` — 오늘 일기 보기
- `/self/consent` — AAC 동의 카드
- `/self/activities` — 좋아하는 활동 픽토그램

### 사회복지사·교사 U4 (3)
- `/case` — 대시보드
- `/case/cases` — 케이스 리스트
- `/case/meeting` — 회의 자료 자동 생성

### 시설장 U5 (4)
- `/facility` — 3-KPI 대시보드
- `/facility/permissions/bulk` — 활동지원사 권한 일괄 갱신
- `/facility/handover/quarterly` — 분기 인계서 일괄 승인
- `/facility/billing/b2g` — B2G 사회서비스 바우처 청구

## 디자인 시스템

- **컬러**: Primary `#2D6A4F` · Accent `#E07A5F` · Alert `#F2A93B` · 생애주기 5색
- **폰트**: Pretendard / Malgun Gothic · 글자 4단계 (14/16/20/24px)
- **모드 토글**: 일반 · 쉬운말 · 당사자 (헤더 우상단)
- **인지 접근성**: 1화면 1결정 · 2단계 확인 · [되돌리기] 항상 노출

## 주의

- 본 프로토타입은 **화면 전환 검증용**입니다. 백엔드 API 호출 없음, 모든 데이터는 mock.
- Plan 단계 (`docs/01-plan/features/recordare.plan.md`)의 21개 MVP FR 중 화면 영역을 시각화.
- Design 단계 진입 시 본 프로토타입을 베이스로 API 연결 및 권한 매트릭스 통합.
