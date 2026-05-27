import Link from "next/link";
import { PageHeader } from "@/components/Card";
import { CHILDREN } from "@/lib/mock-data";

// FR-88~90 | B.10 사후 지원 계획 화면
// 접근 권한: LG(성년후견인)·CG(보호자) 전용 — 고령기·사후 지원기
export default function PostCarePlanPage() {
  const person = CHILDREN.find((c) => c.id === "c-001")!; // 박지훈 — 보호자 박순영

  const sntStatus = { done: true, bank: "국민은행 신탁", monthly: 150, agent: "김○○ (형제)" };
  const guardianInfo = { type: "성년후견 (법원 선임)", name: "이○○ (공공후견인)", lastReport: "2026-03", reported: true };
  const residenceItems = [
    { label: "단기 보호시설", facility: "○○장애인 단기보호센터", status: "예약 완료 ✅", phone: "02-xxx-xxxx" },
    { label: "장기 입소 예정", facility: "○○그룹홈", status: "대기 3위 ⏳", phone: "031-xxx-xxxx" },
  ];

  const completionItems = [
    { label: "SNT 특별부양신탁", done: sntStatus.done },
    { label: "후견인 지정", done: !!guardianInfo.name },
    { label: "단기 보호시설 예약", done: true },
    { label: "장기 거주지 등록", done: false },
    { label: "긴급 연락처 등록", done: true },
  ];
  const completedCount = completionItems.filter((i) => i.done).length;
  const completionPct = Math.round((completedCount / completionItems.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="🤝 미래를 준비해요"
        subtitle={`${person.name}님의 사후 지원 계획 · FR-88~90 · B.10 · LG·CG 전용`}
      />

      {/* 권한 제한 배너 */}
      <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800">
        🔒 이 화면은 <strong>성년후견인(LG) 또는 보호자(CG)</strong>만 접근할 수 있습니다. 저장된 모든 정보는 암호화되어 안전하게 보호됩니다.
      </div>

      {/* 전체 준비 현황 */}
      <section className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">준비 현황</h2>
          <span className="text-2xl font-bold" style={{ color: "#8FAF8E" }}>{completionPct}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-3 mb-4">
          <div className="h-3 rounded-full transition-all" style={{ width: `${completionPct}%`, backgroundColor: "#8FAF8E" }} />
        </div>
        <div className="space-y-2">
          {completionItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <span className={item.done ? "text-life-school" : "text-ink-mid"}>
                {item.done ? "✅" : "⬜"}
              </span>
              <span className={item.done ? "text-primary-dark" : "text-ink-mid"}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SNT 특별부양신탁 */}
      <section className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">💰 특별부양신탁 (SNT)</h2>
          {sntStatus.done && <span className="badge bg-life-school/15 text-green-800">가입 완료 ✅</span>}
        </div>
        {sntStatus.done ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary p-3">
                <div className="text-xs text-ink-mid">금융기관</div>
                <div className="font-bold mt-0.5">{sntStatus.bank}</div>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <div className="text-xs text-ink-mid">월 지급 설계액</div>
                <div className="font-bold mt-0.5">{sntStatus.monthly.toLocaleString()}만원</div>
              </div>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-xs text-ink-mid">비상 인출 대리인</div>
              <div className="font-bold mt-0.5">{sntStatus.agent}</div>
            </div>
            <button className="btn-secondary text-xs w-full">정보 수정</button>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-border p-6 text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-bold text-ink-mid">아직 신탁 계약을 하지 않으셨어요</div>
            <div className="text-sm text-ink-mid mt-1">국민은행·우리은행·하나은행에서 장애인 특별부양신탁 가입이 가능합니다</div>
            <button className="btn-primary mt-3 text-sm">신탁 안내 보기</button>
          </div>
        )}
      </section>

      {/* 후견인 정보 */}
      <section className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary-dark">⚖️ 후견인 정보</h2>
          {guardianInfo.name && <span className="badge bg-life-school/15 text-green-800">지정 완료 ✅</span>}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-xs text-ink-mid">후견 형태</div>
              <div className="font-bold mt-0.5 text-sm">{guardianInfo.type}</div>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-xs text-ink-mid">후견인</div>
              <div className="font-bold mt-0.5">{guardianInfo.name}</div>
            </div>
          </div>
          <div className="rounded-xl bg-secondary p-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-ink-mid">최근 후견 보고서</div>
              <div className="font-bold mt-0.5">{guardianInfo.lastReport} 제출 ✅</div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs">보고서 업로드</button>
              <button className="btn-secondary text-xs">이전 보고서</button>
            </div>
          </div>
        </div>
      </section>

      {/* 거주지 전환 계획 */}
      <section className="card p-5">
        <h2 className="font-bold text-primary-dark mb-4">🏠 거주지 전환 계획</h2>
        <div className="space-y-3">
          {residenceItems.map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-ink-mid">{item.label}</div>
                <span className="text-xs">{item.status}</span>
              </div>
              <div className="font-bold">{item.facility}</div>
              <div className="text-xs text-ink-mid mt-1">연락처: {item.phone}</div>
            </div>
          ))}
          <button className="btn-secondary text-xs w-full">+ 시설 연락처 추가</button>
        </div>
      </section>

      {/* 당사자 선호 연동 */}
      <div className="rounded-xl bg-life-transition/10 border border-life-transition/30 p-4 text-sm">
        <div className="font-bold text-blue-800">💡 PCP 선호 프로필 연동</div>
        <div className="mt-1 text-blue-700">
          {person.name}님의 PCP 선호 프로필(거주 환경 희망)을 참고해 시설을 선택할 수 있어요.
        </div>
        <div className="mt-2">
          <Link href={`/person/${person.id}/pcp`} className="text-xs text-accent underline">PCP 프로필 보기 →</Link>
        </div>
      </div>

      {/* 긴급 연락 */}
      <section className="card p-5 border-red-200">
        <h2 className="font-bold text-red-700 mb-3">🚨 위기 발생 시 즉시 연락</h2>
        <div className="space-y-2">
          {[
            { name: "○○장애인 단기보호센터", phone: "02-xxx-xxxx", type: "단기 보호" },
            { name: "이○○ 공공후견인", phone: "010-XXXX-0000", type: "후견인" },
            { name: "지역 장애인복지관", phone: "031-xxx-xxxx", type: "케어 연계" },
          ].map((c) => (
            <div key={c.name} className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-ink-mid">{c.type} · {c.phone}</div>
              </div>
              <button className="btn-secondary text-xs text-red-600 border-red-200">📞 바로 통화</button>
            </div>
          ))}
        </div>
      </section>

      {/* 법적 민감 안내 */}
      <div className="rounded-xl bg-secondary border border-border p-3 text-xs text-ink-mid">
        ⚠️ 이 정보는 법률적으로 민감합니다. 저장 시 암호화되며 후견인(LG)·보호자(CG)만 열람 가능합니다. (FR-90)
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <Link href="/parent" className="btn-secondary">← 보호자 홈</Link>
        <button className="btn-primary">저장 (암호화 저장)</button>
      </div>
    </div>
  );
}
