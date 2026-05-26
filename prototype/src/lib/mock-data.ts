// Recordare Prototype — Mock Data
// 실제 API 호출 없이 화면 전환만으로 워크플로우를 검증하기 위한 데이터.

export type Role = "parent" | "worker" | "self" | "case" | "facility" | "general-teacher";
export type Category = "meal" | "med" | "behavior" | "emotion" | "study";
export type LifeStage = "infant" | "school" | "transition" | "adult" | "senior";
export type RecordCategory =
  | "profile"
  | "health_medical"
  | "development_screening"
  | "education_learning"
  | "daily_care"
  | "behavior_emotion"
  | "independence_work"
  | "permission_consent"
  | "handover_case"
  | "audit_security";

export const ROLES: Record<Role, { label: string; path: string; lifeColor: LifeStage }> = {
  parent: { label: "보호자", path: "/parent", lifeColor: "infant" },
  worker: { label: "활동지원사", path: "/worker", lifeColor: "school" },
  self: { label: "당사자 (AAC)", path: "/self", lifeColor: "adult" },
  case: { label: "사회복지사 · 교사", path: "/case", lifeColor: "transition" },
  facility: { label: "시설장", path: "/facility", lifeColor: "senior" },
  "general-teacher": { label: "일반교사 (통합학급)", path: "/general-teacher", lifeColor: "school" },
};

// ─────────── v2.4 신규: 빠른 선택 옵션 (FR-69a) ───────────
export const QUICK_OPTIONS: Record<Category, string[]> = {
  meal: ["잘 드심", "다 드심", "일부만 드심", "거부함", "사레 들림"],
  med: ["복용 완료", "거부", "토함", "다음 시간"],
  behavior: ["차분함", "활동적", "위축", "공격적", "도전 행동"],
  emotion: ["기쁨", "차분", "불안", "분노", "슬픔"],
  study: ["집중", "참여", "산만", "거부", "탁월"],
};

// ─────────── v2.4 신규: 일과 슬롯 (FR-69b 체크리스트) ───────────
export const DAILY_SLOTS = [
  { time: "09:00-12:00", title: "오전 활동", items: ["아침 인사", "화장실 자립", "옷 갈아입기", "머리 빗기", "양치질", "자유 활동"] },
  { time: "12:00-13:00", title: "점심", items: ["식사", "양치질"] },
  { time: "13:00-16:00", title: "오후 활동", items: ["산책", "학습", "휴식", "프로그램 참여"] },
  { time: "16:00-18:00", title: "저녁 준비", items: ["손 씻기", "저녁 식사", "여가 활동"] },
];

// ─────────── v2.4 신규: U6 일반교사 + 통합 학생 + 짧은 메모 ───────────
export const U6_TEACHER = {
  id: "u-teacher-006",
  name: "윤교사",
  role: "general-teacher" as Role,
  school: "한빛초등학교 4학년 3반",
  email: "yun@hanbit.example.com",
};

export const INTEGRATED_STUDENTS = [
  { id: "ig-001", name: "김민호", age: 10, disability: "발달장애 3급", aac: true, aacUsage: "부분 사용" },
];

export const TEACHER_MEMOS = [
  { id: "tm-001", studentId: "ig-001", category: "behavior" as Category, context: ["또래 영향 긍정", "수업 참여 적극"], text: "오늘 친구와 점심 함께 함", createdAt: "2026-05-25", sharedWith: ["특수교사 한교사", "보호자"] },
  { id: "tm-002", studentId: "ig-001", category: "behavior" as Category, context: ["자리 이탈"], text: "수업 중 자리 옮김 5회", createdAt: "2026-05-22", sharedWith: ["특수교사 한교사"] },
  { id: "tm-003", studentId: "ig-001", category: "behavior" as Category, context: ["수업 참여 적극"], text: "체육 시간 적극 참여", createdAt: "2026-05-20", sharedWith: ["특수교사 한교사", "보호자"] },
];

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  meal: { label: "식사", emoji: "🍚", color: "#E96B4A" },
  med: { label: "투약", emoji: "💊", color: "#D9534F" },
  behavior: { label: "행동", emoji: "🏃", color: "#3B82F6" },
  emotion: { label: "정서", emoji: "💭", color: "#7C3AED" },
  study: { label: "학습", emoji: "📘", color: "#5CB85C" },
};

