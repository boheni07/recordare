"""
Remaining builders for Recordare Comprehensive Deck.
Imported by build_recordare_comprehensive_deck.py.

Each builder takes (prs, ctx) where ctx is a dict with:
  - 'page_next': callable
  - 'total': int
  - 'slogan': str
"""
from __future__ import annotations

from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Cm, Pt

from recordare_pptx_lib import (
    ACCENT, ALERT, BORDER, LIFE_ADULT, LIFE_INFANT, LIFE_SCHOOL,
    LIFE_SENIOR, LIFE_TRANSITION, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT,
    SECONDARY, SLIDE_H, SLIDE_W, SOFT_BG, TEXT_DARK, TEXT_MID, WHITE,
    blank_slide, card, content_slide, divider_slide, footer, header_bar,
    life_wave, metric, multi, no_line, rect, rounded, set_fill, set_line,
    step_chain, table_block, text, title_block,
)


# ───── Generic templates ─────

def _slide(prs, ctx, section, title, subtitle):
    return content_slide(prs, section, ctx['page_next'](), ctx['total'],
                         title, subtitle, slogan=ctx['slogan'])


def table_slide(prs, ctx, section, title, subtitle, col_widths, rows,
                row_h_cm=0.78, font_size=10, y=Cm(4.7)):
    s = _slide(prs, ctx, section, title, subtitle)
    table_block(s, Cm(1.0), y, col_widths_cm=col_widths, rows=rows,
                row_h_cm=row_h_cm, font_size=font_size, first_col_align="center")
    return s


def cards_slide(prs, ctx, section, title, subtitle, cards, *,
                cols=3, w_cm=10.0, h_cm=5.5, y_cm=4.7, gap_cm=10.5,
                v_gap_cm=6.0):
    s = _slide(prs, ctx, section, title, subtitle)
    for i, (head, body, color) in enumerate(cards):
        col = i % cols
        row = i // cols
        x = Cm(1.0 + col * gap_cm)
        y = Cm(y_cm + row * v_gap_cm)
        rounded(s, x, y, Cm(w_cm), Cm(h_cm), fill=SOFT_BG, line=color, lw=1.2)
        rect(s, x, y, Cm(w_cm), Cm(1.0), fill=color)
        text(s, x + Cm(0.3), y + Cm(0.2), Cm(w_cm - 0.6), Cm(0.6), head,
             size=12, bold=True, color=WHITE)
        text(s, x + Cm(0.4), y + Cm(1.4), Cm(w_cm - 0.8), Cm(h_cm - 1.6),
             body, size=10, color=TEXT_DARK, line_spacing=1.5)
    return s


def metric_slide(prs, ctx, section, title, subtitle, metrics, y_cm=4.7):
    s = _slide(prs, ctx, section, title, subtitle)
    n = len(metrics)
    total_w = 31.5
    w = total_w / n
    for i, (val, label, color) in enumerate(metrics):
        x = Cm(1.0 + i * w)
        metric(s, x + Cm(0.2), Cm(y_cm), Cm(w - 0.4), Cm(5.0),
               val, label, color=color)
    return s


# ───── PART 3: Product / PRD ─────

def build_part3_divider(prs, ctx):
    divider_slide(prs, 3, "Product / PRD",
                  "85개 FR · 다중 입력 4종 · 자가진단 6종 · 18세 이양 · 후견 모드 · 오프라인",
                  accent=ACCENT, slogan=ctx['slogan'])
    ctx['page_next']()


def build_value_prop(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · Value Prop",
               "Value Proposition — 4관점 가치표",
               "v1.0 핵심 가치 + v2.0~v2.5 누적 추가 — PRD Executive Summary 종합")
    rows = [
        ["관점", "v1.0", "v2.0~v2.3 누적", "v2.4~v2.5 추가"],
        ["Problem", "기록 단절·행정 부담·자기결정권 배제",
         "+ 진입 장벽·오프라인 누락·18세 이양·B2G·자가진단 부재",
         "+ STT 시설 부적합·통합학급 사각·후견 위조·보호자 고립"],
        ["Solution", "통합 타임라인 + STT 일지 + 권한 이행 + 3분 인계서",
         "+ 7단계 마법사·오프라인·6개월 이양·6종 자가진단·B2G",
         "+ 다중 입력 4종(STT 폐기)·U6·FR-71 얼굴인증·자조모임"],
        ["Function/UX", "일지 70%↓·인계 2주→3분",
         "+ First Value 1h·자가진단 70%·이양 정착 90%",
         "+ 일지 15초(-99%)·환경무관 100%·통합학급 <30초"],
        ["Core Value", "기록은 끊기지 않고, 권한은 당사자에게 자란다",
         "+ 전 생애·전 사용자·전 채널 누락 없이 운영",
         "+ 환경 무관·부담 없이·15초 — 모든 상황에서 작동"],
    ]
    table_block(s, Cm(1.0), Cm(4.5),
                col_widths_cm=[3.5, 7, 11, 10], rows=rows,
                row_h_cm=2.5, font_size=9, first_col_align="center")


