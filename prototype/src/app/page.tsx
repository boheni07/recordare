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
                { n: "02", title: "AI 음성 일지", desc: "말 한 마디 30초로 자동 카테고리", detail: "한국어 비표준 발화 학습 · 식사·투약·행동·정서·학습 5종 자동", color: "#5CB85C" },
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