// PRD §0.1 / Plan §2.0 — 공통 기록 카테고리 taxonomy.
// 화면 필터, 인계서 섹션, 권한 범위, 자가진단 안전 정책의 기준으로 사용한다.
export const RECORD_CATEGORIES: Record<RecordCategory, { label: string; sensitive: boolean; examples: string[] }> = {
  profile: { label: "기본정보", sensitive: true, examples: ["인적사항", "장애등록", "가족관계", "소속기관"] },
  health_medical: { label: "건강/의료", sensitive: true, examples: ["검진", "진료", "투약", "알레르기", "응급"] },
  development_screening: { label: "발달 체크", sensitive: true, examples: ["K-DST", "M-CHAT-R", "AIR-SDS", "적응행동"] },
  education_learning: { label: "교육/학습", sensitive: false, examples: ["IEP", "학습목표", "수업참여", "일반교사 메모"] },
  daily_care: { label: "일상돌봄", sensitive: false, examples: ["식사", "수면", "위생", "이동", "활동"] },
  behavior_emotion: { label: "행동/정서", sensitive: true, examples: ["트리거", "안정방법", "감정 변화"] },
  independence_work: { label: "자립/직업", sensitive: false, examples: ["직업훈련", "주거", "금전관리", "이동훈련"] },
  permission_consent: { label: "권한/동의", sensitive: true, examples: ["접근권한", "동의", "회수", "후견"] },
  handover_case: { label: "인계/회의", sensitive: false, examples: ["3분 인계서", "케이스 회의", "PDF 공유"] },
  audit_security: { label: "보안기록", sensitive: true, examples: ["접근로그", "이상접근", "다운로드"] },
};

export const LIFE_STAGES: Record<LifeStage, { label: string; color: string; age: string }> = {
  infant: { label: "영유아", color: "#FFC857", age: "0~6세" },
  school: { label: "학령기", color: "#5CB85C", age: "7~14세" },
  transition: { label: "전환기", color: "#3B82F6", age: "15~24세" },
  adult: { label: "성인기", color: "#7C3AED", age: "25~64세" },
  senior: { label: "고령기", color: "#6B7280", age: "65세+" },
};

// Mock persona — 박순영(보호자)이 사용
export const CURRENT_USER = {
  id: "u-parent-001",
  name: "박순영",
  role: "parent" as Role,
  email: "boheni07@example.com",
  multiRole: false,
};

// ─────────── Person (당사자) 데이터 모델 ───────────
// PRD §5 FR-02 권한 매트릭스 + §18 후견 모드 + §15 18세 이양 + 인계서 4섹션 통합
export type GuardianshipType = "none" | "limited" | "specific" | "plenary"; // 후견 유형 (한국 민법 §938~§959)
export type PermissionModel = "guardian" | "co" | "self" | "ward"; // 권한 모델 ENUM (FR-02)
export type TransitionPhase = "not_started" | "d-180" | "d-150" | "d-120" | "d-90" | "d-60" | "d-30" | "d-0" | "d+30" | "completed";

export interface Person {
  id: string;
  name: string;
  birth: string;          // YYYY-MM-DD
  age: number;
  stage: LifeStage;
  // 장애 정보
  disability: string;     // 예: "발달장애 2급"
  disabilityCategory?: string; // 자폐성 / 지적 / 경계성
  // 접근성
  aac: boolean;
  aacPictograms?: number; // 사용 픽토그램 개수
  preferredVoice?: "female-slow" | "female-normal" | "male-slow" | "male-normal";
  responsePattern?: "photo-first" | "text-first" | "voice-first";
  // 소속
  facility?: string;
  schoolOrCenter?: string;
  // 권한 / 후견
  permissionModel: PermissionModel;
  guardianshipType: GuardianshipType;
  guardianshipDocId?: string; // 후견 결정문 등기 ID (검증 시)
  transitionPhase: TransitionPhase; // 18세 이양 단계 (FR-48~52)
  // 의료 (인계서 §의료)
  medical?: {
    medications: string[];      // 복용약
    allergies: string[];        // 알레르기
    pastEmergencies: string[];  // 응급 이력
    emergencyContacts: string[];// 응급 연락처
  };
  // 식사 (인계서 §식사)
  meal?: {
    preferred: string[];
    avoid: string[];
    pattern: string;
    caution?: string;
  };
  // 위험행동 (인계서 §위험행동)
  risk?: {
    triggers: string[];
    earlySigns: string[];
    calming: string[];
    hospitalThreshold?: string;
  };
  // 컴플라이언스
  consentSensitive: boolean;  // 민감정보 분리 동의 (FR-15)
  deletionStatus?: "active" | "deletion_requested" | "deleted"; // NFR-07
}

