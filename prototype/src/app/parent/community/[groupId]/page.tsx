import Link from "next/link";

const GROUP_DATA: Record<string, { stage: string; color: string; count: number; desc: string; tags: string[] }> = {
  school:     { stage: "학령기", color: "#5CB85C", count: 247, desc: "IEP, 방과후 프로그램, 특수교사와의 소통 노하우를 함께 나눠요. Recordare 인증 보호자 전용 안전한 공간입니다.", tags: ["IEP", "방과후", "특수교사", "행동지원", "보조공학"] },
  transition: { stage: "전환기", color: "#3B82F6", count: 89,  desc: "직업재활, 그룹홈, 활동지원 준비 경험을 공유해요.", tags: ["직업재활", "그룹홈", "자립생활", "활동지원"] },
  infant:     { stage: "영아기", color: "#FFB49A", count: 312, desc: "처음 장애 진단을 받고 막막한 분들이 함께 이야기 나눠요.", tags: ["초기 진단", "K-DST", "발달재활", "조기개입"] },
  early:      { stage: "영유아기", color: "#FFC857", count: 298, desc: "어린이집·유치원·발달재활 경험을 나눠요.", tags: ["어린이집", "발달재활", "언어치료", "감각통합"] },
  adult:      { stage: "성인기", color: "#7C3AED", count: 64,  desc: "그룹홈 생활, 활동지원사, 주거 전환 경험을 나눠요.", tags: ["그룹홈", "활동지원사", "주거이양", "성년후견"] },
  asd:        { stage: "자폐스펙트럼", color: "#f59e0b", count: 121, desc: "ASD 특성, 감각통합, 행동지원 전략을 공유해요.", tags: ["ASD", "감각통합", "행동지원", "PBS"] },
};

const POSTS = [
  { nick: "이름없는강아지", initial: "이", color: "#5CB85C", tag: "IEP", star: true, time: "2시간 전", title: "IEP 작성 이렇게 했어요 — 3년차 후기", body: "처음에 IEP 회의 때 뭘 말해야 할지 몰랐는데, 레코다레로 1년치 기록을 인쇄해서 가져갔더니 선생님들이 깜짝 놀라셨어요. 특히 행동·정서 카테고리 데이터가 학기별 변화를 보여줘서 목표 설정할 때 정말 도움됐어요.", likes: 34, comments: 12 },
  { nick: "하늘빛엄마", initial: "하", color: "#3B82F6", tag: "방과후", star: false, time: "5시간 전", title: "방과후 활동 프로그램 찾고 있어요 (서울 노원구)", body: "아이가 올해 중학교 2학년이 됐는데, 방과후에 다닐 만한 특수학교 연계 프로그램을 찾고 있어요. 노원구 쪽에 어디 좋은 데 아시는 분 계신가요?", likes: 7, comments: 4 },
  { nick: "연꽃보호자", initial: "연", color: "#f59e0b", tag: "행동지원", star: false, time: "어제", title: "PBS 기록 쓰기 시작했어요 — 한 달 후기", body: "처음엔 ABC 분석이 복잡해 보였는데, 한 달 써보니까 선행사건 패턴이 보이기 시작했어요. 소음+일정변경이 겹치면 무조건 힘들어한다는 걸 데이터로 확인하고, 미리 대비하니까 도전행동이 많이 줄었어요.", likes: 21, comments: 8 },
];

const MEETINGS = [
  { date: "06/07", title: "IEP 작성 워크숍", time: "토 오후 2:00 · 서울 ○○복지관 3층", type: "오프라인", attend: "14/20", dday: "D-11", color: "#5CB85C" },
  { date: "06/21", title: "6월 정기 온라인 모임", time: "토 오전 10:00 · Zoom", type: "온라인", attend: "23/50", dday: "D-25", color: "#3B82F6" },
];

