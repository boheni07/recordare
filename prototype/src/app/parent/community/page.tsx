import Link from "next/link";

const GROUPS = [
  { id: "infant", stage: "영아기", color: "#FFB49A", count: 312, today: 24, desc: "처음 장애 진단을 받고 막막한 분들이 함께 이야기 나눠요", type: "자동 매칭", joined: false },
  { id: "early", stage: "영유아기", color: "#FFC857", count: 298, today: 18, desc: "어린이집·유치원·발달재활 경험을 나눠요", type: "자동 매칭", joined: false },
  { id: "school", stage: "학령기", color: "#5CB85C", count: 247, today: 12, desc: "IEP, 방과후, 특수교사와의 소통 노하우", type: "자동 매칭", joined: true },
  { id: "transition", stage: "전환기", color: "#3B82F6", count: 89, today: 5, desc: "직업재활, 그룹홈, 활동지원 준비 경험 공유", type: "자유 개설", joined: true },
  { id: "adult", stage: "성인기", color: "#7C3AED", count: 64, today: 8, desc: "그룹홈 생활, 활동지원사, 주거 전환 경험", type: "자동 매칭", joined: false },
  { id: "asd", stage: "자폐스펙트럼", color: "#f59e0b", count: 121, today: 9, desc: "ASD 특성, 감각통합, 행동지원 전략 공유", type: "자유 개설", joined: false },
];

const MEETINGS = [
  { date: "06/07", title: "IEP 작성 워크숍", group: "학령기 보호자 모임", time: "토 오후 2:00", type: "오프라인", attend: "14/20", dday: "D-11", color: "#5CB85C" },
  { date: "05/31", title: "전환기 자립 준비 5월 정기 모임", group: "전환기 자립 준비 모임", time: "토 오전 10:00", type: "온라인", attend: "18/30", dday: "D-4", color: "#3B82F6" },
  { date: "06/14", title: "영아기 보호자 이야기 나눔", group: "영아기 보호자 모임", time: "일 오전 11:00", type: "온라인", attend: "8/15", dday: "D-18", color: "#FFB49A" },
];

export default function CommunityGroupsPage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Top bar */}
      <div className="bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-ink-mid">
          <Link href="/parent" className="hover:text-primary">대시보드</Link>
          <span>›</span>
          <strong className="text-ink">보호자 자조 모임</strong>
        </div>
        <div className="flex gap-2 items-center">
          <span className="badge text-xs" style={{ background: "#eff6ff", color: "#1d4ed8" }}>🔒 인증 보호자 전용</span>
          <button className="btn-secondary text-xs px-3 py-1">+ 모임 개설</button>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-primary-dark">👥 보호자 자조 모임</h1>
            <p className="text-sm text-ink-mid mt-1">박순영 · 인증 보호자 전용 폐쇄형 커뮤니티 · 생애주기 자동 매칭 · FR-74~80</p>
          </div>
        </div>

        {/* Notice */}
        <div className="rounded-xl p-4 text-sm mb-6" style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#166534" }}>
          🌿 자조 모임은 <strong>Recordare 인증 보호자만</strong> 참여할 수 있는 안전한 공간입니다. 자녀 기록 데이터와 완전히 분리되며 닉네임으로만 표시됩니다. (FR-83)
        </div>

        {/* My groups */}
        <div className="card p-5 mb-6" style={{ background: "#eff6ff", borderColor: "#93c5fd" }}>
          <div className="flex justify-between items-center mb-4">
            <div className="font-extrabold text-primary-dark">⭐ 내가 참여 중인 모임 (2개)</div>
            <a href="#" className="text-xs text-primary font-semibold">전체 보기</a>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {GROUPS.filter(g => g.joined).map(g => (
              <Link key={g.id} href={`/parent/community/${g.id}`} className="card p-4 block hover:-translate-y-0.5 transition">
                <div className="h-1 rounded-full mb-3" style={{ background: g.color }} />
                <div className="flex justify-between items-start">
                  <div className="font-extrabold text-primary-dark">{g.stage} 보호자 모임</div>
                  <span className="badge text-xs" style={{ background: `${g.color}20`, color: g.color }}>참여 중</span>
                </div>
                <div className="text-xs text-ink-mid mt-1">{g.desc}</div>
                <div className="flex gap-3 mt-2 text-xs text-ink-mid">
                  <span>👥 {g.count}명</span>
                  <span>📝 오늘 {g.today}건</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Group list */}
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-4 flex-wrap">
              {["전체 모임", "생애주기 매칭", "자유 개설", "모임 일정"].map((t, i) => (
                <button key={t} className={`rounded-full px-4 py-1.5 text-xs font-bold border transition ${i === 0 ? "bg-primary text-white border-primary" : "bg-white border-border hover:border-primary"}`}>{t}</button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {GROUPS.map(g => (
                <Link key={g.id} href={`/parent/community/${g.id}`} className="card p-4 block hover:-translate-y-1 hover:shadow-md transition">
                  <div className="h-1 rounded-full mb-3" style={{ background: g.color }} />
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-extrabold">{g.stage} 보호자 모임</div>
                    {g.joined && <span className="badge text-xs" style={{ background: `${g.color}18`, color: g.color }}>참여 중 ✓</span>}
                  </div>
                  <div className="text-xs text-ink-mid mb-2">{g.type} · {g.count}명</div>
                  <div className="text-sm text-ink leading-relaxed">{g.desc}</div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-ink-mid">📝 오늘 {g.today}건</span>
                    <button className={`text-xs font-bold px-3 py-1 rounded-full border transition ${g.joined ? "bg-primary text-white border-primary" : "bg-white border-border hover:border-primary"}`}>
                      {g.joined ? "바로가기 →" : "참여하기"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming meetings sidebar */}
          <div>
            <div className="card p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-extrabold text-primary-dark text-sm">📅 다가오는 모임</div>
                <button className="text-xs text-primary font-semibold">+ 등록</button>
              </div>
              <div className="space-y-3">
                {MEETINGS.map(m => (
                  <div key={m.title} className="rounded-lg p-3 border border-border bg-white">
                    <div className="flex gap-3 items-start">
                      <div className="rounded-lg p-1.5 text-center w-10 flex-shrink-0" style={{ background: `${m.color}18`, color: m.color }}>
                        <div className="text-xs font-bold">{m.date.split("/")[0]}월</div>
                        <div className="text-lg font-extrabold leading-none">{m.date.split("/")[1]}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs leading-snug">{m.title}</div>
                        <div className="text-xs text-ink-mid mt-0.5">{m.time} · {m.type}</div>
                        <div className="flex gap-1.5 mt-1.5">
                          <span className="text-xs rounded-full px-2 py-0.5 font-semibold" style={{ background: `${m.color}18`, color: m.color }}>{m.dday}</span>
                          <span className="text-xs rounded-full px-2 py-0.5 font-semibold bg-secondary text-ink-mid">{m.attend}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-2 w-full text-xs font-bold py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition">참여 신청</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="mt-4 rounded-xl p-4 text-xs text-amber-800" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <div className="font-extrabold mb-2">📋 자조 모임 운영 원칙</div>
              <ul className="space-y-1">
                <li>• 닉네임으로만 표시</li>
                <li>• 자녀 이름·학교·주소 직접 입력 금지</li>
                <li>• 부적절 게시물 → 신고 버튼</li>
                <li>• 인증 보호자 외 접근 불가 (FR-83)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