export const CHILDREN: Person[] = [
  // ① 영유아 (0~6세) — 신규 진단 보호자, 어린이집 다님
  {
    id: "c-005", name: "박서연", birth: "2022-08-20", age: 3,
    stage: "infant",
    disability: "발달지연 정밀검사 중", disabilityCategory: "정밀검사",
    aac: false, aacPictograms: 0,
    schoolOrCenter: "햇살어린이집",
    permissionModel: "guardian", guardianshipType: "none",
    transitionPhase: "not_started",
    medical: {
      medications: [],
      allergies: ["계란 흰자"],
      pastEmergencies: [],
      emergencyContacts: ["어머니 010-XXXX-3001"],
    },
    consentSensitive: true,
  },

  // ⓞ 소속 없음 (가정 거주) — 신규 진단 직후, 어린이집 미입소
  {
    id: "c-006", name: "김하준", birth: "2023-04-10", age: 2,
    stage: "infant",
    disability: "발달지연 의심 (자가진단 단계)", disabilityCategory: "의심",
    aac: false, aacPictograms: 0,
    // facility, schoolOrCenter 모두 비워둠 — 소속 없는 상태
    permissionModel: "guardian", guardianshipType: "none",
    transitionPhase: "not_started",
    medical: {
      medications: [],
      allergies: [],
      pastEmergencies: [],
      emergencyContacts: ["어머니 010-XXXX-6001", "아버지 010-XXXX-6002"],
    },
    consentSensitive: true,
  },

  // ② 학령기 (7~17세) — 특수학교 자녀
  {
    id: "c-002", name: "이채린", birth: "2014-02-10", age: 12,
    stage: "school",
    disability: "지적장애 3급", disabilityCategory: "지적",
    aac: true, aacPictograms: 18,
    preferredVoice: "female-normal", responsePattern: "photo-first",
    schoolOrCenter: "○○특수학교 4학년",
    permissionModel: "guardian", guardianshipType: "none",
    transitionPhase: "not_started",
    medical: {
      medications: [],
      allergies: [],
      pastEmergencies: [],
      emergencyContacts: ["어머니 010-XXXX-2002", "○○특수학교 02-XXX-XXXX"],
    },
    consentSensitive: true,
  },

  // ③ 전환기 (18~24세) — 박지훈 (메인 페르소나, 18세 이양 가이드 진행 중)
  {
    id: "c-001", name: "박지훈", birth: "2006-03-12", age: 20,
    stage: "transition",
    disability: "발달장애 2급", disabilityCategory: "자폐성",
    aac: true, aacPictograms: 30,
    preferredVoice: "female-slow", responsePattern: "photo-first",
    facility: "푸른그룹홈",
    permissionModel: "co", guardianshipType: "none",
    transitionPhase: "d-180",
    medical: {
      medications: ["항경련제 1정/일 (점심)"],
      allergies: ["견과류 (땅콩 포함, 흡입도 위험)"],
      pastEmergencies: ["2024-08-15 발작 1회 (병원 후송 안 함)"],
      emergencyContacts: ["어머니 010-XXXX-1234", "푸른그룹홈 02-XXX-XXXX"],
    },
    meal: {
      preferred: ["김치찌개", "떡볶이", "비빔밥"],
      avoid: ["견과류", "향신료 강한 음식", "너무 차가운 음료"],
      pattern: "1일 4식 (간식 포함) · 천천히 식사",
      caution: "혼자 식사 시 사레 들 수 있음",
    },
    risk: {
      triggers: ["큰 소리", "군중", "갑작스러운 환경 변화"],
      earlySigns: ["양손 흔들기", "반복 발화"],
      calming: ["좋아하는 강아지 사진 보여주기", "조용한 공간으로 이동"],
      hospitalThreshold: "30분 이상 진정 불가 시",
    },
    consentSensitive: true,
  },

  // ④ 성인기 (25~64세) — 후견 모드 (한정후견) 사례
  {
    id: "c-003", name: "최영재", birth: "1998-06-25", age: 27,
    stage: "adult",
    disability: "지적장애 1급", disabilityCategory: "지적",
    aac: true, aacPictograms: 40,
    preferredVoice: "male-slow", responsePattern: "voice-first",
    facility: "△△복지원",
    permissionModel: "ward", guardianshipType: "limited",
    guardianshipDocId: "서울가정법원 2024가단12345",
    transitionPhase: "completed",
    medical: {
      medications: ["혈압약 1정/일", "당뇨약 2정/일"],
      allergies: ["페니실린"],
      pastEmergencies: ["2023-11 저혈당 응급실 1회"],
      emergencyContacts: ["후견인 박변호사 010-XXXX-3001", "△△복지원 031-XXX-XXXX"],
    },
    meal: {
      preferred: ["곰탕", "잡곡밥"],
      avoid: ["당분 과다 음식 (당뇨)", "페니실린 함유 음식"],
      pattern: "1일 3식 · 저염식",
    },
    risk: {
      triggers: ["일정 변경", "낯선 의료진"],
      earlySigns: ["거부 표현"],
      calming: ["익숙한 활동지원사 동행"],
    },
    consentSensitive: true,
  },

  // ⑤ 고령기 (65세+) — 노령 발달장애인 (장기요양 연계)
  {
    id: "c-004", name: "윤정애", birth: "1958-04-15", age: 68,
    stage: "senior",
    disability: "지적장애 2급 + 노인성 인지저하", disabilityCategory: "지적+노화",
    aac: false, aacPictograms: 0,
    preferredVoice: "female-slow", responsePattern: "voice-first",
    facility: "□□요양원",
    permissionModel: "ward", guardianshipType: "plenary",
    guardianshipDocId: "수원가정법원 2023가단98765",
    transitionPhase: "completed",
    medical: {
      medications: ["치매약 1정/일", "관절염약 2정/일", "혈압약 1정/일"],
      allergies: ["조개류"],
      pastEmergencies: ["2025-02 낙상 골절", "2024-12 폐렴 입원"],
      emergencyContacts: ["후견인 조카 010-XXXX-4001", "□□요양원 032-XXX-XXXX", "주치의 김원장 010-XXXX-5001"],
    },
    meal: {
      preferred: ["죽", "삶은 채소"],
      avoid: ["조개류", "딱딱한 음식 (틀니)"],
      pattern: "1일 3식 + 간식 2회 · 부드러운 음식",
      caution: "삼킴 장애 주의 · 작게 잘라 제공",
    },
    risk: {
      triggers: ["야간", "낯선 사람"],
      earlySigns: ["주위를 두리번거림", "반복 질문"],
      calming: ["조명 켜기", "익숙한 음악 틀기"],
      hospitalThreshold: "낙상 또는 체온 38°C 이상",
    },
    consentSensitive: true,
  },
];