export default async function CommunityGroupDetailPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const group = GROUP_DATA[groupId] ?? GROUP_DATA.school;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Topbar */}
      <div className="bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-ink-mid">
          <Link href="/parent" className="hover:text-primary">대시보드</Link>
          <span>›</span>
          <Link href="/parent/community" className="hover:text-primary">자조 모임</Link>
          <span>›</span>
          <strong className="text-ink">{group.stage} 보호자 모임</strong>
        </div>
        <button className="text-xs font-semibold px-3 py-1 rounded-full border border-border bg-white hover:bg-red-50 hover:border-red-300 text-ink-mid transition">🚨 신고</button>
      </div>

      <div className="container-page py-8">
        {/* Group header */}
        <div className="card p-6 mb-5" style={{ background: `${group.color}08`, borderColor: `${group.color}30` }}>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex gap-4 items-start">
              <div className="rounded-full w-2 flex-shrink-0 mt-1" style={{ background: group.color, height: "56px", minWidth: "8px" }} />
              <div>
                <h1 className="text-2xl font-extrabold text-primary-dark">{group.stage} 보호자 모임</h1>
                <p className="text-sm text-ink-mid mt-1">{group.count}명 · 생애주기 자동 매칭 그룹 · FR-74</p>
                <p className="text-sm text-ink mt-2 leading-relaxed max-w-xl">{group.desc}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {group.tags.map(t => <span key={t} className="rounded-full bg-white border border-border px-3 py-0.5 text-xs font-semibold">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {[{ v: `${group.count}명`, l: "멤버" }, { v: "12건", l: "오늘 글" }, { v: "1건", l: "예정 모임" }].map(s => (
                <div key={s.l} className="bg-white rounded-xl p-3 text-center border border-border">
                  <div className="text-xl font-extrabold" style={{ color: group.color }}>{s.v}</div>
                  <div className="text-xs text-ink-mid mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="rounded-xl p-3 text-xs mb-5" style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#166534" }}>
          🔒 닉네임으로만 표시됩니다. 자녀 이름·학교·주소 등 개인정보는 직접 입력하지 마세요. 부적절한 게시물은 신고 버튼을 이용해 주세요. (FR-83, NFR-C05)
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-4">
            {/* Write post */}
            <div className="card p-4">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: "#5CB85C" }}>박</div>
                <div className="flex-1">
                  <textarea className="form-input w-full resize-none text-sm" rows={2} placeholder="오늘 어떤 경험을 나누고 싶으신가요? (자녀 이름·학교 등 개인정보는 적지 마세요)" />
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2">
                      <button className="text-xs border border-border rounded-full px-3 py-1 hover:border-primary transition">📷 사진</button>
                      <button className="text-xs border border-border rounded-full px-3 py-1 hover:border-primary transition">🏷️ 태그</button>
                    </div>
                    <button className="btn-primary text-xs px-4 py-1.5">게시하기</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {POSTS.map(p => (
              <div key={p.title} className="card p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: p.color }}>{p.initial}</div>
                    <div>
                      <div className="text-sm font-bold">{p.nick}</div>
                      <div className="text-xs text-ink-mid">{p.time}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-xs rounded-full bg-secondary px-2 py-0.5 font-semibold">{p.tag}</span>
                    {p.star && <span className="text-xs rounded-full bg-yellow-50 border border-yellow-200 px-2 py-0.5 font-semibold text-yellow-700">추천글 ⭐</span>}
                  </div>
                </div>
                <h3 className="font-extrabold text-base mb-2">{p.title}</h3>
                <p className="text-sm text-ink leading-relaxed">{p.body}</p>
                <div className="flex gap-4 mt-4 pt-3 border-t border-border text-xs text-ink-mid">
                  <button className="hover:text-red-500 transition">❤️ 좋아요 {p.likes}</button>
                  <button className="hover:text-primary transition">💬 댓글 {p.comments}</button>
                  <button className="hover:text-primary transition">🔗 공유</button>
                  <button className="ml-auto hover:text-red-400 transition">🚨 신고</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Meetings */}
            <div className="card p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-extrabold text-sm text-primary-dark">📅 모임 일정</div>
                <button className="text-xs text-primary font-semibold">+ 등록</button>
              </div>
              <div className="space-y-3">
                {MEETINGS.map(m => (
                  <div key={m.title} className="rounded-lg p-3 border border-border">
                    <div className="flex gap-3 items-start">
                      <div className="rounded-lg p-1.5 text-center w-11 flex-shrink-0" style={{ background: `${m.color}18`, color: m.color }}>
                        <div className="text-xs font-bold">{m.date.split("/")[0]}월</div>
                        <div className="text-xl font-extrabold leading-none">{m.date.split("/")[1]}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-xs leading-snug">{m.title}</div>
                        <div className="text-xs text-ink-mid mt-0.5">{m.time}</div>
                        <div className="flex gap-1 mt-1">
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
            <div className="rounded-xl p-4 text-xs text-amber-800" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <div className="font-extrabold mb-2">📋 운영 원칙</div>
              <ul className="space-y-1">
                <li>• 닉네임으로만 표시</li>
                <li>• 자녀 개인정보 입력 금지</li>
                <li>• 부적절 게시물 → 신고</li>
                <li>• 자녀 기록과 완전 분리 (FR-83)</li>
              </ul>
            </div>

            {/* Other groups */}
            <div className="card p-4">
              <div className="font-extrabold text-sm text-primary-dark mb-3">다른 모임 탐색</div>
              <Link href="/parent/community" className="block text-sm text-primary font-semibold hover:underline">← 전체 모임 목록</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