def build_personas_summary(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 페르소나 요약",
               "9대 페르소나 매트릭스",
               "U1~U6 + 후견인 + 신규 보호자 + 자문 변호사")
    rows = [
        ["코드", "유형", "대표 인물", "핵심 동기", "주요 FR"],
        ["U1", "당사자", "김민지 (17세)", "내가 직접 결정하고 싶다", "FR-11, FR-17~19"],
        ["U2", "보호자", "박순영 (54세)", "평생 끊김 없이 기록·인계", "FR-08, FR-09, FR-25"],
        ["U3", "활동지원사", "이수진 (35세)", "환경 무관 15초 입력", "FR-05, FR-69, FR-30"],
        ["U4", "사회복지사·특수교사", "최주임·한교사", "회의자료 60분→3분", "FR-53, FR-08"],
        ["U5", "시설장", "정원장 (52세)", "12~80명 다중 관리·B2B", "FR-21~24, FR-54~58"],
        ["U6 ⭐", "일반교사 (통합학급)", "윤교사 (35세)", "통합 학생 메모 <30초", "FR-72, FR-73"],
        ["—", "후견인", "성년·한정·특정", "본인 의견 청취 (민법 §947)", "FR-59~61, FR-71"],
        ["—", "신규 진단 보호자", "김하준 모 (2세)", "자가진단 객관 도구", "FR-62~63, FR-67"],
        ["—", "박변호사 (자문)", "리빙랩 PB1", "후견 위조 방어선", "FR-71 얼굴 인증"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[2.5, 6.5, 6.5, 9, 7], rows=rows,
                row_h_cm=0.9, font_size=10, first_col_align="center")


def build_lifecycle_matrix(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 생애주기 기록",
               "5단계 생애주기별 기록 매트릭스",
               "기준 문서: recordare-lifecycle-recording-and-legal-screening.md")
    rows = [
        ["생애주기", "기록 종류", "핵심 카테고리", "주요 기록", "주 작성자", "연결 FR"],
        ["영유아 0~6세", "발달·건강", "건강검진·발달선별·재활",
         "K-DST·M-CHAT-R·발달재활·식사·감각반응", "보호자·의료진",
         "FR-08, 25, 62, 63, 67, 68"],
        ["학령기 7~14세", "교육·생활", "교육·IEP·행동·또래·돌봄",
         "IEP·학교생활·문제행동 트리거·일반교사 메모", "보호자·특수·일반교사·U3",
         "FR-06, 08, 69, 72, 73"],
        ["전환기 15~24세", "자립 준비·권한 이행", "자기결정·진로·동의·자립",
         "AIR-SDS·직업·진로희망·18세 이양·AAC", "당사자·보호자·교사·U4",
         "FR-11, 17~19, 48~52, 64"],
        ["성인기 25~64세", "생활·고용·서비스", "주거·고용·건강·권한·인계",
         "취업·주거·활동지원·투약·권한·후견", "당사자·보호자/후견·U3·U4·U5",
         "FR-02, 09, 35, 43, 59~61, 71"],
        ["고령기 65세+", "건강·돌봄 연속성", "의료·장기돌봄·후견·가족",
         "만성질환·낙상·인지·복약·장기돌봄", "당사자·보호자·돌봄기관",
         "FR-08, 09, 13~15, 59~61"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[4.5, 4.5, 5.5, 8.5, 4.5, 4.0], rows=rows,
                row_h_cm=1.8, font_size=9, first_col_align="center")


def build_record_categories(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 기록 카테고리",
               "공통 기록 카테고리 10종",
               "RecordCategory enum — 모든 JournalEntry·TimelineCard·Handover의 분류 기준")
    rows = [
        ["코드", "대분류", "세부 카테고리", "사용 위치", "민감정보"],
        ["PROFILE", "기본 프로필", "인적사항·장애등록·가족관계·소속기관", "온보딩·자녀 등록·권한", "높음"],
        ["HEALTH_MEDICAL", "건강·의료", "검진·진료·투약·알레르기·응급", "타임라인·인계서·회의", "높음"],
        ["DEVELOPMENT_SCREENING", "발달·자가진단", "K-DST·M-CHAT-R·AIR-SDS·적응행동", "자가진단·AI 추이·PDF", "높음"],
        ["EDUCATION_LEARNING", "교육·학습", "IEP·학습목표·수업·U6 메모", "학령기·U4/U6 화면", "중간"],
        ["DAILY_CARE", "일상·돌봄", "식사·수면·위생·이동·활동", "FR-69 다중 입력 일지", "중간"],
        ["BEHAVIOR_EMOTION", "행동·정서", "트리거·안정방법·감정 변화", "일지·인계서·케이스 회의", "높음"],
        ["INDEPENDENCE_WORK", "자립·직업", "직업훈련·주거·금전·이동", "전환·성인기 타임라인", "중간"],
        ["PERMISSION_CONSENT", "권한·동의", "접근권한·동의·회수·후견", "권한 매트릭스·AAC 동의", "높음"],
        ["HANDOVER_CASE", "인계·회의", "3분 인계서·케이스 회의·PDF", "인계서·회의자료", "중간"],
        ["AUDIT_SECURITY", "감사·보안", "접근로그·이상접근·다운로드", "Audit Log·보호자 알림", "높음"],
    ]
    table_block(s, Cm(1.0), Cm(4.5),
                col_widths_cm=[7, 4.5, 11, 7, 2], rows=rows,
                row_h_cm=0.78, font_size=9, first_col_align="center")


def build_fr_v1(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · FR 카탈로그 v1.0",
               "Functional Requirements — v1.0 핵심 16건",
               "기록 코어·권한·인계·보안·접근성의 First Principles")
    rows = [
        ["FR#", "영역", "요구사항", "우선순위"],
        ["FR-01", "계정", "보호자/당사자/전문가 3종 가입 + PASS/카카오 인증", "P0"],
        ["FR-02", "권한", "생애주기별 권한 매트릭스 (RBAC + ABAC)", "P0"],
        ["FR-05", "기록", "STT 음성 일지 + AI 카테고리 자동 태깅 (→ v2.4 빠른 선택)", "P0"],
        ["FR-06", "기록", "사진/동영상 일괄 업로드 + EXIF 자동 시기 분류", "P0"],
        ["FR-08", "타임라인", "단일 통합 타임라인 (생애주기 5단계 색상)", "P0"],
        ["FR-09", "인계서", "3분 마스터 인계서 자동 생성 (PDF + 시스템 동시)", "P0"],
        ["FR-11", "당사자 UI", "AAC 픽토그램 Yes/No 동의 + 음성 안내", "P0"],
        ["FR-13", "보안", "민감정보 AES-256 + 접근 로그 5년 보존", "P0"],
        ["FR-14", "보안", "Audit Log + 보호자/당사자 접근 알림", "P0"],
        ["FR-15", "컴플라이언스", "개인정보보호법 §23 분리 동의 (민감정보)", "P0"],
        ["FR-16", "접근성", "WCAG 2.1 AA + 한국형 + AAC 가이드", "P0"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[3, 5, 21, 2.5], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")


def build_fr_v2(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · FR 카탈로그 v2.0",
               "v2.0 — 당사자·시설·온보딩·오프라인·알림·접근성·내보내기",
               "FR-17~47 (31건)")
    rows = [
        ["FR#", "영역", "요구사항"],
        ["FR-17~20", "당사자 모드", "픽토+음성+큰글씨 / 2단계 확인 / 5분 내 보호자 알림 / 되돌리기"],
        ["FR-21~24", "시설장 모드", "3-KPI 대시보드 / 권한 일괄 / B2G 청구서 / 그룹 공지"],
        ["FR-25~29", "온보딩", "7단계 마법사 / 카톡 zip / OCR / 검수 UI / First Value 1h"],
        ["FR-30~34", "오프라인", "로컬 큐 500MB / 자동 동기화 / 배너 / AES-256 / 7일 재시도"],
        ["FR-35~39", "알림", "권한 만료 D-30/7/1 / 다채널 + 중복 취소 / 다이제스트 / 카피 분기"],
        ["FR-40~42", "인지 접근성", "쉬운말 모드 / 2단계 확인 / 30일 휴지통 + 10개 되돌리기"],
        ["FR-43~47", "내보내기", "PDF / 엑셀 / ZIP / JSON 이동권 / 감사 로그 + 알림"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[4.5, 5.5, 21.5], rows=rows,
                row_h_cm=1.3, font_size=10, first_col_align="center")


def build_fr_v2_1(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · FR 카탈로그 v2.1",
               "v2.1 — 18세 이양·케이스 회의·B2B 결제·후견 모드",
               "FR-48~61 (14건) — workflows 정제 결과")
    rows = [
        ["FR#", "영역", "요구사항", "마일스톤"],
        ["FR-48", "18세 이양", "D-180 자동 트리거 + 보호자 가이드", "GA 1.0"],
        ["FR-49", "18세 이양", "모의 동의 시뮬레이션 (의료/식사/AAC 3종)", "GA 1.0"],
        ["FR-50", "18세 이양", "변호사 무료 상담 예약 (제휴)", "v1.1"],
        ["FR-51", "18세 이양", "단계적 권한 이양 (D-90→D-60→D-30)", "GA 1.0"],
        ["FR-52", "18세 이양", "D-0 자동 전환 + 응급 권한 잔존 + D+30 정착", "GA 1.0"],
        ["FR-53", "케이스 회의", "AI 자동 생성 (4영역, 3페이지 PDF, 만료 링크)", "GA 1.0"],
        ["FR-54~55", "B2B 결제", "결제 정보 입력 + 자동 결제 + 3회 재시도", "GA 1.0"],
        ["FR-56", "B2G", "사회서비스 바우처 분기 청구서 자동 생성", "v1.1"],
        ["FR-57", "세금", "전자세금계산서 자동 발행 (국세청 e-Tax)", "GA 1.0"],
        ["FR-58", "구독", "변경·일시 정지·환불 (일할 계산)", "v1.1"],
        ["FR-59~61", "후견 모드", "결정문 OCR + 유형별 차등 + 3자 동의 흐름", "GA 1.0"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[3, 4.5, 21, 3], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")


def build_fr_v2_2_5(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · FR v2.2~v2.5",
               "자가진단 + 다중 입력 + U6 + 보호자 자조모임",
               "FR-62~83 (22건) — 누계 FR-01~83 총 85건")
    rows = [
        ["FR#", "영역", "요구사항", "출처"],
        ["FR-62", "자가진단", "K-DST 영유아 8단계", "v2.2"],
        ["FR-63", "자가진단", "M-CHAT-R 자폐 선별 (16~30개월)", "v2.2"],
        ["FR-64~66", "자가진단", "AIR-SDS / K-SIB-R / VABS-3", "v2.2"],
        ["FR-67", "AI", "시계열 추이 분석 + LLM 인사이트", "v2.2"],
        ["FR-68", "컴플라이언스", "의료법 안전 면책 표기 (모든 화면·PDF)", "v2.2 法的"],
        ["FR-69", "입력 모드", "다중 입력 4종 (빠른선택·체크·사진·텍스트)", "v2.4 ⭐"],
        ["FR-71", "보안", "후견인 얼굴 인증 (셀카+라이브니스+AI 매칭)", "v2.4 ⭐"],
        ["FR-72~73", "U6 일반교사", "권한 모델 + 통합학급 짧은 메모", "v2.4 ⭐"],
        ["FR-74~75", "자조모임", "생애주기 자동 매칭 + 자유 개설 그룹", "v2.5"],
        ["FR-76~78", "자조모임", "게시판 + 모임 일정 + RSVP", "v2.5"],
        ["FR-79~83", "자조모임", "리마인더·관리자·신고·온보딩 CTA·DB 분리", "v2.5"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[3, 5, 20.5, 3], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")


def build_multi_input(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 다중 입력 ⭐",
               "FR-69 다중 입력 4종 — 리빙랩 #01 핵심 의사결정",
               "STT 자체 통합 폐기 → 환경 무관 100% 입력 (OS 키보드 음성 의존)")
    modes = [
        ("⚡ 빠른 선택", LIFE_INFANT, "15초 · P0",
         "카테고리 5종 × 옵션 8~12개\n+ 짧은 텍스트 + 메뉴 태그\n시설·이용자 옆·일상 적합"),
        ("✅ 체크리스트", LIFE_SCHOOL, "5초 · P0",
         "시설 일과표 시간 슬롯\n5분 단위 누적 패턴 학습\n응급·일과 자동 슬롯 적합"),
        ("📷 사진+태그", LIFE_TRANSITION, "30초 · P0",
         "사진 5장 + Quick Tags\n+ 짧은 음성/텍스트 캡션\n시각 증거 필요 시 적합"),
        ("⌨️ 텍스트+OS 음성", LIFE_ADULT, "1~2분 · 보조",
         "OS 키보드 음성 의존\n자체 STT 없음\n사무실·재택 회고 적합"),
    ]
    w = Cm(7.5)
    y = Cm(4.7)
    for i, (head, color, badge, body) in enumerate(modes):
        x = Cm(1.0 + i * 8.0)
        rounded(s, x, y, w, Cm(8.5), fill=SOFT_BG, line=color, lw=1.5)
        rect(s, x, y, w, Cm(1.5), fill=color)
        text(s, x, y + Cm(0.15), w, Cm(0.7), head,
             size=15, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x, y + Cm(0.85), w, Cm(0.55), badge,
             size=10, color=SECONDARY, align=PP_ALIGN.CENTER)
        text(s, x + Cm(0.4), y + Cm(1.9), w - Cm(0.8), Cm(6.4),
             body, size=11, color=TEXT_DARK,
             align=PP_ALIGN.CENTER, line_spacing=1.5)
    rounded(s, Cm(1.0), Cm(13.7), Cm(31.5), Cm(2.5), fill=ALERT, line=ALERT)
    text(s, Cm(1.5), Cm(13.9), Cm(30), Cm(0.6), "🔴 STT 폐기 의사결정 — 리빙랩 #01",
         size=12, bold=True, color=WHITE)
    text(s, Cm(1.5), Cm(14.5), Cm(30), Cm(1.7),
         "시설 점심·교실 환경 부적합 + 이용자 옆 부담 + 발달장애 비표준 발화 → "
         "Whisper·Clova STT 외부 API 사용 폐기 · PoC E1 폐기 · NCP STT 호스팅 불필요 · "
         "음성 필요 시 OS 키보드 음성 (Android·iOS 기본 제공) 의존",
         size=10, color=WHITE, line_spacing=1.5)


def build_screening_tools(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 자가진단 6종",
               "한국 표준 자가진단 도구 + AI 추이 분석",
               "FR-62~67 · 의료 진단 아님 (FR-68 면책 의무)")
    rows = [
        ["도구", "풀네임", "대상", "주기", "도메인", "공식 출처", "마일스톤"],
        ["K-DST ⭐", "Korean Developmental Screening Test", "4~71개월",
         "8단계 (4·9·18·24·30·36·48·60)", "발달 선별",
         "보건복지부·질병관리청", "MVP P0"],
        ["K-ASQ", "Korean Ages and Stages Questionnaire", "1~60개월",
         "월령별 21회", "발달 선별",
         "서울대 의대 한국형", "v1.1 P1"],
        ["M-CHAT-R ⭐", "Modified Checklist for Autism in Toddlers Revised", "16~30개월",
         "1회 (6개월 재검사)", "자폐 선별",
         "Robins et al. (2014)", "MVP P0"],
        ["AIR-SDS", "AIR Self-Determination Scale", "14세+",
         "학기별 (반기)", "자기결정",
         "AIR (한국형)", "GA 1.0 P0"],
        ["K-SIB-R", "Korean Scales of Independent Behavior", "학령기+",
         "분기·반기", "자립생활",
         "학술 표준", "v1.1 P1"],
        ["VABS-3", "Vineland Adaptive Behavior Scales", "전 연령",
         "연 1~2회", "적응행동",
         "Sparrow et al.", "v1.1 P2"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[3.5, 7, 4, 5, 3.5, 5, 3.5], rows=rows,
                row_h_cm=1.3, font_size=9, first_col_align="center")


def build_ai_trend(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · AI 추이 분석",
               "FR-67 — 자가진단 시계열 + LLM 자연어 인사이트",
               "최소 3회 누적 후 활성화 · 의료적 표현 금지 (LLM 가드레일)")
    rows = [
        ["단계", "처리 내용"],
        ["입력", "동일 사용자(자녀) 동일 도구 N회 시계열 (≥ 2회)"],
        ["1. 시각화", "도메인별 점수 추이 라인 차트 (각 N회 기록)"],
        ["2. 추세 분류", "↑상승(+2점 이상) / →정체(±1점) / ↓하락(-2점 이상)"],
        ["3. LLM 인사이트", "변화 패턴 + 보호자 권장 행동 (의학적 권고는 제외)"],
        ["4. 이상치 알림", "단일 도메인 +3점 이상 또는 -3점 이하 시 보호자 알림"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[5.5, 26], rows=rows,
                row_h_cm=0.95, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(11.0), Cm(31.5), Cm(5.5), fill=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(11.2), Cm(20), Cm(0.6), "📊 출력 예시 — 박지훈 AIR-SDS 추이 (3회)",
         size=11, bold=True, color=ACCENT)
    text(s, Cm(1.5), Cm(11.9), Cm(30), Cm(4.5),
         "자율성       12 → 15 → 18  (+6점, 상승 ↑)\n"
         "자기조절     14 → 16 → 19  (+5점, 상승 ↑)\n"
         "심리적 권한  15 → 18 → 19  (+4점, 상승 ↑)\n"
         "자기인식     17 → 19 → 20  (+3점, 상승 ↑)\n\n"
         "🤖 AI 인사이트: 전 영역 +3~6점 상승. AAC 동의 활동이 자기결정 능력 향상에 긍정적 영향.\n"
         "   18세 이양 D-90 의료 항목 부분 이양 진행에 적합. ⚠ 정식 평가는 발달재활 전문가 상담 권장.",
         size=10, color=WHITE, font="Consolas", line_spacing=1.5)


def build_transition_18(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 18세 권한 이양",
               "6개월 단계적 이양 타임라인 (FR-48~52)",
               "자립 성공의 단일 최대 분기점 — 이양 절차 없으면 시설 재진입율 +35%")
    rows = [
        ["D-X", "시스템 행동", "사용자 행동 (U1/U2)", "산출물"],
        ["D-180", "이양 준비 가이드 알림 + 자녀 나이 기반 트리거", "U2 가이드 진입", "이양 준비 ON"],
        ["D-150", "모의 동의 시뮬레이션 3회 카드 (의료/식사/AAC)", "U1 가상 동의 연습", "시뮬레이션 로그"],
        ["D-120", "변호사 무료 상담 예약 슬롯 노출 (제휴)", "U2 예약 → 후견 vs 자율 결정", "상담 보고서"],
        ["D-90", "단계적 이양 시작 — 의료 항목 1개", "U2가 자녀에게 첫 권한 이양", "부분 이양 완료"],
        ["D-60", "식사·행동·정서·학습 순차 이양", "카테고리별 자녀 동의 (FR-18)", "4/5 카테고리 이양"],
        ["D-30", "모든 권한에 [당사자에게 묻기] 버튼", "U2 매 행동 시 자녀 확인", "의사결정 공동화"],
        ["D-0 (생일)", "권한 모델 자동 전환", "양측 최종 확인", "새 권한 모델 활성"],
        ["D+30", "정착 점검 알림 + 응급 권한 잔존 안내", "양측 만족도 평가", "정착율 KPI"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[3, 11, 11, 6.5], rows=rows,
                row_h_cm=0.95, font_size=10, first_col_align="center")


def build_guardian_mode(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 후견 모드",
               "후견 유형별 차등 권한 + FR-71 얼굴 인증",
               "한국 민법 §938~§959 · FR-59~61, FR-71")
    rows = [
        ["유형", "정의", "본 플랫폼 권한 모델"],
        ["한정후견 Limited", "특정 행위만 후견인 동의 필요",
         "의료 + 재산만 후견인 권한 / 나머지 본인 자율"],
        ["특정후견 Specific", "일시적·특정 사안만 후견",
         "후견 사안만 후견인 권한 / 나머지 본인+보호자 공동"],
        ["성년후견 Plenary", "전반적 의사결정 능력 결여",
         "전 영역 후견인 권한 / 본인은 의견 청취 대상 (民§947)"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 10, 15.5], rows=rows,
                row_h_cm=1.5, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(11.5), Cm(31.5), Cm(5.0), fill=ALERT, line=ALERT)
    text(s, Cm(1.5), Cm(11.7), Cm(30), Cm(0.6),
         "⭐ FR-71 후견인 본인 얼굴 인증 (v2.4 신규) — Risk #9 위조 방어선",
         size=12, bold=True, color=WHITE)
    text(s, Cm(1.5), Cm(12.4), Cm(30), Cm(4),
         "[1] 후견 결정문 OCR (FR-59)\n"
         "[2] 대법원 가족관계등록 ID 검증 (FR-59)\n"
         "[3] ⭐ 후견인 본인 얼굴 인증 (FR-71)\n"
         "    ├─ 셀카 1장 + 동영상 라이브니스 (눈 깜빡임)\n"
         "    ├─ 대법원 결정문 등록 신분증 사진과 1:1 매칭 (AI 얼굴 인식)\n"
         "    └─ 매칭 실패 시 → 기본값 = 일반 보호자 권한 (Risk #9 대응)",
         size=10, color=WHITE, font="Consolas", line_spacing=1.5)


def build_offline_first(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 오프라인 연속성",
               "FR-30~34 — 산간·시설·교통 음영 지역 기록 손실 0%",
               "Offline-First (PouchDB/Hood.ie design principles)")
    rows = [
        ["항목", "내용"],
        ["저장 위치", "IndexedDB (브라우저) / SQLite (앱)"],
        ["저장 용량", "1인당 최대 500MB (오프라인 일지 200건 ~ 2시간)"],
        ["암호화", "로컬 저장 시 AES-256 + 사용자 패스워드 기반 키"],
        ["동기화 트리거", "(1) WiFi/LTE 복귀 (2) 앱 포그라운드 (3) 수동"],
        ["충돌 해결", "Last-Write-Wins + 동일 시간대 충돌 시 수동 병합 UI"],
        ["오프라인 표시", "상단 배너 \"오프라인 모드 — N건 대기 중\""],
        ["재시도", "동기화 실패 시 7일간 자동 재시도 + 보호자 알림"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[5, 26.5], rows=rows,
                row_h_cm=0.85, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(12.0), Cm(31.5), Cm(4.5), fill=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(12.2), Cm(30), Cm(0.6),
         "📍 시나리오 — 활동지원사 이수진의 강원도 산간 캠프",
         size=11, bold=True, color=ACCENT)
    text(s, Cm(1.5), Cm(12.9), Cm(30), Cm(3.5),
         "10:00  강원도 산간 캠프 도착 (4G 없음)\n"
         "11:00  식사 시간 음성 일지 1건 → 로컬 큐 저장\n"
         "14:00  산책 중 돌발행동 → 음성+사진 일지 → 로컬 큐 저장\n"
         "18:00  WiFi 연결 → 자동 동기화 5건 + 충돌 감지 → 병합/덮어쓰기 UI",
         size=10, color=WHITE, font="Consolas", line_spacing=1.5)


def build_nfr(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · NFR",
               "Non-Functional Requirements 10건 + 침투 테스트 일정",
               "성능 · 가용성 · 보안 · 접근성 · 데이터 거주성 (NCP)")
    rows = [
        ["NFR#", "영역", "요구사항", "검증"],
        ["NFR-01", "성능", "페이지 로드 ≤ 2초 (P75), API P95 ≤ 500ms", "Lighthouse + APM"],
        ["NFR-02", "가용성", "99.5% (월 다운타임 ≤ 3.6시간)", "UptimeRobot"],
        ["NFR-03", "보안", "ISMS-P 인증 + 침투 테스트 (M5W4+M6W4+연 2회)", "KISA 외부"],
        ["NFR-04", "확장성", "동시 사용자 1,000명 / 1,000만 건 로그", "부하 테스트"],
        ["NFR-05", "접근성", "색약/저시력 대응 + 음성 + 큰글씨 + 패턴", "WCAG 자동"],
        ["NFR-06", "호환성", "iOS 14+ / Android 9+ / Chrome·Safari·Edge 최신 2", "BrowserStack"],
        ["NFR-07", "데이터 보존", "보호자 요청 시 30일 내 완전 삭제 + 감사 5년", "삭제 워크플로"],
        ["NFR-08", "데이터 거주성", "NCP (Naver Cloud) 한국 리전 — 의료·후견 데이터", "개정 個情法 §39의2"],
        ["NFR-09", "인증", "KWCAG 2.2 AA + 한국웹접근성 인증 (M6 사전 평가)", "외부 인증 기관"],
        ["NFR-10", "사용성", "발달장애 당사자 자문단 5인 분기별 평가", "분기 사용성 테스트"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[3, 4.5, 19, 5], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")


def build_risks(prs, ctx):
    s = _slide(prs, ctx, "PART 03 · 리스크",
               "Pre-mortem 12건 — 가상 시나리오 + 대응",
               "Risk #1~#12 누적 (v1.0 → v2.5)")
    rows = [
        ["#", "리스크", "확률/영향", "대응 핵심"],
        ["1", "STT 한국어 비표준 발화 < 70%", "↓ v2.4 폐기", "→ 다중 입력 4종 (FR-69)"],
        ["2", "보호자 권한 위임 < 30%", "中/中", "온보딩 가이드 + 시뮬레이션"],
        ["4", "마이그레이션 중 보호자 이탈", "中/中", "First Value 사진 이전 배치"],
        ["5", "알림 피로 → 권한 만료 사고", "中/高", "유형별 분리 토글 강제"],
        ["6", "시설장 일괄 갱신 실수", "中/中", "영향 미리보기 + 30일 되돌리기"],
        ["7", "18세 이양 자동 전환 실패", "中/緊", "응급 권한 30일 잔존 + 롤백"],
        ["8", "B2G 청구 오류 → 시설 환수", "中/高", "시설장 검토 모달 의무화"],
        ["9", "후견 결정문 위조 권한 부정", "低/緊", "FR-71 얼굴 인증 (v2.4) ⭐"],
        ["10", "자가진단을 의료 진단 오인", "中/致", "FR-68 모든 화면·PDF 면책"],
        ["11", "AI 추이 오해석", "中/高", "최소 3회+ 활성화 + 전문가 상담 안내"],
        ["12", "정부 정책 변화 → B2G 무효화", "中/緊", "B2C:B2B:B2G = 50:30:20 분산"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[1.5, 13.5, 5.5, 11], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")


# ───── PART 4: UX Structure ─────

def build_part4_divider(prs, ctx):
    divider_slide(prs, 4, "UX Structure",
                  "5+1 역할 IA · 41화면 · 보호자 자조모임 · 다중 입력 4종",
                  accent=LIFE_TRANSITION, slogan=ctx['slogan'])
    ctx['page_next']()


def build_ia_tree(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · IA Tree",
               "5+1 역할별 정보 구조 (Information Architecture)",
               "퍼블릭 랜딩(A) + 대시보드 6종(B) + 횡단 정책(D)")
    rows = [
        ["역할", "코드", "메인 메뉴 (GNB)", "주요 화면 수"],
        ["퍼블릭 방문자", "—", "서비스 소개 · 도입사례 · 가격 · 로그인", "8 (Hero·Problem·Solution·Persona·Impact·Trust·CTA·Footer)"],
        ["보호자 U2 ⭐", "B.1", "타임라인 · 일지 · 권한 · 자가진단 · 인계서 · ⭐모임 · 설정", "12 (대시보드·자녀 · 자가진단 3 · 다중 입력 4 · 자조 3 · 설정)"],
        ["활동지원사 U3", "B.2", "오늘 · 일지 · 인계서 · 알림 · 설정", "5"],
        ["당사자 U1 (AAC)", "B.3", "일기 · 동의 · 좋아하는 것 · 설정", "4 (큰 카드 + TTS)"],
        ["사회복지사·교사 U4", "B.4", "케이스 · 회의자료 · 권한 · 설정", "5"],
        ["시설장 U5 (B2B)", "B.5", "이용자 · 직원 · 결제 · 감사 · 설정", "5 (3-KPI 대시보드)"],
        ["일반교사 U6 ⭐", "B.6", "담당 학생 · 짧은 메모 · 설정", "2 (v1.3 신규)"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 2.5, 11.5, 11.5], rows=rows,
                row_h_cm=1.3, font_size=10, first_col_align="center")


def build_screen_map(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 41 화면 맵",
               "전체 화면 카탈로그",
               "Part A 8 + Part B 30 + Part D 3 = 41 화면")
    sections = [
        ("Part A · 퍼블릭", PRIMARY,
         "A.0 전체 구조\nA.1 Hero\nA.2 Problem\nA.3 Solution\nA.4 Persona\nA.5 Impact\nA.6 Trust\nA.7 CTA\nA.8 Footer"),
        ("Part B.1 · 보호자", LIFE_INFANT,
         "보호자 대시보드\n자조모임 섹션 (v1.4)\n자녀 등록\n자가진단 목록\nK-DST 응답\nAI 추이 분석\n다중 입력 선택\n빠른 선택\n체크리스트\n사진+태그\n텍스트"),
        ("Part B.2~B.5 · 전문가/시설", PRIMARY_DARK,
         "B.2 활동지원사 대시보드\nB.3 당사자 (AAC)\nB.4 사회복지사·교사\nB.5 시설장 (B2B)\n— 각 5~6 서브 화면"),
        ("Part B.6 ⭐ · 일반교사", LIFE_SCHOOL,
         "B.6.1 U6 대시보드\nB.6.2 짧은 메모\n(v1.3 신규)"),
        ("Part B.7 ⭐ · 자조모임", ACCENT,
         "B.7.1 자조모임 홈\nB.7.2 그룹 상세\nB.7.3 모임 일정 등록\n(v1.4 신규)"),
        ("Part D · 횡단 정책", TEXT_MID,
         "D.1 UserPreferences\nD.2 i18n + 쉬운말\nD.3 다자녀 전환\nD.4 PDF 워터마크\nD.5 케이스 회의 검토"),
    ]
    cols = 3
    for i, (head, color, body) in enumerate(sections):
        col = i % cols
        row = i // cols
        x = Cm(1.0 + col * 10.5)
        y = Cm(4.7 + row * 5.9)
        rounded(s, x, y, Cm(10), Cm(5.5), fill=SOFT_BG, line=color, lw=1)
        rect(s, x, y, Cm(10), Cm(0.9), fill=color)
        text(s, x + Cm(0.3), y + Cm(0.15), Cm(9.5), Cm(0.6), head,
             size=11, bold=True, color=WHITE)
        text(s, x + Cm(0.4), y + Cm(1.2), Cm(9.2), Cm(4.2),
             body, size=9, color=TEXT_DARK, line_spacing=1.5)


def build_landing(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 랜딩 페이지",
               "퍼블릭 랜딩 8섹션 구조",
               "첫 5초 핵심 가치 + 페인 공감 + Solution 4 + Persona 5 + Impact 수치")
    sections = [
        ("§1 Hero", "기록은 끊기지 않고, 권한은 당사자에게 자란다 + CTA", PRIMARY_DARK),
        ("§2 Problem", "기록 단절 / 행정 부담 / 자기결정권 배제 — 3카드", ALERT),
        ("§3 Solution", "통합 타임라인 / 음성 일지 / 3분 인계서 / AAC — 4기능", PRIMARY),
        ("§4 Persona Benefit", "당사자·보호자·활동지원사·사회복지사·시설장 5탭", ACCENT),
        ("§5 Impact", "26.2만명 / 2주→3분 / 30분→1분 / 0%→60% 4수치", LIFE_TRANSITION),
        ("§6 Trust", "협회 추천 / ISMS-P 인증 / AAC 지원 / 언론", LIFE_SCHOOL),
        ("§7 CTA", "[무료로 시작하기] [기관 도입 상담]", LIFE_ADULT),
        ("§8 Footer", "법적 고지 + 개인정보처리방침 + 운영사 정보", TEXT_MID),
    ]
    cols = 2
    w = Cm(15.5)
    h = Cm(1.5)
    for i, (head, body, color) in enumerate(sections):
        col = i % cols
        row = i // cols
        x = Cm(1.0 + col * 16.0)
        y = Cm(4.7 + row * 1.7)
        rounded(s, x, y, w, h, fill=SOFT_BG, line=color, lw=0.8)
        rect(s, x, y, Cm(0.2), h, fill=color)
        text(s, x + Cm(0.4), y + Cm(0.15), Cm(5), Cm(0.6),
             head, size=11, bold=True, color=color)
        text(s, x + Cm(0.4), y + Cm(0.75), Cm(15), Cm(0.7),
             body, size=9, color=TEXT_DARK, line_spacing=1.4)


def build_parent_dash(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 보호자 대시보드",
               "B.1 보호자 (Primary Buyer)",
               "타임라인 · 일지 · 권한 · 자가진단 · 인계서 · ⭐자조모임")
    sections = [
        ("📅 최근 타임라인", "5단계 색상 + 카테고리 필터 + 권한 마스킹", PRIMARY),
        ("✍️ 오늘의 일지", "FR-69 다중 입력 4종 진입 카드 (4종)", ACCENT),
        ("🩺 자가진단 알림", "K-DST 다음 단계 / AI 추이 / 면책 배너", LIFE_INFANT),
        ("👥 권한 카드", "활동지원사/특수교사 만료 D-N 표시 (FR-35)", LIFE_TRANSITION),
        ("📄 인계서 진행", "3분 마스터 생성 진행률 / PDF 다운로드", LIFE_ADULT),
        ("💬 자조모임 (v1.4)", "생애주기 자동 매칭 그룹 + 신규 모임 알림", LIFE_SCHOOL),
    ]
    for i, (head, body, color) in enumerate(sections):
        col = i % 3
        row = i // 3
        x = Cm(1.0 + col * 10.5)
        y = Cm(4.7 + row * 5.5)
        rounded(s, x, y, Cm(10), Cm(5), fill=SOFT_BG, line=color, lw=1)
        rect(s, x, y, Cm(10), Cm(1), fill=color)
        text(s, x + Cm(0.3), y + Cm(0.2), Cm(9.5), Cm(0.6),
             head, size=12, bold=True, color=WHITE)
        text(s, x + Cm(0.4), y + Cm(1.4), Cm(9.2), Cm(3.4),
             body, size=11, color=TEXT_DARK, line_spacing=1.5)


def build_screening_screens(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 자가진단 화면",
               "B.1.4 자가진단 도구 화면 3종",
               "목록 · K-DST 응답 · AI 추이 분석")
    rows = [
        ["화면", "경로", "핵심 콘텐츠", "FR"],
        ["B.1.4.1 도구 목록", "/parent/screening",
         "도구 6종 카드 + 다음 검사 예약 + 면책 배너", "FR-62~66"],
        ["B.1.4.2 K-DST 응답", "/parent/screening/k-dst",
         "30~60문항 4지선다 + 진행률 + 자녀 사진 + 음성 안내", "FR-62"],
        ["B.1.4.3 AI 추이 분석", "/parent/screening/trend",
         "라인 차트 + 도메인별 변화 + LLM 인사이트 + 전문가 상담 안내", "FR-67, FR-68"],
        ["B.1.4 (보조)", "/case/screening/{personId}",
         "사회복지사용 케이스별 추이 열람 (권한 마스킹)", "FR-67"],
    ]
    table_block(s, Cm(1.0), Cm(4.8),
                col_widths_cm=[6, 7, 14.5, 4], rows=rows,
                row_h_cm=2.0, font_size=10, first_col_align="center")


def build_multi_input_screens(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 다중 입력 화면",
               "B.1.5 다중 입력 4종 화면 (FR-69)",
               "/parent/journal/{quick|checklist|photo|text} — 모드 선택 후 입력")
    rows = [
        ["화면", "경로", "핵심 UX", "예상 시간"],
        ["B.1.5.1 모드 선택", "/parent/journal/new",
         "4종 카드 + UserPreferences 기본값 + 빠른 진입", "—"],
        ["B.1.5.2 ⚡ 빠른 선택", "/parent/journal/quick (P0)",
         "카테고리 5종 × 옵션 8~12개 + 짧은 텍스트", "15초"],
        ["B.1.5.3 ✅ 체크리스트", "/parent/journal/checklist (P0)",
         "시설 일과 슬롯 5분 단위 + 누적 패턴", "5초"],
        ["B.1.5.4 📷 사진+태그", "/parent/journal/photo (P0)",
         "사진 5장 + Quick Tags + 짧은 캡션 (FR-06 강화)", "30초"],
        ["B.1.5.5 ⌨️ 텍스트", "/parent/journal/text (보조)",
         "OS 키보드 음성 입력 안내 + 긴 메모", "1~2분"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[7, 9, 12.5, 3], rows=rows,
                row_h_cm=1.2, font_size=10, first_col_align="center")


def build_worker_screen(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 활동지원사 대시보드",
               "B.2 Field Professional (이수진, U3)",
               "오늘 일정 · 빠른 일지 · 인계서 작성/수신 · 산간 캠프 시나리오")
    sections = [
        ("📅 오늘 일정", "이용자 1~5명 × 시간대 카드", PRIMARY),
        ("⚡ 빠른 일지 작성", "이용자 선택 → FR-69 4종 → 저장", ACCENT),
        ("📝 인계서 작업함", "보호자 요청 · 신규 기관 송부 · 회수", LIFE_TRANSITION),
        ("📡 오프라인 상태", "큐 N건 대기 + 동기화 진행률", LIFE_ADULT),
        ("🔔 알림 센터", "권한 만료 D-N · 신규 동의 · 시설장 공지", ALERT),
    ]
    for i, (head, body, color) in enumerate(sections):
        col = i % 3
        row = i // 3
        x = Cm(1.0 + col * 10.5)
        y = Cm(4.7 + row * 5.5)
        rounded(s, x, y, Cm(10), Cm(5), fill=SOFT_BG, line=color, lw=1)
        rect(s, x, y, Cm(10), Cm(1), fill=color)
        text(s, x + Cm(0.3), y + Cm(0.2), Cm(9.5), Cm(0.6),
             head, size=12, bold=True, color=WHITE)
        text(s, x + Cm(0.4), y + Cm(1.4), Cm(9.2), Cm(3.4),
             body, size=11, color=TEXT_DARK, line_spacing=1.5)


def build_self_screen(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 당사자 대시보드",
               "B.3 당사자 (U1, AAC 기반)",
               "큰 카드 · TTS · 1화면 1결정 · 2단계 확인 · 시간 압박 없음")
    rows = [
        ["화면", "구성", "핵심 원칙"],
        ["📖 오늘 일기 보기", "어제 사진 일지 슬라이드 (5장씩 큰 카드)", "1화면 1결정"],
        ["✋ 동의 카드", "Yes/No 큰 카드 2장 + 한 번 더 확인 모달", "2단계 확인 (FR-18)"],
        ["💝 내가 좋아하는 것", "픽토그램 4장 선택 → 향후 케어 계획 반영", "쉬운말 + TTS"],
        ["⚙️ 설정", "글자 크기 / 음성 ON/OFF / 되돌리기", "30분 자동 로그아웃"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 17.5, 8], rows=rows,
                row_h_cm=2.0, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(13.5), Cm(31.5), Cm(3), fill=ACCENT, line=ACCENT)
    text(s, Cm(1.5), Cm(13.7), Cm(20), Cm(0.6),
         "당사자 UX 절대 원칙 5종 (PRD §10.2)",
         size=12, bold=True, color=WHITE)
    text(s, Cm(1.5), Cm(14.3), Cm(30), Cm(2.2),
         "① 1화면 1결정  ② 2단계 확인 의무  ③ 취소 항상 노출  "
         "④ 시간 압박 없음  ⑤ 부정 단어 회피 (\"삭제\"→\"지울게요\")",
         size=11, color=WHITE, line_spacing=1.6)


def build_pro_screen(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 사회복지사·교사",
               "B.4 사회복지사·특수교사 (U4)",
               "케이스 관리 · 회의자료 60분→3분 자동 생성 (FR-53)")
    rows = [
        ["섹션", "구성"],
        ["📁 케이스 리스트", "담당 케이스 N건 · 최근 활동 · 권한 만료 알림"],
        ["📑 회의자료 자동", "4영역(교육·의료·돌봄·자립) AI 요약 + 3페이지 PDF + 만료 링크 (7일)"],
        ["🔐 권한 관리", "본인 작성 메모 편집 가능 / AI 추출 사실은 편집 불가 (사실-해석 분리)"],
        ["📊 자가진단 추이", "케이스별 AI 추이 열람 (권한 마스킹 자동 적용)"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 25.5], rows=rows,
                row_h_cm=1.8, font_size=11, first_col_align="center")


def build_facility_screen(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 시설장 대시보드",
               "B.5 시설장 (U5, B2B Buyer)",
               "3-KPI · 권한 일괄 · B2G 청구 · 감사 로그 + ISMS-P 배지")
    rows = [
        ["섹션", "구성"],
        ["📊 3-KPI 카드", "이용자 N명 · 활동지원사 N명 · 이번 주 권한 만료 N건"],
        ["⚡ 권한 일괄", "활동지원사 권한 일괄 갱신/회수 + \"N명 영향\" 미리보기 (FR-22)"],
        ["💳 결제·구독", "월/연 구독 자동 결제 + D-7 이메일 예고 + 결제 실패 3회 재시도"],
        ["📤 B2G 청구", "분기 바우처 청구서 자동 생성 + 인계서 7건 첨부 PDF (FR-56)"],
        ["🔒 감사 로그", "ISMS-P 배지 + 마지막 감사일 + 1-Click CSV 내보내기"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 25.5], rows=rows,
                row_h_cm=1.5, font_size=11, first_col_align="center")


def build_u6_screen(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · U6 일반교사 ⭐",
               "B.6 U6 (윤교사, v1.3 신규)",
               "통합학급 짧은 메모 — 일반 학생 정보 차단 + 특수교사 IEP 연동")
    rows = [
        ["화면", "경로", "핵심 UX"],
        ["B.6.1 대시보드", "/general-teacher",
         "담당 통합 학생 1~2명 카드 + 주간 메모 N건 + 특수교사 공유 알림"],
        ["B.6.2 짧은 메모", "/general-teacher/memo",
         "1줄 메모 + 빠른 선택 (행동·정서·학습 한정) + 학급 컨텍스트 마스킹"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[5.5, 7, 19], rows=rows,
                row_h_cm=2.5, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(11.5), Cm(31.5), Cm(5), fill=LIFE_SCHOOL, line=LIFE_SCHOOL)
    text(s, Cm(1.5), Cm(11.7), Cm(30), Cm(0.6),
         "U6 (v1.3) — 통합학급 사각지대 해소 (리빙랩 YK1)",
         size=12, bold=True, color=WHITE)
    text(s, Cm(1.5), Cm(12.5), Cm(30), Cm(4),
         "✓ 일반 학생 25명 + 통합 학생 1~2명 담당\n"
         "✓ 주 2~3회 짧은 메모 (특수교사보다 적음)\n"
         "✓ 메모 1건 < 30초 (빠른 선택 + 1줄 텍스트)\n"
         "✓ 일반 학생 식별정보 입력 차단 (의료 카테고리 0)\n"
         "✓ 특수교사 IEP 반영율 50%+ 목표",
         size=11, color=WHITE, line_spacing=1.5)


def build_self_help_screens(prs, ctx):
    s = _slide(prs, ctx, "PART 04 · 자조모임 화면 ⭐",
               "B.7 보호자 자조모임 (v1.4 신규, FR-74~83)",
               "Recordare 인증 보호자 전용 폐쇄형 — 케어 데이터 완전 분리")
    rows = [
        ["화면", "경로", "핵심 콘텐츠"],
        ["B.7.1 자조모임 홈", "/parent/community",
         "생애주기 자동 매칭 그룹 + 자유 개설 그룹 탐색 + 신규 모임 알림"],
        ["B.7.2 그룹 상세", "/parent/community/[groupId]",
         "게시판 (텍스트+사진 5장) + 멤버 + 모임 일정 + 관리자 도구"],
        ["B.7.3 모임 일정 등록", "/parent/community/[groupId]/meeting/new",
         "온라인(링크) / 오프라인(장소+지도) + 인원·승인제 + RSVP"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[7, 9, 15.5], rows=rows,
                row_h_cm=2.0, font_size=10, first_col_align="center")
    rounded(s, Cm(1.0), Cm(12.5), Cm(31.5), Cm(4), fill=ACCENT, line=ACCENT)
    text(s, Cm(1.5), Cm(12.7), Cm(30), Cm(0.6),
         "🛡 FR-83 데이터 완전 분리 — community Prisma 스키마",
         size=12, bold=True, color=WHITE)
    text(s, Cm(1.5), Cm(13.4), Cm(30), Cm(3),
         "✓ community DB 스키마는 케어 DB (JournalEntry · Handover · TimelineCard) 와 완전 분리\n"
         "✓ 자조모임 UI에서 자녀 기록·권한·인계서 데이터 노출 절대 금지\n"
         "✓ 게시물에는 보호자 닉네임만 (실명·자녀 이름 비노출)",
         size=11, color=WHITE, line_spacing=1.5)


# ───── PART 5: Workflows ─────

def build_part5_divider(prs, ctx):
    divider_slide(prs, 5, "Workflows",
                  "5+1 사용자 × 18종 단위업무 + 횡단 관심사 4종",
                  accent=LIFE_SCHOOL, slogan=ctx['slogan'])
    ctx['page_next']()


def build_workflow_overview(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · 워크플로우 개요",
               "User-Centric (A) + Task-Centric (B) + 횡단 정책",
               "Workflow 표기법 6요소 + Cross-Cutting Concerns 4종")
    rows = [
        ["관심사", "정책"],
        ["인증·세션", "로그인 미상태 → 모든 액션 차단 / 당사자 모드 자동 로그아웃 30분"],
        ["권한 검증", "모든 데이터 액션 (Actor, Subject, Action, Time) 4-tuple 정책 평가"],
        ["오프라인 큐", "네트워크 단절 시 모든 쓰기 액션 로컬 큐 폴백 (FR-30)"],
        ["알림 발사", "모든 상태 변경 알림 매트릭스 통과 (PRD §9.1)"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[6, 25.5], rows=rows,
                row_h_cm=1.2, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(11.0), Cm(31.5), Cm(5.5), fill=SOFT_BG, line=BORDER)
    text(s, Cm(1.5), Cm(11.2), Cm(30), Cm(0.6),
         "워크플로우 표기법 6요소",
         size=12, bold=True, color=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(11.9), Cm(30), Cm(4.5),
         "① Actor — 행동 주체 (U1~U6)\n"
         "② Trigger — 시작 조건 (시간·이벤트·사용자 의도)\n"
         "③ Pre-condition — 선행 조건 (로그인·권한·데이터 존재)\n"
         "④ Step — 순서 있는 행동/시스템 응답\n"
         "⑤ Output — 산출물 (데이터·알림·문서·상태 변화)\n"
         "⑥ FR-trace — PRD FR 번호 매핑 (검증 가능성 확보)",
         size=11, color=TEXT_DARK, line_spacing=1.5)


def build_u1_workflow(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · U1 당사자",
               "A1. 당사자 워크플로우 — First-Time + Daily + 18세 이양",
               "AAC·쉬운말 모드 + 자기결정권 행사")
    rows = [
        ["Step", "Actor", "행동", "Output", "FR"],
        ["1", "U2 보호자", "당사자 계정 활성화 (음성 ON·큰글씨)", "활성화 완료", "FR-19"],
        ["2", "U1", "당사자 모드 로그인 (얼굴+음성 인사)", "세션 생성 (30분)", "NFR-10"],
        ["3", "시스템", "환영 화면 + TTS 자동 재생", "환영 표시", "FR-17"],
        ["4", "U1", "튜토리얼 3단계 (일기·답하기·동의)", "튜토리얼 완료", "FR-17"],
        ["5", "U1", "첫 동의 행사 (사진+이름+픽토그램)", "동의 의사 표명", "FR-18, FR-19"],
        ["6", "시스템", "축하 + 보호자 5분 내 푸시", "보호자 알림", "FR-19"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[2, 4, 12, 8.5, 5], rows=rows,
                row_h_cm=0.95, font_size=10, first_col_align="center")
    rounded(s, Cm(1.0), Cm(12.5), Cm(31.5), Cm(4), fill=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(12.7), Cm(30), Cm(0.6),
         "💡 18세 권한 이양 6개월 가이드 (A1.4)",
         size=12, bold=True, color=ACCENT)
    text(s, Cm(1.5), Cm(13.4), Cm(30), Cm(3),
         "D-180 가이드 알림 → D-150 모의 시뮬레이션 → D-120 변호사 상담 → "
         "D-90 의료 1개 이양 → D-30 [당사자에게 묻기] 버튼 → D-0 자동 전환 → D+30 정착 점검",
         size=10, color=WHITE, line_spacing=1.6)


def build_u2_workflow(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · U2 보호자",
               "A2. 보호자 First Value 여정 (1시간 인계서 PDF)",
               "7단계 마법사 + 마이그레이션 + First Value 체험")
    rows = [
        ["단계", "시간", "행동", "First Value"],
        ["가입 후 첫 5분", "5분", "PASS/카카오 본인인증 + 자녀 등록 1건", "자녀 프로필 1개 완성"],
        ["첫 30분", "30분", "카톡 zip 백업 업로드 + AI 자동 분류", "사진 100장 자동 분류 미리보기"],
        ["첫 1시간", "1시간", "First Value 체험 → AI 인계서 샘플 PDF 다운로드", "인계서 PDF 1장 다운로드 ⭐"],
        ["첫 1주", "1주", "활동지원사/특수교사 1명 권한 위임", "전문가 1명 연결 + 자조모임 추천"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 3, 14.5, 8], rows=rows,
                row_h_cm=1.5, font_size=10, first_col_align="center")
    rounded(s, Cm(1.0), Cm(12.0), Cm(31.5), Cm(4.5), fill=SOFT_BG, line=PRIMARY, lw=1)
    text(s, Cm(1.5), Cm(12.2), Cm(30), Cm(0.6),
         "🧙 7단계 온보딩 마법사 (FR-25)",
         size=12, bold=True, color=PRIMARY)
    text(s, Cm(1.5), Cm(12.9), Cm(30), Cm(3.5),
         "Step 1 환영+본인인증 → Step 2 자녀 등록 → Step 3 소속기관 → "
         "Step 4 마이그레이션 (카톡/갤러리/종이/엑셀, 스킵 가능) → "
         "Step 5 권한 모델 자동 추천 → Step 6 알림 채널 → Step 7 First Value 체험",
         size=10, color=TEXT_DARK, line_spacing=1.6)


def build_u3_workflow(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · U3 활동지원사",
               "A3. 활동지원사 일상 + 산간 캠프 + 계약 종료",
               "보호자/시설장 초대 → 첫 출근 → 산간 캠프 오프라인 → 계약 종료")
    rows = [
        ["시점", "시나리오", "FR"],
        ["주당 첫 출근", "보호자 초대 → 가입 → 첫 이용자 매칭 → 다중 입력 모드 선택 (UserPreferences)", "FR-69, FR-25"],
        ["일상 (시설)", "이용자 옆 빠른 선택 15초 → 자동 저장 → 보호자 알림", "FR-69a, FR-19"],
        ["산간 캠프 (오프라인)", "WiFi 없음 → 로컬 큐 저장 → 18시 복귀 → 자동 동기화 5건", "FR-30~34"],
        ["계약 종료", "권한 자동 회수 → 7일 인계 기간 → 후임에게 인계서 PDF + 시스템 전달", "FR-09, FR-43"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[6, 21.5, 4], rows=rows,
                row_h_cm=1.8, font_size=10, first_col_align="center")


def build_u4_u5_workflow(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · U4·U5",
               "A4. 사회복지사/특수교사 + A5. 시설장",
               "케이스 회의 60분→3분 + B2B 결제·B2G 청구")
    rounded(s, Cm(1.0), Cm(4.7), Cm(15.5), Cm(11.5), fill=SOFT_BG, line=PRIMARY_DARK, lw=1.5)
    rect(s, Cm(1.0), Cm(4.7), Cm(15.5), Cm(1.0), fill=PRIMARY_DARK)
    text(s, Cm(1.3), Cm(4.85), Cm(15), Cm(0.7), "👩‍💼 U4 사회복지사·특수교사",
         size=13, bold=True, color=WHITE)
    text(s, Cm(1.4), Cm(6.0), Cm(15), Cm(10),
         "1. 케이스 회의 자료 (FR-53)\n"
         "  └ 대상 케이스 선택\n"
         "  └ 4영역 자동 추출 (권한 마스킹)\n"
         "  └ AI 요약 3페이지 PDF\n"
         "  └ 만료 링크 (7일) + 보호자 알림\n\n"
         "2. 케이스 추이 열람\n"
         "  └ 자가진단 AI 추이 (권한 범위)\n\n"
         "3. 권한 범위 특이사항\n"
         "  └ 본인 작성 메모만 편집 가능\n"
         "  └ AI 추출 사실 편집 불가",
         size=10, color=TEXT_DARK, line_spacing=1.6)
    rounded(s, Cm(17.0), Cm(4.7), Cm(15.5), Cm(11.5), fill=SOFT_BG, line=LIFE_ADULT, lw=1.5)
    rect(s, Cm(17.0), Cm(4.7), Cm(15.5), Cm(1.0), fill=LIFE_ADULT)
    text(s, Cm(17.3), Cm(4.85), Cm(15), Cm(0.7), "🏢 U5 시설장 (B2B)",
         size=13, bold=True, color=WHITE)
    text(s, Cm(17.4), Cm(6.0), Cm(15), Cm(10),
         "월요일 오전 9시 기준 일상\n\n"
         "1. 3-KPI 카드 (12명/5명/만료3건)\n"
         "2. 만료 3건 일괄 갱신\n"
         "  └ \"5명 → 이용자 8명 영향\"\n"
         "  └ 갱신 기간 선택 + 일괄 적용\n\n"
         "3. 분기 인계서 7건 일괄 승인\n"
         "  └ B2G 바우처 자동 식별\n"
         "  └ 청구서 PDF 다운로드\n\n"
         "4. 익월 구독료 자동 결제 예고\n"
         "5. ISMS-P 감사 로그 CSV",
         size=10, color=TEXT_DARK, line_spacing=1.6)


def build_units_1(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · B1~B6",
               "단위업무 1/3 — 온보딩·등록·기록·타임라인",
               "Part B 18종 단위업무 중 핵심 6종")
    rows = [
        ["B#", "단위업무", "주요 Actor", "FR-trace"],
        ["B1", "회원가입 / 온보딩 (7-Step)", "U2·U3", "FR-25, FR-26, FR-29"],
        ["B2", "자녀 / 이용자 등록", "U2·U5", "FR-25, FR-21"],
        ["B3", "사진 마이그레이션 (카톡/갤러리/종이)", "U2 단독", "FR-26, FR-27, FR-28"],
        ["B4 ⭐", "일지 작성 (다중 입력 4종, v1.4)", "U2·U3·U6", "FR-01, FR-05, FR-69, FR-30~33"],
        ["B5", "사진 일지 작성", "U2·U3", "FR-01, FR-06"],
        ["B6", "타임라인 조회 (권한 마스킹)", "전 사용자", "FR-02, FR-06"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[2.5, 14, 7, 8], rows=rows,
                row_h_cm=1.2, font_size=10, first_col_align="center")


def build_units_2(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · B7~B12",
               "단위업무 2/3 — 권한·인계서·이양",
               "권한 부여·갱신·회수 + 3분 인계서 + 18세 이양")
    rows = [
        ["B#", "단위업무", "주요 Actor", "FR-trace"],
        ["B7", "권한 부여 (보호자·시설장 → 전문가)", "U2·U5", "FR-08, FR-09, FR-22"],
        ["B8", "권한 갱신 (D-30/D-7/D-1 3단)", "U2·U5", "FR-35, FR-22"],
        ["B9", "권한 회수 (정상 만료 + 긴급 차단)", "U2·U5", "FR-09, FR-47"],
        ["B10 ⭐", "인계서 생성 (3분 마스터)", "U2·U3·U4", "FR-13, FR-14, FR-43"],
        ["B11", "인계서 일괄 승인 (시설장 분기 업무)", "U5 단독", "FR-23"],
        ["B12", "권한 이양 (18세 6개월 가이드)", "U1·U2", "FR-48~52"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[2.5, 14, 7, 8], rows=rows,
                row_h_cm=1.2, font_size=10, first_col_align="center")


def build_units_3(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · B13~B18",
               "단위업무 3/3 — 알림·AAC·오프라인·내보내기·회의·결제",
               "알림 매트릭스 + 후견 + B2B/B2G + 케이스 회의")
    rows = [
        ["B#", "단위업무", "주요 Actor", "FR-trace"],
        ["B13", "알림 수신/처리 (다채널 카피 분기)", "전 사용자", "FR-35~39"],
        ["B14", "AAC 동의 행사 (당사자 단독)", "U1", "FR-17, FR-18, FR-19"],
        ["B15", "오프라인 동기화 (충돌 병합)", "U3 산간", "FR-30~34"],
        ["B16", "데이터 내보내기 (PDF·엑셀·ZIP·JSON)", "U2·U5", "FR-43~47"],
        ["B17", "케이스 회의 자료 자동 (4영역 PDF)", "U4", "FR-53"],
        ["B18", "B2B 결제 / B2G 청구 (시설장)", "U5", "FR-54~58"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[2.5, 14, 7, 8], rows=rows,
                row_h_cm=1.2, font_size=10, first_col_align="center")


def build_permission_matrix(prs, ctx):
    s = _slide(prs, ctx, "PART 05 · 권한 매트릭스",
               "5×20 → 6×20 = 120셀 (v1.4 U6 추가)",
               "단위업무 20종 × 사용자 6종 = 120 권한 셀 — 모든 셀 회귀 테스트 의무")
    rows = [
        ["단위업무 (요약)", "U1", "U2", "U3", "U4", "U5", "U6"],
        ["B1 회원가입", "✅", "✅", "✅", "✅", "✅", "✅"],
        ["B2 자녀/이용자 등록", "❌", "✅", "❌", "❌", "✅", "❌"],
        ["B4 일지 작성", "△", "✅", "✅", "❌", "❌", "△ (통합학생만)"],
        ["B5 사진 일지", "❌", "✅", "✅", "❌", "❌", "❌"],
        ["B6 타임라인 조회", "△ (본인)", "✅", "△ (담당)", "△ (담당)", "✅", "△ (담당)"],
        ["B7 권한 부여", "❌", "✅", "❌", "❌", "✅", "❌"],
        ["B9 권한 회수", "△ (자기)", "✅", "❌", "❌", "✅", "❌"],
        ["B10 인계서 생성", "❌", "✅", "✅", "✅", "✅", "❌"],
        ["B11 인계서 일괄", "❌", "❌", "❌", "❌", "✅", "❌"],
        ["B14 AAC 동의", "✅", "❌", "❌", "❌", "❌", "❌"],
        ["B17 케이스 회의 자료", "❌", "△", "❌", "✅", "△", "△ (메모 첨부)"],
        ["B18 결제·B2G 청구", "❌", "△", "❌", "❌", "✅", "❌"],
    ]
    table_block(s, Cm(1.0), Cm(4.5),
                col_widths_cm=[10, 3.5, 3.5, 3.5, 3.5, 3.5, 4], rows=rows,
                row_h_cm=0.75, font_size=9, first_col_align="left")


# ───── PART 6: Plan & WBS ─────

def build_part6_divider(prs, ctx):
    divider_slide(prs, 6, "Plan & WBS",
                  "MVP Beta 16주 · 28 FR · 7 NFR · 13인 인력 · 시범 시설 8곳",
                  accent=LIFE_ADULT, slogan=ctx['slogan'])
    ctx['page_next']()


def build_plan_exec(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · Plan Exec Summary",
               "Plan v1.4 Executive Summary",
               "MVP Beta (M3-M6, 4개월) — 28 FR · 7 NFR · 13인")
    rows = [
        ["관점", "내용"],
        ["Problem", "PRD 85개 FR 중 4개월 안에 어떤 FR을 어떤 순서로 만들어 누구에게 검증받을 것인가"],
        ["Solution", "v1.0 P0 11 + v2.0 P0 10 + v2.2 P0 4 (자가진단) + v2.4 P0 3 (FR-69·71·72/73) = 28 FR"],
        ["Function/UX", "First Value 1h · 일지 30분→15초 · 인계서 2주→3분 · 자가진단 70%+ · 통합학급 <30초"],
        ["Core Value", "4개월 안에 보호자 100명+활동지원사 50명+일반교사 25명+시범 시설 8곳 검증"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[3.5, 28], rows=rows,
                row_h_cm=2.0, font_size=10, first_col_align="center")


def build_mvp_scope(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · MVP Beta 범위",
               "28 FR + 7 NFR — 포함/제외 명확화",
               "B2B 결제·18세 이양·후견 차등·외부 연동은 GA 1.0 이연")
    metric_slide_local = _slide  # alias to reuse
    rounded(s, Cm(1.0), Cm(4.7), Cm(15.5), Cm(11.5), fill=SOFT_BG, line=PRIMARY, lw=1.5)
    rect(s, Cm(1.0), Cm(4.7), Cm(15.5), Cm(1.0), fill=PRIMARY)
    text(s, Cm(1.3), Cm(4.85), Cm(15), Cm(0.7), "✅ MVP Beta 포함 (28 FR)",
         size=13, bold=True, color=WHITE)
    text(s, Cm(1.4), Cm(6.0), Cm(15), Cm(10),
         "Group A 기록 코어 (v1.0 P0)\n"
         "  FR-01·02·05·06·08·09·11·13·14·15·16 (11건)\n\n"
         "Group B 사용자 경험 (v2.0 P0)\n"
         "  FR-17·18·19·25·26·30·32·35·40·43 (10건)\n\n"
         "Group C 자가진단 (v2.2 P0)\n"
         "  FR-62·63·67·68 (4건)\n\n"
         "Group D 다중 입력 (v2.4 P0) ⭐\n"
         "  FR-69·71 (2건)\n\n"
         "Group E U6 일반교사 (v2.4 P0) ⭐\n"
         "  FR-72·73 (2건)\n\n"
         "NFR-01·02·04·05·06·07·09 (7건)",
         size=10, color=TEXT_DARK, line_spacing=1.4)
    rounded(s, Cm(17.0), Cm(4.7), Cm(15.5), Cm(11.5), fill=SOFT_BG, line=ALERT, lw=1.5)
    rect(s, Cm(17.0), Cm(4.7), Cm(15.5), Cm(1.0), fill=ALERT)
    text(s, Cm(17.3), Cm(4.85), Cm(15), Cm(0.7), "🚫 제외/이연",
         size=13, bold=True, color=WHITE)
    text(s, Cm(17.4), Cm(6.0), Cm(15), Cm(10),
         "GA 1.0 이연 (M7~M12)\n"
         "  • FR-03·04·07·10·12 (v1.0 P1)\n"
         "  • FR-21~24 (시설장 모드)\n"
         "  • FR-48~52 (18세 이양 전체)\n"
         "  • FR-53 (케이스 회의)\n"
         "  • FR-54~58 (B2B 결제·B2G)\n"
         "  • FR-59~61 (후견 차등)\n\n"
         "v1.1 이연 (M13~M18)\n"
         "  • 행복e음 · NEIS 연동\n"
         "  • FR-27 OCR · FR-64~66\n\n"
         "v2.0 이연 (M19~M24)\n"
         "  • IoT · PHR · 국민건강보험 API\n\n"
         "별도 Plan (parent-self-help-group)\n"
         "  • FR-74~83 자조모임 (M5~M6)",
         size=10, color=TEXT_DARK, line_spacing=1.4)


def build_hypotheses(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · 핵심 가설",
               "MVP Beta 핵심 가설 H1~H5",
               "검증 방법 + 통과 기준 + 시범 코호트")
    rows = [
        ["#", "가설", "검증 방법", "통과 기준"],
        ["H1", "7-Step 온보딩 1h → 인계서 PDF → 1주 잔존 70%+",
         "시범 100명 코호트 분석", "First Value 1h 도달 ≥ 60%"],
        ["H2", "활동지원사 빠른 선택 15초 → 일평균 5건 사용",
         "산간·시설 시범 50명 (4주)", "활성 사용자 일평균 5건+"],
        ["H3", "3분 마스터 인계서 → 재작성 요청 < 20%",
         "인계서 100건 발행 후 추적", "재작성 < 20% · NPS 30+"],
        ["H4", "카톡 사진 1만 장 → 보호자 검수 정확도 70%+",
         "시범 30가족 카드 스와이프 정정 추적", "분류 수정 < 30%"],
        ["H5", "당사자 모드 (AAC+쉬운말) → 자문단 4/5+",
         "당사자 자문단 5인 분기 평가", "만족도 ≥ 4/5"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[1.5, 13, 9, 8], rows=rows,
                row_h_cm=1.6, font_size=10, first_col_align="center")


def build_success_criteria(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · Success Criteria",
               "SC-01 ~ SC-14 — MVP Beta 검증 지표",
               "Critical Path = SC-01·02·03·05·07 미충족 시 GA 1.0 진입 차단")
    rows = [
        ["SC#", "영역", "지표", "MVP Beta 목표"],
        ["SC-01", "First Value", "가입 1h 내 인계서 PDF 다운로드 도달율", "≥ 60%"],
        ["SC-02", "효율", "일지 1건 평균 작성 시간", "≤ 5분 (목표 2분)"],
        ["SC-03", "효율", "인계서 1건 작성 시간", "≤ 5분 (목표 3분)"],
        ["SC-04", "오프라인", "동기화 성공률", "≥ 95%"],
        ["SC-05", "접근성", "당사자 자문단(5인) 쉬운말 평가", "≥ 4/5"],
        ["SC-06", "만족", "시범 사용자 NPS", "≥ 30"],
        ["SC-07", "보안", "Audit Log 누락 케이스", "0건"],
        ["SC-08", "마이그레이션", "카톡 사진 분류 정확도 (검수 후)", "≥ 70%"],
        ["SC-09", "알림", "권한 만료 D-7 알림 클릭율", "≥ 35%"],
        ["SC-10", "회귀", "TC-13 2단계 확인 회귀 차단율", "100%"],
        ["SC-11", "자가진단", "신규 보호자 7일 내 자가진단 1회+", "≥ 70%"],
        ["SC-12", "자가진단", "K-DST 8단계 완주율", "≥ 60%"],
        ["SC-13", "AI 분석", "AI 추이 인사이트 만족도", "≥ 4/5"],
        ["SC-14", "컴플라이언스", "LLM 의료적 표현 위반 건수", "0건 ⚠"],
    ]
    table_block(s, Cm(1.0), Cm(4.4),
                col_widths_cm=[3, 4, 18.5, 6], rows=rows,
                row_h_cm=0.78, font_size=10, first_col_align="center")


def build_sprints(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · Sprint 0~5",
               "16주 Sprint 계획",
               "Sprint 0 PoC → Sprint 5 U6 · 접근성 · 알림 · 최종 UI")
    rows = [
        ["Sprint", "기간", "테마", "산출물"],
        ["S0", "2주 (W1-2)", "PoC·기반 구축",
         "Dev Setup · CI · 빠른 선택 PoC · AI/OCR PoC · Disclaimer"],
        ["S1", "2주 (W3-4)", "인증·동의·권한",
         "Auth/Roles · 7-Step 온보딩 · 분리 동의 · 6×20 권한 · Audit"],
        ["S2", "3주 (W5-7)", "기록·타임라인",
         "FR-69 빠른선택·체크리스트·사진+태그 · 통합 타임라인"],
        ["S3", "3주 (W8-10)", "AAC·인계서·권한 완성",
         "당사자 모드 셸 · AAC 동의 · 권한 부여/회수 · 3분 인계서 PDF"],
        ["S4", "3주 (W11-13)", "자가진단·오프라인·후견 인증",
         "K-DST · M-CHAT-R · AI 추이 · 오프라인 큐 · FR-71 얼굴 인증"],
        ["S5", "2주 (W14-15)", "U6·접근성·알림·PDF",
         "U6 대시보드·짧은 메모 · 알림 시스템 · KWCAG · 모바일 반응형"],
        ["Beta", "2+4주", "검증·운영",
         "침투 테스트 · E2E · 시범 운영 4주 · KPI Report · Living Lab"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[2.5, 3.5, 7, 18.5], rows=rows,
                row_h_cm=1.3, font_size=10, first_col_align="center")


def build_wbs(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · WBS",
               "WBS 1.0~10.0 단계별 산출물",
               "착수→Design→Sprint 0~5→Beta 준비→Beta 운영")
    rows = [
        ["WBS", "단계", "기간", "주요 산출물"],
        ["1.0", "착수·범위 확정", "1주", "Kickoff · Scope · Risk Register · Field Test Plan"],
        ["2.0", "Design 단계", "2주", "ERD · OpenAPI · 권한 정책 · Design Anchor · 법무 검토"],
        ["3.0", "Sprint 0 PoC", "2주", "Dev Setup · CI · AI/Vision/OCR PoC · 빠른 선택 PoC"],
        ["4.0", "Sprint 1", "2주", "Auth · 온보딩 · 민감정보 동의 · 6×20 권한 · Audit"],
        ["5.0", "Sprint 2", "3주", "FR-69 4종 · 통합 타임라인 · 권한 마스킹"],
        ["6.0", "Sprint 3", "3주", "AAC 동의 · 3분 인계서 PDF · 권한 120셀 테스트"],
        ["7.0", "Sprint 4", "3주", "K-DST · M-CHAT-R · AI 추이 · 오프라인 큐 · FR-71"],
        ["8.0", "Sprint 5", "2주", "U6 화면 · 알림 · KWCAG · 모바일 · LLM 가드레일"],
        ["9.0", "Beta 준비·검증", "2주", "E2E · 침투 테스트 · 성능 부하 · 모니터링 · Go/No-Go"],
        ["10.0", "Beta 운영·회고", "4주", "운영 로그 · KPI Report · Living Lab · 백로그 vNext"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[2.5, 6, 3.5, 19.5], rows=rows,
                row_h_cm=0.95, font_size=10, first_col_align="center")


def build_team(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · 인력 매트릭스",
               "13인 권장 투입 (8인 상시 + 5인 파트/자문)",
               "PM · UX · FE · BE · Sec · Legal · AI · QA · DevOps · A11y · Biz")
    rows = [
        ["코드", "분야", "등급", "주요 책임"],
        ["PM-01", "Product Manager / PM Lead", "고급", "범위·우선순위·리빙랩 의사결정"],
        ["PL-01", "Service Planner / 복지 기획", "고급", "생애주기·여정·권한 흐름 설계"],
        ["UX-01·02", "UX Lead + Designer", "고급·중급", "정보구조·접근성·당사자 모드·DS"],
        ["FE-01·02·03", "Frontend Lead + 2 Eng", "고급·중급·초급", "App Router·상태·접근성·UI"],
        ["BE-01·02·03", "Backend Lead + 2 Eng", "고급·중급", "API·권한 엔진·트랜잭션·Audit"],
        ["SEC-01", "Security & Compliance Lead", "고급", "개인정보·의료법·후견·침투 테스트"],
        ["LEG-01", "Legal Counsel (자문)", "고급", "의료법·개인정보·후견 문구 검토"],
        ["AI-01", "AI/LLM Engineer", "중급", "사진 분류·추이 분석·LLM 가드레일"],
        ["QA-01·02", "QA Lead + Engineer", "고급·중급", "테스트 전략·E2E·권한 매트릭스"],
        ["DEVOPS-01", "DevOps / Cloud Engineer", "중급", "NCP/AWS · CI/CD · 모니터링"],
        ["ACC-01", "Accessibility Consultant", "고급", "KWCAG·인지 접근성·당사자 자문"],
        ["BIZ-01", "Partnership / Field Coord", "중급", "시범 시설·보호자·교사 모집"],
    ]
    table_block(s, Cm(1.0), Cm(4.5),
                col_widths_cm=[3.5, 11, 4, 13], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")


def build_milestones(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · 마일스톤",
               "M0 Kickoff → M7 Beta 운영 회고",
               "W1 → W20 — 16주 MVP Beta + 4주 운영")
    rows = [
        ["마일스톤", "목표일", "완료 기준"],
        ["M0 Kickoff 완료", "W1", "범위·인력·리스크 등록 완료"],
        ["M1 Design 승인", "W3", "ERD · OpenAPI · 권한 정책 · Design Anchor 승인"],
        ["M2 Core Flow 시연", "W6", "가입→권한→기록→타임라인 E2E"],
        ["M3 Handover/AAC 시연", "W9", "AAC 동의 · 인계서 PDF · 권한 테스트 통과"],
        ["M4 Screening/Offline 시연", "W12", "K-DST · M-CHAT-R · AI 추이 · 오프라인 큐"],
        ["M5 U6/A11y 완료", "W14", "일반교사 화면 · 접근성 1차 통과"],
        ["M6 Beta Go/No-Go", "W16", "보안·법무·E2E·KPI 계측 기준 통과"],
        ["M7 Beta 운영 회고", "W20", "KPI Report · Living Lab Report · GA 백로그"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[10, 4, 17.5], rows=rows,
                row_h_cm=1.1, font_size=11, first_col_align="center")


def build_risk_register(prs, ctx):
    s = _slide(prs, ctx, "PART 06 · 리스크 매트릭스",
               "MVP Beta 핵심 리스크 및 대응 WBS",
               "8건 — 의료법·개인정보·권한·Audit·PWA·시범 모집")
    rows = [
        ["리스크", "영향", "대응 WBS"],
        ["의료법상 자가진단 오인", "출시 차단", "2.6 · 3.4 · 7.3 · 8.6 · 9.2"],
        ["개인정보 분리 동의 미흡", "출시 차단", "4.3 · 9.2"],
        ["권한 매트릭스 누락 (120셀)", "고위험", "2.4 · 4.4 · 6.6"],
        ["Audit Log 무결성 부족", "고위험", "4.5 · 9.2"],
        ["FR-69 사용성 미달 (15초 도달 실패)", "핵심 가치 저하", "3.6 · 5.1 · 5.2"],
        ["PWA/iOS 동기화 제약", "사용성 저하", "7.5 · 8.5"],
        ["시범 시설 모집 실패", "검증 지연", "1.5 · 9.5"],
        ["U6 일반교사 개인정보 입력 위험", "법적/학교 신뢰 리스크", "8.1 · 8.2 · 6.6"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[15, 7, 9.5], rows=rows,
                row_h_cm=1.2, font_size=11, first_col_align="center")


# ───── PART 7: GTM & Business ─────

def build_part7_divider(prs, ctx):
    divider_slide(prs, 7, "GTM & Business",
                  "Beachhead · 경쟁 · 가격 · 채택 채널 · 보호자 자조모임",
                  accent=PRIMARY_LIGHT, slogan=ctx['slogan'])
    ctx['page_next']()


def build_competitors(prs, ctx):
    s = _slide(prs, ctx, "PART 07 · 경쟁사 분석",
               "민간 SaaS 5종 + 공공 시스템 5종",
               "Recordare 차별점: 권한 매트릭스 5×20 + 생애주기 + AAC")
    rows_a = [
        ["#", "민간 서비스", "운영사", "주 사용자", "Recordare 차별점"],
        ["1", "케어아이", "(주)케어아이", "그룹홈·복지관 ERP", "인계서·당사자 모드 부재, 기관 폐쇄 DB"],
        ["2", "누리 자립지원", "사회복지법인 누리", "자립생활지원사", "일지만, 권한 매트릭스 없음"],
        ["3", "에이블링", "에이블링컴퍼니", "발달장애 부모 커뮤니티", "커뮤니티 중심, 기록 약함"],
        ["4", "베어베터 라이프", "베어베터", "발달장애 고용", "직장 일지 한정"],
        ["5", "우리집 케어 노트", "개인 개발자 앱", "보호자 개인 메모", "권한·인계 부재"],
    ]
    table_block(s, Cm(1.0), Cm(4.5),
                col_widths_cm=[1.5, 5.5, 5.5, 7, 12], rows=rows_a,
                row_h_cm=0.75, font_size=9, first_col_align="center")
    rows_b = [
        ["#", "공공 시스템", "운영기관", "데이터 범위", "Recordare 연계"],
        ["1", "행복e음 (사회보장)", "보건복지부", "사회복지 케이스", "v1.1 이연 연동"],
        ["2", "NEIS (학교생활기록부)", "교육부", "학적·IEP", "v1.1 이연 연동"],
        ["3", "발달재활서비스 정보", "한국사회보장정보원", "바우처 청구·기록", "FR-56 B2G 자동화"],
        ["4", "국민건강보험 의료정보", "건강보험공단", "의료 이력", "v2.0 이연"],
        ["5", "장애인 등록 정보", "보건복지부", "등록 등급·심사", "본인인증 시 자동 매칭"],
    ]
    table_block(s, Cm(1.0), Cm(10.5),
                col_widths_cm=[1.5, 5.5, 5.5, 7, 12], rows=rows_b,
                row_h_cm=0.75, font_size=9, first_col_align="center")


def build_pricing(prs, ctx):
    s = _slide(prs, ctx, "PART 07 · 가격 모델",
               "Free · Personal Plus · Facility (Small/Std/Enterprise)",
               "B2C 자녀당 9,900원 + B2B 이용자당 9,500~12,000원 + B2G 바우처")
    rows = [
        ["플랜", "대상", "과금 단위", "월 가격", "청구 주기"],
        ["Free", "보호자 개인", "—", "0원", "—"],
        ["Personal Plus", "보호자 (활동지원사 ≤3명 초청)", "자녀당", "9,900원", "월 자동"],
        ["Facility Small", "시설장 (이용자 ≤30명)", "이용자당", "12,000원", "월/연 (15% 할인)"],
        ["Facility Standard", "시설장 (31~80명)", "이용자당", "9,500원", "월/연"],
        ["Facility Enterprise", "시설장 (80명+)", "협의", "협의", "연 계약"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[5, 11, 5, 5, 5.5], rows=rows,
                row_h_cm=1.5, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(13.5), Cm(31.5), Cm(3), fill=SOFT_BG, line=PRIMARY)
    text(s, Cm(1.5), Cm(13.7), Cm(30), Cm(0.6),
         "💡 매출 분산 전략 (B2C : B2B : B2G = 50 : 30 : 20)",
         size=12, bold=True, color=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(14.3), Cm(30), Cm(2.0),
         "Risk #12 정부 정책 변화 시 단일 의존성 해소 · B2G 바우처 무효화 시나리오 대응",
         size=11, color=TEXT_DARK)


def build_beachhead(prs, ctx):
    s = _slide(prs, ctx, "PART 07 · Beachhead",
               "Beachhead Segment & GTM",
               "수도권 + 5대 광역시 도시 가정 + 그룹홈/특수학교 시범 8곳")
    rows = [
        ["축", "내용"],
        ["1차 사용자 (MVP Beta)", "보호자 100명 + 활동지원사 50명 + 통합학급 일반교사 25명 + 시범 시설 8곳"],
        ["비치헤드 세그먼트", "특수학교 5곳 (서울·경기) + 그룹홈 3곳 — 인구 밀도·디지털 친화 + 시설장 의사결정 속도"],
        ["GTM 채널", "(1) 한국지적발달장애인복지협회 추천 (2) 보건복지부 사회서비스 시범 (3) 활동지원사 협회 파트너십"],
        ["First Value", "가입 1h 안에 인계서 PDF 1장 다운로드 → \"이건 우리에게 도움이 된다\" 즉시 체감"],
        ["확산 전략", "보호자 → 활동지원사 → 시설장 → 사회복지사·교사 → B2G 바우처 매출"],
        ["3년 매출", "Base 5% 점유 시 가정 12,720 + 시설 152 + B2G 32억 = 약 180억"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[7, 24.5], rows=rows,
                row_h_cm=1.5, font_size=11, first_col_align="center")


def build_self_help(prs, ctx):
    s = _slide(prs, ctx, "PART 07 · 보호자 자조모임 ⭐",
               "v2.5 신규 — FR-74~83 (10건)",
               "에이블링 차별화 + 1주 잔존율 70%+ 달성 기여")
    rows = [
        ["KPI", "목표", "측정 시점"],
        ["KPI-C01 자조모임 첫 가입율", "≥ 40%", "온보딩 완료 후 M6"],
        ["KPI-C02 월 활성 참여율", "≥ 30%", "M6"],
        ["KPI-C03 게시판 글 1건+ 작성 비율", "≥ 20%", "M6"],
        ["KPI-C04 모임 일정 등록 건수", "≥ 10건/월 (100명 기준)", "M6"],
        ["KPI-C05 보호자 1주 잔존율 기여", "기존 KPI-01 70%+ 달성", "M6 코호트"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[16, 8.5, 7], rows=rows,
                row_h_cm=1.0, font_size=11, first_col_align="center")
    rounded(s, Cm(1.0), Cm(11.5), Cm(31.5), Cm(5), fill=ACCENT, line=ACCENT)
    text(s, Cm(1.5), Cm(11.7), Cm(30), Cm(0.6),
         "🛡 핵심 원칙 — 인증 보호자 전용 + 케어 데이터 완전 분리",
         size=12, bold=True, color=WHITE)
    text(s, Cm(1.5), Cm(12.4), Cm(30), Cm(4),
         "✓ 그룹: 생애주기 자동 매칭 (500명) + 자유 개설 (100명)\n"
         "✓ MVP 기능: 게시판 + 모임 일정 + RSVP + 리마인더 + 관리자 + 신고\n"
         "✓ 데이터: community Prisma 스키마 분리 (FR-83) — 자녀 기록·권한·인계서 노출 절대 금지\n"
         "✓ 채널: 기존 FR-35~38 알림 채널 재사용 + 모임 D-1·1시간 전 리마인더",
         size=11, color=WHITE, line_spacing=1.5)


# ───── PART 8: Closing ─────

def build_part8_divider(prs, ctx):
    divider_slide(prs, 8, "Closing",
                  "KPI · 거버넌스 · 로드맵 · Q&A — 마무리",
                  accent=ACCENT, slogan=ctx['slogan'])
    ctx['page_next']()


def build_kpi_summary(prs, ctx):
    s = _slide(prs, ctx, "PART 08 · KPI 종합",
               "MVP Beta 측정 지표 종합",
               "14 SC + 5 H + 5 KPI-C — 총 24개 핵심 측정 지표")
    metrics = [
        ("60%", "First Value 1h", PRIMARY_DARK),
        ("15초", "일지 1건 (-99%)", ACCENT),
        ("3분", "인계서 1건", PRIMARY),
        ("95%", "오프라인 동기화", LIFE_TRANSITION),
    ]
    for i, (val, label, color) in enumerate(metrics):
        x = Cm(1.0 + i * 7.95)
        metric(s, x, Cm(4.7), Cm(7.7), Cm(4.5), val, label, color=color)
    metrics2 = [
        ("4/5", "자문단 만족", LIFE_SCHOOL),
        ("30+", "NPS", LIFE_ADULT),
        ("0건", "Audit 누락 / LLM 위반", ALERT),
        ("70%+", "자가진단 도달", PRIMARY_DARK),
    ]
    for i, (val, label, color) in enumerate(metrics2):
        x = Cm(1.0 + i * 7.95)
        metric(s, x, Cm(10.0), Cm(7.7), Cm(4.5), val, label, color=color)
    rounded(s, Cm(1.0), Cm(15.5), Cm(31.5), Cm(1.5), fill=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(15.7), Cm(30), Cm(1.2),
         "📊 측정 인프라: PostHog/Mixpanel funnel · Sentry · UptimeRobot · 분기 NPS · 자문단 사용성 테스트",
         size=11, color=WHITE)


def build_governance(prs, ctx):
    s = _slide(prs, ctx, "PART 08 · 거버넌스",
               "법적 안전·컴플라이언스 매트릭스",
               "의료법 · 개인정보 · 후견 · 접근성 — 모든 분야 외부 자문")
    rows = [
        ["영역", "법령/표준", "Recordare 대응"],
        ["의료법 §27", "비의료인 의료행위 제한 판례",
         "FR-68 모든 자가진단 화면·PDF 면책 + LLM 가드레일 + 분기 감사"],
        ["개인정보 §23", "민감정보 처리 제한 + 별도 동의",
         "FR-15 분리 동의 + FR-13 AES-256 + FR-14 접근 알림·감사 로그"],
        ["개정 個情法 §35의2", "데이터 이동권",
         "FR-46 JSON 표준 스키마 내보내기"],
        ["개정 個情法 §39의2", "데이터 거주성 (국내 보존)",
         "NCP Naver Cloud 한국 리전 (NFR-08)"],
        ["민법 §938~959", "성년·한정·특정 후견",
         "FR-59~61 차등 권한 + §947 본인 의견 청취 의무"],
        ["민법 §947", "후견인 본인 의견 청취",
         "AAC 화면으로 본인 의견 항상 기록 (실권한과 별도)"],
        ["장애아동 복지지원법 §21", "발달재활서비스",
         "발달재활 이용 이력·기관·목표·회기별 변화 기록"],
        ["특수교육법 §22", "개별화교육 IEP",
         "특수교사·일반교사 메모 + IEP 연동 (NEIS v1.1)"],
        ["WCAG 2.1 AA / KWCAG 2.2", "웹 접근성",
         "NFR-05·09 + 한국웹접근성 인증 (M6 사전 평가)"],
        ["ISMS-P", "정보보호 관리체계",
         "NFR-03 침투 테스트 (M5W4·M6W4·연 2회) + GA 1.0 정식 인증"],
    ]
    table_block(s, Cm(1.0), Cm(4.4),
                col_widths_cm=[6, 8.5, 17], rows=rows,
                row_h_cm=1.05, font_size=10, first_col_align="center")


def build_roadmap(prs, ctx):
    s = _slide(prs, ctx, "PART 08 · 로드맵",
               "PoC → MVP Beta → GA 1.0 → v1.1 → v2.0",
               "24개월 전체 로드맵 — FR 01~83 누적")
    rows = [
        ["단계", "기간", "주요 산출물"],
        ["PoC", "M1-M2", "STT 폐기 후 빠른 선택 PoC · AI/Vision/OCR · 대법원 검증 · 빠른선택 UI"],
        ["MVP Beta ⭐", "M3-M6 (현재)", "28 FR · 7 NFR · 시범 8곳 · 보호자 100 · U3 50 · U6 25"],
        ["GA 1.0", "M7-M12", "B2B 결제·B2G 청구·18세 이양 전체·후견 차등·케이스 회의·시설장 모드"],
        ["v1.1", "M13-M18", "행복e음·NEIS 연동·K-SIB-R·VABS-3·구독 변경·B2G 청구 자동화"],
        ["v2.0", "M19-M24", "IoT·PHR·국민건강보험 API·해외 진출 검토"],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[5, 5.5, 21], rows=rows,
                row_h_cm=1.5, font_size=11, first_col_align="center")


def build_thank_you(prs, ctx):
    s = blank_slide(prs)
    rect(s, Cm(0), Cm(0), SLIDE_W, SLIDE_H, fill=PRIMARY_DARK)
    rect(s, Cm(0), Cm(0), Cm(0.6), SLIDE_H, fill=ACCENT)
    life_wave(s, SLIDE_H - Cm(0.45))
    header_bar(s, "Closing", ctx['page_next'](), ctx['total'])
    text(s, Cm(2), Cm(4.5), Cm(30), Cm(2),
         "Thank You", size=72, bold=True, color=WHITE)
    rect(s, Cm(2), Cm(7.5), Cm(3), Cm(0.15), fill=ACCENT)
    text(s, Cm(2), Cm(8.0), Cm(30), Cm(2.5),
         "당신의 삶, 단 하나의 기억으로",
         size=24, color=ACCENT, line_spacing=1.4)
    text(s, Cm(2), Cm(11.0), Cm(30), Cm(2.5),
         "Recordare · 레코다레\n"
         "지적장애인 자립을 위한 생애주기별 기록 및 권한 매칭 플랫폼",
         size=14, color=SECONDARY, line_spacing=1.6)
    rounded(s, Cm(2), Cm(15.0), Cm(15), Cm(2.0), fill=ACCENT, line=ACCENT)
    text(s, Cm(2), Cm(15.2), Cm(15), Cm(0.7),
         "Questions & Discussion",
         size=12, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    text(s, Cm(2), Cm(15.95), Cm(15), Cm(0.9),
         "PRD · BI · UX · Workflows · Plan · WBS — 모든 자료는 docs/ 하위",
         size=10, color=SECONDARY, align=PP_ALIGN.CENTER)
    text(s, SLIDE_W - Cm(12), SLIDE_H - Cm(1.3), Cm(11), Cm(0.6),
         ctx['slogan'], size=10, color=SECONDARY, align=PP_ALIGN.RIGHT)