// 기본 노출용 — 박지훈 (현재 보호자 박순영의 자녀, MVP 메인 페르소나)
export const PRIMARY_CHILD = CHILDREN.find((c) => c.id === "c-001")!;

export const JOURNAL_ENTRIES = [
  {
    id: "j-001", childId: "c-001", category: "meal" as Category,
    author: "이수진 (활동지원사)", stage: "transition" as LifeStage,
    text: "오늘 점심으로 김치찌개 한 그릇 깨끗하게 비웠어요. 매운맛 잘 드시네요.",
    createdAt: "2026-05-25 12:30", offline: false, photos: 2,
  },
  {
    id: "j-002", childId: "c-001", category: "behavior" as Category,
    author: "이수진 (활동지원사)", stage: "transition" as LifeStage,
    text: "산책 중 강아지를 보고 기뻐하셨어요. 손뼉을 치며 5분간 따라가셨습니다.",
    createdAt: "2026-05-25 14:15", offline: false, photos: 1,
  },
  {
    id: "j-003", childId: "c-001", category: "emotion" as Category,
    author: "한선생 (특수교사)", stage: "school" as LifeStage,
    text: "친구와 갈등 후 잠시 위축됐지만 30분 만에 회복하셨어요.",
    createdAt: "2026-05-24 16:00", offline: false, photos: 0,
  },
  {
    id: "j-004", childId: "c-001", category: "study" as Category,
    author: "박순영 (보호자)", stage: "school" as LifeStage,
    text: "자립생활 수업에서 빨래 개기를 처음 혼자 해냈어요!",
    createdAt: "2026-05-23 19:00", offline: false, photos: 3,
  },
  {
    id: "j-005", childId: "c-001", category: "med" as Category,
    author: "이수진 (활동지원사)", stage: "transition" as LifeStage,
    text: "감기약 오전 10시 복용 완료. 부작용 없음.",
    createdAt: "2026-05-22 10:00", offline: true, photos: 0,
  },
];

