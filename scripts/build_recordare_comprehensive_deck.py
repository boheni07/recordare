"""
Recordare Comprehensive Deck v1 — 80 slides covering PRD, BI, UX, Workflows, Plan, WBS.
"""
from __future__ import annotations

from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Cm, Pt

from recordare_pptx_lib import (
    ACCENT, ALERT, BORDER, LIFE_ADULT, LIFE_INFANT, LIFE_SCHOOL,
    LIFE_SENIOR, LIFE_TRANSITION, PRIMARY, PRIMARY_DARK, PRIMARY_LIGHT,
    SECONDARY, SLIDE_H, SLIDE_W, SOFT_BG, TEXT_DARK, TEXT_MID, WHITE,
    blank_slide, card, content_slide, cover_slide, divider_slide,
    footer, header_bar, life_wave, metric, multi, no_line, rect,
    rounded, section_label, set_fill, set_line, step_chain, table_block,
    text, title_block, wireframe_box, review_chip,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "05-presentation" / "Recordare-Comprehensive-Deck-v1.pptx"
OUT.parent.mkdir(parents=True, exist_ok=True)

SLOGAN = "Comprehensive Project Deck v1"

# Will be set after total computed
TOTAL_SLIDES = 80
_PAGE = [0]


def page_next() -> int:
    _PAGE[0] += 1
    return _PAGE[0]


# ───────────────────────────────────────────────────────────
# Page-level builders (broken up into small functions)
# ───────────────────────────────────────────────────────────


def build_cover(prs):
    cover_slide(
        prs,
        brand_line="당신의 삶, 단 하나의 기억으로",
        sub="지적장애인 자립을 위한 생애주기별 기록 및 권한 매칭 플랫폼\n"
            "PRD v2.5 · BI v1.0 · UX v1.4 · Workflows v1.4 · Plan v1.4 · WBS MVP Beta",
        deck_label="Recordare Comprehensive Project Deck v1",
        date_str="2026-05-27 · 80 slides",
    )
    page_next()


def build_toc(prs):
    s = content_slide(prs, "Contents", page_next(), TOTAL_SLIDES,
                      "목차 — 8 Parts · 80 slides", "프로젝트 전체 문서 종합 발표자료", slogan=SLOGAN)
    parts = [
        ("PART 01", "Why Recordare", "P.04~11", "문제·시장·페르소나·비전 (8)"),
        ("PART 02", "Brand Identity", "P.12~20", "어원·슬로건·로고·컬러·톤 (9)"),
        ("PART 03", "Product / PRD", "P.21~37", "기능·FR 85건·자가진단·후견 (17)"),
        ("PART 04", "UX Structure", "P.38~50", "5+1역할 41화면 IA (13)"),
        ("PART 05", "Workflows", "P.51~60", "사용자·단위업무 워크플로우 (10)"),
        ("PART 06", "Plan & WBS", "P.61~70", "28 FR MVP Beta·16주·13인 (10)"),
        ("PART 07", "GTM & Business", "P.71~75", "경쟁·가격·비치헤드·자조모임 (5)"),
        ("PART 08", "Closing", "P.76~80", "KPI·거버넌스·로드맵·Q&A (5)"),
    ]
    y = Cm(4.6)
    for i, (no, title, page, desc) in enumerate(parts):
        col = i % 2
        row = i // 2
        x = Cm(1.5 + col * 15.5)
        cy = y + Cm(row * 2.5)
        rounded(s, x, cy, Cm(15.0), Cm(2.2), fill=SOFT_BG, line=BORDER, lw=0.5)
        rect(s, x, cy, Cm(0.2), Cm(2.2), fill=ACCENT)
        text(s, x + Cm(0.5), cy + Cm(0.2), Cm(3), Cm(0.6), no,
             size=11, bold=True, color=ACCENT)
        text(s, x + Cm(0.5), cy + Cm(0.75), Cm(8), Cm(0.7), title,
             size=15, bold=True, color=PRIMARY_DARK)
        text(s, x + Cm(11), cy + Cm(0.4), Cm(3.5), Cm(0.6), page,
             size=10, color=TEXT_MID, align=PP_ALIGN.RIGHT, bold=True)
        text(s, x + Cm(0.5), cy + Cm(1.45), Cm(14), Cm(0.6), desc,
             size=10, color=TEXT_DARK)


def build_executive_summary(prs):
    s = content_slide(prs, "Executive Summary", page_next(), TOTAL_SLIDES,
                      "한눈에 보는 Recordare", "4관점 핵심 요약 (PRD v2.5 기준)", slogan=SLOGAN)
    rows = [
        ["관점", "내용 (v1.0 → v2.5 누적)"],
        ["Problem", "기록 단절·행정 부담·자기결정권 배제 + 진입 장벽·오프라인 누락·알림 부재 + 18세 이양·B2G·후견 분기 + 자가진단 부재 + 시설 환경 STT 부적합 + 통합학급 사각지대 + 보호자 고립"],
        ["Solution", "통합 타임라인 + 다중 입력 4종(STT 폐기) + 권한 이행 + 3분 인계서 + 7단계 온보딩 + 오프라인 큐 + 자가진단 6종 + AI 추이 + U6 일반교사 + 보호자 자조모임"],
        ["Function/UX", "일지 30분→15초(-99%) · 인계서 2주→3분 · First Value 1h · 자가진단 도달 70%+ · 통합학급 메모 <30초 · 환경무관 100% 입력 · 자조모임 가입 40%+"],
        ["Core Value", "\"환경 무관·부담 없이·15초에 — 전 생애·전 사용자·전 채널에서 누락 없이 운영되며, 의료 진단이 아닌 삶의 변화로 기록되는 자립의 토대\""],
    ]
    table_block(s, Cm(1.0), Cm(4.5),
                col_widths_cm=[3.5, 27.5], rows=rows,
                row_h_cm=2.5, font_size=10, first_col_align="center")


# ────────── PART 1: Why Recordare ──────────


def build_part1_divider(prs):
    divider_slide(prs, 1, "Why Recordare",
                  "기록 단절·행정 부담·자기결정권 배제 — 그리고 우리가 해결하는 6대 페인포인트",
                  accent=LIFE_INFANT, slogan=SLOGAN)
    page_next()


def build_problem(prs):
    s = content_slide(prs, "PART 01 · Problem", page_next(), TOTAL_SLIDES,
                      "왜 지금 Recordare인가?",
                      "발달장애 26.2만 명 + 가족 78만 명의 기록 단절 — 보건복지부 2024", slogan=SLOGAN)
    y = Cm(4.8)
    cards = [
        ("📁 기록 단절", "기관 이동마다\n2주씩 적응 기간",
         "\"30년 모은 노트를\n누가 다 봐주겠어요?\"\n— 박순영 (보호자)"),
        ("✍️ 행정 부담", "일 평균 30분\n일지 작성 부담",
         "\"퇴근하고도 30분 더\n일하는 게 진짜 힘들어요.\"\n— 이수진 (활동지원사)"),
        ("🤝 결정권 배제", "평생 보호자\n동의에 의존",
         "\"엄마, 이건 내가\n할게요.\"\n— 김민지 (당사자, 17세)"),
    ]
    for i, (ttl, sub, quote) in enumerate(cards):
        x = Cm(1.5 + i * 10.5)
        rounded(s, x, y, Cm(9.5), Cm(11), fill=SOFT_BG, line=BORDER, lw=0.8)
        rect(s, x, y, Cm(9.5), Cm(1.2), fill=PRIMARY)
        text(s, x, y + Cm(0.25), Cm(9.5), Cm(0.8), ttl,
             size=18, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x + Cm(0.5), y + Cm(1.8), Cm(8.5), Cm(2.5), sub,
             size=15, bold=True, color=PRIMARY_DARK,
             align=PP_ALIGN.CENTER, line_spacing=1.4)
        rect(s, x + Cm(3.5), y + Cm(5.0), Cm(2.5), Cm(0.08), fill=ACCENT)
        text(s, x + Cm(0.5), y + Cm(5.5), Cm(8.5), Cm(5),
             quote, size=12, color=TEXT_DARK,
             align=PP_ALIGN.CENTER, line_spacing=1.5)


def build_six_pains(prs):
    s = content_slide(prs, "PART 01 · 6대 페인포인트", page_next(), TOTAL_SLIDES,
                      "v1.0 핵심 3 + v2.0~v2.5 신규 3",
                      "리빙랩 #01 의사결정 + CTO팀 검토 + 보호자 직접 요청 누적", slogan=SLOGAN)
    rows = [
        ["#", "페인포인트", "원천", "영향도", "대응 FR"],
        ["①", "기록 단절 (기관 전환 2주 적응)", "v1.0 §3", "긴급", "FR-08, FR-09"],
        ["②", "행정 부담 (일 30분 일지·인계 2주)", "v1.0 §3", "긴급", "FR-05, FR-09"],
        ["③", "자기결정권 배제 (평생 보호자 동의)", "v1.0 §3", "긴급", "FR-11, FR-17~19"],
        ["④", "신규 보호자 진입 장벽 (\"어디서부터?\")", "v2.0 §7", "높음", "FR-25~29"],
        ["⑤", "오프라인 환경 기록 누락 (산간·시설)", "v2.0 §8", "높음", "FR-30~34"],
        ["⑥", "시설 환경 STT 부적합 (점심·교실 부담)", "리빙랩 #01", "긴급", "FR-69 다중 입력 4종"],
        ["⑦", "통합학급 일반교사 사각지대", "리빙랩 YK1", "긴급", "FR-72, FR-73 (U6)"],
        ["⑧", "후견인 위조 사기 위험", "리빙랩 PB1", "긴급", "FR-71 얼굴 인증"],
        ["⑨", "신규 보호자 고립 (\"혼자 쓰는 느낌\")", "v2.5 §22", "중간", "FR-74~83 자조모임"],
    ]
    table_block(s, Cm(1.0), Cm(4.8),
                col_widths_cm=[1.5, 13, 6, 3, 8.5], rows=rows,
                row_h_cm=0.9, font_size=10, first_col_align="center")


def build_market_size(prs):
    s = content_slide(prs, "PART 01 · 시장 규모", page_next(), TOTAL_SLIDES,
                      "TAM / SAM / SOM — 시장 산정 워크시트",
                      "보건복지부 2024 + 한국활동지원사협회 + 사회복지시설 정보시스템", slogan=SLOGAN)
    y = Cm(4.7)
    metric(s, Cm(1.0), y, Cm(9.5), Cm(4.5), "약 4,500억", "TAM (연)\n발달장애 가정 78만 + 시설 8,000 + 발달재활 1,243억", color=PRIMARY_DARK)
    metric(s, Cm(11.5), y, Cm(9.5), Cm(4.5), "약 1,200억", "SAM (연)\n수도권+5대 광역시 가정 50.7만 + 시설 3,040곳", color=PRIMARY)
    metric(s, Cm(22.0), y, Cm(9.5), Cm(4.5), "약 180억", "SOM (3년 누적)\nBase 5% 점유 시 가정 12,720 + 시설 152 + B2G 32억", color=ACCENT)
    rows = [
        ["세그먼트", "모수", "ARPU(월)", "연 합산"],
        ["발달장애 가정", "78만", "9,900~12,000원", "1,123억"],
        ["그룹홈/거주시설", "8,000곳", "30만원/시설", "288억"],
        ["활동지원사 (자격증)", "4만명", "0 (간접)", "—"],
        ["발달재활서비스 바우처 (B2G)", "—", "—", "1,243억"],
        ["사단법인·보험사 등 부수", "—", "—", "1,846억"],
    ]
    table_block(s, Cm(1.0), Cm(10.3),
                col_widths_cm=[10, 6, 7, 9], rows=rows,
                row_h_cm=0.75, font_size=10, first_col_align="center")


def build_lifecycle(prs):
    s = content_slide(prs, "PART 01 · 5단계 생애주기", page_next(), TOTAL_SLIDES,
                      "Recordare의 핵심 Taxonomy",
                      "영유아·학령·전환·성인·고령 — 색상·픽토그램·UX·기록·법적 근거가 모두 이 5단계 위에 정렬", slogan=SLOGAN)
    stages = [
        ("영유아기", "0~6세", LIFE_INFANT,
         "발달·건강 중심",
         "K-DST · M-CHAT-R\n건강검진 · 발달재활"),
        ("학령기", "7~14세", LIFE_SCHOOL,
         "교육·생활 적응",
         "IEP · 학교생활\n또래관계 · U6 메모"),
        ("전환기", "15~24세", LIFE_TRANSITION,
         "자립·권한 이행",
         "AIR-SDS · 진로\n18세 이양 · AAC"),
        ("성인기", "25~64세", LIFE_ADULT,
         "생활·고용·서비스",
         "주거·고용·인계\n후견·권한관리"),
        ("고령기", "65세+", LIFE_SENIOR,
         "건강·돌봄 연속성",
         "만성질환·낙상\n인지·장기돌봄"),
    ]
    w = Cm(6.2)
    y = Cm(5.0)
    for i, (name, age, color, theme, recs) in enumerate(stages):
        x = Cm(1.0 + i * 6.4)
        rounded(s, x, y, w, Cm(11.5), fill=WHITE, line=color, lw=1.5)
        rect(s, x, y, w, Cm(1.6), fill=color)
        text(s, x, y + Cm(0.15), w, Cm(0.7), name,
             size=15, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x, y + Cm(0.9), w, Cm(0.6), age,
             size=11, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x + Cm(0.3), y + Cm(2.0), w - Cm(0.6), Cm(0.8),
             theme, size=12, bold=True, color=PRIMARY_DARK,
             align=PP_ALIGN.CENTER)
        rect(s, x + Cm(1.5), y + Cm(3.0), Cm(3.0), Cm(0.06), fill=color)
        text(s, x + Cm(0.3), y + Cm(3.3), w - Cm(0.6), Cm(8.0),
             recs, size=11, color=TEXT_DARK,
             align=PP_ALIGN.CENTER, line_spacing=1.5)


def build_personas_1(prs):
    s = content_slide(prs, "PART 01 · 페르소나 1/2", page_next(), TOTAL_SLIDES,
                      "9대 페르소나 — 당사자·보호자·전문가",
                      "U1·U2·U3·U6 — 4명의 핵심 사용자", slogan=SLOGAN)
    personas = [
        ("U1 당사자", "김민지 17세", LIFE_TRANSITION,
         "경계성 지적장애 · AAC·쉬운말 사용\n학교 자립생활 수업에서 본인 계정 사용",
         "\"내가 직접 결정하고 싶다\""),
        ("U2 보호자", "박순영 54세", PRIMARY,
         "딸의 30년 기록을 바인더로 보관\n기관 이동 시마다 2주 적응 부담",
         "\"끊김 없이 평생 기록·인계하고 싶다\""),
        ("U3 활동지원사", "이수진 35세", ACCENT,
         "주당 5가구 4시간 방문\n시설 점심·이용자 옆에서 STT 부담",
         "\"15초 빠른 선택, 환경 무관 입력\""),
        ("U6 일반교사", "윤교사 35세 ⭐v2.4", LIFE_SCHOOL,
         "통합학급 일반 25명 + 통합 1~2명\n주 2~3회 짧은 메모",
         "\"통합 학생 케어 사각지대 해소\""),
    ]
    cols, w, h = 2, Cm(15.5), Cm(5.5)
    for i, (code, name, color, body, quote) in enumerate(personas):
        x = Cm(1.0 + (i % cols) * 16.0)
        y = Cm(4.7 + (i // cols) * 6.0)
        rounded(s, x, y, w, h, fill=SOFT_BG, line=BORDER, lw=0.5)
        rect(s, x, y, Cm(0.2), h, fill=color)
        text(s, x + Cm(0.4), y + Cm(0.3), Cm(8), Cm(0.7), code,
             size=14, bold=True, color=color)
        text(s, x + Cm(0.4), y + Cm(1.0), Cm(14), Cm(0.7), name,
             size=13, bold=True, color=PRIMARY_DARK)
        text(s, x + Cm(0.4), y + Cm(1.9), w - Cm(0.8), Cm(2.0),
             body, size=11, color=TEXT_DARK, line_spacing=1.4)
        text(s, x + Cm(0.4), y + Cm(4.0), w - Cm(0.8), Cm(1.3),
             quote, size=11, bold=True, color=color, line_spacing=1.4)


def build_personas_2(prs):
    s = content_slide(prs, "PART 01 · 페르소나 2/2", page_next(), TOTAL_SLIDES,
                      "9대 페르소나 — 전문가·시설·후견·신규",
                      "U4·U5·후견인·신규 보호자·박변호사 — 부수 사용자", slogan=SLOGAN)
    personas = [
        ("U4 사회복지사·특수교사", "최주임·한교사", PRIMARY_DARK,
         "케이스당 분기 1회 회의자료\n60분 → 3분 자동 생성 (FR-53)",
         "케이스 효율 + 보고서 자동화"),
        ("U5 시설장", "정원장 52세", LIFE_ADULT,
         "그룹홈 정원 12명 · 활동지원사 5명\n분기 인계서 일괄·B2G 청구",
         "12~80명 다중 관리 + 결제·감사 일괄"),
        ("후견인", "성년·한정·특정", ALERT,
         "민법 §938~§959 후견 결정문 보유\nFR-71 얼굴 인증 + 차등 권한",
         "본인 의견 청취 의무 (민법 §947)"),
        ("신규 진단 보호자", "김하준 모 (2세)", LIFE_INFANT,
         "신규 진단 직후 막연한 불안\nK-DST·M-CHAT-R 도구로 객관 점검",
         "\"진단 아닌 관찰 기록\""),
        ("박변호사 (자문)", "리빙랩 PB1", LIFE_SENIOR,
         "Risk #9 후견 위조 방어\nFR-71 얼굴 인증 PoC 권장",
         "\"법적 안전 = 신뢰의 핵심\""),
    ]
    for i, (code, name, color, body, quote) in enumerate(personas):
        col = i % 3
        row = i // 3
        x = Cm(1.0 + col * 10.5)
        y = Cm(4.7 + row * 5.8)
        rounded(s, x, y, Cm(10.0), Cm(5.3), fill=SOFT_BG, line=BORDER, lw=0.5)
        rect(s, x, y, Cm(0.2), Cm(5.3), fill=color)
        text(s, x + Cm(0.4), y + Cm(0.3), Cm(9), Cm(0.7), code,
             size=12, bold=True, color=color)
        text(s, x + Cm(0.4), y + Cm(0.9), Cm(9), Cm(0.6), name,
             size=11, bold=True, color=PRIMARY_DARK)
        text(s, x + Cm(0.4), y + Cm(1.7), Cm(9.2), Cm(2.5),
             body, size=10, color=TEXT_DARK, line_spacing=1.4)
        text(s, x + Cm(0.4), y + Cm(4.2), Cm(9.2), Cm(1.0),
             quote, size=10, bold=True, color=color, line_spacing=1.3)


def build_vision_mission(prs):
    s = content_slide(prs, "PART 01 · Vision & Mission", page_next(), TOTAL_SLIDES,
                      "브랜드 본질과 5대 핵심 가치",
                      "마음에 새기는 기억, 스스로 자라는 삶", slogan=SLOGAN)
    rounded(s, Cm(1.0), Cm(4.7), Cm(15.5), Cm(2.5), fill=PRIMARY_DARK, line=PRIMARY_DARK, lw=0)
    text(s, Cm(1.3), Cm(4.85), Cm(15), Cm(0.7), "MISSION",
         size=11, bold=True, color=ACCENT)
    text(s, Cm(1.3), Cm(5.45), Cm(15), Cm(1.8),
         "모든 지적장애인 당사자의 삶이 기억되고,\n그 기억이 자립의 힘이 되도록",
         size=14, bold=True, color=WHITE, line_spacing=1.4)
    rounded(s, Cm(17.0), Cm(4.7), Cm(15.5), Cm(2.5), fill=PRIMARY, line=PRIMARY, lw=0)
    text(s, Cm(17.3), Cm(4.85), Cm(15), Cm(0.7), "VISION 2030",
         size=11, bold=True, color=SECONDARY)
    text(s, Cm(17.3), Cm(5.45), Cm(15), Cm(1.8),
         "국내 모든 발달장애 관련 기관에서\nRecordare가 표준 기록 플랫폼이 된다",
         size=14, bold=True, color=WHITE, line_spacing=1.4)

    values = [
        ("연속성", "Continuity", "기록은 끊기지 않는다", PRIMARY),
        ("존엄", "Dignity", "당사자는 기록의 주인", ACCENT),
        ("신뢰", "Trust", "민감 정보를 안전하게", PRIMARY_DARK),
        ("접근성", "Accessibility", "누구나 쉽게 (AAC)", LIFE_SCHOOL),
        ("성장", "Growth", "기록이 쌓여 자립이 됨", LIFE_TRANSITION),
    ]
    w = Cm(6.0)
    for i, (k, en, body, color) in enumerate(values):
        x = Cm(1.0 + i * 6.4)
        y = Cm(8.0)
        rounded(s, x, y, w, Cm(8.5), fill=WHITE, line=color, lw=1.5)
        rect(s, x, y, w, Cm(1.3), fill=color)
        text(s, x, y + Cm(0.15), w, Cm(0.6), k,
             size=15, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x, y + Cm(0.75), w, Cm(0.5), en,
             size=10, color=SECONDARY, align=PP_ALIGN.CENTER)
        text(s, x + Cm(0.3), y + Cm(2.0), w - Cm(0.6), Cm(5),
             body, size=12, color=TEXT_DARK,
             align=PP_ALIGN.CENTER, line_spacing=1.5)


# ────────── PART 2: Brand Identity ──────────


def build_part2_divider(prs):
    divider_slide(prs, 2, "Brand Identity",
                  "Recordare 라틴어 어원 + Overlapping Life Wave 로고 + 5단계 컬러 시스템",
                  accent=PRIMARY_LIGHT, slogan=SLOGAN)
    page_next()


def build_brand_etymology(prs):
    s = content_slide(prs, "PART 02 · 어원", page_next(), TOTAL_SLIDES,
                      "Recordare — 마음에 다시 새기다",
                      "라틴어 recordari — re(다시) + cor(심장·마음) = to remember", slogan=SLOGAN)
    layers = [
        ("라틴어 recordari", "기억하다 · 회상하다", PRIMARY_DARK,
         "re(다시) + cor(심장·마음)\n→ 마음에 다시 새기다"),
        ("영어 Record", "기록하다 · 기록", PRIMARY,
         "현대적 기능 표현\n시각적 즉시 인식"),
        ("이탈리아·포르투갈 -are", "동사 원형 어미", ACCENT,
         "글로벌 친숙감\n다국어 확장 용이"),
    ]
    y = Cm(4.8)
    for i, (head, sub, color, body) in enumerate(layers):
        x = Cm(1.0 + i * 10.5)
        rounded(s, x, y, Cm(10.0), Cm(5.5), fill=SOFT_BG, line=color, lw=1.2)
        rect(s, x, y, Cm(10.0), Cm(1.5), fill=color)
        text(s, x, y + Cm(0.2), Cm(10), Cm(0.7), head,
             size=16, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x, y + Cm(0.9), Cm(10), Cm(0.5), sub,
             size=11, color=SECONDARY, align=PP_ALIGN.CENTER)
        text(s, x + Cm(0.5), y + Cm(2.0), Cm(9), Cm(3),
             body, size=13, color=TEXT_DARK,
             align=PP_ALIGN.CENTER, line_spacing=1.6)
    rounded(s, Cm(1.0), Cm(11.5), Cm(31.5), Cm(3.5), fill=PRIMARY_DARK, line=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(11.8), Cm(30), Cm(0.7), "핵심 의미",
         size=11, bold=True, color=ACCENT)
    text(s, Cm(1.5), Cm(12.4), Cm(30), Cm(2.5),
         "단순한 데이터 저장이 아닌, 마음에 새기는 \"살아있는 기억\" — "
         "지적장애인 당사자의 삶이 기록을 통해 연결·보존되고, 그 기억이 자립의 토대가 됨.",
         size=14, color=WHITE, line_spacing=1.5)
    rounded(s, Cm(1.0), Cm(15.5), Cm(31.5), Cm(2.5), fill=SECONDARY, line=BORDER)
    text(s, Cm(1.5), Cm(15.7), Cm(30), Cm(0.6), "발음 가이드",
         size=10, bold=True, color=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(16.2), Cm(30), Cm(1.7),
         "한국어 (권장): 레-코-다-레 (4음절 균등 강세)   ·   "
         "영어: reh-cor-DAH-reh (3번째 음절 강세)   ·   "
         "라틴어 원음: reh-KOR-dah-reh",
         size=12, color=TEXT_DARK, line_spacing=1.5)


def build_slogans(prs):
    s = content_slide(prs, "PART 02 · 슬로건", page_next(), TOTAL_SLIDES,
                      "메인 + 4종 서브 슬로건",
                      "당사자·보호자·전문가·임팩트 투자 대상별 차별 카피", slogan=SLOGAN)
    rounded(s, Cm(1.0), Cm(4.7), Cm(31.5), Cm(3.0), fill=PRIMARY_DARK)
    text(s, Cm(1.5), Cm(4.9), Cm(15), Cm(0.6), "MAIN SLOGAN",
         size=11, bold=True, color=ACCENT)
    text(s, Cm(1.5), Cm(5.6), Cm(30), Cm(2),
         "\"당신의 삶, 단 하나의 기억으로\"",
         size=26, bold=True, color=WHITE, line_spacing=1.3)
    subs = [
        ("기관·전문가 (B2B/B2G)", "기록은 이어지고, 돌봄은 함께", PRIMARY),
        ("보호자 (B2C)", "기록은 끊기지 않고, 권한은 당사자에게 자란다", ACCENT),
        ("당사자 (AAC·쉬운말)", "내 이야기는 계속됩니다", LIFE_TRANSITION),
        ("임팩트 투자·사회적기업", "작은 기록이 쌓여, 스스로 서는 힘이 됩니다", LIFE_SCHOOL),
    ]
    y = Cm(8.5)
    for i, (target, slo, color) in enumerate(subs):
        col = i % 2
        row = i // 2
        x = Cm(1.0 + col * 16.0)
        cy = y + Cm(row * 4.2)
        rounded(s, x, cy, Cm(15.5), Cm(3.7), fill=SOFT_BG, line=color, lw=1)
        rect(s, x, cy, Cm(15.5), Cm(0.9), fill=color)
        text(s, x + Cm(0.3), cy + Cm(0.15), Cm(15), Cm(0.6),
             target, size=11, bold=True, color=WHITE)
        text(s, x + Cm(0.5), cy + Cm(1.3), Cm(14.5), Cm(2.2),
             f"\"{slo}\"", size=15, bold=True, color=PRIMARY_DARK,
             line_spacing=1.5)


def build_colors(prs):
    s = content_slide(prs, "PART 02 · Color", page_next(), TOTAL_SLIDES,
                      "5단계 생애주기 컬러 + 브랜드 팔레트",
                      "WCAG 2.1 AA + 색약 대응 (패턴/아이콘 동반)", slogan=SLOGAN)
    text(s, Cm(1.0), Cm(4.6), Cm(20), Cm(0.6),
         "Lifecycle 5 Colors", size=13, bold=True, color=PRIMARY_DARK)
    life_colors = [
        ("Infant", "#FFC857", LIFE_INFANT, "0-6"),
        ("School", "#5CB85C", LIFE_SCHOOL, "7-17"),
        ("Transition", "#3B82F6", LIFE_TRANSITION, "18-24"),
        ("Adult", "#7C3AED", LIFE_ADULT, "25-64"),
        ("Senior", "#6B7280", LIFE_SENIOR, "65+"),
    ]
    y = Cm(5.4)
    for i, (name, hex_, color, age) in enumerate(life_colors):
        x = Cm(1.0 + i * 6.4)
        rect(s, x, y, Cm(6.0), Cm(3.0), fill=color)
        text(s, x, y + Cm(0.4), Cm(6.0), Cm(0.8), name,
             size=15, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x, y + Cm(1.3), Cm(6.0), Cm(0.6), age,
             size=11, color=WHITE, align=PP_ALIGN.CENTER)
        text(s, x, y + Cm(1.95), Cm(6.0), Cm(0.6), hex_,
             size=10, color=WHITE, align=PP_ALIGN.CENTER)
    text(s, Cm(1.0), Cm(9.0), Cm(20), Cm(0.6),
         "Brand Palette", size=13, bold=True, color=PRIMARY_DARK)
    brand_colors = [
        ("Primary", "#2D6A4F", PRIMARY, "Growth"),
        ("Primary Dark", "#1B4D37", PRIMARY_DARK, "Header"),
        ("Accent", "#E07A5F", ACCENT, "Hope"),
        ("Secondary", "#F5F0E8", SECONDARY, "Warm"),
        ("Alert", "#F2A93B", ALERT, "Alert"),
    ]
    y2 = Cm(9.8)
    for i, (name, hex_, color, desc) in enumerate(brand_colors):
        x = Cm(1.0 + i * 6.4)
        rect(s, x, y2, Cm(6.0), Cm(3.0), fill=color, line=BORDER, lw=0.5)
        is_light = color == SECONDARY
        txt_color = TEXT_DARK if is_light else WHITE
        text(s, x, y2 + Cm(0.4), Cm(6.0), Cm(0.8), name,
             size=14, bold=True, color=txt_color, align=PP_ALIGN.CENTER)
        text(s, x, y2 + Cm(1.3), Cm(6.0), Cm(0.6), hex_,
             size=10, color=txt_color, align=PP_ALIGN.CENTER)
        text(s, x, y2 + Cm(1.95), Cm(6.0), Cm(0.6), desc,
             size=10, color=txt_color, align=PP_ALIGN.CENTER)


def build_logo_concepts(prs):
    s = content_slide(prs, "PART 02 · Logo", page_next(), TOTAL_SLIDES,
                      "로고 컨셉 — Overlapping Life Wave 외 4방향",
                      "단순성·확장성·접근성·온기·생애주기 은유 5원칙", slogan=SLOGAN)
    concepts = [
        ("⭐ Overlapping Life Wave", PRIMARY_DARK,
         "5단계 생애주기 곡선이 겹쳐지며\n끊기지 않는 기록의 연속성 표현", "확정"),
        ("A. Leaf Vein Timeline", PRIMARY,
         "잎맥 구조 = 생애주기 타임라인\n중심 줄기(당사자) + 가지(이해관계자)", "초안"),
        ("B. Connecting Links", LIFE_TRANSITION,
         "○─○─○─○ 원의 크기 증가\n기관 간 기록 연결 시각화", "초안"),
        ("C. R + Heart", ACCENT,
         "R 자 안에 심장(cor) 형태\n라틴어 어원 직접 표현", "초안"),
        ("D. Spiral Timeline", LIFE_ADULT,
         "나선형 성장 곡선\n연속성·축적 표현", "초안"),
    ]
    for i, (name, color, desc, status) in enumerate(concepts):
        col = i % 3
        row = i // 3
        x = Cm(1.0 + col * 10.5)
        y = Cm(4.7 + row * 6.0)
        rounded(s, x, y, Cm(10.0), Cm(5.5), fill=SOFT_BG, line=color, lw=1.2)
        rect(s, x, y, Cm(10.0), Cm(1.2), fill=color)
        text(s, x + Cm(0.3), y + Cm(0.25), Cm(7.5), Cm(0.7), name,
             size=12, bold=True, color=WHITE)
        rounded(s, x + Cm(8.0), y + Cm(0.2), Cm(1.7), Cm(0.7),
                fill=WHITE, line=color, lw=0.5, adj=0.5)
        text(s, x + Cm(8.0), y + Cm(0.25), Cm(1.7), Cm(0.65),
             status, size=9, bold=True, color=color, align=PP_ALIGN.CENTER)
        text(s, x + Cm(0.5), y + Cm(2.0), Cm(9), Cm(3.0),
             desc, size=11, color=TEXT_DARK, line_spacing=1.5)


def build_copies(prs):
    s = content_slide(prs, "PART 02 · 카피", page_next(), TOTAL_SLIDES,
                      "메인 카피 4버전 — 페르소나별",
                      "보호자 감성 · 전문가 공감 · 당사자 존엄 · 미래 지향", slogan=SLOGAN)
    copies = [
        ("A. 보호자 감성", PRIMARY,
         "\"30년을 바인더에 담아온\n부모님의 노력이,\n이제 클릭 하나로 전달됩니다.\""),
        ("B. 전문가 공감", ACCENT,
         "\"오늘 선생님이 적은 한 줄이,\n10년 후 새로운 선생님의\n첫 인사가 됩니다.\""),
        ("C. 당사자 존엄", LIFE_TRANSITION,
         "\"학교가 바뀌어도, 선생님이 바뀌어도.\n당신의 이야기는 처음부터\n다시 시작하지 않아도 됩니다.\""),
        ("D. 미래 지향 (캠페인용)", LIFE_SCHOOL,
         "\"오늘의 기록이,\n내일의 자립이 됩니다.\""),
    ]
    for i, (label, color, body) in enumerate(copies):
        col = i % 2
        row = i // 2
        x = Cm(1.0 + col * 16.0)
        y = Cm(4.8 + row * 6.0)
        rounded(s, x, y, Cm(15.5), Cm(5.5), fill=SOFT_BG, line=color, lw=1.2)
        rect(s, x, y, Cm(15.5), Cm(1.0), fill=color)
        text(s, x + Cm(0.3), y + Cm(0.2), Cm(15), Cm(0.6),
             label, size=12, bold=True, color=WHITE)
        text(s, x + Cm(0.8), y + Cm(1.4), Cm(14), Cm(3.8),
             body, size=15, color=PRIMARY_DARK, line_spacing=1.7)


def build_user_xp(prs):
    s = content_slide(prs, "PART 02 · UX", page_next(), TOTAL_SLIDES,
                      "사용자 유형별 브랜드 경험",
                      "키워드 · 슬로건 · UI 원칙 · 메인 컬러 — 5종", slogan=SLOGAN)
    rows = [
        ["사용자", "키워드", "노출 슬로건", "UI 원칙", "메인 컬러"],
        ["당사자", "존중·쉬움·내 것", "내 이야기는 계속됩니다", "큰 픽토그램·음성·Yes/No", "Accent"],
        ["보호자", "안심·준비·이어짐", "권한은 당사자에게 자란다", "진행률·법적 안전 배지", "Primary"],
        ["활동지원사", "효율·전문성·인정", "기록은 이어지고, 돌봄은 함께", "빠른선택 최전면·1탭", "Primary"],
        ["사회복지사·교사", "효율·전문성·인정", "기록은 이어지고, 돌봄은 함께", "회의자료 자동 생성", "Primary"],
        ["시설장 (B2B)", "컴플라이언스·효율", "당신의 삶, 단 하나의 기억으로", "KPI·권한 일괄·감사", "차콜+Primary"],
    ]
    table_block(s, Cm(1.0), Cm(5.0),
                col_widths_cm=[5, 6, 9, 8.5, 3.5], rows=rows,
                row_h_cm=1.4, font_size=10, first_col_align="center")


def build_voice_taboo(prs):
    s = content_slide(prs, "PART 02 · Voice", page_next(), TOTAL_SLIDES,
                      "Brand Voice 6대 상황 + 금지표현 5종",
                      "차별·시혜·기술 약어 회피 + 사람 중심 어휘", slogan=SLOGAN)
    rows = [
        ["상황", "톤", "예시"],
        ["랜딩 페이지", "공감 + 희망", "\"더 이상 처음부터 다시 시작하지 않아도 됩니다.\""],
        ["온보딩", "따뜻 + 안내", "\"걱정 마세요. 차근차근 함께 할게요.\""],
        ["오류 메시지", "친근 + 명확", "\"잠깐, 연결이 끊겼어요. 기록은 안전합니다.\""],
        ["권한 경고", "진중 + 명확", "\"OO 선생님 권한이 7일 후 만료됩니다.\""],
        ["당사자 UI", "쉬운 말 + 밝음", "\"잘 했어요! 선생님이 이제 알게 됐어요.\""],
        ["B2B 영업", "전문 + 신뢰", "\"ISMS-P 인증 기반, 법적 요건 충족 유일 플랫폼.\""],
    ]
    table_block(s, Cm(1.0), Cm(4.7),
                col_widths_cm=[5, 4, 22.5], rows=rows,
                row_h_cm=0.85, font_size=10, first_col_align="center")
    y = Cm(12.2)
    rounded(s, Cm(1.0), y, Cm(31.5), Cm(3.5), fill=SOFT_BG, line=ACCENT, lw=1)
    text(s, Cm(1.5), y + Cm(0.2), Cm(20), Cm(0.6), "금지표현 (Voice Off-Limits)",
         size=12, bold=True, color=ACCENT)
    taboos = [
        "X \"장애우\" -> O \"당사자\" 또는 \"지적장애인\"",
        "X \"불쌍한·힘든\" 동정적 표현 지양",
        "X \"관리\" -> O \"기록·지원\" (관리 대상화 X)",
        "X \"정상인\" 등 비교·차별 표현 전면 금지",
        "X STT·LLM 등 기술 약어 일반 사용자 노출 지양",
    ]
    for i, t in enumerate(taboos):
        col = i % 2
        row = i // 2
        text(s, Cm(1.5 + col * 16), y + Cm(1.0 + row * 0.55),
             Cm(15), Cm(0.5), t, size=10, color=TEXT_DARK)


def build_naming(prs):
    s = content_slide(prs, "PART 02 · Naming", page_next(), TOTAL_SLIDES,
                      "10개 후보 비교 -> Recordare 최종 확정",
                      "언어 감성 · 포지셔닝 · 글로벌 확장성 · 핵심 강조", slogan=SLOGAN)
    rows = [
        ["#", "네이밍", "감성", "포지셔닝", "글로벌", "핵심 강조"],
        ["01", "WithCare", "따뜻함", "B2C/B2B", "***",  "돌봄 공동체"],
        ["02", "Recordare", "기능적", "B2B/B2G", "***", "기록 자산화"],
        ["03", "이음 IEUM", "정서적", "B2C", "**", "연결·이어짐"],
        ["04", "자람 JARAM", "희망적", "B2C", "**", "성장·자립"],
        ["05 (선정)", "Recordare", "품격있음", "B2G/임팩트", "*****", "살아있는 기억"],
        ["06", "리프 LEAF", "자연적", "B2C/투자", "***",  "성장의 증거"],
        ["07", "케어패스", "여정적", "B2B/B2G", "***", "생애 경로"],
        ["08", "우리기록", "공동체적", "B2C", "**", "집단적 돌봄"],
        ["09", "다음 DAEUM", "미래지향", "B2C", "**", "이행·전환"],
        ["10", "Growith", "스타트업", "투자·글로벌", "*****", "함께 성장"],
    ]
    table_block(s, Cm(1.0), Cm(4.6),
                col_widths_cm=[2.5, 5.5, 4, 6, 4.5, 9], rows=rows,
                row_h_cm=0.78, font_size=10, first_col_align="center")


# ────────── main() ──────────

def build_main():
    import _deck_rest as R

    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    # PART 0
    build_cover(prs)
    build_toc(prs)
    build_executive_summary(prs)

    # PART 1
    build_part1_divider(prs)
    build_problem(prs)
    build_six_pains(prs)
    build_market_size(prs)
    build_lifecycle(prs)
    build_personas_1(prs)
    build_personas_2(prs)
    build_vision_mission(prs)

    # PART 2
    build_part2_divider(prs)
    build_brand_etymology(prs)
    build_slogans(prs)
    build_colors(prs)
    build_logo_concepts(prs)
    build_copies(prs)
    build_user_xp(prs)
    build_voice_taboo(prs)
    build_naming(prs)

    # PART 3-8 (via _deck_rest)
    ctx = {'page_next': page_next, 'total': TOTAL_SLIDES, 'slogan': SLOGAN}

    R.build_part3_divider(prs, ctx)
    R.build_value_prop(prs, ctx)
    R.build_personas_summary(prs, ctx)
    R.build_lifecycle_matrix(prs, ctx)
    R.build_record_categories(prs, ctx)
    R.build_fr_v1(prs, ctx)
    R.build_fr_v2(prs, ctx)
    R.build_fr_v2_1(prs, ctx)
    R.build_fr_v2_2_5(prs, ctx)
    R.build_multi_input(prs, ctx)
    R.build_screening_tools(prs, ctx)
    R.build_ai_trend(prs, ctx)
    R.build_transition_18(prs, ctx)
    R.build_guardian_mode(prs, ctx)
    R.build_offline_first(prs, ctx)
    R.build_nfr(prs, ctx)
    R.build_risks(prs, ctx)

    R.build_part4_divider(prs, ctx)
    R.build_ia_tree(prs, ctx)
    R.build_screen_map(prs, ctx)
    R.build_landing(prs, ctx)
    R.build_parent_dash(prs, ctx)
    R.build_screening_screens(prs, ctx)
    R.build_multi_input_screens(prs, ctx)
    R.build_worker_screen(prs, ctx)
    R.build_self_screen(prs, ctx)
    R.build_pro_screen(prs, ctx)
    R.build_facility_screen(prs, ctx)
    R.build_u6_screen(prs, ctx)
    R.build_self_help_screens(prs, ctx)

    R.build_part5_divider(prs, ctx)
    R.build_workflow_overview(prs, ctx)
    R.build_u1_workflow(prs, ctx)
    R.build_u2_workflow(prs, ctx)
    R.build_u3_workflow(prs, ctx)
    R.build_u4_u5_workflow(prs, ctx)
    R.build_units_1(prs, ctx)
    R.build_units_2(prs, ctx)
    R.build_units_3(prs, ctx)
    R.build_permission_matrix(prs, ctx)

    R.build_part6_divider(prs, ctx)
    R.build_plan_exec(prs, ctx)
    R.build_mvp_scope(prs, ctx)
    R.build_hypotheses(prs, ctx)
    R.build_success_criteria(prs, ctx)
    R.build_sprints(prs, ctx)
    R.build_wbs(prs, ctx)
    R.build_team(prs, ctx)
    R.build_milestones(prs, ctx)
    R.build_risk_register(prs, ctx)

    R.build_part7_divider(prs, ctx)
    R.build_competitors(prs, ctx)
    R.build_pricing(prs, ctx)
    R.build_beachhead(prs, ctx)
    R.build_self_help(prs, ctx)

    R.build_part8_divider(prs, ctx)
    R.build_kpi_summary(prs, ctx)
    R.build_governance(prs, ctx)
    R.build_roadmap(prs, ctx)
    R.build_thank_you(prs, ctx)

    prs.save(str(OUT))
    print(f"Saved: {OUT}")
    print(f"Total slides: {_PAGE[0]}")


if __name__ == "__main__":
    build_main()
