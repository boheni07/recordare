import Link from "next/link";

export function StepProgress({ current, total = 7 }: { current: number; total?: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={i} className="flex items-center flex-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                done ? "bg-primary text-white" : active ? "bg-accent text-white" : "bg-white border-2 border-border text-ink-mid"
              }`}
            >
              {idx}
            </div>
            {i < total - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StepNav({ prev, next, prevLabel = "이전", nextLabel = "다음" }: {
  prev?: string; next?: string; prevLabel?: string; nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
      {prev ? (
        <Link href={prev} className="btn-secondary">← {prevLabel}</Link>
      ) : <span />}
      {next && <Link href={next} className="btn-primary">{nextLabel} →</Link>}
    </div>
  );
}