export const PERMISSIONS = [
  {
    id: "p-001", grantee: "이수진", role: "활동지원사",
    scopes: ["meal", "behavior", "emotion", "study"], scopesLabel: "식사·행동·정서·학습",
    startsAt: "2026-03-01", endsAt: "2026-06-30",
    status: "active", daysLeft: 36,
  },
  {
    id: "p-002", grantee: "한선생", role: "특수교사",
    scopes: ["study", "behavior"], scopesLabel: "학습·행동",
    startsAt: "2026-03-01", endsAt: "2027-02-28",
    status: "active", daysLeft: 280,
  },
  {
    id: "p-003", grantee: "최주임", role: "사회복지사",
    scopes: ["meal", "med", "behavior", "emotion", "study"], scopesLabel: "전 영역",
    startsAt: "2025-09-01", endsAt: "2026-06-01",
    status: "expiring", daysLeft: 7,
  },
];

export const HANDOVERS = [
  {
    id: "h-001", child: "박지훈", to: "○○복지관",
    type: "기관 이동", status: "발행 완료",
    createdAt: "2026-04-12", sections: ["의료", "식사", "AAC 사용", "위험행동"],
  },
  {
    id: "h-002", child: "박지훈", to: "△△방학캠프",
    type: "단기 인계", status: "초안",
    createdAt: "2026-05-20", sections: ["의료", "식사", "AAC 사용", "위험행동"],
  },
];

export const NOTIFICATIONS = [
  { id: "n-001", level: "긴급", title: "권한 만료 D-7", body: "최주임(사회복지사) 권한이 7일 후 종료됩니다.", time: "10분 전", read: false, type: "permission" },
  { id: "n-002", level: "높음", title: "마이그레이션 완료", body: "카톡 사진 8,432장이 분류 완료되었습니다. 검수 요청.", time: "2시간 전", read: false, type: "migration" },
  { id: "n-003", level: "중간", title: "당사자 동의 행사", body: "박지훈님이 이수진 활동지원사 권한에 동의했어요.", time: "어제", read: true, type: "consent" },
  { id: "n-004", level: "중간", title: "오늘의 일지 요약 (5건)", body: "이수진·한선생이 작성한 5건의 일지가 있습니다.", time: "어제", read: true, type: "digest" },
];

export const SCHEDULE_TODAY = [
  { time: "09:00 - 12:00", user: "박지훈 (20)", place: "푸른그룹홈", task: "오전 활동 + 점심" },
  { time: "14:00 - 17:00", user: "이민호 (15)", place: "○○복지관", task: "방과 후 활동" },
  { time: "19:00 - 21:00", user: "김다은 (17)", place: "가정 방문", task: "저녁 식사 + 학습" },
];

export const CASES_LIST = [
  { id: "case-001", name: "박지훈", stage: "transition" as LifeStage, lastUpdate: "2일 전", status: "active", priority: "normal", scope: "교육·돌봄" },
  { id: "case-002", name: "이민호", stage: "school" as LifeStage, lastUpdate: "5일 전", status: "active", priority: "high", scope: "전 영역" },
  { id: "case-003", name: "김다은", stage: "school" as LifeStage, lastUpdate: "1일 전", status: "review", priority: "normal", scope: "교육·자립" },
];

