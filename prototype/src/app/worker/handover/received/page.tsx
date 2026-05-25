import Link from "next/link";
import { PageHeader } from "@/components/Card";

export default function HandoverReceivedPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="3분 마스터 인계서 (수령)"
        subtitle="신규 이용자 박지훈님의 인계서 — 첫 출근 전 필수 확인"
        actions={<button className="btn-primary text-sm">✓ 확인 완료</button>}
      />

      {/* Banner */}
      <div className="rounded-xl bg-life-transition/10 border-2 border-life-transition p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-blue-900">📥 박순영(보호자) 발행 · 2026-04-12</div>
            <div className="text-xs text-ink-mid mt-1">권한 활성: 2026-05-01 ~ 2026-08-31 (3개월)</div>
          </div>
          <button className="btn-secondary text-xs">📥 PDF 다운로드</button>
        </div>
      </div>

      {/* 4 sections */}
      <section className="grid md:grid-cols-2 gap-4">
        {[
          {
            title: "의료 섹션", color: "#3B82F6", priority: "긴급",
            items: [
              { k: "복용약", v: "항경련제 1정/일 (점심)" },
              { k: "알레르기", v: "견과류 (땅콩 포함) — 흡입도 위험" },
              { k: "응급 이력", v: "2024-08-15 발작 1회 (병원 후송 안 함)" },
              { k: "응급 연락", v: "어머니 010-XXXX-1234 / 푸른그룹홈 02-XXX-XXXX" },
            ],
          },
          {
            title: "식사 섹션", color: "#FFC857", priority: "높음",
            items: [
              { k: "선호", v: "김치찌개, 떡볶이, 비빔밥" },
              { k: "금기", v: "견과류, 향신료 강한 음식, 너무 차가운 음료" },
              { k: "식사 패턴", v: "1일 4식 (간식 포함) · 천천히 식사" },
              { k: "주의", v: "혼자 식사 시 사레 들 수 있음" },
            ],
          },
          {
            title: "AAC 사용", color: "#5CB85C", priority: "중간",
            items: [
              { k: "사용 픽토그램", v: "주 사용 30개 · 색상 큰 카드 선호" },
              { k: "선호 음성", v: "여성 음성 · 천천히" },
              { k: "응답 패턴", v: "사진 우선 → 텍스트 보조" },
              { k: "팁", v: "이름 부르기보다 '민지야 볼래?' 처럼 짧게" },
            ],
          },
          {
            title: "위험행동", color: "#E07A5F", priority: "긴급",
            items: [
              { k: "트리거", v: "큰 소리, 군중, 갑작스러운 환경 변화" },
              { k: "전조", v: "양손 흔들기 / 반복 발화" },
              { k: "진정 방법", v: "좋아하는 강아지 사진 보여주기 · 조용한 공간" },
              { k: "병원 이송 기준", v: "30분 이상 진정 불가 시" },
            ],
          },
        ].map((sec) => (
          <article key={sec.title} className="card overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between text-white" style={{ backgroundColor: sec.color }}>
              <h3 className="font-bold">📋 {sec.title}</h3>
              <span className="badge bg-white/20">{sec.priority}</span>
            </div>
            <dl className="p-4 space-y-2 text-sm">
              {sec.items.map((it) => (
                <div key={it.k}>
                  <dt className="text-xs font-bold text-ink-mid">{it.k}</dt>
                  <dd>{it.v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>

      {/* Acknowledgment */}
      <section className="card p-6 bg-secondary">
        <h2 className="font-bold text-primary-dark">확인 응답</h2>
        <p className="text-sm text-ink-mid mt-1">
          위 4섹션을 모두 확인했음을 보호자에게 알립니다. 추가 질문이 있으면 메모를 남겨주세요.
        </p>
        <textarea
          rows={2}
          className="mt-3 w-full rounded-lg border border-border px-4 py-3 text-sm"
          placeholder="예: 식사 시간 추가 안내 부탁드립니다."
        />
        <div className="mt-3 flex gap-2">
          <button className="btn-primary text-sm">✓ 확인 + 메모 회신</button>
          <Link href="/worker" className="btn-secondary text-sm">대시보드로</Link>
        </div>
      </section>
    </div>
  );
}
