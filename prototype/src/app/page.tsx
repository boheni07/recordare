import Link from "next/link";
import { AppHeader, AppFooter } from "@/components/AppHeader";

export default function LandingPage() {
  return (
    <>
      <AppHeader />
      <main>
        {/* §1 Hero */}
        <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
          <div className="container-page py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-accent text-sm font-bold mb-4">RECORDARE · 레코다레</div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                기록은 끊기지 않고,<br />
                권한은 당사자에게 자란다
              </h1>
              <p className="mt-6 text-lg text-secondary/90">
                지적장애인 가족을 위한<br className="md:hidden" /> 평생 기록 + 자기결정권 플랫폼
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup/step-1" className="btn-accent">무료로 시작하기 →</Link>
                <Link href="#contact" className="btn-secondary border-white text-white hover:bg-white/10">기관 도입 상담</Link>
              </div>
              <p className="mt-6 text-sm text-accent">✓ 신규 가입 1시간 안에 첫 인계서 PDF</p>
              <div className="mt-8 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1">✓ 한국지적발달장애인복지협회 추천(예정)</span>
                <span className="rounded-full bg-white/10 px-3 py-1">✓ ISMS-P 인증(예정)</span>
                <span className="rounded-full bg-white/10 px-3 py-1">✓ AAC 픽토그램 지원</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-3xl p-8 border border-white/20">
              <div className="bg-white text-ink rounded-2xl p-6 shadow-2xl">
                <div className="text-xs text-ink-mid mb-2">박지훈 (20세) 타임라인 미리보기</div>
                {[
                  { color: "#FFC857", label: "영유아 · 어린이집 적응", text: "첫 걸음 · 0세 6개월" },
                  { color: "#5CB85C", label: "학령기 · 특수학교", text: "IEP · 보조기구 도입" },
                  { color: "#3B82F6", label: "전환기 · 자립 훈련", text: "AAC 학습 · 권한 이양 시작" },
                ].map((it, i) => (
                  <div key={i} className="flex gap-3 py-2 border-b last:border-0 border-border">
                    <div className="w-1.5 rounded-full" style={{ backgroundColor: it.color }} />
                    <div>
                      <div className="text-xs font-semibold" style={{ color: it.color }}>{it.label}</div>
                      <div className="text-sm">{it.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* §2 Problem */}
        <section className="py-20 container-page">
          <h2 className="section-title text-center">왜 지금 Recordare인가요?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: "📁", title: "기록 단절", stat: "기관 이동마다 2주 적응", quote: "30년 모은 노트를 누가 다 봐주겠어요?", who: "박순영 (보호자)", color: "#FFC857" },
              { icon: "✍️", title: "행정 부담", stat: "일 평균 30분 일지 작성", quote: "퇴근하고 30분 더 일하는 게 진짜 힘들어요.", who: "이수진 (활동지원사)", color: "#5CB85C" },
              { icon: "🤝", title: "자기결정권 배제", stat: "평생 보호자 동의에 의존", quote: "엄마, 이건 내가 할게요.", who: "김민지 (당사자)", color: "#7C3AED" },
            ].map((p) => (
              <div key={p.title} className="card p-6 hover:-translate-y-1 transition" style={{ borderTopColor: p.color, borderTopWidth: 4 }}>
                <div className="text-4xl mb-3">{p.icon}</div>
                <div className="text-xl font-bold text-primary-dark">{p.title}</div>
                <div className="mt-2 text-sm text-ink-mid">{p.stat}</div>
                <div className="mt-4 pt-4 border-t border-border text-sm font-medium" style={{ color: p.color }}>“{p.quote}”</div>
                <div className="text-xs text-ink-mid mt-1">— {p.who}</div>
              </div>
            ))}
          </div>
        </section>

        {/* §3 Solution */}
        <section className="bg-secondary py-20">
          <div className="container-page">
            <h2 className="section-title text-center">Recordare는 이렇게 해결합니다</h2>
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {[
                { n: "01", title: "통합 타임라인", desc: "영유아부터 성인까지 단 하나의 기록선", detail: "생애주기 5단계 컬러 구분 · 카톡 사진 1만장 14일 자동 정리", color: "#FFC857" },
                { n: "02", title: "다중 입력 일지", desc: "시설 현장에서 15초 빠른 선택", detail: "빠른 선택·체크리스트·사진+태그·텍스트+OS 음성 키보드", color: "#5CB85C" },
                { n: "03", title: "3분 마스터 인계서", desc: "기관 전환의 2주를 3분으로", detail: "PDF + 시스템 동시 전달 · 권한 이양 워크플로 자동", color: "#3B82F6" },
                { n: "04", title: "AAC 동의 UI", desc: "당사자가 직접 그림으로 Yes/No", detail: "픽토그램 + 음성안내 + 2단계 확인", color: "#7C3AED" },
              ].map((s) => (
                <div key={s.n} className="card p-6 flex gap-5 items-start">
                  <div className="text-3xl font-bold" style={{ color: s.color }}>{s.n}</div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-primary-dark">{s.title}</div>
                    <div className="text-sm font-semibold mt-1" style={{ color: s.color }}>{s.desc}</div>
                    <div className="text-sm text-ink-mid mt-2">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §4 Persona Benefit */}
        <section className="py-20 container-page">
          <h2 className="section-title text-center">누구에게 좋은가요?</h2>
          <div className="mt-10 grid md:grid-cols-5 gap-4">
            {[
              { role: "당사자", color: "#7C3AED", b: "그림으로 답해요" },
              { role: "보호자", color: "#FFC857", b: "1만 장 14일 정리" },
              { role: "활동지원사", color: "#5CB85C", b: "일지 30분 → 2분" },
              { role: "사회복지사", color: "#3B82F6", b: "회의 자료 자동" },
              { role: "시설장", color: "#6B7280", b: "12~80명 통합 관리" },
            ].map((p) => (
              <div key={p.role} className="card p-4 text-center">
                <div className="text-xs font-semibold text-ink-mid">{p.role}</div>
                <div className="my-2 h-1 rounded-full" style={{ backgroundColor: p.color }} />
                <div className="text-sm font-semibold" style={{ color: p.color }}>{p.b}</div>
              </div>
            ))}
          </div>
        </section>

        {/* §5 Impact */}
        <section className="py-20 container-page">
          <h2 className="section-title text-center">사회적 임팩트</h2>
          <p className="text-center text-ink-mid mt-2 mb-12">레코다레가 만들어가는 변화 (시범 운영 100명 기준 목표)</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "30분", arrow: "→ 2분", label: "활동지원사 일지 작성 시간", sub: "FR-69 다중 입력 모드 도입 후" },
              { num: "2주", arrow: "→ 3분", label: "기관 전환 적응 기간", sub: "마스터 인계서 시스템 기준" },
              { num: "70%+", arrow: "", label: "보호자 1주 잔존율 목표", sub: "자조 모임 연결 효과 포함 (M6 KPI)" },
              { num: "42%", arrow: "→ 67%", label: "당사자 자기결정 점수 변화", sub: "전환기 1년 AIR-SDS 목표 수치" },
            ].map((it) => (
              <div key={it.label} className="card p-6 text-center">
                <div className="text-3xl font-extrabold text-primary">{it.num}<span className="text-xl text-accent">{it.arrow}</span></div>
                <div className="mt-2 text-sm font-semibold text-primary-dark">{it.label}</div>
                <div className="mt-1 text-xs text-ink-mid">{it.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* §5.5 Community CTA */}
        <section className="bg-secondary py-16">
          <div className="container-page">
            <div className="card p-8 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: "#5CB85C", borderWidth: 2 }}>
              <div>
                <h3 className="text-xl font-extrabold text-primary-dark mb-2">👥 혼자가 아닙니다 — 보호자 자조 모임</h3>
                <p className="text-sm text-ink-mid mb-4">Recordare 인증 보호자 전용 폐쇄형 커뮤니티 · 생애주기 자동 매칭 · 자녀 기록과 완전 분리</p>
                <div className="flex flex-wrap gap-2">
                  {["영유아기 모임 312명", "학령기 모임 247명", "전환기 자립 89명", "성인기 그룹홈 64명"].map(g => (
                    <span key={g} className="rounded-full bg-white border border-border px-3 py-1 text-xs font-semibold">{g}</span>
                  ))}
                </div>
              </div>
              <Link href="/parent/community" className="btn-accent whitespace-nowrap">자조 모임 둘러보기 →</Link>
            </div>
          </div>
        </section>

        {/* §6 Trust */}
        <section className="py-16 container-page">
          <h2 className="section-title text-center">신뢰할 수 있는 파트너들</h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {[
              "🏛️ 한국지적발달장애인복지협회 추천(예정)",
              "🔐 ISMS-P 인증 준비 중",
              "🌿 숨가든 리빙랩 협력",
              "🏥 발달재활서비스 연계(협의 중)",
              "⚖️ 성년후견 지원 법인 MOU(예정)",
            ].map(t => (
              <span key={t} className="rounded-xl bg-secondary border border-border px-5 py-3 text-sm font-semibold">{t}</span>
            ))}
          </div>
          <p className="text-center text-xs text-ink-mid mt-6">※ (예정) 표시는 협의 또는 준비 중인 사항입니다</p>
        </section>

        {/* §7 CTA */}
        <section className="bg-primary-dark text-white py-16">
          <div className="container-page text-center">
            <h2 className="text-3xl font-bold">지금 시작하세요</h2>
            <p className="mt-3 text-secondary/90">카드 등록 없이 14일 무료 체험 · 1시간 안에 첫 인계서 PDF 받기</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/signup/step-1" className="btn-accent">무료로 시작하기 →</Link>
              <Link href="/login" className="btn-secondary border-white text-white hover:bg-white/10">기존 계정으로 로그인</Link>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  );
}