export const FACILITY_RESIDENTS = [
  { name: "박지훈", room: "201호", entered: "2024-03-01", primary: "이수진" },
  { name: "최영진", room: "202호", entered: "2024-06-15", primary: "이수진" },
  { name: "윤서연", room: "203호", entered: "2025-01-10", primary: "정민지" },
];

export const BULK_PERMISSIONS_EXPIRING = [
  { worker: "이수진", residents: 3, currentEnd: "2026-06-30", daysLeft: 36 },
  { worker: "정민지", residents: 4, currentEnd: "2026-06-15", daysLeft: 21 },
  { worker: "한도윤", residents: 5, currentEnd: "2026-06-01", daysLeft: 7 },
];

// ─────────── Screening (자가진단 도구 — 의료 진단 아님, 이력 추이용) ───────────
// FR-62~68 (PRD v2.2 §20) — 한국 표준 발달 자가진단 도구 통합
// ⚠ 의료법 안전: 결과는 "보호자 관찰 의견" / "정식 진단은 전문의 상담"
export type ScreeningToolKey = "k-dst" | "k-asq" | "m-chat-r" | "self-determination" | "k-sib-r" | "vabs";
export type ScreeningStatus = "scheduled" | "in_progress" | "completed" | "review_needed";

export interface ScreeningTool {
  key: ScreeningToolKey;
  fullName: string;
  shortName: string;
  ageRange: string;
  frequency: string;
  domain: "발달 선별" | "자폐 선별" | "자기결정" | "자립생활" | "적응행동";
  officialSource: string;
  itemCount: number;
  estimatedMinutes: number;
}

export const SCREENING_TOOLS: ScreeningTool[] = [
  {
    key: "k-dst",
    fullName: "한국 영유아 발달선별검사",
    shortName: "K-DST",
    ageRange: "4~71개월",
    frequency: "8단계 (4·9·18·24·30·36·48·60개월)",
    domain: "발달 선별",
    officialSource: "보건복지부 · 질병관리청",
    itemCount: 48,
    estimatedMinutes: 15,
  },
  {
    key: "k-asq",
    fullName: "Korean Ages and Stages Questionnaire",
    shortName: "K-ASQ",
    ageRange: "1~60개월",
    frequency: "월령별 21회",
    domain: "발달 선별",
    officialSource: "한국형 공식 번역 (서울대 의대)",
    itemCount: 30,
    estimatedMinutes: 10,
  },
  {
    key: "m-chat-r",
    fullName: "Modified Checklist for Autism in Toddlers - Revised",
    shortName: "M-CHAT-R",
    ageRange: "16~30개월",
    frequency: "1회 (필요 시 6개월 후 재검사)",
    domain: "자폐 선별",
    officialSource: "Robins et al. (2014), 국내 번역 검증",
    itemCount: 20,
    estimatedMinutes: 5,
  },
  {
    key: "self-determination",
    fullName: "자기결정능력 자가체크",
    shortName: "AIR-SDS (한국형)",
    ageRange: "14세 이상",
    frequency: "학기별 (반기 1회)",
    domain: "자기결정",
    officialSource: "AIR Self-Determination Scale (한국형 번역)",
    itemCount: 30,
    estimatedMinutes: 20,
  },
  {
    key: "k-sib-r",
    fullName: "한국형 독립행동척도",
    shortName: "K-SIB-R",
    ageRange: "학령기 이상",
    frequency: "분기 · 반기",
    domain: "자립생활",
    officialSource: "Korean version of Scales of Independent Behavior - Revised",
    itemCount: 50,
    estimatedMinutes: 30,
  },
  {
    key: "vabs",
    fullName: "Vineland 적응행동척도",
    shortName: "VABS-3",
    ageRange: "전 연령",
    frequency: "연 1~2회",
    domain: "적응행동",
    officialSource: "Sparrow et al., 한국 공식 번역",
    itemCount: 40,
    estimatedMinutes: 25,
  },
];

// 박지훈 (c-001, 20세 전환기) 자가진단 이력
// AIR 자기결정능력 자가체크 — 학기별로 진행, 이양 가이드 §15와 연계
export interface ScreeningRecord {
  id: string;
  personId: string;
  toolKey: ScreeningToolKey;
  takenAt: string;       // YYYY-MM-DD
  takenBy: "보호자" | "당사자" | "전문가" | "보호자+당사자 공동";
  status: ScreeningStatus;
  totalScore: number;     // 도구별 기준
  maxScore: number;
  // 5개 하위 영역 점수 (도구별)
  domains: { name: string; score: number; max: number; trend: "up" | "flat" | "down" }[];
  notes?: string;
  // AI 분석 결과
  aiInsight?: string;
}

export const SCREENING_RECORDS: ScreeningRecord[] = [
  // 박지훈 — 자기결정능력 자가체크 3회 (학기별)
  {
    id: "scr-001", personId: "c-001", toolKey: "self-determination",
    takenAt: "2024-12-15", takenBy: "보호자+당사자 공동",
    status: "completed", totalScore: 58, maxScore: 100,
    domains: [
      { name: "자율성", score: 12, max: 25, trend: "flat" },
      { name: "자기조절", score: 14, max: 25, trend: "flat" },
      { name: "심리적 권한", score: 15, max: 25, trend: "flat" },
      { name: "자기인식", score: 17, max: 25, trend: "flat" },
    ],
    notes: "첫 자가체크 · 18세 이양 가이드 시작 전 기준선 측정",
    aiInsight: "자율성 영역이 상대적으로 낮음. 일상 결정(식사·옷차림)부터 본인 선택을 늘려갈 것을 권장.",
  },
  {
    id: "scr-002", personId: "c-001", toolKey: "self-determination",
    takenAt: "2025-06-15", takenBy: "보호자+당사자 공동",
    status: "completed", totalScore: 68, maxScore: 100,
    domains: [
      { name: "자율성", score: 15, max: 25, trend: "up" },
      { name: "자기조절", score: 16, max: 25, trend: "up" },
      { name: "심리적 권한", score: 18, max: 25, trend: "up" },
      { name: "자기인식", score: 19, max: 25, trend: "up" },
    ],
    notes: "AAC 동의 5회 행사 후 측정 — 본인 결정 빈도 증가",
    aiInsight: "전 영역 +2~3점 상승. AAC 동의 활동이 자기결정 능력 향상에 긍정적 영향. 의료 결정 시뮬레이션 도입 추천.",
  },
  {
    id: "scr-003", personId: "c-001", toolKey: "self-determination",
    takenAt: "2025-12-15", takenBy: "보호자+당사자 공동",
    status: "completed", totalScore: 76, maxScore: 100,
    domains: [
      { name: "자율성", score: 18, max: 25, trend: "up" },
      { name: "자기조절", score: 19, max: 25, trend: "up" },
      { name: "심리적 권한", score: 19, max: 25, trend: "flat" },
      { name: "자기인식", score: 20, max: 25, trend: "up" },
    ],
    notes: "D-90 단계적 권한 이양 진행 중 측정",
    aiInsight: "자율성 +3점 추가 상승. 18세 이양 D-90 단계에서 의료 항목 부분 이양 진행에 적합한 수준.",
  },
  // 박서연 (영유아 3세) — K-DST 30개월령 검사
  {
    id: "scr-004", personId: "c-005", toolKey: "k-dst",
    takenAt: "2025-02-20", takenBy: "보호자",
    status: "review_needed", totalScore: 32, maxScore: 48,
    domains: [
      { name: "대근육운동", score: 7, max: 8, trend: "flat" },
      { name: "소근육운동", score: 8, max: 8, trend: "flat" },
      { name: "인지", score: 4, max: 8, trend: "down" },
      { name: "언어", score: 3, max: 8, trend: "down" },
      { name: "사회성", score: 5, max: 8, trend: "down" },
      { name: "자조", score: 5, max: 8, trend: "flat" },
    ],
    notes: "30개월령 검사 — 인지·언어·사회성 영역 추적 관찰 권장",
    aiInsight: "운동발달은 정상 범위, 언어·인지·사회성 영역 3개가 기준 미달. 소아청소년과 정밀평가 안내 권장 (정식 진단은 전문의).",
  },
];
